---
title: Migrate apps from Azure Functions version 1.x to 4.x
description: This article shows you how to migrate your existing function apps running on version 1.x of the Azure Functions runtime to be able to run on version 4.x of the runtime.
ms.service: azure-functions
ms.topic: how-to
ms.date: 09/15/2026
zone_pivot_groups: programming-languages-set-functions
ms.custom:
  - template-how-to-pattern
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - devx-track-dotnet
  - devx-track-azurecli
  - ignite-2023
  - linux-related-content
  - devx-track-ts
  - sfi-ropc-nochange
---

# <a name="top"></a>Migrate apps from Azure Functions version 1.x to version 4.x 

**Applies to: programming-language-go**


> **Important:**
> Go isn't supported by version 1.x of the Azure Functions runtime, so there's no Go-specific migration path. To create a first-class Go function app on version 4.x, see the [Go quickstart](how-to-create-function-azure-cli.md?pivots=programming-language-go).



**Applies to: programming-language-java**


> **Important:**
> Java isn't supported by version 1.x of the Azure Functions runtime. Perhaps you're instead looking to [migrate your Java app from version 3.x to version 4.x](migrate-version-3-version-4.md). If you're migrating a version 1.x function app, select either C# or JavaScript above.  



**Applies to: programming-language-typescript**


> **Important:**
> TypeScript isn't supported by version 1.x of the Azure Functions runtime. Perhaps you're instead looking to [migrate your TypeScript app from version 3.x to version 4.x](migrate-version-3-version-4.md). If you're migrating a version 1.x function app, select either C# or JavaScript above.  



**Applies to: programming-language-powershell**


> **Important:**
> PowerShell isn't supported by version 1.x of the Azure Functions runtime. Perhaps you're instead looking to [migrate your PowerShell app from version 3.x to version 4.x](migrate-version-3-version-4.md). If you're migrating a version 1.x function app, select either C# or JavaScript above.  



**Applies to: programming-language-python**


> **Important:**
> Python isn't supported by version 1.x of the Azure Functions runtime. Perhaps you're instead looking to [migrate your Python app from version 3.x to version 4.x](migrate-version-3-version-4.md). If you're migrating a version 1.x function app, select either C# or JavaScript above.


**Applies to: programming-language-javascript,programming-language-csharp**


