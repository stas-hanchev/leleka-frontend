"use client";

import { ReactNode } from "react";
import Providers from "@/lib/providers";
import Header from "@/components/Header/Header";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Sidebar from "@/components/Sidebar/Sidebar";
import css from "../layout.module.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Providers>
      <Sidebar />
      <div className={css.main_container}>
        <Header />
        <Breadcrumbs />
        <main className="container">{children}</main>
      </div>
    </Providers>
  );
}
