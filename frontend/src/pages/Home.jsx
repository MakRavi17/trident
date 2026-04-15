import Hero from "../sections/Hero";
import Welcome from "../sections/Welcome";
import About from "../sections/About";
import Speakers from "../sections/Speakers";
import Agenda from "../sections/Agenda";
import CTA from "../sections/CTA";

function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <About />
      <Speakers />
      <Agenda />
      <CTA />
    </main>
  );
}

export default Home;
