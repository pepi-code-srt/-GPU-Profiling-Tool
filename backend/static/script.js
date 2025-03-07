document.addEventListener("DOMContentLoaded", () => {
    async function fetchSystemInfo() {
        try {
            const response = await fetch("/system_info"); 
            const data = await response.json();

            document.getElementById("cpu").innerText = data.cpu;
            document.getElementById("gpu").innerText = data.gpu;
            document.getElementById("ram").innerText = data.ram;
            document.getElementById("os").innerText = data.os;
        } catch (error) {
            console.error("Error fetching system info:", error);
        }
    }

    async function fetchGPUData() {
        try {
            const response = await fetch("/gpu_metrics");
            const data = await response.json();
            console.log("Fetched Data:", data);

            updateChart(data);
        } catch (error) {
            console.error("Error fetching GPU data:", error);
        }
    }

    function updateChart(data) {
        const ctx = document.getElementById('gpuChart').getContext('2d');

        if (!window.gpuChartInstance) {
            window.gpuChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        { label: 'GPU Usage (%)', borderColor: 'red', backgroundColor: 'rgba(255, 0, 0, 0.1)', fill: true, data: [] },
                        { label: 'Memory Usage (GB)', borderColor: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.1)', fill: true, data: [] },
                        { label: 'Temperature (°C)', borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.1)', fill: true, data: [] }
                    ]
                },
                options: {
                    responsive: true,
                    animation: { duration: 1000 },
                    scales: {
                        x: { title: { display: true, text: 'Time' } },
                        y: { beginAtZero: true, title: { display: true, text: 'Performance Metrics' } }
                    }
                }
            });
        }

        // Add new data points
        const labels = window.gpuChartInstance.data.labels;
        labels.push(new Date().toLocaleTimeString());
        if (labels.length > 20) labels.shift(); 

        window.gpuChartInstance.data.datasets[0].data.push(data.gpu_usage);
        window.gpuChartInstance.data.datasets[1].data.push(data.memory_usage);
        window.gpuChartInstance.data.datasets[2].data.push(data.temperature);

        window.gpuChartInstance.update();
    }

    function downloadCSV() {
        if (!window.gpuChartInstance) {
            alert("No data available for download.");
            return;
        }

        let csvContent = "Time,GPU Usage (%),Memory Usage (GB),Temperature (°C)\n";
        window.gpuChartInstance.data.labels.forEach((label, index) => {
            csvContent += `${label},${window.gpuChartInstance.data.datasets[0].data[index]},${window.gpuChartInstance.data.datasets[1].data[index]},${window.gpuChartInstance.data.datasets[2].data[index]}\n`;
        });

        let blob = new Blob([csvContent], { type: "text/csv" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "gpu_performance.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    document.getElementById("darkModeToggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    document.getElementById("downloadCSV").addEventListener("click", downloadCSV);

    fetchSystemInfo();
    fetchGPUData();
    setInterval(fetchGPUData, 5000);
});
