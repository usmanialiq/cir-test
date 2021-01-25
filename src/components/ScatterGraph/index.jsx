import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";
function ScatterGraph(props) {
    const [plot, setPlot] = useState([
        ['Value', 'Date'],
    ]);
    useEffect(() => {
        setTimeout(() => props.getScatterData(), 3000);
        let data = props.data, arr = plot;
        // console.log("Da", data);
        data && data.map(each => arr.push(each));
        if(arr.length > 122) {
            arr = arr.splice(1, 120);
            arr[0] = ["Value", "Date"];
            setTimeout(() => setPlot(arr), 3000);
        }
    });
    if(plot && plot.length < 100) {
        return <p>Graph is gathering data</p>;
    }
    return (
        <Chart 
            width={"700px"}
            height={"500px"}
            chartType="ScatterChart"
            loader={<div>Loading Line Chart</div>}
            data={plot}
            options={{
                title: "Live Value Vs Timestamp",
                hAxis: { title: "Live Value" },
                vAxis: { title: "Timestamp" },
                legend: "none"
            }}
            rootProps={{ "data-testid": 1 }}
        />
    );
}

export default ScatterGraph;