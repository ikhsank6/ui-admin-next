import { create } from "zustand";

export type TableFilters = Record<string, string | number | boolean | undefined>;

export type TableState<T = unknown> = {
  data: T[];
  loading: boolean;
  error: boolean;
  filters: TableFilters;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

type TableStore = {
  instances: Record<string, TableState>;
  initTable: (key: string) => void;
  setData: (key: string, data: unknown[]) => void;
  setLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: boolean) => void;
  setFilters: (key: string, filters: TableFilters) => void;
  setPage: (key: string, page: number) => void;
  setLimit: (key: string, limit: number) => void;
  setTotalItems: (key: string, total: number) => void;
};

const defaultState = (): TableState => ({
  data: [],
  loading: true,
  error: false,
  filters: {},
  page: 1,
  limit: 10,
  totalPages: 1,
  totalItems: 0,
});

export const useTableStore = create<TableStore>((set) => ({
  instances: {},

  initTable: (key) =>
    set((state) => {
      if (state.instances[key]) return state;
      return { instances: { ...state.instances, [key]: defaultState() } };
    }),

  setData: (key, data) =>
    set((state) => ({
      instances: {
        ...state.instances,
        [key]: { ...state.instances[key], data },
      },
    })),

  setLoading: (key, loading) =>
    set((state) => ({
      instances: {
        ...state.instances,
        [key]: { ...state.instances[key], loading },
      },
    })),

  setError: (key, error) =>
    set((state) => ({
      instances: {
        ...state.instances,
        [key]: { ...state.instances[key], error },
      },
    })),

  setFilters: (key, filters) =>
    set((state) => ({
      instances: {
        ...state.instances,
        [key]: { ...state.instances[key], filters, page: 1 },
      },
    })),

  setPage: (key, page) =>
    set((state) => ({
      instances: {
        ...state.instances,
        [key]: { ...state.instances[key], page },
      },
    })),

  setLimit: (key, limit) =>
    set((state) => ({
      instances: {
        ...state.instances,
        [key]: { ...state.instances[key], limit, page: 1 },
      },
    })),

  setTotalItems: (key, totalItems) =>
    set((state) => {
      const limit = state.instances[key]?.limit ?? 10;
      return {
        instances: {
          ...state.instances,
          [key]: {
            ...state.instances[key],
            totalItems,
            totalPages: Math.max(1, Math.ceil(totalItems / limit)),
          },
        },
      };
    }),
}));
