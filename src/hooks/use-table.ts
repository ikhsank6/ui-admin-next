"use client";

import { useCallback, useEffect, useRef } from "react";
import { type TableFilters, type TableState, useTableStore } from "@/stores/table.store";

const EMPTY_TABLE_STATE: TableState = {
  data: [],
  loading: true,
  error: false,
  filters: {},
  page: 1,
  limit: 10,
  totalPages: 1,
  totalItems: 0,
};

export interface FetchResponse<T> {
  data: T[];
  meta?: { page?: { total: number } };
}

export function useTable<T>(
  key: string,
  fetchFn: (page: number, limit: number, filters: TableFilters) => Promise<FetchResponse<T>>
) {
  const isLoadingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastFetchParamsRef = useRef<string>("");
  // Keep fetchFn in a ref so loadData doesn't need it as a dep
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  // Selector-based subscription — only re-renders when this key's slice changes
  const state = useTableStore(
    (s) => (s.instances[key] as TableState<T>) ?? (EMPTY_TABLE_STATE as TableState<T>)
  );

  useEffect(() => {
    useTableStore.getState().initTable(key);
  }, [key]);

  const filtersKey = JSON.stringify(state.filters);

  // loadData only depends on [key] — reads fresh state via getState() to avoid stale closures
  const loadData = useCallback(async () => {
    const instance = useTableStore.getState().instances[key];
    if (!instance) return;

    const { page, limit, filters } = instance;
    const fetchKey = `${key}-${page}-${limit}-${JSON.stringify(filters)}`;

    if (isLoadingRef.current && lastFetchParamsRef.current === fetchKey) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    lastFetchParamsRef.current = fetchKey;
    isLoadingRef.current = true;

    useTableStore.getState().setLoading(key, true);
    useTableStore.getState().setError(key, false);

    try {
      const response = await fetchFnRef.current(page, limit, filters as TableFilters);
      if (lastFetchParamsRef.current === fetchKey) {
        useTableStore.getState().setData(key, response.data as unknown[]);
        if (response.meta?.page) {
          useTableStore.getState().setTotalItems(key, response.meta.page.total);
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      useTableStore.getState().setError(key, true);
      useTableStore.getState().setData(key, []);
    } finally {
      isLoadingRef.current = false;
      useTableStore.getState().setLoading(key, false);
    }
  }, [key]);

  // state.page / state.limit / filtersKey are triggers, not closure values
  // biome-ignore lint/correctness/useExhaustiveDependencies: triggers refetch when pagination or filters change; loadData reads fresh state internally
  useEffect(() => {
    const timer = setTimeout(() => loadData(), 300);
    return () => clearTimeout(timer);
  }, [state.page, state.limit, filtersKey, loadData]);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const setFilters = useCallback(
    (newFilters: Partial<TableFilters>) => {
      const current = useTableStore.getState().instances[key]?.filters ?? {};
      const merged = { ...current, ...newFilters };
      for (const k of Object.keys(merged)) {
        if (merged[k] === undefined || merged[k] === null || merged[k] === "") {
          delete merged[k];
        }
      }
      useTableStore.getState().setFilters(key, merged);
    },
    [key]
  );

  return {
    ...state,
    setPage: (page: number) => useTableStore.getState().setPage(key, page),
    setLimit: (limit: number) => useTableStore.getState().setLimit(key, limit),
    setFilters,
    setData: (data: T[]) => useTableStore.getState().setData(key, data as unknown[]),
    refresh: loadData,
  };
}
