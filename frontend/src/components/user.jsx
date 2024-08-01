import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import arrow from '../images/sendarrow.png';

function UserMessage() {
    const { formId } = useParams();
    const [userInputs, setUserInputs] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            setTheme(savedTheme);
        }

        const fetchFormDetails = async () => {
            try {
                const response = await axios.get(`/api/forms/${formId}`);
                const form = response.data;
                const userInputs = form.flow.filter(element => element.messageSide === 'user');
                setUserInputs(userInputs);
            } catch (error) {
                console.error('Error fetching form details:', error);
            }
        };

        fetchFormDetails();
    }, [formId]);

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
            alert('Input submitted successfully!');
        } catch (error) {
            console.error('Error submitting input:', error);
            alert('Error submitting input. Please try again.');
        }
    };

    const renderInputs = () => {
        return userInputs.map((input, idx) => (
            <div key={idx} className="form-bot-user-inputs">
                <input
                    className="user-input-with-buttons"
                    type={input.type}
                    placeholder={input.message[0] || 'Enter value'}
                    value={inputValues[idx] || ''}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                />
                <button
                    className="send-button-formbot"
                    type="button"
                    onClick={() => handleSubmit(idx)}
                >
                    <img src={arrow} alt="Send" />
                </button>
            </div>
        ));
    };

    const themeStyles = {
        light: { backgroundColor: 'white' },
        dark: { backgroundColor: '#171923' },
        blue: { backgroundColor: '#508C9B' }
    };

    return (
        <div className="formbot-chat-main" style={themeStyles[theme]}>
            {renderInputs()}
        </div>
    );
}

export default UserMessage;
