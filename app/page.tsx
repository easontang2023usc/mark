import Hero from "@/components/Hero";
import BookScroll from "@/components/BookScroll";
import HowItWorks from "@/components/HowItWorks";
import Functions from "@/components/Functions";
import BentoBox from "@/components/BentoBox";
import FinalJoinWaitlist from "@/components/FinalJoinWaitlist";
import ContainerScroll from "@/components/ui/ContainerScroll";
import Hero3D from "@/components/Hero3D";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import StickyScrollDemo from "@/components/StickyScrollDemo";


export default function Home() {
  return (
    <>
      <Hero3D />
      {/* <Hero /> */}
      {/* <BookScroll /> */}
      <StickyScrollDemo />
      <HowItWorks />
      <Functions />
      <BentoBox />
      
      <FinalJoinWaitlist />
      
    </>
  );
}
