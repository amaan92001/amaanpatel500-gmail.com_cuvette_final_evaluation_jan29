import shape from '../images/shape.png'
import shapeimg from '../images/shape2.png'
import shapeimg2 from '../images/shape2.png'
import dashboardimg from '../images/img.png';
import img from '../images/img2.png';
import imgdashboard from '../images/imgdashboard.png';
import imgtwo from '../images/img2dashboard.png';
import compimg from '../images/compimg.png';
import typebotimg from '../images/typebot-standard.png';
import iconone from '../images/icon1.png';
import icontwo from '../images/icon2.png';
import iconthree from '../images/icon3.png';
import iconfour from '../images/icon4.png';
import iconfive from '../images/icon5.png';
import iconsix from '../images/icon6.png';
import allimgs from '../images/allimgs.png';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <>
            <div className="section">
                <div>
                    <img className='shape-one' src={shape} alt="" />
                </div>
                <div className='section-text'>
                    <h1 className='section-title'>Build advanced chatbots <br />
                        visually</h1>
                    <p className='section-description'>Typebot gives you powerful blocks to create unique chat experiences. Embed them <br />
                        anywhere on your web/mobile apps and start collecting results like magic.</p>
                <Link to="/signup"><button className='section-button'>Create a FormBot  for free</button></Link> 
                </div>
                <div>
                    <img className='shape-two' src={shapeimg} alt="" />
                </div>
            </div>

            <div className='section-two'>
                <img className='dashboard-img' src={dashboardimg} alt="" srcset="" />
            </div>

            <div className='section-three'>
                <h1 className='section-three-title'>Replace your old school forms <br /> with <br />
                    chatbots</h1>
                <p className='section-three-description'>Typebot is a better way to ask for information. It leads to an increase in customer satisfaction and retention and multiply by <br /> 3
                    your conversion rate compared to classical forms.</p>
                <img src={img} alt="" srcset="" />
            </div>

            <div className='section-four'>
                <div>
                    <img className='section-four-img' src={imgdashboard} alt="" srcset="" />
                </div>
                <div>
                    <h1 className='section-four-title'>Easy building <br />
                        experience</h1>
                    <p className='section-four-description'>All you have to do is drag and <br />
                        drop blocks to create your app. <br />
                        Even if you have custom needs,<br />
                        you can always add custom <br />
                        code.</p>
                </div>
            </div>

            <div className='section-five'>
                <div>
                    <img className='section-five-img' src={imgtwo} alt="" srcset="" />
                </div>
                <div>
                    <h1 className='section-five-title'>Embed it in a click</h1>
                    <p className='section-five-description'>Embedding your typebot in <br />
                        your applications is a walk in <br />
                        the park. Typebot gives you <br />
                        several step-by-step platform- <br />
                        specific instructions. Your <br />
                        typebot will always feel "native".</p>
                </div>
            </div>

            <div className='section-six'>
                <div className='section-six-img-wrapper'>
                    <img className='section-six-img' src={compimg} alt="" />
                    <div className='section-six-gradient-left'></div>
                    <div className='section-six-gradient-right'></div>
                </div>
                <div className='text-section'>
                    <h1 className='section-six-title'>Integrate with any platform</h1>
                    <p className='section-six-description'>Typebot offers several native integrations blocks as well as instructions on <br />
                        how to embed typebot on particular platforms</p>
                </div>
            </div>

            <div className='section-seven'>
                <h1 className='section-seven-title'>Collect results in real-time</h1>
                <p className='section-seven-description'>One of the main advantage of a chat application is that you collect the user's responses on each question. <br />
                    <b> You won't lose any valuable data.</b></p>
                <img src={typebotimg} alt="" srcset="" />
            </div>

            <div className='section-eight'>
                <h1 className='section-eight-title'>And many more features</h1>
                <p className='section-eight-description'>Typebot makes form building easy and comes with powerful features</p>

                <div className='features-one'>
                    <div className='box'>
                        <img className='box-icon-one' src={iconone} alt="" srcset="" />
                        <h1 className='box-title'>Hidden fields</h1>
                        <p className='box-description'>Include data in your form URL to segment <br />
                            your user and use its data directly in your <br />
                            form.</p>
                    </div>
                    <div className='box'>
                        <img className='box-icon-one' src={icontwo} alt="" srcset="" />
                        <h1 className='box-title'>Team collaboration</h1>
                        <p className='box-description'>Invite your teammates to work on your <br />
                            typebots with you</p>
                    </div>
                    <div className='box'>
                        <img className='box-icon-one' src={iconthree} alt="" srcset="" />
                        <h1 className='box-title'>Link to sub typebots</h1>
                        <p className='box-description'>Reuse your typebots in different parent <br />
                            bots.</p>
                    </div>
                </div>

                <div className='features-two'>
                    <div className='box'>
                        <img className='box-icon-one' src={iconfour} alt="" srcset="" />
                        <h1 className='box-title'>Custom code</h1>
                        <p className='box-description'>Customize everything with your own <br />
                            Javascript & CSS code</p>
                    </div>
                    <div className='box'>
                        <img className='box-icon-one' src={iconfive} alt="" srcset="" />
                        <h1 className='box-title'>Custom domain</h1>
                        <p className='box-description'>Connect your typebot to the custom URL <br />
                            of your choice</p>
                    </div>
                    <div className='box'>
                        <img className='box-icon-one' src={iconsix} alt="" srcset="" />
                        <h1 className='box-title'>Folder management</h1>
                        <p className='box-description'>Organize your typebots in specific folders <br />
                            to keep it clean and work with multiple <br />
                            clients</p>
                    </div>
                </div>
            </div>

            <div className='section-nine'>
                <h1 className='section-nine-title'>Loved by teams and creators from all around the world</h1>
                <img src={allimgs} alt="" srcset="" />
            </div>

            <div className='section-ten'>
                <img src={shape} alt="" srcset="" />
                <div className='section-ten-text'>
                <div className='img-box-one'>
                        <img className='img-shape' src={shapeimg2} alt="" srcset="" />
                    </div>
                    <div>
                        <h1 className='section-ten-title'>Improve conversion and user engagement <br />
                            with FormBots </h1>
                            <Link to="/signup"><button className='section-ten-button'>Create a FormBot</button></Link>
                        <p className='section-ten-description'>No trial. Generous <b>free</b>  plan.</p>
                    </div>
                    <div className='img-box'>
                        <img className='img-shape' src={shapeimg2} alt="" srcset="" />
                    </div>
                </div>        
            </div>


        </>
    )
}

export default LandingPage;