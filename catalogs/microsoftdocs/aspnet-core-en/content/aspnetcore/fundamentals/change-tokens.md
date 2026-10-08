---
title: Detect changes with change tokens in ASP.NET Core
author: tdykstra
description: Learn how to use change tokens to track changes.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 10/07/2019
uid: fundamentals/change-tokens
---
# Detect changes with change tokens in ASP.NET Core

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


**Applies to: \>= aspnetcore-3.0**

A *change token* is a general-purpose, low-level building block used to track state changes.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/change-tokens/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## IChangeToken interface

[Microsoft.Extensions.Primitives.IChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken) propagates notifications that a change has occurred. `IChangeToken` resides in the [Microsoft.Extensions.Primitives](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives) namespace. The [Microsoft.Extensions.Primitives](https://www.nuget.org/packages/Microsoft.Extensions.Primitives/) NuGet package is implicitly provided to the ASP.NET Core apps.

`IChangeToken` has two properties:

* [Microsoft.Extensions.Primitives.IChangeToken.ActiveChangeCallbacks](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken.ActiveChangeCallbacks) indicate if the token proactively raises callbacks. If `ActiveChangedCallbacks` is set to `false`, a callback is never called, and the app must poll `HasChanged` for changes. It's also possible for a token to never be cancelled if no changes occur or the underlying change listener is disposed or disabled.
* [Microsoft.Extensions.Primitives.IChangeToken.HasChanged](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken.HasChanged) receives a value that indicates if a change has occurred.

The `IChangeToken` interface includes the [RegisterChangeCallback(Action\<Object>, Object)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken.RegisterChangeCallback*) method, which registers a callback that's invoked when the token has changed. `HasChanged` must be set before the callback is invoked.

## ChangeToken class

[Microsoft.Extensions.Primitives.ChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.ChangeToken) is a static class used to propagate notifications that a change has occurred. `ChangeToken` resides in the [Microsoft.Extensions.Primitives](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives) namespace. The [Microsoft.Extensions.Primitives](https://www.nuget.org/packages/Microsoft.Extensions.Primitives/) NuGet package is implicitly provided to the ASP.NET Core apps.

The [ChangeToken.OnChange(Func\<IChangeToken>, Action)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.ChangeToken.OnChange*) method registers an `Action` to call whenever the token changes:

* `Func<IChangeToken>` produces the token.
* `Action` is called when the token changes.

The [ChangeToken.OnChange\<TState>(Func\<IChangeToken>, Action\<TState>, TState)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.ChangeToken.OnChange*) overload takes an additional `TState` parameter that's passed into the token consumer `Action`.

`OnChange` returns an [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable). Calling [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) stops the token from listening for further changes and releases the token's resources.

## Example uses of change tokens in ASP.NET Core

Change tokens are used in prominent areas of ASP.NET Core to monitor for changes to objects:

* For monitoring changes to files, [Microsoft.Extensions.FileProviders.IFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider)'s [Microsoft.Extensions.FileProviders.IFileProvider.Watch*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider.Watch*) method creates an `IChangeToken` for the specified files or folder to watch.
* `IChangeToken` tokens can be added to cache entries to trigger cache evictions on change.
* For `TOptions` changes, the default [Microsoft.Extensions.Options.OptionsMonitor`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.OptionsMonitor%601) implementation of [Microsoft.Extensions.Options.IOptionsMonitor`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsMonitor%601) has an overload that accepts one or more [Microsoft.Extensions.Options.IOptionsChangeTokenSource`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsChangeTokenSource%601) instances. Each instance returns an `IChangeToken` to register a change notification callback for tracking options changes.

## Monitor for configuration changes

By default, ASP.NET Core templates use [JSON configuration files](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23json-configuration-provider) (`appsettings.json`, `appsettings.Development.json`, and `appsettings.Production.json`) to load app configuration settings.

These files are configured using the [AddJsonFile(IConfigurationBuilder, String, Boolean, Boolean)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.JsonConfigurationExtensions.AddJsonFile*) extension method on [Microsoft.Extensions.Configuration.ConfigurationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBuilder) that accepts a `reloadOnChange` parameter. `reloadOnChange` indicates if configuration should be reloaded on file changes. This setting appears in the [Microsoft.Extensions.Hosting.Host](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host) convenience method [Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*):

```csharp
config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
      .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, 
          reloadOnChange: true);
```

File-based configuration is represented by [Microsoft.Extensions.Configuration.FileConfigurationSource](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.FileConfigurationSource). `FileConfigurationSource` uses [Microsoft.Extensions.FileProviders.IFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider) to monitor files.

By default, the `IFileMonitor` is provided by a [Microsoft.Extensions.FileProviders.PhysicalFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.PhysicalFileProvider), which uses [System.IO.FileSystemWatcher](https://learn.microsoft.com/search/?terms=System.IO.FileSystemWatcher) to monitor for configuration file changes.

The sample app demonstrates two implementations for monitoring configuration changes. If any of the `appsettings` files change, both of the file monitoring implementations execute custom code&mdash;the sample app writes a message to the console.

A configuration file's `FileSystemWatcher` can trigger multiple token callbacks for a single configuration file change. To ensure that the custom code is only run once when multiple token callbacks are triggered, the sample's implementation checks file hashes. The sample uses SHA1 file hashing. A retry is implemented with an exponential back-off.

`Utilities/Utilities.cs`:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Utilities/Utilities.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Utilities/Utilities.cs.md)

### Simple startup change token

Register a token consumer `Action` callback for change notifications to the configuration reload token.

In `Startup.Configure`:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Startup.cs?name=snippet2)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Startup.cs.md)

`config.GetReloadToken()` provides the token. The callback is the `InvokeChanged` method:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Startup.cs?name=snippet3)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Startup.cs.md)

The `state` of the callback is used to pass in the `IWebHostEnvironment`, which is useful for specifying the correct `appsettings` configuration file to monitor (for example, `appsettings.Development.json` when in the `Development` environment). File hashes are used to prevent the `WriteConsole` statement from running multiple times due to multiple token callbacks when the configuration file has only changed once.

This system runs as long as the app is running and can't be disabled by the user.

### Monitor configuration changes as a service

The sample implements:

* Basic startup token monitoring.
* Monitoring as a service.
* A mechanism to enable and disable monitoring.

The sample establishes an `IConfigurationMonitor` interface.

`Extensions/ConfigurationMonitor.cs`:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Extensions/ConfigurationMonitor.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Extensions/ConfigurationMonitor.cs.md)

The constructor of the implemented class, `ConfigurationMonitor`, registers a callback for change notifications:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Extensions/ConfigurationMonitor.cs?name=snippet2)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Extensions/ConfigurationMonitor.cs.md)

`config.GetReloadToken()` supplies the token. `InvokeChanged` is the callback method. The `state` in this instance is a reference to the `IConfigurationMonitor` instance that's used to access the monitoring state. Two properties are used:

* `MonitoringEnabled`: Indicates if the callback should run its custom code.
* `CurrentState`: Describes the current monitoring state for use in the UI.

The `InvokeChanged` method is similar to the earlier approach, except that it:

* Doesn't run its code unless `MonitoringEnabled` is `true`.
* Outputs the current `state` in its `WriteConsole` output.

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Extensions/ConfigurationMonitor.cs?name=snippet3)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Extensions/ConfigurationMonitor.cs.md)

An instance `ConfigurationMonitor` is registered as a service in `Startup.ConfigureServices`:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Startup.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Startup.cs.md)

The Index page offers the user control over configuration monitoring. The instance of `IConfigurationMonitor` is injected into the `IndexModel`.

`Pages/Index.cshtml.cs`:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Pages/Index.cshtml.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Pages/Index.cshtml.cs.md)

The configuration monitor (`_monitor`) is used to enable or disable monitoring and set the current state for UI feedback:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Pages/Index.cshtml.cs?name=snippet2)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Pages/Index.cshtml.cs.md)

When `OnPostStartMonitoring` is triggered, monitoring is enabled, and the current state is cleared. When `OnPostStopMonitoring` is triggered, monitoring is disabled, and the state is set to reflect that monitoring isn't occurring.

Buttons in the UI enable and disable monitoring.

`Pages/Index.cshtml`:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Pages/Index.cshtml?name=snippet_Buttons)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Pages/Index.cshtml.md)

## Monitor cached file changes

File content can be cached in-memory using [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache). In-memory caching is described in the [Cache in-memory](../performance/caching/memory.md) topic. Without taking additional steps, such as the implementation described below, *stale* (outdated) data is returned from a cache if the source data changes.

For example, not taking into account the status of a cached source file when renewing a [sliding expiration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions.SlidingExpiration) period leads to stale cached file data. Each request for the data renews the sliding expiration period, but the file is never reloaded into the cache. Any app features that use the file's cached content are subject to possibly receiving stale content.

Using change tokens in a file caching scenario prevents the presence of stale file content in the cache. The sample app demonstrates an implementation of the approach.

The sample uses `GetFileContent` to:

* Return file content.
* Implement a retry algorithm with exponential back-off to cover cases where a file access problem temporarily delays reading the file's content.

`Utilities/Utilities.cs`:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Utilities/Utilities.cs?name=snippet2)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Utilities/Utilities.cs.md)

A `FileService` is created to handle cached file lookups. The `GetFileContent` method call of the service attempts to obtain file content from the in-memory cache and return it to the caller (`Services/FileService.cs`).

If cached content isn't found using the cache key, the following actions are taken:

1. The file content is obtained using `GetFileContent`.
1. A change token is obtained from the file provider with [IFileProviders.Watch](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider.Watch*). The token's callback is triggered when the file is modified.
1. The file content is cached with a [sliding expiration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions.SlidingExpiration) period. The change token is attached with [MemoryCacheEntryExtensions.AddExpirationToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.AddExpirationToken*) to evict the cache entry if the file changes while it's cached.

In the following example, files are stored in the app's [content root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23content-root). `IWebHostEnvironment.ContentRootFileProvider` is used to obtain an [Microsoft.Extensions.FileProviders.IFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider) pointing at the app's `IWebHostEnvironment.ContentRootPath`. The `filePath` is obtained with [IFileInfo.PhysicalPath](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileInfo.PhysicalPath).

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Services/FileService.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Services/FileService.cs.md)

The `FileService` is registered in the service container along with the memory caching service.

In `Startup.ConfigureServices`:

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Startup.cs?name=snippet4)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Startup.cs.md)

The page model loads the file's content using the service.

In the Index page's `OnGet` method (`Pages/Index.cshtml.cs`):

[Code example (complete source file; reference: change-tokens/samples/3.x/SampleApp/Pages/Index.cshtml.cs?name=snippet3)](../../_code/aspnetcore/fundamentals/change-tokens/samples/3.x/SampleApp/Pages/Index.cshtml.cs.md)

## CompositeChangeToken class

For representing one or more `IChangeToken` instances in a single object, use the [Microsoft.Extensions.Primitives.CompositeChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.CompositeChangeToken) class.

```csharp
var firstCancellationTokenSource = new CancellationTokenSource();
var secondCancellationTokenSource = new CancellationTokenSource();

var firstCancellationToken = firstCancellationTokenSource.Token;
var secondCancellationToken = secondCancellationTokenSource.Token;

var firstCancellationChangeToken = new CancellationChangeToken(firstCancellationToken);
var secondCancellationChangeToken = new CancellationChangeToken(secondCancellationToken);

var compositeChangeToken = 
    new CompositeChangeToken(
        new List<IChangeToken> 
        {
            firstCancellationChangeToken, 
            secondCancellationChangeToken
        });
```

`HasChanged` on the composite token reports `true` if any represented token `HasChanged` is `true`. `ActiveChangeCallbacks` on the composite token reports `true` if any represented token `ActiveChangeCallbacks` is `true`. If multiple concurrent change events occur, the composite change callback is invoked one time.



**Applies to: < aspnetcore-3.0**

A *change token* is a general-purpose, low-level building block used to track state changes.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/change-tokens/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## IChangeToken interface

[Microsoft.Extensions.Primitives.IChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken) propagates notifications that a change has occurred. `IChangeToken` resides in the [Microsoft.Extensions.Primitives](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives) namespace. For apps that don't use the [Microsoft.AspNetCore.App metapackage](metapackage-app.md), create a package reference for the [Microsoft.Extensions.Primitives](https://www.nuget.org/packages/Microsoft.Extensions.Primitives/) NuGet package.

`IChangeToken` has two properties:

* [Microsoft.Extensions.Primitives.IChangeToken.ActiveChangeCallbacks](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken.ActiveChangeCallbacks) indicate if the token proactively raises callbacks. If `ActiveChangedCallbacks` is set to `false`, a callback is never called, and the app must poll `HasChanged` for changes. It's also possible for a token to never be cancelled if no changes occur or the underlying change listener is disposed or disabled.
* [Microsoft.Extensions.Primitives.IChangeToken.HasChanged](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken.HasChanged) receives a value that indicates if a change has occurred.

The `IChangeToken` interface includes the [RegisterChangeCallback(Action\<Object>, Object)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken.RegisterChangeCallback*) method, which registers a callback that's invoked when the token has changed. `HasChanged` must be set before the callback is invoked.

## ChangeToken class

[Microsoft.Extensions.Primitives.ChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.ChangeToken) is a static class used to propagate notifications that a change has occurred. `ChangeToken` resides in the [Microsoft.Extensions.Primitives](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives) namespace. For apps that don't use the [Microsoft.AspNetCore.App metapackage](metapackage-app.md), create a package reference for the [Microsoft.Extensions.Primitives](https://www.nuget.org/packages/Microsoft.Extensions.Primitives/) NuGet package.

The [ChangeToken.OnChange(Func\<IChangeToken>, Action)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.ChangeToken.OnChange*) method registers an `Action` to call whenever the token changes:

* `Func<IChangeToken>` produces the token.
* `Action` is called when the token changes.

The [ChangeToken.OnChange\<TState>(Func\<IChangeToken>, Action\<TState>, TState)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.ChangeToken.OnChange*) overload takes an additional `TState` parameter that's passed into the token consumer `Action`.

`OnChange` returns an [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable). Calling [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) stops the token from listening for further changes and releases the token's resources.

## Example uses of change tokens in ASP.NET Core

Change tokens are used in prominent areas of ASP.NET Core to monitor for changes to objects:

* For monitoring changes to files, [Microsoft.Extensions.FileProviders.IFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider)'s [Microsoft.Extensions.FileProviders.IFileProvider.Watch*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider.Watch*) method creates an `IChangeToken` for the specified files or folder to watch.
* `IChangeToken` tokens can be added to cache entries to trigger cache evictions on change.
* For `TOptions` changes, the default [Microsoft.Extensions.Options.OptionsMonitor`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.OptionsMonitor%601) implementation of [Microsoft.Extensions.Options.IOptionsMonitor`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsMonitor%601) has an overload that accepts one or more [Microsoft.Extensions.Options.IOptionsChangeTokenSource`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Options.IOptionsChangeTokenSource%601) instances. Each instance returns an `IChangeToken` to register a change notification callback for tracking options changes.

## Monitor for configuration changes

By default, ASP.NET Core templates use [JSON configuration files](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23json-configuration-provider) (`appsettings.json`, `appsettings.Development.json`, and `appsettings.Production.json`) to load app configuration settings.

These files are configured using the [AddJsonFile(IConfigurationBuilder, String, Boolean, Boolean)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.JsonConfigurationExtensions.AddJsonFile*) extension method on [Microsoft.Extensions.Configuration.ConfigurationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationBuilder) that accepts a `reloadOnChange` parameter. `reloadOnChange` indicates if configuration should be reloaded on file changes. This setting appears in the [Microsoft.AspNetCore.WebHost](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebHost) convenience method [Microsoft.AspNetCore.WebHost.CreateDefaultBuilder*](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebHost.CreateDefaultBuilder*):

```csharp
config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
      .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, 
          reloadOnChange: true);
```

File-based configuration is represented by [Microsoft.Extensions.Configuration.FileConfigurationSource](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.FileConfigurationSource). `FileConfigurationSource` uses [Microsoft.Extensions.FileProviders.IFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider) to monitor files.

By default, the `IFileMonitor` is provided by a [Microsoft.Extensions.FileProviders.PhysicalFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.PhysicalFileProvider), which uses [System.IO.FileSystemWatcher](https://learn.microsoft.com/search/?terms=System.IO.FileSystemWatcher) to monitor for configuration file changes.

The sample app demonstrates two implementations for monitoring configuration changes. If any of the `appsettings` files change, both of the file monitoring implementations execute custom code&mdash;the sample app writes a message to the console.

A configuration file's `FileSystemWatcher` can trigger multiple token callbacks for a single configuration file change. To ensure that the custom code is only run once when multiple token callbacks are triggered, the sample's implementation checks file hashes. The sample uses SHA1 file hashing. A retry is implemented with an exponential back-off.

`Utilities/Utilities.cs`:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Utilities/Utilities.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Utilities/Utilities.cs.md)

### Simple startup change token

Register a token consumer `Action` callback for change notifications to the configuration reload token.

In `Startup.Configure`:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Startup.cs?name=snippet2)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Startup.cs.md)

