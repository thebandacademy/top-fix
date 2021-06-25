import React, { useEffect } from "react";
import Layout from "../components/Layout";
import PageNav from "../components/PageNav";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import topFix from "../images/top-fix.svg";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Slider from "react-slick";
import Carousel from "../components/Carousel";
import Aos from "aos";
import "../../node_modules/aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const pageQuery = graphql`
  query {
    contentfulHomePage {
      accreditations {
        gatsbyImageData(layout: CONSTRAINED, quality: 100, height: 50)
        id
        title
      }
      title
      sliderTitle
      slides {
        gatsbyImageData(
          aspectRatio: 2.8
          layout: FULL_WIDTH
          cropFocus: BOTTOM
          quality: 100
        )
        id
        title
      }
      text {
        raw
      }
      workWithUsImage {
        gatsbyImageData(quality: 100, resizingBehavior: SCALE, height: 500)
      }
      workWithUsTitle
      workWithUs
    }
  }
`;

const hero = {
  speed: 1000,
  fade: true,
  infinite: true,
  autoplay: true,
  dots: false,
};

const IndexPage = ({ data }) => {
  const {
    title,
    text,
    accreditations,
    workWithUsImage,
    workWithUsTitle,
    workWithUs,
  } = data.contentfulHomePage;
  const slider = data.contentfulHomePage;

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <Layout>
      <div className="slider-wrap">
        <Slider {...hero} className="overflow-hidden">
          {slider.slides.map((image) => (
            <GatsbyImage
              image={image.gatsbyImageData}
              alt={image.title.split("-").join(" ").split(".")[0]}
              key={image.id}
            />
          ))}
        </Slider>
        <div className="slider-buttons" data-aos="fade-up">
          <div className="hero-title">
            <h1>{slider.sliderTitle}</h1>
          </div>

          <Link to="/case-studies" className="button-large">
            <p>Case Studies</p>
          </Link>
          <Link to="/contact" className="button-large">
            <p>Contact Us</p>
          </Link>
        </div>
      </div>
      <PageNav />
      <div className="wrap">
        <div className="background"></div>
        <div className="page-wrap">
          <section className="main-text">
            <div className="welcome">
              <h2 data-aos="fade-up">{title}</h2>
              <p data-aos="fade-up">{text && renderRichText(text)}</p>
              <div className="button">
                <p data-aos="fade-left">Learn More</p>
              </div>
            </div>
            <div className="bars-wrap" data-aos="fade-left">
              <img src={topFix} height="50" width="50" alt="topfix styling" />
            </div>
          </section>
          <section className="page-break"></section>
          <Carousel />
          <section className="page-break"></section>

          <section className="main-text">
            <div className="accreditations" data-aos="fade-up">
              <h2 data-aos="fade-up">Accreditations</h2>
              <div className="accreditations-logo" data-aos="fade-left">
                {accreditations.map((img) => (
                  <GatsbyImage
                    image={img.gatsbyImageData}
                    alt={img.title}
                    key={img.id}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="page-break"></section>
          {/* <Slidershow /> */}
          <section className="work-with-us-wrap">
            <div className="work-with-us-image" data-aos="fade-up">
              <GatsbyImage
                image={workWithUsImage.gatsbyImageData}
                id={workWithUsImage.id}
                alt={workWithUsTitle}
              />
            </div>
            <div className="work-with-us">
              <h2 data-aos="fade-up">{workWithUsTitle}</h2>
              <p data-aos="fade-up">{workWithUs}</p>
              <div className="button">
                <p data-aos="fade-left">Learn More</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
