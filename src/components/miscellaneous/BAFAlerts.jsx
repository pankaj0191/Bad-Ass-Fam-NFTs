import React from 'react'
import { useState } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Loading } from 'react-loading-dot/lib';

function BAFAlerts(props) {
    const {
        alert = {
            disabled: true,
            message: "",
            success: false,
            action: "info",
        }
    } = props;
    const [alertData, setAlert] = useState(alert);


    const handleAlert = () => {
        setAlert({
            ...alertData,
            disabled: true,
            message: "Ooops...",
            title: "",
            status: false,
        });
    };

    const AlertTitle = (props) => {
        const { title = "Metamask Not Found!", success } = props;
        return <span className="text-dark">{title}{success ? "" : <Loading />}</span>;
    };

    return (
        <>
            {!alertData.disabled && (
                <SweetAlert
                    {...alert.action}
                    confirmBtnText="Ok"
                    confirmBtnBsStyle="outline-link"
                    title={<AlertTitle title={alertData.title} success={alertData.success} />}
                    onConfirm={handleAlert}
                    confirmBtnCssClass={
                        alertData.success
                            ? "text-[#333] font-bold py-2 px-5 border-2 border-[#333] rounded-full"
                            : "d-none"
                    }
                >
                    <span className="text-dark">{alertData.message}</span>
                </SweetAlert>
            )}
        </>
    )
}

export default BAFAlerts