> **Important:**
> [Support ended for version 1.x of the Azure Functions runtime on September 14, 2026](https://aka.ms/azure-functions-retirements/hostv1). Migrate your apps to version 4.x by following the instructions in this article. For historical runtime 1.x behavior and reference resources, see the [runtime 1.x legacy reference](functions-runtime-1x-legacy.md).

This article walks you through the process of safely migrating your function app to run on version 4.x of the Functions runtime. Because project migration instructions are language dependent, make sure to choose your development language from the selector at the [top of the article](#top).

If you are running version 1.x of the runtime in Azure Stack Hub, see [Considerations for Azure Stack Hub](#considerations-for-azure-stack-hub) first.

## Identify function apps to migrate

Run the following PowerShell script in Azure Cloud Shell to generate a list of function apps in your subscription that currently target version 1.x:

```azurepowershell-interactive
$FunctionApps = Get-AzFunctionApp

$AppInfo = @{}

foreach ($App in $FunctionApps)
{
     $AppSettings = Get-AzFunctionAppSetting -Name $App.Name -ResourceGroupName $App.ResourceGroupName
     if ($AppSettings.FUNCTIONS_EXTENSION_VERSION -like '*1*')
     {
          $AppInfo.Add($App.Name, $AppSettings.FUNCTIONS_EXTENSION_VERSION)
     }
}

$AppInfo
```

If you run outside of Cloud Shell, you must first set the active subscription:

```azurepowershell
$Subscription = '<SUBSCRIPTION_ID>' 
 
Set-AzContext -Subscription $Subscription | Out-Null
```

In this example, replace '<SUBSCRIPTION_ID>' with the ID of your subscription.  

**Applies to: programming-language-csharp**


## Choose your target .NET version

On version 1.x of the Functions runtime, your C# function app targets .NET Framework.


When you migrate your function app, you have the opportunity to choose the target version of .NET. You can update your C# project to one of the following versions of .NET that are supported by Functions version 4.x: 

| .NET version | [.NET Official Support Policy] release type | Functions process model<sup>1,2</sup> |
| --- | --- | --- |
| .NET 10 | LTS (end of support November 14 2028) | [Isolated worker model] |
| .NET 9 | STS (end of support November 10, 2026)<sup>3</sup> | [Isolated worker model] |
| .NET 8 | LTS (end of support November 10, 2026) | [Isolated worker model],<br/>[In-process model]<sup>2</sup> |
| .NET Framework 4.8 | [See policy][netfxpolicy] | [Isolated worker model] |

<sup>1</sup> The [isolated worker model] supports Long Term Support (LTS) and Standard Term Support (STS) versions of .NET, as well as .NET Framework. The [in-process model] only supports LTS releases of .NET, ending with .NET 8. For a full feature and functionality comparison between the two models, see [Differences between in-process and isolate worker process .NET Azure Functions](dotnet-isolated-in-process-differences.md). 

<sup>2</sup> Support ends for the in-process model on November 10, 2026. For more information, see [this support announcement](https://aka.ms/azure-functions-retirements/in-process-model). For continued full support, you should  [migrate your apps to the isolated worker model](migrate-dotnet-to-isolated-model.md).

<!-- <sup>3</sup> See [Preview .NET versions in the isolated worker model](../articles/azure-functions/dotnet-isolated-process-guide.md#preview-net-versions) for details on support, current restrictions, and instructions for using the preview version. -->

<sup>3</sup> .NET 9 previously had an expected end-of-support date of May 12, 2026. During the .NET 9 service window, the .NET team extended support for STS versions to 24 months, starting with .NET 9. For more information, see [the blog post](https://devblogs.microsoft.com/dotnet/dotnet-sts-releases-supported-for-24-months/).

[.NET Official Support Policy]: https://dotnet.microsoft.com/platform/support/policy
[netfxpolicy]: https://dotnet.microsoft.com/platform/support/policy/dotnet-framework
[Isolated worker model]: dotnet-isolated-process-guide.md
[In-process model]: functions-dotnet-class-library.md


> **Tip:**
> **Unless your app depends on a library or API only available to .NET Framework, update to .NET 10 on the isolated worker model.** Many apps on version 1.x target .NET Framework only because that choice was available when they were created. If your app doesn't need to stay on .NET Framework because of a dependency, target .NET 10, the current long-term support (LTS) release.
>
> Although you can choose to use the in-process model instead, this approach isn't recommended if you can avoid it. [Support ends for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model), so you need to move to the isolated worker model before then. Migrating models while you migrate to version 4.x decreases the total effort required, and the isolated worker model gives your app [additional benefits](dotnet-isolated-in-process-differences.md), including the ability to target future versions of .NET more easily. If you're moving to the isolated worker model, the [.NET Upgrade Assistant] can also handle many of the necessary code changes for you.

The isolated worker model examples in this guide target .NET 10. The .NET 8 examples apply only to the in-process model.



**Applies to: programming-language-javascript,programming-language-csharp**


## Prepare for migration

If you haven't already, identify the list of apps that need to be migrated in your current Azure subscription by using the [Azure PowerShell](#identify-function-apps-to-migrate).

Before you migrate an app to version 4.x of the Functions runtime, you should do the following tasks:

1. Review the list of [behavior changes after version 1.x](#behavior-changes-after-version-1x). Migrating from version 1.x to version 4.x also can affect bindings.
1. Complete the steps in [Migrate your local project](#migrate-your-local-project) to migrate your local project to version 4.x.
1. After migrating your project, fully test the app locally using version 4.x of the [Azure Functions Core Tools](functions-run-local.md). 
1. Update your function app in Azure to the new version. If you need to minimize downtime, consider using a [staging slot](functions-deployment-slots.md) to test and verify your migrated app in Azure on the new runtime version. You can then deploy your app with the updated version settings to the production slot. For more information, see [Update using slots](#update-using-slots).
1. Publish your migrated project to the updated function app.



**Applies to: programming-language-csharp**


  When you use Visual Studio to publish a version 4.x project to an existing function app at a lower version, you're prompted to let Visual Studio update the function app to version 4.x during deployment. This update uses the same process defined in [Update without slots](#update-without-slots).



**Applies to: programming-language-javascript,programming-language-csharp**


## Migrate your local project



**Applies to: programming-language-csharp**


The following sections describes the updates you must make to your C# project files to be able to run on one of the supported versions of .NET in Functions version 4.x. The updates shown are ones common to most projects. Your project code could require updates not mentioned in this article, especially when using custom NuGet packages.

Migrating a C# function app from version 1.x to version 4.x of the Functions runtime requires you to make changes to your project code. Many of these changes are a result of changes in the C# language and .NET APIs.

Choose the tab that matches your target version of .NET and the desired process model (in-process or isolated worker process).

> **Tip:**
> If you are moving to an LTS or STS version of .NET using the isolated worker model, the [.NET Upgrade Assistant] can be used to automatically make many of the changes mentioned in the following sections.

### Project file

The following example is a `.csproj` project file that runs on version 1.x:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net48</TargetFramework>
    <AzureFunctionsVersion>v1</AzureFunctionsVersion>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Sdk.Functions" Version="1.0.24" />
  </ItemGroup>
  <ItemGroup>
    <Reference Include="Microsoft.CSharp" />
  </ItemGroup>
  <ItemGroup>
    <None Update="host.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </None>
    <None Update="local.settings.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
      <CopyToPublishDirectory>Never</CopyToPublishDirectory>
    </None>
  </ItemGroup>
</Project>
```

Use one of the following procedures to update this XML file to run in Functions version 4.x:

# [.NET 10](#tab/net10)


These steps assume a local C# project; if your app instead uses C# script (*.csx* files), you should [convert to the project model](functions-reference-csharp.md#convert-a-c-script-app-to-a-c-project) before continuing.

The following changes are required in the *.csproj* XML project file:

1. Set the `Sdk` attribute on the `Project` element to `Azure.Functions.Sdk/1.0.0`.

1. Set the value of `PropertyGroup`.`TargetFramework` to `net10.0`.

1. In the `ItemGroup`.`PackageReference` list, replace the package reference to `Microsoft.NET.Sdk.Functions` with the following references. Keep the `Microsoft.Azure.Functions.Worker` package as an explicit reference:

    ```xml
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker" Version="2.52.0" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.Extensions.Http.AspNetCore" Version="2.1.0" />
    <PackageReference Include="Microsoft.ApplicationInsights.WorkerService" Version="2.22.0" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.ApplicationInsights" Version="1.2.0" />
    ```

    Make note of any references to other packages in the `Microsoft.Azure.WebJobs.*` namespaces. You'll replace these packages in a later step.

1. Add the following new `ItemGroup`:

    ```xml
    <ItemGroup>
      <Using Include="System.Threading.ExecutionContext" Alias="ExecutionContext"/>
    </ItemGroup>
    ```

After you make these changes, your updated project should look like the following example:

```xml
<Project Sdk="Azure.Functions.Sdk/1.0.0">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <RootNamespace>My.Namespace</RootNamespace>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker" Version="2.52.0" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.Extensions.Http.AspNetCore" Version="2.1.0" />
    <PackageReference Include="Microsoft.ApplicationInsights.WorkerService" Version="2.22.0" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.ApplicationInsights" Version="1.2.0" />
    <!-- Other packages may also be in this list -->
  </ItemGroup>
  <ItemGroup>
    <None Update="host.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </None>
    <None Update="local.settings.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
      <CopyToPublishDirectory>Never</CopyToPublishDirectory>
    </None>
  </ItemGroup>
  <ItemGroup>
    <Using Include="System.Threading.ExecutionContext" Alias="ExecutionContext"/>
  </ItemGroup>
</Project>
```


# [.NET Framework 4.8](#tab/netframework48)


These steps assume a local C# project; if your app instead uses C# script (*.csx* files), you should [convert to the project model](functions-reference-csharp.md#convert-a-c-script-app-to-a-c-project) before continuing.

Make the following changes in the *.csproj* XML project file:

1. Set the `Sdk` attribute on the `Project` element to `Azure.Functions.Sdk/1.0.0`.

1. Set the value of `PropertyGroup`.`TargetFramework` to `net48`.

1. In the `ItemGroup`.`PackageReference` list, replace the package reference to `Microsoft.NET.Sdk.Functions` with the following references. Keep the `Microsoft.Azure.Functions.Worker` package as an explicit reference:

    ```xml
    <PackageReference Include="Microsoft.Azure.Functions.Worker" Version="1.21.0" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.Extensions.Http" Version="3.1.0" />
    <PackageReference Include="Microsoft.ApplicationInsights.WorkerService" Version="2.22.0" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.ApplicationInsights" Version="1.2.0" />
    ```

    Make note of any references to other packages in the `Microsoft.Azure.WebJobs.*` namespaces. You'll replace these packages in a later step.

1. Add the following new `ItemGroup`:

    ```xml
    <ItemGroup>
      <Folder Include="Properties\" />
    </ItemGroup>
    ```

After you make these changes, your updated project should look like the following example:

```xml
<Project Sdk="Azure.Functions.Sdk/1.0.0">
  <PropertyGroup>
    <TargetFramework>net48</TargetFramework>
    <RootNamespace>My.Namespace</RootNamespace>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.Azure.Functions.Worker" Version="1.21.0" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.Extensions.Http" Version="3.1.0" />
    <PackageReference Include="Microsoft.ApplicationInsights.WorkerService" Version="2.22.0" />
    <PackageReference Include="Microsoft.Azure.Functions.Worker.ApplicationInsights" Version="1.2.0" />
    <!-- Other packages may also be in this list -->
  </ItemGroup>
  <ItemGroup>
    <None Update="host.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </None>
    <None Update="local.settings.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
      <CopyToPublishDirectory>Never</CopyToPublishDirectory>
    </None>
  </ItemGroup>
  <ItemGroup>
    <Folder Include="Properties\" />
  </ItemGroup>
</Project>
```


# [.NET 8 (in-process model)](#tab/net8-in-proc)


The following changes are required in the `.csproj` XML project file: 

1. Set the value of `PropertyGroup`.`TargetFramework` to `net8.0`.

1. Set the value of `PropertyGroup`.`AzureFunctionsVersion` to `v4`.

1. Replace the existing `ItemGroup`.`PackageReference` list with the following `ItemGroup`:

    ```xml
    <ItemGroup>
      <PackageReference Include="Microsoft.NET.Sdk.Functions" Version="4.4.0" />
    </ItemGroup>
    ```
    

After you make these changes, your updated project should look like the following example:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <AzureFunctionsVersion>v4</AzureFunctionsVersion>
    <RootNamespace>My.Namespace</RootNamespace>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Sdk.Functions" Version="4.4.0" />
  </ItemGroup>
  <ItemGroup>
    <None Update="host.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </None>
    <None Update="local.settings.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
      <CopyToPublishDirectory>Never</CopyToPublishDirectory>
    </None>
  </ItemGroup>
</Project>
```

---

### Package and namespace changes

Based on the model you are migrating to, you might need to update or change the packages your application references. When you adopt the target packages, you then need to update the namespace of using statements and some types you reference. You can see the effect of these namespace changes on `using` statements in the [HTTP trigger template examples](#http-trigger-template) later in this article.

# [.NET 10](#tab/net10)


If you haven't already, update your project to use the latest stable versions of:

- [Microsoft.Azure.Functions.Worker](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker/)
- [Azure.Functions.Sdk](https://www.nuget.org/packages/Azure.Functions.Sdk/) as the project SDK

Depending on the triggers and bindings your app uses, your app might need to reference a different set of packages. The following table shows the replacements for some of the most commonly used extensions:

| Scenario | Changes to package references |
| --- | --- |
| Timer trigger | Add<br/>[Microsoft.Azure.Functions.Worker.Extensions.Timer][timer] |
| Storage bindings | Replace<br/>`Microsoft.Azure.WebJobs.Extensions.Storage`<br/>with<br/>[Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs][blobs],<br/>[Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues][queues], and<br/>[Microsoft.Azure.Functions.Worker.Extensions.Tables][tables] |
| Blob bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.Storage.Blobs`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs][blobs] |
| Queue bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.Storage.Queues`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues][queues] |
| Table bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.Tables`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.Tables][tables] |
| Cosmos DB bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.CosmosDB`<br/>and/or<br/>`Microsoft.Azure.WebJobs.Extensions.DocumentDB`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.CosmosDB][cosmos] |
| Service Bus bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.ServiceBus`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.ServiceBus][servicebus] |
| Event Hubs bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.EventHubs`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.EventHubs][eventhubs] |
| Event Grid bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.EventGrid`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.EventGrid][eventgrid] |
| SignalR Service bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.SignalRService`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.SignalRService][signalr] |
| Durable Functions | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.DurableTask`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.DurableTask][durable] |
| Durable Functions<br/>(SQL storage provider) | Replace references to<br/>`Microsoft.DurableTask.SqlServer.AzureFunctions`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.DurableTask.SqlServer][durable-sql] |
| Durable Functions<br/>(Netherite storage provider) | Replace references to<br/>`Microsoft.Azure.DurableTask.Netherite.AzureFunctions`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.DurableTask.Netherite][durable-netherite] |
| SendGrid bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.SendGrid`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.SendGrid][sendgrid] |
| Kafka bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.Kafka`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.Kafka][kafka] |
| RabbitMQ bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.RabbitMQ`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.RabbitMQ][rabbitmq] |
| Dependency injection<br/>and startup config | Remove references to<br/>`Microsoft.Azure.Functions.Extensions`<br/>(The isolated worker model provides this functionality by default.) |

See [Supported bindings](functions-triggers-bindings.md#supported-bindings) for a complete list of extensions to consider, and consult each extension's documentation for full installation instructions for the isolated process model. Be sure to install the latest stable version of any packages you are targeting.

> **Tip:**
> Any changes to extension versions during this process might require you to update your `host.json` file as well. Be sure to read the documentation of each extension that you use.
> For example, the Service Bus extension has breaking changes in the structure between versions 4.x and 5.x. For more information, see [Azure Service Bus bindings for Azure Functions](https://learn.microsoft.com/azure/azure-functions/functions-bindings-service-bus?tabs=isolated-process%2Cextensionv5%2Cextensionv3\&pivots=programming-language-csharp#hostjson-settings).

**Your isolated worker model application should not reference any packages in the `Microsoft.Azure.WebJobs.*` namespaces or `Microsoft.Azure.Functions.Extensions`.** If you have any remaining references to these, they should be removed.

> **Tip:**
> Your app might also depend on Azure SDK types, either as part of your triggers and bindings or as a standalone dependency. You should take this opportunity to update these as well. The latest versions of the Functions extensions work with the latest versions of the [Azure SDK for .NET](https://learn.microsoft.com/dotnet/azure/sdk/azure-sdk-for-dotnet), almost all of the packages for which are the form `Azure.*`.

[blobs]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs
[queues]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues
[tables]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Tables
[servicebus]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.ServiceBus
[eventgrid]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventGrid
[cosmos]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.CosmosDB
[timer]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Timer
[eventhubs]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventHubs
[signalr]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.SignalRService
[rabbitmq]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.RabbitMQ
[kafka]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Kafka
[sendgrid]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.SendGrid
[durable]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.DurableTask
[durable-sql]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.DurableTask.SqlServer
[durable-netherite]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.DurableTask.Netherite


# [.NET Framework 4.8](#tab/netframework48)


If you haven't already, update your project to use the latest stable versions of:

- [Microsoft.Azure.Functions.Worker](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker/)
- [Azure.Functions.Sdk](https://www.nuget.org/packages/Azure.Functions.Sdk/) as the project SDK

Depending on the triggers and bindings your app uses, your app might need to reference a different set of packages. The following table shows the replacements for some of the most commonly used extensions:

| Scenario | Changes to package references |
| --- | --- |
| Timer trigger | Add<br/>[Microsoft.Azure.Functions.Worker.Extensions.Timer][timer] |
| Storage bindings | Replace<br/>`Microsoft.Azure.WebJobs.Extensions.Storage`<br/>with<br/>[Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs][blobs],<br/>[Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues][queues], and<br/>[Microsoft.Azure.Functions.Worker.Extensions.Tables][tables] |
| Blob bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.Storage.Blobs`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs][blobs] |
| Queue bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.Storage.Queues`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues][queues] |
| Table bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.Tables`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.Tables][tables] |
| Cosmos DB bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.CosmosDB`<br/>and/or<br/>`Microsoft.Azure.WebJobs.Extensions.DocumentDB`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.CosmosDB][cosmos] |
| Service Bus bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.ServiceBus`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.ServiceBus][servicebus] |
| Event Hubs bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.EventHubs`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.EventHubs][eventhubs] |
| Event Grid bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.EventGrid`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.EventGrid][eventgrid] |
| SignalR Service bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.SignalRService`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.SignalRService][signalr] |
| Durable Functions | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.DurableTask`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.DurableTask][durable] |
| Durable Functions<br/>(SQL storage provider) | Replace references to<br/>`Microsoft.DurableTask.SqlServer.AzureFunctions`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.DurableTask.SqlServer][durable-sql] |
| Durable Functions<br/>(Netherite storage provider) | Replace references to<br/>`Microsoft.Azure.DurableTask.Netherite.AzureFunctions`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.DurableTask.Netherite][durable-netherite] |
| SendGrid bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.SendGrid`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.SendGrid][sendgrid] |
| Kafka bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.Kafka`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.Kafka][kafka] |
| RabbitMQ bindings | Replace references to<br/>`Microsoft.Azure.WebJobs.Extensions.RabbitMQ`<br/>with the latest version of<br/>[Microsoft.Azure.Functions.Worker.Extensions.RabbitMQ][rabbitmq] |
| Dependency injection<br/>and startup config | Remove references to<br/>`Microsoft.Azure.Functions.Extensions`<br/>(The isolated worker model provides this functionality by default.) |

See [Supported bindings](functions-triggers-bindings.md#supported-bindings) for a complete list of extensions to consider, and consult each extension's documentation for full installation instructions for the isolated process model. Be sure to install the latest stable version of any packages you are targeting.

> **Tip:**
> Any changes to extension versions during this process might require you to update your `host.json` file as well. Be sure to read the documentation of each extension that you use.
> For example, the Service Bus extension has breaking changes in the structure between versions 4.x and 5.x. For more information, see [Azure Service Bus bindings for Azure Functions](https://learn.microsoft.com/azure/azure-functions/functions-bindings-service-bus?tabs=isolated-process%2Cextensionv5%2Cextensionv3\&pivots=programming-language-csharp#hostjson-settings).

**Your isolated worker model application should not reference any packages in the `Microsoft.Azure.WebJobs.*` namespaces or `Microsoft.Azure.Functions.Extensions`.** If you have any remaining references to these, they should be removed.

> **Tip:**
> Your app might also depend on Azure SDK types, either as part of your triggers and bindings or as a standalone dependency. You should take this opportunity to update these as well. The latest versions of the Functions extensions work with the latest versions of the [Azure SDK for .NET](https://learn.microsoft.com/dotnet/azure/sdk/azure-sdk-for-dotnet), almost all of the packages for which are the form `Azure.*`.

[blobs]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs
[queues]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues
[tables]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Tables
[servicebus]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.ServiceBus
[eventgrid]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventGrid
[cosmos]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.CosmosDB
[timer]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Timer
[eventhubs]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.EventHubs
[signalr]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.SignalRService
[rabbitmq]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.RabbitMQ
[kafka]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Kafka
[sendgrid]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.SendGrid
[durable]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.DurableTask
[durable-sql]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.DurableTask.SqlServer
[durable-netherite]: https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.DurableTask.Netherite


# [.NET 8 (in-process model)](#tab/net8-in-proc)


Update your project to reference the latest stable version of [Microsoft.NET.Sdk.Functions](https://www.nuget.org/packages/Microsoft.NET.Sdk.Functions).

Depending on the triggers and bindings your app uses, your app may need to reference an additional set of packages. See [Supported bindings](functions-triggers-bindings.md#supported-bindings) for a list of extensions to consider, and consult each extension's documentation for full installation instructions for the in-process process model. Be sure to install the latest stable version of any packages you are targeting.

> **Tip:**
> Your app may also depend on Azure SDK types, either as part of your triggers and bindings or as a standalone dependency. You should take this opportunity to update these as well. The latest versions of the Functions extensions work with the latest versions of the [Azure SDK for .NET](https://learn.microsoft.com/dotnet/azure/sdk/azure-sdk-for-dotnet), almost all of the packages for which are the form `Azure.*`.


---

The [Notification Hubs](functions-bindings-notification-hubs.md) and [Mobile Apps](functions-bindings-mobile-apps.md) bindings are supported only in version 1.x of the runtime. When upgrading to version 4.x of the runtime, you need to remove these bindings in favor of working with these services directly using their SDKs.

### Program.cs file

In most cases, migrating requires you to add the following program.cs file to your project:

# [.NET 10](#tab/net10)

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services => {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
    })
    .Build();

host.Run();
```

This example includes [ASP.NET Core integration] to improve performance and provide a familiar programming model when your app uses HTTP triggers. If you do not intend to use HTTP triggers, you can replace the call to `ConfigureFunctionsWebApplication` with a call to `ConfigureFunctionsWorkerDefaults`. If you do so, you can remove the reference to `Microsoft.Azure.Functions.Worker.Extensions.Http.AspNetCore` from your project file. However, for the best performance, even for functions with other trigger types, you should keep the `FrameworkReference` to ASP.NET Core.


The *Program.cs* file replaces any file that has the `FunctionsStartup` attribute, which is typically a *Startup.cs* file. In places where your `FunctionsStartup` code would reference `IFunctionsHostBuilder.Services`, you can instead add statements within the `.ConfigureServices()` method of the `HostBuilder` in your *Program.cs*. To learn more about working with *Program.cs*, see [Start-up and configuration](dotnet-isolated-process-guide.md#start-up-and-configuration) in the isolated worker model guide.

The default *Program.cs* examples previously described set up Application Insights by using the Application Insights SDK. For the OpenTelemetry-based Application Insights configuration described in the isolated worker model guide, see [Application Insights](dotnet-isolated-process-guide.md#application-insights). In your *Program.cs*, you must also configure any log filtering that should apply to logs coming from code in your project. In the isolated worker model, the *host.json* file only controls events emitted by the Functions host runtime. If you don't configure filtering rules in *Program.cs*, you might see differences in the log levels present for various categories in your telemetry.

Although you can register custom configuration sources as part of the `HostBuilder`, these similarly apply only to code in your project. The platform also needs trigger and binding configuration, and this should be provided through the [application settings](../app-service/configure-common.md#configure-app-settings), [Key Vault references](../app-service/app-service-key-vault-references.md?toc=%2Fazure%2Fazure-functions%2Ftoc.json), or [App Configuration references](../app-service/app-service-configuration-references.md?toc=%2Fazure%2Fazure-functions%2Ftoc.json) features.

After you move everything from any existing `FunctionsStartup` to the *Program.cs* file, you can delete the `FunctionsStartup` attribute and the class it was applied to.

# [.NET Framework 4.8](#tab/netframework48)

```csharp
using Microsoft.Extensions.Hosting;
using Microsoft.Azure.Functions.Worker;

namespace Company.FunctionApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            FunctionsDebugger.Enable();

            var host = new HostBuilder()
                .ConfigureFunctionsWorkerDefaults()
                .ConfigureServices(services => {
                    services.AddApplicationInsightsTelemetryWorkerService();
                    services.ConfigureFunctionsApplicationInsights();
                })
                .Build();
            host.Run();
        }
    }
}
```


The *Program.cs* file replaces any file that has the `FunctionsStartup` attribute, which is typically a *Startup.cs* file. In places where your `FunctionsStartup` code would reference `IFunctionsHostBuilder.Services`, you can instead add statements within the `.ConfigureServices()` method of the `HostBuilder` in your *Program.cs*. To learn more about working with *Program.cs*, see [Start-up and configuration](dotnet-isolated-process-guide.md#start-up-and-configuration) in the isolated worker model guide.

The default *Program.cs* examples previously described set up Application Insights by using the Application Insights SDK. For the OpenTelemetry-based Application Insights configuration described in the isolated worker model guide, see [Application Insights](dotnet-isolated-process-guide.md#application-insights). In your *Program.cs*, you must also configure any log filtering that should apply to logs coming from code in your project. In the isolated worker model, the *host.json* file only controls events emitted by the Functions host runtime. If you don't configure filtering rules in *Program.cs*, you might see differences in the log levels present for various categories in your telemetry.

Although you can register custom configuration sources as part of the `HostBuilder`, these similarly apply only to code in your project. The platform also needs trigger and binding configuration, and this should be provided through the [application settings](../app-service/configure-common.md#configure-app-settings), [Key Vault references](../app-service/app-service-key-vault-references.md?toc=%2Fazure%2Fazure-functions%2Ftoc.json), or [App Configuration references](../app-service/app-service-configuration-references.md?toc=%2Fazure%2Fazure-functions%2Ftoc.json) features.

After you move everything from any existing `FunctionsStartup` to the *Program.cs* file, you can delete the `FunctionsStartup` attribute and the class it was applied to.

# [.NET 8 (in-process model)](#tab/net8-in-proc)

A program.cs file isn't required when running in-process.

---

### host.json file

Settings in the host.json file apply at the function app level, both locally and in Azure. In version 1.x, your host.json file is either empty or it contains some settings that apply to all functions in the function app. For more information, see [Host.json v1](functions-host-json-v1.md). If your host.json file has setting values, review the [host.json v2 format](functions-host-json.md) for any changes.

To run on version 4.x, you must add `"version": "2.0"` to the host.json file. You should also consider adding `logging` to your configuration, as in the following examples: 

# [.NET 10](#tab/net10)

[Code reference unavailable in this source snapshot: ~/functions-quickstart-templates//Functions.Templates/ProjectTemplate_v4.x/CSharp-Isolated/host.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migrate-version-1-version-4.md)

The `host.json` file only controls logging from the Functions host runtime, and in the isolated worker model, some of these logs come from your application directly, giving you more control. See [Managing log levels in the isolated worker model](dotnet-isolated-process-guide.md#managing-log-levels) for details on how to filter these logs.

# [.NET Framework 4.8](#tab/netframework48)

[Code reference unavailable in this source snapshot: ~/functions-quickstart-templates/Functions.Templates/ProjectTemplate_v4.x/CSharp-Isolated/host.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migrate-version-1-version-4.md)

The `host.json` file only controls logging from the Functions host runtime, and in the isolated worker model, some of these logs come from your application directly, giving you more control. See [Managing log levels in the isolated worker model](dotnet-isolated-process-guide.md#managing-log-levels) for details on how to filter these logs.

# [.NET 8 (in-process model)](#tab/net8-in-proc)

[Code reference unavailable in this source snapshot: ~/functions-quickstart-templates/Functions.Templates/ProjectTemplate_v4.x/CSharp/host.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migrate-version-1-version-4.md)

---

### local.settings.json file

The local.settings.json file is only used when running locally. For information, see [Local settings file](functions-develop-local.md#local-settings-file). In version 1.x, the local.settings.json file has only two required values:

[Code reference unavailable in this source snapshot: ~/functions-quickstart-templates-v1/Functions.Templates/ProjectTemplate/local.settings.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migrate-version-1-version-4.md)

When you migrate to version 4.x, make sure that your local.settings.json file has at least the following elements:

# [.NET 10](#tab/net10)

[Code reference unavailable in this source snapshot: ~/functions-quickstart-templates/Functions.Templates/ProjectTemplate_v4.x/CSharp-Isolated/local.settings.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migrate-version-1-version-4.md)

> **Note:**
> When migrating from running in-process to running in an isolated worker process, you need to change the `FUNCTIONS_WORKER_RUNTIME` value to "dotnet-isolated".

# [.NET Framework 4.8](#tab/netframework48)

[Code reference unavailable in this source snapshot: ~/functions-quickstart-templates/Functions.Templates/ProjectTemplate_v4.x/CSharp-Isolated/local.settings.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migrate-version-1-version-4.md)

> **Note:**
> When migrating from running in-process to running in an isolated worker process, you need to change the `FUNCTIONS_WORKER_RUNTIME` value to "dotnet-isolated".

# [.NET 8 (in-process model)](#tab/net8-in-proc)

```json
{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "AzureWebJobsStorageConnectionStringValue",
        "FUNCTIONS_WORKER_RUNTIME": "dotnet",
        "FUNCTIONS_INPROC_NET8_ENABLED": "1"
    }
}
```

> **Note:**
> When choosing to target .NET 8 using the in-process model, you need to set the `FUNCTIONS_WORKER_RUNTIME` value to "dotnet" and set the `FUNCTIONS_INPROC_NET8_ENABLED` value to "1".

---

### Class name changes

Some key classes changed names between version 1.x and version 4.x. These changes are a result either of changes in .NET APIs or in differences between in-process and isolated worker process. The following table indicates key .NET classes used by Functions that could change when migrating:

# [.NET 10](#tab/net10)

| Version 1.x | .NET 10 |
| --- | --- |
| `FunctionName` (attribute) | `Function` (attribute) |
| `TraceWriter` | `ILogger<T>`, `ILogger` |
| `HttpRequestMessage` | `HttpRequestData`, `HttpRequest` (with [ASP.NET Core integration]) |
| `HttpResponseMessage` | `HttpResponseData`, `IActionResult` (with [ASP.NET Core integration]) |


# [.NET Framework 4.8](#tab/netframework48)

| Version 1.x | .NET Framework 4.8 |
| --- | --- |
| `FunctionName` (attribute) | `Function` (attribute) |
| `TraceWriter` | `ILogger<T>`, `ILogger` |
| `HttpRequestMessage` | `HttpRequestData` |
| `HttpResponseMessage` | `HttpResponseData` |

# [.NET 8 (in-process model)](#tab/net8-in-proc)

| Version 1.x | .NET 8 (in-process) |
| --- | --- |
| `FunctionName` (attribute) | `FunctionName` (attribute) |
| `TraceWriter` | `ILogger<T>`, `ILogger` |
| `HttpRequestMessage` | `HttpRequest` |
| `HttpResponseMessage` | `IActionResult` |

---

[ASP.NET Core integration]: dotnet-isolated-process-guide.md#aspnet-core-integration

There might also be class name differences in bindings. For more information, see the reference articles for the specific bindings.

### Other code changes

# [.NET 10](#tab/net10)

This section highlights other code changes to consider as you work through the migration. These changes are not needed by all applications, but you should evaluate if any are relevant to your scenarios. Make sure to check [Behavior changes after version 1.x](#behavior-changes-after-version-1x) for additional changes you might need to make to your project.


#### JSON serialization

By default, the isolated worker model uses *System.Text.Json* for JSON serialization. To customize serializer options or switch to JSON.NET (*Newtonsoft.Json*), see [Customizing JSON serialization](dotnet-isolated-process-guide.md#customizing-json-serialization).

Because the in-process model used *Newtonsoft.Json*, also check the serialization attributes on any types your functions bind to. *System.Text.Json* ignores attributes such as `[JsonProperty]` and `[JsonIgnore]` from *Newtonsoft.Json*. It binds the affected property to its default value without reporting an error. Either replace them with their *System.Text.Json* equivalents, such as `[JsonPropertyName]`, or configure *Newtonsoft.Json* for the layer that handles the payload.

#### Application Insights log levels and filtering

Logs can be sent to Application Insights from both the Functions host runtime and code in your project. The *host.json* allows you to configure rules for host logging, but to control logs coming from your code, you need to configure filtering rules as part of your *Program.cs*. See [Managing log levels in the isolated worker model](dotnet-isolated-process-guide.md#managing-log-levels) for details on how to filter these logs.


# [.NET Framework 4.8](#tab/netframework48)

This section highlights other code changes to consider as you work through the migration. These changes are not needed by all applications, but you should evaluate if any are relevant to your scenarios. Make sure to check [Behavior changes after version 1.x](#behavior-changes-after-version-1x) for additional changes you might need to make to your project.


#### JSON serialization

By default, the isolated worker model uses *System.Text.Json* for JSON serialization. To customize serializer options or switch to JSON.NET (*Newtonsoft.Json*), see [Customizing JSON serialization](dotnet-isolated-process-guide.md#customizing-json-serialization).

Because the in-process model used *Newtonsoft.Json*, also check the serialization attributes on any types your functions bind to. *System.Text.Json* ignores attributes such as `[JsonProperty]` and `[JsonIgnore]` from *Newtonsoft.Json*. It binds the affected property to its default value without reporting an error. Either replace them with their *System.Text.Json* equivalents, such as `[JsonPropertyName]`, or configure *Newtonsoft.Json* for the layer that handles the payload.

#### Application Insights log levels and filtering

Logs can be sent to Application Insights from both the Functions host runtime and code in your project. The *host.json* allows you to configure rules for host logging, but to control logs coming from your code, you need to configure filtering rules as part of your *Program.cs*. See [Managing log levels in the isolated worker model](dotnet-isolated-process-guide.md#managing-log-levels) for details on how to filter these logs.


# [.NET 8 (in-process model)](#tab/net8-in-proc)

Check [Behavior changes after version 1.x](#behavior-changes-after-version-1x) for more changes you might need to make to your project.

---

### HTTP trigger template

Most of the code changes between version 1.x and version 4.x can be seen in HTTP triggered functions. The HTTP trigger template for version 1.x looks like the following example:

```csharp
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace Company.Function
{
    public static class HttpTriggerCSharp
    {
        [FunctionName("HttpTriggerCSharp")]
        public static async Task<HttpResponseMessage> 
            Run([HttpTrigger(AuthorizationLevel.AuthLevelValue, "get", "post", 
            Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            log.Info("C# HTTP trigger function processed a request.");

            // parse query parameter
            string name = req.GetQueryNameValuePairs()
                .FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0)
                .Value;
            
            if (name == null)
            {
                // Get request body
                dynamic data = await req.Content.ReadAsAsync<object>();
                name = data?.name;
            }
            
            return name == null
                ? req.CreateResponse(HttpStatusCode.BadRequest, 
                    "Please pass a name on the query string or in the request body")
                : req.CreateResponse(HttpStatusCode.OK, "Hello " + name);
        }
    }
}
```

In version 4.x, the HTTP trigger template looks like the following example:

# [.NET 10](#tab/net10)

```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class HttpTriggerCSharp
    {
        private readonly ILogger<HttpTriggerCSharp> _logger;

        public HttpTriggerCSharp(ILogger<HttpTriggerCSharp> logger)
        {
            _logger = logger;
        }

        [Function("HttpTriggerCSharp")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            return new OkObjectResult($"Welcome to Azure Functions, {req.Query["name"]}!");
        }
    }
}
```

# [.NET Framework 4.8](#tab/netframework48)

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;

namespace Company.Function
{
    public class HttpTriggerCSharp
    {
        private readonly ILogger<HttpTriggerCSharp> _logger;

        public HttpTriggerCSharp(ILogger<HttpTriggerCSharp> logger)
        {
            _logger = logger;
        }

        [Function("HttpTriggerCSharp")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString($"Welcome to Azure Functions, {req.Query["name"]}!");

            return response;
        }
    }
}
```

# [.NET 8 (in-process model)](#tab/net8-in-proc)

[Code reference unavailable in this source snapshot: ~/functions-quickstart-templates/Functions.Templates/Templates/HttpTrigger-CSharp/HttpTriggerCSharp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/migrate-version-1-version-4.md)

---



**Applies to: programming-language-javascript**


To update your project to Azure Functions 4.x:

1. Update your local installation of [Azure Functions Core Tools](functions-run-local.md#install-the-azure-functions-core-tools) to version 4.x. 

1. Move to one of the [Node.js versions supported on version 4.x](functions-reference-node.md#node-version).

1. Add both `version` and `extensionBundle` elements to the host.json, so that it looks like the following example:

    
```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[3.3.0, 4.0.0)"
    }
}
```
 
    The `extensionBundle` element is required because after version 1.x, bindings are maintained as external packages. For more information, see [Extension bundles](extension-bundles.md).

1. Update your local.settings.json file so that it has at least the following elements:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "node"
        }
    }
    ```   

    The `AzureWebJobsStorage` setting can be either the Azurite storage emulator or an actual Azure storage account. For more information, see [Local storage emulator](functions-develop-local.md#local-storage-emulator).


**Applies to: programming-language-javascript,programming-language-csharp**



## Update your function app in Azure

You need to update the runtime of the function app host in Azure to version 4.x before you publish your migrated project. The runtime version used by the Functions host is controlled by the `FUNCTIONS_EXTENSION_VERSION` application setting, but in some cases other settings must also be updated. Both code changes and changes to application settings require your function app to restart.

The easiest way is to [update without slots](#update-without-slots) and then republish your app project. You can also minimize the downtime in your app and simplify rollback by [updating using slots](#update-using-slots). 

### Update without slots

The simplest way to update to v4.x is to set the `FUNCTIONS_EXTENSION_VERSION` application setting to `~4` on your function app in Azure. You must follow a [different procedure](#update-using-slots) on a site with slots. 

# [Azure CLI](#tab/azure-cli)

```azurecli
az functionapp config appsettings set --settings FUNCTIONS_EXTENSION_VERSION=~4 -g <RESOURCE_GROUP_NAME> -n <APP_NAME>
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
Update-AzFunctionAppSetting -AppSetting @{"FUNCTIONS_EXTENSION_VERSION" = "~4"} -Name <APP_NAME> -ResourceGroupName <RESOURCE_GROUP_NAME> -Force
```
---

You must also set another setting, which differs between Windows and Linux.

# [Windows](#tab/windows/azure-cli)

When running on Windows, you also need to enable .NET 8.0, which is required by version 4.x of the runtime.

```azurecli
az functionapp config set --net-framework-version v8.0 -g <RESOURCE_GROUP_NAME> -n <APP_NAME>
```

.NET 8.0 is required for function apps in any language running on Windows.

# [Windows](#tab/windows/azure-powershell)

When running on Windows, you also need to enable .NET 8.0, which is required by version 4.x of the runtime.

```azurepowershell
Set-AzWebApp -NetFrameworkVersion v8.0 -Name <APP_NAME> -ResourceGroupName <RESOURCE_GROUP_NAME>
```

.NET 8.0 is required for function apps in any language running on Windows.

# [Linux](#tab/linux/azure-cli)

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-python**

You might also need to update the `linuxFxVersion` site setting to target your specific language version. If you already have the correct value of `linuxFxVersion` set, you can skip this step. For more information, see [Valid `linuxFxVersion` values](functions-app-settings.md#valid-linuxfxversion-values).

**Applies to: programming-language-powershell**

PowerShell apps aren't supported on Linux before Functions 4.x. This fact means you shouldn't need to upgrade a PowerShell function app running on Linux. 

**Applies to: programming-language-csharp**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "DOTNET|8.0"
```
If you're migrating to .NET Functions isolated worker process, use `DOTNET-ISOLATED|8.0` for `--linux-fx-version`. 

**Applies to: programming-language-java**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "Java|11"
```
The `--linux-fx-version` value must match your target Java version. 

**Applies to: programming-language-javascript,programming-language-typescript**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "Node|16"
```
The `--linux-fx-version` value must match your target Node.js version. 

**Applies to: programming-language-python**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "Python|3.9"
```
The `--linux-fx-version` value must match your target PowerShell version. 



# [Linux](#tab/linux/azure-powershell)

When running .NET apps on Linux, you also need to update the `linuxFxVersion` site setting. Unfortunately, Azure PowerShell can't be used to set the `linuxFxVersion` at this time. Use the Azure CLI instead.

---

In this example, replace `<APP_NAME>` with the name of your function app and `<RESOURCE_GROUP_NAME>` with the name of the resource group. 

You can now republish your app project that has been migrated to run on version 4.x.

### Update using slots

Using [deployment slots](functions-deployment-slots.md) is a good way to update your function app to the v4.x runtime from a previous version. By using a staging slot, you can run your app on the new runtime version in the staging slot and switch to production after verification. Slots also provide a way to minimize downtime during the update. If you need to minimize downtime, follow the steps in [Minimum downtime update](#minimum-downtime-update).    

After you've verified your app in the updated slot, you can swap the app and new version settings into production. This swap requires setting [`WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0`](functions-app-settings.md#website_override_sticky_extension_versions) in the production slot. How you add this setting affects the amount of downtime required for the update. 

#### Standard update

If your slot-enabled function app can handle the downtime of a full restart, you can update the `WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS` setting directly in the production slot. Because changing this setting directly in the production slot causes a restart that impacts availability, consider doing this change at a time of reduced traffic. You can then swap in the updated version from the staging slot. 

The [`Update-AzFunctionAppSetting`](https://learn.microsoft.com/powershell/module/az.functions/update-azfunctionappsetting) PowerShell cmdlet doesn't currently support slots. You must use Azure CLI or the Azure portal.

1. Use the following command to set `WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0` in the production slot:

    ```azurecli
    az functionapp config appsettings set --settings WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0  -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> 
    ```

    In this example, replace `<APP_NAME>` with the name of your function app and `<RESOURCE_GROUP_NAME>` with the name of the resource group. This command causes the app running in the production slot to restart. 

1. Use the following command to also set `WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS` in the staging slot:

    ```azurecli
    az functionapp config appsettings set --settings WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0 -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> --slot <SLOT_NAME>
    ```

1. Use the following command to change `FUNCTIONS_EXTENSION_VERSION` and update the staging slot to the new runtime version:

    ```azurecli
    az functionapp config appsettings set --settings FUNCTIONS_EXTENSION_VERSION=~4 -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> --slot <SLOT_NAME>
    ```

1. Version 4.x of the Functions runtime requires .NET 8.0 in Windows. On Linux, .NET apps must also update to .NET 8.0. Use the following command so that the runtime can run on .NET 8.0:
   
    # [Windows](#tab/windows)

    When running on Windows, you also need to enable .NET 8.0, which is required by version 4.x of the runtime.

    ```azurecli
    az functionapp config set --net-framework-version v8.0 -g <RESOURCE_GROUP_NAME> -n <APP_NAME>
    ```

    Function apps in any language running on Windows require .NET 8.0.

    # [Linux](#tab/linux)

    **Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-python**

You might also need to update the `linuxFxVersion` site setting to target your specific language version. If you already have the correct value of `linuxFxVersion` set, you can skip this step. For more information, see [Valid `linuxFxVersion` values](functions-app-settings.md#valid-linuxfxversion-values).

**Applies to: programming-language-powershell**

PowerShell apps aren't supported on Linux before Functions 4.x. This fact means you shouldn't need to upgrade a PowerShell function app running on Linux. 

**Applies to: programming-language-csharp**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "DOTNET|8.0"
```
If you're migrating to .NET Functions isolated worker process, use `DOTNET-ISOLATED|8.0` for `--linux-fx-version`. 

**Applies to: programming-language-java**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "Java|11"
```
The `--linux-fx-version` value must match your target Java version. 

**Applies to: programming-language-javascript,programming-language-typescript**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "Node|16"
```
The `--linux-fx-version` value must match your target Node.js version. 

**Applies to: programming-language-python**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "Python|3.9"
```
The `--linux-fx-version` value must match your target PowerShell version. 



    ---

    In this example, replace `<APP_NAME>` with the name of your function app and `<RESOURCE_GROUP_NAME>` with the name of the resource group. 

1. If your code project required any updates to run on version 4.x, deploy those updates to the staging slot now.

1. Confirm that your function app runs correctly in the updated staging environment before swapping.

1. Use the following command to swap the updated staging slot to production:

    ```azurecli
    az functionapp deployment slot swap -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> --slot <SLOT_NAME> --target-slot production
    ```

#### Minimum downtime update

To minimize the downtime in your production app, you can swap the `WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS` setting from the staging slot into production. After that, you can swap in the updated version from a prewarmed staging slot. 

1. Use the following command to set `WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0` in the staging slot:

    ```azurecli
    az functionapp config appsettings set --settings WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0 -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> --slot <SLOT_NAME>
    ```
1. Use the following commands to swap the slot with the new setting into production, and at the same time restore the version setting in the staging slot. 

    ```azurecli
    az functionapp deployment slot swap -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> --slot <SLOT_NAME> --target-slot production
    az functionapp config appsettings set --settings FUNCTIONS_EXTENSION_VERSION=~3 -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> --slot <SLOT_NAME>
    ```

    You may see errors from the staging slot during the time between the swap and the runtime version being restored on staging. This error can happen because having `WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0` only in staging during a swap removes the `FUNCTIONS_EXTENSION_VERSION` setting in staging. Without the version setting, your slot is in a bad state. Updating the version in the staging slot right after the swap should put the slot back into a good state, and you call roll back your changes if needed. However, any rollback of the swap also requires you to directly remove `WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0` from production before the swap back to prevent the same errors in production seen in staging. This change in the production setting would then cause a restart.

1. Use the following command to again set `WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0` in the staging slot:

    ```azurecli
    az functionapp config appsettings set --settings WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0 -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> --slot <SLOT_NAME>
    ```

    At this point, both slots have `WEBSITE_OVERRIDE_STICKY_EXTENSION_VERSIONS=0` set.

1. Use the following command to change `FUNCTIONS_EXTENSION_VERSION` and update the staging slot to the new runtime version:

    ```azurecli
    az functionapp config appsettings set --settings FUNCTIONS_EXTENSION_VERSION=~4 -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> --slot <SLOT_NAME>
    ```

1. Version 4.x of the Functions runtime requires .NET 8.0 in Windows. On Linux, .NET apps must also update to .NET 8.0. Use the following command so that the runtime can run on .NET 8.0:
   
    # [Windows](#tab/windows)

    When running on Windows, you also need to enable .NET 8.0, which is required by version 4.x of the runtime.

    ```azurecli
    az functionapp config set --net-framework-version v8.0 -g <RESOURCE_GROUP_NAME> -n <APP_NAME>
    ```

    .NET 8.0 is required for function apps in any language running on Windows.

    # [Linux](#tab/linux)

    **Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-python**

You might also need to update the `linuxFxVersion` site setting to target your specific language version. If you already have the correct value of `linuxFxVersion` set, you can skip this step. For more information, see [Valid `linuxFxVersion` values](functions-app-settings.md#valid-linuxfxversion-values).

**Applies to: programming-language-powershell**

PowerShell apps aren't supported on Linux before Functions 4.x. This fact means you shouldn't need to upgrade a PowerShell function app running on Linux. 

**Applies to: programming-language-csharp**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "DOTNET|8.0"
```
If you're migrating to .NET Functions isolated worker process, use `DOTNET-ISOLATED|8.0` for `--linux-fx-version`. 

**Applies to: programming-language-java**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "Java|11"
```
The `--linux-fx-version` value must match your target Java version. 

**Applies to: programming-language-javascript,programming-language-typescript**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "Node|16"
```
The `--linux-fx-version` value must match your target Node.js version. 

**Applies to: programming-language-python**

```azurecli
az functionapp config set --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --linux-fx-version "Python|3.9"
```
The `--linux-fx-version` value must match your target PowerShell version. 



    ---

    In this example, replace `<APP_NAME>` with the name of your function app and `<RESOURCE_GROUP_NAME>` with the name of the resource group. 

1. If your code project required any updates to run on version 4.x, deploy those updates to the staging slot now.

1. Confirm that your function app runs correctly in the updated staging environment before swapping.

1. Use the following command to swap the updated and prewarmed staging slot to production:

    ```azurecli
    az functionapp deployment slot swap -g <RESOURCE_GROUP_NAME>  -n <APP_NAME> --slot <SLOT_NAME> --target-slot production
    ```





## Behavior changes after version 1.x

This section details changes made after version 1.x in both trigger and binding behaviors as well as in core Functions features and behaviors.

### Changes in triggers and bindings

Starting with version 2.x, you must install the extensions for specific triggers and bindings used by the functions in your app. The only exceptions are HTTP and timer triggers, which don't require an extension.  For more information, see [Register and install binding extensions](functions-bindings-register.md).

There are also a few changes in the *function.json* or attributes of the function between versions. For example, the Event Hubs `path` property is now `eventHubName`. See the [existing binding table](functions-triggers-bindings.md#supported-bindings) for links to documentation for each binding.

### Changes in features and functionality

A few features were removed, updated, or replaced after version 1.x. This section details the changes you see in later versions after having used version 1.x.

In version 2.x, the following changes were made:

* Keys for calling HTTP endpoints are always stored encrypted in Azure Blob storage. In version 1.x, keys were stored in Azure Files by default. When you migrate an app from version 1.x to version 2.x, existing secrets that are in Azure Files are reset.

* The version 2.x runtime doesn't include built-in support for webhook providers. This change was made to improve performance. You can still use HTTP triggers as endpoints for webhooks.

* To improve monitoring, the WebJobs dashboard in the portal, which used the [`AzureWebJobsDashboard`](functions-runtime-1x-legacy.md#app-settings-specific-to-runtime-1x) setting is replaced with Azure Application Insights, which uses the [`APPINSIGHTS_INSTRUMENTATIONKEY`](functions-app-settings.md#appinsights_instrumentationkey) setting. For more information, see [Monitor Azure Functions](functions-monitoring.md).

* All functions in a function app must share the same language. When you create a function app, you must choose a runtime stack for the app. The runtime stack is specified by the [`FUNCTIONS_WORKER_RUNTIME`](functions-app-settings.md#functions_worker_runtime) value in application settings. This requirement was added to improve footprint and startup time. When developing locally, you must also include this setting in the [local.settings.json file](functions-develop-local.md#local-settings-file).

* The default timeout for functions in an App Service plan is changed to 30 minutes. You can manually change the timeout back to unlimited by using the [functionTimeout](functions-host-json.md#functiontimeout) setting in host.json.

* HTTP concurrency throttles are implemented by default for Consumption plan functions, with a default of 100 concurrent requests per instance. You can change this behavior in the [`maxConcurrentRequests`](functions-host-json.md#http) setting in the host.json file.

* Because of [.NET Core limitations](https://github.com/Azure/azure-functions-host/issues/3414), support for F# script (`.fsx` files) functions has been removed. Compiled F# functions (.fs) are still supported.

* The URL format of Event Grid trigger webhooks has been changed to follow this pattern: `https://{app}/runtime/webhooks/{triggerName}`.

* The names of some [predefined custom metrics](analyze-telemetry-data.md) were changed after version 1.x. `Duration` was replaced with `MaxDurationMs`, `MinDurationMs`, and `AvgDurationMs`. `Success Rate` was also renamed to `Success Rate`.

## Considerations for Azure Stack Hub

[App Service on Azure Stack Hub](https://learn.microsoft.com/azure-stack/operator/azure-stack-app-service-overview) does not support version 4.x of Azure Functions. When you are planning a migration off of version 1.x in Azure Stack Hub, you can choose one of the following options:

- Migrate to version 4.x hosted in public cloud Azure Functions using the instructions in this article. Instead of upgrading your existing app, you would create a new app using version 4.x and then deploy your modified project to it.
- Switch to [WebJobs](../app-service/webjobs-create.md) hosted on an App Service plan in Azure Stack Hub.

## Next steps

> 
> [Learn more about Functions versions](functions-versions.md)

[.NET Upgrade Assistant]: https://learn.microsoft.com/dotnet/core/porting/upgrade-assistant-overview
