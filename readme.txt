# GPU Profiling Tool - Installation & Usage Guide


**Note : this for Works on **Windows 11** with **NVIDIA GPUs** **
## **📌 Overview**
This project is a **GPU Profiling Tool** designed for real-time monitoring and performance analysis of NVIDIA GPUs. It uses **Vulkan, OpenCL, CUDA, and Flask** to fetch and visualize GPU metrics.

### **🔹 Features:**
✅ Real-time GPU Usage, Memory, and Temperature Monitoring  
✅ Vulkan and OpenCL Support  
✅ Web-Based Visualization using Chart.js  
✅ Flask Backend for API Integration  
✅ Works on **Windows 11** with **NVIDIA GPUs**  

---

## **📥 1. Prerequisites & Installation**
Before running this tool, install the following dependencies:

### **🔹 Required Software**
| Software  | Version |
|-----------|---------|
| **Windows** | Windows 11 |
| **NVIDIA GPU Driver** | Latest Version |
| **Vulkan SDK** | VulkanSDK-1.4.304.1-Installer |
| **CUDA Toolkit** | cuda_12.8.1_572.61_windows |
| **OpenCL SDK** | OpenCL-SDK-v2024.10.24-Win-x64 |
| **CMake** | cmake-4.0.0-rc3-windows-x86_64 |
| **Make** | Installed via terminal |

### **🔹 1.1 Install Required Dependencies**
#### **1️⃣ Install Vulkan SDK**
🔗 [Download Vulkan SDK](https://vulkan.lunarg.com/sdk/home)
1. Download **VulkanSDK-1.4.304.1-Installer**.
2. Install it and restart your system.
3. Verify installation by running:
   ```powershell
   echo %VULKAN_SDK%
   ```

#### **2️⃣ Install CUDA Toolkit**
🔗 [Download CUDA](https://developer.nvidia.com/cuda-downloads)
1. Download **cuda_12.8.1_572.61_windows**.
2. Follow the installation instructions and restart your PC.
3. Verify CUDA installation:
   ```powershell
   nvcc --version
   ```

#### **3️⃣ Install OpenCL SDK**
🔗 [Download OpenCL](https://github.com/KhronosGroup/OpenCL-SDK/releases)
1. Download **OpenCL-SDK-v2024.10.24-Win-x64**.
2. Extract and place it in `C:\Program Files\OpenCL`.
3. Verify OpenCL installation:
   ```powershell
   clinfo
   ```

#### **4️⃣ Install CMake & Make**
🔗 [Download CMake](https://cmake.org/download/)
1. Install **cmake-4.0.0-rc3-windows-x86_64**.
2. Install Make using **MinGW**:
   ```powershell
   winget install -e --id MSYS2.MSYS2
   ```
3. Verify installation:
   ```powershell
   cmake --version
   make --version
   ```

---

## **🚀 2. Clone & Build the Project**

### **🔹 2.1 Clone the Repository**
```powershell
git clone https://github.com/yourusername/GPU_Profiling_Tool.git
cd GPU_Profiling_Tool
```

### **🔹 2.2 Build the Project**
```powershell
mkdir build && cd build
cmake .. -G "MinGW Makefiles" -DCMAKE_C_COMPILER=gcc -DCMAKE_CXX_COMPILER=g++
mingw32-make
```

If successful, you should see:
✅ `gpu_profiling.exe`  
✅ `opencl_profiling.exe`

---

## **🖥️ 3. Run the Project**

### **🔹 3.1 Run the GPU Profiling Module**
```powershell
./gpu_profiling
```
✅ Expected output:
```
GPU Profiling Tool Initialized
```

### **🔹 3.2 Run the OpenCL Memory Profiling Module**
```powershell
./opencl_profiling
```
✅ Expected output:
```
OpenCL Memory Profiling Initialized
```

### **🔹 3.3 Start the Flask Backend**
```powershell
cd backend
python app.py
```
✅ API should be running at:  
🔗 **http://127.0.0.1:5000/gpu_metrics**

### **🔹 3.4 Start the Frontend**
1. Open `frontend/index.html` in a browser.
2. The **GPU Performance Dashboard** should display real-time GPU metrics.

---

## **📌 4. Troubleshooting**
| Issue  | Solution |
|--------|----------|
| `clinfo` not found | Ensure OpenCL SDK is installed & added to `PATH`. |
| `make` not found | Install MinGW and add `C:\MinGW\bin` to `PATH`. |
| Flask API not working | Ensure Flask is running (`python app.py`). |
| Graph not updating | Check `script.js` and ensure API response is correct. |

---

## **📌 5. Contributors**
This project was developed by **Virendar Oza**. Contributions are welcome! Feel free to open an issue or pull request.

---

## **🚀 Conclusion**
You have successfully installed and run the **GPU Profiling Tool** on **Windows 11 with NVIDIA GPUs**. If you have any questions or issues, feel free to raise an issue on GitHub! 🎉

