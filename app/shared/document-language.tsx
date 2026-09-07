"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function DocumentLanguage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = searchParams.get("lang") === "en" ? "en" : "vi";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale, pathname]);

  return null;
}
