import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from './layouts'

function Roadmap() {

    return (
        <>
            <Layout>
                <div className="main">
                    <Container fluid className="px-5">
                        <Row>
                            <Col lg={5}>
                                <div className="stickyOuter">
                                    <h2 className="title text-left">roadmap</h2>
                                    <p className="text-left">There are oversized people all around this world who hide themselves from society because of the problem of being judged by others. Bad Ass Fam has put 10000 unique NFTs together to show the world that being oversized is not an issue and all people regardless of their differences, they all have their own specific potential and capabilities. Our collection has more than 100+ unique traits and will eventually find its way to put all these beautiful oversized ladies into Metaverse</p>
                                </div>
                            </Col>
                            <Col lg={7}>
                                <ul className="road-map">
                                    <li><span>20%</span><p>AS A GIFT TO EARLY ADOPTERS, 2 ETH WILL BE GIVEN AWAY TO 5 RANDOM HOLDERS.</p></li>
                                    <li className="reverse-column"><span>40%</span><p>4 ETH WORTH OF DONATIONS WILL BE MADE AS A CHARITY TO OVERWEIGHT PEOPLE TO ENCOURAGE THEM TO BE LIVING A LIFE THEY WANT.</p></li>
                                    <li><span>60%</span><p>TO THANK OUR WONDERFUL COMMUNITY, WE WILL BE RUNNING 6 HUGE GIVEAWAY TO OUR SUPPORTIVE HOLDERS.</p></li>
                                    <li className="reverse-column"><span>80%</span><p>BAD ASS FAM HAS A VERY EXCITING PLAN FOR ACTUAL “BAF” MERCH AVAILABLE EXCLUSIVELY TO BAD ASS FAM HOLDERS.</p></li>
                                    <li><span>100%</span><p>5 ETH FUND TO NEW ARTISTS THAT ARE PLANNING TO DEVELOP THEIR NFT PROJECTS TO PROMOTE AND HELP THEM TO GROW.
                                        WE WILL ALSO GIVE THEM A FREE 1:1 CONSULTATION.</p></li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                    {/* <img src={img001} alt="" className="fixedImage" /> */}
                </div>
            </Layout>
        </>
    )
}

export default Roadmap;