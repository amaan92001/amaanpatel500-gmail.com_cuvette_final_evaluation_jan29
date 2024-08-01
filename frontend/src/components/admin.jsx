import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 

function AdminMessages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/forms/66a625af7fc37c0b87aef75e'); 
                const form = response.data;
                const adminMessages = form.flow
                    .filter(element => element.messageSide === 'admin')
                    .map(element => element.message)
                    .flat();
                setMessages(adminMessages);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {messages.map((message, index) => (
                <h1 key={index}>{message}</h1>
            ))}
        </div>
    );
}

export default AdminMessages;
