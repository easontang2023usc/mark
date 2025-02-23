"use client";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import "../styles/Functions.css";
import DockTabs from "@/components/ui/DockTabs";
import Typography from "@/components/ui/Typography"; // Import Typography

export default function Functions() {
  return (
    <section className="functions">
      <ContainerScroll titleComponent={<Typography variant="h2">Mark is the key to retaining knowledge</Typography>}>
        <div className="demo-section">
          <div className="demo-group">
            <div className="demo-ui">
              <img src="/Mark_Assets/summary.svg" alt="Summary Feature" className="demo-image" />
            </div>
            <div className="demo-text">
              <Typography variant="body1">
                Review the pages you just read, from main points to quotes, statistics, or themes.
              </Typography>
              <Typography variant="body2">
                Mark ensures you retain the most valuable insights from your books.
              </Typography>
            </div>
          </div>
        </div>
      </ContainerScroll>
      <section className="flex flex-col items-center justify-center h-screen"></section>
    </section>
  );
}