---
title: What's new in ASP.NET Core in .NET 9
author: wadepickett
description: Learn about the new features in ASP.NET Core in .NET 9.
ms.author: wpickett
ms.date: 09/23/2026
uid: aspnetcore-9
---
# What's new in ASP.NET Core in .NET 9

This article highlights the most significant changes in ASP.NET Core in .NET 9 with links to relevant documentation.

## Static asset delivery optimization

[`MapStaticAssets` routing endpoint conventions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) is a new feature that optimizes the delivery of static assets in ASP.NET Core apps.

For information on static asset delivery for Blazor apps, see [blazor/fundamentals/static-files](../blazor/fundamentals/static-files.md).

Following production best practices for serving static assets requires a significant amount of work and technical expertise. Without optimizations like compression, caching, and [fingerprints](https://en.wikipedia.org/wiki/Fingerprint_(computing)):

* The browser has to make additional requests on every page load.
* More bytes than necessary are transferred through the network.
* Sometimes stale versions of files are served to clients.

Creating performant web apps requires optimizing asset delivery to the browser. Possible optimizations include:

* Serve a given asset once until the file changes or the browser clears its cache. Set the [ETag](https://developer.mozilla.org/docs/Web/HTTP/Headers/ETag) header.
* Prevent the browser from using old or stale assets after an app is updated. Set the [Last-Modified](https://developer.mozilla.org/docs/Web/HTTP/Headers/Last-Modified) header.
* Set up proper [caching headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control).
* Use [caching middleware](../performance/caching/middleware.md).
* Serve [compressed](https://learn.microsoft.com/aspnet/core/performance/response-compression) versions of the assets when possible.
* Use a [CDN](https://learn.microsoft.com/microsoft-365/enterprise/content-delivery-networks?view=o365-worldwide\&preserve-view=true) to serve the assets closer to the user.
* Minimize the size of assets served to the browser. This optimization doesn't include minification.

[Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets%252A) is a new feature that optimizes the delivery of static assets in an app. It's designed to work with all UI frameworks, including Blazor, Razor Pages, and MVC. It's typically a drop-in replacement for [`UseStaticFiles`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.staticfileextensions.usestaticfiles):

```diff
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

+app.MapStaticAssets();
-app.UseStaticFiles();
app.MapRazorPages();

app.Run();
```

`MapStaticAssets` operates by combining build and publish-time processes to collect information about all the static resources in an app. This information is then utilized by the runtime library to efficiently serve these files to the browser.

`MapStaticAssets` can replace [`UseStaticFiles`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.staticfileextensions.usestaticfiles) in most situations, however, it's optimized for serving the assets that the app has knowledge of at build and publish time. If the app serves assets from other locations, such as disk or embedded resources, `UseStaticFiles` should be used.

`MapStaticAssets` provides the following benefits not found with `UseStaticFiles`:

* Build time compression for all the assets in the app:
  * `gzip` during development and `gzip + brotli` during publish.
  * All assets are compressed with the goal of reducing the size of the assets to the minimum.
* Content based `ETags`: The `Etags` for each resource are the [Base64](https://developer.mozilla.org/docs/Glossary/Base64) encoded string of the [SHA-256](https://learn.microsoft.com/dotnet/api/system.security.cryptography.sha256?view=net-8.0\&preserve-view=true) hash of the content. This ensures that the browser only redownloads a file if its contents have changed.

The following table shows the original and compressed sizes of the CSS and JS files in the default Razor Pages template.

File | Original | Compressed | % Reduction
-- | -- | --
bootstrap.min.css | 163 | 17.5 | 89.26%
jquery.js | 89.6 | 28 | 68.75%
bootstrap.min.js | 78.5 | 20 | 74.52%
**Total** | 331.1 | 65.5 | 80.20%

The following table shows the original and compressed sizes using the [Fluent UI Blazor components library](https://www.fluentui-blazor.net/).

| File | Original | Compressed | % Reduction |
| --- | --- | --- | --- |
| fluent.js | 384 | 73 | 80.99% |
| fluent.css | 94 | 11 | 88.30% |
| **Total** | 478 | 84 | 82.43% |

For a total of 478 KB uncompressed to 84 KB compressed.

The following table shows the original and compressed sizes using the [MudBlazor](https://mudblazor.com) Blazor components library.

| File | Original | Compressed | Reduction |
| --- | --- | --- | --- |
| MudBlazor.min.css | 541 | 37.5 | 93.07% |
| MudBlazor.min.js | 47.4 | 9.2 | 80.59% |
| **Total** | 588.4 | 46.7 | 92.07% |

Optimization happens automatically when using `MapStaticAssets`. When a library is added or updated, for example with new JavaScript or CSS, the assets are optimized as part of the build. Optimization is especially beneficial to mobile environments that can have a lower bandwidth or an unreliable connections.

For more information on the new file delivery features, see the following resources:

* [fundamentals/static-files](../fundamentals/static-files.md)
* [blazor/fundamentals/static-files](../blazor/fundamentals/static-files.md)

### Customize build-time compression with MSBuild properties

Several MSBuild properties can be used to customize or disable build-time compression behavior:

* `CompressionEnabled`: Completely disables compression when set to `false`.
* `CompressionExcludePatterns`: Semicolon-delimited list of glob patterns (for example, `**\*.js`) to exclude specific files from being considered for compression.

The following example excludes JavaScript files from compression:

```xml
<PropertyGroup>
  <CompressionExcludePatterns>$(CompressionExcludePatterns);**\*.js</CompressionExcludePatterns>
</PropertyGroup>
```

To completely disable compression:

```xml
<PropertyGroup>
  <CompressionEnabled>false</CompressionEnabled>
</PropertyGroup>
```

For more information, see [fundamentals/static-files](../fundamentals/static-files.md).

### Enabling dynamic compression on the server vs using `MapStaticAssets`

`MapStaticAssets` has the following advantages over dynamic compression on the server:

<!-- 
I'm confused about the following:
If we take MudBlazor as an example, IIS will compress the CSS bundle at around 90Kb, while brotli with max settings will result in 37Kb. That is still a whopping 59% size reduction or 41% of its dynamically compressed size -->

* Is simpler because there is no server specific configuration.
* Is more performant because the assets are compressed at build time. <!-- IIS can do static compression -->
* Allows the developer to spend extra time during the build process to ensure that the assets are the minimum size.

Consider the following table comparing MudBlazor compression with IIS dynamic compression and `MapStaticAssets`.
<!-- MapStaticAssets uses brotli max so it's the same as IIS brotli max is the same as -->

| IIS gzip | `MapStaticAssets` | `MapStaticAssets` reduction |
| --- | --- | --- |
 | &#8773; 90 | 37.5 | 59% |

<!--  “always flush” does not work with IIS Brotli AND might degrade Zlib compression ratio. See https://microsoft.sharepoint.com/:p:/r/teams/GlobalDAS/WebApps/_layouts/15/Doc.aspx?sourcedoc=%7BDC4A0B9B-6A27-498F-BC7D-6B6647AAC39F%7D&file=IIS_Compression_new_API.pptx -->


## Blazor

This section describes new features for Blazor.

### .NET MAUI Blazor Hybrid and Web App solution template

A new solution template makes it easier to create .NET MAUI native and Blazor web client apps that share the same UI. This template shows how to create client apps that maximize code reuse and target Android, iOS, Mac, Windows, and Web.

Key features of this template include:

* The ability to choose a Blazor interactive render mode for the web app.
* Automatic creation of the appropriate projects, including a Blazor Web App (global Interactive Auto rendering) and a .NET MAUI Blazor Hybrid app.
* The created projects use a shared Razor class library (RCL) to maintain the UI's Razor components.
* Sample code is included that demonstrates how to use dependency injection to provide different interface implementations for the Blazor Hybrid app and the Blazor Web App.

To get started, install the [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) and install the .NET MAUI workload, which contains the template:

```dotnetcli
dotnet workload install maui
```

Create a solution from the project template in a command shell using the following command:

```dotnetcli
dotnet new maui-blazor-web
```

The template is also available in Visual Studio.

> **Note:**
> Currently, an exception occurs if Blazor rendering modes are defined at the per-page/component level. For more information, see [BlazorWebView needs a way to enable overriding ResolveComponentForRenderMode (`dotnet/aspnetcore` #51235)](https://github.com/dotnet/aspnetcore/issues/51235).

For more information, see [blazor/hybrid/tutorials/maui-blazor-web-app](../blazor/hybrid/tutorials/maui-blazor-web-app.md).

### Detect rendering location, interactivity, and assigned render mode at runtime

We've introduced a new API designed to simplify the process of querying component states at runtime. This API provides the following capabilities:

* **Determine the current execution location of the component**: This can be useful for debugging and optimizing component performance.
* **Check if the component is running in an interactive environment**: This can be helpful for components that have different behaviors based on the interactivity of their environment.
* **Retrieve the assigned render mode for the component**: Understanding the render mode can help in optimizing the rendering process and improving the overall performance of a component.

For more information, see [blazor/components/render-modes](../blazor/components/render-modes.md).

### Improved server-side reconnection experience:

The following enhancements have been made to the default server-side reconnection experience:

* When the user navigates back to an app with a disconnected circuit, reconnection is attempted immediately rather than waiting for the duration of the next reconnect interval. This improves the user experience when navigating to an app in a browser tab that has gone to sleep.

* When a reconnection attempt reaches the server but the server has already released the circuit, a page refresh occurs automatically. This prevents the user from having to manually refresh the page if it's likely going to result in a successful reconnection.

* Reconnect timing uses a computed backoff strategy. By default, the first several reconnection attempts occur in rapid succession without a retry interval before computed delays are introduced between attempts. You can customize the retry interval behavior by specifying a function to compute the retry interval, as the following exponential backoff example demonstrates:

  ```javascript
  Blazor.start({
    circuit: {
      reconnectionOptions: {
        retryIntervalMilliseconds: (previousAttempts, maxRetries) => 
          previousAttempts >= maxRetries ? null : previousAttempts * 1000
      },
    },
  });
  ```

* The styling of the default reconnect UI has been modernized.

For more information, see [blazor/fundamentals/signalr](../blazor/fundamentals/signalr.md).

### Simplified authentication state serialization for Blazor Web Apps

New APIs make it easier to add authentication to an existing Blazor Web App. When you create a new Blazor Web App with authentication using **Individual Accounts** and you enable WebAssembly-based interactivity, the project includes a custom [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) in both the server and client projects. 

These providers flow the user's authentication state to the browser. Authenticating on the server rather than the client allows the app to access authentication state during prerendering and before the .NET WebAssembly runtime is initialized.

The custom [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) implementations use the [Persistent Component State service](../blazor/state-management/prerendered-state-persistence.md) ([Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState)) to serialize the authentication state into HTML comments and read it back from WebAssembly to create a new [Microsoft.AspNetCore.Components.Authorization.AuthenticationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationState) instance. 

This works well if you've started from the Blazor Web App project template and selected the **Individual Accounts** option, but it's a lot of code to implement yourself or copy if you're trying to add authentication to an existing project. There are now APIs, which are now part of the Blazor Web App project template, that can be called in the server and client projects to add this functionality:

* [Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%252A): Adds the necessary services to serialize the authentication state on the server.
* [Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%252A): Adds the necessary services to deserialize the authentication state in the browser.

By default, the API only serializes the server-side name and role claims for access in the browser. An option can be passed to [Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%252A) to include all claims.

For more information, see the following sections of [blazor/security/index](../blazor/security/index.md):

* [Blazor Identity UI (Individual Accounts)](../blazor/security/index.md)
* [Manage authentication state in Blazor Web Apps](../blazor/security/index.md)

### Add static server-side rendering (SSR) pages to a globally-interactive Blazor Web App

With the release of .NET 9, it's now simpler to add static SSR pages to apps that adopt global interactivity.

This approach is only useful when the app has specific pages that can't work with interactive Server or WebAssembly rendering. For example, adopt this approach for pages that depend on reading/writing HTTP cookies and can only work in a request/response cycle instead of interactive rendering. For pages that work with interactive rendering, you shouldn't force them to use static SSR rendering, as it's less efficient and less responsive for the end user.

Mark any Razor component page with the new [`[ExcludeFromInteractiveRouting]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ExcludeFromInteractiveRoutingAttribute) assigned with the `@attribute` Razor directive:

```razor
@attribute [ExcludeFromInteractiveRouting]
```

Applying the attribute causes navigation to the page to exit from interactive routing. Inbound navigation is forced to perform a full-page reload instead resolving the page via interactive routing. The full-page reload forces the top-level root component, typically the `App` component (`App.razor`), to rerender from the server, allowing the app to switch to a different top-level render mode.

The [Microsoft.AspNetCore.Components.Routing.RazorComponentsEndpointHttpContextExtensions.AcceptsInteractiveRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.RazorComponentsEndpointHttpContextExtensions.AcceptsInteractiveRouting%252A) extension method allows the component to detect whether the [`[ExcludeFromInteractiveRouting]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ExcludeFromInteractiveRoutingAttribute) is applied to the current page.

In the `App` component, use the pattern in the following example:

* Pages that aren't annotated with the [`[ExcludeFromInteractiveRouting]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ExcludeFromInteractiveRoutingAttribute) default to the `InteractiveServer` render mode with global interactivity. You can replace `InteractiveServer` with `InteractiveWebAssembly` or `InteractiveAuto` to specify a different default global render mode.
* Pages annotated with the [`[ExcludeFromInteractiveRouting]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ExcludeFromInteractiveRoutingAttribute) adopt static SSR (`PageRenderMode` is assigned `null`).

```razor
<!DOCTYPE html>
<html>
<head>
    ...
    <HeadOutlet @rendermode="@PageRenderMode" />
</head>
<body>
    <Routes @rendermode="@PageRenderMode" />
    ...
</body>
</html>

@code {
    [CascadingParameter]
    private HttpContext HttpContext { get; set; } = default!;

    private IComponentRenderMode? PageRenderMode
        => HttpContext.AcceptsInteractiveRouting() ? InteractiveServer : null;
}
```

An alternative to using the [Microsoft.AspNetCore.Components.Routing.RazorComponentsEndpointHttpContextExtensions.AcceptsInteractiveRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Routing.RazorComponentsEndpointHttpContextExtensions.AcceptsInteractiveRouting%252A) extension method is to read endpoint metadata manually using `HttpContext.GetEndpoint()?.Metadata`.

This feature is covered by the reference documentation in [blazor/components/render-modes](../blazor/components/render-modes.md).

### Constructor injection

Razor components support constructor injection.

In the following example, the partial (code-behind) class injects the `NavigationManager` service using a [primary constructor](https://learn.microsoft.com/dotnet/csharp/whats-new/tutorials/primary-constructors):

```csharp
public partial class ConstructorInjection(NavigationManager navigation)
{
    private void HandleClick()
    {
        navigation.NavigateTo("/counter");
    }
}
```

For more information, see [blazor/fundamentals/dependency-injection](../blazor/fundamentals/dependency-injection.md).

### Websocket compression for Interactive Server components

By default, Interactive Server components enable compression for [WebSocket connections](../fundamentals/websockets.md) and set a `frame-ancestors` [Content Security Policy (CSP)](https://developer.mozilla.org/docs/Web/HTTP/Guides/CSP) directive set to `'self'` ([MDN's CSP reference guidance](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy)), which only permits embedding the app in an `<iframe>` of the origin from which the app is served when compression is enabled or when a configuration for the WebSocket context is provided.

Compression can be disabled by setting `ConfigureWebSocketOptions` to `null`, which reduces the [vulnerability of the app to attack](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23interactive-server-components-with-websocket-compression-enabled) but may result in reduced performance:

```csharp
.AddInteractiveServerRenderMode(o => o.ConfigureWebSocketOptions = null)
```

Configure a stricter `frame-ancestors` CSP with a value of `'none'` (single quotes required), which allows WebSocket compression but prevents browsers from embedding the app into any `<iframe>`:

```csharp
.AddInteractiveServerRenderMode(o => o.ContentSecurityFrameAncestorsPolicy = "'none'")
```

For more information, see the following resources:

* [blazor/fundamentals/signalr](../blazor/fundamentals/signalr.md)
* [blazor/security/interactive-server-side-rendering](../blazor/security/interactive-server-side-rendering.md)

### Handle keyboard composition events in Blazor

The new `KeyboardEventArgs.IsComposing` property indicates if the keyboard event [is part of a composition session](https://w3c.github.io/uievents/#dom-keyboardevent-iscomposing). Tracking the composition state of keyboard events is crucial for handling international character input methods.

### Added `OverscanCount` parameter to `QuickGrid`

The [`QuickGrid`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid) component now exposes an `OverscanCount` property that specifies how many additional rows are rendered before and after the visible region when virtualization is enabled.

The default `OverscanCount` is 3. The following example increases the `OverscanCount` to 4:

```razor
<QuickGrid ItemsProvider="itemsProvider" Virtualize="true" OverscanCount="4">
    ...
</QuickGrid>
```

### `InputNumber` component supports the `type="range"` attribute

The [Microsoft.AspNetCore.Components.Forms.InputNumber%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.InputNumber%25601) component now supports the [`type="range"` attribute](https://developer.mozilla.org/docs/Web/HTML/Element/input/range), which creates a range input that supports model binding and form validation, typically rendered as a slider or dial control rather than a text box:

```razor
<EditForm Model="Model" OnSubmit="Submit" FormName="EngineForm">
    <div>
        <label>
            Nacelle Count (2-6): 
            <InputNumber @bind-Value="Model!.NacelleCount" max="6" min="2" 
                step="1" type="range" />
        </label>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</EditForm>

@code {
    [SupplyParameterFromForm]
    private EngineSpecifications? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();

    private void Submit() {}

    public class EngineSpecifications
    {
        [Required, Range(minimum: 2, maximum: 6)]
        public int NacelleCount { get; set; }
    }
}
```

### New enhanced navigation events

Trigger JavaScript callbacks either before or after enhanced navigation with new event listeners:

* `blazor.addEventListener("enhancednavigationstart", {CALLBACK})`
* `blazor.addEventListener("enhancednavigationend", {CALLBACK})`

For more information, see [blazor/js-interop/ssr](../blazor/javascript-interoperability/static-server-rendering.md).

### Client-side request streaming

Interactive WebAssembly rendering in Blazor now supports client-side request streaming using the `request.SetBrowserRequestStreamingEnabled(true)` option on `HttpRequestMessage`. 

For more information, see the following resources:

* [blazor/call-web-api](../blazor/call-web-api.md)
* [blazor/file-uploads](../blazor/file-uploads.md)


## SignalR

This section describes new features for SignalR.

### Polymorphic type support in SignalR Hubs

Hub methods can now accept a base class instead of the derived class to enable polymorphic scenarios. The base type needs to be [annotated to allow polymorphism](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/polymorphism).

```csharp
public class MyHub : Hub
{
    public void Method(JsonPerson person)
    {
        if (person is JsonPersonExtended)
        {
        }
        else if (person is JsonPersonExtended2)
        {
        }
        else
        {
        }
    }
}

[JsonPolymorphic]
[JsonDerivedType(typeof(JsonPersonExtended), nameof(JsonPersonExtended))]
[JsonDerivedType(typeof(JsonPersonExtended2), nameof(JsonPersonExtended2))]
private class JsonPerson
{
    public string Name { get; set; }
    public Person Child { get; set; }
    public Person Parent { get; set; }
}

private class JsonPersonExtended : JsonPerson
{
    public int Age { get; set; }
}

private class JsonPersonExtended2 : JsonPerson
{
    public string Location { get; set; }
}
```


### Improved Activities for SignalR

SignalR now has an ActivitySource for both the hub server and client.

#### .NET SignalR server ActivitySource

The SignalR ActivitySource named `Microsoft.AspNetCore.SignalR.Server` emits events for hub method calls:

* Every method is its own activity, so anything that emits an activity during the hub method call is under the hub method activity.
* Hub method activities don't have a parent. This means they are not bundled under the long-running SignalR connection.

The following example uses the [Aspire dashboard](https://learn.microsoft.com/dotnet/aspire/fundamentals/dashboard/overview?tabs=bash#use-the-dashboard-with-aspire-projects) and the [OpenTelemetry](https://www.nuget.org/packages/OpenTelemetry.Extensions.Hosting) packages:

```xml
<PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" Version="1.9.0" />
<PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.9.0" />
<PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.9.0" />
```

Add the following startup code to the `Program.cs` file:

[Code reference unavailable in this source snapshot: aspnetcore-9/includes/~/release-notes/aspnetcore-9/samples/SignalRChatTraceExample/Program.cs?name=snippet_trace_signalr_server\\&highlight=1,10-23](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/release-notes/aspnetcore-9.0.md)

The following is example output from the Aspire Dashboard:

Activity list for SignalR Hub method call events

#### .NET SignalR client ActivitySource

The SignalR ActivitySource named `Microsoft.AspNetCore.SignalR.Client` emits events for a SignalR client:

* The .NET SignalR client has an `ActivitySource` named `Microsoft.AspNetCore.SignalR.Client`. Hub invocations now create a client span. Note that other SignalR clients, such as the JavaScript client, don't support tracing. This feature will be added to more clients in future releases.
* Hub invocations on the client and server support [context propagation](https://opentelemetry.io/docs/concepts/context-propagation/). Propagating the trace context enables true distributed tracing. It's now possible to see invocations flow from the client to the server and back.

Here's how these new activities look in the [Aspire dashboard](https://learn.microsoft.com/dotnet/aspire/fundamentals/dashboard/overview?tabs=bash#standalone-mode):

SignalR distributed tracing in Aspire dashboard 


### SignalR supports trimming and Native AOT

Continuing the [Native AOT journey](../fundamentals/native-aot.md) started in .NET 8, we have enabled trimming and native ahead-of-time (AOT) compilation support for both SignalR client and server scenarios. You can now take advantage of the performance benefits of using Native AOT in applications that use SignalR for real-time web communications.

#### Getting started

Install the latest [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0).

Create a solution from the `webapiaot` template in a command shell using the following command:

```dotnetcli
dotnet new webapiaot -o SignalRChatAOTExample
```

Replace the contents of the `Program.cs` file with the following SignalR code:

[Code reference unavailable in this source snapshot: aspnetcore-9/includes/~/release-notes/aspnetcore-9/samples/SignalRChatAOTExample/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/release-notes/aspnetcore-9.0.md)

The preceding example produces a native Windows executable of 10 MB and a Linux executable of 10.9 MB.

#### Limitations

* Only the JSON protocol is currently supported:
  * As shown in the preceding code, apps that use JSON serialization and Native AOT must use the `System.Text.Json` Source Generator. 
  * This follows the same approach as Minimal APIs.
* On the SignalR server, Hub method parameters of type `IAsyncEnumerable<T>` and `ChannelReader<T>` where `T` is a ValueType (`struct`) aren't supported. Using these types results in a runtime exception at startup in development and in the published app. For more information, see [SignalR: Using IAsyncEnumerable&lt;T&gt; and ChannelReader&lt;T&gt; with ValueTypes in native AOT (`dotnet/aspnetcore` #56179)](https://github.com/dotnet/aspnetcore/issues/56179).
* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-strongly-typed-hubs) aren't supported with Native AOT (`PublishAot`). Using strongly typed hubs with Native AOT will result in warnings during build and publish, and a runtime exception. Using strongly typed hubs with trimming (`PublishedTrimmed`) is supported.
  * Make sure to copy the names from `[HubMethodName(...)]` applied to the strongly typed hub interface methods into the `SendAsync` calls.
* Only `Task`, `Task<T>`, `ValueTask`, or `ValueTask<T>` are supported for async return types.



## Minimal APIs

This section describes new features for Minimal APIs.

### Added `InternalServerError` and `InternalServerError<TValue>` to `TypedResults`

The [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) class is a helpful vehicle for returning strongly-typed HTTP status code-based responses from a Minimal API.  `TypedResults` now includes factory methods and types for returning "500 Internal Server Error" responses from endpoints. Here's an example that returns a 500 response:

```csharp
var app = WebApplication.Create();

app.MapGet("/", () => TypedResults.InternalServerError("Something went wrong!"));

app.Run();
```


### Call `ProducesProblem` and `ProducesValidationProblem` on route groups

The `ProducesProblem` and `ProducesValidationProblem` extension methods have been updated to support their use on route groups. These methods indicate that all endpoints in a route group can return `ProblemDetails` or `ValidationProblemDetails` responses for the purposes of OpenAPI metadata.

```csharp
var app = WebApplication.Create();

var todos = app.MapGroup("/todos")
    .ProducesProblem();

todos.MapGet("/", () => new Todo(1, "Create sample app", false));
todos.MapPost("/", (Todo todo) => Results.Ok(todo));

app.Run();

record Todo(int Id, string Title, boolean IsCompleted);
```

### `Problem` and `ValidationProblem` result types support construction with `IEnumerable<KeyValuePair<string, object?>>` values

Prior to .NET 9, constructing [Problem](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.typedresults.problem) and [ValidationProblem](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.http.typedresults.validationproblem) result types in Minimal APIs required that the `errors` and `extensions` properties be initialized with an implementation of `IDictionary<string, object?>`. In this release, these construction APIs support overloads that consume `IEnumerable<KeyValuePair<string, object?>>`.

[language="csharp" source="\~/fundamentals/openapi/samples/9.x/ProducesProblem/Program.cs" id="snippet_2" ::: (complete source file; reference: \~/fundamentals/openapi/samples/9.x/ProducesProblem/Program.cs)](../../_code/aspnetcore/fundamentals/openapi/samples/9.x/ProducesProblem/Program.cs.md)

Thanks to Joseph Goldman for this contribution!


## OpenAPI

This section describes new features for OpenAPI

### Built-in support for OpenAPI document generation

The [OpenAPI specification](https://www.openapis.org/) is a standard for describing HTTP APIs. The standard allows developers to define the shape of APIs that can be plugged into client generators, server generators, testing tools, documentation, and more. In .NET 9, ASP.NET Core provides built-in support for generating OpenAPI documents representing controller-based or Minimal APIs via the [Microsoft.AspNetCore.OpenApi](https://nuget.org/packages/Microsoft.AspNetCore.OpenApi) package.

The following highlighted code calls:

* `AddOpenApi` to register the required dependencies into the app's DI container.
* `MapOpenApi` to register the required OpenAPI endpoints in the app's routes.

[language="csharp" source="\~/release-notes/aspnetcore-9/samples/OpenApiExample/Program.cs" highlight="3,7"::: (complete source file; reference: \~/release-notes/aspnetcore-9/samples/OpenApiExample/Program.cs)](../../_code/aspnetcore/release-notes/aspnetcore-9/samples/OpenApiExample/Program.cs.md)

Install the [`Microsoft.AspNetCore.OpenApi`](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi) package in the project using the following command:

```dotnetcli
dotnet add package Microsoft.AspNetCore.OpenApi
```

Run the app and navigate to `openapi/v1.json` to view the generated OpenAPI document:

OpenAPI document

OpenAPI documents can also be generated at build-time by adding the [`Microsoft.Extensions.ApiDescription.Server`](https://www.nuget.org/packages/Microsoft.Extensions.ApiDescription.Server) package:

```dotnetcli
dotnet add package Microsoft.Extensions.ApiDescription.Server
```

To modify the location of the emitted OpenAPI documents, set the target path in the OpenApiDocumentsDirectory property in the app's project file:

[language="xml" source="\~/release-notes/aspnetcore-9/samples/OpenApiExample/OpenApiExample.csproj" range="9-11"::: (complete source file; reference: \~/release-notes/aspnetcore-9/samples/OpenApiExample/OpenApiExample.csproj)](../../_code/aspnetcore/release-notes/aspnetcore-9/samples/OpenApiExample/OpenApiExample.csproj.md)

Run `dotnet build` and inspect the generated JSON file in the project directory.

OpenAPI document generation at build-time

ASP.NET Core's built-in OpenAPI document generation provides support for various customizations and options. It provides document, operation, and schema transformers and has the ability to manage multiple OpenAPI documents for the same application.

To learn more about ASP.NET Core's new OpenAPI document capabilities, see [the new Microsoft.AspNetCore.OpenApi docs](https://aka.ms/aspnet/openapi).


### Microsoft.AspNetCore.OpenApi supports trimming and Native AOT

OpenAPI in ASP.NET Core supports trimming and native AOT. The following steps create and publish an OpenAPI app with trimming and native AOT:

Create a new ASP.NET Core Web API (Native AOT) project.

```console
dotnet new webapiaot
```

Add the Microsoft.AspNetCore.OpenAPI package.

```console
dotnet add package Microsoft.AspNetCore.OpenApi
```

Update `Program.cs` to enable generating OpenAPI documents.

```diff
+ builder.Services.AddOpenApi();

var app = builder.Build();

+ app.MapOpenApi();
```

Publish the app.

```console
dotnet publish
```


## Authentication and authorization

This section describes new features for authentication and authorization.

### OpenIdConnectHandler adds support for Pushed Authorization Requests (PAR)

We'd like to thank [Joe DeCock](https://github.com/josephdecock) from [Duende Software](https://github.com/DuendeSoftware) for adding Pushed Authorization Requests (PAR) to ASP.NET Core's [OpenIdConnectHandler](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authentication.openidconnect.openidconnecthandler). Joe described the background and motivation for enabling PAR in [his API proposal](https://github.com/dotnet/aspnetcore/issues/51686) as follows:

> Pushed Authorization Requests (PAR) is a relatively new [OAuth standard](https://datatracker.ietf.org/doc/html/rfc9126) that improves the security of OAuth and OIDC flows by moving authorization parameters from the front channel to the back channel. Thats is, moving authorization parameters from redirect URLs in the browser to direct machine to machine http calls on the back end.
>
> This prevents a cyberattacker in the browser from:
>
> * Seeing authorization parameters, which could leak PII.
> * Tampering with those parameters. For example, the cyberattacker could change the scope of access being requested.
>
> Pushing the authorization parameters also keeps request URLs short. Authorize parameters can get very long when using more complex OAuth and OIDC features such as [Rich Authorization Requests](https://oauth.net/2/rich-authorization-requests/). URLs that are long cause issues in many browsers and networking infrastructures.
>
> The use of PAR is encouraged by the [FAPI working group](https://openid.net/wg/fapi/) within the OpenID Foundation. For example, [the FAPI2.0 Security Profile](https://openid.bitbucket.io/fapi/fapi-2_0-security-profile.html) requires the use of PAR. This security profile is used by many of the groups working on open banking (primarily in Europe), in health care, and in other industries with high security requirements.
>
> PAR is supported by a number of identity providers, including
>
> * [Duende IdentityServer](https://duendesoftware.com/products/identityserver)
> * [Curity](https://curity.io/product/)
> * [Keycloak](https://www.keycloak.org/)
> * [Authlete](https://www.authlete.com/developers/tutorial/oidc/)

For .NET 9, we have decided to enable PAR by default if the identity provider's discovery document advertises support for PAR, since it should provide enhanced security for providers that support it. The identity provider's discovery document is usually found at `.well-known/openid-configuration`. If this causes problems, you can disable PAR via <!--keep--> [OpenIdConnectOptions.PushedAuthorizationBehavior](https://source.dot.net/#Microsoft.AspNetCore.Authentication.OpenIdConnect/OpenIdConnectOptions.cs,99014cc0333b1603) as follows:

[language="csharp" source="\~/release-notes/aspnetcore-9/samples/PAR/Program.cs" id="snippet_1" highlight="8-99"::: (complete source file; reference: \~/release-notes/aspnetcore-9/samples/PAR/Program.cs)](../../_code/aspnetcore/release-notes/aspnetcore-9/samples/PAR/Program.cs.md)

To ensure that authentication only succeeds if PAR is used, use <!--keep-->  [PushedAuthorizationBehavior.Require](https://source.dot.net/#Microsoft.AspNetCore.Authentication.OpenIdConnect/PushedAuthorizationBehavior.cs,3af73de8f33b70c5) instead. This change also introduces a new [OnPushAuthorization](https://source.dot.net/#Microsoft.AspNetCore.Authentication.OpenIdConnect/Events/OpenIdConnectEvents.cs,6a21c8f3a90753c1) event to [OpenIdConnectEvents](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authentication.openidconnect.openidconnectevents) which can be used customize the pushed authorization request or handle it manually. See the [API proposal](https://github.com/dotnet/aspnetcore/issues/51686) for more details.


### OIDC and OAuth Parameter Customization

The OAuth and OIDC authentication handlers now have an `AdditionalAuthorizationParameters` option to make it easier to customize authorization message parameters that are usually included as part of the redirect query string. In .NET 8 or earlier, this requires a custom [Microsoft.AspNetCore.Authentication.WsFederation.WsFederationEvents.OnRedirectToIdentityProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.WsFederation.WsFederationEvents.OnRedirectToIdentityProvider) callback or overridden [Microsoft.AspNetCore.Authentication.OAuth.OAuthHandler%601.BuildChallengeUrl%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OAuth.OAuthHandler%25601.BuildChallengeUrl%252A) method in a custom handler. Here's an example of .NET 8 code:

```csharp
builder.Services.AddAuthentication().AddOpenIdConnect(options =>
{
    options.Events.OnRedirectToIdentityProvider = context =>
    {
        context.ProtocolMessage.SetParameter("prompt", "login");
        context.ProtocolMessage.SetParameter("audience", "https://api.example.com");
        return Task.CompletedTask;
    };
});
```

The preceding example can now be simplified to the following code:

```csharp
builder.Services.AddAuthentication().AddOpenIdConnect(options =>
{
    options.AdditionalAuthorizationParameters.Add("prompt", "login");
    options.AdditionalAuthorizationParameters.Add("audience", "https://api.example.com");
});
```


### Configure HTTP.sys extended authentication flags

You can now configure the [`HTTP_AUTH_EX_FLAG_ENABLE_KERBEROS_CREDENTIAL_CACHING`](https://learn.microsoft.com/windows/win32/api/http/ns-http-http_server_authentication_info) and [`HTTP_AUTH_EX_FLAG_CAPTURE_CREDENTIAL`](https://learn.microsoft.com/windows/win32/api/http/ns-http-http_server_authentication_info) HTTP.sys flags by using the new `EnableKerberosCredentialCaching` and `CaptureCredentials` properties on the HTTP.sys [Microsoft.AspNetCore.Server.HttpSys.AuthenticationManager](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.HttpSys.AuthenticationManager) to optimize how Windows authentication is handled. For example:

```csharp
webBuilder.UseHttpSys(options =>
{
    options.Authentication.Schemes = AuthenticationSchemes.Negotiate;
    options.Authentication.EnableKerberosCredentialCaching = true;
    options.Authentication.CaptureCredentials = true;
});
```


## Miscellaneous

The following sections describe miscellaneous new features.

### New `HybridCache` library

> **Important:**
> `HybridCache` is currently still in preview but will be fully released *after* .NET 9 in a future minor release of .NET Extensions.

The [Microsoft.Extensions.Caching.Hybrid.HybridCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Hybrid.HybridCache) API bridges some gaps in the existing [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) and [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache) APIs. It also adds new capabilities, such as:

* **"Stampede" protection** to prevent parallel fetches of the same work.
* Configurable serialization.

`HybridCache` is designed to be a drop-in replacement for existing `IDistributedCache` and `IMemoryCache` usage, and it provides a simple API for adding new caching code. It provides a unified API for both in-process and out-of-process caching.

To see how the `HybridCache` API is simplified, compare it to code that uses `IDistributedCache`. Here's an example of what using `IDistributedCache` looks like:

```csharp
public class SomeService(IDistributedCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = default)
    {
        var key = $"someinfo:{name}:{id}"; // Unique key for this combination.
        var bytes = await cache.GetAsync(key, token); // Try to get from cache.
        SomeInformation info;
        if (bytes is null)
        {
            // Cache miss; get the data from the real source.
            info = await SomeExpensiveOperationAsync(name, id, token);

            // Serialize and cache it.
            bytes = SomeSerializer.Serialize(info);
            await cache.SetAsync(key, bytes, token);
        }
        else
        {
            // Cache hit; deserialize it.
            info = SomeSerializer.Deserialize<SomeInformation>(bytes);
        }
        return info;
    }

    // This is the work we're trying to cache.
    private async Task<SomeInformation> SomeExpensiveOperationAsync(string name, int id,
        CancellationToken token = default)
    { /* ... */ }
}
```

That's a lot of work to get right each time, including things like serialization. And in the cache miss scenario, you could end up with multiple concurrent threads, all getting a cache miss, all fetching the underlying data, all serializing it, and all sending that data to the cache.

To simplify and improve this code with `HybridCache`, we first need to add the new library `Microsoft.Extensions.Caching.Hybrid`:

```xml
<PackageReference Include="Microsoft.Extensions.Caching.Hybrid" Version="9.0.0" />
```

Register the `HybridCache` service, like you would register an `IDistributedCache` implementation:

```csharp
builder.Services.AddHybridCache(); // Not shown: optional configuration API.
```

Now most caching concerns can be offloaded to `HybridCache`:

```csharp
public class SomeService(HybridCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = default)
    {
        return await cache.GetOrCreateAsync(
            $"someinfo:{name}:{id}", // Unique key for this combination.
            async cancel => await SomeExpensiveOperationAsync(name, id, cancel),
            token: token
        );
    }
}
```

We provide a concrete implementation of the `HybridCache` abstract class via dependency injection, but it's intended that developers can provide custom implementations of the API. The `HybridCache` implementation deals with everything related to caching, including concurrent operation handling. The `cancel` token here represents the combined cancellation of *all* concurrent callers&mdash;not just the cancellation of the caller we can see (that is, `token`).

High throughput scenarios can be further optimized by using the `TState` pattern, to avoid some overhead from captured variables and per-instance callbacks:

```csharp
public class SomeService(HybridCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync(string name, int id, CancellationToken token = default)
    {
        return await cache.GetOrCreateAsync(
            $"someinfo:{name}:{id}", // unique key for this combination
            (name, id), // all of the state we need for the final call, if needed
            static async (state, token) =>
                await SomeExpensiveOperationAsync(state.name, state.id, token),
            token: token
        );
    }
}
```

`HybridCache` uses the configured `IDistributedCache` implementation, if any, for secondary out-of-process caching, for example, using
Redis. But even without an `IDistributedCache`, the `HybridCache` service will still provide in-process caching and "stampede" protection.

#### A note on object reuse

In typical existing code that uses `IDistributedCache`, every retrieval of an object from the cache results in deserialization. This behavior means that each concurrent caller gets a separate instance of the object, which cannot interact with other instances. The result is thread safety, as there's no risk of concurrent modifications to the same object instance.

Because a lot of `HybridCache` usage will be adapted from existing `IDistributedCache` code, `HybridCache` preserves this behavior by default to avoid introducing concurrency bugs. However, a given use case is inherently thread-safe:

* If the types being cached are immutable.
* If the code doesn't modify them.

In such cases, inform `HybridCache` that it's safe to reuse instances by making both of the following changes:

* Marking the type as `sealed`. The `sealed` keyword in C# means that the class can't be inherited.
* Applying the `[ImmutableObject(true)]` attribute to it. The `[ImmutableObject(true)]` attribute indicates that the object's state can't be changed after it's created.

By reusing instances, `HybridCache` can reduce the overhead of CPU and object allocations associated with per-call deserialization. This can lead to performance improvements in scenarios where the cached objects are large or accessed frequently.

#### Other `HybridCache` features

Like `IDistributedCache`, `HybridCache` supports removal by key with a `RemoveKeyAsync` method.

`HybridCache` also provides optional APIs for `IDistributedCache` implementations, to avoid `byte[]` allocations. This feature is implemented
by the preview versions of the `Microsoft.Extensions.Caching.StackExchangeRedis`,  `Microsoft.Extensions.Caching.SqlServer`, and `Microsoft.Extensions.Caching.Postgres` packages.

Serialization is configured as part of registering the service, with support for type-specific and generalized serializers via the
`WithSerializer` and `.WithSerializerFactory` methods, chained from the `AddHybridCache` call. By default, the library
handles `string` and `byte[]` internally, and uses `System.Text.Json` for everything else, but you can use protobuf, xml, or anything
else.

`HybridCache` supports older .NET runtimes, down to .NET Framework 4.7.2 and .NET Standard 2.0.

For more information about `HybridCache`, see [performance/caching/hybrid](../performance/caching/hybrid.md)


### Developer exception page improvements

The [ASP.NET Core developer exception page](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling%23developer-exception-page) is displayed when an app throws an unhandled exception during development. The developer exception page provides detailed information about the exception and request.

Preview 3 added endpoint metadata to the developer exception page. ASP.NET Core uses endpoint metadata to control endpoint behavior, such as routing, response caching, rate limiting, OpenAPI generation, and more. The following image shows the new metadata information in the `Routing` section of the developer exception page:

The new metadata information on the developer exception page

While testing the developer exception page, small quality of life improvements were identified. They shipped in Preview 4:

* Better text wrapping. Long cookies, query string values, and method names no longer add horizontal browser scroll bars.
* Bigger text which is found in modern designs.
* More consistent table sizes.

The following animated image shows the new developer exception page:

The new developer exception page


### Dictionary debugging improvements

The debugging display of dictionaries and other key-value collections has an improved layout. The key is displayed in the debugger's key column instead of being concatenated with the value. The following images show the old and new display of a dictionary in the debugger.

Before:

The previous debugger experience

After:

The new debugger experience

ASP.NET Core has many key-value collections. This improved debugging experience applies to:

* HTTP headers
* Query strings
* Forms
* Cookies
* View data
* Route data
* Features


### Fix for 503's during app recycle in IIS

By default there is now a 1 second delay between when IIS is notified of a recycle or shutdown and when ANCM tells the managed server to start shutting down. The delay is configurable via the `ANCM_shutdownDelay` environment variable or by setting the `shutdownDelay` handler setting. Both values are in milliseconds. The delay is mainly to reduce the likelihood of a race where:

* IIS hasn't started queuing requests to go to the new app.
* ANCM starts rejecting new requests that come into the old app.

Slower machines or machines with heavier CPU usage may want to adjust this value to reduce 503 likelihood.

Example of setting `shutdownDelay`:

```xml
<aspNetCore processPath="dotnet" arguments="myapp.dll" stdoutLogEnabled="false" stdoutLogFile=".logsstdout">
  <handlerSettings>
    <!-- Milliseconds to delay shutdown by.
    this doesn't mean incoming requests will be delayed by this amount,
    but the old app instance will start shutting down after this timeout occurs -->
    <handlerSetting name="shutdownDelay" value="5000" />
  </handlerSettings>
</aspNetCore>
```

The fix is in the globally installed ANCM module that comes from the hosting bundle.


### ASP0026: Analyzer to warn when [Authorize] is overridden by [AllowAnonymous] from "farther away"

It seems intuitive that an `[Authorize]` attribute placed "closer" to an MVC action than an `[AllowAnonymous]` attribute would override the `[AllowAnonymous]` attribute and force authorization. However, this is not necessarily the case. What does matter is the relative order of the attributes.

> **Note:**
> The `[AllowAnonymous]` attribute doesn't disable authentication entirely. When credentials are sent to an endpoint with `[AllowAnonymous]`, the endpoint still authenticates those credentials and establishes the user's identity. The `[AllowAnonymous]` attribute only means that authentication is **not required**—the endpoint will run as anonymous only when no credentials are provided. This behavior can be useful for endpoints that need to work for both authenticated and anonymous users.

The following code shows examples where a closer `[Authorize]` attribute gets overridden by an `[AllowAnonymous]` attribute that is farther away.

```csharp
[AllowAnonymous]
public class MyController
{
    [Authorize] // Overridden by the [AllowAnonymous] attribute on the class
    public IActionResult Private() => null;
}
```

```csharp
[AllowAnonymous]
public class MyControllerAnon : ControllerBase
{
}

[Authorize] // Overridden by the [AllowAnonymous] attribute on MyControllerAnon
public class MyControllerInherited : MyControllerAnon
{
}

public class MyControllerInherited2 : MyControllerAnon
{
    [Authorize] // Overridden by the [AllowAnonymous] attribute on MyControllerAnon
    public IActionResult Private() => null;
}
```

```csharp
[AllowAnonymous]
[Authorize] // Overridden by the preceding [AllowAnonymous]
public class MyControllerMultiple : ControllerBase
{
}
```

In .NET 9 Preview 6, we've introduced an analyzer that will highlight instances like these where a closer `[Authorize]` attribute gets overridden by an `[AllowAnonymous]` attribute that is farther away from an MVC action. The warning points to the overridden `[Authorize]` attribute with the following message:

```
ASP0026 [Authorize] overridden by [AllowAnonymous] from farther away
```

The correct action to take if you see this warning depends on the intention behind the attributes. The farther away `[AllowAnonymous]` attribute should be removed if it's unintentionally exposing the endpoint to anonymous users. If the `[AllowAnonymous]` attribute was intended to override a closer `[Authorize]` attribute, you can repeat the `[AllowAnonymous]` attribute after the `[Authorize]` attribute to clarify the intent.

```csharp
[AllowAnonymous]
public class MyController
{
    // This produces no warning because the second, "closer" [AllowAnonymous]
    // clarifies that [Authorize] is intentionally overridden.
    // Specifying AuthenticationSchemes can be useful for endpoints that
    // allow but don't require authenticated users. When credentials are sent,
    // they will be authenticated; when no credentials are sent, the endpoint
    // allows anonymous access.
    [Authorize(AuthenticationSchemes = "Cookies")]
    [AllowAnonymous]
    public IActionResult Privacy() => null;
}
```


### Improved Kestrel connection metrics

We've made a significant improvement to Kestrel's connection metrics by including metadata about why a connection failed. The [`kestrel.connection.duration`](https://learn.microsoft.com/dotnet/core/diagnostics/built-in-metrics-aspnetcore#metric-kestrelconnectionduration) metric now includes the connection close reason in the `error.type` attribute.

Here is a small sample of the `error.type` values:

* `tls_handshake_failed` - The connection requires TLS, and the TLS handshake failed.
* `connection_reset` - The connection was unexpectedly closed by the client while requests were in progress.
* `request_headers_timeout` - Kestrel closed the connection because it didn't receive request headers in time.
* `max_request_body_size_exceeded` - Kestrel closed the connection because uploaded data exceeded max size.

Previously, diagnosing Kestrel connection issues required a server to record detailed, low-level logging. However, logs can be expensive to generate and store, and it can be difficult to find the right information among the noise.

Metrics are a much cheaper alternative that can be left on in a production environment with minimal impact. Collected metrics can [drive dashboards and alerts](https://learn.microsoft.com/search/?terms=metrics%2Foverview%23show-metrics-on-a-grafana-dashboard). Once a problem is identified at a high-level with metrics, further investigation using logging and other tooling can begin.

We expect improved connection metrics to be useful in many scenarios:

* Investigating performance issues caused by short connection lifetimes.
* Observing ongoing external attacks on Kestrel that impact performance and stability.
* Recording attempted external attacks on Kestrel that Kestrel's built-in security hardening prevented.

For more information, see [metrics/overview](../metrics/overview.md).


### Customize Kestrel named pipe endpoints

Kestrel's named pipe support has been improved with advanced customization options. The new `CreateNamedPipeServerStream` method on the named pipe options allows pipes to be customized per-endpoint.

An example of where this is useful is a Kestrel app that requires two pipe endpoints with different [access security](https://learn.microsoft.com/windows/win32/ipc/named-pipe-security-and-access-rights). The `CreateNamedPipeServerStream` option can be used to create pipes with custom security settings, depending on the pipe name.


```csharp
var builder = WebApplication.CreateBuilder();

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenNamedPipe("pipe1");
    options.ListenNamedPipe("pipe2");
});

builder.WebHost.UseNamedPipes(options =>
{
    options.CreateNamedPipeServerStream = (context) =>
    {
        var pipeSecurity = CreatePipeSecurity(context.NamedPipeEndpoint.PipeName);

        return NamedPipeServerStreamAcl.Create(context.NamedPipeEndPoint.PipeName, PipeDirection.InOut,
            NamedPipeServerStream.MaxAllowedServerInstances, PipeTransmissionMode.Byte,
            context.PipeOptions, inBufferSize: 0, outBufferSize: 0, pipeSecurity);
    };
});
```


### `ExceptionHandlerMiddleware` option to choose the status code based on the exception type

A new option when configuring the `ExceptionHandlerMiddleware` enables app developers to choose what status code to return when an exception occurs during request handling. The new option changes the status code being set in the `ProblemDetails` response from the `ExceptionHandlerMiddleware`.

```csharp
app.UseExceptionHandler(new ExceptionHandlerOptions
{
    StatusCodeSelector = ex => ex is TimeoutException
        ? StatusCodes.Status503ServiceUnavailable
        : StatusCodes.Status500InternalServerError,
});
```


### Opt-out of HTTP metrics on certain endpoints and requests

.NET 9 introduces the ability to opt-out of HTTP metrics for specific endpoints and requests. Opting out of recording metrics is beneficial for endpoints frequently called by automated systems, such as health checks. Recording metrics for these requests is generally unnecessary.

HTTP requests to an endpoint can be excluded from metrics by adding metadata. Either:

* Add the [`[DisableHttpMetrics]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.DisableHttpMetricsAttribute) to the Web API controller, SignalR hub or gRPC service.
* Call [Microsoft.AspNetCore.Builder.HttpMetricsEndpointConventionBuilderExtensions.DisableHttpMetrics%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpMetricsEndpointConventionBuilderExtensions.DisableHttpMetrics%252A) when mapping endpoints in app startup:

[language="csharp" source="\~/release-notes/aspnetcore-9/samples/Metrics/Program.cs" id="snippet_1" highlight="5"::: (complete source file; reference: \~/release-notes/aspnetcore-9/samples/Metrics/Program.cs)](../../_code/aspnetcore/release-notes/aspnetcore-9/samples/Metrics/Program.cs.md)

The `MetricsDisabled` property has been added to `IHttpMetricsTagsFeature` for:

* Advanced scenarios where a request doesn't map to an endpoint.
* Dynamically disabling metrics collection for specific HTTP requests.

[language="csharp" source="\~/release-notes/aspnetcore-9/samples/Metrics/Program.cs" id="snippet_2"::: (complete source file; reference: \~/release-notes/aspnetcore-9/samples/Metrics/Program.cs)](../../_code/aspnetcore/release-notes/aspnetcore-9/samples/Metrics/Program.cs.md)


### Data Protection support for deleting keys

Prior to .NET 9, data protection keys were ___not___ deletable by design, to prevent data loss. Deleting a key renders its protected data irretrievable. Given their small size, the accumulation of these keys generally posed minimal impact. However, to accommodate extremely long-running services, we have introduced the option to delete keys. Generally, only old keys should be deleted. Only delete keys when you can accept the risk of data loss in exchange for storage savings. We recommend data protection keys should ___not___ be deleted.

[language="csharp" source="\~/security/data-protection/configuration/samples/9.x/deleteKeys/Program.cs"::: (complete source file; reference: \~/security/data-protection/configuration/samples/9.x/deleteKeys/Program.cs)](../../_code/aspnetcore/security/data-protection/configuration/samples/9.x/deleteKeys/Program.cs.md)


### Middleware supports Keyed DI

Middleware now supports [Keyed DI](https://learn.microsoft.com/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-9.0\&preserve-view=true#keyed-services) in both the constructor and the `Invoke`/`InvokeAsync` method:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/samples/KeyedServices9/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/release-notes/aspnetcore-9.0.md)


#### Trust the ASP.NET Core HTTPS development certificate on Linux

On Ubuntu and Fedora based Linux distros, `dotnet dev-certs https --trust` now configures ASP.NET Core HTTPS development certificate as a trusted certificate for:

* Chromium browsers, for example, Google Chrome, Microsoft Edge, and Chromium.
* Mozilla Firefox and Mozilla derived browsers.
* .NET APIs, for example, [HttpClient](https://learn.microsoft.com/dotnet/api/system.net.http.httpclient)

Previously, `--trust` only worked on Windows and macOS. Certificate trust is applied per-user.

To establish trust in OpenSSL, the `dev-certs` tool:

* Puts the certificate in `~/.aspnet/dev-certs/trust`
* Runs a simplified version of OpenSSL's [c_rehash tool](https://docs.openssl.org/1.0.2/man1/c_rehash/) on the directory.
* Asks the user to update the `SSL_CERT_DIR` environment variable.

To establish trust in dotnet, the tool puts the certificate in the `My/Root` certificate store.

To establish trust in [NSS databases](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/developer_guide/che-nsslib), if any, the tool searches the home directory for Firefox profiles, `~/.pki/nssdb`, and `~/snap/chromium/current/.pki/nssdb`. For each directory found, the tool adds an entry to the `nssdb`.


### Templates updated to latest Bootstrap, jQuery, and jQuery Validation versions

The ASP.NET Core project templates and libraries have been updated to use the latest versions of Bootstrap, jQuery, and jQuery Validation, specifically:

* Bootstrap 5.3.3
* jQuery 3.7.1
* jQuery Validation 1.21.0


## Breaking changes

Use the articles in [Breaking changes in .NET](https://learn.microsoft.com/dotnet/core/compatibility/breaking-changes) to find breaking changes that might apply when upgrading an app to a newer version of .NET.
