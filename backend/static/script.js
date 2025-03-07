document.addEventListener("DOMContentLoaded", () => {
    async function fetchSystemInfo() {
        try {
            const response = await fetch("/system_info"); // New API for real system details
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
        if (labels.length > 20) labels.shift(); // Keep last 20 readings

        window.gpuChartInstance.data.datasets[0].data.push(data.gpu_usage);
        window.gpuChartInstance.data.datasets[1].data.push(data.memory_usage);
        window.gpuChartInstance.data.datasets[2].data.push(data.temperature);

        window.gpuChartInstance.update();
    }

    let lastTimestamp = performance.now();
    let frameCount = 0;
    let fps = 0;
    
    function calculateFPS() {
        frameCount++;
        let now = performance.now();
        if (now - lastTimestamp >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTimestamp = now;
            document.getElementById("fps").innerText = fps + " FPS";
        }
        requestAnimationFrame(calculateFPS);
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        calculateFPS(); // Start FPS tracking
    });
    document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

    fetchSystemInfo();
    fetchGPUData();
    setInterval(fetchGPUData, 5000); // Update every 5 seconds
});