`config.GetReloadToken()` provides the token. The callback is the `InvokeChanged` method:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Startup.cs?name=snippet3)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Startup.cs.md)

The `state` of the callback is used to pass in the `IHostingEnvironment`, which is useful for specifying the correct `appsettings` configuration file to monitor (for example, `appsettings.Development.json` when in the `Development` environment). File hashes are used to prevent the `WriteConsole` statement from running multiple times due to multiple token callbacks when the configuration file has only changed once.

This system runs as long as the app is running and can't be disabled by the user.

### Monitor configuration changes as a service

The sample implements:

* Basic startup token monitoring.
* Monitoring as a service.
* A mechanism to enable and disable monitoring.

The sample establishes an `IConfigurationMonitor` interface.

`Extensions/ConfigurationMonitor.cs`:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Extensions/ConfigurationMonitor.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Extensions/ConfigurationMonitor.cs.md)

The constructor of the implemented class, `ConfigurationMonitor`, registers a callback for change notifications:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Extensions/ConfigurationMonitor.cs?name=snippet2)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Extensions/ConfigurationMonitor.cs.md)

`config.GetReloadToken()` supplies the token. `InvokeChanged` is the callback method. The `state` in this instance is a reference to the `IConfigurationMonitor` instance that's used to access the monitoring state. Two properties are used:

