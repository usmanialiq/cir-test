import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";
function LineGraph(props) {
    const [plot, setPlot] = useState([
        ['Label', 'Value'],
    ]);
    useEffect(() => {
        setTimeout(() => props.getLineData(), 3000);
        let data = props.data, arr = plot;
        data && data.map((item, index) => arr.push([index, item]));
        if(arr.length > 514) {
            arr = arr.splice(1, 512);
            arr[0] = ["Label", "Value"];
            setTimeout(() => setPlot(arr), 3000);
        }
    }, [plot, props]);
    if(plot && plot.length < 500) {
        return <p>Graph is gathering data</p>;
    }
    return (
        <Chart 
            width={"700px"}
            height={"500px"}
            chartType="LineChart"
            loader={<div>Loading Line Chart</div>}
            data={plot}
            options={{
                vAxis: {
                    title: ""
                },
                hAxis: {
                    title: "Live Value"
                }
            }}
            rootProps={{ "data-testid": 1 }}
        />
    );
}

export default LineGraph;