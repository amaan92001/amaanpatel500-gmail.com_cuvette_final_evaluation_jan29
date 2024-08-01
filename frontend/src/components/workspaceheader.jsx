import { RiCheckFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../api/axios';

function WorkspaceHeader({ formName, setFormName, linkCopied, setLinkCopied, elements, setElements }) {
    const navigate = useNavigate();
    const { formId } = useParams();
    const [formSaved, setFormSaved] = useState(false);

    useEffect(() => {
        const fetchFormDetails = async () => {
            try {
                const response = await axios.get(`/forms/${formId}`);
                setFormName(response.data.name || ''); 
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
                setTimeout(() => setFormSaved(false), 2000);
            }
        } catch (error) {
            console.error('Error saving form:', error);
        }
    };

    const handleShare = () => {
        const shareURL = `${window.location.origin}/sharedLink/${formId}`;
        navigator.clipboard.writeText(shareURL).then(() => {
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000); 
        }).catch(err => {
            console.error('Failed to copy link:', err);
        });
    };

    const handleCloseButtonClick = () => {
        navigate('/formdashboard'); 
    };

    return (
        <>
            <div className="workspace-navbar">
                <input 
                    placeholder="Enter Form Name" 
                    className="workspace-input" 
                    type="text" 
                    value={formName} 
                    onChange={(e) => setFormName(e.target.value)} 
                />
                <div className="workspace-middle-buttons">
                    <Link to={`/workspace/${formId}/flow`}><button className="flow-button">Flow</button></Link>
                    <Link to={`/workspace/${formId}/theme`} ><button className="theme-button">Theme</button></Link>
                    <Link to={`/workspace/${formId}/response`}><button className="response-button">Response</button></Link>
                </div>
                <div className="workspace-end-buttons">
                    <button 
                        onClick={handleShare} 
                        className="share-button">
                        Share
                    </button>
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="close-button" onClick={handleCloseButtonClick}>
                        <IoMdClose className="close-icon" />
                    </button>
                </div>
            </div>
            {linkCopied && <p className="link-copied-notification"><RiCheckFill className="check-icon" /> Link Copied</p>}
            {formSaved && <p className="link-copied-notification"><RiCheckFill className="check-icon" /> Form Saved!</p>}
        </>
    );
}

export default WorkspaceHeader;