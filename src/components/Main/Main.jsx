import './Main.css'
import {assets} from '../../assets/assets'

const Main = () => {
    return(
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                <div className="greet">
                    <p><span>Hola, Harshika.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see n an upcoming road trip</p>
                        <img src ={assets.compass_icon} alt='' />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: Indian trading market</p>
                        <img src ={assets.bulb_icon} alt='' />
                    </div>
                    <div className="card">
                        <p>Brainstorm activities related to team bonding for our work retreat</p>
                        <img src ={assets.message_icon} alt='' />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src ={assets.code_icon} alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main