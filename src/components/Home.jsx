import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Accordion } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import { ethers } from "ethers";
import moment from "moment"
import SweetAlert from 'react-bootstrap-sweetalert'

import Metamask, { getContract } from "@/context/Metamask";
import img05 from "/images/img05.jpeg"
import img04 from "/images/img04.jpeg"
import curvedCircle3 from "/images/curvedCircle3.png"
import { Layout } from './layouts'
import { BAFCountDown } from "./miscellaneous";
import { getSalesData } from "../helpers";
import Loader from "./Loader";
import SliderSwap from "./SliderSwap";
import Team from "./Team";
import Mint from "./Mint";
import { NFTMINTOR_ADDRESS, NFTMINTOR_ABI } from "../../utils";


function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [isMainLoading, setIsMainLoading] = useState(false);
    const [soldOut, setSoldOut] = useState(false);
    const [mintedNfts, setMintedNfts] = useState(1);
    const [edition, setEdition] = useState(1);
    const [salesData, setSalesData] = useState({
        private: {
            active: false,
            dates: {
                start: moment().format('YYYY-MM-DD'),
                end: moment().format('YYYY-MM-DD')
            }
        },
        public: {
            active: false,
            dates: {
                start: moment().format('YYYY-MM-DD'),
            }
        },
        supply: {},
        sale: false
    });
    const [alert, setAlert] = useState({
        disabled: true,
        message: "",
        success: false,
        action: "info",
    });
    const [countDownData, SetcountDownData] = useState({
        startDate: new Date(moment().subtract(1, 'day')),
        slug: "no_sale",
        isActive: false
    });
    const [defaultMintChange, setDefaultMintChange] = useState(1);
    const [totalMintPerUser, setTotalMintPerUser] = useState(1);
    const [defaultMintCost, setDefaultMintCost] = useState("0.00");
    const {
        login,
        useUserStorage,
        web3,
    } = useContext(Metamask.context);
    const [userData, setUserData] = useUserStorage();
    const userAddress = userData.address || '';

    useEffect(() => {
        getDefaultValues();
    }, [userAddress, updated])

    const getDefaultValues = async () => {
        setIsLoading(true);
        try {
            let isConn = await web3.isConnected();
            if (isConn) {
                const saleData = await getCurrentSaleData();
                const contract = await getContract(NFTMINTOR_ADDRESS, NFTMINTOR_ABI);

                //get the costing price
                var defaultCost = 0;
                if (saleData.public.active) {
                    var cost = await contract.getPublicCost().then((cost) => cost);
                    cost = ethers.utils.formatEther(cost)
                    defaultCost = cost.toString();
                } else if (saleData.private.active) {
                    var cost = await contract.pre_Sale_Cost().then((cost) => cost);
                    cost = ethers.utils.formatEther(cost)
                    defaultCost = cost.toString();
                }
                //get the mint per user
                let defaultMintVal = await contract.maxMintAmount().then((mint) => mint);

                if (userAddress) {
                    // get current mint value of the user
                    const userMintBal = await contract.balanceOf(userAddress);

                    setMintedNfts(userMintBal.toNumber());
                    setDefaultMintChange(defaultMintVal.toNumber() - userMintBal.toNumber());
                }
                setTotalMintPerUser(defaultMintVal.toNumber());
                setDefaultMintCost(defaultCost);
            } else {
                setDefaultMintChange(1);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);

        }
    }

    const getCurrentSaleData = async () => {
        setIsMainLoading(true);
        try {
            const saleData = await getSalesData(userAddress);
            const { max, remaining, total } = saleData.supply || {};

            if (remaining > 0) {
                const now = new Date();
                var pubStartDate = saleData.public.dates.start;
                var priStartDate = saleData.private.dates.start;
                var priEndDate = saleData.private.dates.end;

                pubStartDate = pubStartDate ? new Date(moment(pubStartDate)) : "";
                priStartDate = priStartDate ? new Date(moment(priStartDate)) : "";
                priEndDate = priEndDate ? new Date(moment(priEndDate)) : "";
                var newCountDown = countDownData;

                if (pubStartDate && priStartDate && priEndDate) {
                    if (saleData.public.active) {
                        var start_date = pubStartDate;
                        var slug = "public_sale";
                        var isActive = true;
                        var publicSale = true;
                        if (now.getTime() < pubStartDate.getTime()) {
                            start_date = now;
                            slug = "ended";
                            isActive = false;
                            publicSale = false;
                        }
                        newCountDown = {
                            startDate: start_date,
                            slug: slug,
                            isActive: isActive,
                            publicSale: publicSale
                        }
                    } else if (saleData.private.active) {
                        var start_date = priStartDate;
                        var slug = "no_sale";
                        var isActive = false;
                        if (now.getTime() > priStartDate.getTime()) {
                            start_date = priEndDate;
                            slug = "pre_sale";
                            isActive = true;
                            if (now.getTime() > priEndDate.getTime()) {
                                start_date = pubStartDate;
                                slug = "public_sale";
                            }
                        }
                        newCountDown = {
                            startDate: start_date,
                            slug: slug,
                            isActive: isActive,
                            publicSale: false
                        }
                    } else {
                        if (now.getTime() < priStartDate.getTime()) {
                            newCountDown = {
                                startDate: priStartDate,
                                slug: 'before_pre_sale',
                                isActive: true,
                                publicSale: false
                            }
                        } else {
                            newCountDown = {
                                startDate: now,
                                slug: 'ended',
                                isActive: false,
                                publicSale: false
                            }
                        }
                    }
                }

                SetcountDownData(newCountDown)
                setSalesData(saleData);
                setEdition(saleData.edtion);
            } else {
                setSoldOut(true);
            }
            setIsMainLoading(false);
            return saleData;
        } catch (error) {
            console.log(error);
            setIsMainLoading(false);
        }

    }

    const getCountDownTitle = () => {
        const slug = countDownData.slug;
        const publicSale = countDownData.publicSale || false;

        if (publicSale) return "";

        var title = "No Sale Yet"
        if (slug === "pre_sale") {
            title = "Pre Sale Ended In";
        } else if (slug === "public_sale") {
            title = "Public Sale Started In";
        } else if (slug === "before_pre_sale") {
            title = "Pre Sale Started In";
        }
        return title;
    }

    const getCountDownEndedText = () => {
        const slug = countDownData.slug;
        var text = "Pre Sale Started!"
        if (slug === "pre_sale") {
            text = "Public Sale Started!";
        } else if (slug === "public_sale") {
            text = "Sale Ended!";
        }
        return text;
    }

    const handleAlert = () => {
        setAlert({
            ...alert,
            disabled: true,
            message: "Ooops...",
            title: "",
            status: false,
        });
    };

    const AlertTitle = (props) => {
        const { title = "Metamask Not Found!", success } = props;
        return <span className="text-dark">{title}
            {/* {success ? "" : <Loading />} */}
        </span>;
    };

    return (
        <>
            <Layout>
                <div className="slider main">
                    <div className="circle" ></div>
                    <div className="triangle-up" ></div>
                    <div className="circle2" ></div>
                    <div className="triangle-up1" ></div>
                    <div className="circle1" ></div>
                    <div className="circle3" ></div>

                    <Container fluid className="px-5">
                        <Row>
                            <Col lg={6} md={6}>

                                <div className=" bannerTxt"  >
                                    {/* {isMainLoading ? (
                                        <div className="countdown text-left in-active-countdown">
                                            <h2 className="countdownTitle" data-aos="fade-right" data-aos-duration="3000">Loading...</h2>
                                        </div>
                                    ) : (
                                        <>
                                            {countDownData.isActive && !soldOut ? (
                                                <>
                                                    {
                                                        countDownData.publicSale ? (
                                                            <div>
                                                                <h2 className="countdownTitle text-uppercase">Public Sale Started</h2>
                                                                <div className="countdown d-flex mt-3" data-date="2022-05-30">
                                                                    <div className="countdown-container days">
                                                                        <span className="countdown-heading days-top">Total Supply</span>
                                                                        <span className="countdown-value days-bottom">{salesData.supply.max || 0}</span>
                                                                    </div>
                                                                    <div className="countdown-container hours">
                                                                        <span className="countdown-heading hours-top">Remaining</span>
                                                                        <span className="countdown-value hours-bottom">{salesData.supply.remaining || 0}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="countdown text-left">
                                                                <h2 className="countdownTitle text-uppercase">{getCountDownTitle()}</h2>
                                                                <BAFCountDown startDate={countDownData.startDate} completedText={getCountDownEndedText()} />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        soldOut ? (
                                                            <h2 className="countdownTitle" data-aos="fade-right" data-aos-duration="3000">Items Sold Out</h2>
                                                        ) : (
                                                            <div className="countdown text-left in-active-countdown">{countDownData.completedText}</div>
                                                        )
                                                    }
                                                </>
                                            )}
                                        </>
                                    )} */}
                                    <div className="bannerTxtInner">
                                        <h1 data-aos="fade-up" data-aos-duration="3000" data-aos-delay="300">Bad Ass Fam <span>NFTs</span></h1>
                                        < p data-aos="fade-up" data-aos-duration="3000" data-aos-delay="400">Extraordinary NFT You will love</p>
                                        {userAddress && !isLoading ? (
                                            <Popup
                                                trigger={<Button className="explore">Mint Now</Button>}
                                                position="center center"
                                                closeOnDocumentClick={false}
                                            >
                                                {close => (
                                                    <Mint {...{
                                                        salesData,
                                                        totalMintPerUser,
                                                        mintedNfts,
                                                        defaultMintChange,
                                                        defaultMintCost,
                                                        edition,
                                                        useAlert: () => [alert, setAlert],
                                                        onUpdate: () => [updated, setUpdated],
                                                        onClose: close
                                                    }} />
                                                )}
                                            </Popup>
                                        ) : (
                                            <>
                                                {isLoading ? (
                                                    <Button className="explore"><Loader /></Button>
                                                ) : (
                                                    <Button className="explore" onClick={login} >Connect</Button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6} md={6} className="" >
                                <div className="circleImgOuter" data-aos="zoom-in" data-aos-duration="3000">
                                    <img src={curvedCircle3} alt="" className="circleImg" />
                                    {/* <img src={curvedCircle1} alt=""  className="circleImg"/> */}
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </div>

                <div className="whoweare ">
                    <Container fluid className="px-5">

                        <Row className="">
                            <Col md={6}>
                                <div id="whoweareTxt" data-aos="zoom-in"><h4 className="subhdngcolor text-left">About Us</h4><h2 className="text-left headingTxt">Who are BAD ASS FAM </h2>  <p className="text-left"  >Bad Ass Fam's goal is to support all Oversized people all across the world. Our adopters will have a free pass to enter metaverse events from our team in the near future. Our hard working fully doxxed Persian team is planning to run huge charity events and donations to oversized people. Bahare, our successful photographer and social media influencer with an eye catching background is our number one founder of this project. Bardia, our blockchain expert with computer science knowledge with contribution in many different successful projects is our second founder. </p>
                                    <p className="text-left"  >Our journey started since we started accepting crypto payments for a project we were working on and used all that crypto to purchase a few NFTs. In Persian culture most oversized people get bullied on an everyday basis and because of that they keep hiding themselves from society. We decided to launch our own collection where our NFTs are representing beautiful and sweet oversized ladies to use the sale fund for charity and inspire Persian culture.</p>
                                </div>
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
                <div className="teamSlider mt-5">
                    <SliderSwap />
                </div>

                <div className="mobileSlider mt-5 mb-5">
                    <Team />
                </div>
                <div className="faqSec">
                    <Container fluid className="px-5">

                        <Row>


                            <Col lg={6} className="text-left faqLeft" data-aos="zoom-in">
                                <h2 className="headingTxt">Frequently Asked <br />Question</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                            </Col>
                            <Col lg={6} className="m-auto" data-aos="zoom-in">
                                <Accordion className="">
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
                {!alert.disabled && (
                    <SweetAlert
                        {...alert.action}
                        confirmBtnText="Ok"
                        confirmBtnBsStyle="outline-link"
                        title={<AlertTitle title={alert.title} success={alert.success} />}
                        onConfirm={handleAlert}
                        closeOnClickOutside={false}
                        confirmBtnCssClass={
                            alert.success
                                ? "text-[#333] font-bold py-2 px-5 border-2 border-[#333] rounded-full"
                                : "d-none"
                        }
                    >
                        <span className="text-dark">{alert.message}</span>
                    </SweetAlert>
                )}
            </Layout >
        </>
    )
}

export default Home