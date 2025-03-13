import { createContext, useState } from "react";
import PropTypes from "prop-types"; 
import runChat from "../config/gemini";

export const Context = createContext(null);

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Function to add words with delay
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async () => {
        if (!input.trim()) return;

        try {
            setLoading(true);
            setShowResult(true);

            // Store input in state
            setRecentPrompt(input);

            // Prevent duplicate prompts in history
            setPrevPrompts(prev => [...new Set([...prev, input])]);

            // Get response
            const response = await runChat(input);

            let responseArray = (response || "").split("**");
            let newResponse = "";

            // Formatting the response
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let newResponse2 = newResponse.split("*").join("<br>");
            let newResponseArray = newResponse2.split(" ");

            // 🛠 FIX: Clear previous resultData before updating (to prevent duplicate outputs)
            setResultData(""); 

            // Animate words one by one
            newResponseArray.forEach((word, index) => delayPara(index, word + " "));

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
        newChat  
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
