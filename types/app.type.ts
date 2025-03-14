export type SidebarWidth = "220px" | "54px";

export type ActiveTab = "home" | "tasks" | "meetings";

export type Theme = "light" | "dark";

export type AttributePattern = {
  k: string;
  v: string;
};

export type RecursivePartial<T> =
  NonNullable<T> extends object
    ? {
        [P in keyof T]?: NonNullable<T[P]> extends (infer U)[]
          ? RecursivePartial<U>[]
          : NonNullable<T[P]> extends object
            ? RecursivePartial<T[P]>
            : T[P];
      }
    : T;
