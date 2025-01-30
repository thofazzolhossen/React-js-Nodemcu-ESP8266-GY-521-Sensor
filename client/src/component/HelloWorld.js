import { useEffect, useState } from "react";


const HelloWorld = () => {
    const [message, setMessage] = useState("Loading...");

    const fetchMessage = async () => {
        try {
            const response = await fetch("http://192.168.0.5/message");
            const text = await response.text();
            setMessage(text);
        } catch (error) {
            console.error("Error fetching message:", error);
            setMessage("Failed to load message");
        }
    };
    

    useEffect(() => {
        fetchMessage();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1F2937' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '24px', backgroundColor: '#2D3748', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '16px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'white', backgroundColor: '#3182CE', padding: '12px', borderRadius: '8px' }}>
                ESP8266 Message
            </h2>
            <h3 style={{ fontSize: '18px', color: '#E2E8F0', marginTop: '16px' }}>{message}</h3>
        </div>
    </div>
    
    );
};

export default HelloWorld;
