import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Popup from 'reactjs-popup';



function Cards() {

    const galleries = [
        {
            title: "Card",
            tokenId: 1,
            image: "/images/img03.jpeg"
        },
        {
            title: "Card",
            tokenId: 2,
            image: "/images/img04.jpeg"
        },
        {
            title: "Card",
            tokenId: 3,
            image: "/images/img05.jpeg"
        },
        {
            title: "Card",
            tokenId: 4,
            image: "/images/img06.jpeg"
        },
        {
            title: "Card",
            tokenId: 5,
            image: "/images/img06.jpeg"
        },
        {
            title: "Card",
            tokenId: 6,
            image: "/images/img05.jpeg"
        },
        {
            title: "Card",
            tokenId: 7,
            image: "/images/img03.jpeg"
        },
        {
            title: "Card",
            tokenId: 8,
            image: "/images/img07.jpeg"
        }
    ];

    return (
        <>
            <div className="cardSec py-5">

                <Container>

                    <Row className="justify-content-between cardTopbar mb-3">
                        <Col><h2 >Live Auction</h2></Col>
                        <Col><a href="#"><h4>Explore More</h4></a></Col>
                    </Row>

                    <Row>
                        {galleries.length ? galleries.map((gallery, index) => (
                            <Popup
                                trigger={<Col lg={3} key={index}>
                                    <Card className="cardBgDark border-color1 marginBottom">
                                        <div className="cardImage"> 
                                            <Card.Img variant="top" src={gallery.image} />
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{gallery.title}</Card.Title>
                                            <Card.Text>
                                                No. {gallery.tokenId}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>} position="center center">
                                <div className="popup-modal">
                                    <div className="popup-left">
                                        <img src={gallery.image} alt="" />
                                    </div>
                                    <div className="popup-right">
                                        <h2>{gallery.title}</h2>
                                    </div>
                                </div>
                            </Popup>
                        )) : (
                            <Col>
                                <Card className="cardBgDark border-color1 marginBottom">
                                    No Data Found
                                </Card>
                            </Col>
                        )}
                    </Row>



                </Container>
            </div>
        </>
    )
}
export default Cards;