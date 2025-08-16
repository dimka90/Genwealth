// import Image from "next/image";

import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import HowTo from "@/components/HowTo";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
      <CustomCursor />
      <Navbar />
      <Hero />
      <HowTo />
    </div>
  );
}
