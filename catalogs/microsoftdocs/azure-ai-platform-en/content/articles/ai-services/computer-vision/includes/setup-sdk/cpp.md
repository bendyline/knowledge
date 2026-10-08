---
author: PatrickFarley
ms.service: azure-vision-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 08/01/2023
ms.author: pafarley
---

[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/vision) | [Packages (NuGet)](https://www.nuget.org/packages/Azure.AI.Vision.ImageAnalysis) | [Samples](https://github.com/Azure-Samples/azure-ai-vision-sdk)

This guide shows how to install the Vision SDK for C++.

## Platform requirements


The Image Analysis SDK for C++ is compatible with Windows, Linux, and macOS.

# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 10 or later is required.

You must install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

# [Linux](#tab/linux)

The Image Analysis SDK for C++ only supports **Ubuntu 18.04/20.04/22.04** and **Debian 9/10/11** on the x64 architecture when used with Linux.


> **Important:**
> Use the most recent LTS release of the Linux distribution. For example, if you are using Ubuntu 20.04 LTS, use the latest release of Ubuntu 20.04.X.

The Image Analysis SDK depends on the following Linux system libraries:

- The shared libraries of the GNU C library, including the POSIX Threads Programming library, `libpthreads`
- The OpenSSL library (`libssl`) version 1.x

> **Important:**
> The Image Analysis SDK does not yet support OpenSSL 3.0, which is the default in Ubuntu 22.04 and Debian 12. 

To install OpenSSL 1.x from sources on Debian/Ubuntu based systems that don't have it, do:
```Bash
wget -O - https://www.openssl.org/source/openssl-1.1.1u.tar.gz | tar zxf -
cd openssl-1.1.1u
./config --prefix=/usr/local
make -j $(nproc)
sudo make install_sw install_ssldirs
sudo ldconfig -v
export SSL_CERT_DIR=/etc/ssl/certs
```
Notes on installation:
- Check https://www.openssl.org/source/ for the latest OpenSSL 1.x version to use.
- The setting of `SSL_CERT_DIR` must be in effect systemwide or at least in the console where applications that use the Image Analysis SDK are launched from, otherwise OpenSSL 1.x installed in `/usr/local` may not find certificates.
- Ensure that the console output from `ldconfig -v` includes `/usr/local/lib` as it should on modern systems by default. If this isn't the case, set `LD_LIBRARY_PATH` (with the same scope as `SSL_CERT_DIR`) to add `/usr/local/lib` to the library path:
  ```Bash
  export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
  ```

# [Ubuntu 18.04/20.04/22.04](#tab/ubuntu)

```Bash
sudo apt-get update
sudo apt-get install build-essential libssl-dev wget
```

# [Debian 9/10/11](#tab/debian)

To use the Image Analysis SDK in Alpine Linux, create a Debian chroot environment as documented in the Alpine Linux Wiki on [running glibc programs](https://wiki.alpinelinux.org/wiki/Running_glibc_programs). Then follow the Debian instructions here.

```Bash
sudo apt-get update
sudo apt-get install build-essential libssl-dev wget
```

---


---


## Install the Vision SDK for C++

# [Windows](#tab/windows)



The Image Analysis SDK for C++ is available as a NuGet package. For more information, see <a href="https://www.nuget.org/packages/Azure.AI.Vision.ImageAnalysis" target="_blank">Azure.AI.Vision.ImageAnalysis</a>.

Open Visual Studio and create a new application project. Then install the client SDK by right-clicking on the project solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse**, check **Include prerelease**, and search for `Azure.AI.Vision.ImageAnalysis`. Select **Install**.





# [Linux](#tab/linux)


Installing the Image Analysis SDK package requires your device to support the APT/Debian package manager.

### Ubuntu 18.04, Ubuntu 20.04, Ubuntu 22.04, Debian 10 (Buster)

1. The Debian package is hosted on a Microsoft feed. To install the package, you first need to add the Microsoft feed to your device's package manager. To do that, run the following commands:

   * For Ubuntu 18.04 (Bionic Beaver)
   ```sh
   sudo apt install wget dpkg
   wget "https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb"
   sudo dpkg -i packages-microsoft-prod.deb 
   ```

   * For Ubuntu 20.04 (Focal Fossa)
   ```sh
   sudo apt install wget dpkg
   wget "https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb"
   sudo dpkg -i packages-microsoft-prod.deb 
   ```

   * For Ubuntu 22.04 (Jammy Jellyfish)
   ```sh
   sudo apt install wget dpkg
   wget "https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb"
   sudo dpkg -i packages-microsoft-prod.deb 
   ```

   * For Debian 10 (Buster)
   ```sh
   sudo apt install wget dpkg
   wget "https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb"
   sudo dpkg -i packages-microsoft-prod.deb 
   ```

1. Now install the Image Analysis SDK Debian package required to build the sample:

    ```sh
    sudo apt update
    sudo apt install azure-ai-vision-dev-image-analysis
    ```

1. Notice that the above package _azure-ai-vision-dev-image-analysis_ depends on other Image Analysis SDK packages, which will be installed automatically. Run `apt list azure-ai-vision*` to see the list of installed Image Analysis SDK packages:
   * _azure-ai-vision-dev-common_
   * _azure-ai-vision-dev-image-analysis_
   * _azure-ai-vision-runtime-common_
   * _azure-ai-vision-runtime-image-analysis_

### Other Linux platforms

1. Directly download the following five packages to your device:
    ```sh
    wget https://packages.microsoft.com/repos/microsoft-ubuntu-bionic-prod/pool/main/a/azure-ai-vision-dev-common/azure-ai-vision-dev-common-0.13.0~beta.1-Linux.deb
    wget https://packages.microsoft.com/repos/microsoft-ubuntu-bionic-prod/pool/main/a/azure-ai-vision-dev-image-analysis/azure-ai-vision-dev-image-analysis-0.13.0~beta.1-Linux.deb
    wget https://packages.microsoft.com/repos/microsoft-ubuntu-bionic-prod/pool/main/a/azure-ai-vision-runtime-common/azure-ai-vision-runtime-common-0.13.0~beta.1-Linux.deb
    wget https://packages.microsoft.com/repos/microsoft-ubuntu-bionic-prod/pool/main/a/azure-ai-vision-runtime-image-analysis/azure-ai-vision-runtime-image-analysis-0.13.0~beta.1-Linux.deb
    ```
1. Install the five packages:
    ```sh
    sudo apt update
    sudo apt install ./azure-ai-vision-dev-common-0.13.0~beta.1-Linux.deb ./azure-ai-vision-dev-image-analysis-0.13.0~beta.1-Linux.deb ./azure-ai-vision-runtime-common-0.13.0~beta.1-Linux.deb ./azure-ai-vision-runtime-image-analysis-0.13.0~beta.1-Linux.deb
    ```

### Verify installation

Verify installation succeeded by listing these folders:

   ```
   ls -la /usr/lib/azure-ai-vision
   ls -la /usr/include/azure-ai-vision
   ls -la /usr/share/doc/azure-ai-vision-*
   ```

You should see shared object files named `libAzure-AI-Vision-*.so` and a few others in the first folder.

You should see header files named `vsion_api_cxx_*.hpp` and others in the second folder.

You should see package documents in the /usr/share/doc/azure-ai-vision-* folders (LICENSE.md, REDIST.txt, ThirdPartyNotices.txt).

## Cleanup

The Image Analysis SDK Debian packages can be removed by running this single command:

```
 sudo apt-get purge azure-ai-vision-*
```

## Required libraries for run-time distribution

The folder `/usr/lib/azure-ai-vision` contains several shared object libraries (`.so` files), needed to support different sets of Image Analysis SDK APIs. For Image Analysis, only the following subset is needed when you distribute a run-time package of your application:

```
libAzure-AI-Vision-Native.so
libAzure-AI-Vision-Extension-Image.so
```


---
