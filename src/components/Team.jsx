import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import img001 from "/images/img001.gif"
import img05 from "/images/img05.jpeg"
import img03 from "/images/img03.jpeg"
import img04 from "/images/img04.jpeg"
import img02 from "/images/img02.jpeg"
import { FaDiscord, FaTwitter, FaInstagramSquare } from 'react-icons/fa';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { EffectCube, Pagination, Navigation, Autoplay } from "swiper";

function Team() {
    return (
        <>
        
                      
        <Swiper
        effect={"cube"}
        grabCursor={true}
        pagination={true}
        navigation={false}
        loop={true}
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        modules={[EffectCube, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img02} />
          <div className="descriptions">
                        <h1>Founder</h1>
                        <p className="description">Bahare</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/baharesalehnia" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/bahare/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img03} />
        <div className="descriptions">
                        <h1>Founder</h1>
                        <p className="description">Bardia</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/bardiaekrami" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/bardia_ek/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img05} />
        <div className="descriptions">
                        <h1>Artist</h1>
                        <p className="description">Saeid</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/Saeidsalehnia/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img04} />
        <div className="descriptions">
                        <h1>Development</h1>
                        <p className="description">Paradise</p>
                        <ul className="soxialIcons d-flex justify-content-center">
                          <li><a href="https://twitter.com/" target="_Blank"><FaTwitter /></a></li>
                          <li><a href="https://www.instagram.com/paradisetechsoft_/" target="_Blank"><FaInstagramSquare /></a></li>
                        </ul>
                      </div>
        </SwiperSlide>
       
      </Swiper>
                 



                    {/* <Row className="mt-5">
                            <Col lg={3} md={3} data-aos="flip-left" data-aos-delay="100">
                                <div className="teaminner" >
                                    <div className="teamImg"><img src={img02} alt="" className="w-100" /></div>
                                    <h4>Founder</h4>
                                        <h5>Bahare</h5>
                                    <ul className="soxialIcons d-flex justify-content-center">
                                <li><a href="https://twitter.com/baharesalehnia" target="_Blank"><FaTwitter /></a></li>
                                <li><a href="https://www.instagram.com/bahare/" target="_Blank"><FaInstagramSquare /></a></li>
                            </ul>
                                </div>
                            </Col>
                            <Col lg={3} md={3} data-aos="flip-left" data-aos-delay="200"><div className="teaminner" ><div className="teamImg" ><img src={img03} alt="" className="w-100" /></div>
                                <h4>Founder</h4>
                                <h5>Bardia </h5>
                                <ul className="soxialIcons d-flex justify-content-center">
                                <li><a href="https://twitter.com/bardiaekrami" target="_Blank"><FaTwitter /></a></li>
                                <li><a href="https://www.instagram.com/bardia_ek/" target="_Blank"><FaInstagramSquare /></a></li>
                            </ul>
                                </div>
                            </Col>
                            <Col lg={3} md={3} data-aos="flip-left" data-aos-delay="300"><div className="teaminner" ><div className="teamImg"><img src={img04} alt="" className="w-100" /></div>
                                <h4>Artist</h4>
                                <h5>Saeid </h5>
                                <ul className="soxialIcons d-flex justify-content-center">
                                <li><a href="https://twitter.com/" target="_Blank"><FaTwitter /></a></li>
                                <li><a href="https://www.instagram.com/Saeidsalehnia/" target="_Blank"><FaInstagramSquare /></a></li>
                            </ul>
                                </div>
                            </Col>
                            <Col lg={3} md={3} data-aos="flip-left" data-aos-delay="400"><div className="teaminner" ><div className="teamImg"><img src={img05} alt="" className="w-100" /></div>
                                <h4>Development</h4>
                                <h5>Paradise</h5>
                                <ul className="soxialIcons d-flex justify-content-center">
                                <li><a href="https://twitter.com/" target="_Blank"><FaTwitter /></a></li>
                                <li><a href="https://www.instagram.com/paradisetechsoft_/" target="_Blank"><FaInstagramSquare /></a></li>
                            </ul>
                            </div>
                            </Col>
                        </Row> */}
             
            
        </>
    )
}

export default Team