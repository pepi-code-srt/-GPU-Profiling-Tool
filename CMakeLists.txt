cmake_minimum_required(VERSION 3.10)
project(GPU_Profiling_Tool)

set(CMAKE_CXX_STANDARD 17)

find_package(Vulkan REQUIRED)
find_package(OpenCL REQUIRED)

add_executable(gpu_profiling profiling_module/gpu_profiling.cpp)
target_link_libraries(gpu_profiling Vulkan::Vulkan)

add_executable(opencl_profiling profiling_module/opencl_profiling.cpp)
target_link_libraries(opencl_profiling OpenCL::OpenCL)

include_directories("C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v12.8/include")
