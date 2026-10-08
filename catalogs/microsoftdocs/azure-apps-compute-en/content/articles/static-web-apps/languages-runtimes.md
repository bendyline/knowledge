---
title: Supported languages and runtimes in Azure Static Web Apps
description: Supported languages and runtimes in Azure Static Web Apps
services: static-web-apps
author: cjk7989
ms.service: azure-static-web-apps
ms.topic: concept-article
ms.date: 10/05/2026
ms.author: jikunchen
---

# Supported languages and runtimes in Azure Static Web Apps

Azure Static Web Apps features two different places where runtime and language versions are important, on the front end and for the API.

| Runtime type | Description |
| --- | --- |
| [Front end](#front-end) | The version responsible for running the website's build steps that build the front end application. |
| [API](#api) | The version and runtime of Azure Functions used in your web application. |

## Front end

You can specify the version used to build the front end of your static web app. Configuring a non-default version is often only necessary if you need to target older versions.

You can specify the runtime version that builds the front end of your static web app in the _package.json_ file in the `engines` section of the file.

```json
{
  ...
  "engines": {
   "node": ">=14.0.0"
  }
}
```

## API

The underlying support for APIs in Azure Static Web Apps is provided by Azure Functions. Refer to the [Azure Functions supported languages and runtimes](../azure-functions/supported-languages.md) for details.

The following versions are supported for managed functions in Static Web Apps. If your application requires a version not listed, consider [bringing your own functions](functions-bring-your-own.md) to your app.


To configure the API language runtime version, set the `apiRuntime` property in the `platform` section to one of the following supported values.

| Language runtime version | Operating system | Azure Functions version | `apiRuntime` value | End of support date |
| --- | --- | --- | --- | --- |
| .NET Core 3.1 | Windows | 3.x | `dotnet:3.1` | December 3, 2022 |
| .NET 6.0 in-process | Windows | 4.x | `dotnet:6.0` | April 30, 2025 |
| .NET 8.0 in-process | Windows | 4.x | `dotnet:8.0` | November 10, 2026 |
| .NET 6.0 isolated | Windows | 4.x | `dotnet-isolated:6.0` | April 30, 2025 |
| .NET 7.0 isolated | Windows | 4.x | `dotnet-isolated:7.0` | April 30, 2025 |
| .NET 8.0 isolated | Windows | 4.x | `dotnet-isolated:8.0` | November 10, 2026 |
| .NET 9.0 isolated | Windows | 4.x | `dotnet-isolated:9.0` | November 10, 2026 |
| .NET 10.0 isolated | Windows | 4.x | `dotnet-isolated:10.0` | - |
| Node.js 12.x | Linux | 3.x | `node:12` | December 3, 2022 |
| Node.js 14.x | Linux | 4.x | `node:14` | April 30, 2025 |
| Node.js 16.x | Linux | 4.x | `node:16` | April 30, 2025 |
| Node.js 18.x | Linux | 4.x | `node:18` | May 31, 2025 |
| Node.js 20.x | Linux | 4.x | `node:20` | - |
| Node.js 22.x | Linux | 4.x | `node:22` | - |
| Python 3.8 | Linux | 4.x | `python:3.8` | April 30, 2025 |
| Python 3.9 | Linux | 4.x | `python:3.9` | - |
| Python 3.10 | Linux | 4.x | `python:3.10` | - |
| Python 3.11 | Linux | 4.x | `python:3.11` | - |


### .NET

To change the runtime version in a .NET app, change the `TargetFramework` value in the _csproj_ file, and set the `apiRuntime` value in the _staticwebapp.config.json_ file to the matching version. Make sure the `apiRuntime` value matches what you define in the _csproj_ file.

.NET 10.0 is supported only with the isolated worker model. If your API uses the in-process model, [migrate to the isolated worker model](../azure-functions/migrate-dotnet-to-isolated-model.md) first. For the packages and project settings required to target .NET 10.0, see [Guide for running C# Azure Functions in the isolated worker model](../azure-functions/dotnet-isolated-process-guide.md).

The following example demonstrates how to update the `TargetFramework` element for .NET 10.0 as the API language runtime version in the _csproj_ file.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    ...
  </PropertyGroup>
...
```

The following example configuration demonstrates how to use the `apiRuntime` property to select .NET 10.0 isolated as the API language runtime version in the _staticwebapp.config.json_ file.

```json
{
  ...
  "platform": {
    "apiRuntime": "dotnet-isolated:10.0"
  }
  ...
}
```

### Node.js

The following example configuration demonstrates how to use the `apiRuntime` property to select Node.js 20 as the API language runtime version in the _staticwebapp.config.json_ file.

```json
{
  ...
  "platform": {
    "apiRuntime": "node:20"
  }
  ...
}
```

### Python

The following example configuration demonstrates how to use the `apiRuntime` property to select Python 3.11 as the API language runtime version in the _staticwebapp.config.json_ file.

```json
{
  ...
  "platform": {
    "apiRuntime": "python:3.11"
  }
  ...
}
```


## Re-enabling proxies in v4.x

Azure Functions supports [re-enabling proxies in v4.x](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/legacy-proxies.md#re-enable-proxies-in-functions-v4x). To enable proxy support in managed functions for your static web app, set `SWA_ENABLE_PROXIES_MANAGED_FUNCTIONS` to `true` in your application settings. 

> **Note:**
> While proxies are supported in v4.x, consider using Azure API Management integration with your managed function apps, so your app isn't reliant on proxies.

## Deprecations

> **Note:**
> Now that Azure Functions v3 is retired, Static Web Apps uses Azure Functions v4 for API runtime support for Python 3.8. Redeploy your app to enable this change. While not recommended, you can revert back to v3 by setting the environment variable `USEV3_FOR_PYTHON38` to `true`. 

The following runtimes are deprecated in Azure Static Web Apps. For more information about changing your runtime, see [Specify API language runtime version in Azure Static Web Apps](https://azure.microsoft.com/updates/generally-available-specify-api-language-runtime-version-in-azure-static-web-apps/) and [Migrate apps from Azure Functions version 3.x to version 4.x](../azure-functions/migrate-version-3-version-4.md).

- .NET Core 3.1
- Node.js 12.x
