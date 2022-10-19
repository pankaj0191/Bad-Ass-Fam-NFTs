import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaDiscord, FaTwitter, FaInstagramSquare } from 'react-icons/fa';
import opensea1 from "/images/opensea1.png";

function Footer() {
    return (
        <>
            <footer className="">
                <Container fluid className="px-5">
                    <Row>
                        <Col className="d-flex justify-content-between align-items-center">
                            <p className="textCenter m-0">Copyright 2022 All right reserved</p>
                            <ul className="soxialIcons">
                                <li><a href="https://discord.gg/sW9uvsMg8p" target="_Blank"><FaDiscord /></a></li>
                                <li><a href="https://twitter.com/BadAssFamNFTs" target="_Blank"><FaTwitter /></a></li>
                                <li><a href="https://www.instagram.com/badassfam_nfts/" target="_Blank"><FaInstagramSquare /></a></li>
                                <li><a href="https://opensea.io/"><img src={opensea1} alt="" className="opensea"/></a></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default Footer;