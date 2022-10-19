import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import '../css/circular-slider.css'
import img05 from "/images/img05.jpeg"
import img03 from "/images/img03.jpeg"
import img04 from "/images/img04.jpeg"
import img02 from "/images/img02.jpeg"
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { FaDiscord, FaTwitter, FaInstagramSquare } from 'react-icons/fa';

function SliderSwap() {

  useEffect(() => {
    let scriptElement = document.createElement("script");
    scriptElement.setAttribute("src", "/js/circular-slider.js");
    document.body.appendChild(scriptElement);
  }, [])

  return (
    <>

      <Container>
            <Row className="text-center">
              <Col lg={7} md={7} className="m-auto">
                <h2 className="text-center" data-aos="fade-up">Our Team </h2>
                <p className="text-center subhdngcolor" data-aos="fade-up">Meet Bad Ass Fam team</p>
              </Col>
            </Row>

            <Row>
              <div className="circularSlider">
                <div className="circular-slider circular-slider-1">
                  <div className="wrapper">
                    <div className="controls">
                      <div className="controls__left">
                        <div className="icon-wrapper"><BsArrowLeftCircle /></div>
                      </div>
                      <div className="controls__right">
                        <div className="icon-wrapper"><BsArrowRightCircle /></div>
                      </div>
                      {/* <div className="controls__autoplay controls__autoplay_running">
                  <div className="icon-wrapper">
                    <div className="pause">play</div>
                    <div className="run">pause</div>
                  </div>
                </div> */}
                    </div>
                    <div className="slides-holder">
                      <div className="slides-holder__item slides-holder__item_active "> <img src={img02} alt="" width={100} />
                        {/* <div className="smallImage"><img src={img05} alt="" width={100} /></div> */}
                      </div>

                      <div className="slides-holder__item"><img src={img03} alt="" width={100} />


                      </div>
                      <div className="slides-holder__item"><img src={img04} alt="" width={100} /> </div>
                      <div className="slides-holder__item"><img src={img05} alt="" width={100} />  </div>
                      <div className="slides-holder__item"><img src={img02} alt="" width={100} /> </div>
                    </div>
                    <div className="descriptions">
                      <div className="descriptions__item descriptions__item_visible ">
                        <h1>Founder</h1>
                        <p className="description">Bahare</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/baharesalehnia" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/bahare/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
                      <div className="descriptions__item">
                        <h1>Founder</h1>
                        <p className="description">Bardia</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/bardiaekrami" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/bardia_ek/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
                      <div className="descriptions__item">
                        <h1>Artist</h1>
                        <p className="description">Saeid</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/Saeidsalehnia/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
                      <div className="descriptions__item">
                        <h1>Development</h1>
                        <p className="description">Paradise</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/paradisetechsoft_/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
                      <div className="descriptions__item ">
                        <h1>Founder</h1>
                        <p className="description">Bahare</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/baharesalehnia" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/bahare/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
                      <div className="descriptions__item">
                        <h1>Founder</h1>
                        <p className="description">Bardia</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/bardiaekrami" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/bardia_ek/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
                      <div className="descriptions__item">
                        <h1>Artist</h1>
                        <p className="description">Saeid</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/Saeidsalehnia/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
                      <div className="descriptions__item">
                        <h1>Development</h1>
                        <p className="description">Paradise</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/paradisetechsoft_/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
                      {/* <div className="descriptions__item">
                  <h1>MVS Code</h1>
                  <p className="description"> Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="descriptions__item">
                  <h1>Chrome</h1>
                  <p className="description"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </Row>


      </Container>



    </>
  )
}

export default SliderSwap