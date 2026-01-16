"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Sidebar from "@/components/Sidebar/Sidebar";
import css from "../layout.module.css";

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isOnboarding =
    pathname.includes("/onboarding") || pathname.includes("/profile/edit");

  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);

  if (isOnboarding) {
    return <>{loading ? <div>Loading...</div> : children}</>;
  }

  return (
    <>
      <Sidebar />
      <div className={css.main_container}>
        <Header />
        <Breadcrumbs />
        {loading ? <div>Loading...</div> : children}
      </div>
    </>
  );
}
