import { useState, useEffect } from 'react';

const useGraphData = (activeGraph, startDate, endDate, plotType, selectedMonth) => {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        const fetchCSV = async () => {
            try {
                const response = await fetch(
                    `/api/python/process-csv?start_date=${startDate.toISOString().slice(0, 10)}&end_date=${endDate.toISOString().slice(0, 10)}&plot_type=${plotType}&month=${selectedMonth}`
                );
                
                const text = await response.text();
                console.log("Raw API Response:", text);  // Debugging
        
                try {
                    const data = JSON.parse(text);
                    console.log("Parsed API Data:", data);
        
                    if (data.error) {
                        console.warn(data.error);
                        setGraphData([]);
                        return;
                    }
        
                    const processed = processData(data, activeGraph, plotType);
                    console.log("Processed Data for Graph:", processed);
                    setGraphData(processed);
                } catch (jsonError) {
                    console.error("Failed to parse JSON. Response Text:", text);
                    setGraphData([]);
                }
            } catch (error) {
                console.error("Error fetching CSV data:", error);
                setGraphData([]);
            }
        };     

        fetchCSV();
    }, [activeGraph, startDate, endDate, plotType, selectedMonth]);  // Ensure month/plotType triggers API call

    const processData = (data, type, plotType) => {
        if (plotType === 'daily') {
            return data.map((row) => ({
                day: new Date(row.Date).getDate(),  // Extract day from date
                signal: row['Validated Inference Score'],
                selfReported: row.response,
            }));
        } else if (plotType === 'weekly') {
            return data.map((row) => ({
                week: `Week ${row.Week}`,
                signal: row['Validated Inference Score'],
                selfReported: row.response,
            }));
        } else {
            return data.map((row) => ({
                month: row.Month,
                signal: row['Validated Inference Score'],
                selfReported: row.response,
            }));
        }
    };

    return { graphData };
};

export default useGraphData;
