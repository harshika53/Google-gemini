import { createContext, useState } from "react";
import PropTypes from "prop-types"; 
import runChat from "../config/gemini";

export const Context = createContext(null);

const ContextProvider = (props) => {

    const [response, setResponse] = useState("");

    const[input,setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const[prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData , setResultData] = useState("");


    const onSent = async () => {
        try {
            const result = await runChat(input);
            setResponse(result); 
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        setResultData,
        resultData,
        input,
        setInput,
        response
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
