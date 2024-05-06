"use client";

import { useEffect } from "react";

interface Params {
  dep?: any;
}

export default function useScrollTop({ dep }: Params) {
  useEffect(() => {
    const scrollElement = document.getElementById("scrollEl");

    scrollElement?.scrollTo({ top: 0, left: 0 });
  }, [dep]);
}
