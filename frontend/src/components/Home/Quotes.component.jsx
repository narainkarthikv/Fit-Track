import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Quotes.component.css';

const Quotes = ({ user }) => {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        fetchQuote(user);
    }, [user]);

    const fetchQuote = async (user) => {
        try {
            const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
                headers: {
                    'X-Api-Key': 'JfOwiyHyiwDRNeCqa/RPQg==cxrAlqAdpnbNusKB'
                }
            });
            setQuote(response.data[0].quote);
        }
        catch (err) {
            console.error("Error fetching Quotes");
        }
    }

    return (
        <div className="quote-container">
            <h1 className="quote-title">Quote of the Day</h1>
            <div className="quote-content">
                <p className="quote-text">"{quote}"</p>
            </div>
        </div>
    );
};

export default Quotes;
