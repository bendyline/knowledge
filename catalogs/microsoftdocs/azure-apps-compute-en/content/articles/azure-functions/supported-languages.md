---
title: Supported Languages in Azure Functions
description: Find out which languages are supported for developing function apps in Azure, the support level of the various language versions, and end-of-support dates.
ms.topic: concept-article
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
ms.date: 08/27/2026
zone_pivot_groups: programming-languages-set-functions
# customer intent: As a developer, I want to find information about Azure Functions support for languages and language versions so that I can check whether my function app code is supported and stay informed about when I need to update it.
---

# Supported languages in Azure Functions

This article explains the levels of support offered for your preferred language when you use Azure Functions. It also describes strategies for creating function apps when you use languages that aren't natively supported.


There are two levels of support:

* **Generally available (GA)** - Fully supported and approved for production use.
* **Preview** - Not yet supported, but expected to reach GA status in the future.

## Languages by runtime version

Make sure to select your preferred development language at the [top of the article](#top).
**Applies to: programming-language-csharp**

The following table shows the .NET versions supported by Azure Functions.

The supported version of .NET depends on both your Functions runtime version and your selected execution model.

### [Isolated worker model](#tab/isolated-process)

Your function app code runs in a separate .NET worker process. Use with [supported versions of .NET and .NET Framework](dotnet-isolated-process-guide.md#supported-versions). For more information, see [Guide for running C# Azure Functions in the isolated worker model](dotnet-isolated-process-guide.md).

### [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Your function app code runs in the same process as the Functions host process. This model supports only [Long Term Support (LTS) versions of .NET](functions-dotnet-class-library.md#supported-versions). For more information, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md).  

---

### [v4.x](#tab/v4/in-process)

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| [.NET 8 (LTS)][dotnet-policy] | GA | November 10, 2026 |

Support for .NET 6 reached the end of official support on [November 12, 2024][dotnet-policy].

> **Important:**
> The in-process model currently only supports .NET 8. To be able to update your function app to use a later .NET version, you must [migrate to the isolated worker model](migrate-dotnet-to-isolated-model.md).

For more information, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md) and [Azure Functions legacy C# script (.csx) developer reference](functions-reference-csharp.md).

### [v4.x](#tab/v4/isolated-process)

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| .NET 10 | GA | [November 14, 2028][dotnet-policy] |
| .NET 9 | GA | [November 10, 2026][dotnet-policy]<sup>1</sup> |
| .NET 8 | GA | [November 10, 2026][dotnet-policy] |
| .NET Framework 4.8.1 | GA | See [.NET Framework Support Policy][dotnet-framework-policy] |

<sup>1</sup> .NET 9 previously had an expected end-of-support date of May 12, 2026. During the .NET 9 service window, the .NET team extended support for STS versions to 24 months, starting with .NET 9. For more information, see [the blog post](https://devblogs.microsoft.com/dotnet/dotnet-sts-releases-supported-for-24-months/).

> **Note:**
> .NET 9 is the last .NET version supported for Linux Consumption plan apps. Newer .NET versions aren't added to Linux Consumption. For more information, see [Migrate Consumption plan apps to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md).

[dotnet-policy]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core#lifecycle
[dotnet-framework-policy]: https://dotnet.microsoft.com/platform/support/policy/dotnet-framework

.NET 6 reached the end of official support on [November 12, 2024][dotnet-policy].

.NET 7 reached the end of official support on [May 14, 2024][dotnet-policy].

For more information, see [Guide for running C# Azure Functions in the isolated worker model](dotnet-isolated-process-guide.md).

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
> Java 21 is the last Java version supported for Linux Consumption plan apps. Newer Java versions aren't added to Linux Consumption. For more information, see [Migrate Consumption plan apps to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md).

For more information on developing and running Java function apps, see [Azure Functions Java developer guide](functions-reference-java.md).


**Applies to: programming-language-javascript,programming-language-typescript**

The following table shows the language versions supported for Node.js function apps:

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| [Node.js 24](https://endoflife.date/nodejs) | GA | April 30, 2028 |
| [Node.js 22](https://endoflife.date/nodejs) | GA | April 30, 2027 |

TypeScript is supported through transpiling to JavaScript. For more information, see [Azure Functions Node.js developer guide](functions-reference-node.md#programming-model).

> **Note:**
> Node.js 22 is the last Node.js version supported for Linux Consumption plan apps. Newer Node.js versions aren't added to Linux Consumption. For more information, see [Migrate Consumption plan apps to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md).


**Applies to: programming-language-powershell**

The following table shows the language versions supported for PowerShell function apps:

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| [PowerShell 7.6](https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle#powershell-end-of-support-dates) | GA | November 14, 2028 |
| [PowerShell 7.4](https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle#powershell-end-of-support-dates) | GA | November 10, 2026 |

PowerShell 7.6 is supported on all Azure Functions hosting plans except Linux Consumption, including Premium and Dedicated on Windows and Linux, Windows Consumption, and Flex Consumption.

> **Important:**
> Before you upgrade a Linux Consumption plan app from PowerShell 7.4 to PowerShell 7.6, you must first [migrate the app to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md). PowerShell 7.4 is the last version supported on the Linux Consumption plan.


For more information, see [Azure Functions PowerShell developer guide](functions-reference-powershell.md).

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
> Python 3.12 is the last Python version supported for Linux Consumption plan apps. Newer Python versions aren't added to Linux Consumption. For more information, see [Migrate Consumption plan apps to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md).

For more information, see [Azure Functions Python developer guide](functions-reference-python.md).

**Applies to: programming-language-go**

The following table shows the Go versions supported by Azure Functions:

| Supported version | Support level | Expected end-of-support date |
| --- | --- | --- |
| Go 1.24 or later | Preview | Pending<sup>1</sup> |

<sup>1</sup> The end-of-support date for Go support is determined when general availability (GA) is declared.

> **Note:**
> Go support is currently available only for function apps hosted in the Flex Consumption plan.

For more information, see [Azure Functions Go developer reference](functions-reference-go.md).


For information about planned changes to language support, see the [Azure roadmap updates](https://techcommunity.microsoft.com/search?q=functions+roadmap).
 

## Managed Linux images for affected existing apps

Existing function apps keep their selected managed Linux image until you change the app configuration. If an existing Python 3.11 or Java 8, 11, or 17 app on an Elastic Premium or Dedicated (App Service) plan uses Debian Bullseye, use the following values to select a newer Linux distribution while retaining the same language version:

| Language version | Debian Bullseye value | Newer distribution | Newer image value |
| --- | --- | --- | --- |
| Python 3.11 | `Python\|3.11\|2.0` | Debian Bookworm | `Python\|3.11\|3.0` |
| Java 8 | `Java\|8\|2.0` | Ubuntu Noble | `Java\|8\|4.0` |
| Java 11 | `Java\|11\|2.0` | Ubuntu Noble | `Java\|11\|4.0` |
| Java 17 | `Java\|17\|2.0` | Ubuntu Noble | `Java\|17\|4.0` |

For instructions to test and change the managed image, see [Update the managed Linux image](set-runtime-version.md?pivots=platform-linux#update-the-managed-linux-image). For apps on the Linux Consumption plan, [migrate to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md?pivots=platform-linux).

## Language support details

The following table shows which languages supported by Functions can run on Linux or Windows. It also indicates whether there's support for editing each language in the Azure portal. The language is based on the **Runtime stack** option you select when you [create your function app in the Azure portal](functions-create-function-app-portal.md#create-a-function-app). This value is the same as the `--worker-runtime` option that you specify when you use the `func init` command in Azure Functions Core Tools.

| Language | Runtime stack | Linux | Windows | In-portal editing<sup>1</sup> |
| :--- | :--- | :--- | :--- | :--- |
| [C# (isolated worker model)](dotnet-isolated-process-guide.md) | .NET | ✓ | ✓ |  |
| [C# (in-process model)](functions-dotnet-class-library.md) | .NET | ✓ | ✓ | <sup>2</sup> |
| [JavaScript](functions-reference-node.md?tabs=javascript) | Node.js | ✓ | ✓ | ✓ |
| [Python](functions-reference-python.md) | Python | ✓ | X | ✓ <sup>1</sup> |
| [Java](functions-reference-java.md) | Java | ✓ | ✓ |  |
| [PowerShell](functions-reference-powershell.md) | PowerShell Core | ✓ | ✓ | ✓ |
| [TypeScript](functions-reference-node.md?tabs=typescript) | Node.js | ✓ | ✓ |  |
| [Go (Preview)](functions-reference-go.md) | Go | ✓ |  |  |
| [Rust/other](functions-custom-handlers.md) | Custom Handlers | ✓ | ✓ |  |

1. In-portal editing isn't currently supported when running in the [Flex Consumption plan](flex-consumption-plan.md). When in-portal editing isn't available, you must instead [develop your function apps locally](functions-develop-local.md#local-development-environments).
2. Although we recommend local development for C# apps, you can use the portal to develop and test C# script functions that use the in-process model. For more information, see [Create a C# script app](functions-reference-csharp.md#create-a-c-script-app).
3. In-portal editing for Python is only supported when running in the Consumption plan. 
 

> **Important:**  
> Function apps still running the [end-of-life v3 runtime](functions-versions.md#retired-versions) on Linux in a Consumption plan stop running after September 30, 2026. To avoid service disruption, [migrate your app to the v4 runtime](migrate-version-3-version-4.md).
>
> The option to host function apps on Linux in a Consumption plan is retiring on 30 September 2028. The Linux Consumption plan isn't getting any new features or [language versions](supported-languages.md). Apps running on Windows in a Consumption plan aren't currently affected. [Migrate your apps to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md) before the retirement date.


For more information on operating system and language support, see [Operating system support](functions-scale.md#operating-systemruntime).

For more information about how to maintain full-support coverage while running your function apps in Azure, see [Azure Functions language stack support policy](language-support-policy.md).

### Language major version support

Functions provides a guarantee of support for the major versions of supported programming languages. For most languages, there are minor or patch versions released to update a supported major version. Examples of minor or patch versions include Python 3.9.1 and Node 14.17. After new minor versions of supported languages become available, the minor versions used by your function apps are automatically upgraded to these newer minor or patch versions.

> **Note:**
> Functions can remove the support of older minor versions after a new minor version is available. For this reason, you shouldn't pin your function apps to a specific minor or patch version of a programming language.  

## Custom handlers

Custom handlers are lightweight web servers that receive events from the Functions host. You can implement a custom handler in any language that supports HTTP primitives. As a result, you can use custom handlers to create function apps in languages that aren't officially supported. For more information, see [Azure Functions custom handlers](functions-custom-handlers.md).

## Language extensibility

The Functions runtime is designed to offer [language extensibility](https://github.com/Azure/azure-functions-host/wiki/Language-Extensibility). The JavaScript, Java, and Python languages are built with this extensibility.

**Applies to: programming-language-python**

## ODBC driver support

The following table lists the support that Open Database Connectivity (ODBC) driver versions offer for Python function apps:

| Driver version | Python version |
| --- | --- |
| ODBC driver 18 | ≥ Python 3.11 |
| ODBC driver 17 | ≤ Python 3.10 |


## Next steps
**Applies to: programming-language-csharp**

### [Isolated worker model](#tab/isolated-process)

> 
> [.NET isolated worker process reference](dotnet-isolated-process-guide.md).

### [In-process model](#tab/in-process)

> 
> [In-process C# developer reference](functions-dotnet-class-library.md)

---


**Applies to: programming-language-java**

> 
> [Java developer reference](functions-reference-java.md)

**Applies to: programming-language-javascript,programming-language-typescript**

> 
> [Node.js developer reference](functions-reference-node.md?tabs=javascript)

**Applies to: programming-language-powershell**

> 
> [PowerShell developer reference](functions-reference-powershell.md)

**Applies to: programming-language-python**

> 
> [Python developer reference](functions-reference-python.md)

**Applies to: programming-language-go**

> 
> [Go developer reference](functions-reference-go.md)
