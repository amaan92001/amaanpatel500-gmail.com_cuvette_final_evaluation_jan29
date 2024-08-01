import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link  } from 'react-router-dom';
import { FiMessageSquare, FiImage } from "react-icons/fi";
import star from '../images/star.png';
import btn from '../images/btn.png';
import flag from '../images/flag.png';
import videoicon from '../images/video.png';
import gificon from '../images/gif.png';
import texticon from '../images/texticon.png';
import hicon from '../images/hicon.png';
import emailicon from '../images/emailicon.png';
import phone from '../images/phone.png';
import date from '../images/date.png';
import deleteicon from '../images/deletecircle.png';
import axios from '../api/axios';
import WorkspaceHeader from '../components/workspaceheader';

function WorkSpace() {
    const { formId } = useParams();
    const fileInputRefs = useRef({});
    const [formName, setFormName] = useState('');
    const [elements, setElements] = useState([]);
    const [formDetails, setFormDetails] = useState({});
    const [formSaved, setFormSaved] = useState(false);
    const navigate = useNavigate();
    const [linkCopied, setLinkCopied] = useState(false);

   
    useEffect(() => {
        const fetchFormDetails = async () => {
            try {
                const response = await axios.get(`/api/forms/${formId}`);
                setFormName(response.data.name);
            } catch (error) {
                console.error('Error fetching form details:', error);
            }
        };
        fetchFormDetails();
    }, [formId]);
    

    const handleSave = async () => {
        try {
            const response = await axios.put(`/api/forms/${formId}`, { flow: elements });
    
            if (response.status === 200) {
                setFormSaved(true);
                setTimeout(() => setFormSaved(false), 2000); // Notification disappears after 2 seconds
            }
        } catch (error) {
            console.error('Error saving form:', error);
        }
    };
    
    

    useEffect(() => {
        const fetchFormDetails = async () => {
            try {
                const response = await axios.get(`/api/forms/${formId}`);
                setFormDetails(response.data);
            } catch (error) {
                console.error('Error fetching form details:', error);
            }
        };
    
        fetchFormDetails();
    }, [formId]);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`/api/forms/${formId}`);
                const form = response.data;
                setElements(form.flow || []);
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchForm();
    }, [formId]);
    
    const handleBubbleClick = async (type) => {
        const newElement = { type, elementType: 'bubble', message: ['Enter your message here'],messageSide : 'admin' };
        const updatedElements = [...elements, newElement];
        setElements(updatedElements);
        
        try {
            await axios.put(`/api/forms/${formId}`, { flow: updatedElements });
        } catch (error) {
            console.error('Error updating form flow:', error);
        }
    };

    const handleFileUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;
    
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const fileUrl = response.data.url;
    
            const updatedElements = [...elements];
            updatedElements[index].url = fileUrl;
            setElements(updatedElements);
    
            await axios.put(`/api/forms/${formId}`, { flow: updatedElements });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    

    const handleFileInputClick = (index) => {
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].click();
        }
    };

    const handleDeleteElement = async (index) => {
        const updatedElements = elements.filter((_, i) => i !== index);
        setElements(updatedElements);
    
        try {
            await axios.put(`/api/forms/${formId}`, { flow: updatedElements });
        } catch (error) {
            console.error('Error updating form flow after deletion:', error);
        }
    };   

    const handleInputClick = async (type) => {
        const newElement = { type, elementType: 'input', message: [], messageSide : 'user' };
        const updatedElements = [...elements, newElement];
        setElements(updatedElements);
    
        try {
            await axios.put(`/api/forms/${formId}`, { flow: updatedElements });
        } catch (error) {
            console.error('Error updating form flow:', error);
        }
    };



    const renderElement = (element, index) => {
        if (element.elementType === 'bubble') {
            return renderBubble(element.type, index);
        } else if (element.elementType === 'input') {
            return renderInput(element.type, index);
        }
        return null;
    };
    
    
    const handleMessageChange = (index, newMessage) => {
        const updatedElements = [...elements];
        updatedElements[index].message = newMessage;
        setElements(updatedElements);
    
        try {
            axios.put(`/api/forms/${formId}`, { flow: updatedElements });
        } catch (error) {
            console.error('Error updating form flow:', error);
        }
    };

    const renderBubble = (type, index) => {
    switch (type) {
        case 'text':
            return (
                <div key={index} className="edit-text">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-bubble-heading">Text</p>
                    <div className="bubble-icon-input">
                        <FiMessageSquare className="edit-text-icon" />
                        <input
                            placeholder="Click here to edit"
                            type="text"
                            style={{ display: 'block' }} 
                            onChange={(e) => handleMessageChange(index, [e.target.value])}
                        />
                    </div>
                </div>
            );
        case 'image':
            return (
                <div key={index} className="edit-text">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-bubble-heading">Image</p>
                    <div className="bubble-icon-input">
                        <FiImage className="edit-text-icon"  />
                        <p className="add-link-text" onClick={() => handleFileInputClick(index)}>Click to add link</p>
                        <input
                            ref={el => fileInputRefs.current[index] = el}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, index)}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            );
        case 'video':
            return (
                <div key={index} className="edit-text">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-bubble-heading">Video</p>
                    <div className="bubble-icon-input">
                        <img src={videoicon} className="edit-text-icon" alt="video icon"/>
                        <p className="add-link-text" onClick={() => handleFileInputClick(index)} >Click to add link</p>
                        <input
                            ref={el => fileInputRefs.current[index] = el}
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleFileUpload(e, index)}
                            style={{ display: 'none' }} 
                        />
                    </div>
                </div>
            );
        case 'gif':
            return (
                <div key={index} className="edit-text">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-bubble-heading">GIF</p>
                    <div className="bubble-icon-input">
                        <img src={gificon} className="edit-text-icon" alt="gif icon" />
                        <p className="add-link-text" onClick={() => handleFileInputClick(index)}>Click to add link</p>
                        <input
                            ref={el => fileInputRefs.current[index] = el}
                            type="file"
                            accept="image/gif"
                            onChange={(e) => handleFileUpload(e, index)}
                            style={{ display: 'none' }} 
                        />
                    </div>
                </div>
            );
        default:
      return null;
    }
};

