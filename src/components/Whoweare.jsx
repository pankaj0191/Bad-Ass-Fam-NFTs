import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Layout } from './layouts'

function Whoweare(){
    return(
     <>
       <Layout>
       <div className="whoweare mt-100">
                    <Container fluid className="px-5">                     

                        <Row className="">
                        <Col md={6}>
                            <div id="whoweareTxt" data-aos="zoom-in"><h4 class="subhdngcolor text-left">About Us</h4><h2 class="text-left headingTxt">Who are BAD ASS FAM </h2><p class="text-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p><p class="text-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p></div>    
                            </Col>
                          
                            <Col md={6}>
                                <Row className="whoweareright">
                                <Col md={6} data-aos="zoom-in-down"> <img src={img05} alt="" /></Col>
                                <Col md={6} data-aos="zoom-in-down"> <img src={img04} alt="" /></Col>
                                {/* <Col md={6}> <img src={img03} alt="" /></Col>
                                <Col md={6}> <img src={img02} alt="" /></Col> */}
                                </Row>
                           
                            </Col>
                         
                        </Row>


                    </Container>

                </div>
       </Layout>
    
     </>
    );
}

export default Whoweare