---
title: What's new in ASP.NET Core in .NET 10
ai-usage: ai-assisted
author: wadepickett
description: Learn about the new features in ASP.NET Core in .NET 10.
ms.author: wpickett
ms.date: 04/22/2026
uid: aspnetcore-10
---
# What's new in ASP.NET Core in .NET 10

This article highlights the most significant changes in ASP.NET Core in .NET 10 with links to relevant documentation.

## Blazor

This section describes new features for Blazor.

### New and updated Blazor Web App security samples

We've added and updated the Blazor Web App security samples linked in the following articles:

* [blazor/security/blazor-web-app-oidc](../blazor/security/blazor-web-app-with-oidc.md)
* [blazor/security/blazor-web-app-entra](../blazor/security/blazor-web-app-with-entra.md)
* [blazor/security/blazor-web-app-windows-authentication](../blazor/security/blazor-web-app-with-windows-authentication.md)

All of our OIDC and Entra sample solutions now include a separate web API project (`MinimalApiJwt`) to demonstrate how to configure and call an external web API securely. Calling web APIs is demonstrated with a token handler and named HTTP client for an OIDC identity provider or Microsoft Identity Web packages/API for Microsoft Entra ID.

The sample solutions are configured in C# code in their `Program` files. To configure the solutions from app settings files (for example, `appsettings.json`) see the ***new*** *Supply configuration with the JSON configuration provider (app settings)* section of the OIDC or Entra articles.

Our Entra article and sample apps also include new guidance on the following approaches:

