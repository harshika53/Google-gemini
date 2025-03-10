import { createContext, useState } from "react";
import PropTypes from "prop-types"; 
import runChat from "../config/gemini";

export const Context = createContext(null);

const ContextProvider = (props) => {
    const [response, setResponse] = useState("");
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };
  
    const onSent = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompts(prev => [...prev, input]);

        try {
            const response = await runChat(input.trim());
            setResponse(response);

            let responseArray = (response || "").split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let newResponse2 = newResponse.split("*").join("<br>");
            let newResponseArray = newResponse2.split(" ");

            for (let i = 0; i < newResponseArray.length; i++) {
                delayPara(i, newResponseArray[i] + " ");
            }

            setResultData(newResponse2);

        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
            setInput("");
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
