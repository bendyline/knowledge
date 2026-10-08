---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 02/02/2024
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)


In this quickstart, you install the [Speech SDK](../../../speech-sdk.md) for C++.

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


This guide shows how to install the [Speech SDK](../../../speech-sdk.md) for Linux.


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


This guide shows how to install the [Speech SDK](../../../speech-sdk.md) for C++ on macOS 10.14 or later. The steps include downloading the [required libraries and header files](https://aka.ms/csspeech/macosbinary) as a *.zip* file.

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


This guide shows how to install the [Speech SDK](../../../speech-sdk.md) for C++ on Windows desktop operating systems.

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
