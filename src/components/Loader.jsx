import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import loder1 from "/images/loder1.gif"

function Loader(){
    return(
        <>
            <img src={loder1} alt="" className="loader"/>
        </>

    )
}

export default Loader