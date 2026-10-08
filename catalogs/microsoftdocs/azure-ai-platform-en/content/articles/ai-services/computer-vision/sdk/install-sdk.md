---
title: Install the Image Analysis SDK
titleSuffix: Foundry Tools
description: In this guide, you learn how to install the Image Analysis SDK for your preferred programming language.
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.topic: quickstart
ms.date: 09/26/2025
ms.author: pafarley
ms.custom: devx-track-python, devx-track-csharp, devx-track-extended-java, devx-track-js, linux-related-content
zone_pivot_groups: programming-languages-vision-40-sdk
---

# Install the Image Analysis SDK


**Applies to: programming-language-csharp**


[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/csharp) | [Package (NuGet)](https://aka.ms/azsdk/image-analysis/package/nuget) | [Samples](https://aka.ms/azsdk/image-analysis/samples/csharp)

This guide shows how to install the Image Analysis SDK for C#. 

## Platform requirements


The Image Analysis SDK for C# is compatible with Windows, Linux, and macOS.
- [.NET](https://dotnet.microsoft.com/download/dotnet) installed. This installation also includes the [.NET CLI](https://learn.microsoft.com/dotnet/core/tools/).

<!--
# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 10 or later is required.

You must install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](/cpp/windows/latest-supported-vc-redist?view=msvc-170&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

# [Linux](#tab/linux)

The Image Analysis SDK for C# only supports **Ubuntu 18.04/20.04/22.04** and **Debian 9/10/11** on the x64 architecture when used with Linux.

[!INCLUDE [Linux distributions](linux-distributions.md)]

---
-->


## Install the Image Analysis SDK for C#

The Image Analysis SDK for C# is available as a NuGet package and implements .NET Standard 2.0. For more information, see <a href="https://www.nuget.org/packages/Azure.AI.Vision.ImageAnalysis" target="_blank">Azure.AI.Vision.ImageAnalysis</a>.


# [Terminal](#tab/dotnetcli)

The Image Analysis SDK for C# can be installed from the [.NET CLI](https://dotnet.microsoft.com/download/dotnet/). To add a package reference in your project file, run this command in the folder where your `.csproj` file is located:

```dotnetcli
dotnet add package  Azure.AI.Vision.ImageAnalysis --prerelease
```

# [PowerShell](#tab/powershell)

The Image Analysis SDK for C# can be installed from the [.NET CLI](https://dotnet.microsoft.com/download/dotnet/). To add a package reference in your project file, run this command in the folder where your `.csproj` file is located:

```powershell
Install-Package Azure.AI.Vision.ImageAnalysis --prerelease
```

# [Visual Studio](#tab/vs)

Open Visual Studio and create a new application project. Then install the client SDK by right-clicking on the project solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse**, check **Include prerelease**, and search for `Azure.AI.Vision.ImageAnalysis`. Select **Install**.



---



**Applies to: programming-language-python**


[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/python) | [Package (PyPi)](https://aka.ms/azsdk/image-analysis/package/pypi) | [Samples](https://aka.ms/azsdk/image-analysis/samples/python)

This guide shows how to install the Image Analysis SDK for Python.

## Platform requirements


The Image Analysis SDK for Python is compatible with Windows, Linux, and macOS.

<!--
# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 10 or later is required.

You must install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](/cpp/windows/latest-supported-vc-redist?view=msvc-170&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

> [!IMPORTANT]
> Make sure that packages of the same target architecture are installed. For example, if you install the x64 redistributable package, then you need to install the x64 Python package.

# [Linux](#tab/linux)

The Image Analysis SDK for Python only supports **Ubuntu 18.04/20.04/22.04** and **Debian 9/10/11** on the x64 architecture when used with Linux.

[!INCLUDE [Linux distributions](linux-distributions.md)]

---

Install a version of [Python from 3.8 or later](https://wiki.python.org/moin/BeginnersGuide/Download).

To check your installation, open a terminal and run the command `python --version`. If it's installed properly, you'll get a response like "Python 3.8.10". If you're using Linux, you might need to run the command `python3 --version` instead. To enable use of `python` instead of `python3`, run `alias python='python3'` to set up an alias. The Image Analysis SDK quickstart samples specify `python` usage. 

Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check if you have pip installed by running `pip --version` on the command line.
-->


## Install the Image Analysis SDK for Python

Before you install the Image Analysis SDK for Python, make sure to satisfy the [platform requirements](#platform-requirements).

**Choose your tool or IDE**

# [Terminal](#tab/terminal)

### Install from terminal

To install the Image Analysis SDK for Python, run this command in a terminal.

```console
pip install azure-ai-vision-imageanalysis
```

### Upgrade to the latest Image Analysis SDK

To upgrade to the latest Image Analysis SDK, run this command in a terminal:

```console
pip install --upgrade azure-ai-vision-imageanalysis
```

You can check which Image Analysis SDK for Python version is currently installed by running this command in a terminal:

```console
pip list
```

# [VS Code](#tab/vscode)

### Install the Image Analysis SDK by using Visual Studio Code

To install the Image Analysis SDK for Python:

1. Download and install [Visual Studio Code](https://code.visualstudio.com/Download).
1. Run Visual Studio Code and install the Python extension:

   1. Select **File** > **Preferences** > **Extensions**. 
   1. Search for **Python**, find the **Python extension for Visual Studio Code** published by Microsoft, and then select **Install**.

   Screenshot that shows selections for installing the Python extension.

1. Select **Terminal** > **New Terminal** to open a terminal within Visual Studio Code. 
1. At the terminal prompt, run the following command to install the Image Analysis SDK for Python package. 
    ```console
    pip install azure-ai-vision-imageanalysis
    ```

1. To upgrade to the latest Image Analysis SDK, run this command in a terminal:
    ```console
    pip install --upgrade azure-ai-vision-imageanalysis
    ```

1. You can check which Image Analysis SDK for Python version is currently installed by running this command:
    ```console
    pip list
    ```

For more information about Visual Studio Code and Python, see the [Visual Studio Code documentation](https://code.visualstudio.com/docs) and the [Visual Studio Code Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial).

---



**Applies to: programming-language-java**


[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/java) | [Maven Package](https://aka.ms/azsdk/image-analysis/package/maven) | [Samples](https://aka.ms/azsdk/image-analysis/samples/java)

This guide shows how to install the Image Analysis SDK for Java.

## Platform requirements


The Image Analysis SDK for Java is compatible with Windows, Linux, and macOS.
- [Java Development Kit (JDK)](https://learn.microsoft.com/azure/developer/java/fundamentals/java-jdk-install) version 8 or above installed.

# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 10 or later is required.

The Java SDK uses native binaries. You must install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

# [Linux](#tab/linux)

The Image Analysis SDK for Java only supports **Ubuntu 18.04/20.04/22.04** and **Debian 9/10/11** on the x64 architecture when used with Linux.


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

## JAVA Development Kit

Java 8 or above is required.

Install a Java Development Kit (JDK) such as [Azul Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk), [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk), [Oracle Java](https://www.java.com/download/), or your preferred JDK. 

Run `java -version` from a command line to confirm successful installation and see the version. Make sure that the Java installation is native to the system architecture and not running through emulation.


## Install the Image Analysis SDK for Java

The Image Analysis SDK for Java is available as a Maven package. For more information, see the package <a href="https://aka.ms/azsdk/image-analysis/package/maven" target="_blank">azure-ai-vision-imageanalysis</a> in the Maven repository.


# [Maven](#tab/maven)

Follow these steps to install the Image Analysis SDK for Java using Apache Maven:

1. Install [Apache Maven](https://maven.apache.org/download.cgi). On Linux, install from the distribution repositories if available.
1. Open a command prompt and run `mvn -v` to confirm successful installation.
1. Open a command prompt where you want to place the new project, and create a new pom.xml file.
1. Copy the following XML content into your pom.xml file:
    ```xml
    <project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>
      <groupId>azure.ai.vision.imageanalysis.samples</groupId>
      <artifactId>image-analysis-quickstart</artifactId>
      <version>0.0</version>
      <dependencies>
        <dependency>
          <groupId>com.azure</groupId>
          <artifactId>azure-ai-vision-imageanalysis</artifactId>
          <version>1.0.0-beta.1</version>
        </dependency>
        <dependency>
          <groupId>org.slf4j</groupId>
          <artifactId>slf4j-nop</artifactId>
          <version>1.7.36</version> 
        </dependency>
      </dependencies>
    </project>
    ```

1. Update the version value in `<version>1.0.0-beta.1</version>` based on the latest version you find in the Maven repository for the [azure-ai-vision-imageanalysis](https://aka.ms/azsdk/image-analysis/package/maven) package.
1. Run the following Maven command to install the Image Analysis SDK and dependencies.
    ```console
    mvn clean dependency:copy-dependencies
    ```
1. Verify that the local folder path `target\dependency` was created, and it contains `.jar` files including three file named `azure-ai-vision-*.jar`

# [Gradle](#tab/gradle)

1. Install [Gradle](https://gradle.org/install).
1. In a command prompt run `gradle -v` to confirm successful installation.
1. Create your Java application using Gradle. See for example [Building Java Applications Sample](https://docs.gradle.org/8.3/samples/sample_building_java_applications.html).
1. Update your `build.gradle` file by inserting 4 new dependencies:
    ```gradle
    dependencies {
        implementation 'com.azure:azure-ai-vision-imageanalysis:1.0.0-beta.1'
        implementation 'org.slf4j:slf4j-nop:1.7.36'
    }
    ```
1. Update the version value in `com.azure:azure-ai-vision-imageanalysis:1.0.0-beta.1` based on the latest version you find in the Maven repository for the [azure-ai-vision-imageanalysis](https://aka.ms/azsdk/image-analysis/package/maven) package.
1. Update your Java application to do Image Analysis using the Image Analysis SDK, compile and run your application.
---



**Applies to: programming-language-javascript**


[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/js) | [Package (npm)](https://aka.ms/azsdk/image-analysis/package/npm) | [Samples](https://aka.ms/azsdk/image-analysis/samples/js)

This guide shows how to install the Image Analysis SDK for JavaScript.

## Platform requirements


The Image Analysis SDK for JavaScript is compatible with Windows, Linux, and macOS.


## Install the Image Analysis SDK for JavaScript

Install the Image Analysis client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-vision-image-analysis
```




## Next steps

Follow the [Image Analysis quickstart](../quickstarts-sdk/image-analysis-client-library-40.md) to get started.
