import React from "react";
import { Accordion } from "react-bootstrap";
import { Container, Row, Col } from 'react-bootstrap';
import { Layout } from './layouts'


function Faq() {

    return (
        <>
            <Layout>
                <div className="">
                    <div className="faq-banner" data-aos="fade-down"><h1 className="innerbannerTxt">Frequently Asked Questions</h1></div>
                    <div className="faqSec my-5">
                        <Container fluid className="px-5">
                            <Row>
                                <Col lg={10} className="m-auto">
                                    <Accordion defaultActiveKey="0" className="">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>What is an NFTs</Accordion.Header>
                                            <Accordion.Body>
                                                NFT stands for 'non-fungible token. An NFT is basically data that is accounted for in a digital ledger, and that data represents something specific and unique. An NFT can, for example, represent a unique piece of art or a game token
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>How can I get Bad Ass Ladies?</Accordion.Header>
                                            <Accordion.Body>
                                                You can mint from this website only
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>How many Bad Ass Ladies will be minted?</Accordion.Header>
                                            <Accordion.Body>
                                                There will be a total of 10000 mints.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>How many Bad Ass Ladies can I mint?</Accordion.Header>
                                            <Accordion.Body>
                                                You can mint 10 per wallet.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header>How do I get whitelisted?</Accordion.Header>
                                            <Accordion.Body>
                                                You can get whitelisted by contributing to the community and letting the world know the power and vision of Bad Ass FAm. Join our Discord Whitelist channel for more information.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header>Cost?</Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li>0.05 ETH presale.</li>
                                                    <li>0.06 ETH public</li>
                                                    <li>5% royalty on secondary transactions.</li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="6">
                                            <Accordion.Header>When does minting begin?</Accordion.Header>
                                            <Accordion.Body>
                                                TBD
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Faq