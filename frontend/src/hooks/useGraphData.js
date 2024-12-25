import { useState, useEffect } from 'react';

// Helper function to calculate days in a month
const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();  // Returns number of days in the month
};

const useGraphData = (activeGraph, startDate, endDate, plotType, selectedMonth) => {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        const fetchCSV = async () => {
            const formattedStart = startDate.toISOString().slice(0, 10);
            const formattedEnd = endDate.toISOString().slice(0, 10);
        
            const response = await fetch(
                `/api/python/process-csv?start_date=${formattedStart}&end_date=${formattedEnd}&plot_type=${plotType}&month=${selectedMonth}`
            );
            
            const text = await response.text();
            const data = JSON.parse(text);
        
            let currentMonth = startDate.getMonth() + 1;
            let currentYear = startDate.getFullYear();
            let dayCounter = 0;
        
            const processedData = data.map((item) => {
                const daysInMonth = getDaysInMonth(currentMonth, currentYear);
                
                dayCounter += 1;

                // Reset to 1 if exceeding the number of days in the current month
                if (dayCounter > daysInMonth) {
                    dayCounter = 1;
                    currentMonth += 1;
                    if (currentMonth > 12) {
                        currentMonth = 1;
                        currentYear += 1;  // Increment year if January starts
                    }
                }

                return {
                    ...item,
                    day: item.Day || dayCounter,
                    month: currentMonth
                };
            });
        
            // 🔧 Refined Filtering for daily, weekly, monthly
            const filteredData = processedData.filter(item => {
                if (plotType === 'monthly') return true;  
                if (plotType === 'weekly') return item.Year === startDate.getFullYear();  // Only filter by year
                if (plotType === 'daily') return item.Month === parseInt(selectedMonth, 10) && item.Year === startDate.getFullYear();  
                return false;
            });
        
            setGraphData(filteredData);
        };

        fetchCSV();
    }, [activeGraph, startDate, endDate, plotType, selectedMonth]);

    return { graphData };
};

export default useGraphData;
