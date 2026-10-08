---
title: Install the Speech SDK
titleSuffix: Foundry Tools
description: In this quickstart, you learn how to install the Speech SDK for your preferred programming language.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: quickstart
ms.date: 01/30/2026
ms.author: pafarley
ms.custom: devx-track-python, devx-track-js, devx-track-csharp, mode-other, devx-track-dotnet, devx-track-extended-java, devx-track-go, ignite-2023, linux-related-content
zone_pivot_groups: programming-languages-ai-services
#customer intent: As a developer, I want to install the Speech SDK for the language of my choice to implement Speech AI in applications.
---

# Quickstart: Install the Speech SDK

**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)


In this quickstart, you install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for C#.

## Platform requirements


The Speech SDK for C# is compatible with Windows, Linux, and macOS.

# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 11 or later is required.

Install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

# [Linux](#tab/linux)

The Speech SDK for C# only supports the following distributions on the x64, ARM32, and ARM64 architectures:

- Ubuntu 20.04/22.04/24.04
- Debian 11/12
- Amazon Linux 2023
- Azure Linux 3.0


> **Important:**
> Use the most recent LTS release of the Linux distribution. For example, if you are using Ubuntu 20.04 LTS, use the latest release of Ubuntu 20.04.X.

The Speech SDK depends on the following Linux system libraries:

- The shared libraries of the GNU C library, including the POSIX Threads Programming library, `libpthreads`.
- The OpenSSL library, version 1.x (`libssl1`) or 3.x (`libssl3`), and certificates (`ca-certificates`).
- The shared library for ALSA applications (`libasound2`).

# [Ubuntu 20.04/22.04/24.04](#tab/ubuntu)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Debian 11/12](#tab/debian)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Amazon Linux 2023](#tab/amazon)


Run these commands:

```Bash
sudo yum update
sudo yum install alsa-lib ca-certificates openssl wget
```

# [Azure Linux 3.0](#tab/azure)

Run these commands:

```Bash
sudo tdnf update
sudo tdnf install alsa-lib ca-certificates openssl wget
```

---


# [macOS](#tab/macos)

A macOS version 10.14 or later is required.

---


## Install the Speech SDK for C#

The Speech SDK for C# is available as a NuGet package and implements .NET Standard 2.0. For more information, see [Microsoft.CognitiveServices.Speech](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech).

# [Terminal](#tab/dotnetcli)

The Speech SDK for C# can be installed from the .NET CLI by using the following `dotnet add` command:

```dotnetcli
dotnet add package Microsoft.CognitiveServices.Speech
```

# [PowerShell](#tab/powershell)

The Speech SDK for C# can be installed by using the following `Install-Package` command:

```powershell
Install-Package Microsoft.CognitiveServices.Speech
```

---



**Applies to: programming-language-cpp**



[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)


In this quickstart, you install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for C++.

## Platform requirements


The Speech SDK for C++ is compatible with Windows, Linux, and macOS.

# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 11 or later is required.

Install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

# [Linux](#tab/linux)

The Speech SDK for C++ only supports the following distributions on the x64, ARM32, and ARM64 architectures:

- Ubuntu 20.04/22.04/24.04
- Debian 11/12
- Amazon Linux 2023
- Azure Linux 3.0


> **Important:**
> Use the most recent LTS release of the Linux distribution. For example, if you are using Ubuntu 20.04 LTS, use the latest release of Ubuntu 20.04.X.

The Speech SDK depends on the following Linux system libraries:

- The shared libraries of the GNU C library, including the POSIX Threads Programming library, `libpthreads`.
- The OpenSSL library, version 1.x (`libssl1`) or 3.x (`libssl3`), and certificates (`ca-certificates`).
- The shared library for ALSA applications (`libasound2`).

# [Ubuntu 20.04/22.04/24.04](#tab/ubuntu)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Debian 11/12](#tab/debian)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Amazon Linux 2023](#tab/amazon)


Run these commands:

```Bash
sudo yum update
sudo yum install alsa-lib ca-certificates openssl wget
```

# [Azure Linux 3.0](#tab/azure)

Run these commands:

```Bash
sudo tdnf update
sudo tdnf install alsa-lib ca-certificates openssl wget
```

---


# [macOS](#tab/macos)

A macOS version 10.14 or later is required.

---


## Install the Speech SDK for C++

The Speech SDK for C++ is available as a NuGet package. For more information, see [Microsoft.CognitiveServices.Speech](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech).

# [Terminal](#tab/dotnetcli)

The Speech SDK for C++ can be installed from the .NET CLI by using the following `dotnet add` command:

