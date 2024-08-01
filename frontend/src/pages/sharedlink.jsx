import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { FaCircleUser } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import arrow from '../images/sendarrow.png';
import { useWindowSize } from 'react-use';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SharedLink() {
    const { formId } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const [submittedInputs, setSubmittedInputs] = useState({});
    const [submittedRatings, setSubmittedRatings] = useState({});
    const [theme, setTheme] = useState('');
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const { width, height } = useWindowSize();
    const chatEndRef = useRef(null);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);

    useEffect(() => {
        const incrementViewCount = async () => {
            try {
                await axios.post(`/api/forms/${formId}/increment-views`);
            } catch (error) {
                console.error('Error incrementing views:', error);
            }
        };
        incrementViewCount();
    }, [formId]);

    const handleInteraction = async () => {
        try {
            await axios.post(`/api/forms/${formId}/increment-starts`);
        } catch (error) {
            console.error('Error incrementing starts:', error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                handleSubmit(currentMessageIndex);
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentMessageIndex, inputValues]);


    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            setTheme(savedTheme);
        }

        const fetchFormDetails = async () => {
            try {
                const response = await axios.get(`/api/forms/${formId}`);
                const form = response.data;
                setMessages(form.flow);
            } catch (error) {
                console.error('Error fetching form details:', error);
            }
        };

        fetchFormDetails();
    }, [formId]);

    useEffect(() => {
        if (currentMessageIndex < messages.length) {
            const currentMessage = messages[currentMessageIndex];

            if (currentMessage.messageSide === 'admin') {
                setIsTyping(true);
                const typingTimer = setTimeout(() => {
                    setIsTyping(false);
                    const displayTimer = setTimeout(() => {
                        setCurrentMessageIndex(currentMessageIndex + 1);
                        scrollToBottom();
                    }, 2000);
                    return () => clearTimeout(displayTimer);
                }, 2000);

                return () => clearTimeout(typingTimer);
            }
        }
    }, [currentMessageIndex, messages]);

    const handleButtonClick = (index) => {
        handleSubmit(index);
        handleInteraction();
    };

    const handleInputChange = (index, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [index]: value
        }));
    };

    const handleSubmit = async (index) => {
        try {
            const dataToSubmit = {
                formId: formId,
                inputValues: { [index]: inputValues[index] }
            };
            await axios.post('/api/forms/submit', dataToSubmit);
            setSubmittedInputs(prevSubmitted => ({
                ...prevSubmitted,
                [index]: true
            }));

            if (messages[index].type === 'star') {
                setSubmittedRatings(prevSubmitted => ({
                    ...prevSubmitted,
                    [index]: true
                }));
            }

            if (currentMessageIndex + 1 >= messages.length) {
                toast.success('Form submitted successfully!');
            } else {
                setCurrentMessageIndex(currentMessageIndex + 1);
            }
            scrollToBottom();
        } catch (error) {
            console.error('Error submitting input:', error);
            toast.error('Error submitting input. Please try again.');
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight) {
            setShowScrollIndicator(true);
        } else {
            setShowScrollIndicator(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const renderRating = (idx) => (
        <div className={`rating-container ${submittedRatings[idx] ? 'submitted' : ''}`}>
            {[1, 2, 3, 4, 5].map(num => (
                <div
                    key={num}
                    className={`rating-circle ${inputValues[idx] === num ? 'selected' : ''}`}
                    onClick={() => handleInputChange(idx, num)}
                >
                    {num}
                </div>
            ))}
        </div>
    );

    const renderMessage = (message, idx) => {
        if (idx > currentMessageIndex) return null;
    
        if (message.messageSide === 'admin') {
            return (
                <div key={idx} className="form-bot-admin-msg">
                    <div className="admin-msg-bot">
                        <FaCircleUser className="circle-msg-icon" />
                        {isTyping && idx === currentMessageIndex ? (
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        ) : message.url ? (
                            renderMedia(message.url, message.type)
                        ) : (
                            <h1 className="admin-text">{message.message[0]}</h1>
                        )}
                    </div>
                </div>
            );
        } else {
            const isSubmitted = submittedInputs[idx];
            const isButtonMessage = message.type === 'button';
            const isRatingMessage = message.type === 'star';
    
            return (
                <div key={idx} className="form-bot-user-inputs">
                    {isButtonMessage ? (
                        <button
                            className="send-button-formbot hi-button"
                            type="button"
                            onClick={() => handleButtonClick(idx)}
                            style={{
                                backgroundColor: isSubmitted ? '#FF8E21' : '#053EC4',
                                color: 'white',
                                cursor: isSubmitted ? 'not-allowed' : 'pointer',
                                width: '55px',
                                height: '45px',
                                borderRadius: '6px',
                                border: 'none',
                                fontSize: '16px',
                                fontFamily: 'Open Sans, sans-serif'
                            }}
                            disabled={isSubmitted}
                        >
                            Hi
                            {!isSubmitted && <div className="indicator"></div>}
                        </button>
                    ) : isRatingMessage ? (
                        <>
                            {renderRating(idx)}
                            <button
                                className="send-button-formbot"
                                type="button"
                                onClick={() => handleSubmit(idx)}
                                style={{
                                    backgroundColor: isSubmitted ? '#777777' : '',
                                    cursor: isSubmitted ? 'not-allowed' : 'pointer',
                                    marginLeft: '10px'
                                }}
                                disabled={isSubmitted}
                            >
                                <img src={arrow} alt="Send" />
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                className="user-input-with-buttons"
                                type={message.type}
                                placeholder={'Enter your details'}
                                value={inputValues[idx] || ''}
                                onChange={(e) => handleInputChange(idx, e.target.value)}
                                disabled={isSubmitted}
                                required
                            />
                            <button
                                className="send-button-formbot"
                                type="button"
                                onClick={() => handleSubmit(idx)}
                                style={{
                                    backgroundColor: isSubmitted ? '#777777' : '',
                                    cursor: isSubmitted ? 'not-allowed' : 'pointer'
                                }}
                                disabled={isSubmitted}
                            >
                                <img src={arrow} alt="Send" />
                            </button>
                        </>
                    )}
                </div>
            );
        }
    };
    

    const renderMedia = (fileUrl, type) => {
        switch (type) {
            case 'image':
                return <img src={fileUrl} alt="Uploaded media" className="uploaded-media" />;
            case 'video':
                return <video src={fileUrl} controls className="uploaded-media" />;
            case 'gif':
                return <img src={fileUrl} alt="Uploaded GIF" className="uploaded-media" />;
            default:
                return null;
        }
    };

    const themeStyles = {
        light: { backgroundColor: 'white' },
        dark: { backgroundColor: '#171923' },
        blue: { backgroundColor: '#508C9B' }
    };

    return (
        <div className="formbot-chat-main" style={themeStyles[theme]}>
            <div className="messages-container">
                {messages.map((msg, idx) => renderMessage(msg, idx))}
                <div ref={chatEndRef}></div>
            </div>
            {showScrollIndicator && (
                <div className="scroll-indicator" onClick={scrollToBottom}>
                    <FaChevronDown />
                </div>
            )}
            <ToastContainer />
        </div>
    );
    
}

export default SharedLink;