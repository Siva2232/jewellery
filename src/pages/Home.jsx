import Hero from "../components/sections/Hero";
import JhumkaStory from "../components/sections/JhumkaStory";
import Categories from "../components/sections/Categories";
import Featured from "../components/sections/Featured";
import Collections from "../components/sections/Collections";
// import Occasions from "../components/sections/Occasions";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Contact from "../components/sections/Contact";
import Marquee from "../components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <JhumkaStory />
      <Marquee />
      <Categories />
      <Featured />
      <Collections />
      {/* <Occasions /> */}
      <WhyChooseUs />
      <Contact />
    </>
  );
}