* `MonitoringEnabled`: Indicates if the callback should run its custom code.
* `CurrentState`: Describes the current monitoring state for use in the UI.

The `InvokeChanged` method is similar to the earlier approach, except that it:

* Doesn't run its code unless `MonitoringEnabled` is `true`.
* Outputs the current `state` in its `WriteConsole` output.

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Extensions/ConfigurationMonitor.cs?name=snippet3)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Extensions/ConfigurationMonitor.cs.md)

An instance `ConfigurationMonitor` is registered as a service in `Startup.ConfigureServices`:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Startup.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Startup.cs.md)

The Index page offers the user control over configuration monitoring. The instance of `IConfigurationMonitor` is injected into the `IndexModel`.

`Pages/Index.cshtml.cs`:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Pages/Index.cshtml.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Pages/Index.cshtml.cs.md)

The configuration monitor (`_monitor`) is used to enable or disable monitoring and set the current state for UI feedback:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Pages/Index.cshtml.cs?name=snippet2)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Pages/Index.cshtml.cs.md)

When `OnPostStartMonitoring` is triggered, monitoring is enabled, and the current state is cleared. When `OnPostStopMonitoring` is triggered, monitoring is disabled, and the state is set to reflect that monitoring isn't occurring.

Buttons in the UI enable and disable monitoring.

