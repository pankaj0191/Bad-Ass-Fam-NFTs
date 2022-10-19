import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ethers } from "ethers";

import { Layout } from './layouts'
import Metamask from "../context/Metamask";
import config from '../../config'

import img008 from "../images/img008.png"

function Banner() {

    const { useUserStorage, web3, useAlert } = useContext(Metamask.context);
    const [userData] = useUserStorage();
    const userAddress = userData.address || "";
    const { NFTMinter } = config;

    useEffect(() => {
        // getNFTData();
    }, [userAddress])
    
    // const getNFTData = async () => {
    //     if(userAddress) {
    //         console.log(NFTMinter)
    //         const contract = await Metamask.getContract(NFTMinter.address, NFTMinter.abi);
    //         // Get cost per NFT 
    //         const cost = await contract.cost();
    //         // Get max Mint amount
    //         const maxMintAmount = await contract.maxMintAmount();
    //     }
    // }

    const handleMint = (event) => {
        event.preventDefault();
        if(userAddress) {
            try {
                _minting();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const _minting = async () => {
        const contract = await Metamask.getContract(NFTMinter.address, NFTMinter.abi);
        // Get cost per NFT 
        const cost = await contract.cost();
        // Get max Mint amount
        const maxMintAmount = await contract.maxMintAmount();

        console.log(maxMintAmount.toString(), cost.toString())
    }

    return (
        <>
            <Layout>
                <div className="banner">
                    <Container className="h-100">
                        <Row className="h-100 ">
                            <Col lg={6} className="position-relative ">
                                <div className="bannerImg posabsolute">
                                    <img src={img008} alt="" />
                                </div>
                            </Col>
                            <Col lg={6} className="position-relative ">
                                <div className="posabsolute bannerTxt">
                                    <h1>Extraordinary NFT You will love</h1>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                                    <Button className="explore">Explore More</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Layout>
        </>
    )
}

export default Banner;