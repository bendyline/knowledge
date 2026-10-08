---
title: Logging providers
description: Learn how the logging provider API is used in .NET applications.
ms.date: 10/22/2025
ai-usage: ai-assisted
---

# Logging providers in .NET

Logging providers persist logs, except for the `Console` provider, which only displays logs as standard output. For example, the Azure Application Insights provider stores logs in Azure Application Insights. Multiple providers can be enabled.

The default .NET Worker app templates:

- Use the [Generic Host](../generic-host.md).
- Call [Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder*), which adds the following logging providers:
  - [Console](#console)
  - [Debug](#debug)
  - [EventSource](#event-source)
  - [EventLog](#windows-eventlog) (Windows only)

[language="csharp" source="../snippets/configuration/console/Program.cs" highlight="17"::: (complete source file; reference: ../snippets/configuration/console/Program.cs)](../../../../_code/docs/core/extensions/snippets/configuration/console/Program.cs.md)

The preceding code shows the `Program` class created with the .NET Worker app templates. The next several sections provide samples based on the .NET Worker app templates, which use the Generic Host.

To override the default set of logging providers added by `Host.CreateApplicationBuilder`, call `ClearProviders` and add the logging providers you want. For example, the following code:

- Calls [Microsoft.Extensions.Logging.LoggingBuilderExtensions.ClearProviders*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggingBuilderExtensions.ClearProviders*) to remove all the [Microsoft.Extensions.Logging.ILoggerProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerProvider) instances from the builder.
- Adds the [Console](#console) logging provider.

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
```

For other providers, see:

- [Built-in logging providers](#built-in-logging-providers).
- [Third-party logging providers](#third-party-logging-providers).

## Configure a service that depends on ILogger

To configure a service that depends on `ILogger<T>`, use constructor injection or provide a factory method. The factory method approach is recommended only if there's no other option. For example, consider a service that needs an `ILogger<T>` instance provided by DI:

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddSingleton<IExampleService>(
    container => new DefaultExampleService
    {
        Logger = container.GetRequiredService<ILogger<IExampleService>>()
    });
```

The preceding code is a [Func\<IServiceProvider, IExampleService>](https://learn.microsoft.com/dotnet/api/system.func-2) that runs the first time the DI container needs to construct an instance of `IExampleService`. You can access any of the registered services in this way.

## Built-in logging providers

Microsoft Extensions include the following logging providers as part of the runtime libraries:

- [Console](#console)
- [Debug](#debug)
- [EventSource](#event-source)
- [EventLog](#windows-eventlog)

The following logging providers are shipped by Microsoft, but not as part of the runtime libraries. They must be installed from NuGet packages.

- [AzureAppServicesFile and AzureAppServicesBlob](#azure-app-service)
- [ApplicationInsights](#azure-application-insights)

### Console

The `Console` provider logs output to the console.

### Debug

The `Debug` provider writes log output by using the [System.Diagnostics.Debug](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug) class, specifically through the [System.Diagnostics.Debug.WriteLine*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.WriteLine*) method and only when the debugger is attached. The [Microsoft.Extensions.Logging.Debug.DebugLoggerProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.Debug.DebugLoggerProvider) creates instances of a logger class that implements the `ILogger` interface.

### Event Source

The `EventSource` provider writes to a cross-platform event source with the name `Microsoft-Extensions-Logging`. On Windows, the provider uses [ETW](https://learn.microsoft.com/windows/win32/etw/event-tracing-portal).

#### dotnet trace tooling

The [dotnet-trace](../../diagnostics/dotnet-trace.md) tool is a cross-platform CLI global tool that enables the collection of .NET Core traces of a running process. The tool collects [Microsoft.Extensions.Logging.EventSource](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.EventSource) provider data using a [Microsoft.Extensions.Logging.EventSource.LoggingEventSource](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.EventSource.LoggingEventSource).

See [dotnet-trace](../../diagnostics/dotnet-trace.md) for installation instructions. For a diagnostic tutorial using `dotnet-trace`, see [Debug high CPU usage in .NET Core](../../diagnostics/debug-highcpu.md).

### Windows EventLog

The `EventLog` provider sends log output to the Windows Event Log. Unlike the other providers, the `EventLog` provider does ***not*** inherit the default non-provider settings. If `EventLog` log settings aren't specified, they default to `LogLevel.Warning`.

To log events lower than [Microsoft.Extensions.Logging.LogLevel.Warning](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Warning), explicitly set the log level. The following example sets the Event Log default log level to [Microsoft.Extensions.Logging.LogLevel.Information](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LogLevel.Information):

```json
{
  "Logging": {
    "EventLog": {
      "LogLevel": {
        "Default": "Information"
      }
    }
  }
}
```

[AddEventLog overloads](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.EventLoggerFactoryExtensions) can pass in [Microsoft.Extensions.Logging.EventLog.EventLogSettings](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.EventLog.EventLogSettings). If `null` or not specified, the following default settings are used:

- `LogName`: "Application"
- `SourceName`: ".NET Runtime"
- `MachineName`: The local machine name is used.

The following code changes the `SourceName` from the default value of `".NET Runtime"` to `CustomLogs`:

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Logging.AddEventLog(
    config => config.SourceName = "CustomLogs");

using IHost host = builder.Build();

host.Run();
```

### Azure App Service

The [Microsoft.Extensions.Logging.AzureAppServices](https://www.nuget.org/packages/Microsoft.Extensions.Logging.AzureAppServices) provider package writes logs to text files in an Azure App Service app's file system and to [blob storage](https://learn.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-dotnet#what-is-blob-storage) in an Azure Storage account.

The provider package isn't included in the runtime libraries. To use the provider, add the provider package to the project.

To configure provider settings, use [Microsoft.Extensions.Logging.AzureAppServices.AzureFileLoggerOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.AzureAppServices.AzureFileLoggerOptions) and [Microsoft.Extensions.Logging.AzureAppServices.AzureBlobLoggerOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.AzureAppServices.AzureBlobLoggerOptions), as shown in the following example:

```csharp
using Microsoft.Extensions.Logging.AzureAppServices;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args)

builder.Logging.AddAzureWebAppDiagnostics();
builder.Services.Configure<AzureFileLoggerOptions>(options =>
{
    options.FileName = "azure-diagnostics-";
    options.FileSizeLimit = 50 * 1024;
    options.RetainedFileCountLimit = 5;
});
builder.Services.Configure<AzureBlobLoggerOptions>(options =>
{
    options.BlobName = "log.txt";
});

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```

When deployed to Azure App Service, the app uses the settings in the [App Service logs](https://learn.microsoft.com/azure/app-service/web-sites-enable-diagnostic-log/#enable-application-logging-windows) section of the **App Service** page of the Azure portal. When the following settings are updated, the changes take effect immediately without requiring a restart or redeployment of the app.

The default location for log files is in the *D:\\home\\LogFiles\\Application* folder. Other defaults vary by provider:

- **Application Logging (Filesystem)**: The default filesystem file name is *diagnostics-yyyymmdd.txt*. The default file size limit is 10 MB, and the default maximum number of files retained is 2.
- **Application Logging (Blob)**: The default blob name is *{app-name}/yyyy/mm/dd/hh/{guid}_applicationLog.txt*.

This provider only logs when the project runs in the Azure environment.

#### Azure log streaming

Azure log streaming supports viewing log activity in real-time from:

- The app server
- The web server
- Failed request tracing

To configure Azure log streaming:

- Navigate to the **App Service logs** page from the app's portal page.
- Set **Application Logging (Filesystem)** to **On**.
- Choose the log **Level**. This setting only applies to Azure log streaming.

Navigate to the **Log Stream** page to view logs. The logged messages are logged with the `ILogger` interface.

### Azure Application Insights

The [Microsoft.Extensions.Logging.ApplicationInsights](https://www.nuget.org/packages/Microsoft.Extensions.Logging.ApplicationInsights) provider package writes logs to [Azure Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/cloudservices). Application Insights is a service that monitors a web app and provides tools for querying and analyzing the telemetry data. If you use this provider, you can query and analyze your logs by using the Application Insights tools.

For more information, see the following resources:

- [Application Insights overview](https://learn.microsoft.com/azure/application-insights/app-insights-overview)
- [ApplicationInsightsLoggerProvider for .NET Core ILogger logs](https://learn.microsoft.com/azure/azure-monitor/app/ilogger) - Start here if you want to implement the logging provider without the rest of Application Insights telemetry.
- [Application Insights logging adapters](https://learn.microsoft.com/azure/azure-monitor/app/asp-net-trace-logs).
- [Learn how to use the tools offered in Application Insights to enhance the performance and stability of your applications](https://learn.microsoft.com/training/modules/monitor-app-performance/).

## Logging provider design considerations

If you plan to develop your own implementation of the [Microsoft.Extensions.Logging.ILoggerProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerProvider) interface and corresponding custom implementation of [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger), consider the following points:

- The [Microsoft.Extensions.Logging.ILogger.Log*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger.Log*) method is synchronous.
- The lifetime of log state and objects shouldn't be assumed.

An implementation of `ILoggerProvider` creates an `ILogger` via its [Microsoft.Extensions.Logging.ILoggerProvider.CreateLogger*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILoggerProvider.CreateLogger*) method. If your implementation strives to queue logging messages in a non-blocking manner, the messages should first be materialized or the object state that's used to materialize a log entry should be serialized. Doing so avoids potential exceptions from disposed objects.

For more information, see [Implement a custom logging provider in .NET](custom-provider.md).

## Third-party logging providers

Here are some third-party logging frameworks that work with various .NET workloads:

- [elmah.io](https://elmah.io) ([GitHub repo](https://github.com/elmahio/Elmah.Io.Extensions.Logging))
- [EFLogger](https://github.com/msmolka/ZNetCS.AspNetCore.Logging.EntityFrameworkCore/blob/master/README.md) ([GitHub repo](https://github.com/msmolka/ZNetCS.AspNetCore.Logging.EntityFrameworkCore))
- [Gelf](https://go2docs.graylog.org/5-0/getting_in_log_data/ingest_gelf.html) ([GitHub repo](https://github.com/mattwcole/gelf-extensions-logging))
- [JSNLog](http://jsnlog.com) ([GitHub repo](https://github.com/mperdeck/jsnlog))
- [KissLog.net](https://kisslog.net) ([GitHub repo](https://github.com/catalingavan/KissLog-net))
- [Log4Net](https://logging.apache.org/log4net) ([GitHub repo](https://github.com/apache/logging-log4net))
- [NLog](https://nlog-project.org) ([GitHub repo](https://github.com/NLog/NLog.Extensions.Logging))
- [NReco.Logging](https://github.com/nreco/logging/blob/master/README.md) ([GitHub repo](https://github.com/nreco/logging))
- [Sentry](https://sentry.io/welcome) ([GitHub repo](https://github.com/getsentry/sentry-dotnet))
- [Serilog](https://serilog.net) ([GitHub repo](https://github.com/serilog/serilog-sinks-console))
- [Stackdriver](https://cloud.google.com/dotnet/docs/stackdriver#logging) ([GitHub repo](https://github.com/googleapis/google-cloud-dotnet))

Some third-party frameworks can perform [semantic logging, also known as structured logging](https://softwareengineering.stackexchange.com/questions/312197/benefits-of-structured-logging-vs-basic-logging).

Using a third-party framework is similar to using one of the built-in providers:

1. Add a NuGet package to your project.
1. Call an `ILoggerFactory` or `ILoggingBuilder` extension method provided by the logging framework.

For more information, see each provider's documentation. Third-party logging providers aren't supported by Microsoft.

## See also

- [Logging in .NET](overview.md).
- [Implement a custom logging provider in .NET](custom-provider.md).
- [High-performance logging in .NET](high-performance-logging.md).
