---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 09/21/2026
ms.author: glenga
ms.custom:
  - include file
  - ignite-2023
---
Make sure to select your preferred development language at the [top of the article](#top).
**Applies to: programming-language-csharp**

The following table shows the .NET versions supported by Azure Functions.

The supported version of .NET depends on both your Functions runtime version and your selected execution model.

### [Isolated worker model](#tab/isolated-process)

Your function app code runs in a separate .NET worker process. Use with [supported versions of .NET and .NET Framework](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/dotnet-isolated-process-guide.md#supported-versions). For more information, see [Guide for running C# Azure Functions in the isolated worker model](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/dotnet-isolated-process-guide.md).

### [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Your function app code runs in the same process as the Functions host process. This model supports only [Long Term Support (LTS) versions of .NET](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-dotnet-class-library.md#supported-versions). For more information, see [Develop C# class library functions using Azure Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-dotnet-class-library.md).  

---

### [v4.x](#tab/v4/in-process)

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| [.NET 8 (LTS)][dotnet-policy] | GA | November 10, 2026 |

Support for .NET 6 reached the end of official support on [November 12, 2024][dotnet-policy].

> **Important:**
> The in-process model currently only supports .NET 8. To be able to update your function app to use a later .NET version, you must [migrate to the isolated worker model](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migrate-dotnet-to-isolated-model.md).

For more information, see [Develop C# class library functions using Azure Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-dotnet-class-library.md) and [Azure Functions legacy C# script (.csx) developer reference](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-csharp.md).

### [v4.x](#tab/v4/isolated-process)

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| .NET 10 | GA | [November 14, 2028][dotnet-policy] |
| .NET 9 | GA | [November 10, 2026][dotnet-policy]<sup>1</sup> |
| .NET 8 | GA | [November 10, 2026][dotnet-policy] |
| .NET Framework 4.8.1 | GA | See [.NET Framework Support Policy][dotnet-framework-policy] |

<sup>1</sup> .NET 9 previously had an expected end-of-support date of May 12, 2026. During the .NET 9 service window, the .NET team extended support for STS versions to 24 months, starting with .NET 9. For more information, see [the blog post](https://devblogs.microsoft.com/dotnet/dotnet-sts-releases-supported-for-24-months/).

> **Note:**
> .NET 9 is the last .NET version supported for Linux Consumption plan apps. Newer .NET versions aren't added to Linux Consumption. For more information, see [Migrate Consumption plan apps to the Flex Consumption plan](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migration/migrate-plan-consumption-to-flex.md).

[dotnet-policy]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core#lifecycle
[dotnet-framework-policy]: https://dotnet.microsoft.com/platform/support/policy/dotnet-framework

.NET 6 reached the end of official support on [November 12, 2024][dotnet-policy].

.NET 7 reached the end of official support on [May 14, 2024][dotnet-policy].

For more information, see [Guide for running C# Azure Functions in the isolated worker model](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/dotnet-isolated-process-guide.md).

---


**Applies to: programming-language-java**

The following table shows the language versions supported for Java function apps:

| Supported version | Support level | Supported until |
| --- | --- | --- |
| **Java 25** | GA | May 2029 |
| **Java 21** | GA | September 2028 |
| **Java 17** | GA | September 2027 |
| **Java 11** | GA | September 2027 |
| **Java 8** | GA | September 2027 |

> **Note:**
> Java 21 is the last Java version supported for Linux Consumption plan apps. Newer Java versions aren't added to Linux Consumption. For more information, see [Migrate Consumption plan apps to the Flex Consumption plan](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migration/migrate-plan-consumption-to-flex.md).

For more information on developing and running Java function apps, see [Azure Functions Java developer guide](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-java.md).


**Applies to: programming-language-javascript,programming-language-typescript**

The following table shows the language versions supported for Node.js function apps:

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| [Node.js 24](https://endoflife.date/nodejs) | GA | April 30, 2028 |
| [Node.js 22](https://endoflife.date/nodejs) | GA | April 30, 2027 |

TypeScript is supported through transpiling to JavaScript. For more information, see [Azure Functions Node.js developer guide](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-node.md#programming-model).

> **Note:**
> Node.js 22 is the last Node.js version supported for Linux Consumption plan apps. Newer Node.js versions aren't added to Linux Consumption. For more information, see [Migrate Consumption plan apps to the Flex Consumption plan](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migration/migrate-plan-consumption-to-flex.md).


**Applies to: programming-language-powershell**

The following table shows the language versions supported for PowerShell function apps:

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| [PowerShell 7.6](https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle#powershell-end-of-support-dates) | GA | November 14, 2028 |
| [PowerShell 7.4](https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle#powershell-end-of-support-dates) | GA | November 10, 2026 |

PowerShell 7.6 is supported on all Azure Functions hosting plans except Linux Consumption, including Premium and Dedicated on Windows and Linux, Windows Consumption, and Flex Consumption.

> **Important:**
> Before you upgrade a Linux Consumption plan app from PowerShell 7.4 to PowerShell 7.6, you must first [migrate the app to the Flex Consumption plan](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migration/migrate-plan-consumption-to-flex.md). PowerShell 7.4 is the last version supported on the Linux Consumption plan.


For more information, see [Azure Functions PowerShell developer guide](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-powershell.md).

**Applies to: programming-language-python**

The following table shows the language versions supported for Python function apps: 

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| Python 3.14 | GA | April 2029 |
| Python 3.13 | GA | October 2029 |
| Python 3.12 | GA | October 2028 |
| Python 3.11 | GA | October 2027 |
| Python 3.10 | GA | October 2026 |


> **Note:**
> Python 3.12 is the last Python version supported for Linux Consumption plan apps. Newer Python versions aren't added to Linux Consumption. For more information, see [Migrate Consumption plan apps to the Flex Consumption plan](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migration/migrate-plan-consumption-to-flex.md).

For more information, see [Azure Functions Python developer guide](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-python.md).

**Applies to: programming-language-go**

The following table shows the Go versions supported by Azure Functions:

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| Go 1.24 or later | Preview | Pending<sup>1</sup> |

<sup>1</sup> The end-of-support date for Go support is determined when general availability (GA) is declared.

> **Note:**
> Go support is currently available only for function apps hosted in the Flex Consumption plan.

For more information, see [Azure Functions Go developer reference](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-go.md).


For information about planned changes to language support, see the [Azure roadmap updates](https://techcommunity.microsoft.com/search?q=functions+roadmap).
