"use client";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import "../styles/Functions.css";
import DockTabs from "@/components/ui/DockTabs"; // Import DockTabs component

export default function Functions() {
  return (
    <section className="functions">
      <ContainerScroll titleComponent={<h2>Mark is the key to retaining knowledge</h2>}>
        <div className="demo-section">
          <div className="demo-group">
            <div className="demo-ui">
              <img src="/Mark_Assets/summary.svg" alt="Summary Feature" className="demo-image" />
            </div>
            <div className="demo-text">
              <p className="small-text-bold">
                Review the pages you just read, from main points to quotes, statistics, or themes.
              </p>
              <p className="small-text">
                Mark ensures you retain the most valuable insights from your books.
              </p>
            </div>
          </div>
        </div>
      </ContainerScroll>
      <section className="flex flex-col items-center justify-center h-screen">
    </section>
    </section>
  );
}