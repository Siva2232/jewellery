import Hero from "../components/sections/Hero";
import JhumkaStory from "../components/sections/JhumkaStory";
import Categories from "../components/sections/Categories";
import Featured from "../components/sections/Featured";
import Collections from "../components/sections/Collections";
import Occasions from "../components/sections/Occasions";
import Craft from "../components/sections/Craft";
import Atelier from "../components/sections/Atelier";
import Lookbook from "../components/sections/Lookbook";
import Care from "../components/sections/Care";
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
      <Occasions />
      <Craft />
      <Atelier />
      <Lookbook />
      <Care />
      <Contact />
    </>
  );
}