```dotnetcli
dotnet add package Microsoft.CognitiveServices.Speech
```

# [PowerShell](#tab/powershell)

The Speech SDK for C++ can be installed by using the following `Install-Package` command:

```powershell
Install-Package Microsoft.CognitiveServices.Speech
```

---

You can follow these guides for more options.

# [Linux](#tab/linux)


This guide shows how to install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for Linux.


Use the following procedure to download and install the SDK. The steps include [downloading the required libraries and header files](https://aka.ms/csspeech/linuxbinary) as a *.tar* file.

1. Choose a directory for the Speech SDK files. Set the `SPEECHSDK_ROOT` environment variable to point to that directory. This variable makes it easy to refer to the directory in future commands.

   To use the directory *speechsdk* in your home directory, run the following command:

   ```console
   export SPEECHSDK_ROOT="$HOME/speechsdk"
   ```

1. Create the directory if it doesn't exist:

   ```console
   mkdir -p "$SPEECHSDK_ROOT"
   ```

1. Download and extract the *.tar.gz* archive that contains the Speech SDK binaries:

   ```console
   wget -O SpeechSDK-Linux.tar.gz https://aka.ms/csspeech/linuxbinary
   tar --strip 1 -xzf SpeechSDK-Linux.tar.gz -C "$SPEECHSDK_ROOT"
   ```

1. Validate the contents of the top-level directory of the extracted package:

   ```console
   ls -l "$SPEECHSDK_ROOT"
   ```

   The directory listing should contain the partner notices and license files. The listing should also contain an *include* directory that holds header (*.h*) files and a *lib* directory that holds libraries for arm32, arm64, and x64.

    | Path | Description |
    | :--- | :--- |
    | *license.md* | License |
    | *ThirdPartyNotices.md* | Partner notices |
    | *REDIST.txt* | Redistribution notice |
    | *include* | Required header files for C++ |
    | *lib/arm32* | Native library for ARM32 required to link your application |
    | *lib/arm64* | Native library for ARM64 required to link your application |
    | *lib/x64* | Native library for x64 required to link your application |



# [macOS](#tab/macos)


This guide shows how to install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for C++ on macOS 10.14 or later. The steps include downloading the [required libraries and header files](https://aka.ms/csspeech/macosbinary) as a *.zip* file.

1. Choose a directory for the Speech SDK files. Set the `SPEECHSDK_ROOT` environment variable to point to that directory. This variable makes it easy to refer to the directory in future commands.

   To use the directory *speechsdk* in your home directory, run the following command:

   ```console
   export SPEECHSDK_ROOT="$HOME/speechsdk"
   ```

1. Create the directory if it doesn't exist:

   ```console
   mkdir -p "$SPEECHSDK_ROOT"
   ```

1. Download and extract the *.zip* archive that contains the Speech SDK XCFramework:

   ```console
   wget -O SpeechSDK-macOS.zip https://aka.ms/csspeech/macosbinary
   unzip SpeechSDK-macOS.zip -d "$SPEECHSDK_ROOT"
   ```

1. Validate the contents of the top-level directory of the extracted package:

   ```console
   ls -l "$SPEECHSDK_ROOT"
   ```

   The directory listing should contain the partner notice, license files, and a *MicrosoftCognitiveServicesSpeech.xcframework* directory.


# [Windows](#tab/windows)


This guide shows how to install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for C++ on Windows desktop operating systems.

This setup guide requires:

- [Microsoft Visual C++ Redistributable for Visual Studio](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist) for the Windows platform. Installing it for the first time might require a restart.
- [Visual Studio](https://visualstudio.microsoft.com/downloads/).

### Create a project in Visual Studio and install the Speech SDK

To create a Visual Studio project for C++ desktop development, you need to:

- Set up Visual Studio development options.
- Create the project.
- Select the target architecture.
- Install the Speech SDK.

#### Set up Visual Studio development options

To start, make sure you're set up correctly in Visual Studio for C++ desktop development:

1. Open Visual Studio 2019 to display the start window.

1. Select **Continue without code** to go to the Visual Studio IDE.

   Screenshot that shows the Visual Studio 2019 start window.

1. From the Visual Studio menu bar, select **Tools** > **Get Tools and Features** to open Visual Studio Installer and view the **Modifying** dialog box.

1. On the **Workloads** tab, under **Windows**, find the **Desktop development with C++** workload. If that workload isn't already selected, select it.

   Screenshot that shows the Workloads tab of the Modifying dialog box for Visual Studio Installer.

1. On the **Individual components** tab, find **NuGet package manager**. If it isn't already selected, select it.

1. Select either **Close** or **Modify**. The button name varies depending on whether you selected any features for installation.

   If you select **Modify**, installation begins. The process might take a while.

1. Close Visual Studio Installer.

#### Create the project

Next, create your project and select the target architecture:

1. From the Visual Studio menu, select **File** > **New** > **Project** to display the **Create a new project** window.

1. Find and select **Console App**. Make sure that you select the C++ version of this project type, as opposed to C# or Visual Basic.

1. Select **Next**.

   Screenshot of selections for creating a console app project in Visual Studio.

1. In the **Configure your new project** dialog box, in **Project name**, enter *helloworld*.

1. In **Location**, go to and select or create the folder where you want to save your project, and then select **Create**.

   Screenshot of selections for configuring a new project in Visual Studio.

1. Select your target platform architecture. On the Visual Studio toolbar, find the **Solution Platforms** dropdown box. If you don't see it, select **View** > **Toolbars** > **Standard** to display the toolbar that contains **Solution Platforms**.

   If you're running 64-bit Windows, select **x64** in the dropdown box. 64-bit Windows can also run 32-bit applications, so you can choose **x86** if you prefer.

#### Install the Speech SDK by using Visual Studio

Finally, install the [Speech SDK NuGet package](https://aka.ms/csspeech/nuget) and reference the Speech SDK in your project:

1. In Solution Explorer, right-click your solution, and then select **Manage NuGet Packages for Solution** to go to the **NuGet - Solution** window.

1. Select **Browse**.

1. In **Package source**, select **nuget.org**.

   Screenshot that shows the Manage NuGet Packages for Solution dialog box, with the Browse tab, search box, and package source highlighted.

1. In the **Search** box, enter **Microsoft.CognitiveServices.Speech**. Choose that package after it appears in the search results.

1. In the package status pane next to the search results, select your **helloworld** project.

1. Select **Install**.

   Screenshot that shows the Microsoft.CognitiveServices.Speech package selected, with the project and the Install button highlighted.

1. In the **Preview Changes** dialog box, select **OK**.

1. In the **License Acceptance** dialog box, view the license, and then select **I Accept**. The package installation begins. When installation is complete, the **Output** pane displays a message that's similar to the following text: `Successfully installed 'Microsoft.CognitiveServices.Speech 1.15.0' to helloworld`.


---



**Applies to: programming-language-go**



[Reference documentation](https://aka.ms/csspeech/goref) | [Package (Go)](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go) | [Additional samples on GitHub](https://github.com/microsoft/cognitive-services-speech-sdk-go/tree/master/samples/)


In this quickstart, you install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for Go.


## Platform requirements

The Speech SDK for Go supports the following distributions on the x64 architecture:

- Ubuntu 20.04/22.04/24.04
- Debian 11/12


> **Important:**
> Use the most recent LTS release of the Linux distribution. For example, if you are using Ubuntu 20.04 LTS, use the latest release of Ubuntu 20.04.X.

The Speech SDK depends on the following Linux system libraries:

- The shared libraries of the GNU C library, including the POSIX Threads Programming library, `libpthreads`.
- The OpenSSL library, version 1.x (`libssl1`) or 3.x (`libssl3`), and certificates (`ca-certificates`).
- The shared library for ALSA applications (`libasound2`).

# [Ubuntu 20.04/22.04/24.04](#tab/ubuntu)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Debian 11/12](#tab/debian)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Amazon Linux 2023](#tab/amazon)


Run these commands:

```Bash
sudo yum update
sudo yum install alsa-lib ca-certificates openssl wget
```

# [Azure Linux 3.0](#tab/azure)

Run these commands:

```Bash
sudo tdnf update
sudo tdnf install alsa-lib ca-certificates openssl wget
```

---


Install the [Go binary version 1.13 or later](https://go.dev/dl/).

## Install the Speech SDK for Go


Use the following procedure to download and install the SDK. The steps include [downloading the required libraries and header files](https://aka.ms/csspeech/linuxbinary) as a *.tar* file.

1. Choose a directory for the Speech SDK files. Set the `SPEECHSDK_ROOT` environment variable to point to that directory. This variable makes it easy to refer to the directory in future commands.

   To use the directory *speechsdk* in your home directory, run the following command:

   ```console
   export SPEECHSDK_ROOT="$HOME/speechsdk"
   ```

1. Create the directory if it doesn't exist:

   ```console
   mkdir -p "$SPEECHSDK_ROOT"
   ```

1. Download and extract the *.tar.gz* archive that contains the Speech SDK binaries:

   ```console
   wget -O SpeechSDK-Linux.tar.gz https://aka.ms/csspeech/linuxbinary
   tar --strip 1 -xzf SpeechSDK-Linux.tar.gz -C "$SPEECHSDK_ROOT"
   ```

1. Validate the contents of the top-level directory of the extracted package:

   ```console
   ls -l "$SPEECHSDK_ROOT"
   ```

   The directory listing should contain the partner notices and license files. The listing should also contain an *include* directory that holds header (*.h*) files and a *lib* directory that holds libraries for arm32, arm64, and x64.

    | Path | Description |
    | :--- | :--- |
    | *license.md* | License |
    | *ThirdPartyNotices.md* | Partner notices |
    | *REDIST.txt* | Redistribution notice |
    | *include* | Required header files for C++ |
    | *lib/arm32* | Native library for ARM32 required to link your application |
    | *lib/arm64* | Native library for ARM64 required to link your application |
    | *lib/x64* | Native library for x64 required to link your application |


### Configure the Go environment

The following steps enable your Go environment to find the Speech SDK.

1. Because the bindings rely on `cgo`, you need to set the environment variables so Go can find the SDK.

   ```console
   export CGO_CFLAGS="-I$SPEECHSDK_ROOT/include/c_api"
   export CGO_LDFLAGS="-L$SPEECHSDK_ROOT/lib/<architecture> -lMicrosoft.CognitiveServices.Speech.core"
   ```

   > **Important:**
   > Replace `<architecture>` with the processor architecture of your CPU: `x64`, `arm32`, or `arm64`.

1. To run applications and the SDK, you need to tell the operating system where to find the libraries.

   ```console
   export LD_LIBRARY_PATH="$SPEECHSDK_ROOT/lib/<architecture>:$LD_LIBRARY_PATH"
   ```

   > **Important:**
   > Replace `<architecture>` with the processor architecture of your CPU: `x64`, `arm32`, or `arm64`.




**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)


In this quickstart, you install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for Java.

## Platform requirements

Choose your target environment:

# [Java Runtime](#tab/jre)


The Speech SDK for Java is compatible with Windows, Linux, and macOS.

# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 11 or later is required.

Install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

The Speech SDK for Java doesn't support Windows on ARM64.

# [Linux](#tab/linux)

The Speech SDK for Java supports the following distributions on the x64, ARM32, and ARM64 architectures:

- Ubuntu 20.04/22.04/24.04
- Debian 11/12
- Amazon Linux 2023
- Azure Linux 3.0


> **Important:**
> Use the most recent LTS release of the Linux distribution. For example, if you are using Ubuntu 20.04 LTS, use the latest release of Ubuntu 20.04.X.

The Speech SDK depends on the following Linux system libraries:

- The shared libraries of the GNU C library, including the POSIX Threads Programming library, `libpthreads`.
- The OpenSSL library, version 1.x (`libssl1`) or 3.x (`libssl3`), and certificates (`ca-certificates`).
- The shared library for ALSA applications (`libasound2`).

# [Ubuntu 20.04/22.04/24.04](#tab/ubuntu)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Debian 11/12](#tab/debian)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Amazon Linux 2023](#tab/amazon)


Run these commands:

```Bash
sudo yum update
sudo yum install alsa-lib ca-certificates openssl wget
```

# [Azure Linux 3.0](#tab/azure)

Run these commands:

```Bash
sudo tdnf update
sudo tdnf install alsa-lib ca-certificates openssl wget
```

---


# [macOS](#tab/macos)

A macOS version 10.14 or later is required.

---


# [Android](#tab/android)

The Speech SDK is compatible with Android devices that have 32/64-bit ARM processor and Intel x86/x64 compatible processors.

---

Install a Java Development Kit such as [Azul Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk). The [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk) or your preferred JDK should also work.

## Install the Speech SDK for Java

Some of the instructions use a specific SDK version such as `1.43.0`. To check the latest version, [search our GitHub repository](https://github.com/Azure-Samples/cognitive-services-speech-sdk/search?q=com.microsoft.cognitiveservices.speech%3Aclient-sdk).

Choose your target environment:

# [Java Runtime](#tab/jre)


This guide shows how to install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for Java on the Java Runtime.

### Supported operating systems

The Speech SDK for Java package is available for these operating systems:

- Windows: 64-bit only.
- Mac: macOS X version 10.14 or later.
- Linux: See the [supported Linux distributions and target architectures](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md).

# [Maven](#tab/maven)

Follow these steps to install the Speech SDK for Java using Apache Maven:

1. Install [Apache Maven](https://maven.apache.org/install.html).
1. Open a command prompt where you want the new project, and create a new *pom.xml* file.
1. Copy the following XML content into *pom.xml*:

   ```xml
   <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>
       <groupId>com.microsoft.cognitiveservices.speech.samples</groupId>
       <artifactId>quickstart-eclipse</artifactId>
       <version>1.0.0-SNAPSHOT</version>
       <build>
           <sourceDirectory>src</sourceDirectory>
           <plugins>
           <plugin>
               <artifactId>maven-compiler-plugin</artifactId>
               <version>3.7.0</version>
               <configuration>
               <source>1.8</source>
               <target>1.8</target>
               </configuration>
           </plugin>
           </plugins>
       </build>
       <dependencies>
           <dependency>
           <groupId>com.microsoft.cognitiveservices.speech</groupId>
           <artifactId>client-sdk</artifactId>
           <version>1.43.0</version>
           </dependency>
       </dependencies>
   </project>
   ```

1. Run the following Maven command to install the Speech SDK and dependencies.

   ```console
   mvn clean dependency:copy-dependencies
   ```

# [Eclipse](#tab/eclipse)

### Create an Eclipse project and install the Speech SDK

1. Install the [Eclipse Java IDE](https://www.eclipse.org/downloads/). This IDE requires Java to already be installed.

1. Start Eclipse.

1. In Eclipse Launcher, in the **Workspace** box, enter the name of a new workspace directory. Then select **Launch**.

   Screenshot of Eclipse Launcher.

1. In a moment, the main window of the Eclipse IDE appears. Close the **Welcome** screen if one is present.

1. From the Eclipse menu, select **File** > **New** > **Project**.

1. The **New Project** dialog box appears. Select **Java Project**, and then select **Next**.

   Screenshot of the New Project dialog box, with Java Project highlighted.

1. The **New Java Project** wizard starts. In the **Project name** field, enter *quickstart*. Choose **JavaSE-1.8** as the execution environment. Select **Finish**.

   Screenshot of the New Java Project wizard, with selections for creating a Java project.

1. If the **Open Associated Perspective?** window appears, select **Open Perspective**.

1. In **Package Explorer**, right-click the **quickstart** project. Select **Configure** > **Convert to Maven Project** from the context menu.

   Screenshot of Package Explorer and the commands for converting to a Maven project.

1. The **Create new POM** window appears. In the **Group Id** field, enter *com.microsoft.cognitiveservices.speech.samples*. In the **Artifact Id** field, enter *quickstart*. Then select **Finish**.

   Screenshot of the window for creating a new POM.

1. Open the *pom.xml* file and edit it:

   1. Add a `dependencies` element at the end of the file, before the closing tag `</project>`, with the Speech SDK as a dependency:

   ```xml
   <dependencies>
     <dependency>
       <groupId>com.microsoft.cognitiveservices.speech</groupId>
       <artifactId>client-sdk</artifactId>
       <version>1.43.0</version>
     </dependency>
   </dependencies>
   ```

   1. Save the changes.

# [Gradle](#tab/gradle)

### Gradle configurations

Gradle configurations require an explicit reference to the *.jar* dependency extension:

```gradle
// build.gradle

dependencies {
    implementation group: 'com.microsoft.cognitiveservices.speech', name: 'client-sdk', version: "1.43.0", ext: "jar"
}
```

---


# [Android](#tab/android)


This guide shows how to install the [Speech SDK](../speech-sdk.md) for Java on Android.

The Speech SDK for Android is packaged as an [Android Archive (AAR) file](https://developer.android.com/studio/projects/android-library), which includes the necessary libraries and required Android permissions.

### Install the Speech SDK by using Android Studio

Create a new project in Android Studio and add the Speech SDK for Java as a library dependency. The setup is based on the Speech SDK Maven Package and Android Studio Chipmunk 2021.2.1.

#### Create an empty project

1. Open Android Studio, and select **New project**.

   Screenshot showing options to open or create new projects.

1. In the **New project** window that appears, select **Phone and Tablet** > **Empty Activity**, and then select **Next**.

   Screenshot showing project types that you can select.

1. Enter **SpeechQuickstart** in the **Name** text box.

   Screenshot showing project properties that you must set.

1. Enter *samples.speech.cognitiveservices.microsoft.com* in the **Package name** text box.
1. Select a project directory in the **Save location** selection box.
1. Select **Java** in the **Language** selection box.
1. Select **API 26: Android 8.0 (Oreo)** in the **Minimum API level** selection box.
1. Select **Finish**.

Android Studio takes some time to prepare your new project. For your first time using Android Studio, it might take a few minutes to set preferences, accept licenses, and complete the wizard.

#### Install the Speech SDK for Java on Android

Add the Speech SDK as a dependency in your project.

1. Select **File** > **Project structure** > **Dependencies** > **app**.
1. Select the plus symbol (**+**) to add a dependency under **Declared Dependencies**. Then select **Library dependency** from the dropdown menu.

   Screenshot that shows how to add a library dependency in Android Studio.

1. In the **Add Library Dependency** window that appears, enter the name and version of the Speech SDK for Java: *com.microsoft.cognitiveservices.speech:client-sdk:1.43.0*. Then select **Search**.
1. Make sure that the selected **Group ID** is **com.microsoft.cognitiveservices.speech**, and then select **OK**.
1. Select **OK** to close the **Project Structure** window and apply your changes to the project.




**Applies to: programming-language-javascript**



[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)


In this quickstart, you install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for JavaScript.

The Speech SDK for JavaScript is available as an npm package. See [microsoft-cognitiveservices-speech-sdk](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) and its companion GitHub repository [cognitive-services-speech-sdk-js](https://github.com/Microsoft/cognitive-services-speech-sdk-js).

## Platform requirements

Understand the architectural implications between Node.js and client web browsers. For example, the [document object model (DOM)](https://en.wikipedia.org/wiki/Document_Object_Model) isn't available for server-side applications. The [Node.js file system](https://nodejs.org/api/fs.html) isn't available to client-side applications.

## Install the Speech SDK for JavaScript

Depending on the target environment, use one of the following guides:

#### [Node.js](#tab/nodejs)

This guide shows how to install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for JavaScript for use with Node.js.

1. Install [Node.js](https://nodejs.org/).
1. Create a new directory, run `npm init`, and walk through the prompts.
1. To install the Speech SDK for JavaScript, run the following `npm install` command:

    ```console
    npm install microsoft-cognitiveservices-speech-sdk
    ```

For more information, see the [Node.js samples](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/javascript/node).

#### [Browser-based](#tab/browser)

This guide shows how to install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for JavaScript for use with a webpage.

### Unpack to a folder

1. Create a new, empty folder. If you want to host the sample on a web server, make sure that the web server can access the folder.

1. Download the Speech SDK as a [.zip package](https://github.com/Microsoft/cognitive-services-speech-sdk-js/releases) and unpack it into the newly created folder. These files are unpacked:

   - *microsoft.cognitiveservices.speech.sdk.bundle.js*: A human-readable version of the Speech SDK.
   - *microsoft.cognitiveservices.speech.sdk.bundle.js.map*: A map file to use for debugging SDK code.
   - *microsoft.cognitiveservices.speech.sdk.bundle.d.ts*: Object definitions for use with TypeScript.
   - *microsoft.cognitiveservices.speech.sdk.bundle-min.js*: A minified version of the Speech SDK.
   - *speech-processor.js*: Code to improve performance on some browsers.

1. Create a new file named *index.html* in the folder, and open this file with a text editor.

### HTML script tag

Download and extract the *microsoft.cognitiveservices.speech.sdk.bundle.js* file from the [Speech SDK for JavaScript](https://github.com/Microsoft/cognitive-services-speech-sdk-js/releases). Place it in a folder that your HTML file can access.

```html
<script src="microsoft.cognitiveservices.speech.sdk.bundle.js"></script>;
```

> **Tip:**
> If you're targeting a web browser and using the `<script>` tag, the `sdk` prefix is not needed. The `sdk` prefix is an alias that's used to name the `require` module.

Alternatively, you could directly include a `<script>` tag in the HTML `<head>` element, relying on the [JSDelivr](https://www.jsdelivr.com/package/npm/microsoft-cognitiveservices-speech-sdk).

```html
<script src="https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk@latest/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle-min.js">
</script>
```

For more information, see the [browser-based samples](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/javascript/browser).

---

## Use the Speech SDK

- Add the following import statement to use the Speech SDK in your JavaScript project:

  ```javascript
  import * as sdk from "microsoft-cognitiveservices-speech-sdk";
  ```

For more information on `import`, see [Export and Import](https://javascript.info/import-export) on the JavaScript website.

Alternatively, you could use a require statement:

```javascript
const sdk = require("microsoft-cognitiveservices-speech-sdk");
```



**Applies to: programming-language-objectivec**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


In this quickstart, you install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for Objective-C.

> **Tip:**
> For more information about using the Speech SDK for Swift, see [Importing Objective-C into Swift](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_objective-c_into_swift).

## Install the Speech SDK for Objective-C

# [Mac](#tab/mac)

The Speech SDK for Objective-C is available natively as a CocoaPod package for Mac x64 and ARM-based systems.

System requirements for Mac:

- A macOS version 10.14 or later

The macOS CocoaPod package is available for download and use with the [Xcode 9.4.1](https://apps.apple.com/us/app/xcode/id497799835) or later integrated development environment (IDE).

1. Go to the Xcode directory where your *.xcodeproj* project file is located.
1. Run `pod init` to create a pod file named *Podfile*.
1. Replace the contents of *Podfile* with the following content. Update the `target` name from `AppName` to the name of your app. Update the platform or pod version as needed.

   ```objc
   platform :osx, 10.14
   use_frameworks!
    
   target 'AppName' do
     pod 'MicrosoftCognitiveServicesSpeech-macOS', '~> 1.43.0'
   end
   ```

1. Run `pod install` to install the Speech SDK.

Alternatively, download the [binary CocoaPod](https://aka.ms/csspeech/macosbinary) and extract its contents. In your Xcode project, add a reference to the extracted *MicrosoftCognitiveServicesSpeech.xcframework* folder and its contents.

# [iOS](#tab/ios)

The Speech SDK for Objective-C is available natively as a CocoaPod package.

System requirements for iOS:

- A macOS version 10.14 or later
- Target iOS 9.3 or later

The macOS CocoaPod package is available for download and use with the [Xcode 9.4.1](https://apps.apple.com/us/app/xcode/id497799835) or later integrated development environment (IDE).

1. Go to the Xcode directory where your *.xcodeproj* project file is located.
1. Run `pod init` to create a pod file named *Podfile*.
1. Replace the contents of *Podfile* with the following content. Update the `target` name from `AppName` to the name of your app. Update the platform or pod version as needed.

    ```objc
    platform :ios, '9.3'
    use_frameworks!
    
    target 'AppName' do
      pod 'MicrosoftCognitiveServicesSpeech-iOS', '~> 1.43.0'
    end
    ```

1. Run `pod install` to install the Speech SDK.

Alternatively, download the [binary CocoaPod](https://aka.ms/csspeech/iosbinary) and extract its contents. In your Xcode project, add a reference to the extracted *MicrosoftCognitiveServicesSpeech.xcframework* folder and its contents.

---



**Applies to: programming-language-swift**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


In this quickstart, you install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for Swift.

> **Tip:**
> For more information about using the Speech SDK for Swift, see [Importing Objective-C into Swift](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_objective-c_into_swift).

## Install the Speech SDK for Swift

# [Mac](#tab/mac)

The Speech SDK for Swift is available natively as a CocoaPod package for Mac x64 and ARM-based systems.

System requirements for Mac:

- A macOS version 10.14 or later

The macOS CocoaPod package is available for download and use with the [Xcode 9.4.1](https://apps.apple.com/us/app/xcode/id497799835) or later integrated development environment (IDE).

1. Go to the Xcode directory where your *.xcodeproj* project file is located.
1. Run `pod init` to create a pod file named *Podfile*.
1. Replace the contents of *Podfile* with the following content. Update the `target` name from `AppName` to the name of your app. Update the platform or pod version as needed.

   ```objc
   platform :osx, 10.14
   use_frameworks!
    
   target 'AppName' do
     pod 'MicrosoftCognitiveServicesSpeech-macOS', '~> 1.43.0'
   end
   ```

1. Run `pod install` to install the Speech SDK.

Alternatively, download the [binary CocoaPod](https://aka.ms/csspeech/macosbinary) and extract its contents. In your Xcode project, add a reference to the extracted *MicrosoftCognitiveServicesSpeech.xcframework* folder and its contents.

# [iOS](#tab/ios)

The Speech SDK for Swift is available natively as a CocoaPod package.

System requirements for iOS:

- A macOS version 10.14 or later
- Target iOS 9.3 or later

The macOS CocoaPod package is available for download and use with the [Xcode 9.4.1](https://apps.apple.com/us/app/xcode/id497799835) or later integrated development environment (IDE).

1. Go to the Xcode directory where your *.xcodeproj* project file is located.
1. Run `pod init` to create a pod file named *Podfile*.
1. Replace the contents of *Podfile* with the following. Update the `target` name from `AppName` to the name of your app. Update the platform or pod version as needed.

    ```objc
    platform :ios, '9.3'
    use_frameworks!
    
    target 'AppName' do
      pod 'MicrosoftCognitiveServicesSpeech-iOS', '~> 1.43.0'
    end
    ```

1. Run `pod install` to install the Speech SDK.

Alternatively, download the [binary CocoaPod](https://aka.ms/csspeech/iosbinary) and extract its contents. In your Xcode project, add a reference to the extracted *MicrosoftCognitiveServicesSpeech.xcframework* folder and its contents.

---



**Applies to: programming-language-python**



[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)


In this quickstart, you install the [Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/platform/~/articles/ai-services/speech-service/speech-sdk.md) for Python.

## Platform requirements


The Speech SDK for Python is compatible with Windows, Linux, and macOS.

# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 11 or later is required.

Install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

> **Important:**
> Make sure that packages of the same target architecture are installed. For example, if you install the x64 redistributable package, install the x64 Python package.

# [Linux](#tab/linux)

The Speech SDK for Python supports the following distributions on the x64 and ARM64 architectures:

- Ubuntu 20.04/22.04/24.04
- Debian 11/12
- Amazon Linux 2023
- Azure Linux 3.0


> **Important:**
> Use the most recent LTS release of the Linux distribution. For example, if you are using Ubuntu 20.04 LTS, use the latest release of Ubuntu 20.04.X.

The Speech SDK depends on the following Linux system libraries:

- The shared libraries of the GNU C library, including the POSIX Threads Programming library, `libpthreads`.
- The OpenSSL library, version 1.x (`libssl1`) or 3.x (`libssl3`), and certificates (`ca-certificates`).
- The shared library for ALSA applications (`libasound2`).

# [Ubuntu 20.04/22.04/24.04](#tab/ubuntu)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Debian 11/12](#tab/debian)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Amazon Linux 2023](#tab/amazon)


Run these commands:

```Bash
sudo yum update
sudo yum install alsa-lib ca-certificates openssl wget
```

# [Azure Linux 3.0](#tab/azure)

Run these commands:

```Bash
sudo tdnf update
sudo tdnf install alsa-lib ca-certificates openssl wget
```

---


# [macOS](#tab/macos)

A macOS version 10.14 or later is required.

---

Install a version of [Python from 3.8 or later](https://www.python.org/downloads/).

- To check your installation, open a terminal and run the command `python --version`. If Python installed properly, you get a response like `Python 3.8.10`.

- If you're using macOS or Linux, you might need to run the command `python3 --version` instead.

  To enable use of `python` instead of `python3`, run `alias python='python3'` to set up an alias. The Speech SDK quickstart samples specify `python` usage.


## Install the Speech SDK for Python

Before you install the Speech SDK for Python, make sure to satisfy the [platform requirements](#platform-requirements).

# [PyPI](#tab/pypi)

### Install from PyPI

To install the Speech SDK for Python, run this command in a console window:

```console
pip install azure-cognitiveservices-speech
```

### Upgrade to the latest Speech SDK

To upgrade to the latest Speech SDK, run this command in console window:

```console
pip install --upgrade azure-cognitiveservices-speech
```

You can check which Speech SDK for Python version is currently installed by inspecting the `azure.cognitiveservices.speech.__version__` variable. For example, run this command in a console window:

```console
pip list
```

# [VS Code](#tab/vscode)

### Install the Speech SDK by using Visual Studio Code

To install the Speech SDK for Python:

1. Download and install [Visual Studio Code](https://code.visualstudio.com/Download).
1. Run Visual Studio Code and install the Python extension:

   1. Select **File** > **Preferences** > **Extensions**.
   1. Search for **Python**, find the **Python extension for Visual Studio Code** published by Microsoft, and then select **Install**.

   Screenshot that shows selections for installing the Python extension.

1. Select **Terminal** > **New Terminal** to open a terminal within Visual Studio Code.
1. At the terminal prompt, run the following command to install the Speech SDK for Python package.

    ```console
    python -m pip install azure-cognitiveservices-speech
    ```

For more information about Visual Studio Code and Python, see [Visual Studio Code](https://code.visualstudio.com/docs) and [Getting Started with Python in VS Code](https://code.visualstudio.com/docs/python/python-tutorial).

---

## Use the Speech SDK

Add the following import statement to use the Speech SDK in your Python project:

```python
import azure.cognitiveservices.speech as speechsdk
```



## Code samples

Code samples are available in the [Azure-Samples/cognitive-services-speech-sdk](https://aka.ms/csspeech/samples) repository on GitHub. There are samples for C# (including Universal Windows Platform (UWP)), C++, Java, JavaScript (including Browser and Node.js), Objective-C, Python, and Swift. Code samples for Go are available in the [Microsoft/cognitive-services-speech-sdk-go](https://github.com/Microsoft/cognitive-services-speech-sdk-go) repository on GitHub.

## Related content

- [Speech to text quickstart](../get-started-speech-to-text.md)
- [Text to speech quickstart](../get-started-text-to-speech.md)
- [Speech translation quickstart](../get-started-speech-translation.md)
