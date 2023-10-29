import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Test from "./Test";
const Public = () => {
  const content = (
    <section className="public">
      <Carousel />
      <main className="public__main">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis
          malesuada ex. Fusce at dui enim. In nec feugiat enim. Integer non
          lacinia erat. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Integer eget ultrices eros. Nam quis
          tellus ex. Pellentesque in pretium neque. Fusce ut iaculis leo.
          Praesent enim eros, malesuada non ultricies hendrerit, consequat non
          arcu. Vivamus lacinia scelerisque elit. Aliquam velit neque, egestas
          sed metus at, laoreet ultricies elit. Nam fermentum massa urna, eu
          sodales mi placerat quis. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Duis sed nulla nisi.
        </p>
        <address className="public__addr">
          Details
          <br />
          Details
          <br />
          Details
          <br />
          <a href="tel:+15555555555">Details</a>
        </address>
        <br />
        <p>Details</p>
      </main>
    </section>
  );
  return content;
};
export default Public;