`Pages/Index.cshtml`:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Pages/Index.cshtml?name=snippet_Buttons)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Pages/Index.cshtml.md)

## Monitor cached file changes

File content can be cached in-memory using [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache). In-memory caching is described in the [Cache in-memory](../performance/caching/memory.md) topic. Without taking additional steps, such as the implementation described below, *stale* (outdated) data is returned from a cache if the source data changes.

For example, not taking into account the status of a cached source file when renewing a [sliding expiration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions.SlidingExpiration) period leads to stale cached file data. Each request for the data renews the sliding expiration period, but the file is never reloaded into the cache. Any app features that use the file's cached content are subject to possibly receiving stale content.

Using change tokens in a file caching scenario prevents the presence of stale file content in the cache. The sample app demonstrates an implementation of the approach.

The sample uses `GetFileContent` to:

* Return file content.
* Implement a retry algorithm with exponential back-off to cover cases where a file access problem temporarily delays reading the file's content.

`Utilities/Utilities.cs`:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Utilities/Utilities.cs?name=snippet2)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Utilities/Utilities.cs.md)

A `FileService` is created to handle cached file lookups. The `GetFileContent` method call of the service attempts to obtain file content from the in-memory cache and return it to the caller (`Services/FileService.cs`).

If cached content isn't found using the cache key, the following actions are taken:

