import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";
function GaugeGraph(props) {
    const [plot, setPlot] = useState(0);
    useEffect(() => {
        setTimeout(() => props.getGaugeData(), 3000);
        let data = props.data
        setTimeout(() => setPlot(data), 3000);
    });
    return (
        <Chart 
            width={500}
            height={300}
            chartType="Gauge"
            loader={<div>Loading Line Chart</div>}
            data={[
                ["Label", "Value"],
                ["Live", plot]
            ]}
            rootProps={{ "data-testid": 1 }}
        />
    );
}

export default GaugeGraph;