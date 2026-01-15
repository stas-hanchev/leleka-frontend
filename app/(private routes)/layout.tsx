"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Providers from "@/lib/providers";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import css from "../layout.module.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const pathname = usePathname();

  const hideLayout =
    pathname.includes("/profile/edit") || pathname.includes("/onboarding");

  return (
    <Providers>
      {hideLayout ? (
        <main>{children}</main>
      ) : (
        <>
          <Sidebar />
          <div className={css.main_container}>
            <Header />
            <Breadcrumbs />
            <main className="container">{children}</main>
          </div>
        </>
      )}
    </Providers>
  );
}