1. The file content is obtained using `GetFileContent`.
1. A change token is obtained from the file provider with [IFileProviders.Watch](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider.Watch*). The token's callback is triggered when the file is modified.
1. The file content is cached with a [sliding expiration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions.SlidingExpiration) period. The change token is attached with [MemoryCacheEntryExtensions.AddExpirationToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.AddExpirationToken*) to evict the cache entry if the file changes while it's cached.

In the following example, files are stored in the app's [content root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23content-root). [IHostingEnvironment.ContentRootFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IHostingEnvironment.ContentRootFileProvider) is used to obtain an [Microsoft.Extensions.FileProviders.IFileProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileProvider) pointing at the app's [Microsoft.AspNetCore.Hosting.IHostingEnvironment.ContentRootPath](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IHostingEnvironment.ContentRootPath). The `filePath` is obtained with [IFileInfo.PhysicalPath](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileProviders.IFileInfo.PhysicalPath).

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Services/FileService.cs?name=snippet1)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Services/FileService.cs.md)

The `FileService` is registered in the service container along with the memory caching service.

In `Startup.ConfigureServices`:

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Startup.cs?name=snippet4)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Startup.cs.md)

The page model loads the file's content using the service.

In the Index page's `OnGet` method (`Pages/Index.cshtml.cs`):

