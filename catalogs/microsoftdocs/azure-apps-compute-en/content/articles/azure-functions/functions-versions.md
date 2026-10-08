---
title: Compare Azure Functions Runtime Versions
description: Learn how Azure Functions supports multiple versions of the runtime, and understand the differences between them and how to choose the one that's right for you.
ms.topic: concept-article
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python, ignite-2023, devx-track-ts
ms.date: 09/15/2026
zone_pivot_groups: programming-languages-set-functions
---

# Compare Azure Functions runtime versions

Azure Functions currently supports only version 4.x of the runtime host.


> **Important:**
> [Support ended for version 1.x of the Azure Functions runtime on September 14, 2026](https://aka.ms/azure-functions-retirements/hostv1). [Migrate your apps to version 4.x](migrate-version-1-version-4.md) for full support.

Versions 2.x and 3.x of the Azure Functions runtime are also no longer supported. For more information, see [Retired versions](#retired-versions).


> **Important:**  
> Function apps still running the [end-of-life v3 runtime](functions-versions.md#retired-versions) on Linux in a Consumption plan stop running after September 30, 2026. To avoid service disruption, [migrate your app to the v4 runtime](migrate-version-3-version-4.md).
>
> The option to host function apps on Linux in a Consumption plan is retiring on 30 September 2028. The Linux Consumption plan isn't getting any new features or [language versions](supported-languages.md). Apps running on Windows in a Consumption plan aren't currently affected. [Migrate your apps to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md) before the retirement date.


[Migrate apps from Azure Functions version 3.x to version 4.x](migrate-version-3-version-4.md).

## Levels of support


There are two levels of support:

* **Generally available (GA)** - Fully supported and approved for production use.
* **Preview** - Not yet supported, but expected to reach GA status in the future.

## Languages

All functions in a function app must share the same language. Choose the language of functions in your function app when you create the app. The language of your function app is maintained in the [FUNCTIONS\_WORKER\_RUNTIME](functions-app-settings.md#functions_worker_runtime) setting, and can't be changed when there are existing functions. 

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


For information about language versions of previously supported Functions runtime versions, see [Retired runtime versions](language-support-policy.md#language-support-related-resources).

## Run on a specific version

The [`FUNCTIONS_EXTENSION_VERSION`](functions-app-settings.md#functions_extension_version) application setting determines the version of the Functions runtime that published apps use in Azure. In some cases and for certain languages, other settings might apply.  

By default, function apps created in the Azure portal, by the Azure CLI, or from Visual Studio tools are set to version 4.x. If an existing app uses an earlier runtime version, migrate it to version 4.x.

### Migrate existing function apps


When your app has existing functions, you must take precautions before moving to a later major runtime version. The following articles detail breaking changes between major versions, including language-specific breaking changes. They also provide you with step-by-step instructions for a successful migration of your existing function app. 

+ [Migrate from runtime version 3.x to version 4.x](migrate-version-3-version-4.md) 
+ [Migrate from runtime version 1.x to version 4.x](migrate-version-1-version-4.md)    
> **Important:**
> Don't arbitrarily change the `FUNCTIONS_EXTENSION_VERSION` setting. Other app settings and your function code might also need to change. For existing function apps, follow the [migration instructions](#migrate-existing-function-apps).

### Pin to a specific minor version

To resolve issues that your function app could have when running on the latest major version, you must temporarily pin your app to a specific minor version. Pinning gives you time to get your app running correctly on the latest major version. The way that you pin to a minor version differs between Windows and Linux. To learn more, see [How to target Azure Functions runtime versions](set-runtime-version.md).

Older minor versions are periodically removed from Functions. For the latest news about Azure Functions releases, including the removal of specific older minor versions, monitor [Azure App Service announcements](https://github.com/Azure/app-service-announcements/issues).

## Minimum extension versions

**Applies to: programming-language-csharp**

There's technically not a correlation between binding extension versions and the Functions runtime version. However, starting with version 4.x, the Functions runtime enforces a minimum version for all trigger and binding extensions. 

If you receive a warning about a package not meeting a minimum required version, you should update that NuGet package to the minimum version as you normally would. Find the minimum version requirements for extensions used in Functions v4.x in [the linked configuration file](https://github.com/Azure/azure-functions-host/blob/dev/src/WebJobs.Script/extensionrequirements.json).

For C# script, update the extension bundle reference in the *host.json*:

```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[4.0.0, 5.0.0)"
    }
}
```


**Applies to: programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

There's technically not a correlation between extension bundle versions and the Functions runtime version. However, starting with version 4.x, the Functions runtime enforces a minimum version for extension bundles. 

If you receive a warning about your extension bundle version not meeting a minimum required version, update your existing extension bundle reference in the *host.json* as follows:

```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[4.0.0, 5.0.0)"
    }
}
```  

To learn more about extension bundles, see [Extension bundles](extension-bundles.md).


## Retired versions

For historical runtime 1.x behavior and reference resources, see the [runtime 1.x legacy reference](functions-runtime-1x-legacy.md).

These versions of the Functions runtime reached end of extended support on December 13, 2022.

| Version | Current support level | Previous support level |
| --- | --- | --- |
| 3.x | Out of support | GA |
| 2.x | Out of support | GA |

Migrate your apps to version 4.x as soon as possible to get full support. For a complete set of language-specific migration instructions, see [Migrate apps to Azure Functions version 4.x](migrate-version-3-version-4.md).

Apps using versions 2.x and 3.x can still be created and deployed from your CI/CD DevOps pipeline, and existing apps continue to run without breaking changes, except for v3 apps on Linux Consumption, which [will stop running after September 30, 2026](#retired-versions). Your apps aren't eligible for new features, security patches, and performance optimizations. You can only get related service support after you upgrade your apps to version 4.x.
**Applies to: programming-language-csharp**

## Locally developed application versions

Make the following updates to function apps to locally change the targeted versions.

### Visual Studio projects

Visual Studio creates Azure Functions projects that target runtime version 4.x. The project settings determine the runtime used for debugging and publishing. The following properties in the *.csproj* file define the target framework and Functions runtime version:

```xml
<TargetFramework>net8.0</TargetFramework>
<AzureFunctionsVersion>v4</AzureFunctionsVersion>
```

If you're using the [isolated worker model](dotnet-isolated-process-guide.md), you can choose, `net9.0`, `net8.0`, or `net48` as the target framework. You can also choose to use [preview support](dotnet-isolated-process-guide.md#preview-net-versions) for `net10.0`. If you're using the [in-process model](functions-dotnet-class-library.md), you can choose `net8.0` or `net6.0`, and you must include the `Microsoft.NET.Sdk.Functions` extension set to at least `4.4.0`. .NET 10 isn't supported by the in-process model; if you are on the in-process model and wish to use .NET 10, [migrate your app to the isolated worker model](migrate-dotnet-to-isolated-model.md).

.NET 6 was previously supported on the isolated worker model and the in-process model, but it reached the end of official support on [November 12, 2024][dotnet-policy].

.NET 7 was previously supported on the isolated worker model but reached the end of official support on [May 14, 2024][dotnet-policy].

[dotnet-policy]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core#lifecycle

### Visual Studio Code and Azure Functions Core Tools

[Azure Functions Core Tools](functions-run-local.md) is used for command-line development and also by the [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) for Visual Studio Code. For more information, see [Install the Azure Functions Core Tools](functions-run-local.md#install-the-azure-functions-core-tools).

For Visual Studio Code development, you might also need to update the user setting for the `azureFunctions.projectRuntime` to match the version of the tools installed. This setting also updates the templates and languages used during function app creation.


**Applies to: programming-language-go**

Go support is currently in public preview and requires Azure Functions runtime 4.x. For version requirements, see the [Go developer reference](functions-reference-go.md#prerequisites).


## Related content

* [Develop Azure Functions locally by using Core Tools](functions-run-local.md)
* [How to target Azure Functions runtime versions](set-runtime-version.md)
* [Release notes](https://github.com/Azure/azure-functions-host/releases)
