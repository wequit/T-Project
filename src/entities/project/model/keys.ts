export const projectKeys = {
  all: () => ["projects"] as const,
  list: () => [...projectKeys.all(), "list"] as const,
  one: (id: number) => [...projectKeys.all(), "one", id] as const,
};