[Code example (complete source file; reference: change-tokens/samples/2.x/SampleApp/Pages/Index.cshtml.cs?name=snippet3)](../../_code/aspnetcore/fundamentals/change-tokens/samples/2.x/SampleApp/Pages/Index.cshtml.cs.md)

## CompositeChangeToken class

For representing one or more `IChangeToken` instances in a single object, use the [Microsoft.Extensions.Primitives.CompositeChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.CompositeChangeToken) class.

```csharp
var firstCancellationTokenSource = new CancellationTokenSource();
var secondCancellationTokenSource = new CancellationTokenSource();

var firstCancellationToken = firstCancellationTokenSource.Token;
var secondCancellationToken = secondCancellationTokenSource.Token;

var firstCancellationChangeToken = new CancellationChangeToken(firstCancellationToken);
var secondCancellationChangeToken = new CancellationChangeToken(secondCancellationToken);

var compositeChangeToken = 
    new CompositeChangeToken(
        new List<IChangeToken> 
        {
            firstCancellationChangeToken, 
            secondCancellationChangeToken
        });
```

`HasChanged` on the composite token reports `true` if any represented token `HasChanged` is `true`. `ActiveChangeCallbacks` on the composite token reports `true` if any represented token `ActiveChangeCallbacks` is `true`. If multiple concurrent change events occur, the composite change callback is invoked one time.



## Additional resources

* [performance/caching/memory](../performance/caching/memory.md)
* [performance/caching/distributed](../performance/caching/distributed.md)
* [performance/caching/response](../performance/caching/response.md)
* [performance/caching/middleware](../performance/caching/middleware.md)
* [mvc/views/tag-helpers/builtin-th/cache-tag-helper](../mvc/views/tag-helpers/built-in/cache-tag-helper.md)
* [mvc/views/tag-helpers/builtin-th/distributed-cache-tag-helper](../mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md)
