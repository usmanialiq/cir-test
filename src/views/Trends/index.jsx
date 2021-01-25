import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";
function ScatterGraph() {
    const [plot, setPlot] = useState([
        ['Value Min', 'Value Max'],
    ]);
    useEffect(() => {
        randomData();
    }, []);
    const randomData = () => {
        let data  = plot;
        let arr = Array.from({length: 1000}, () => [Math.floor(Math.random() * 10000), Math.floor(Math.random() * 7000)]);
        arr = data.concat(arr);
        if(plot.length > 1000) {
            arr[0] = ["Value Min", "Value Max"];
            arr = arr.splice(0, 1000);
            setPlot(arr);
        }
        else {
            setPlot(arr);
        }
        console.log("Since React Google Graph was not able to handle 100,00 values, /n so I just switched to 1000 instead for better plotting", plot.length)
    }
    return (
        <div>
            <button 
                className="btn btn-primary"
                onClick={() => randomData()}>Generate Random Data</button>
            <Chart 
                width={"900px"}
                height={"500px"}
                chartType="ScatterChart"
                loader={<div>Loading Line Chart</div>}
                data={plot}
                options={{
                    title: "Min Value Vs Max Value",
                    hAxis: { title: "Min Value" },
                    vAxis: { title: "Max Value" },
                    legend: "none"
                }}
                rootProps={{ "data-testid": 1 }}
            />
        </div>
    );
}

export default ScatterGraph;