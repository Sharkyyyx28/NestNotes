import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Logout } from "./logout";
import { ModeToggle } from "./mode-toogle";

interface PageWrapperProps {
  children: React.ReactNode;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export function PageWrapper({ children, breadcrumbs }: PageWrapperProps) {
  return (
    <div className="flex flex-col gap-4 border ">
      <header className="flex items-center justify-between w-full p-4 border-b">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem key={breadcrumb.label}>
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Logout />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
    </div>
  );
}
