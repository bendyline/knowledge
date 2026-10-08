---
title: .NET Generic Host in ASP.NET Core
author: tdykstra
description: Use .NET Generic Host in ASP.NET Core apps. Generic Host is responsible for app startup and lifetime management.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 07/29/2026
uid: fundamentals/host/generic-host

# customer intent: As an ASP.NET developer, I want to explore the .NET Generic Host in ASP.NET Core, so I can configure startup and management for my web app.
---
# .NET Generic Host in ASP.NET Core

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


**Applies to: \>= aspnetcore-6.0**

The ASP.NET Core templates create instances of [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) and [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication). These objects provide a streamlined way to configure and run web applications without a `Startup` class. For more information on `WebApplicationBuilder` and `WebApplication`, see [migration/50-to-60#new-hosting-model](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23new-hosting-model).


**Applies to: < aspnetcore-6.0**

The ASP.NET Core templates create a .NET Generic Host ([Microsoft.Extensions.Hosting.HostBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostBuilder)) instance.



This article provides information on using the .NET Generic Host in ASP.NET Core. For information on using the .NET Generic Host in console apps, see [.NET Generic Host](https://learn.microsoft.com/dotnet/core/extensions/generic-host).

## Understand the role of the host

A *host* is an object that encapsulates an application's resources, such as:

* Dependency injection (DI)
* Logging
* Configuration
* `IHostedService` implementations

When a host starts, it calls the [Microsoft.Extensions.Hosting.IHostedService.StartAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService.StartAsync%252A) method on each [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService) instance registered in the service container's collection of hosted services. In a web app, one of the `IHostedService` implementations is a web service that starts an [HTTP server implementation](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23servers).

By including all of the app's interdependent resources in a single object, the host enables control of application startup and graceful shutdown.

## Set up a host

The host is typically configured, built, and run by code in the _Program.cs_ file. 

**Applies to: \>= aspnetcore-6.0**

The following code creates a host with an `IHostedService` implementation added to the DI container:

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Program.cs" id="snippet_Host"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Program.cs.md)

For an HTTP workload, call the [Microsoft.Extensions.Hosting.GenericHostBuilderExtensions.ConfigureWebHostDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.GenericHostBuilderExtensions.ConfigureWebHostDefaults%252A) method after the [Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder%252A) method:

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_HostConfigureWebHostDefaults"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

The `Main` method performs the following tasks:

* Calls a `CreateHostBuilder` method to create and configure a builder object.
* Calls the `Build` and `Run` methods on the builder object.

The ASP.NET Core web templates generate the following code to create a .NET Generic Host instance:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
```

The following code creates a Generic Host by using non-HTTP workload. The `IHostedService` implementation is added to the DI container:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((hostContext, services) =>
            {
               services.AddHostedService<Worker>();
            });
}
```

For an HTTP workload, the ASP.NET Core templates generate the same `Main` method, but the `CreateHostBuilder` method calls the `ConfigureWebHostDefaults` method:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
```

If the app uses Entity Framework Core, don't change the name or signature of the `CreateHostBuilder` method. The [Entity Framework Core tools](https://learn.microsoft.com/ef/core/cli/) expect to find a `CreateHostBuilder` method that configures the host without running the app. For more information, see [Design-time DbContext Creation](https://learn.microsoft.com/ef/core/cli/dbcontext-creation).



## Configure default builder settings

The [Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder%252A) method performs the following tasks:

* Sets the [content root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23content-root) to the path returned by [System.IO.Directory.GetCurrentDirectory%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetCurrentDirectory%252A).

* Loads the host configuration from the following sources:
  * Environment variables prefixed with `DOTNET_`
  * Command-line arguments

* Loads the app configuration in the following order:
  * _appsettings.json_ file
  * _appsettings.{Environment}.json_ file
  * [User secrets](../../security/app-secrets.md) (Loaded when the app runs in the `Development` environment by using the entry assembly.)
  * Environment variables
  * Command-line arguments

* Adds the following [logging](../logging/index.md) providers:
  * Console
  * Debug
  * EventSource
  * EventLog (only when running on Windows)

* Enables [scope validation](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23scope-validation) and [dependency validation](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild) when the environment is `Development`.

The [Microsoft.Extensions.Hosting.GenericHostBuilderExtensions.ConfigureWebHostDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.GenericHostBuilderExtensions.ConfigureWebHostDefaults%252A) method performs the following tasks:

* Loads host configuration from environment variables prefixed with `ASPNETCORE_`.

* Sets [Kestrel](../servers/kestrel.md) server as the web server and configures it by using the app's hosting configuration providers. For the Kestrel server's default options, see [fundamentals/servers/kestrel/options](../servers/kestrel/options.md).

* Adds [host-filtering middleware](../servers/kestrel/host-filtering.md).

* Adds [Forwarded Headers middleware](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fproxy-load-balancer%23forwarded-headers) if the `ASPNETCORE_FORWARDEDHEADERS_ENABLED` property is set to `true`.

* Enables IIS integration. For the IIS default options, see [host-and-deploy/iis/index#iis-options](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23iis-options).

For information on how to override default builder settings, see [Configure settings for all app types](#configure-settings-for-all-app-types) and [Configure settings for web apps](#configure-settings-for-web-apps) later in this article.

## Framework-provided services

The .NET Generic Host automatically registers the following services:

* [IHostApplicationLifetime](#ihostapplicationlifetime)
* [IHostLifetime](#ihostlifetime)
* [IHostEnvironment / IWebHostEnvironment](#ihostenvironment-iwebhostenvironment)

For more information on framework-provided services, see [fundamentals/dependency-injection#framework-provided-services](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23framework-provided-services).

### IHostApplicationLifetime

Inject the [Microsoft.Extensions.Hosting.IHostApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime) (formerly `IApplicationLifetime`) service into any class for handling post-startup and graceful shutdown tasks. Three properties on the interface are cancellation tokens used for registering app start and app stop event handler methods. The interface also includes a `StopApplication` method, which allows apps to request a graceful shutdown.

When performing a graceful shutdown, the host:

* Triggers the [Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopping%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopping%252A) event handlers, which allows the app to run logic before the shutdown process begins.

* Stops the server, which disables new connections. The server waits for requests on existing connections to complete, for as long as the [shutdown timeout](#shutdown-timeout) allows. The server sends the connection close header for further requests on existing connections.

* Triggers the [Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopped%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopped%252A) event handlers, which allows the app to run logic after the application has shutdown.

The following example is an `IHostedService` implementation that registers `IHostApplicationLifetime` event handlers:

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Services/HostApplicationLifetimeEventsHostedService.cs" id="snippet_Class"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Services/HostApplicationLifetimeEventsHostedService.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Services/HostApplicationLifetimeEventsHostedService.cs.md)


**Applies to: < aspnetcore-6.0**

[language="csharp" source="generic-host/samples-snapshot/3.x/LifetimeEventsHostedService.cs" id="snippet_LifetimeEvents"::: (complete source file; reference: generic-host/samples-snapshot/3.x/LifetimeEventsHostedService.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples-snapshot/3.x/LifetimeEventsHostedService.cs.md)



### IHostLifetime

The [Microsoft.Extensions.Hosting.IHostLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostLifetime) implementation controls when the host starts and when it stops. The last implementation registered is used.

`Microsoft.Extensions.Hosting.Internal.ConsoleLifetime` is the default `IHostLifetime` implementation.

The `ConsoleLifetime` method performs the following tasks:

* Listens for <kbd>Ctrl</kbd>+<kbd>C</kbd>/SIGINT (Windows), <kbd>Ctrl</kbd>+<kbd>C</kbd> (macOS), or SIGTERM and calls [Microsoft.Extensions.Hosting.IHostApplicationLifetime.StopApplication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime.StopApplication%252A), which starts the shutdown process.

* Unblocks extensions, such as by running the [RunAsync](#runasync) and [WaitForShutdownAsync](#waitforshutdownasync) methods.

### IHostEnvironment (IWebHostEnvironment)

Inject the [Microsoft.Extensions.Hosting.IHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment) service into a class to get information about the following settings:

* [ApplicationName](#application-name)
* [EnvironmentName](#environment-name)
* [ContentRootPath](#content-root)

Web apps implement the `IWebHostEnvironment` interface, which inherits `IHostEnvironment` and adds the [WebRootPath](#web-root).

## Set up host configuration

Host configuration is used for the properties of the [Microsoft.Extensions.Hosting.IHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment) implementation.

Host configuration is available from the [Microsoft.Extensions.Hosting.HostBuilderContext.Configuration%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostBuilderContext.Configuration%252A) property inside the [Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration%252A) method. After `ConfigureAppConfiguration`, `HostBuilderContext.Configuration` is replaced with the app config.

To add host configuration, call the [Microsoft.Extensions.Hosting.HostBuilder.ConfigureHostConfiguration%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostBuilder.ConfigureHostConfiguration%252A) method on the `IHostBuilder` instance. `ConfigureHostConfiguration` can be called multiple times with additive results. The host uses whichever option sets a value last on a given key.

`CreateDefaultBuilder` includes the environment variable provider with the prefix `DOTNET_` and command-line arguments. For web apps, the environment variable provider with prefix `ASPNETCORE_` is added. The prefix is removed when the environment variables are read. For example, the environment variable value for `ASPNETCORE_ENVIRONMENT` becomes the host configuration value for the `environment` key.

The following example creates host configuration:

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_ConfigureHostConfiguration"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

[language="csharp" source="generic-host/samples-snapshot/3.x/Program.cs" id="snippet_HostConfig"::: (complete source file; reference: generic-host/samples-snapshot/3.x/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples-snapshot/3.x/Program.cs.md)



## Create the app configuration

App configuration is created by calling the [Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration%252A) method on the `IHostBuilder` instance. `ConfigureAppConfiguration` can be called multiple times with additive results. The app uses whichever option sets a value last on a given key. 

The configuration created by `ConfigureAppConfiguration` is available in the [Microsoft.Extensions.Hosting.HostBuilderContext.Configuration%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostBuilderContext.Configuration%252A) property for subsequent operations and as a service from DI. The host configuration is also added to the app configuration.

For more information, see [fundamentals/configuration/index](../configuration/index.md).

## Configure settings for all app types

This section lists host settings that apply to both HTTP and non-HTTP workloads.

By default, environment variables used to configure these settings can have a `DOTNET_` or `ASPNETCORE_` prefix, which appear in the following list of settings as the `{PREFIX_}` placeholder.

For more information, see [Configure default builder settings](#configure-default-builder-settings) and [Configuration: Environment variables](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23environment-variables-configuration-provider).

<!-- In the following sections, two spaces at end of line are used to force line breaks in the rendered page. -->

### Application name

Defines the name of the assembly that contains the entry point for the application.

**Key**: `applicationName`  
**Type**: *string*  
**Default**: The name of the assembly that has the app entry point.  
**Set using**: Environment variable  
**Environment variable**: `{PREFIX_}APPLICATIONNAME`

The [Microsoft.Extensions.Hosting.IHostEnvironment.ApplicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.ApplicationName%252A) property is set from the host configuration during host construction.

### Content root

Determines where the host begins the search for content files.

**Key**: `contentRoot`  
**Type**: *string*  
**Default**: The folder where the app assembly resides.  
**Set using**: Environment variable or `UseContentRoot` on `IHostBuilder`  
**Environment variable**: `{PREFIX_}CONTENTROOT`

The [Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath%252A) property identifies where the host begins searching. If the path doesn't exist, the host fails to start.

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_UseContentRoot"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
Host.CreateDefaultBuilder(args)
    .UseContentRoot("c:\\content-root")
    //...
```



For more information, see:

* [Fundamentals: Content root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23content-root)
* [Web root](#web-root)

### Environment name

Provides a name for the environment.

**Key**: `environment`  
**Type**: *string*  
**Default**: `Production`  
**Set using**: Environment variable or call `UseEnvironment` on `IHostBuilder`  
**Environment variable**: `{PREFIX_}ENVIRONMENT`

The [Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName%252A) property can be set to any value. Framework-defined values include `Development`, `Staging`, and `Production`. Values aren't case-sensitive.

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_UseEnvironment"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
Host.CreateDefaultBuilder(args)
    .UseEnvironment("Development")
    //...
```



### Shutdown timeout

Specifies the amount of time to wait for the host to shut down.

**Key**: `shutdownTimeoutSeconds`  
**Type**: *int*  
**Default**: 30 seconds (In .NET 5.0 and earlier, the default is 5 seconds.)  
**Set using**: Environment variable or `HostOptions`  
**Environment variable**: `{PREFIX_}SHUTDOWNTIMEOUTSECONDS`

The [Microsoft.Extensions.Hosting.HostOptions.ShutdownTimeout%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostOptions.ShutdownTimeout%252A) property sets the timeout for [Microsoft.Extensions.Hosting.IHost.StopAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost.StopAsync%252A). The default value is 30 seconds.

During the timeout period, the host:

* Triggers [Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopping%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopping%252A).
* Attempts to stop hosted services, logging errors for services that fail to stop.

If the timeout period expires before all hosted services stop, any remaining active services stop when the app shuts down. The services stop even if they're still processing. If services require more time to stop, increase the timeout.

**Applies to: \>= aspnetcore-6.0**

The following example sets the timeout to 20 seconds:

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_ShutdownTimeout"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

[language="csharp" source="generic-host/samples-snapshot/3.x/Program.cs" id="snippet_HostOptions"::: (complete source file; reference: generic-host/samples-snapshot/3.x/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples-snapshot/3.x/Program.cs.md)



**Applies to: \>= aspnetcore-5.0**

### Reload config on change

Reloads the  _appsettings.json_ and _appsettings.{Environment}.json_ files when the files change. This behavior is by default, as described in [Default app configuration sources](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23default-app-configuration-sources). 

**Key**: `hostBuilder:reloadConfigOnChange`  
**Type**: *bool* (`true` or `false`)  
**Default**: `true`  
**Set using**: Command-line argument `hostBuilder:reloadConfigOnChange`  
**Environment variable**: `{PREFIX_}hostBuilder:reloadConfigOnChange`

In .NET 5 and later, you can disable the reload behavior by setting the `hostBuilder:reloadConfigOnChange` argument to `false`.

> **Warning:**
> The colon (`:`) separator doesn't work with environment variable hierarchical keys on all platforms. For more information, see [Environment variables](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23environment-variables-configuration-provider).



## Configure settings for web apps

Some host settings apply only to HTTP workloads. By default, environment variables used to configure these settings can have a `DOTNET_` or `ASPNETCORE_` prefix, which appear in the following list of settings as the `{PREFIX_}` placeholder.

Extension methods on `IWebHostBuilder` are available for these settings. Code samples that show how to call the extension methods assume `webBuilder` is an instance of `IWebHostBuilder`, as in the following example:

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_ConfigureWebHostDefaults"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.CaptureStartupErrors(true);
            webBuilder.UseStartup<Startup>();
        });
```



### Capture startup errors

Controls the capture of startup errors.

**Key**: `captureStartupErrors`  
**Type**: *bool* (`true`/`1` or `false`/`0`)  
**Default**: `false`. If the app runs with Kestrel behind IIS, the default is `true`.  
**Set using**: Configuration or `CaptureStartupErrors`  
**Environment variable**: `{PREFIX_}CAPTURESTARTUPERRORS`

When `false`, errors during startup result in the host exiting. When `true`, the host captures exceptions during startup and attempts to start the server.

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderCaptureStartupErrors"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.CaptureStartupErrors(true);
```



### Detailed errors

Determines whether to capture detailed errors.

**Key**: `detailedErrors`  
**Type**: *bool* (`true`/`1` or `false`/`0`)  
**Default**: `false`  
**Set using**: Configuration or `UseSetting`  
**Environment variable**: `{PREFIX_}DETAILEDERRORS`

When enabled, or when the environment is set to `Development`, the app captures detailed errors.

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderDetailedErrors"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.UseSetting(WebHostDefaults.DetailedErrorsKey, "true");
```



### Hosting startup assemblies

Provides a semicolon-delimited string of hosting startup assemblies to load on startup.

**Key**: `hostingStartupAssemblies`  
**Type**: *string*  
**Default**: Empty string  
**Set using**: `UseSetting`  
**Environment variable**: `{PREFIX_}HOSTINGSTARTUPASSEMBLIES`

Although the configuration value defaults to an empty string, the hosting startup assemblies always include the app's assembly. When hosting startup assemblies are provided, they're added to the app's assembly for loading when the app builds its common services during startup.

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderHostingStartupAssemblies"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.UseSetting(WebHostDefaults.HostingStartupAssembliesKey, "assembly1;assembly2");
```



### Hosting startup exclude assemblies

Provides a semicolon-delimited string of hosting startup assemblies to exclude on startup.

**Key**: `hostingStartupExcludeAssemblies`  
**Type**: *string*  
**Default**: Empty string  
**Set using**: Configuration or `UseSetting`  
**Environment variable**: `{PREFIX_}HOSTINGSTARTUPEXCLUDEASSEMBLIES`

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderHostingStartupExcludeAssemblies"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.UseSetting(WebHostDefaults.HostingStartupExcludeAssembliesKey, "assembly1;assembly2");
```



### HTTPS port

Sets the HTTPS port for redirection if you get a non-HTTPS connection.

**Key**: `https_port`  
**Type**: *string*  
**Default**: No default.  
**Set using**: Configuration or `UseSetting`  
**Environment variable**: `{PREFIX_}HTTPS_PORT`

This setting is used in [enforcing HTTPS](../../security/enforcing-ssl.md). This setting doesn't cause the server to listen on the specified port. That is, it's possible to accidentally redirect requests to an unused port.

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderHttpsPort"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.UseSetting("https_port", "8080");
```



**Applies to: \>= aspnetcore-8.0**

### HTTPS ports

Specifies the possible ports to listen on for HTTPS connections.

**Key**: `https_ports`  
**Type**: *string*  
**Default**: No default.  
**Set using**: Configuration or `UseSetting`  
**Environment variable**: `{PREFIX_}HTTPS_PORTS`

```csharp
webBuilder.UseSetting("https_ports", "8080");
```



### Prefer hosting URLs

Indicates whether the host should listen on the URLs configured with the `IWebHostBuilder` instead of URLs configured with the `IServer` implementation.

**Key**: `preferHostingUrls`  
**Type**: *bool* (`true`/`1` or `false`/`0`)  
**Default**: `false`  
**Set using**: Environment variable or `PreferHostingUrls`  
**Environment variable**: `{PREFIX_}PREFERHOSTINGURLS`

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderPreferHostingUrls"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.PreferHostingUrls(true);
```



### Prevent hosting startup

Prevents the automatic loading of hosting startup assemblies, including hosting startup assemblies configured by the app's assembly. For more information, see [fundamentals/configuration/platform-specific-configuration](platform-specific-configuration.md).

**Key**: `preventHostingStartup`  
**Type**: *bool* (`true`/`1` or `false`/`0`)  
**Default**: `false`  
**Set using**: Environment variable or `UseSetting`  
**Environment variable**: `{PREFIX_}PREVENTHOSTINGSTARTUP`

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderPreventHostingStartup"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.UseSetting(WebHostDefaults.PreventHostingStartupKey, "true");
```



### Startup assembly

Specifies the assembly to search for the `Startup` class.

**Key**: `startupAssembly`  
**Type**: *string*  
**Default**: The application assembly.   
**Set using**: Environment variable or `UseStartup`  
**Environment variable**: `{PREFIX_}STARTUPASSEMBLY`

You can reference the assembly by name (`string`) or type (`TStartup`). If multiple `UseStartup` methods are called, the last call takes precedence.

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderUseStartup"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderUseStartupGeneric"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.UseStartup("StartupAssemblyName");
```

```csharp
webBuilder.UseStartup<Startup>();
```



### Suppress status messages

Indicates whether to suppress hosting startup status messages.

**Key**: `suppressStatusMessages`  
**Type**: *bool* (`true`/`1` or `false`/`0`)  
**Default**: `false`  
**Set using**: Configuration or `UseSetting`  
**Environment variable**: `{PREFIX_}SUPPRESSSTATUSMESSAGES`

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderSuppressStatusMessages"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.UseSetting(WebHostDefaults.SuppressStatusMessagesKey, "true");
```



### Server URLs

Indicates the IP addresses or host addresses with ports and protocols that the server should listen on for requests.

**Key**: `urls`  
**Type**: *string*  
**Default**: `http://localhost:5000` and `https://localhost:5001`  
**Set using**: Environment variable or `UseUrls`  
**Environment variable**: `{PREFIX_}URLS`

Set to a semicolon-separated `;` list of URL prefixes to which the server should respond. For example, `http://localhost:123`. Use a wildcard asterisk `*` to indicate that the server should listen for requests on any IP address or hostname by using the specified port and protocol (for example, `http://*:5000`). The protocol (`http://` or `https://`) must be included with each URL. Supported formats vary among servers.

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderUseUrls"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.UseUrls("http://*:5000;http://localhost:5001;https://hostname:5002");
```



Kestrel has its own endpoint configuration API. For more information, see [fundamentals/servers/kestrel/endpoints](../servers/kestrel/endpoints.md).

### Web root

Sets the relative path to the app's static assets.

**Key**: `webroot`  
**Type**: *string*  
**Default**: `wwwroot`   
**Set using**: Environment variable or `UseWebRoot` on `IWebHostBuilder`  
**Environment variable**: `{PREFIX_}WEBROOT`

The [Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath) property determines the relative path to the app's static assets.  

The path to `{content root}/wwwroot` must exist. If the path doesn't exist, a no-op file provider is used.

**Applies to: \>= aspnetcore-6.0**

[language="csharp" source="generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs" id="snippet_WebHostBuilderUseWebRoot"::: (complete source file; reference: generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs)](../../../_code/aspnetcore/fundamentals/host/generic-host/samples/6.x/GenericHostSample/Snippets/Program.cs.md)


**Applies to: < aspnetcore-6.0**

```csharp
webBuilder.UseWebRoot("public");
```



For more information, see:

* [Fundamentals: Web root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23web-root)
* [Content root](#content-root)

## Manage the host lifetime

To start and stop the application, call methods on the [Microsoft.Extensions.Hosting.IHost](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost) implementation. The methods affect all [Microsoft.Extensions.Hosting.IHostedService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostedService) implementations registered in the service container.

The difference between the `Run*` and `Start*` methods is that `Run*` methods wait for the host to complete before returning, whereas `Start*` methods return immediately. The `Run*` methods are typically used in console apps, whereas the `Start*` methods are typically used in long-running services.

### Run

The [Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Run%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Run%252A) method runs the app and blocks the calling thread until the host is shut down. 

### RunAsync

The [Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.RunAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.RunAsync%252A) method runs the app and returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object that completes when the cancellation token or shutdown is triggered.

### RunConsoleAsync

The [Microsoft.Extensions.Hosting.HostingHostBuilderExtensions.RunConsoleAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostingHostBuilderExtensions.RunConsoleAsync%252A) method enables console support, builds and starts the host, and waits for <kbd>Ctrl</kbd>+<kbd>C</kbd>/SIGINT (Windows), <kbd>Ctrl</kbd>+<kbd>C</kbd> (macOS), or SIGTERM to shut down.

### Start

The [Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Start%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Start%252A) method launches the host synchronously.

### StartAsync

The [Microsoft.Extensions.Hosting.IHost.StartAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost.StartAsync%252A) method starts the host and returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object that completes when the cancellation token or shutdown is triggered. 

The [Microsoft.Extensions.Hosting.IHostLifetime.WaitForStartAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostLifetime.WaitForStartAsync%252A) method is called at the start of `StartAsync`, which waits until it's complete before continuing. This method can be used to delay startup until signaled by an external event.

### StopAsync

The [Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.StopAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.StopAsync%252A) method attempts to stop the host within the provided timeout.

### WaitForShutdown

The [Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.WaitForShutdown%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.WaitForShutdown%252A) method blocks the calling thread until the IHostLifetime implementation triggers shutdown via <kbd>Ctrl</kbd>+<kbd>C</kbd>/SIGINT (Windows), <kbd>Ctrl</kbd>+<kbd>C</kbd> (macOS), or SIGTERM.

### WaitForShutdownAsync

The [Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.WaitForShutdownAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.WaitForShutdownAsync%252A) method returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object that completes when shutdown is triggered via the given token, and then it calls the [Microsoft.Extensions.Hosting.IHost.StopAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost.StopAsync%252A) method.

**Applies to: < aspnetcore-6.0**

### Control host lifetime

You can exercise direct control of the host lifetime by calling the following methods externally:

```csharp
public class Program
{
    private IHost _host;

    public Program()
    {
        _host = new HostBuilder()
            .Build();
    }

    public async Task StartAsync()
    {
        _host.StartAsync();
    }

    public async Task StopAsync()
    {
        using (_host)
        {
            await _host.StopAsync(TimeSpan.FromSeconds(5));
        }
    }
}
```



## Related content

* [fundamentals/host/hosted-services](hosted-services.md)
* [Generic Host source on GitHub](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.Hosting/src/Host.cs)

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).
