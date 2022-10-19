import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import banner1 from "/images/banner1.jpg"
import img04 from "/images/img04.jpeg"
import img05 from "/images/img05.jpeg"
import img02 from "/images/img02.jpeg"
import img03 from "/images/img03.jpeg"
import { Layout } from './layouts'
import Team from "./Team";
import SliderSwap from "./SliderSwap";


function About() {

    return (
        <>
            <Layout>
                <div className="innerpgBanner" data-aos="fade-down">
                    <img src={banner1} alt="" className="" />
                    <h1 className="innerbannerTxt">Meet Bad Ass Fam</h1>
                </div>

                <div className="abouttoptxt">
                    <Container fluid className="px-5">
                        <Row className=" align-items-center">
                            <Col lg={5} md={5}>
                                <img src={img04} alt="" className="w-100 fancyradius" />
                            </Col>

                            <Col lg={7} md={7} className="px-5" id="aboutTxt">
                                <h4 className="subhdngcolor text-left" >Creative Vision & Mission</h4>
                                <h2 className="text-left">Who we are Bad Ass Fam </h2>
                                <p className="text-left"  >Bad Ass Fam's goal is to support all Oversized people all across the world. Our adopters will have a free pass to enter metaverse events from our team in the near future. Our hard working fully doxxed Persian team is planning to run huge charity events and donations to oversized people. Bahare, our successful photographer and social media influencer with an eye catching background is our number one founder of this project. Bardia, our blockchain expert with computer science knowledge with contribution in many different successful projects is our second founder. </p>
                                <p className="text-left"  >Our journey started since we started accepting crypto payments for a project we were working on and used all that crypto to purchase a few NFTs. In Persian culture most oversized people get bullied on an everyday basis and because of that they keep hiding themselves from society. We decided to launch our own collection where our NFTs are representing beautiful and sweet oversized ladies to use the sale fund for charity and inspire Persian culture.</p>

                            </Col>
                        </Row>
                    </Container>

                </div>

                <div className="teamSlider mt-5">
                  <SliderSwap />     
                
                </div>     

                <div className="mobileSlider mt-5 mb-5">
                <Team />
                    </div>   
              
            </Layout>
        </>
    );
}

export default About;