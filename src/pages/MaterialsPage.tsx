import React, { useEffect } from "react";
import Blog from "../components/Blog";

export default function MaterialsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 lg:pt-32">
      <Blog />
    </main>
  );
}
