import React, { useState } from "react";
import LineChart from "../../components/LineGraph";
import GaugeChart from "../../components/GaugeGraph";
import ScatterGraph from "../../components/ScatterGraph";

import { w3cwebsocket as W3CWebSocket } from "websocket";
const ENDPOINT = "wss://eaau0dhgl6.execute-api.us-east-1.amazonaws.com/dev";

function Live() {
    const [lineData, setLineData] = useState([]);
    const [gaugeData, setGaugeData] = useState([]);
    const [scatterData, setScatterData] = useState([]);

    const getLineGraphData = () => {
        const client = new W3CWebSocket(ENDPOINT);
        client.onerror = function() {
          console.log('Connection Error');
        };
        client.onopen = () => {
          console.log('WebSocket Client Connected');
          client.onmessage = (message) => {
            let data = JSON.parse(message.data);
            let arr = [];
            arr = lineData;
            if(data && data.line_graph && data.line_graph.length > 0) {
              data.line_graph.map(item => arr.push(item));
            }
            if(arr && arr.length >= 512) {
                let newArr = arr.splice(0, 512);
                setLineData(newArr);
            }
          };
        }
    }
    
    const getGaugeGraphData = () => {
        const client = new W3CWebSocket(ENDPOINT);
        client.onerror = function() {
          console.log('Connection Error');
        };
        client.onopen = () => {
          console.log('WebSocket Client Connected');
          client.onmessage = (message) => {
            let data = JSON.parse(message.data),
              value = data.live_value;
            if(value === "") {
              value = 0;
            }
            if(isNaN(value)) {
                value = 0;
            }
            setGaugeData(parseInt(value));
          };
        }
    }
    
    const getScatterGraphData = () => {
        const client = new W3CWebSocket(ENDPOINT);
        client.onerror = function() {
            console.log('Connection Error');
        };
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            client.onmessage = (message) => {
                let data = JSON.parse(message.data),
                    arr = [], 
                    value = data.live_value,
                    datestamp = data.timestamp;
                arr = scatterData;
                arr.push([value, new Date(datestamp)]);
                // console.log("new", arr);
                setScatterData(arr);
            };
        }
    }
    return (
        <div className="container">
            <h4 className="lead mt-4">Line Graph</h4>
            <LineChart 
                getLineData={getLineGraphData} 
                data={lineData}
            />
            
            <h4 className="lead mt-4">Gauge Graph</h4>
            <GaugeChart 
                getGaugeData={getGaugeGraphData} 
                data={gaugeData}
            />
            
            <h4 className="lead mt-4">Scatter Graph</h4>
            <ScatterGraph 
                getScatterData={getScatterGraphData} 
                data={scatterData}
            />
        </div>
    );
}

export default Live;