const renderInput = (type, index) => {
    switch (type) {
        case 'text':
            return (
                <div key={index} className="input-workspace-text-main">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-input-heading">Text</p>
                    <div className="icon-input-render">
                        <img src={texticon} className="icon-yellow" alt="text icon" />
                        <input placeholder="Click here to edit" type="text" required className="icon-input-render-input" onChange={(e) => handleMessageChange(index, [e.target.value])}/>
                    </div>
                </div>
            );
        case 'number':
            return (
                <div key={index} className="input-workspace-text-main">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-input-heading">Number</p>
                    <div className="icon-input-render">
                        <img src={hicon} className="icon-yellow" alt="number icon" />
                        <input placeholder="Enter number" type="number" required className="icon-input-render-input" onChange={(e) => handleMessageChange(index, [e.target.value])}  />
                    </div>
                </div>
            );
        case 'email':
            return (
                <div key={index} className="input-workspace-text-main">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-input-heading">Email</p>
                    <div className="icon-input-render">
                        <img src={emailicon} className="icon-yellow" alt="email icon" />
                        <input placeholder="Enter email" type="email" required className="icon-input-render-input" onChange={(e) => handleMessageChange(index, [e.target.value])}  />
                    </div>
                </div>
            );
        case 'phone':
            return (
                <div key={index} className="input-workspace-text-main">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-input-heading">Phone</p>
                    <div className="icon-input-render">
                        <img src={phone} className="icon-yellow" alt="phone icon" />
                        <input placeholder="Enter phone number" type="tel" required className="icon-input-render-input" onChange={(e) => handleMessageChange(index, [e.target.value])}  />
                    </div>
                </div>
            );
        case 'date':
            return (
                <div key={index} className="input-workspace-text-main">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-input-heading">Date</p>
                    <div className="icon-input-render">
                        <img src={date} className="icon-yellow" alt="date icon" />
                        <input placeholder="Enter date" type="date" required className="icon-input-render-input" onChange={(e) => handleMessageChange(index, [e.target.value])}  />
                    </div>
                </div>
            );
        case 'star':
            return (
                <div key={index} className="input-workspace-text-main">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-input-heading">Star Rating</p>
                    <div className="icon-input-render">
                        <img src={star} className="icon-yellow" alt="star icon" />
                        <input placeholder="Enter rating" type="number" required className="icon-input-render-input" onChange={(e) => handleMessageChange(index, [e.target.value])}  />
                    </div>
                </div>
            );
        case 'button':
            return (
                <div key={index} className="input-workspace-text-main">
                    <img
                        className="del-icon"
                        src={deleteicon}
                        alt="delete icon"
                        onClick={() => handleDeleteElement(index)}
                    />
                    <p className="title-input-heading">Button</p>
                    <div className="icon-input-render">
                        <img src={btn} className="text-icon-yellow" alt="button icon" />
                        <input placeholder="Button text" disabled value="Hi" type="text" className="icon-input-render-input" onChange={(e) => handleMessageChange(index, [e.target.value])}  />
                    </div>
                </div>
            );
        default:
            return null;
    }
};

    

