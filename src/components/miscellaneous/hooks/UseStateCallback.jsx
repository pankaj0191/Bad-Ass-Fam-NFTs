import { useState, useRef, useEffect } from 'react'

function UseStateCallback(initial, callback = "") {
    const [state, setState] = useState(initial);
    const cbRef = useRef(null); // init mutable ref container for callbacks

    useEffect(() => {
        // cb.current is `null` on initial render, 
        // so we only invoke callback on state *updates*
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null; // reset callback after execution
        }
    }, [state]);

    const setValue = (value, stateAction = false) => {
        var newState = state;
        if (callback instanceof Function) {
            newState = callback(state, value, {
                action: "custom_callback",
                stateAction: stateAction
            });
        } else if (value instanceof Function) {
            newState = value(state, value, {
                action: "set_state_callback",
                stateAction: stateAction
            });
        } else {
            newState = value;
        }
        setState(newState);
    };

    return [state, setValue];
}

export default UseStateCallback;
