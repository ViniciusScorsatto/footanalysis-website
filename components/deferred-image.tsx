"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

// The parent reserves the image's aspect ratio. Start the request just before
// it enters the viewport, including in browsers with inconsistent native lazy loading.
export function DeferredImage(props: Omit<ImageProps, "fill" | "loading" | "priority">) {
  const container = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={container} className="absolute inset-0 block">
      {visible ? <Image {...props} fill loading="eager" /> : null}
      <noscript><Image {...props} fill loading="lazy" /></noscript>
    </span>
  );
}