* How to use an encrypted distributed token cache for web farm hosting scenarios.
* How to use [Azure Key Vault](https://azure.microsoft.com/products/key-vault/) with [Azure Managed Identities](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview) for data protection.

### QuickGrid `RowClass` parameter

Apply a stylesheet class to a row of the grid based on the row item using the new `RowClass` parameter. In the following example, the `GetRowCssClass` method is called on each row to conditionally apply a stylesheet class based on the row item:

```razor
<QuickGrid ... RowClass="GetRowCssClass">
    ...
</QuickGrid>

@code {
    private string GetRowCssClass(MyGridItem item) =>
        item.IsArchived ? "row-archived" : null;
}
```

For more information, see [blazor/components/quickgrid](../blazor/components/quickgrid.md).

### Blazor script as static web asset

In prior releases of .NET, the Blazor script is served from an embedded resource in the ASP.NET Core shared framework. In .NET 10 or later, the Blazor script is served as a static web asset with automatic compression and fingerprinting.

The Blazor script (`blazor.web.js` or `blazor.server.js`) is included by the framework if the project contains at least one Razor component file (`.razor`). If your app requires the Blazor script but doesn't contain at least one component, add the following MSBuild property to the app's project file to force unconditional script inclusion:

```xml
<RequiresAspNetWebAssets>true</RequiresAspNetWebAssets>
```

For more information, see the following resources:
  
* [blazor/project-structure](../blazor/project-structure.md)
* [blazor/fundamentals/static-files](../blazor/fundamentals/static-files.md)

### Route template highlights

The [`[Route]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RouteAttribute) now supports route syntax highlighting to help visualize the structure of the route template:

Route template pattern of a route attribute for the counter value shows syntax highlighting

### `NavigateTo` no longer scrolls to the top for same-page navigations

Previously, [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) scrolled to the top of the page for same-page navigations. This behavior has been changed in .NET 10 so that the browser no longer scrolls to the top of the page when navigating to the same page. This means the viewport is no longer reset when making updates to the address for the current page, such as changing the query string or fragment.

### Reconnection UI component added to the Blazor Web App project template

The Blazor Web App project template now includes a `ReconnectModal` component, including collocated stylesheet and JavaScript files, for improved developer control over the reconnection UI when the client loses the WebSocket connection to the server. The component doesn't insert styles programmatically, ensuring compliance with stricter Content Security Policy (CSP) settings for the `style-src` policy. In prior releases, the default reconnection UI was created by the framework in a way that could cause CSP violations. Note that the default reconnection UI is still used as fallback when the app doesn't define the reconnection UI, such as by using the project template's `ReconnectModal` component or a similar custom component.

New reconnection UI features:

* Apart from indicating the reconnection state by setting a specific CSS class on the reconnection UI element, the new `components-reconnect-state-changed` event is dispatched for reconnection state changes.
* Code can better differentiate the stages of the reconnection process with the new reconnection state "`retrying`," indicated by both the CSS class and the new event.

For more information, see [blazor/fundamentals/signalr](../blazor/fundamentals/signalr.md).

### Ignore the query string and fragment when using `NavLinkMatch.All`

The `NavLink` component now ignores the query string and fragment when using the `NavLinkMatch.All` value for the `Match` parameter. This means that the link retains the `active` class if the URL path matches but the query string or fragment change. To revert to the original behavior, use the `Microsoft.AspNetCore.Components.Routing.NavLink.EnableMatchAllForQueryStringAndFragment` [`AppContext` switch](https://learn.microsoft.com/dotnet/fundamentals/runtime-libraries/system-appcontext) set to `true`.

You can also override the `ShouldMatch` method on `NavLink` to customize the matching behavior:

```csharp
public class CustomNavLink : NavLink
{
    protected override bool ShouldMatch(string currentUriAbsolute)
    {
        // Custom matching logic
    }
}
```

For more information, see [blazor/fundamentals/navigation](../blazor/fundamentals/navigation.md).

### Close `QuickGrid` column options

You can now close the `QuickGrid` column options UI using the new `HideColumnOptionsAsync` method.

The following example uses the `HideColumnOptionsAsync` method to close the column options UI as soon as the title filter is applied:

```razor
<QuickGrid @ref="movieGrid" Items="movies">
    <PropertyColumn Property="@(m => m.Title)" Title="Title">
        <ColumnOptions>
            <input type="search" @bind="titleFilter" placeholder="Filter by title" 
                @bind:after="@(() => movieGrid.HideColumnOptionsAsync())" />
        </ColumnOptions>
    </PropertyColumn>
    <PropertyColumn Property="@(m => m.Genre)" Title="Genre" />
    <PropertyColumn Property="@(m => m.ReleaseYear)" Title="Release Year" />
</QuickGrid>

@code {
    private QuickGrid<Movie>? movieGrid;
    private string titleFilter = string.Empty;
    private IQueryable<Movie> movies = new List<Movie> { ... }.AsQueryable();
    private IQueryable<Movie> filteredMovies => 
        movies.Where(m => m.Title!.Contains(titleFilter));
}
```

### HttpClient response streaming enabled by default

In prior Blazor releases, response streaming for [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) requests was opt-in. Now, response streaming is enabled by default.

This is a breaking change because calling [System.Net.Http.HttpContent.ReadAsStreamAsync%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpContent.ReadAsStreamAsync%252A) for an [System.Net.Http.HttpResponseMessage.Content%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpResponseMessage.Content%252A) (`response.Content.ReadAsStreamAsync()`) returns a `BrowserHttpReadStream` and no longer a [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream). `BrowserHttpReadStream` doesn't support synchronous operations, such as `Stream.Read(Span<Byte>)`. If your code uses synchronous operations, you can opt-out of response streaming or copy the [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) into a [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream) yourself.

To opt-out of response streaming globally, use either of the following approaches:

* Add the `<WasmEnableStreamingResponse>` property to the project file with a value of `false`:
  
  ```xml
  <WasmEnableStreamingResponse>false</WasmEnableStreamingResponse>
  ```

* Set the `DOTNET_WASM_ENABLE_STREAMING_RESPONSE` environment variable to `false` or `0`.

To opt-out of response streaming for an individual request, set [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled%252A) to `false` on the [System.Net.Http.HttpRequestMessage](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage) (`requestMessage` in the following example):

```csharp
requestMessage.SetBrowserResponseStreamingEnabled(false);
```

For more information, see [`HttpClient` and `HttpRequestMessage` with Fetch API request options (*Call web API* article)](../blazor/call-web-api.md).

### Client-side fingerprinting

The release of .NET 9 introduced [server-side fingerprinting](https://en.wikipedia.org/wiki/Fingerprint_(computing)) of static assets in Blazor Web Apps with the introduction of [Map Static Assets routing endpoint conventions (`MapStaticAssets`)](../fundamentals/static-files.md), the [`ImportMap` component](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstatic-files%23importmap-component), and the [Microsoft.AspNetCore.Components.ComponentBase.Assets](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.Assets) property (`@Assets["..."]`) to resolve fingerprinted JavaScript (JS) modules. For .NET 10, you can opt-into client-side fingerprinting of JS modules for standalone Blazor WebAssembly apps.

In standalone Blazor WebAssembly apps during build and publish, the framework overrides placeholders in `index.html` with values computed during build to fingerprint static assets. A fingerprint is placed into the `blazor.webassembly.js` script file name.

The following markup must be present in the `wwwroot/index.html` file to adopt the fingerprinting feature:

```diff
<head>
    ...
+   <script type="importmap"></script>
</head>

<body>
    ...
-   <script src="_framework/blazor.webassembly.js"></script>
+   <script src="_framework/blazor.webassembly#[.{fingerprint}].js"></script>
</body>

</html>
```

In the project file (`.csproj`), add the `<OverrideHtmlAssetPlaceholders>` property set to `true`:

```diff
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
+   <OverrideHtmlAssetPlaceholders>true</OverrideHtmlAssetPlaceholders>
  </PropertyGroup>
</Project>
```

In the following example, all developer-supplied JS files are modules with a `.js` file extension.

A module named `scripts.js` in the app's `wwwroot/js` folder is fingerprinted by adding `#[.{fingerprint}]` before the file extension (`.js`):

```html
<script type="module" src="js/scripts#[.{fingerprint}].js"></script>
```

Specify the fingerprint expression with the `<StaticWebAssetFingerprintPattern>` property in the app's project file (`.csproj`):

```xml
<ItemGroup>
  <StaticWebAssetFingerprintPattern Include="JSModule" Pattern="*.js" 
    Expression="#[.{fingerprint}]!" />
</ItemGroup>
```

Any JS file (`*.js`) in `index.html` with the fingerprint marker is fingerprinted by the framework, including when the app is published.

If you adopt the `.mjs` file extension for JS modules, set the file extension with the `Pattern` parameter:

```xml
<ItemGroup>
  <StaticWebAssetFingerprintPattern Include="JSModule" Pattern="*.mjs" 
    Expression="#[.{fingerprint}]!" />
</ItemGroup>
```

Files are placed into the import map:

* Automatically for Blazor Web App client-side rendering (CSR).
* When opting-into module fingerprinting in standalone Blazor WebAssembly apps per the preceding instructions.

When resolving the import for JavaScript interop, the import map is used by the browser resolve fingerprinted files.

### Preloaded Blazor framework static assets

In Blazor Web Apps, framework static assets are automatically preloaded using [`Link` headers](https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Link), which allows the browser to preload resources before the initial page is fetched and rendered.

In standalone Blazor WebAssembly apps, framework assets are scheduled for high priority downloading and caching early in browser `index.html` page processing when:

* The `OverrideHtmlAssetPlaceholders` MSBuild property in the app's project file (`.csproj`) is set to `true`:

  ```xml
  <PropertyGroup>
    <OverrideHtmlAssetPlaceholders>true</OverrideHtmlAssetPlaceholders>
  </PropertyGroup>
  ```

* The following `<link>` element containing [`rel="preload"`](https://developer.mozilla.org/docs/Web/HTML/Reference/Attributes/rel/preload) is present in the `<head>` content of `wwwroot/index.html`:

  ```html
  <link rel="preload" id="webassembly" />
  ```

For more information, see [blazor/fundamentals/static-files](../blazor/fundamentals/static-files.md).

**Applies to: \>= aspnetcore-11.0**

> **Note:**
> This feature is disabled for Blazor Web App enhanced navigation in .NET 11 or later. For more information, see [Blazor enhanced navigation no longer preloads resources](https://learn.microsoft.com/aspnet/core/breaking-changes/11/blazor-enhanced-nav-preloading-disabled).



### Set the environment in standalone Blazor WebAssembly apps

The `Blazor-Environment` header and `Properties/launchSettings.json` file (`ASPNETCORE_ENVIRONMENT` environment variable) are no longer used to control the environment in standalone Blazor WebAssembly apps.

Starting in .NET 10, set the environment with the `<WasmApplicationEnvironmentName>` property in the app's project file (`.csproj`).

The following example sets the app's environment to `Staging`:

```xml
<WasmApplicationEnvironmentName>Staging</WasmApplicationEnvironmentName>
```

The default environments are:

* `Development` for build.
* `Production` for publish.

For more information, see [blazor/fundamentals/environments#set-the-environment](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fenvironments%23set-the-environment).

### Boot configuration file inlined

Blazor's boot configuration, which prior to the release of .NET 10 existed in a file named `blazor.boot.json`, has been inlined into the `dotnet.js` script. This only affects developers who are interacting directly with the `blazor.boot.json` file, such as when developers are:

* Checking file integrity for published assets with the troubleshoot integrity PowerShell script per the guidance in [blazor/host-and-deploy/webassembly/bundle-caching-and-integrity-check-failures](../blazor/host-and-deploy/webassembly/bundle-caching-and-integrity-check-failures.md).
* Changing the file name extension of DLL files when not using the default Webcil file format per the guidance in [blazor/host-and-deploy/webassembly/index](../blazor/host-and-deploy/webassembly/index.md).

Currently, there's no documented replacement strategy for the preceding approaches. If you require either of the preceding strategies, open a new documentation issue describing your scenario using the **Open a documentation issue** link at the bottom of either article.

### Declarative model for persisting state from components and services

You can now declaratively specify state to persist from components and services using the `[PersistentState]` attribute. Public (`public`) properties with this attribute are automatically persisted using the [Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState) service during prerendering. The state is retrieved when the component renders interactively or the service is instantiated.

In previous Blazor releases, persisting component state during prerendering using the [Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState) service involved a significant amount of code, as the following example demonstrates:

```razor
@page "/movies"
@implements IDisposable
@inject IMovieService MovieService
@inject PersistentComponentState ApplicationState

@if (MoviesList == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <QuickGrid Items="MoviesList.AsQueryable()">
        ...
    </QuickGrid>
}

@code {
    public List<Movie>? MoviesList { get; set; }
    private PersistingComponentStateSubscription? persistingSubscription;

    protected override async Task OnInitializedAsync()
    {
        if (!ApplicationState.TryTakeFromJson<List<Movie>>(nameof(MoviesList), 
            out var movies))
        {
            MoviesList = await MovieService.GetMoviesAsync();
        }
        else
        {
            MoviesList = movies;
        }

        persistingSubscription = ApplicationState.RegisterOnPersisting(() =>
        {
            ApplicationState.PersistAsJson(nameof(MoviesList), MoviesList);
            return Task.CompletedTask;
        });
    }

    public void Dispose() => persistingSubscription?.Dispose();
}
```

This code can now be simplified using the new declarative model:

```razor
@page "/movies"
@inject IMovieService MovieService

@if (MoviesList == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <QuickGrid Items="MoviesList.AsQueryable()">
        ...
    </QuickGrid>
}

@code {
    [PersistentState]
    public List<Movie>? MoviesList { get; set; }

    protected override async Task OnInitializedAsync()
    {
        MoviesList ??= await MovieService.GetMoviesAsync();
    }
}
```

Use `public` properties because reflection is used by the framework for tasks such as [trimming unused code](https://learn.microsoft.com/search/?terms=blazor%2Fperformance%2Fapp-download-size%23intermediate-language-il-trimming) and [source generation](https://learn.microsoft.com/dotnet/csharp/roslyn-sdk/source-generators-overview).

State can be serialized for multiple components of the same type, and you can establish declarative state in a service for use around the app by calling `RegisterPersistentService` on the Razor components builder ([Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A)) with a custom service type and render mode. For more information, see [blazor/state-management/prerendered-state-persistence](../blazor/state-management/prerendered-state-persistence.md).

### New JavaScript interop features

Blazor adds support for the following JS interop features:

* Create an instance of a JS object using a constructor function and get the [Microsoft.JSInterop.IJSObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSObjectReference)/[Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference) .NET handle for referencing the instance.
* Read or modify the value of a JS object property, both data and accessor properties.

The following asynchronous methods are available on [Microsoft.JSInterop.IJSRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime) and [Microsoft.JSInterop.IJSObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSObjectReference) with the same scoping behavior as the existing [Microsoft.JSInterop.IJSRuntime.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSRuntime.InvokeAsync%252A) method:

* `InvokeConstructorAsync(string identifier, object?[]? args)`: Invokes the specified JS constructor function asynchronously. The function is invoked with the `new` operator. In the following example, `jsInterop.TestClass` is a class with a constructor function, and `classRef` is an [Microsoft.JSInterop.IJSObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSObjectReference):

  ```csharp
  var classRef = await JSRuntime.InvokeConstructorAsync("jsInterop.TestClass", "Blazor!");
  var text = await classRef.GetValueAsync<string>("text");
  var textLength = await classRef.InvokeAsync<int>("getTextLength");
  ```

* `GetValueAsync<TValue>(string identifier)`: Reads the value of the specified JS property asynchronously. The property can't be a `set`-only property. A [Microsoft.JSInterop.JSException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSException) is thrown if the property doesn't exist. The following example returns a value from a data property:

  ```csharp
  var valueFromDataPropertyAsync = await JSRuntime.GetValueAsync<int>(
    "jsInterop.testObject.num");
  ```

* `SetValueAsync<TValue>(string identifier, TValue value)`: Updates the value of the specified JS property asynchronously. The property can't be a `get`-only property. If the property isn't defined on the target object, the property is created. A [Microsoft.JSInterop.JSException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSException) is thrown if the property exists but isn't writable or when a new property can't be added to the object. In the following example, `num` is created on `testObject` with a value of 30 if it doesn't exist:

  ```csharp
  await JSRuntime.SetValueAsync("jsInterop.testObject.num", 30);
  ```

Overloads are available for each of the preceding methods that take a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) argument or [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) timeout argument.

The following synchronous methods are available on [Microsoft.JSInterop.IJSInProcessRuntime](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessRuntime) and [Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference) with the same scoping behavior as the existing [Microsoft.JSInterop.IJSInProcessObjectReference.Invoke%2A](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference.Invoke%252A) method:

* `InvokeConstructor(string identifier, object?[]? args)`: Invokes the specified JS constructor function synchronously. The function is invoked with the `new` operator. In the following example, `jsInterop.TestClass` is a class with a constructor function, and `classRef` is an [Microsoft.JSInterop.IJSInProcessObjectReference](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.IJSInProcessObjectReference):

  ```csharp
  var inProcRuntime = ((IJSInProcessRuntime)JSRuntime);
  var classRef = inProcRuntime.InvokeConstructor("jsInterop.TestClass", "Blazor!");
  var text = classRef.GetValue<string>("text");
  var textLength = classRef.Invoke<int>("getTextLength");
  ```

* `GetValue<TValue>(string identifier)`: Reads the value of the specified JS property synchronously. The property can't be a `set`-only property. A [Microsoft.JSInterop.JSException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSException) is thrown if the property doesn't exist. The following example returns a value from a data property:

  ```csharp
  var inProcRuntime = ((IJSInProcessRuntime)JSRuntime);
  var valueFromDataProperty = inProcRuntime.GetValue<int>(
    "jsInterop.testObject.num");
  ```

* `SetValue<TValue>(string identifier, TValue value)`: Updates the value of the specified JS property synchronously. The property can't be a `get`-only property. If the property isn't defined on the target object, the property is created. A [Microsoft.JSInterop.JSException](https://learn.microsoft.com/search/?terms=Microsoft.JSInterop.JSException) is thrown if the property exists but isn't writable or when a new property can't be added to the object. In the following example, `num` is created on `testObject` with a value of 20 if it doesn't exist:

  ```csharp
  var inProcRuntime = ((IJSInProcessRuntime)JSRuntime);
  inProcRuntime.SetValue("jsInterop.testObject.num", 20);
  ```

For more information, see the following sections of the *Call JavaScript functions from .NET methods* article:

* [Create an instance of a JS object using a constructor function](../blazor/javascript-interoperability/call-javascript-from-dotnet.md)
* [Read or modify the value of a JS object property](../blazor/javascript-interoperability/call-javascript-from-dotnet.md)

### Blazor WebAssembly performance profiling and diagnostic counters

New performance profiling and diagnostic counters are available for Blazor WebAssembly apps. For more information, see the following articles:

* [blazor/performance/webassembly-browser-developer-tools](../blazor/performance/webassembly-browser-developer-tools-diagnostics.md)
* [blazor/performance/webassembly-event-pipe](../blazor/performance/webassembly-event-pipe-diagnostics.md)

### Opt-in to avoiding a `NavigationException` during static server-side rendering with `NavigationManager.NavigateTo`

Calling [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) during static server-side rendering (static SSR) throws a [Microsoft.AspNetCore.Components.NavigationException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationException), interrupting execution before being converted to a redirection response. This can cause confusion during debugging and is inconsistent with interactive rendering behavior, where code after [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) continues to execute normally.

In .NET 10, you can set the `<BlazorDisableThrowNavigationException>` MSBuild property to `true` in the app's project file in order to avoid throwing the exception during static SSR:

```xml
<PropertyGroup>
  <BlazorDisableThrowNavigationException>true</BlazorDisableThrowNavigationException>
</PropertyGroup>
```

With the MSBuild property set, calling [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) during static SSR no longer throws a [Microsoft.AspNetCore.Components.NavigationException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationException). Instead, it behaves consistently with interactive rendering by performing the navigation without throwing an exception. Code after [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) executes before the redirection occurs.

The .NET 10 Blazor Web App project template sets the MSBuild property to `true` by default. We recommend that apps updating to .NET 10 use the new MSBuild property and avoid the prior behavior.

If the MSBuild property is used, code that relied on [Microsoft.AspNetCore.Components.NavigationException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationException) being thrown should be updated. In the default Blazor Identity UI of the Blazor Web App project template before the release of .NET 10, the `IdentityRedirectManager` throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) after calling `RedirectTo` to ensure that the method wasn't invoked during interactive rendering. This exception and the [`[DoesNotReturn]` attributes](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.DoesNotReturnAttribute) should now be removed when the MSBuild property is used. For more information, see [migration/90-to-100#when-navigation-errors-are-disabled-in-a-blazor-web-app-with-individual-accounts](https://learn.microsoft.com/search/?terms=migration%2F90-to-100%23when-navigation-errors-are-disabled-in-a-blazor-web-app-with-individual-accounts).

### Blazor router has a `NotFoundPage` parameter

Blazor now provides an improved way to display a "Not Found" page when navigating to a non-existent page. You can specify a page to render when [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) (described in the next section) is invoked by passing a page type to the `Router` component using the `NotFoundPage` parameter. The feature supports routing, works across status code pages re-execution middleware, and is compatible even with non-Blazor scenarios.

The [`NotFound` render fragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.Router.NotFound%252A) (`<NotFound>...</NotFound>`) isn't supported in .NET 10 or later.

```razor
<Router AppAssembly="@typeof(Program).Assembly" NotFoundPage="typeof(Pages.NotFound)">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
    <NotFound>This content is ignored because NotFoundPage is defined.</NotFound>
</Router>
```

The Blazor project template now includes a `NotFound.razor` page by default. This page automatically renders whenever [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) is called in your app, making it easier to handle missing routes with a consistent user experience.

For more information, see [blazor/fundamentals/navigation](../blazor/fundamentals/navigation.md).

### Not Found responses using `NavigationManager` for static SSR and global interactive rendering

The [Microsoft.AspNetCore.Components.NavigationManager](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager) now includes a [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) method to handle scenarios where a requested resource isn't found during static server-side rendering (static SSR) or global interactive rendering:

* **Static server-side rendering (static SSR)**: Calling [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) sets the HTTP status code to 404.

* **Interactive rendering**: Signals the Blazor router ([`Router` component](../blazor/fundamentals/routing.md)) to render Not Found content.

* **Streaming rendering**: If [enhanced navigation](../blazor/fundamentals/routing.md) is active, [streaming rendering](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frendering%23streaming-rendering) renders Not Found content without reloading the page. When enhanced navigation is blocked, the framework redirects to Not Found content with a page refresh.

Streaming rendering can only render components that have a route, such as a [`NotFoundPage` assignment](#blazor-router-has-a-notfoundpage-parameter) (`NotFoundPage="..."`) or a [status code pages re-execution middleware page assignment](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling%23usestatuscodepageswithreexecute) ([Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%252A)). `DefaultNotFound` 404 content ("`Not found`" plain text) doesn't have a route, so it can't be used during streaming rendering.

[Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) content rendering uses the following, regardless if the response has started or not (in order):

* If [Microsoft.AspNetCore.Components.Routing.NotFoundEventArgs.Path%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.NotFoundEventArgs.Path%252A) is set, render the contents of the assigned page.
* If `Router.NotFoundPage` is set, render the assigned page.
* A status code pages re-execution middleware page, if configured.
* No action if none of the preceding approaches are adopted.

[Status code pages re-execution middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling%23usestatuscodepageswithreexecute) with [Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%252A) takes precedence for browser-based address routing problems, such as an incorrect URL typed into the browser's address bar or selecting a link that has no endpoint in the app.

You can use the [Microsoft.AspNetCore.Components.NavigationManager.OnNotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.OnNotFound%252A) event for notifications when [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) is invoked.

For more information and examples, see [blazor/fundamentals/navigation](../blazor/fundamentals/navigation.md).

### Support for Not Found responses in apps without Blazor's router

Apps that implement a custom router can use [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A). There are two ways to inform the renderer what page should be rendered when [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) is called.

The recommended approach that works regardless of the response state is to call [Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%252A). When [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) is called, the middleware renders the path passed to the method:

```csharp
app.UseStatusCodePagesWithReExecute(
    "/not-found", createScopeForStatusCodePages: true);
```

If you don't want to use [Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute%252A), the app can still support [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) for responses that have already started. Subscribe to `OnNotFoundEvent` in the router and assign the Not Found page path to `NotFoundEventArgs.Path` to inform the renderer what content to render when [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) is called.

`CustomRouter.razor`:

```razor
@using Microsoft.AspNetCore.Components
@using Microsoft.AspNetCore.Components.Routing
@using Microsoft.AspNetCore.Http
@implements IDisposable
@inject NavigationManager NavigationManager

@code {
    protected override void OnInitialized() =>
        NavigationManager.OnNotFound += OnNotFoundEvent;

    [CascadingParameter]
    public HttpContext? HttpContext { get; set; }

    private void OnNotFoundEvent(object sender, NotFoundEventArgs e)
    {
        // Only execute the logic if HTTP response has started
        // because setting NotFoundEventArgs.Path blocks re-execution
        if (HttpContext?.Response.HasStarted == false)
        {
            return;
        }

        e.Path = GetNotFoundRoutePath();
    }

    // Return the path of the Not Found page that you want to display
    private string GetNotFoundRoutePath()
    {
        ...
    }

    public void Dispose() => NavigationManager.OnNotFound -= OnNotFoundEvent;
}
```

If you use both approaches in your app, the Not Found path specified in the `OnNotFoundEvent` handler takes precedence over the path configured in the re-execution middleware.

### Metrics and tracing

This release introduces comprehensive metrics and tracing capabilities for Blazor apps, providing detailed observability of the component lifecycle, navigation, event handling, and circuit management.

For more information, see [blazor/performance/index](../blazor/performance/index.md).

### JavaScript bundler support

Blazor's build output isn't compatible with JavaScript bundlers, such as [Gulp](https://gulpjs.com), [Webpack](https://webpack.js.org), and [Rollup](https://rollupjs.org/). Blazor can now produce bundler-friendly output during publish by setting the `WasmBundlerFriendlyBootConfig` MSBuild property to `true`.

For more information, see [blazor/host-and-deploy/index](../blazor/host-and-deploy/index.md).

### Blazor WebAssembly static asset preloading in Blazor Web Apps

We replaced `<link>` headers with a `ResourcePreloader` component (`<ResourcePreloader />`) for preloading WebAssembly assets in Blazor Web Apps. This permits the app base path configuration (`<base href="..." />`) to correctly identify the app's root.

Removing the component disables the feature if the app is using a [`loadBootResource` callback](../blazor/fundamentals/startup.md) to modify URLs.

The Blazor Web App template adopts the feature by default in .NET 10, and apps upgrading to .NET 10 can implement the feature by placing the `ResourcePreloader` component after the base URL tag (`<base>`) in the `App` component's head content (`App.razor`):

```diff
<head>
    ...
    <base href="/" />
+   <ResourcePreloader />
    ...
</head>
```

For more information, see [blazor/host-and-deploy/server/index](../blazor/host-and-deploy/server/index.md).

### Improved form validation

Blazor now has improved form validation capabilities, including support for validating properties of nested objects and collection items.

To create a validated form, use a [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component inside an [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component, just as before.

To opt into the new validation feature:

1. Call the `AddValidation` extension method in the `Program` file where services are registered.
2. Declare the form model types in a C# class file, not in a Razor component (`.razor`).
3. Annotate the root form model type with the `[ValidatableType]` attribute.

Without following the preceding steps, the validation behavior remains the same as in previous .NET releases.

The following example demonstrates customer orders with the improved form validation (details omitted for brevity):

In `Program.cs`, call `AddValidation` on the service collection to enable the new validation behavior:

```csharp
builder.Services.AddValidation();
```

In the following `Order` class, the `[ValidatableType]` attribute is required on the top-level model type. The other types are discovered automatically. `OrderItem` and `ShippingAddress` aren't shown for brevity, but nested and collection validation works the same way in those types if they were shown.

`Order.cs`:

```csharp
[ValidatableType]
public class Order
{
    public Customer Customer { get; set; } = new();
    public List<OrderItem> OrderItems { get; set; } = [];
}

public class Customer
{
    [Required(ErrorMessage = "Name is required.")]
    public string? FullName { get; set; }

    [Required(ErrorMessage = "Email is required.")]
    public string? Email { get; set; }

    public ShippingAddress ShippingAddress { get; set; } = new();
}
```

In the following `OrderPage` component, the [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component is present in the [Microsoft.AspNetCore.Components.Forms.EditForm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm) component.

`OrderPage.razor`:

```razor
<EditForm Model="Model">
    <DataAnnotationsValidator />

    <h3>Customer Details</h3>
    <div class="mb-3">
        <label>
            Full Name
            <InputText @bind-Value="Model!.Customer.FullName" />
        </label>
        <ValidationMessage For="@(() => Model!.Customer.FullName)" />
    </div>

    @* ... form continues ... *@
</EditForm>

@code {
    public Order? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();

    // ... code continues ...
}
```

The requirement to declare the model types outside of Razor components (`.razor` files) is due to the fact that both the new validation feature and the Razor compiler itself are using a source generator. Currently, output of one source generator can't be used as an input for another source generator.

Validation support now includes:

* Validation of nested complex objects and collections is now supported.
  * This includes validation rules defined by property attributes, class attributes, and the [System.ComponentModel.DataAnnotations.IValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject) implementation.
  * The `[SkipValidation]` attribute can exclude properties or types from validation.
* Validation now uses a source generator-based implementation instead of reflection-based implementation for improved performance and compatibility with ahead-of-time (AOT) compilation.

The [Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator) component now has the same validation order and short-circuiting behavior as [System.ComponentModel.DataAnnotations.Validator](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.Validator). The following rules are applied when validating an instance of type `T`:

1. Member properties of `T` are validated, including recursively validating nested objects.
1. Type-level attributes of `T` are validated.
1. The [System.ComponentModel.DataAnnotations.IValidatableObject.Validate%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject.Validate%252A) method is executed, if `T` implements it.

If one of the preceding steps produces a validation error, the remaining steps are skipped.

### Use validation models from a different assembly

You can validate forms with models defined in a different assembly, such as a library or the `.Client` project of a Blazor Web App, by creating a method in the library or `.Client` project that receives an [Microsoft.Extensions.DependencyInjection.IServiceCollection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IServiceCollection) instance as an argument and calls `AddValidation` on it.
* In the app, call both the method and `AddValidation`.

For more information, see [fundamentals/validation](../fundamentals/validation.md).

### Custom Blazor cache and `BlazorCacheBootResources` MSBuild property removed

Now that all Blazor client-side files are fingerprinted and cached by the browser, Blazor's custom caching mechanism and the `BlazorCacheBootResources` MSBuild property have been removed from the framework. If the client-side project's project file contains the MSBuild property, remove the property, as it no longer has any effect:

```diff
- <BlazorCacheBootResources>...</BlazorCacheBootResources>
```

For more information, see [blazor/host-and-deploy/webassembly/bundle-caching-and-integrity-check-failures](../blazor/host-and-deploy/webassembly/bundle-caching-and-integrity-check-failures.md).

### Web Authentication API (passkey) support for ASP.NET Core Identity

[Web Authentication (WebAuthn) API](https://developer.mozilla.org/docs/Web/API/Web_Authentication_API) support, known widely as *passkeys*, is a modern, phishing-resistant authentication method that improves security and user experience by leveraging public key cryptography and device-based authentication. ASP.NET Core Identity now supports passkey authentication based on WebAuthn and FIDO2 standards. This feature allows users to sign in without passwords, using secure, device-based authentication methods, such as biometrics or security keys.

The Blazor Web App project template provides out-of-the-box passkey management and login functionality.

For more information, see the following articles:

* [security/authentication/passkeys/index](../security/authentication/passkeys/index.md)
* [security/authentication/passkeys/blazor](../security/authentication/passkeys/blazor.md)

### Circuit state persistence

During server-side rendering, Blazor Web Apps can now persist a user's session (circuit) state when the connection to the server is lost for an extended period of time or proactively paused, as long as a full-page refresh isn't triggered. This allows users to resume their session without losing unsaved work in the following scenarios:

* Browser tab throttling
* Mobile device users switching apps
* Network interruptions
* Proactive resource management (pausing inactive circuits)
* [Enhanced navigation](../blazor/fundamentals/routing.md)

For more information, see [blazor/state-management/server](../blazor/state-management/server.md).

### Hot Reload for Blazor WebAssembly and .NET on WebAssembly

The SDK migrated to a general purpose [Hot Reload](../test/hot-reload.md) for WebAssembly scenarios. There's a new MSBuild property `WasmEnableHotReload` that's `true` by default for the `Debug` configuration (`Configuration == "Debug"`) that enables Hot Reload.

For other configurations with custom configuration names, set the value to `true` in the app's project file to enable Hot Reload:

```xml
<PropertyGroup>
  <WasmEnableHotReload>true</WasmEnableHotReload>
</PropertyGroup>
```

To disable Hot Reload for the `Debug` configuration, set the value to `false`:

```xml
<PropertyGroup>
  <WasmEnableHotReload>false</WasmEnableHotReload>
</PropertyGroup>
```

### Updated PWA service worker registration to prevent caching issues

The service worker registration in the [Blazor Progressive Web Application (PWA)](../blazor/progressive-web-app/index.md) project template now includes the [`updateViaCache: 'none'` option](https://developer.mozilla.org/docs/Web/API/ServiceWorkerRegistration/updateViaCache), which prevents caching issues during service worker updates.

```diff
- navigator.serviceWorker.register('service-worker.js');
+ navigator.serviceWorker.register('service-worker.js', { updateViaCache: 'none' });
```

The option ensures that:

* The browser doesn't use cached versions of the service worker script.
* Service worker updates are applied reliably without being blocked by HTTP caching.
* PWA applications can update their service workers more predictably.

This addresses caching issues that can prevent service worker updates from being applied correctly, which is particularly important for PWAs that rely on service workers for offline functionality.

We recommend using the option set to `none` in all PWAs, including those that target .NET 9 or earlier.

### Serialization extensibility for persistent component state

Implement a custom serializer with [Microsoft.AspNetCore.Components.PersistentComponentStateSerializer%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentStateSerializer%25601). Without a registered custom serializer, serialization falls back to the existing JSON serialization.

The custom serializer is registered in the app's `Program` file. In the following example, the `CustomUserSerializer` is registered for the `TUser` type:

```csharp
builder.Services.AddSingleton<PersistentComponentStateSerializer<TUser>, 
    CustomUserSerializer>();
```

The type is automatically persisted and restored with the custom serializer:

```razor
[PersistentState] 
public User? CurrentUser { get; set; } = new();
```

### `OwningComponentBase` now implements `IAsyncDisposable`

[`OwningComponentBase`](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23utility-base-component-classes-to-manage-a-di-scope) now includes support for asynchronous disposal, improving resource management. There are new `DisposeAsync` and `DisposeAsyncCore` methods with an updated `Dispose` method to handle both synchronous and asynchronous disposal of the service scope.

### New `InputHidden` component to handle hidden input fields in forms

The new `InputHidden` component provides a hidden input field for storing string values.

In the following example, a hidden input field is created for the form's `Parameter` property. When the form is submitted, the value of the hidden field is displayed:

```razor
<EditForm Model="Parameter" OnValidSubmit="Submit" FormName="InputHidden Example">
    <InputHidden id="hidden" @bind-Value="Parameter" />
    <button type="submit">Submit</button>
</EditForm>

@if (submitted)
{
    <p>Hello @Parameter!</p>
}

@code {
    private bool submitted;

    [SupplyParameterFromForm] 
    public string Parameter { get; set; } = "stranger";

    private void Submit() => submitted = true;
}
```

### Persistent component state support for enhanced navigation

Blazor now supports handling persistent component state during [enhanced navigation](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23enhanced-navigation-and-form-handling). State persisted during enhanced navigation can be read by interactive components on the page.

By default, persistent component state is only loaded by interactive components when they're initially loaded on the page. This prevents important state, such as data in an edited webform, from being overwritten if additional enhanced navigation events to the same page occur after the component is loaded.

If the data is read-only and doesn't change frequently, opt-in to allow updates during enhanced navigation by setting `AllowUpdates = true` on the [`[PersistentState]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentStateAttribute). This is useful for scenarios such as displaying cached data that's expensive to fetch but doesn't change often. The following example demonstrates the use of `AllowUpdates` for weather forecast data:

```csharp
[PersistentState(AllowUpdates = true)]
public WeatherForecast[]? Forecasts { get; set; }

protected override async Task OnInitializedAsync()
{
    Forecasts ??= await ForecastService.GetForecastAsync();
}
```

To skip restoring state during prerendering, set `RestoreBehavior` to `SkipInitialValue`:

```csharp
[PersistentState(RestoreBehavior = RestoreBehavior.SkipInitialValue)]
public string NoPrerenderedData { get; set; }
```

To skip restoring state during reconnection, set `RestoreBehavior` to `SkipLastSnapshot`. This can be useful to ensure fresh data after reconnection:

```csharp
[PersistentState(RestoreBehavior = RestoreBehavior.SkipLastSnapshot)]
public int CounterNotRestoredOnReconnect { get; set; }
```

Call `PersistentComponentState.RegisterOnRestoring` to register a callback for imperatively controlling how state is restored, similar to how [Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnPersisting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnPersisting%252A) provides full control of how state is persisted.

### Blazor WebAssembly respects the current UI culture setting

In .NET 9 or earlier, standalone Blazor WebAssembly apps load UI globalization resources based on [System.Globalization.CultureInfo.DefaultThreadCurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentCulture). If you want to additionally load globalization data for your localization culture defined by [System.Globalization.CultureInfo.DefaultThreadCurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentUICulture), [upgrade the app to .NET 10 or later](../migration/index.md).


## Blazor Hybrid

This section describes new features for Blazor Hybrid.

### New .NET MAUI Blazor Hybrid with a Blazor Web App and ASP.NET Core Identity article and sample

A new article and sample app has been added for .NET MAUI Blazor Hybrid and Web App using ASP.NET Core Identity.

For more information, see the following resources:

* [blazor/hybrid/security/maui-blazor-web-identity](../blazor/hybrid/security/maui-blazor-web-identity.md)
* [`MauiBlazorWebIdentity` sample app (`dotnet/blazor-samples` GitHub repository)](https://github.com/dotnet/blazor-samples/tree/main/9.0/MauiBlazorWebIdentity)


## SignalR

This section describes new features for SignalR.

## Minimal APIs

This section describes new features for Minimal APIs.

### Treating empty string in form post as null for nullable value types

When using the `[FromForm]` attribute with a complex object in Minimal APIs, empty string values in a form post are now converted to `null` rather than causing a parse failure. This behavior matches the processing logic for form posts not associated with complex objects in Minimal APIs.

```csharp
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapPost("/todo", ([FromForm] Todo todo) => TypedResults.Ok(todo));

app.Run();

public class Todo
{
  public int Id { get; set; }
  public DateOnly? DueDate { get; set; } // Empty strings map to `null`
  public string Title { get; set; }
  public bool IsCompleted { get; set; }
}
```

Thanks to [@nvmkpk](https://github.com/nvmkpk) for contributing this change!

### Validation support in Minimal APIs

Support for validation in Minimal APIs is now available. This feature allows you to request validation of data sent to your API endpoints. Enabling validation allows the ASP.NET Core runtime to perform any validations defined on the:

* Query
* Header
* Request body

Validations are defined using attributes in the [`DataAnnotations`](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace. Developers customize the behavior of the validation system by:

* Creating custom [`[Validation]`](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute) attribute implementations.
* Implementing the [`IValidatableObject`](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject) interface for complex validation logic.

If validation fails, the runtime returns a 400 Bad Request response with details of the validation errors.

#### Enable built-in validation support for Minimal APIs

Enable the built-in validation support for Minimal APIs by calling the `AddValidation` extension method to register the required services in the service container for your application:

```csharp
builder.Services.AddValidation();
```

The implementation automatically discovers types that are defined in Minimal API handlers or as base types of types defined in Minimal API handlers. An endpoint filter performs validation on these types and is added for each endpoint.

> **Note:**
> `AddValidation` uses a source generator that only discovers validatable types within the assembly where `AddValidation` is called. If the Minimal API endpoints are defined in a different assembly, call `AddValidation` from within that assembly. For more information, see [fundamentals/validation#register-validation-in-multi-assembly-apps](https://learn.microsoft.com/search/?terms=fundamentals%2Fvalidation%23register-validation-in-multi-assembly-apps).

Validation can be disabled for specific endpoints by using the `DisableValidation` extension method, as in the following example:

```csharp
app.MapPost("/products",
    ([EvenNumber(ErrorMessage = "Product ID must be even")] int productId, [Required] string name)
        => TypedResults.Ok(productId))
    .DisableValidation();
```

> **Note:**
> Several small improvements and fixes have been made to the Minimal APIs validation generator introduced in ASP.NET Core for .NET 10. To support future enhancements, the underlying validation resolver APIs are now marked as experimental. The top-level `AddValidation` APIs and the built-in validation filter remain stable and non-experimental.


#### Validation with record types
<!-- https://github.com/dotnet/aspnetcore/pull/61193 -->
<!-- https://github.com/dotnet/aspnetcore/pull/61402 -->

Minimal APIs also support validation with C# record types. Record types can be validated using attributes from the [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace, similar to classes. For example:

```csharp
public record Product(
    [Required] string Name,
    [Range(1, 1000)] int Quantity);
```

When using record types as parameters in Minimal API endpoints, validation attributes are automatically applied in the same way as class types:

```csharp
app.MapPost("/products", (Product product) =>
{
    // Endpoint logic here
    return TypedResults.Ok(product);
});
```


### Minimal API Validation integration with IProblemDetailsService
<!-- https://github.com/dotnet/aspnetcore/pull/62066 -->

Error responses from the validation logic for Minimal APIs can now be customized by an `IProblemDetailsService` implementation provided in the application services collection (Dependency Injection container). This enables more consistent and user-specific error responses.


### Support for Server-Sent Events (SSE)

ASP.NET Core now supports returning a [ServerSentEvents](https://learn.microsoft.com/search/?terms=System.Net.ServerSentEvents) result using the [TypedResults.ServerSentEvents](https://source.dot.net/#Microsoft.AspNetCore.Http.Results/TypedResults.cs,051e6796e1492f84) API. This feature is supported in both Minimal APIs and controller-based apps.

Server-Sent Events is a server push technology that allows a server to send a stream of event messages to a client over a single HTTP connection. In .NET the event messages are represented as [`SseItem<T>`](https://learn.microsoft.com/dotnet/api/system.net.serversentevents.sseitem-1) objects, which may contain an event type, an ID, and a data payload of type `T`.

The [TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) class has a new static method called [ServerSentEvents](https://source.dot.net/#Microsoft.AspNetCore.Http.Results/TypedResults.cs,ceb980606eb9e295) that can be used to return a `ServerSentEvents` result. The first parameter to this method is an `IAsyncEnumerable<SseItem<T>>` that represents the stream of event messages to be sent to the client.

The following example illustrates how to use the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as JSON objects to the client:

[language="csharp" source="\~/fundamentals/minimal-apis/10.0-samples/MinimalServerSentEvents/Program.cs" id="snippet_json" ::: (complete source file; reference: \~/fundamentals/minimal-apis/10.0-samples/MinimalServerSentEvents/Program.cs)](../../_code/aspnetcore/fundamentals/minimal-apis/10.0-samples/MinimalServerSentEvents/Program.cs.md)

For more information, see:

- [Server-Sent Events](https://developer.mozilla.org/docs/Web/API/Server-sent_events) on MDN.
- [Minimal API sample app](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/fundamentals/minimal-apis/10.0-samples/MinimalServerSentEvents/Program.cs) using the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as string, `ServerSentEvents`, and JSON objects to the client.
- [Controller API sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/action-return-types/samples/10/ControllerSSE) using the `TypedResults.ServerSentEvents` API to return a stream of heart rate events as string, `ServerSentEvents`, and JSON objects to the client.


### Validation APIs moved to Microsoft.Extensions.Validation

The validation APIs have moved to the `Microsoft.Extensions.Validation` namespace and NuGet package. This change makes the APIs usable outside of ASP.NET Core HTTP scenarios. The public APIs and behavior remain unchanged&mdash;only the package and namespace are different. Existing projects don't require code changes, as old references redirect to the new implementation.



### Enhanced validation for classes and records

Validation attributes can now be applied to both classes and records with consistent code generation and validation behavior. This enhancement improves flexibility when designing models using records in ASP.NET Core apps.

Community contribution: Thanks to [@marcominerva](https://github.com/marcominerva)!

## OpenAPI

This section describes new features for OpenAPI.

### OpenAPI 3.1 support

ASP.NET Core has added support for generating [OpenAPI version 3.1] documents in .NET 10.
Despite the minor version bump, OpenAPI 3.1 is a significant update to the OpenAPI specification,
in particular with full support for [JSON Schema draft 2020-12].

[OpenAPI version 3.1]: https://spec.openapis.org/oas/v3.1.1.html
[JSON Schema draft 2020-12]: https://json-schema.org/specification-links#2020-12

Some of the changes you will see in the generated OpenAPI document include:

* Nullable types no longer have the `nullable: true` property in the schema.
* Instead of a `nullable: true` property, they have a `type` keyword whose value is an array that includes `null` as one of the types.
* Properties or parameters defined as a C# `int` or `long` now appear in the generated OpenAPI document without the `type: integer` field
and have a `pattern` field limiting the value to digits.
This happens when the [System.Text.Json.JsonSerializerOptions.NumberHandling](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.NumberHandling) property in the [System.Text.Json.JsonSerializerOptions](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions) is set to `AllowReadingFromString`, the default for ASP.NET Core Web apps. To enable C# `int` and `long` to be represented in the OpenAPI document as `type: integer`, set the [System.Text.Json.JsonSerializerOptions.NumberHandling](https://learn.microsoft.com/search/?terms=System.Text.Json.JsonSerializerOptions.NumberHandling) property to `Strict`.

With this feature, the default OpenAPI version for generated documents is`3.1`. The version can be changed by explicitly setting the [OpenApiVersion](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.openapi.openapioptions.openapiversion) property of the [OpenApiOptions](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.openapi.openapioptions) in the `configureOptions` delegate parameter of [AddOpenApi](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.openapiservicecollectionextensions.addopenapi):

[language="csharp" source="\~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/Program.cs" id="snippet_DefaultOpenApiVersion" highlight="3"::: (complete source file; reference: \~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/Program.cs)](../../_code/aspnetcore/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/Program.cs.md)

When generating the OpenAPI document at build time, the OpenAPI version can be selected by setting the `--openapi-version` in the `OpenApiGenerateDocumentsOptions` MSBuild item:

[language="xml" source="\~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/WebAppOpenAPI10.csproj" id="snippet_ConfigBuildTimeOpenApiDocVersion" highlight="7"::: (complete source file; reference: \~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/WebAppOpenAPI10.csproj)](../../_code/aspnetcore/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/WebAppOpenAPI10.csproj.md)

OpenAPI 3.1 support was primarily added in the following [PR](https://github.com/dotnet/aspnetcore/pull/59480).

### OpenAPI 3.1 breaking changes

Support for OpenAPI 3.1 requires an update to the underlying OpenAPI.NET library to a new major version, 2.0. This new version has some breaking changes from the previous version. The breaking changes may impact apps if they have any document, operation, or schema transformers.
Breaking changes in this iteration include the following:

* Entities within the OpenAPI document, like operations and parameters, are typed as interfaces. Concrete implementations exist for the inlined and referenced variants of an entity. For example, an `IOpenApiSchema` can either be an inlined `OpenApiSchema` or an `OpenApiSchemaReference` that points to a schema defined elsewhere in the document.
* The `Nullable` property has been removed from the `OpenApiSchema` type. To determine if a type is nullable, evaluate if the `OpenApiSchema.Type` property sets `JsonSchemaType.Null`.

One of the most significant changes is that the `OpenApiAny` class has been dropped in favor of using `JsonNode` directly. Transformers that use `OpenApiAny` need to be updated to use `JsonNode`. The following diff shows the changes in schema transformer from .NET 9 to .NET 10:

[language="diff" source="\~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/TransformerJsonNode.cs"::: (complete source file; reference: \~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/TransformerJsonNode.cs)](../../_code/aspnetcore/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/TransformerJsonNode.cs.md)

Note that these changes are necessary even when only configuring the OpenAPI version to 3.0.

### OpenAPI in YAML

ASP.NET now supports serving the generated OpenAPI document in YAML format. YAML can be more concise than JSON, eliminating curly braces and quotation marks when these can be inferred. YAML also supports multi-line strings, which can be useful for long descriptions.

To configure an app to serve the generated OpenAPI document in YAML format, specify the endpoint in the MapOpenApi call with a ".yaml" or ".yml" suffix, as shown in the following example:

[language="csharp" source="\~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/Program.cs" id="snippet_ConfigOpenApiYAML" highlight="3"::: (complete source file; reference: \~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/Program.cs)](../../_code/aspnetcore/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/Program.cs.md)

Support for:

* YAML is currently only available for the OpenAPI served from the OpenAPI endpoint.
* Generating OpenAPI documents in YAML format at build time is added in a future preview.

See [this PR](https://github.com/dotnet/aspnetcore/pull/58616) which added support for serving the generated OpenAPI document in YAML format.


### Response description on `ProducesResponseType` for API controllers

The [Microsoft.AspNetCore.Mvc.ProducesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesAttribute), [Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute), and [Microsoft.AspNetCore.Mvc.ProducesDefaultResponseTypeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesDefaultResponseTypeAttribute) now accept an optional string parameter, `Description`, that sets the description of the response:

```csharp
[HttpGet(Name = "GetWeatherForecast")]
[ProducesResponseType<IEnumerable<WeatherForecast>>(StatusCodes.Status200OK,
    Description = "The weather forecast for the next 5 days.")]
public IEnumerable<WeatherForecast> Get()
{
```

Generated OpenAPI data:

```json
"responses": {
  "200": {
    "description": "The weather forecast for the next 5 days.",
    "content": {
```

This functionality is supported in both [API controllers](https://learn.microsoft.com/search/?terms=web-api%2Findex%23apicontroller-attribute) and [Minimal APIs](../fundamentals/apis.md). For Minimal APIs, the `Description` property is correctly set even when the attribute's type and the inferred return type aren't an exact match.

[Community contribution (`dotnet/aspnetcore` #58193)](https://github.com/dotnet/aspnetcore/pull/58193) by [Sander ten Brinke](https://github.com/sander1095).


### Populate XML doc comments into OpenAPI document

ASP.NET Core OpenAPI document generation will now include metadata from XML doc comments on method, class, and member definitions in the OpenAPI document. You must enable XML doc comments in your project file to use this feature. You can do this by adding the following property to your project file:

```xml
  <PropertyGroup>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
  </PropertyGroup>
```

At build-time, the OpenAPI package will leverage a source generator to discover XML comments in the current application assembly and any project references and emit source code to insert them into the document via an OpenAPI document transformer.

Note that the C# build process does not capture XML doc comments placed on lambda expresions, so to use XML doc comments to add metadata to a Minimal API endpoint, you must define the endpoint handler as a method, put the XML doc comments on the method, and then reference that method from the `MapXXX` method. For example, to use XML doc comments to add metadata to a Minimal API endpoint originally defined as a lambda expression:

```csharp
app.MapGet("/hello", (string name) =>$"Hello, {name}!");
```

Change the `MapGet` call to reference a method:

```csharp
app.MapGet("/hello", Hello);
```

Define the `Hello` method with XML doc comments:

```csharp
static partial class Program
{
    /// <summary>
    /// Sends a greeting.
    /// </summary>
    /// <remarks>
    /// Greeting a person by their name.
    /// </remarks>
    /// <param name="name">The name of the person to greet.</param>
    /// <returns>A greeting.</returns>
    public static string Hello(string name)
    {
        return $"Hello, {name}!";
    }
}
```

In the previous example the `Hello` method is added to the `Program` class, but you can add it to any class in your project.

The previous example illustrates the `<summary>`, `<remarks>`, and `<param>` XML doc comments.
For more information about XML doc comments, including all the supported tags, see the [C# documentation](https://learn.microsoft.com/dotnet/csharp/language-reference/xmldoc/recommended-tags).

Since the core functionality is provided via a source generator, it can be disabled by adding the following MSBuild to your project file.

```
<ItemGroup>
  <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="10.0.0-preview.2.*" GeneratePathProperty="true" />
</ItemGroup>

<Target Name="DisableCompileTimeOpenApiXmlGenerator" BeforeTargets="CoreCompile">
  <ItemGroup>
    <Analyzer Remove="$(PkgMicrosoft_AspNetCore_OpenApi)/analyzers/dotnet/cs/Microsoft.AspNetCore.OpenApi.SourceGenerators.dll" />
  </ItemGroup>
</Target>
```

The source generator process XML files included in the `AdditionalFiles` property. To add (or remove), sources modify the property as follows:

```
<Target Name="AddXmlSources" BeforeTargets="CoreCompile">
  <ItemGroup>
    <AdditionalFiles Include="$(PkgSome_Package)/lib/net10.0/Some.Package.xml" />
  </ItemGroup>
</Target>
```

### Microsoft.AspNetCore.OpenApi added to the ASP.NET Core web API (Native AOT) template

The **ASP.NET Core Web API (Native AOT)** project template (short name `webapiaot`) now includes support for OpenAPI document generation using the [`Microsoft.AspNetCore.OpenApi` package](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi) by default. This support is disabled by using the `--no-openapi` flag when creating a new project.

[Community contribution (`dotnet/aspnetcore` #60337)](https://github.com/dotnet/aspnetcore/pull/60337) by [Sander ten Brinke](https://github.com/sander1095).


### Support for `IOpenApiDocumentProvider` in the DI container

ASP.NET Core in .NET 10 supports [Microsoft.AspNetCore.OpenApi.IOpenApiDocumentProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiDocumentProvider) in the dependency injection (DI) container. Inject the interface to access the OpenAPI document. This approach is useful for accessing OpenAPI documents outside the context of HTTP requests, such as in background services or custom middleware.

Previously, running app startup logic without launching an HTTP server could be accomplished using [`HostFactoryResolver`](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.HostFactoryResolver/src/HostFactoryResolver.cs) with a no-op [Microsoft.AspNetCore.Hosting.Server.IServer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.Server.IServer) implementation. The new feature simplifies this process.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


For more information, see [Add IOpenApiDocumentProvider interface and implementation (`dotnet/aspnetcore` #61463)](https://github.com/dotnet/aspnetcore/pull/61463).


### Improvements to the XML comment generator

XML comment generation handles complex types in .NET 10 better than earlier versions of .NET.

* It produces accurate and complete XML comments for a wider range of types.
* It handles more complex scenarios.
* It gracefully bypasses processing for complex types that cause build errors in earlier versions.

These improvements change the failure mode for certain scenarios from build errors to missing metadata.

In addition, XML doc comment processing can now be configured to access XML comments in other assemblies. This is useful for generating documentation for types that are defined outside the current assembly, such as the `ProblemDetails` type in the `Microsoft.AspNetCore.Http` namespace.

This configuration is done with directives in the project build file. The following example shows how to configure the XML comment generator to access XML comments for types in the `Microsoft.AspNetCore.Http` assembly, which includes the `ProblemDetails` class.

```xml
<Target Name="AddOpenApiDependencies" AfterTargets="ResolveReferences">
  <ItemGroup>
  <!-- Include XML documentation from Microsoft.AspNetCore.Http.Abstractions
    to get metadata for ProblemDetails -->
    <AdditionalFiles
          Include="@(ReferencePath->'
            %(RootDir)%(Directory)%(Filename).xml')"
          Condition="'%(ReferencePath.Filename)' ==
           'Microsoft.AspNetCore.Http.Abstractions'"
          KeepMetadata="Identity;HintPath" />
  </ItemGroup>
</Target>
```

We expect to include XML comments from a selected set of assemblies in the shared framework in future previews to avoid the need for this configuration in most cases.

#### Unified handling of documentation IDs in OpenAPI XML comment generator

XML documentation comments from referenced assemblies are correctly merged even when their documentation IDs include return type suffixes. As a result, all valid XML comments are reliably included in generated OpenAPI documentation, improving documentation accuracy and completeness for APIs using referenced assemblies.  



### Form data enum parameters use actual enum type in OpenAPI

Form data parameters in MVC controller actions now generate OpenAPI metadata using the actual enum type instead of defaulting to string.

Community contribution: Thanks to [@ascott18](https://github.com/ascott18)!


### Support for generating OpenApiSchemas in transformers
<!-- https://github.com/dotnet/aspnetcore/pull/61050 -->

Developers can now generate a schema for a C# type using the same logic as ASP.NET Core OpenAPI document generation and add it to the OpenAPI document. The schema can then be referenced from elsewhere in the OpenAPI document.

The context passed to document, operation, and schema transformers includes a new `GetOrCreateSchemaAsync` method that can be used to generate a schema for a type.
This method also has an optional `ApiParameterDescription` parameter to specify additional metadata for the generated schema.

To support adding the schema to the OpenAPI document, a `Document` property has been added to the Operation and Schema transformer contexts. This allows any transformer to add a schema to the OpenAPI document using the document's `AddComponent` method.

#### Example

To use this feature in a document, operation, or schema transformer, create the schema using the `GetOrCreateSchemaAsync` method provided in the context and add it to the OpenAPI document using the document's `AddComponent` method.

[language="csharp" source="\~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/Program.cs" id="snippet_Generate_OpenApiSchemas_for_type" highlight="6-7"::: (complete source file; reference: \~/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/Program.cs)](../../_code/aspnetcore/release-notes/aspnetcore-10/samples/WebAppOpenAPI10/Program.cs.md)


### Endpoint-specific OpenAPI operation transformers

Endpoint-specific operation transformers enable fine-grained customization of OpenAPI documentation for individual route endpoints. This feature allows developers to tailor Swagger/OpenAPI metadata and descriptions on a per-action or per-route basis, enhancing extensibility for advanced API scenarios.

For implementation details and code samples, see [fundamentals/openapi/customize-openapi#use-operation-transformers](https://learn.microsoft.com/search/?terms=fundamentals%2Fopenapi%2Fcustomize-openapi%23use-operation-transformers).


### Upgrade Microsoft.OpenApi to 2.0.0

The [`Microsoft.OpenApi`](https://www.nuget.org/packages/Microsoft.OpenApi/) library used for OpenAPI document generation in ASP.NET Core has been upgraded to version 2.0.0 (GA).

#### Breaking changes in 2.0.0

The following breaking changes were introduced in the preview releases and remain in the GA version. These primarily affect users who implement document, operation, or schema transformers:

* [Ephemeral object properties are now in Metadata](https://github.com/microsoft/OpenAPI.NET/blob/main/docs/upgrade-guide-2.md#ephemeral-object-properties-are-now-in-metadata)
* [Use HTTP Method Object Instead of Enum](https://github.com/microsoft/OpenAPI.NET/blob/main/docs/upgrade-guide-2.md#use-http-method-object-instead-of-enum)

With the update to the GA version, no further breaking changes are expected in OpenAPI document generation.


### OpenAPI Schema Generation Enhancements

#### Model nullable types using oneOf in OpenAPI schema

OpenAPI schema generation for nullable types was improved by using the `oneOf` pattern instead of the nullable property for complex types and collections. The implementation:

- Uses `oneOf` with `null` and the actual type schema for nullable complex types in request and response schemas.
- Detects nullability for parameters, properties, and return types using reflection and `NullabilityInfoContext`.
- Removes null types from componentized schemas to avoid duplication.

#### Fixes and improvements to schema reference resolution

This release improves the handling of JSON schemas for OpenAPI document generation by properly resolving relative JSON schema references (`$ref`) in the root schema document.

#### Include property descriptions as siblings of $ref in OpenAPI schema

Prior to .NET 10, ASP.NET Core discarded descriptions on properties defined with `$ref` in the generated OpenAPI document because OpenAPI v3.0 didn't allow sibling properties alongside `$ref` in schema definitions. OpenAPI 3.1 now lets you include descriptions alongside `$ref`. RC1 adds support for including property descriptions as siblings of `$ref` in the generated OpenAPI schema.

This was a community contribution. Thanks @desjoerd!

#### Add metadata from XML comments on `[AsParameters]` types to OpenAPI schema

OpenAPI schema generation now processes XML comments on properties of `[AsParameters]` parameter classes to extract metadata for documentation.

#### Exclude unknown HTTP methods from OpenAPI

OpenAPI schema generation now excludes unknown HTTP methods from the generated OpenAPI document. Query methods, which are standard HTTP methods but not recognized by OpenAPI, are now gracefully excluded from the generated OpenAPI document.

This was a community contribution. Thanks @martincostello!

#### Improve the description of JSON Patch request bodies

The OpenAPI schema generation for JSON Patch operations now correctly applies the `application/json-patch+json` media type to request bodies that use JSON Patch. This ensures that the generated OpenAPI document accurately reflects the expected media type for JSON Patch operations. In addition, the JSON Patch request body has a detailed schema that describes the structure of the JSON Patch document, including the operations that can be performed.

This was a community contribution. Thanks @martincostello!

#### Use invariant culture for OpenAPI document generation

OpenAPI document generation now uses invariant culture for formatting numbers and dates in the generated OpenAPI document. This ensures that the generated document is consistent and does not vary based on the server's culture settings.

This was a community contribution. Thanks @martincostello!


## Authentication and authorization

### Authentication and authorization metrics

Metrics have been added for certain authentication and authorization events in ASP.NET Core. With this change, you can now obtain metrics for the following events:

* Authentication:
  * Authenticated request duration
  * Challenge count
  * Forbid count
  * Sign in count
  * Sign out count
* Authorization:
  * Count of requests requiring authorization

The following image shows an example of the Authenticated request duration metric in the Aspire dashboard:

Authenticated request duration in the Aspire dashboard

For more information, see [metrics/security#microsoftaspnetcoreauthorization](https://learn.microsoft.com/search/?terms=metrics%2Fsecurity%23microsoftaspnetcoreauthorization).

### ASP.NET Core Identity metrics

[ASP.NET Core Identity](../security/authentication/identity.md) observability has been improved in .NET 10 with metrics. Metrics are counters, histograms, and gauges that provide time-series measurements of system or application behavior.

For example, use the new ASP.NET Core Identity metrics to observe:

* **User management**: New user creations, password changes, and role assignments.
* **Login/session handling**: Login attempts, sign ins, sign outs, and users using two factor authentication.

The new metrics are in the `Microsoft.AspNetCore.Identity` meter:

* `aspnetcore.identity.user.create.duration`
* `aspnetcore.identity.user.update.duration`
* `aspnetcore.identity.user.delete.duration`
* `aspnetcore.identity.user.check_password_attempts`
* `aspnetcore.identity.user.generated_tokens`
* `aspnetcore.identity.user.verify_token_attempts`
* `aspnetcore.identity.sign_in.authenticate.duration`
* `aspnetcore.identity.sign_in.check_password_attempts`
* `aspnetcore.identity.sign_in.sign_ins`
* `aspnetcore.identity.sign_in.sign_outs`
* `aspnetcore.identity.sign_in.two_factor_clients_remembered`
* `aspnetcore.identity.sign_in.two_factor_clients_forgotten`

For more information about using metrics in ASP.NET Core, see [metrics/overview](../metrics/overview.md).


### Avoid cookie login redirects for known API endpoints

By default, unauthenticated and unauthorized requests made to known API endpoints protected by cookie authentication now result in 401 and 403 responses rather than redirecting to a login or access denied URI.

This change was [highly requested](https://github.com/dotnet/aspnetcore/issues/9039), because redirecting unauthenticated requests to a login page doesn't usually make sense for API endpoints which typically rely on 401 and 403 status codes rather than HTML redirects to communicate auth failures.

Known API [Endpoints](../fundamentals/routing.md) are identified using the new `IApiEndpointMetadata` interface, and metadata implementing the new interface has been added automatically to the following:

- `[ApiController]` endpoints
- Minimal API endpoints that read JSON request bodies or write JSON responses
- Endpoints using `TypedResults` return types
- SignalR endpoints

When `IApiEndpointMetadata` is present, the cookie authentication handler now returns appropriate HTTP status codes (401 for unauthenticated requests, 403 for forbidden requests) instead of redirecting.

If you want to prevent this new behavior, and always redirect to the login and access denied URIs for unauthenticated or unauthorized requests regardless of the target endpoint, you can override the `RedirectToLogin` and `RedirectToAccessDenied` events as follows:

```csharp
builder.Services.AddAuthentication()
    .AddCookie(options =>
    {
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.Redirect(context.RedirectUri);
            return Task.CompletedTask;
        };

        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.Redirect(context.RedirectUri);
            return Task.CompletedTask;
        };
    });
```

For more information about this breaking change, see [ASP.NET Core breaking changes announcement](https://github.com/aspnet/Announcements/issues/525).

## Miscellaneous

This section describes miscellaneous new features in .NET 10.

### Configure suppressing exception handler diagnostics

A new configuration option has been added to the [ASP.NET Core exception handler middleware](../fundamentals/error-handling.md)  to control diagnostic output: `ExceptionHandlerOptions.SuppressDiagnosticsCallback`. This callback is passed context about the request and exception, allowing you to add logic that determines whether the middleware should write exception logs and other telemetry.

This setting is useful when you know an exception is transient or has been handled by the exception handler middleware, and you don't want error logs written to your observability platform.

The middleware's default behavior has also changed: it no longer writes exception diagnostics for exceptions handled by `IExceptionHandler`. Based on user feedback, logging handled exceptions at the error level was often undesirable when `IExceptionHandler.TryHandleAsync` returned `true`.

You can revert to the previous behavior by configuring `SuppressDiagnosticsCallback`:

```csharp
app.UseExceptionHandler(new ExceptionHandlerOptions
{
    SuppressDiagnosticsCallback = context => false;
});
```

For more information about this breaking change, see https://github.com/aspnet/Announcements/issues/524.


### Support for the .localhost Top-Level Domain

The `.localhost` top-level domain (TLD) is defined in [RFC2606](https://www.rfc-editor.org/rfc/rfc2606) and [RFC6761](https://www.rfc-editor.org/rfc/rfc6761) as being reserved for testing purposes and available for users to use locally as they would any other domain name. This means using a name like `myapp.localhost` locally that resolves to the IP loopback address is allowed and expected according to these RFCs. Additionally, modern evergreen browsers already automatically resolve any `*.localhost` name to the IP loopback address (`127.0.0.1`/`::1`), effectively making them an alias for any service already being hosted at `localhost` on the local machine, that is, any service responding to `http://localhost:6789` will also respond to `http://anything-here.localhost:6789`, assuming no further specific hostname verification or enforcement is being performed by the service.

ASP.NET Core has been updated in .NET 10 Preview 7 to better support the `.localhost` TLD, such that it can now be easily used when creating and running ASP.NET Core applications in your local development environment. Having different apps running locally be resolvable via different names allows for better separation of some domain-name-associated website assets, e.g. cookies, and makes it easier to identify which app you're browsing via the name displayed in the browser address bar.

ASP.NET Core's built-in HTTP server, Kestrel, will now correctly treat any `*.localhost` name set via [supported endpoint configuration mechanisms](../fundamentals/servers/kestrel/endpoints.md) as the local loopback address and thus bind to it rather than all external address (i.e. bind to `127.0.0.1`/`::1` rather than `0.0.0.0`/`::`). This includes the `"applicationUrl"` property in [launch profiles configured in a *launchSettings.json* file](../fundamentals/environments.md), and the `ASPNETCORE_URLS` environment variable. When configured to listen on a `.localhost` address, Kestrel will log an information message for both the `.localhost` **and** `localhost` addresses, to make it clear that both names can be used.

While web browsers automatically resolve `*.localhost` names to the local loopback address, other apps might treat `*.localhost` names as regular domain names and attempt to resolve them via their corresponding DNS stack. If your DNS configuration doesn't resolve `*.localhost` names to an address, they fail to connect. You can continue to use the regular `localhost` name to address your apps when not in a web browser.

The [ASP.NET Core HTTPS development certificate](../security/enforcing-ssl.md) (including the `dotnet dev-certs https` command) have been updated to ensure the certificate is valid for use with the `*.dev.localhost` domain name. After installing .NET 10 SDK Preview 7, trust the new developer certificate by running `dotnet dev-certs https --trust` at the command line to ensure your system is configured to trust the new certificate.

The certificate lists the `*.dev.localhost` name as a Subject Alternative Name (SAN) rather than `*.localhost` because using a wildcard certificate for a top-level domain name is invalid.

The project templates for *ASP.NET Core Empty* (`web`) and *Blazor Web App* (`blazor`) have been updated with a new option that when specified configures the created project to use the `.dev.localhost` domain name suffix, combining it with the project name to allow the app to be browsed to at an address like `https://myapp.dev.localhost:5036`:

```
$ dotnet new web -n MyApp --localhost-tld
The template "ASP.NET Core Empty" was created successfully.

Processing post-creation actions...
Restoring D:\src\MyApp\MyApp.csproj:
Restore succeeded.

$ cd .\MyApp\
$ dotnet run --launch-profile https
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://myapp.dev.localhost:7099
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7099/
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://myapp.dev.localhost:5036
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5036/
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: D:\src\local\10.0.1xx\MyApp
```


### Json+PipeReader deserialization support in MVC and Minimal APIs

PR: https://github.com/dotnet/aspnetcore/pull/62895

See https://github.com/dotnet/core/blob/main/release-notes/10.0/preview/preview7/libraries.md#pipereader-support-for-json-serializer

MVC, Minimal APIs, and the `HttpRequestJsonExtensions.ReadFromJsonAsync` methods have all been updated to use the new Json+PipeReader support without requiring any code changes from applications.

For most applications, the addition of this support has no effect on their behavior. However, if the application is using a custom [System.Text.Json.Serialization.JsonConverter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonConverter), there's a chance that the converter doesn't handle [System.Text.Json.Utf8JsonReader.HasValueSequence%2A](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.HasValueSequence%252A) correctly. This can result in missing data and errors, such as [System.ArgumentOutOfRangeException](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException), when deserializing.

The quick workaround (especially if you don't own the custom `JsonConverter` being used) is to set the `"Microsoft.AspNetCore.UseStreamBasedJsonParsing"` [System.AppContext](https://learn.microsoft.com/search/?terms=System.AppContext) switch to `"true"`. This should be a temporary workaround, and the `JsonConverter` should be updated to support [System.Text.Json.Utf8JsonReader.HasValueSequence%2A](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonReader.HasValueSequence%252A).

To fix `JsonConverter` implementations, there's a quick fix that allocates an array from the `ReadOnlySequence` and would look like the following example:

```csharp
public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    var span = reader.HasValueSequence ? reader.ValueSequence.ToArray() : reader.ValueSpan;
    // previous code
}
```

There's also a more complicated (but performant) fix, which would involve having a separate code path for the `ReadOnlySequence` handling:

```csharp
public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    if (reader.HasValueSequence)
    {
        reader.ValueSequence;
        // ReadOnlySequence optimized path
    }
    else
    {
        reader.ValueSpan;
        // ReadOnlySpan optimized path
    }
}
```

### Automatic eviction from memory pool

The memory pools used by Kestrel, IIS, and HTTP.sys now automatically evict memory blocks when the application is idle or under less load. The feature runs automatically and doesn't need to be enabled or configured manually.

#### Why memory eviction matters

Previously, memory allocated by the pool would remain reserved, even when not in use. This feature releases memory back to the system when the app is idle for a period of time. This eviction reduces overall memory usage and helps applications stay responsive under varying workloads.

#### Use memory eviction metrics

Metrics have been added to the default memory pool used by our server implementations. The new metrics are under the name `"Microsoft.AspNetCore.MemoryPool"`.

For information about metrics and how to use them, see [metrics/overview](../metrics/overview.md).

#### Manage memory pools

Besides using memory pools more efficiently by evicting unneeded memory blocks, .NET 10 improves the experience of creating memory pools. It does this by providing a built-in [IMemoryPoolFactory](https://source.dot.net/#Microsoft.AspNetCore.Connections.Abstractions/IMemoryPoolFactory.cs) and a `MemoryPoolFactory` implementation. It makes the implementation available to your application through dependency injection.

The following code example shows a simple background service that uses the built-in memory pool factory implementation to create memory pools. These pools benefit from the automatic eviction feature:

```csharp
public class MyBackgroundService : BackgroundService
{
    private readonly MemoryPool<byte> _memoryPool;

    public MyBackgroundService(IMemoryPoolFactory<byte> factory)
    {
        _memoryPool = factory.Create();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await Task.Delay(20, stoppingToken);
                // do work that needs memory
                var rented = _memoryPool.Rent(100);
                rented.Dispose();
            }
            catch (OperationCanceledException)
            {
                return;
            }
        }
    }
}
```

To use your own memory pool factory, make a class that implements `IMemoryPoolFactory` and register it with dependency injection, as the following example does. Memory pools created this way do not benefit from the automatic eviction feature unless you implement similar eviction logic in your custom factory:

```csharp
services.AddSingleton<IMemoryPoolFactory<byte>,
CustomMemoryPoolFactory>();

public class CustomMemoryPoolFactory : IMemoryPoolFactory<byte>
{
    public MemoryPool<byte> Create()
    {
        // Return a custom MemoryPool implementation
        // or the default, as is shown here.
        return MemoryPool<byte>.Shared;
    }
}
```


### Customizable security descriptors for HTTP.sys
<!--PR: https://github.com/dotnet/aspnetcore/pull/61325-->

You can now specify a custom security descriptor for HTTP.sys request queues. The new [RequestQueueSecurityDescriptor](https://source.dot.net/#Microsoft.AspNetCore.Server.HttpSys/HttpSysOptions.cs,a556950881fd2d87) property on [Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions) enables more granular control over access rights for the request queue. This granular control lets you tailor security to your application's needs.

#### What you can do with the new property

A *request queue* in HTTP.sys is a kernel-level structure that temporarily stores incoming HTTP requests until your application is ready to process them. By customizing the security descriptor, you can allow or deny specific users or groups access to the request queue. This is useful in scenarios where you want to restrict or delegate HTTP.sys request handling at the operating system level.

#### How to use the new property

The `RequestQueueSecurityDescriptor` property applies only when creating a new request queue. The property doesn't affect existing request queues. To use this property, set it to a [System.Security.AccessControl.GenericSecurityDescriptor](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.GenericSecurityDescriptor) instance when configuring your HTTP.sys server.

For example, the following code allows all authenticated users but denies guests:
[Code reference unavailable in this source snapshot: aspnetcore-10/includes/~/release-notes/aspnetcore-10/samples/HttpSysConfig/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/release-notes/aspnetcore-10.0.md)

For more information, see [fundamentals/servers/httpsys](../fundamentals/servers/httpsys.md).


### Better support for testing apps with top-level statements

.NET 10 now has better support for testing apps that use [top-level statements](https://learn.microsoft.com/dotnet/csharp/fundamentals/program-structure/top-level-statements). Previously developers had to manually add `public partial class Program` to the `Program.cs` file so that the test project could reference the `Program class`. `public partial class Program` was required because the top-level statement feature in C# 9 generated a `Program class` that was declared as [internal](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/internal).

In .NET 10, a [source generator](https://learn.microsoft.com/shows/on-dotnet/c-source-generators) is used to generate the `public partial class Program` declaration if the programmer didn't declare it explicitly. Additionally, an analyzer was added to detect when `public partial class Program` is declared explicitly and advise the developer to remove it.

Image

The following PRs contribited to this feature:

* [PR 58199](https://github.com/dotnet/aspnetcore/pull/58199)
* [PR 58482](https://github.com/dotnet/aspnetcore/pull/58482)


### New JSON Patch implementation with `System.Text.Json`

**[JSON Patch](https://jsonpatch.com/)**:

* Is a standard format for describing changes to apply to a JSON document.
* Is defined in RFC 6902 and is widely used in RESTful APIs to perform partial updates to JSON resources.
* Represents a sequence of operations (for example, Add, Remove, Replace, Move, Copy, Test) that can be applied to modify a JSON document.

In web apps, JSON Patch is commonly used in a PATCH operation to perform partial updates of a resource. Rather than sending the entire resource for an update, clients can send a JSON Patch document containing only the changes. Patching reduces payload size and improves efficiency.

[RFC 6902]: https://tools.ietf.org/html/rfc6902

This release introduces a new implementation of [Microsoft.AspNetCore.JsonPatch](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.JsonPatch) based on [System.Text.Json](https://learn.microsoft.com/search/?terms=System.Text.Json) serialization. This feature:

* Aligns with modern .NET practices by leveraging the `System.Text.Json` library, which is optimized for .NET.
* Provides improved performance and reduced memory usage compared to the legacy `Newtonsoft.Json`-based implementation.

The following benchmarks compare the performance of the new `System.Text.Json` implementation with the legacy `Newtonsoft.Json` implementation.

| Scenario | Implementation | Mean | Allocated Memory |
| --- | --- | :---: | :---: |
| **Application Benchmarks** | Newtonsoft.JsonPatch | 271.924 µs | 25 KB |
|  | System.Text.JsonPatch | 1.584 µs | 3 KB |
| **Deserialization Benchmarks** | Newtonsoft.JsonPatch | 19.261 µs | 43 KB |
|  | System.Text.JsonPatch | 7.917 µs | 7 KB |

These benchmarks highlight significant performance gains and reduced memory usage with the new implementation.

Notes:
 * The new implementation isn't a drop-in replacement for the legacy implementation. In particular, the new implementation doesn't support dynamic types, for example, [System.Dynamic.ExpandoObject](https://learn.microsoft.com/search/?terms=System.Dynamic.ExpandoObject).
 * The JSON Patch standard has ***inherent security risks***. Since these risks are inherent to the JSON Patch standard, the new implementation ***doesn't attempt to mitigate inherent security risks***. It's the responsibility of the developer to ensure that the JSON Patch document is safe to apply to the target object. For more information, see the [Mitigating Security Risks](#mitigating-security-risks) section.

#### Usage

To enable JSON Patch support with `System.Text.Json`, install the [`Microsoft.AspNetCore.JsonPatch.SystemTextJson`](https://www.nuget.org/packages/Microsoft.AspNetCore.JsonPatch.SystemTextJson) NuGet package.

```dotnetcli
dotnet add package Microsoft.AspNetCore.JsonPatch.SystemTextJson --prerelease
```

This package provides a `JsonPatchDocument<T>` class to represent a JSON Patch document for objects of type `T` and custom logic for serializing and deserializing JSON Patch documents using `System.Text.Json`. The key method of the `JsonPatchDocument<T>` class is `ApplyTo`, which applies the patch operations to a target object of type `T`.

The following examples demonstrate how to use the `ApplyTo` method to apply a JSON Patch document to an object.

#### Example: Applying a `JsonPatchDocument`

The following example demonstrates:

1. The `add`, `replace`, and `remove` operations.
2. Operations on nested properties.
3. Adding a new item to an array.
4. Using a JSON String Enum Converter in a JSON Patch document.

```csharp
// Original object
var person = new Person {
  FirstName = "John",
  LastName = "Doe",
  Email = "johndoe@gmail.com",
  PhoneNumbers = [new() {Number = "123-456-7890", Type = PhoneNumberType.Mobile}],
  Address = new Address
  {
    Street = "123 Main St",
    City = "Anytown",
    State = "TX"
  }
};

// Raw JSON Patch document
var jsonPatch = """
[
  { "op": "replace", "path": "/FirstName", "value": "Jane" },
  { "op": "remove", "path": "/Email"},
  { "op": "add", "path": "/Address/ZipCode", "value": "90210" },
  {
    "op": "add",
    "path": "/PhoneNumbers/-",
    "value": { "Number": "987-654-3210", "Type": "Work" }
  }
]
""";

// Deserialize the JSON Patch document
var patchDoc = JsonSerializer.Deserialize<JsonPatchDocument<Person>>(jsonPatch);

// Apply the JSON Patch document
patchDoc!.ApplyTo(person);

// Output updated object
Console.WriteLine(JsonSerializer.Serialize(person, serializerOptions));

// Output:
// {
//   "firstName": "Jane",
//   "lastName": "Doe",
//   "address": {
//     "street": "123 Main St",
//     "city": "Anytown",
//     "state": "TX",
//     "zipCode": "90210"
//   },
//   "phoneNumbers": [
//     {
//       "number": "123-456-7890",
//       "type": "Mobile"
//     },
//     {
//       "number": "987-654-3210",
//       "type": "Work"
//     }
//   ]
// }
```

The `ApplyTo` method generally follows the conventions and options of `System.Text.Json` for processing the `JsonPatchDocument`, including the behavior controlled by the following options:

* `NumberHandling`: Whether numeric properties are read from strings.
* `PropertyNameCaseInsensitive`: Whether property names are case-sensitive.

Key differences between `System.Text.Json` and the new `JsonPatchDocument<T>` implementation:

* The runtime type of the target object, not the declared type, determines which properties `ApplyTo` patches.
* `System.Text.Json` deserialization relies on the declared type to identify eligible properties.

#### Example: Applying a `JsonPatchDocument` with error handling

There are various errors that can occur when applying a JSON Patch document. For example, the target object may not have the specified property, or the value specified might be incompatible with the property type.

JSON Patch also supports the `test` operation. The `test` operation checks if a specified value is equal to the target property, and if not, returns an error.

The following example demonstrates how to handle these errors gracefully.

> **Important:**
> The object passed to the `ApplyTo` method is modified in place. It is the caller's responsibility to discard these changes if any operation fails.

```csharp
// Original object
var person = new Person {
  FirstName = "John",
  LastName = "Doe",
  Email = "johndoe@gmail.com"
};

// Raw JSON Patch document
var jsonPatch = """
[
  { "op": "replace", "path": "/Email", "value": "janedoe@gmail.com"},
  { "op": "test", "path": "/FirstName", "value": "Jane" },
  { "op": "replace", "path": "/LastName", "value": "Smith" }
]
""";

// Deserialize the JSON Patch document
var patchDoc = JsonSerializer.Deserialize<JsonPatchDocument<Person>>(jsonPatch);

// Apply the JSON Patch document, catching any errors
Dictionary<string, string[]>? errors = null;
patchDoc!.ApplyTo(person, jsonPatchError =>
    {
        errors ??= new ();
        var key = jsonPatchError.AffectedObject.GetType().Name;
        if (!errors.ContainsKey(key))
        {
            errors.Add(key, new string[] { });
        }
        errors[key] = errors[key].Append(jsonPatchError.ErrorMessage).ToArray();
    });
if (errors != null)
{
    // Print the errors
    foreach (var error in errors)
    {
        Console.WriteLine($"Error in {error.Key}: {string.Join(", ", error.Value)}");
    }
}

// Output updated object
Console.WriteLine(JsonSerializer.Serialize(person, serializerOptions));

// Output:
// Error in Person: The current value 'John' at path 'FirstName' is not equal 
// to the test value 'Jane'.
// {
//   "firstName": "John",
//   "lastName": "Smith",              <<< Modified!
//   "email": "janedoe@gmail.com",     <<< Modified!
//   "phoneNumbers": []
// }
```

#### Mitigating security risks

When using the `Microsoft.AspNetCore.JsonPatch.SystemTextJson` package, it's critical to understand and mitigate potential security risks. The following sections outline the identified security risks associated with JSON Patch and provide recommended mitigations to ensure secure usage of the package.

> **Important:**
> ***This is not an exhaustive list of threats.*** App developers must conduct their own threat model reviews to determine an app-specific comprehensive list and come up with appropriate mitigations as needed. For example, apps which expose collections to patch operations should consider the potential for algorithmic complexity attacks if those operations insert or remove elements at the beginning of the collection.

By running comprehensive threat models for their own apps and addressing identified threats while following the recommended mitigations below, consumers of these packages can integrate JSON Patch functionality into their apps while minimizing security risks.

Consumers of these packages can integrate JSON Patch functionality into their apps while minimizing security risks, including:

* Run comprehensive threat models for their own apps.
* Address identified threats.
* Follow the recommended mitigations in the following sections.

##### Denial of Service (DoS) via memory amplification

* **Scenario**: A malicious client submits a `copy` operation that duplicates large object graphs multiple times, leading to excessive memory consumption.
* **Impact**: Potential Out-Of-Memory (OOM) conditions, causing service disruptions.
* **Mitigation**:
  * Validate incoming JSON Patch documents for size and structure before calling `ApplyTo`.
  * The validation must be app specific, but an example validation can look similar to the following:

```csharp
public void Validate(JsonPatchDocument<T> patch)
{
    // This is just an example. It's up to the developer to make sure that
    // this case is handled properly, based on the app's requirements.
    if (patch.Operations.Where(op=>op.OperationType == OperationType.Copy).Count()
        > MaxCopyOperationsCount)
    {
        throw new InvalidOperationException();
    }
}
```

##### Business Logic Subversion

* **Scenario**: Patch operations can manipulate fields with implicit invariants, (for example, internal flags, IDs, or computed fields), violating business constraints.
* **Impact**: Data integrity issues and unintended app behavior.
* **Mitigation**:
  * Use POCO objects with explicitly defined properties that are safe to modify.
  * Avoid exposing sensitive or security-critical properties in the target object.
  * If no POCO object is used, validate the patched object after applying operations to ensure business rules and invariants aren't violated.

##### Authentication and authorization

* **Scenario**: Unauthenticated or unauthorized clients send malicious JSON Patch requests.
* **Impact**: Unauthorized access to modify sensitive data or disrupt app behavior.
* **Mitigation**:
  * Protect endpoints accepting JSON Patch requests with proper authentication and authorization mechanisms.
  * Restrict access to trusted clients or users with appropriate permissions.


### Detect if URL is local using `RedirectHttpResult.IsLocalUrl`

Use the new [`RedirectHttpResult.IsLocalUrl(url)`](https://source.dot.net/#Microsoft.AspNetCore.Http.Results/RedirectHttpResult.cs,c0ece2e6266cb369) helper method to detect if a URL is local. A URL is considered local if the following are true:

* It doesn't have the [host](https://developer.mozilla.org/docs/Web/API/URL/host) or [authority](https://developer.mozilla.org/docs/Web/URI/Authority) section.
* It has an [absolute path](https://developer.mozilla.org/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL#absolute_urls_vs._relative_urls).

URLs using [virtual paths](https://learn.microsoft.com/previous-versions/aspnet/ms178116\(v=vs.100\)) `"~/"` are also local.

`IsLocalUrl` is useful for validating URLs before redirecting to them to prevent [open redirection attacks](https://brightsec.com/blog/open-redirect-vulnerabilities/).

```csharp
if (RedirectHttpResult.IsLocalUrl(url))
{
    return Results.LocalRedirect(url);
}
```

Thank you [@martincostello](https://github.com/martincostello) for this contribution!

## Breaking changes

Use the articles in [Breaking changes in .NET](https://learn.microsoft.com/dotnet/core/compatibility/breaking-changes) to find breaking changes that might apply when upgrading an app to a newer version of .NET.
