#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <MPU6050.h>  // Include the MPU6050 library for GY-521 module

const char* ssid = "-----";       // Replace with your WiFi SSID
const char* password = "--------";    // Replace with your WiFi Password

ESP8266WebServer server(80);           // Start a web server on port 80
MPU6050 mpu;                          // Create an MPU6050 object

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting...");
    }

    Serial.println("Connected to WiFi");
    Serial.print("ESP8266 IP Address: ");
    Serial.println(WiFi.localIP());

    // Initialize GY-521 (MPU6050)
    Wire.begin();
    mpu.initialize();

    // Define the API route
    server.on("/message", []() {
        // Read accelerometer and gyroscope data
        int16_t ax, ay, az, gx, gy, gz;
        mpu.getAcceleration(&ax, &ay, &az);  // Get accelerometer data
        mpu.getRotation(&gx, &gy, &gz);      // Get gyroscope data

        // Format the data as a JSON string (separate axes data)
        String message = "{";
        message += "\"ax\": " + String(ax) + ",";
        message += "\"ay\": " + String(ay) + ",";
        message += "\"az\": " + String(az) + ",";
        message += "\"gx\": " + String(gx) + ",";
        message += "\"gy\": " + String(gy) + ",";
        message += "\"gz\": " + String(gz);
        message += "}";

        // Send the data back to the client
        server.sendHeader("Access-Control-Allow-Origin", "*");
        server.send(200, "application/json", message);
    });

    server.begin();
    Serial.println("Server started");
}

void loop() {
    server.handleClient(); // Handle client requests
}
