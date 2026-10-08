---
title: Configure ASP.NET Apps
description: Learn how to configure an ASP.NET app in Azure App Service. This article shows the most common configuration tasks. 

ms.devlang: csharp
ms.topic: concept-article
ms.date: 07/07/2025
author: cephalin
ms.author: cephalin
#customer intent: As an ASP.NET developer, I want to configure an ASP.NET app using Azure App Service to take advantage the Azure features.
ms.service: azure-app-service
ms.custom:
  - devx-track-csharp
  - devx-track-azurecli
  - devx-track-dotnet
  - sfi-ropc-nochange
---

# Configure an ASP.NET app for Azure App Service

> **Note:**
> For ASP.NET Core, see [Configure an ASP.NET Core app for Azure App Service](configure-language-dotnetcore.md). If your ASP.NET app runs in a custom Windows or Linux container, see [Configure a custom container for Azure App Service](configure-custom-container.md).

ASP.NET apps must be deployed to Azure App Service as compiled binaries. The Visual Studio publishing tool builds the solution and then deploys the compiled binaries directly. The App Service deployment engine deploys the code repository first and then compiles the binaries.

This guide provides key concepts and instructions for ASP.NET developers. If this article is your first experience with Azure App Service, follow [Deploy an ASP.NET web app](quickstart-dotnetcore.md?tabs=netframework48) and [Deploy an ASP.NET app with Azure SQL database to Azure](app-service-web-tutorial-dotnet-sqldatabase.md) first.

## Show supported .NET Framework runtime versions

In App Service, the Windows instances already have all the supported .NET Framework versions installed. To show the .NET Framework runtime and SDK versions available to you, go to your app in the Azure portal. Select **Development Tools** > **Advanced Tools**. Select **Go**. In Kudu, select **Debug console** for **CMD** or **PowerShell**. Run the appropriate command in the browser-based console:

For CLR 4 runtime versions (.NET Framework 4 and above):

```CMD
ls "D:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework"
```

Latest .NET Framework version might not be immediately available.

For CLR 2 runtime versions (.NET Framework 3.5 and below):

```CMD
ls "D:\Program Files (x86)\Reference Assemblies\Microsoft\Framework"
```

If the runtime your application requires isn't supported, you can deploy it with a custom container.

## Show current .NET Framework runtime version

Run the following command in the [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp config show --resource-group <resource-group-name> --name <app-name> --query netFrameworkVersion
```

A value of `v4.0` means the latest CLR 4 version (.NET Framework 4.x) is used. A value of `v2.0` means a CLR 2 version (.NET Framework 3.5) is used.

## Set .NET Framework runtime version

By default, App Service uses the latest supported .NET Framework version to run your ASP.NET app. To run your app using .NET Framework 3.5 instead, run the following command in the [Cloud Shell](https://shell.azure.com) (v2.0 signifies CLR 2):

```azurecli-interactive
az webapp config set --resource-group <resource-group-name> --name <app-name> --net-framework-version v2.0
```


## What happens to outdated runtimes in App Service?

Outdated runtimes are deprecated by the maintaining organization or have significant vulnerabilities. Accordingly, they're removed from the create and configure pages in the portal. When an outdated runtime is hidden from the portal, any app that's still using that runtime continues to run. 

If you want to create an app with an outdated runtime version that's no longer shown on the portal, use the Azure CLI, an ARM template, or Bicep. These deployment alternatives let you create deprecated runtimes that are removed from the portal but are still being supported.

If a runtime is fully removed from the App Service platform, your Azure subscription owner receives an email notice before the removal.


## Access environment variables

In App Service, you can [set app settings](configure-common.md#configure-app-settings) and connection strings outside of your app code. Then you can access them in any class using the standard ASP.NET pattern:

```csharp
using System.Configuration;
...
// Get an app setting
ConfigurationManager.AppSettings["MySetting"];
// Get a connection string
ConfigurationManager.ConnectionStrings["MyConnection"];
}
```

If you configure an app setting with the same name in App Service and in *web.config*, the App Service value takes precedence over the *web.config* value. The local *web.config* value lets you debug the app locally. The App Service value lets your run the app in product with production settings. Connection strings work in the same way. This way, you can keep your application secrets outside of your code repository and access the appropriate values without changing your code.

> **Note:**
> Consider more secure connectivity options that don't require connection secrets at all. For more information, see [Secure connectivity to Azure services and databases from Azure App Service](tutorial-connect-overview.md).


## Deploy multi-project solutions

When a Visual Studio solution includes multiple projects, the Visual Studio publish process includes selecting the project to deploy. When you deploy to the App Service deployment engine, such as with Git, or with ZIP deploy [with build automation enabled](deploy-zip.md#enable-build-automation-for-zip-deploy), the App Service deployment engine picks the first Web Site or Web Application Project it finds as the App Service app. You can specify which project App Service should use by specifying the `PROJECT` app setting. For example, run the following command in the [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp config appsettings set --resource-group <resource-group-name> --name <app-name> --settings PROJECT="<project-name>/<project-name>.csproj"
```

## Get detailed exceptions page

When your ASP.NET app generates an exception in the Visual Studio debugger, the browser displays a detailed exception page. A generic error message replaces that page in App Service. To display the detailed exception page in App Service, open the *web.config* file and add the `<customErrors mode="Off"/>` element under the `<system.web>` element. For example:

```xml
<system.web>
    <customErrors mode="Off"/>
</system.web>
```

Redeploy your app with the updated *web.config*. You should now see the same detailed exception page.

## Access diagnostic logs

You can add diagnostic messages in your application code using [System.Diagnostics.Trace](https://learn.microsoft.com/dotnet/api/system.diagnostics.trace). For example: 

```csharp
Trace.TraceError("Record not found!"); // Error trace
Trace.TraceWarning("Possible data loss"); // Warning trace
Trace.TraceInformation("GET /Home/Index"); // Information trace
```


To access the console logs generated from inside your application code in App Service, turn on diagnostic logging by running the following command in [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp log config --resource-group <resource-group-name> --name <app-name> --docker-container-logging filesystem --level Verbose
```

Possible values for `--level` are `Error`, `Warning`, `Info`, and `Verbose`. Each subsequent level includes the previous level. For example, `Error` includes only error messages. `Verbose` includes all messages.

After you turn on diagnostic logging, run the following command to see the log stream:

```azurecli-interactive
az webapp log tail --resource-group <resource-group-name> --name <app-name>
```

If console logs don't appear immediately, check again in 30 seconds.

To stop log streaming at any time, select **Ctrl**+**C**.


## Related content

- [Tutorial: Build an ASP.NET app in Azure with SQL Database](app-service-web-tutorial-dotnet-sqldatabase.md)
- [Environment variables and app settings reference](reference-app-settings.md)
