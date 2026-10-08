---
author: PatrickFarley
ms.service: azure-vision-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 08/01/2023
ms.author: pafarley
---

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
