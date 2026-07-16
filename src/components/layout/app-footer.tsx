export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-3 flex items-center justify-between text-xs text-muted-foreground shrink-0">
      <span>
        &copy; {year} <span className="font-medium text-foreground">Template Admin</span>. All
        rights reserved.
      </span>
      <span>v1.0.0</span>
    </footer>
  );
}
