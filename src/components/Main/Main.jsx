import "./Main.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Main = () => {
    const { onSent, setInput, input, loading, showResult, resultData, recentPrompt } = useContext(Context); // ✅ Fixed: Added recentPrompt

    const handleSend = () => {
        if (input.trim() !== "") {  
            onSent();  // ✅ Remove passing input, as onSent already uses `input` from context
            setInput("");  
        }
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hola, Harshika.</span></p>
                            {loading ? (
                                <p>Loading response...</p>
                            ) : (
                                <p>How can I help you today?</p>
                            )}
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: Indian trading market</p>
                                <img src={assets.bulb_icon} alt="Bulb" />
                            </div>
                            <div className="card">
                                <p>Brainstorm activities related to team bonding for our work retreat</p>
                                <img src={assets.message_icon} alt="Message" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Code" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini" />
                           {loading
                            ?<div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery" />
                            <img src={assets.mic_icon} alt="Mic" />
                            {input?<img onClick={handleSend} src={assets.send_icon} alt="Send" />:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
