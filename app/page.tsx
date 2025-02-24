import Hero from "@/components/Hero";
import BookScroll from "@/components/BookScroll";
import Functions from "@/components/Functions";
import BentoBox from "@/components/BentoBox";
import FinalJoinWaitlist from "@/components/FinalJoinWaitlist";
import ContainerScroll from "@/components/ui/ContainerScroll";
import Hero3D from "@/components/Hero3D";
import HowItWorksPage from "@/components/HowItWorks";
import ExplainSection from "@/components/explainSection";

export default function Home() {
  return (
    <>
      <Hero3D />
      {/* <Hero /> */}
      <BookScroll />
      {/* <HowItWorks /> */}
      <HowItWorksPage />
      <ExplainSection />
      <Functions />
      <BentoBox />
      <FinalJoinWaitlist />
      
    </>
  );
}
