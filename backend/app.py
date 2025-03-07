from flask import Flask, jsonify, render_template
from flask_cors import CORS  # CORS to allow frontend API calls
import random
import platform
import psutil
import subprocess


app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

@app.route('/')
def home():
    return render_template("index.html")  # ✅ Serve the frontend

@app.route('/system_info')
def system_info():
    try:
        # Detect CPU using WMIC (Windows) or lscpu (Linux)
        if platform.system() == "Windows":
            cpu_info = subprocess.check_output("wmic cpu get name", shell=True).decode().split("\n")[1].strip()
        else:
            cpu_info = subprocess.check_output("lscpu | grep 'Model name'", shell=True).decode().split(":")[1].strip()

        # Detect GPU using WMIC (Windows) or lshw (Linux)
        if platform.system() == "Windows":
            gpu_info = subprocess.check_output("wmic path win32_videocontroller get name", shell=True).decode().split("\n")[1].strip()
        else:
            gpu_info = subprocess.check_output("lshw -C display | grep 'product'", shell=True).decode().strip()

    except Exception as e:
        cpu_info = "Unknown CPU"
        gpu_info = "Unknown GPU"

    return jsonify({
        "cpu": cpu_info,
        "gpu": gpu_info,
        "ram": f"{round(psutil.virtual_memory().total / (1024**3), 2)} GB",
        "os": platform.system() + " " + platform.release()
    })

@app.route('/gpu_metrics')
def get_gpu_metrics():
    data = {
        "gpu_usage": random.uniform(30, 90),
        "memory_usage": random.uniform(2, 6),
        "temperature": random.uniform(50, 80)
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
