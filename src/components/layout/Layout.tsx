import { PageHeader, type PageHeaderProps } from "../header/PageHeader";
interface LayoutProps {
  children: React.ReactNode;
  tabs?: PageHeaderProps["tabs"];
}
export function Layout({ children, tabs }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <PageHeader tabs={tabs} />
      <main className="w-full flex-1 flex justify-center items-start pt-10">
        {children}
      </main>
    </div>
  );
}
