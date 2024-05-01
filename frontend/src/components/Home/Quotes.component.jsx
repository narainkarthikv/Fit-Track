import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quotes = ({user}) => {
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
            console.log(user, response.data[0].quote);
            setQuote(response.data[0].quote); 
        }
        catch(err){
            console.error("Error fetching Quotes");
        }
    }

    return (
        <div>
            <h1>Inspirational Quote</h1>
            <p>{quote}</p>
        </div>
    );
};

export default Quotes;
