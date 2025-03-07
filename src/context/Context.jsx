import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import runChat from "../config/gemini";

// Create Context with a default value
export const Context = createContext(null);

const ContextProvider = (props) => {
    // Define state to store chat responses
    const [response, setResponse] = useState("");

    // Function to send prompt and update state
    const onSent = async (prompt) => {
        try {
            const result = await runChat(prompt);
            setResponse(result); // Assuming runChat returns a response
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    };

    // Use useEffect to call onSent when the component mounts
    useEffect(() => {
        onSent("What is React JS?");
    }, []); // Empty dependency array ensures it runs once

    // Context value shared with children components
    const contextValue = {
        response,
        onSent,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContextProvider;
