---
title: Migrate C# Apps from In-process to Isolated Worker Model
description: Learn how to migrate your existing C# function apps running on .NET in the in-process model to the isolated worker model.
ms.service: azure-functions
ms.custom:
  - devx-track-dotnet
  - ignite-2023
ms.topic: how-to
ms.date: 09/14/2026
---

# Migrate C# apps from the in-process model to the isolated worker model

> **Important:**
> [Support for the in-process model ends on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). Migrate your apps to the isolated worker model by following the instructions in this article.

This article walks you through the process of safely migrating your .NET function app from the [in-process model](functions-dotnet-class-library.md) to the [isolated worker model][isolated-guide]. To learn about the high-level differences between these models, see the [execution mode comparison](dotnet-isolated-in-process-differences.md).

This guide assumes that your app is running on version 4.x of the Functions runtime. If not, use the following guides to upgrade your host version. These host-version migration guides also help you migrate to the isolated worker model as you work through them.

- [Migrate apps from Azure Functions version 2.x and 3.x to version 4.x](migrate-version-3-version-4.md)
- [Migrate apps from Azure Functions version 1.x to version 4.x](migrate-version-1-version-4.md)

When supported, this article takes advantage of [ASP.NET Core integration] in the isolated worker model, which improves performance and provides a familiar programming model when your app uses HTTP triggers. 

## Identify function apps to migrate

Use the following Azure PowerShell script to generate a list of function apps in your subscription that currently use the in-process model.

The script uses the subscription that Azure PowerShell is currently configured to use. You can change the subscription by first running `Set-AzContext -Subscription '<YOUR SUBSCRIPTION ID>'` and replacing `<YOUR SUBSCRIPTION ID>` with the ID of the subscription you want to evaluate.

```azurepowershell-interactive
$FunctionApps = Get-AzFunctionApp

$AppInfo = @{}

foreach ($App in $FunctionApps)
{
     if ($App.Runtime -eq 'dotnet')
     {
          $AppInfo.Add($App.Name, $App.Runtime)
     }
}

$AppInfo
```

## Choose your target .NET version

When migrating to the isolated worker model, choose your target based on whether your function app and its dependencies can run on .NET (formerly .NET Core):

- If your app and its dependencies can run on .NET, target .NET 10.
- If your app depends on libraries or APIs available only in .NET Framework, target .NET Framework 4.8.

## Prepare for migration

Before you migrate an app to the isolated worker model, thoroughly review the contents of this guide. Also, familiarize yourself with the features of the [isolated worker model][isolated-guide] and the [differences between the two models](dotnet-isolated-in-process-differences.md).

To migrate the application:

