"use client";

import Image from "next/image";
import pic1 from "./assets/img-1.jpg";
import pic2 from "./assets/img-2.jpg";
import pic3 from "./assets/img-3.jpg";
import { useEffect, useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";

export default function StickyOnScrollPage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="relative h-[300vh] bg-gray-200" ref={container}>
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
      <Section3 scrollYProgress={scrollYProgress} />
    </div>
  );
}

const Section1 = ({ scrollYProgress }: { scrollYProgress: MotionValue }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  console.log(scale, rotate);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen bg-[#1b1b1b] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]"
    >
      <p>Scroll Perspective</p>

      <div className="flex gap-4">
        <p>Section</p>

        <div className="relative w-[12.5vw]">
          <Image src={pic1} alt="img" placeholder="blur" fill />
        </div>

        <p>Transition</p>
      </div>
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }: { scrollYProgress: MotionValue }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div className="sticky top-0  h-screen" style={{ scale, rotate }}>
      <Image src={pic2} alt="img" placeholder="blur" fill />
    </motion.div>
  );
};

const Section3 = ({ scrollYProgress }: { scrollYProgress: MotionValue }) => {
  return (
    <div className="sticky top-0  h-screen">
      <Image src={pic3} alt="img" placeholder="blur" fill />
    </div>
  );
};
