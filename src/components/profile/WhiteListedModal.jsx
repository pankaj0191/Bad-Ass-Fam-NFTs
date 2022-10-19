import React, { useState } from "react";
import Popup from "reactjs-popup";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { Form, Button } from "react-bootstrap";
import { ethers } from "ethers";

function WhiteListedModal({ onSubmit, title }) {
  const defaultAddressObject = {
    value: "",
    isValid: true
  };
  const [addresses, setAddresses] = useState([defaultAddressObject]);

  const addNewInput = () => {
    setAddresses([...addresses, defaultAddressObject]);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    let key = name.replace("address_", "", name);
    let newAddresses = [...addresses];
    newAddresses[key - 1] = {
      value,
      isValid: ethers.utils.isAddress(value)
    };
    setAddresses(newAddresses);
  };

  const removeInput = (i) => {
    let newAddresses = [...addresses];
    newAddresses.splice(i, 1);
    setAddresses(newAddresses);
  };

  const handleSubmit = async (event, handleClose) => {
    event.preventDefault();
    let newAddresses = addresses.filter((address) => address.isValid && address.value)
      .map(address => address.value.toLowerCase());
    await onSubmit(newAddresses);
    if(typeof handleClose === "function") {
      handleClose();
    }
  };

  return (
    <Popup
      trigger={(open) => {
        return <Button className="explore">{title.toUpperCase()}</Button>;
      }}
      position="center center"
      closeOnDocumentClick={false}
      onClose={() => setAddresses([defaultAddressObject])}
    >
      {(close) => (
        <div className="popup">
          <button className="close" onClick={close}>
            &times;
          </button>
          <h3 className="text-dark text-center mb-5">Set {title} Users</h3>
          {addresses.length &&
            addresses.map((address, index) => {
              let iteration = index + 1;
              let lastRow = addresses.length == iteration;
              const value = address.value || "";
              const isValid = address.isValid;
              return (
                <div key={index}>
                  <div className="popup_addr_outr ">
                    <Form.Group controlId="exampleForm.ControlInput1" className="inputWidth">
                      <Form.Control
                        type="email"
                        placeholder={`Address #${iteration}`}
                        name={`address_${iteration}`}
                        value={value}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    {lastRow ? (
                      <span role="button" onClick={addNewInput}>
                        <AiOutlinePlusCircle
                          fontSize={30}
                          color="rgb(41 82 227)"
                        />
                      </span>
                    ) : (
                      <span role="button" onClick={() => removeInput(index)}>
                        <MdOutlineCancel fontSize={30} color="rgb(255 20 20)" />
                      </span>
                    )}
                  </div>
                  {
                    !isValid ? (
                      <div className="address-input-error">Invalid Address</div>
                    ) : ""
                  }
                </div>
              );
            })}
          <div className="text-center"> <Button className="cstm_btn explore addBtn" onClick={event => handleSubmit(event, close)}>
            Add
          </Button></div>
        </div>
      )}
    </Popup>
  );
}

export default WhiteListedModal;
