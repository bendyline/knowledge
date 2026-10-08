---
title: Differences between in-process and isolate worker process .NET Azure Functions
description: Compares features and functionality differences between running .NET Functions in-process or as an isolated worker process.
ms.service: azure-functions
ms.custom:
  - devx-track-dotnet
  - ignite-2023
ms.topic: product-comparison
ms.date: 09/04/2026
recommendations: false
#Customer intent: As a developer, I need to understand the differences between running in-process and running in an isolated worker process so that I can choose the best process model for my functions.
---

# Differences between the isolated worker model and the in-process model for .NET on Azure Functions

There are two execution models for .NET functions:


| Execution model | Description |
| --- | --- |
| **Isolated worker model** | Your function code runs in a separate .NET worker process. Use with [supported versions of .NET and .NET Framework](dotnet-isolated-process-guide.md#supported-versions). To learn more, see [Guide for running C# Azure Functions in the isolated worker model](dotnet-isolated-process-guide.md). |
| **In-process model** | Your function code runs in the same process as the Functions host process. Supports only [Long Term Support (LTS) versions of .NET](functions-dotnet-class-library.md#supported-versions). To learn more, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md). |
 


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

This article describes the current state of the functional and behavioral differences between the two models. To migrate from the in-process model to the isolated worker model, see [Migrate .NET apps from the in-process model to the isolated worker model][migrate].

## Execution model comparison table 

Use the following table to compare feature and functional differences between the two models:

| Feature/behavior | Isolated worker model | In-process model<sup>3</sup> |
| --- | --- | --- |
| [Supported .NET versions](#supported-versions) | Long Term Support (LTS) versions,<br/>Standard Term Support (STS) versions,<br/>.NET Framework | Long Term Support (LTS) versions, ending with .NET 8 |
| Core SDK and packages | [Azure.Functions.Sdk](https://www.nuget.org/packages/Azure.Functions.Sdk/)<sup>6</sup><br/>[Microsoft.Azure.Functions.Worker](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker/) | [Microsoft.NET.Sdk.Functions](https://www.nuget.org/packages/Microsoft.NET.Sdk.Functions/) |
| Binding extension packages | [Microsoft.Azure.Functions.Worker.Extensions.*](https://www.nuget.org/packages?q=Microsoft.Azure.Functions.Worker.Extensions) | [Microsoft.Azure.WebJobs.Extensions.*](https://www.nuget.org/packages?q=Microsoft.Azure.WebJobs.Extensions) |
| Durable Functions | [Supported](../durable-task/durable-functions/durable-functions-dotnet-isolated-overview.md) | [Supported](../durable-task/common/what-is-durable-task.md) |
| Model types exposed by bindings | Simple types<br/>JSON serializable types<br/>Arrays/enumerations<br/>[Service SDK types](dotnet-isolated-process-guide.md#sdk-types)<sup>4</sup> | Simple types<br/>[JSON serializable](https://learn.microsoft.com/dotnet/api/system.text.json.jsonserializeroptions) types<br/>Arrays/enumerations<br/>Service SDK types<sup>4</sup> |
| HTTP trigger model types | [HttpRequestData] / [HttpResponseData]<br/>[HttpRequest] / [IActionResult] (using [ASP.NET Core integration][aspnetcore-integration])<sup>5</sup> | [HttpRequest] / [IActionResult]<sup>5</sup><br/>[HttpRequestMessage] / [HttpResponseMessage] |
| Output binding interactions | Return values in an expanded model with:<br/> - single or [multiple outputs](dotnet-isolated-process-guide.md#multiple-output-bindings)<br/> - arrays of outputs | Return values (single output only),<br/>`out` parameters,<br/>`IAsyncCollector` |
| Imperative bindings<sup>1</sup> | Not supported - instead [work with SDK types directly](dotnet-isolated-process-guide.md#register-azure-clients) | [Supported](functions-dotnet-class-library.md#binding-at-runtime) |
| Dependency injection | [Supported](dotnet-isolated-process-guide.md#dependency-injection) (improved model consistent with .NET ecosystem) | [Supported](functions-dotnet-dependency-injection.md) |
| Middleware | [Supported](dotnet-isolated-process-guide.md#middleware) | Not supported |
| Logging | [`ILogger<T>`]/[`ILogger`] obtained from [FunctionContext](https://learn.microsoft.com/dotnet/api/microsoft.azure.functions.worker.functioncontext) or by using [dependency injection](dotnet-isolated-process-guide.md#dependency-injection) | [`ILogger`] passed to the function<br/>[`ILogger<T>`] by using [dependency injection](functions-dotnet-dependency-injection.md) |
| Application Insights dependencies | [Supported](dotnet-isolated-process-guide.md#application-insights) | [Supported](functions-monitoring.md#dependencies) |
| Cancellation tokens | [Supported](dotnet-isolated-process-guide.md#cancellation-tokens) | [Supported](functions-dotnet-class-library.md#cancellation-tokens) |
| Cold start times<sup>2</sup> | [Configurable optimizations](dotnet-isolated-process-guide.md#performance-optimizations) | Optimized |
| ReadyToRun | [Supported](dotnet-isolated-process-guide.md#readytorun) | [Supported](functions-dotnet-class-library.md#readytorun) |
| [Flex Consumption] | [Supported](flex-consumption-plan.md#supported-language-stack-versions) | Not supported |
| Aspire | [Supported](aspire-integration.md) | Not supported |

1. When you need to interact with a service using parameters determined at runtime, using the corresponding service SDKs directly is recommended over using imperative bindings. The SDKs are less verbose, cover more scenarios, and have advantages for error handling and debugging purposes. This recommendation applies to both models.
2. Cold start times could be additionally affected on Windows when using some preview versions of .NET due to just-in-time loading of preview frameworks. This impact applies to both the in-process and isolated worker models but can be noticeable when comparing across different versions. This delay for preview versions isn't present on Linux plans.
3. C# Script functions also run in-process and use the same libraries as in-process class library functions. For more information, see the [Azure Functions C# script (.csx) developer reference](functions-reference-csharp.md). 
4. Service SDK types include types from the [Azure SDK for .NET](https://learn.microsoft.com/dotnet/azure/sdk/azure-sdk-for-dotnet) such as [BlobClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient).
5. ASP.NET Core types aren't supported for .NET Framework.
6. `Azure.Functions.Sdk` supports .NET 8 and later and .NET Framework. It doesn't support out-of-support target frameworks from .NET Core 2.x through .NET 7.

[HttpRequest]: https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httprequest
[IActionResult]: https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.iactionresult
[HttpRequestData]: https://learn.microsoft.com/dotnet/api/microsoft.azure.functions.worker.http.httprequestdata?view=azure-dotnet&preserve-view=true
[HttpResponseData]: https://learn.microsoft.com/dotnet/api/microsoft.azure.functions.worker.http.httpresponsedata?view=azure-dotnet&preserve-view=true
[HttpRequestMessage]: https://learn.microsoft.com/dotnet/api/system.net.http.httprequestmessage
[HttpResponseMessage]: https://learn.microsoft.com/dotnet/api/system.net.http.httpresponsemessage

[aspnetcore-integration]: dotnet-isolated-process-guide.md#aspnet-core-integration


## Supported versions

Versions of the Functions runtime support specific versions of .NET. To learn more about Functions versions, see [Azure Functions runtime versions overview](functions-versions.md). Version support also depends on whether your functions run in-process or isolated worker process. 

>**Note:**
>To learn how to change the Functions runtime version used by your function app, see [view and update the current runtime version](set-runtime-version.md#view-the-current-runtime-version).

The following table shows the highest level of .NET or .NET Framework that can be used with a specific version of Functions.

| Functions runtime version | [Isolated worker model](dotnet-isolated-process-guide.md) | [In-process model](functions-dotnet-class-library.md)<sup>3</sup> |
| --- | --- | --- |
| Functions 4.x<sup>1</sup> | .NET 10<sup>4</sup><br/>.NET 9.0<br/>.NET 8.0<br/>.NET Framework 4.8<sup>2</sup> | .NET 8.0 |

<sup>1</sup> .NET 6 was previously supported on both models but reached the [end of official support] on November 12, 2024. .NET 7 was previously supported on the isolated worker model but reached the [end of official support] on May 14, 2024. 

<sup>2</sup> The build process also requires the [.NET SDK](https://dotnet.microsoft.com/download).

<sup>3</sup> Support ends for the in-process model on November 10, 2026. For more information, see [this support announcement](https://aka.ms/azure-functions-retirements/in-process-model). For continued full support, you should  [migrate your apps to the isolated worker model](migrate-dotnet-to-isolated-model.md).

<sup>4</sup> You can't run .NET 10 apps on Linux in the Consumption plan. To run on Linux, you should instead use the [Flex Consumption plan](flex-consumption-plan.md). For step-by-step migration instructions, see [Migrate Consumption plan apps to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md?pivots=platform-linux).

For the latest news about Azure Functions releases, including the removal of specific older minor versions, monitor [Azure App Service announcements](https://github.com/Azure/app-service-announcements/issues).

[end of official support]: https://dotnet.microsoft.com/platform/support/policy


## Next steps

> 
> [Learn more about the isolated worker model](dotnet-isolated-process-guide.md)

> 
> [Migrate to the isolated worker model][migrate]

[migrate]: migrate-dotnet-to-isolated-model.md

[`ILogger`]: https://learn.microsoft.com/dotnet/api/microsoft.extensions.logging.ilogger
[`ILogger<T>`]: https://learn.microsoft.com/dotnet/api/microsoft.extensions.logging.logger-1