return (
<>
    <div className="workspace-area">

            <WorkspaceHeader
                formName={formName}
                setFormName={setFormName}
                linkCopied={linkCopied}
                setLinkCopied={setLinkCopied}
                elements={elements}
                handleSave={handleSave}
            />

        <div className="area">
            <div className="workspace-sidebar">
                <p className="bubble-title">Bubbles</p>
                <div className="bubbles-one">
                    <button className="text-bubble" onClick={() => handleBubbleClick('text')}><FiMessageSquare className="t-icon" /> Text</button>
                    <button className="image-bubble" onClick={() => handleBubbleClick('image')}><FiImage className="image-icon" />Image</button>
                </div>
                <div className="bubbles-two">
                    <button className="video-bubble" onClick={() => handleBubbleClick('video')}><img src={videoicon} className="video-icon" alt="video icon" />Video</button>
                    <button className="gif-bubble" onClick={() => handleBubbleClick('gif')}><img src={gificon} className="gif-icon" alt="gif icon" />GIF</button>
                </div>

                <p className="input-button-title">Inputs</p>
                <div className="workspace-inputs-buttons">
                    <div className="input-one">
                    <button className="workspace-text-input" onClick={() => handleInputClick('text')}><img src={texticon} className="text-icon" alt="" />Text</button>
                    <button className="worksapce-number" onClick={() => handleInputClick('number')}><img src={hicon} className="h-icon" alt="" />Number</button>
                    </div>

                    <div className="input-two">
                    <button className="workspace-email" onClick={() => handleInputClick('email')}><img src={emailicon} className="email-icon" alt="" /> Email</button>
                    <button className="workspace-phone" onClick={() => handleInputClick('phone')}><img src={phone} className="phone-icon" alt="" /> Phone</button>
                    </div>

                    <div className="input-three">
                       <button className="workspace-date" onClick={() => handleInputClick('date')}><img src={date} className="date-icon" alt="" /> Date</button>
                       <button className="workspace-star" onClick={() => handleInputClick('star')}><img src={star} className="star-icon" alt="" /> Rating</button>
                    </div>

                    <div className="input-four">
                        <button className="workspace-btn" onClick={() => handleInputClick('button')}><img src={btn} className="btn-icon" alt="" /> Buttons</button>
                    </div>
                </div>
            </div>

            <div className="workspace-main">
                <div className="start"><img src={flag} className="flag-icon" alt="flag icon" />Start</div>

                <div className="element-section">
                    {elements.map((element, index) => renderElement(element, index))}
                </div>
                 
            </div>
        </div>
    </div>
    </> 
    );
}

export default WorkSpace;