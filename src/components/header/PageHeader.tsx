import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export interface PageHeaderProps {
  tabs?: {
    items: Array<{ label: string; href: string }>;
  };
}

export function PageHeader({ tabs }: PageHeaderProps) {
  const location = useLocation();

  return (
    <header>
      {tabs && (
        <Tabs value={location.pathname}>
          <TabsList>
            {tabs.items.map((tab) => {
              const isActive = location.pathname === tab.href;

              return (
                <TabsTrigger key={tab.href} value={tab.href} asChild>
                  <Link
                    to={tab.href}
                    className={`px-4 font-medium text-sm flex items-center h-full ${
                      isActive
                        ? "border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </Link>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      )}
    </header>
  );
}