1. Migrate your local project to the isolated worker model by following the steps in [Migrate your local project](#migrate-your-local-project).
1. After migrating your project, fully test the app locally by using version 4.x of the [Azure Functions Core Tools](functions-run-local.md).
1. [Update your function app in Azure](#update-your-function-app-in-azure) to the isolated model.

## Migrate your local project

This section outlines the various changes that you need to make to your local project to move it to the isolated worker model. Some of the steps change based on your target version of .NET. Use the tabs to select the instructions that match your desired version.

> **Tip:**
> If you're moving to .NET 10, the [.NET Upgrade Assistant] can automatically make many of the changes mentioned in the following sections.

First, convert the project file and update your dependencies. As you do, you see build errors for the project. In subsequent steps, you'll make the corresponding changes to remove these errors.

### Project file

The following example shows a *.csproj* project file that uses .NET 8 on version 4.x:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <AzureFunctionsVersion>v4</AzureFunctionsVersion>
    <RootNamespace>My.Namespace</RootNamespace>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Sdk.Functions" Version="4.1.1" />
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

Use one of the following procedures to update this XML file to run in the isolated worker model:

#### [.NET 10](#tab/net10)


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


#### [.NET Framework 4.8](#tab/netframework48)


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


---

Changing your project's target framework might also require changes to parts of your toolchain, outside of project code. For example, in VS Code, you might need to update the `azureFunctions.deploySubpath` extension setting through user settings or your project's *.vscode/settings.json* file. Check for any dependencies on the framework version that might exist outside of your project code, as part of build steps or a CI/CD pipeline.

### Package references

When migrating to the isolated worker model, change the packages your application references.


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


### Program.cs file

When migrating to run in an isolated worker process, add a *Program.cs* file to your project with the following contents:

#### [.NET 10](#tab/net10)

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

This example includes [ASP.NET Core integration] to improve performance and provide a familiar programming model when your app uses HTTP triggers. If you don't intend to use HTTP triggers, you can replace the call to `ConfigureFunctionsWebApplication` with a call to `ConfigureFunctionsWorkerDefaults`. If you do so, you can remove the reference to `Microsoft.Azure.Functions.Worker.Extensions.Http.AspNetCore` from your project file. However, for the best performance, even for functions with other trigger types, you should keep the `FrameworkReference` to ASP.NET Core.

#### [.NET Framework 4.8](#tab/netframework48)

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

---


The *Program.cs* file replaces any file that has the `FunctionsStartup` attribute, which is typically a *Startup.cs* file. In places where your `FunctionsStartup` code would reference `IFunctionsHostBuilder.Services`, you can instead add statements within the `.ConfigureServices()` method of the `HostBuilder` in your *Program.cs*. To learn more about working with *Program.cs*, see [Start-up and configuration](dotnet-isolated-process-guide.md#start-up-and-configuration) in the isolated worker model guide.

The default *Program.cs* examples previously described set up Application Insights by using the Application Insights SDK. For the OpenTelemetry-based Application Insights configuration described in the isolated worker model guide, see [Application Insights](dotnet-isolated-process-guide.md#application-insights). In your *Program.cs*, you must also configure any log filtering that should apply to logs coming from code in your project. In the isolated worker model, the *host.json* file only controls events emitted by the Functions host runtime. If you don't configure filtering rules in *Program.cs*, you might see differences in the log levels present for various categories in your telemetry.

Although you can register custom configuration sources as part of the `HostBuilder`, these similarly apply only to code in your project. The platform also needs trigger and binding configuration, and this should be provided through the [application settings](../app-service/configure-common.md#configure-app-settings), [Key Vault references](../app-service/app-service-key-vault-references.md?toc=%2Fazure%2Fazure-functions%2Ftoc.json), or [App Configuration references](../app-service/app-service-configuration-references.md?toc=%2Fazure%2Fazure-functions%2Ftoc.json) features.

After you move everything from any existing `FunctionsStartup` to the *Program.cs* file, you can delete the `FunctionsStartup` attribute and the class it was applied to.

### Function signature changes

Some key types change between the in-process model and the isolated worker model. Many of these changes relate to the attributes, parameters, and return types that make up the function signature. For each of your functions, make changes to:

- The function attribute, which also sets the function's name
- How the function obtains an `ILogger`/`ILogger<T>`
- Trigger and binding attributes and parameters

The rest of this section walks you through each of these steps.

#### Function attributes

The `Function` attribute in the isolated worker model replaces the `FunctionName` attribute. The new attribute has the same signature, and the only difference is in the name. You can therefore perform a string replacement across your project.

#### Logging

In the in-process model, you could include an optional `ILogger` parameter for your function, or you could use dependency injection to get an `ILogger<T>`. If your app already used dependency injection, the same mechanisms work in the isolated worker model.

However, for any Functions that relied on the `ILogger` method parameter, you need to make a change. Use dependency injection to obtain an `ILogger<T>`. Use the following steps to migrate the function's logging mechanism:

1. In your function class, add a `private readonly ILogger<MyFunction> _logger;` property, replacing `MyFunction` with the name of your function class.

1. Create a constructor for your function class that takes in the `ILogger<T>` as a parameter:

    ```csharp
    public MyFunction(ILogger<MyFunction> logger) {
        _logger = logger;
    }
    ```

    Replace both instances of `MyFunction` in the preceding code snippet with the name of your function class.

1. For logging operations in your function code, replace references to the `ILogger` parameter with `_logger`.

1. Remove the `ILogger` parameter from your function signature.

To learn more, see [Logging in the isolated worker model](dotnet-isolated-process-guide.md#logging).

#### Trigger and binding changes

When you [changed your package references in a previous step](#package-references), you introduced errors for your triggers and bindings that you can now fix:

1. Remove any `using Microsoft.Azure.WebJobs;` statements.

1. Add a `using Microsoft.Azure.Functions.Worker;` statement.

1. For each binding attribute, change the attribute's name as specified in its reference documentation, which you can find in the [Supported bindings](functions-triggers-bindings.md#supported-bindings) index. In general, the attribute names change as follows:

    - **Triggers typically remain named the same way.** For example, `QueueTrigger` is the attribute name for both models.
    - **Input bindings typically need `Input` added to their name.** For example, if you used the `CosmosDB` input binding attribute in the in-process model, the attribute would now be `CosmosDBInput`.
    - **Output bindings typically need `Output` added to their name.** For example, if you used the `Queue` output binding attribute in the in-process model, this attribute would now be `QueueOutput`.
 
1. Update the attribute parameters to reflect the isolated worker model version, as specified in the binding's reference documentation. 

    For example, in the in-process model, a blob output binding is represented by a `[Blob(...)]` attribute that includes an `Access` property. In the isolated worker model, the blob output attribute would be `[BlobOutput(...)]`. The binding no longer requires the `Access` property, so you can remove that parameter. So `[Blob("sample-images-sm/{fileName}", FileAccess.Write, Connection = "MyStorageConnection")]` becomes `[BlobOutput("sample-images-sm/{fileName}", Connection = "MyStorageConnection")]`.

1. Move output bindings out of the function parameter list. If you have just one output binding, you can apply this binding to the return type of the function. If you have multiple outputs, create a new class with properties for each output, and apply the attributes to those properties. To learn more, see [Multiple output bindings](dotnet-isolated-process-guide.md#multiple-output-bindings).

1. Consult each binding's reference documentation for the types it allows you to bind to. In some cases, you might need to change the type. For output bindings, if the in-process model version used an `IAsyncCollector<T>`, you can replace this type by binding to an array of the target type: `T[]`. You can also consider replacing the output binding with a client object for the service it represents, either as the binding type for an input binding if available, or by [injecting a client yourself](dotnet-isolated-process-guide.md#register-azure-clients).

1. If your function includes an `IBinder` parameter, remove it. Replace the functionality with a client object for the service it represents, either as the binding type for an input binding if available, or by [injecting a client yourself](dotnet-isolated-process-guide.md#register-azure-clients).

1. Update the function code to work with any new types.

#### Migrate to asynchronous HTTP stream I/O

If an HTTP-triggered function uses [ASP.NET Core integration], replace synchronous reads from and writes to HTTP request and response streams with asynchronous methods. Synchronous operations can fail with `InvalidOperationException: Synchronous operations are disallowed`. For example, replace `ReadToEnd` with `ReadToEndAsync`, `Write` with `WriteAsync`, `WriteString` with `WriteStringAsync`, and `Flush` with `FlushAsync`.

When you await these operations, mark the function method as `async` and wrap its return type in `Task<T>`. For example, change `IActionResult` to `Task<IActionResult>` or `MultiResponse` to `Task<MultiResponse>`. ASP.NET Core disallows synchronous request and response I/O by default because synchronous I/O can cause thread pool starvation. If a dependency or serializer doesn't support asynchronous I/O, see [JSON serialization with ASP.NET Core integration](dotnet-isolated-process-guide.md#json-serialization-with-aspnet-core-integration) for instructions to enable synchronous I/O (`AllowSynchronousIO`) as a compatibility option.

### local.settings.json file

The *local.settings.json* file is only used when running locally. For information, see [Local settings file](functions-develop-local.md#local-settings-file).

When migrating from running in-process to running in an isolated worker process, you need to change the `FUNCTIONS_WORKER_RUNTIME` value to *dotnet-isolated*. Ensure that your *local.settings.json* file has at least the following elements:

```json
{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated"
    }
}
```

The value you have for `AzureWebJobsStorage` might be different. You don't need to change its value as part of the migration.

### host.json file

No changes are required to your *host.json* file. However, if your Application Insights configuration is in this file from your in-process model project, you might want to make more changes in your *Program.cs* file. The *host.json* file only controls logging from the Functions host runtime. In the isolated worker model, some of these logs come from your application directly, giving you more control. See [Managing log levels in the isolated worker model](dotnet-isolated-process-guide.md#managing-log-levels) for details on how to filter these logs.

### Other code changes

This section highlights other code changes to consider as you work through the migration. These changes aren't needed by all applications, but you should evaluate if any are relevant to your scenarios.


#### JSON serialization

By default, the isolated worker model uses *System.Text.Json* for JSON serialization. To customize serializer options or switch to JSON.NET (*Newtonsoft.Json*), see [Customizing JSON serialization](dotnet-isolated-process-guide.md#customizing-json-serialization).

Because the in-process model used *Newtonsoft.Json*, also check the serialization attributes on any types your functions bind to. *System.Text.Json* ignores attributes such as `[JsonProperty]` and `[JsonIgnore]` from *Newtonsoft.Json*. It binds the affected property to its default value without reporting an error. Either replace them with their *System.Text.Json* equivalents, such as `[JsonPropertyName]`, or configure *Newtonsoft.Json* for the layer that handles the payload.

#### Application Insights log levels and filtering

Logs can be sent to Application Insights from both the Functions host runtime and code in your project. The *host.json* allows you to configure rules for host logging, but to control logs coming from your code, you need to configure filtering rules as part of your *Program.cs*. See [Managing log levels in the isolated worker model](dotnet-isolated-process-guide.md#managing-log-levels) for details on how to filter these logs.


### HTTP trigger migration example

The following example compares an HTTP-triggered function before and after migration to the isolated worker model.

An HTTP trigger for the in-process model might look like the following example:

```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public static class HttpTriggerCSharp
    {
        [FunctionName("HttpTriggerCSharp")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            return new OkObjectResult($"Welcome to Azure Functions, {req.Query["name"]}!");
        }
    }
}
```

An HTTP trigger for the migrated version might look like the following example:

#### [.NET 10](#tab/net10)

```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class HttpTriggerCSharp(ILogger<HttpTriggerCSharp> logger)
    {
        [Function("HttpTriggerCSharp")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequest req)
        {
            logger.LogInformation("C# HTTP trigger function processed a request.");

            return new OkObjectResult($"Welcome to Azure Functions, {req.Query["name"]}!");
        }
    }
}
```

#### [.NET Framework 4.8](#tab/netframework48)

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;

namespace Company.Function
{
    public class HttpTriggerCSharp(ILogger<HttpTriggerCSharp> logger)
    {
        [Function("HttpTriggerCSharp")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req)
        {
            logger.LogInformation("C# HTTP trigger function processed a request.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString($"Welcome to Azure Functions, {req.Query["name"]}!");

            return response;
        }
    }
}
```

---

## Update your function app in Azure

After you migrate your local project, update your function app configuration and deploy the migrated code to complete the move to the isolated worker model.

### Before you publish your migrated project

Before you publish your updated code project, plan to complete these two changes together:

- Change the `FUNCTIONS_WORKER_RUNTIME` application setting to `dotnet-isolated`.
- Publish the migrated isolated worker project to your function app.

Each change restarts the app. After you complete the first change, the deployed code and configured runtime don't match, which causes a [runtime/payload mismatch error (`AZFD0013`)](errors-diagnostics/diagnostic-events/azfd0013.md) until you complete the second change.

When feasible, use a [staging slot](functions-deployment-slots.md) during the migration. A staging slot gives you these benefits:

- Keeps the temporary error state resulting from the code and runtime mismatch out of production.
- Lets you test the migrated code and configuration before you swap them into production.

You might see errors in the staging slot logs while completing the two changes. Before you swap the slot, confirm that the errors have stopped and that the app works as expected.

### Update your function app by using slots

Use the following steps to update your function app to the isolated worker model by using a staging slot:

1. [Create a deployment slot](functions-deployment-slots.md#add-a-slot) if you haven't already. You might also want to familiarize yourself with the slot swap process and ensure that you can make updates to the existing application with minimal disruption.

1. Change the configuration of the staging (nonproduction) slot to use the isolated worker model by setting the `FUNCTIONS_WORKER_RUNTIME` application setting to `dotnet-isolated`. Don't mark `FUNCTIONS_WORKER_RUNTIME` as a *slot setting*.

    If you're also targeting a different version of .NET as part of your update, change the stack configuration. To do so, see [Update the stack configuration](update-language-versions.md?pivots=programming-language-csharp#update-the-stack-configuration). You can use the same instructions for any future .NET version updates you make.

    If you have any automated infrastructure provisioning such as a CI/CD pipeline, ensure that the automations are also updated to keep `FUNCTIONS_WORKER_RUNTIME` set to `dotnet-isolated` and to target the correct .NET version.

1. Publish your migrated project to the staging (nonproduction) slot of your function app.

    If you use Visual Studio to publish an isolated worker model project to an existing app or slot that uses the in-process model, it can also complete the previous step for you at the same time. If you didn't complete the previous step, Visual Studio prompts you to update the function app during deployment. Visual Studio presents this update as a single operation, but these updates are still two separate operations. You might still see errors in your logs from the staging (nonproduction) slot during the interim state.

1. Confirm that your application is working as expected within the staging (nonproduction) slot.

1. Perform a [slot swap operation](functions-deployment-slots.md#swap-slots) to apply the changes you made in your staging (nonproduction) slot to the production slot. A slot swap happens as a single update, which avoids introducing the interim error state in your production environment.

1. Confirm that your application is working as expected within the production slot.

Once you complete these steps, the migration is complete, and your app runs on the isolated model. Congratulations! Repeat the steps from this guide as necessary for [any other apps that need migration](#identify-function-apps-to-migrate).

## Next step

> 
> [Learn more about running C# Azure Functions in the isolated worker model][isolated-guide]

[isolated-guide]: dotnet-isolated-process-guide.md
[.NET Upgrade Assistant]: https://learn.microsoft.com/dotnet/core/porting/upgrade-assistant-overview
[ASP.NET Core integration]: dotnet-isolated-process-guide.md#aspnet-core-integration

[HttpRequestData]: https://learn.microsoft.com/dotnet/api/microsoft.azure.functions.worker.http.httprequestdata?view=azure-dotnet&preserve-view=true
[HttpResponseData]: https://learn.microsoft.com/dotnet/api/microsoft.azure.functions.worker.http.httpresponsedata?view=azure-dotnet&preserve-view=true
