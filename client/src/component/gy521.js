import { useEffect, useState } from "react";

const Gy521 = () => {
    const [accelerometer, setAccelerometer] = useState({ ax: 0, ay: 0, az: 0 });
    const [gyroscope, setGyroscope] = useState({ gx: 0, gy: 0, gz: 0 });
    const [message, setMessage] = useState("Loading...");

    // Function to fetch data from ESP8266
    const fetchMessage = async () => {
        try {
            const response = await fetch("http://192.168.0.5/message");
            const data = await response.json(); // Parse the JSON data
            // Update accelerometer and gyroscope values
            setAccelerometer({
                ax: data.ax,
                ay: data.ay,
                az: data.az,
            });
            setGyroscope({
                gx: data.gx,
                gy: data.gy,
                gz: data.gz,
            });
        } catch (error) {
            console.error("Error fetching message:", error);
            setMessage("Failed to load message");
        }
    };

    useEffect(() => {
        // Fetch the message immediately on mount
        fetchMessage();

        // Set up the interval to fetch the data every 1 second (1000 ms)
        const interval = setInterval(() => {
            fetchMessage();
        }, 500);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);  // Empty dependency array ensures this runs only once on mount

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1F2937' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '24px', backgroundColor: '#2D3748', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '16px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'white', backgroundColor: '#3182CE', padding: '12px', borderRadius: '8px' }}>
                    ESP8266, Gy521 & React js
                </h2>
                <h3 style={{ fontSize: '18px', color: '#E2E8F0', marginTop: '16px' }}>
                    Accelerometer:
                    <br />
                    X: {accelerometer.ax} <br></br> Y: {accelerometer.ay}<br></br> Z: {accelerometer.az}
                </h3>
                <hr></hr>
                <h3 style={{ fontSize: '18px', color: '#E2E8F0', marginTop: '16px' }}>
                    Gyroscope:
                    <br />
                    X: {gyroscope.gx}<br></br> Y: {gyroscope.gy}<br></br> Z: {gyroscope.gz}
                </h3>
            </div>
        </div>
    );
};

export default Gy521;
