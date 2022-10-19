import React from 'react'
import Countdown from 'react-countdown';

function BAFCountDown({ startDate, completedText }) {
    startDate = startDate ? startDate : Date.now();
    completedText = completedText ? completedText : "No Minting Yet!";

    const renderer = ({ formatted, completed }) => {
        if (completed) {
            return <span>{completedText}</span>;
        } else {
            return <CountDownHtml {...formatted} />
        }
    };

    const CountDownHtml = ({ days, hours, minutes, seconds }) => {
        return <div className="countdown d-flex mt-3" data-date="2022-05-30">
            <div className="countdown-container days">
                <span className="countdown-heading days-top">Days</span>
                <span className="countdown-value days-bottom">{days}</span>
            </div>
            <div className="countdown-container hours">
                <span className="countdown-heading hours-top">Hours</span>
                <span className="countdown-value hours-bottom">{hours}</span>
            </div>
            <div className="countdown-container minutes">
                <span className="countdown-heading minutes-top">Minutes</span>
                <span className="countdown-value minutes-bottom">{minutes}</span>
            </div>
            <div className="countdown-container seconds">
                <span className="countdown-heading seconds-top">Seconds</span>
                <span className="countdown-value seconds-bottom">{seconds}</span>
            </div>
        </div>
    }

    return (
        <Countdown date={startDate} renderer={renderer} />
    )
}

export default BAFCountDown