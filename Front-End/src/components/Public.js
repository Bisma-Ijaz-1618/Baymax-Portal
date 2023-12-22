import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Section1 from "./Home/Section1";
import SectionHeadline from "./Home/SectionHeadline";
import SectionFeatures from "./Home/Section-Features";
import SectionMission from "./Home/Section-Mission";
import SectionCounts from "./Home/Section-Counts";
import Test from "./Test";
const Public = () => {
  const content = (
    <section className="public">
      <Section1 />
      <SectionCounts />
      <SectionHeadline />
      <SectionFeatures />
      <SectionMission />
      <Carousel />
    </section>
  );
  return content;
};
export default Public;
