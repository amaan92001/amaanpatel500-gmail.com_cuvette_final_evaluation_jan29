import light from '../images/light.png';
import dark from '../images/dark.png';
import blue from '../images/blue.png';
import { FaCircleUser } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkspaceHeader from '../components/workspaceheader';
import axios from '../api/axios'; 
import './theme.css';

function Theme() {
    const [theme, setTheme] = useState(''); 
    const [formName, setFormName] = useState('');
    const [linkCopied, setLinkCopied] = useState(false);
    const { formId } = useParams();

    const handleThemeChange = async (theme) => {
        setTheme(theme);
        localStorage.setItem('selectedTheme', theme);

        try {
            await axios.patch(`/api/forms/${formId}/theme`, { theme });
        } catch (error) {
            console.error('Error updating theme:', error);
        }
    };

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
    
    const themeStyles = {
        light: { backgroundColor: 'white' },
        dark: { backgroundColor: '#171923' },
        blue: { backgroundColor: '#508C9B' }
    };

    return (
        <>
            <WorkspaceHeader
                formName={formName}
                setFormName={setFormName}
                linkCopied={linkCopied}
                setLinkCopied={setLinkCopied}
            />
            <div className="customize-theme">
                <div className="theme-sidebar">
                    <h1 className="theme-title">Customize the theme</h1>
                    <div>
                        <img className="light-theme" src={light} alt="Light Theme" onClick={() => handleThemeChange('light')} />
                    </div>
                    <div>
                        <img className="dark-theme" src={dark} alt="Dark Theme" onClick={() => handleThemeChange('dark')} />
                    </div>
                    <div>
                        <img className="blue-theme" src={blue} alt="Blue Theme" onClick={() => handleThemeChange('blue')} />
                    </div>
                </div>
                <div className="theme-area" style={themeStyles[theme]}>
                    <div className="msg-area">
                        <div className="admin-msg">
                            <FaCircleUser className="circle-msg-icon" /> <h1 className="admin-text">Hello</h1>
                        </div> 
                        <div className="user-msg">
                            <h1 className="user-text">Hi</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Theme;
