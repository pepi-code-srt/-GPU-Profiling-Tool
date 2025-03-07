#include <CL/cl.h>
#include <iostream>

void checkOpenCLError(cl_int err, const char* operation) {
    if (err != CL_SUCCESS) {
        std::cerr << "OpenCL Error during " << operation << ": " << err << std::endl;
    }
}

int main() {
    cl_platform_id platform;
    cl_device_id device;
    cl_context context;
    cl_int err;

    err = clGetPlatformIDs(1, &platform, NULL);
    checkOpenCLError(err, "clGetPlatformIDs");

    err = clGetDeviceIDs(platform, CL_DEVICE_TYPE_GPU, 1, &device, NULL);
    checkOpenCLError(err, "clGetDeviceIDs");

    context = clCreateContext(NULL, 1, &device, NULL, NULL, &err);
    checkOpenCLError(err, "clCreateContext");

    std::cout << "OpenCL Memory Profiling Initialized" << std::endl;
    
    clReleaseContext(context);
    return 0;
}
