export interface RouteDefinition {
  path: string;
  title: string;
  parent?: string;
}

export const ROUTES: Record<string, RouteDefinition> = {
  products: {
    path: "/products",
    title: "Products",
  },
  pricePlans: {
    path: "/price-plans",
    title: "Price Plans",
  },
  pages: {
    path: "/pages",
    title: "Pages",
  },
};
