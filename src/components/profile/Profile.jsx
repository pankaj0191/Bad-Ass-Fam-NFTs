import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Accordion } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import DatePicker from "react-datepicker";
import { Form, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Loading } from 'react-loading-dot'

import "react-datepicker/dist/react-datepicker.css";

import { Layout } from '@/components/layouts'
import { EtherscanLink, TrimAndCopyText, getSalesData } from "@/helpers";
import config from '~/config.js'
import Metamask from "@/context/Metamask";
import { WhiteListedModal } from ".";
import '@/css/Profile.css'
import { ethers } from "ethers";

function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [preSaleDate, setPreSaleDate] = useState({
    start: new Date(),
    end: new Date()
  });
  const [startDate, setStartDate] = useState(new Date(moment().add(1, 'day')));
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
    }
  });

  const [profileData, setProfileData] = useState({
    user: {
      address: "0x0000000000000000000000000000000000000000",
      balance: "0.0000",
    },
    contract: {
      address: "0x0000000000000000000000000000000000000000",
      balance: "0.0000",
      show: true,
    }
  });

  const [alert, setAlert] = useState({
    disabled: true,
    message: "",
    success: false,
    action: "info",
  });

  const { NFTMinter } = config;
  const { web3Provider, context, getContract } = Metamask;
  const { useUserStorage, web3 } = useContext(context);
  const [userData, setUserData] = useUserStorage();
  const userAddress = userData.address || "";
  const navigate = useNavigate();

  useEffect(() => {
    // Get Profile page data from contract
    const getProfileData = async () => {
      setIsLoading(true);
      let isConn = await web3.isConnected();
      if (isConn) {
        try {
          const provider = await web3Provider();
          const contract = await getContract(NFTMinter.address, NFTMinter.abi);
          let balance = "0.00";
          const ownerAddress = await contract.owner();
          const isOwner = ownerAddress.toLowerCase() === userAddress.toLowerCase();
          if (isOwner) {
            //get the contract balance
            balance = await contract.getBalance();
            // Convert from wei to eth
            balance = parseFloat(ethers.utils.formatEther(balance.toString())).toFixed(4);
          }

          // Get the user balance
          let userBalance = await provider.getBalance(userAddress);
          userBalance = parseFloat(ethers.utils.formatEther(userBalance.toString())).toFixed(4);
          let profileData = {
            user: {
              address: userAddress,
              balance: userBalance,
            },
            contract: {
              address: contract.address,
              balance: balance,
              show: isOwner,
            },
          };
          setProfileData(profileData);
          await getDefaultValues();
        } catch (error) {
          console.log(error);
          // setProfileData({});
        }
      }
      setIsLoading(false);
    };

    if (!userAddress) {
      navigate("/");
      return;
    }
    getProfileData();
  }, [userAddress, updated]);

  const setBafAlert = (title, message, action = "", success = false, disabled = false) => {
    setAlert({
      ...alert,
      disabled: disabled ? disabled : false,
      message: message,
      title: title,
      action: action ? action : { info: true },
      success: success ? success : false,
    });
  }

  const getDefaultValues = async () => {
    const newSalesData = await getSalesData(userAddress);
    setSalesData(newSalesData);
    setPreSaleDate({
      start: new Date(newSalesData.private.dates.start || moment()),
      end: new Date(newSalesData.private.dates.end || moment())
    })
    setStartDate(new Date(newSalesData.public.dates.start || moment()))
  }

  const handleWithdraw = async (event) => {
    event.preventDefault();
    try {
      if (profileData.contract.balance > 0) {
        setBafAlert(
          "Transaction pending...",
          `Now withdrawing your contract money!`
        )

        const contract = await getContract(NFTMinter.address, NFTMinter.abi);
        const transaction = await contract.withdraw({ from: userAddress });
        const tx = transaction.wait();
        if (tx) {
          setUpdated(!updated);
          setBafAlert(
            "Withdraw Successfully!",
            <EtherscanLink address={tx.transactionHash} type="tx" name="Withdraw transaction link is " />,
            { success: true },
            true
          )
        } else {
          setBafAlert(
            "Ooops...",
            "Something went wrong",
            { warning: true },
            true
          )
        }
      } else {
        setBafAlert(
          "Ooops...",
          "No sufficient balance in the contract",
          { warning: true },
          true
        )
      }
    } catch (error) {
      const message = error.message.split(":")[1].trim();
      setBafAlert(
        "Ooops...",
        message,
        { warning: true },
        true
      )
    }
  };

  const handleWhiteListed = async (addresses) => {
    try {
      if (addresses.length > 0) {
        setBafAlert(
          "Processing...",
          `You are adding whitelisted users!`
        );
        const contract = await getContract(NFTMinter.address, NFTMinter.abi);
        const transaction = await contract.setWhiteListed(addresses, true, {
          from: userAddress
        });
        const tx = await transaction.wait();
        if (tx) {
          setBafAlert(
            "Set Whitelisted Users Successfully!",
            <EtherscanLink address={tx.transactionHash} type="tx" name="Whitelisted transaction link is " />,
            { success: true },
            true
          );
        }
      } else {
        setBafAlert(
          "Ooops...",
          "No Address Found!",
          { warning: true },
          true
        );
      }
    } catch (error) {
      console.log(error)
      const message = error.message.split(':')[1]?.trim()
      setBafAlert(
        "Ooops...",
        message.split(':')[0].trim(),
        { warning: true },
        true
      );
    }
  };

  const handleGiveawayListed = async (addresses) => {
    try {
      if (addresses.length > 0) {
        setBafAlert(
          "Processing...",
          `You are adding Giveaway users!`
        );
        const contract = await getContract(NFTMinter.address, NFTMinter.abi);
        const transaction = await contract.setWhiteListed(addresses, false, {
          from: userAddress
        });
        const tx = await transaction.wait();
        if (tx) {
          setBafAlert(
            "Set Giveaway Users Successfully!",
            <EtherscanLink address={tx.transactionHash} type="tx" name="GiveawayListed transaction link is " />,
            { success: true },
            true
          );
        }
      } else {
        setBafAlert(
          "Ooops...",
          "No Address Found!",
          { warning: true },
          true
        );
      }
    } catch (error) {
      const message = (error.message.split(':'))[1]?.trim() || "";
      setBafAlert(
        "Ooops...",
        message.split(':')[0].trim(),
        { warning: true },
        true
      );
    }
  }

  const setSaleStaging = async (staging = "public", start_date, end_date = "") => {
    staging = typeof staging === "string" && staging.trim() ? staging.trim() : "public";
    let isConn = await web3.isConnected();
    if (isConn) {
      try {
        const contract = await getContract(NFTMinter.address, NFTMinter.abi);
        start_date = moment(start_date).unix();
        end_date = moment(end_date).unix();
        if (staging == "public") {
          const transaction = await contract.setPublicSalesTime(start_date, { from: userAddress });
          const tx = await transaction.wait();
          if (tx) {
            setBafAlert(
              "Public Sale Date Updated Successfully!",
              <EtherscanLink address={tx.transactionHash} type="tx" name="Public mint date transaction link is " />,
              { success: true },
              true
            );
            setUpdated(!updated);
          }
        } else if (staging == "pre") {
          const transaction = await contract.setPreSalesTime(start_date, end_date, { from: userAddress });
          const tx = await transaction.wait();
          if (tx) {
            setBafAlert(
              "Pre Sale Date Updated Successfully!",
              <EtherscanLink address={tx.transactionHash} type="tx" name="Pre Sale date transaction link is " />,
              { success: true },
              true
            );
            setUpdated(!updated);
          }
        }
      } catch (error) {
        console.log(error)
        const message = error.message.split(':')[1]?.trim() || "";
        setBafAlert(
          "Ooops...",
          message.split(':')[0].trim(),
          { warning: true },
          true
        );
      }
    } else {
      setBafAlert(
        "Connection Not Found!",
        "You are not connected with metamask",
        { warning: true },
        true
      );
    }
  }

  const handlePublicSale = async (event) => {
    event.preventDefault();
    var start_date = moment(startDate);
    if (start_date.isValid()) {
      setBafAlert(
        "Start Transaction...",
        `You are adding public sale date!`
      );
      start_date = start_date.format('YYYY-MM-DD 00:00:00');
      setSaleStaging('public', start_date)
    }
  }

  const handlePreSale = async (event) => {
    event.preventDefault();
    var start_date = moment(preSaleDate.start)
    var end_date = moment(preSaleDate.end)
    if (
      start_date.isValid() &&
      end_date.isValid() &&
      (start_date.unix() <= end_date.unix())
    ) {
      setBafAlert(
        "Start Transaction...",
        `You are adding pre sale dates!`
      );
      start_date = start_date.format('YYYY-MM-DD 00:00:00');
      end_date = end_date.format('YYYY-MM-DD 23:59:00');
      setSaleStaging('pre', start_date, end_date);
    }
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

  const CustomDateInput = React.forwardRef((props, ref) => {
    return <Form.Group className="" controlId="formBasicEmail" ref={ref}>
      <Form.Control type="text" {...props} readOnly={true} />
    </Form.Group>
  });

  return (
    <Layout className="profile-page">
      <div className="faq-banner" data-aos="fade-down"><h1 className="innerbannerTxt">Profile</h1></div>
      <section className="profile_sec">
        <Container>
          {isLoading ? (
            <div className="profile_cont">
              Loading...
            </div>
          ) : (
            <div className="profile_cont">
              <div className="profile_img">
                <img
                  src="/images/user-avatar.png"
                  alt="Image"
                  height="120px"
                  width="120px"
                />
              </div>
              <h5 title={profileData?.user?.address}>
                #<TrimAndCopyText text={profileData?.user?.address} />
              </h5>
              {profileData?.contract?.show ? (
                <>
                  <div className="follow_outr">
                    <span>
                      <FaEthereum className="d-inline-flex" />
                      {profileData?.contract?.balance}{" "}
                      <small className="mt-2">CONTRACT BALANCE</small>
                    </span>
                    <span title={profileData?.contract?.address}>
                      <TrimAndCopyText text={profileData?.contract?.address} type="address" isLink={true} />
                      <small className="mt-2">CONTRACT ADDRESS</small>
                    </span>
                    <span>
                      <FaEthereum className="d-inline-flex" />
                      {profileData?.user?.balance}{" "}
                      <small className="mt-2">YOUR BALANCE</small>
                    </span>
                  </div>
                  <div className="prof_btns">
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Withdraw</Accordion.Header>
                        <Accordion.Body>
                          <p className="AccorTxt">
                            Withdrawing the amount of contract that are sent by user during minting.</p>
                          <Button className="explore" onClick={handleWithdraw}>WITHDRAW</Button>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Giveaway Listed Users</Accordion.Header>
                        <Accordion.Body>
                          <p className="AccorTxt">
                            Set the listed users for giveaway.</p>
                          <WhiteListedModal onSubmit={handleGiveawayListed} title="Giveaway Listed Users" />
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>White Listed Users</Accordion.Header>
                        <Accordion.Body>
                          <p className="AccorTxt">
                            Set the white listed users for Pre Sale.</p>
                          <WhiteListedModal onSubmit={handleWhiteListed} title="White Listed" />
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>Pre Sale Dates</Accordion.Header>
                        <Accordion.Body>
                          <div className="pre-sale-section">
                            <h5>
                              Pre Sale Date
                              {salesData.private.active ? (
                                <span className="active-sale">( Active )</span>
                              ) : (
                                <span className="inactive-sale">( In-Active )</span>
                              )}
                            </h5>
                            <p className="AccorTxt">
                              Start Date {salesData.private.dates.start && (
                                <span className="sale-date">({moment(salesData.private.dates.start).format('YYYY-MM-DD')})</span>
                              )} and End Date {salesData.private.dates.end && (
                                <span className="sale-date">({moment(salesData.private.dates.end).format('YYYY-MM-DD')})</span>
                              )} for Pre Sale.</p>
                            <Row className="justify-content-md-center">
                              <Col xs lg="12">
                                <label htmlFor="" className="">Start date</label>
                                <DatePicker
                                  selected={preSaleDate.start}
                                  onChange={(date) => setPreSaleDate({
                                    start: date,
                                    end: date
                                  })}
                                  selectsStart
                                  minDate={new Date()}
                                  startDate={preSaleDate.start}
                                  endDate={preSaleDate.end}
                                  dateFormat="yyyy-MM-dd"
                                  customInput={<CustomDateInput />}
                                />
                              </Col>
                              <Col xs lg="12">
                                <label htmlFor="">End date</label>
                                <DatePicker
                                  selected={preSaleDate.end}
                                  onChange={(date) => setPreSaleDate({ ...preSaleDate, end: date })}
                                  selectsEnd
                                  startDate={preSaleDate.start}
                                  endDate={preSaleDate.end}
                                  minDate={preSaleDate.start}
                                  dateFormat="yyyy-MM-dd"
                                  customInput={<CustomDateInput />}
                                />
                              </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                              <Col md="auto"><Button className="explore" onClick={handlePreSale}>Set</Button></Col>
                            </Row>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4">
                        <Accordion.Header>Public Sale Date</Accordion.Header>
                        <Accordion.Body>
                          <div className="public-sale-section">
                            <h5>
                              Public Sale Date
                              {salesData.public.active ? (
                                <span className="active-sale">( Active )</span>
                              ) : (
                                <span className="inactive-sale">( In-Active )</span>
                              )}
                            </h5>
                            <p className="AccorTxt">
                              Public Sale Date {salesData.public.dates.start && (
                                <span className="sale-date">({moment(salesData.public.dates.start).format('YYYY-MM-DD')})</span>
                              )} for public minting.</p>
                            <Row className="justify-content-md-center mt-3">
                              <Col xs lg="12">
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  className="form-control"
                                  placeholderText="Select Start Date"
                                  dateFormat="yyyy-MM-dd"
                                  minDate={preSaleDate.end}
                                  customInput={<CustomDateInput />}
                                />
                              </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                              <Col md="auto"><Button className="explore" onClick={handlePublicSale}>Set</Button></Col>
                            </Row>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </>
              ) : (
                <div className="follow_outr">
                  <span title={profileData?.contract?.address}>
                    {<EtherscanLink address={profileData?.contract?.address} type="address" />}{" "}
                    <small className="mt-2">CONTRACT ADDRESS</small>
                  </span>
                  <span>
                    <FaEthereum className="d-inline-flex" />
                    {profileData?.user?.balance || "0.0000"}{" "}
                    <small className="mt-2">YOUR BALANCE</small>
                  </span>
                </div>
              )}
            </div>
          )}
        </Container>

        {!alert.disabled && (
          <SweetAlert
            {...alert.action}
            confirmBtnText="Ok"
            confirmBtnBsStyle="outline-link"
            title={<AlertTitle title={alert.title} success={alert.success} />}
            onConfirm={handleAlert}
            confirmBtnCssClass={
              alert.success
                ? "text-[#333] font-bold py-2 px-5 border-2 border-[#333] rounded-full"
                : "d-none"
            }
          >
            <span className="text-dark">{alert.message}</span>
          </SweetAlert>
        )}
      </section>
    </Layout>
  );
}

export default Profile;
