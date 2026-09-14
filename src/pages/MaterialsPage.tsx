import React, { useEffect } from "react";
import Blog from "../components/Blog";

interface MaterialsPageProps {
  targetMaterialId?: string;
}

export default function MaterialsPage({ targetMaterialId }: MaterialsPageProps = {}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [targetMaterialId]);

  return (
    <main className="pt-24 lg:pt-32">
      <Blog targetMaterialId={targetMaterialId} />
    </main>
  );
}
