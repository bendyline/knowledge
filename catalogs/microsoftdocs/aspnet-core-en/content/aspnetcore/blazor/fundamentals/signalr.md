---
title: ASP.NET Core Blazor SignalR guidance
author: guardrex
description: Learn how to configure and manage Blazor SignalR connections.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/fundamentals/signalr
---
# ASP.NET Core Blazor SignalR guidance

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


This article explains how to configure and manage SignalR connections in Blazor apps.

For general guidance on ASP.NET Core SignalR configuration, see the topics in the [signalr/introduction](../../signalr/introduction.md) area of the documentation, especially [signalr/configuration#configure-server-options](https://learn.microsoft.com/search/?terms=signalr%2Fconfiguration%23configure-server-options).

Server-side apps use ASP.NET Core SignalR to communicate with the browser. [SignalR's hosting and scaling conditions](../../signalr/publish-to-azure-web-app.md) apply to server-side apps.

Blazor works best when using WebSockets as the SignalR transport due to lower latency, reliability, and [security](../../signalr/security.md). Long Polling is used by SignalR when WebSockets isn't available or when the app is explicitly configured to use Long Polling.

**Applies to: \>= aspnetcore-8.0**

## Azure SignalR Service with stateful reconnect

The Azure SignalR Service with SDK [v1.26.1](https://github.com/Azure/azure-signalr/releases/tag/v1.26.1) or later supports [SignalR stateful reconnect](https://learn.microsoft.com/search/?terms=signalr%2Fconfiguration%23configure-stateful-reconnect) ([Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderHttpExtensions.WithStatefulReconnect%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderHttpExtensions.WithStatefulReconnect%252A)).



**Applies to: \>= aspnetcore-9.0**

## WebSocket compression for Interactive Server components

By default, Interactive Server components:

* Enable compression for [WebSocket connections](../../fundamentals/websockets.md). [Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.DisableWebSocketCompression](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.DisableWebSocketCompression) (default: `false`) controls WebSocket compression.

* Adopt a [`frame-ancestors`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) Content Security Policy (CSP) directive set to `'self'`, which is the default and only permits embedding the app in an `<iframe>` of the origin from which the app is served when compression is enabled or when a configuration for the WebSocket context is provided.

The default `frame-ancestors` CSP can be changed by setting the value of [Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy%252A) to `null` if you want to [configure the CSP in a centralized way](../security/content-security-policy.md) or `'none'` for an even stricter policy. When the `frame-ancestors` CSP is managed in a centralized fashion, care must be taken to apply a policy whenever the first document is rendered. We don't recommend removing the policy completely, as it will make the app vulnerable to attack. For more information, see [blazor/security/content-security-policy#the-frame-ancestors-directive](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fcontent-security-policy%23the-frame-ancestors-directive) and the [MDN CSP Guide](https://developer.mozilla.org/docs/Web/HTTP/Guides/CSP).

Use [Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ConfigureWebSocketAcceptContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ConfigureWebSocketAcceptContext) to configure the [Microsoft.AspNetCore.Http.WebSocketAcceptContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.WebSocketAcceptContext) for the WebSocket connections used by the server components. By default, a policy that enables compression and sets a CSP for the frame ancestors defined in [Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy) is applied.

Usage examples:

Disable compression by setting [Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.DisableWebSocketCompression](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.DisableWebSocketCompression) to `true`, which reduces the [vulnerability of the app to attack](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23interactive-server-components-with-websocket-compression-enabled) but may result in reduced performance:

```csharp
builder.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode(o => o.DisableWebSocketCompression = true)
```

When compression is enabled, configure a stricter `frame-ancestors` CSP with a value of `'none'` (single quotes required), which allows WebSocket compression but prevents browsers from embedding the app into an `<iframe>`:

```csharp
builder.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode(o => o.ContentSecurityFrameAncestorsPolicy = "'none'")
```

When compression is enabled, remove the `frame-ancestors` CSP by setting [Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy) to `null`. This scenario is only recommended for apps that [set the CSP in a centralized way](../security/content-security-policy.md):

```csharp
builder.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode(o => o.ContentSecurityFrameAncestorsPolicy = null)
```

> **Important:**
> Browsers apply CSP directives from multiple CSP headers using the strictest policy directive value. Therefore, a developer can't add a weaker `frame-ancestors` policy than `'self'` on purpose or by mistake.
>
> Single quotes are required on the string value passed to [Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy):
>
> <span aria-hidden="true">❌</span><span class="visually-hidden">Unsupported values:</span> `none`, `self`
>
> <span aria-hidden="true">✔️</span><span class="visually-hidden">Supported values:</span> `'none'`, `'self'`
>
> Additional options include specifying one or more host sources and scheme sources.

For security implications, see [blazor/security/interactive-server-side-rendering#interactive-server-components-with-websocket-compression-enabled](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23interactive-server-components-with-websocket-compression-enabled). For more information, see [blazor/security/content-security-policy](../security/content-security-policy.md) and [CSP: `frame-ancestors` (MDN documentation)](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors).



**Applies to: \>= aspnetcore-11.0**

### SignalR `ConfigureConnection` for Interactive Server components

<!-- UPDATE 11.0 - API Browser cross-links -->

Blazor provides access to configure the underlying SignalR connection options when using Interactive Server components through the `ConfigureConnection` property on `ServerComponentsEndpointOptions`. This enables configuration of `HttpConnectionDispatcherOptions` properties.

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode(options =>
    {
        options.ConfigureConnection = dispatcherOptions =>
        {
            dispatcherOptions.CloseOnAuthenticationExpiration = true;
            dispatcherOptions.AllowStatefulReconnects = true;
            dispatcherOptions.ApplicationMaxBufferSize = 1024 * 1024;
        };
    });
```

This provides a clean, type-safe API for configuring SignalR connection settings without needing to inspect endpoint metadata.



**Applies to: \>= aspnetcore-6.0**

## Disable response compression for Hot Reload

When using [Hot Reload](../../test/hot-reload.md), disable response compression middleware in the `Development` environment. Whether or not the default code from a project template is used, always call [Microsoft.AspNetCore.Builder.ResponseCompressionBuilderExtensions.UseResponseCompression%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ResponseCompressionBuilderExtensions.UseResponseCompression%252A) first in the request processing pipeline.

In the `Program` file:

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseResponseCompression();
}
```



## Client-side SignalR cross-origin negotiation for authentication

This section explains how to configure SignalR's underlying client to send credentials, such as cookies or HTTP authentication headers.

Use [Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestCredentials%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestCredentials%252A) to set [Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestCredentials.Include](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestCredentials.Include) on cross-origin [`fetch`](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch) requests.

`IncludeRequestCredentialsMessageHandler.cs`:

```csharp
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Http;

public class IncludeRequestCredentialsMessageHandler : DelegatingHandler
{
    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);
        return base.SendAsync(request, cancellationToken);
    }
}
```

Where a hub connection is built, assign the [System.Net.Http.HttpMessageHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMessageHandler) to the [Microsoft.AspNetCore.Http.Connections.Client.HttpConnectionOptions.HttpMessageHandlerFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Connections.Client.HttpConnectionOptions.HttpMessageHandlerFactory) option:

```csharp
private HubConnectionBuilder? hubConnection;

...

hubConnection = new HubConnectionBuilder()
    .WithUrl(new Uri(Navigation.ToAbsoluteUri("/chathub")), options =>
    {
        options.HttpMessageHandlerFactory = innerHandler => 
            new IncludeRequestCredentialsMessageHandler { InnerHandler = innerHandler };
    }).Build();
```

The preceding example configures the hub connection URL to the absolute URI address at `/chathub`. The URI can also be set via a string, for example `https://signalr.example.com`, or via [configuration](configuration.md). `Navigation` is an injected [Microsoft.AspNetCore.Components.NavigationManager](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager).

For more information, see [signalr/configuration#configure-other-options](https://learn.microsoft.com/search/?terms=signalr%2Fconfiguration%23configure-other-options).

## Client-side rendering

**Applies to: \>= aspnetcore-8.0**

If prerendering is configured, prerendering occurs before the client connection to the server is established. For more information, see [blazor/state-management/prerendered-state-persistence](../state-management/prerendered-state-persistence.md).



**Applies to: \>= aspnetcore-5.0 < aspnetcore-8.0**

If prerendering is configured, prerendering occurs before the client connection to the server is established. For more information, see the following articles:

* [mvc/views/tag-helpers/builtin-th/component-tag-helper](../../mvc/views/tag-helpers/built-in/component-tag-helper.md)
* [blazor/components/integration](../components/integration.md)



## Prerendered state size and SignalR message size limit

A large prerendered state size may exceed Blazor's SignalR circuit message size limit, which results in the following:

* The SignalR circuit fails to initialize with an error on the client: Circuit host not initialized.
* The reconnection UI on the client appears when the circuit fails. Recovery isn't possible.

To resolve the problem, use ***either*** of the following approaches:

* Reduce the amount of data that you are putting into the prerendered state.
* Increase the [SignalR message size limit](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fsignalr%23server-side-circuit-handler-options). ***WARNING***: Increasing the limit may increase the risk of Denial of Service (DoS) attacks.

## Additional client-side resources

* [Secure a SignalR hub](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Findex%23secure-a-signalr-hub)
* [signalr/introduction](../../signalr/introduction.md)
* [signalr/configuration](../../signalr/configuration.md)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))

## Use session affinity (sticky sessions) for server-side web farm hosting

When more than one backend server is in use, the app must implement session affinity, also called *sticky sessions*. Session affinity ensures that a client's circuit reconnects to the same server if the connection is dropped, which is important because client state is only held in the memory of the server that first established the client's circuit.

The following error is thrown by an app that hasn't enabled session affinity in a web farm:

> Uncaught (in promise) Error: Invocation canceled due to the underlying connection being closed.

For more information on session affinity with Azure App Service hosting, see [blazor/host-and-deploy/server/index#azure-app-service](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fserver%2Findex%23azure-app-service).

## Azure SignalR Service

The optional [Azure SignalR Service](https://learn.microsoft.com/search/?terms=signalr%2Fscale%23azure-signalr-service) works in conjunction with the app's SignalR hub for scaling up a server-side app to a large number of concurrent connections. In addition, the service's global reach and high-performance data centers significantly aid in reducing latency due to geography.

The service isn't required for Blazor apps hosted in Azure App Service or Azure Container Apps but can be helpful in other hosting environments:

* To facilitate connection scale out.
* Handle global distribution.

For more information, see [blazor/host-and-deploy/server/index#azure-signalr-service](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fserver%2Findex%23azure-signalr-service).

## Server-side circuit handler options

Configure the circuit with [Microsoft.AspNetCore.Components.Server.CircuitOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.CircuitOptions). View default values in the [reference source](https://github.com/dotnet/aspnetcore/blob/main/src/Components/Server/src/CircuitOptions.cs).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


**Applies to: \>= aspnetcore-8.0**

Read or set the options in the `Program` file with an options delegate to [Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%252A). The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

In the `Program` file:

```csharp
builder.Services.AddRazorComponents().AddInteractiveServerComponents(options =>
{
    options.{OPTION} = {VALUE};
});
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

Read or set the options in the `Program` file with an options delegate to [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A). The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

In the `Program` file:

```csharp
builder.Services.AddServerSideBlazor(options =>
{
    options.{OPTION} = {VALUE};
});
```



**Applies to: < aspnetcore-6.0**

Read or set the options in `Startup.ConfigureServices` with an options delegate to [Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor%252A). The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

In `Startup.ConfigureServices` of `Startup.cs`:

```csharp
services.AddServerSideBlazor(options =>
{
    options.{OPTION} = {VALUE};
});
```



To configure the [Microsoft.AspNetCore.SignalR.HubConnectionContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubConnectionContext), use [Microsoft.AspNetCore.SignalR.HubConnectionContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubConnectionContextOptions) with [Microsoft.Extensions.DependencyInjection.ServerSideBlazorBuilderExtensions.AddHubOptions%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServerSideBlazorBuilderExtensions.AddHubOptions%252A). View the defaults for the hub connection context options in [reference source](https://github.com/dotnet/aspnetcore/blob/main/src/SignalR/server/Core/src/HubConnectionContextOptions.cs). For option descriptions in the SignalR documentation, see [signalr/configuration#configure-server-options](https://learn.microsoft.com/search/?terms=signalr%2Fconfiguration%23configure-server-options). The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


**Applies to: \>= aspnetcore-8.0**

In the `Program` file:

```csharp
builder.Services.AddRazorComponents().AddInteractiveServerComponents().AddHubOptions(options =>
{
    options.{OPTION} = {VALUE};
});
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

In the `Program` file:

```csharp
builder.Services.AddServerSideBlazor().AddHubOptions(options =>
{
    options.{OPTION} = {VALUE};
});
```



**Applies to: < aspnetcore-6.0**

In `Startup.ConfigureServices` of `Startup.cs`:

```csharp
services.AddServerSideBlazor().AddHubOptions(options =>
{
    options.{OPTION} = {VALUE};
});
```



> **Warning:**
> The default value of [Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize) is 32 KB. Increasing the value may increase the risk of [Denial of Service (DoS) attacks](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23denial-of-service-dos-attacks).
>
> Blazor relies on [Microsoft.AspNetCore.SignalR.HubOptions.MaximumParallelInvocationsPerClient%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.MaximumParallelInvocationsPerClient%252A) set to 1, which is the default value. For more information, see [MaximumParallelInvocationsPerClient > 1 breaks file upload in Blazor Server mode (`dotnet/aspnetcore` #53951)](https://github.com/dotnet/aspnetcore/issues/53951).

For information on memory management, see [blazor/host-and-deploy/server/memory-management](../host-and-deploy/server/memory-management.md).

## Blazor hub options

Configure [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) options to control [Microsoft.AspNetCore.Http.Connections.HttpConnectionDispatcherOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Connections.HttpConnectionDispatcherOptions) of the Blazor hub. View the defaults for the hub connection dispatcher options in [reference source](https://github.com/dotnet/aspnetcore/blob/main/src/SignalR/common/Http.Connections/src/HttpConnectionDispatcherOptions.cs). The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


**Applies to: \>= aspnetcore-8.0**

Place the call to `app.MapBlazorHub` after the call to `app.MapRazorComponents` in the app's `Program` file:

```csharp
app.MapBlazorHub(options =>
{
    options.{OPTION} = {VALUE};
});
```



**Applies to: < aspnetcore-11.0**

Configuring the hub used by [Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%252A) with [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) fails with an [System.Reflection.AmbiguousMatchException](https://learn.microsoft.com/search/?terms=System.Reflection.AmbiguousMatchException):

> Microsoft.AspNetCore.Routing.Matching.AmbiguousMatchException: The request matched multiple endpoints.

To workaround the problem for apps targeting .NET 8/9, take the following approach.

At the top of the `Program` file, add a `using` statement for [Microsoft.AspNetCore.Http.Connections](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Connections):

```csharp
using Microsoft.AspNetCore.Http.Connections;
```

Where [Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A) is called, chain the following endpoint convention to the [Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilder):

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .Add(e =>
    {
        var metadata = e.Metadata;
        var dispatcherOptions = metadata.OfType<HttpConnectionDispatcherOptions>().FirstOrDefault();

        if (dispatcherOptions != null)
        {
            dispatcherOptions.CloseOnAuthenticationExpiration = true;
        }
    });
```

For more information, see the following resources:

* [MapBlazorHub configuration in NET8 throws a The request matched multiple endpoints exception (`dotnet/aspnetcore` #51698)](https://github.com/dotnet/aspnetcore/issues/51698#issuecomment-1984340954)
* [Attempts to map multiple blazor entry points with MapBlazorHub causes Ambiguous Route Error. This worked with net7 (`dotnet/aspnetcore` #52156)](https://github.com/dotnet/aspnetcore/issues/52156#issuecomment-1984503178)
* [[Blazor] Provide access to the underlying SignalR HttpConnectionDispatcherOptions in AddInteractiveServerRenderMode (`dotnet/aspnetcore` #63520)](https://github.com/dotnet/aspnetcore/issues/63520)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

Supply the options to `app.MapBlazorHub` in the app's `Program` file:

```csharp
app.MapBlazorHub(options =>
{
    options.{OPTION} = {VALUE};
});
```



**Applies to: < aspnetcore-6.0**

Supply the options to `app.MapBlazorHub` in endpoint routing configuration:

```csharp
app.UseEndpoints(endpoints =>
{
    endpoints.MapBlazorHub(options =>
    {
        options.{OPTION} = {VALUE};
    });
    ...
});

:::moniker-end

## Maximum receive message size

*This section only applies to projects that implement SignalR.*

The maximum incoming SignalR message size permitted for hub methods is limited by the <xref:Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize?displayProperty=nameWithType> (default: 32 KB). SignalR messages larger than <xref:Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize> throw an error. The framework doesn't impose a limit on the size of a SignalR message from the hub to a client.

When SignalR logging isn't set to [Debug](xref:Microsoft.Extensions.Logging.LogLevel) or [Trace](xref:Microsoft.Extensions.Logging.LogLevel), a message size error only appears in the browser's developer tools console:

> Error: Connection disconnected with error 'Error: Server returned an error on close: Connection closed with an error.'.

When [SignalR server-side logging](xref:signalr/diagnostics#server-side-logging) is set to [Debug](xref:Microsoft.Extensions.Logging.LogLevel) or [Trace](xref:Microsoft.Extensions.Logging.LogLevel), server-side logging surfaces an <xref:System.IO.InvalidDataException> for a message size error.

`appsettings.Development.json`:

```json
{
  "DetailedErrors": true,
  "Logging": {
    "LogLevel": {
      ...
      "Microsoft.AspNetCore.SignalR": "Debug"
    }
  }
}
```

Error:

> System.IO.InvalidDataException: The maximum message size of 32768B was exceeded. The message size can be configured in AddHubOptions.

**Applies to: \>= aspnetcore-8.0**

One approach involves increasing the limit by setting [Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize) in the `Program` file. The following example sets the maximum receive message size to 64 KB:

```csharp
builder.Services.AddRazorComponents().AddInteractiveServerComponents()
    .AddHubOptions(options => options.MaximumReceiveMessageSize = 64 * 1024);
```

Increasing the SignalR incoming message size limit comes at the cost of requiring more server resources, and it increases the risk of [Denial of Service (DoS) attacks](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23denial-of-service-dos-attacks). Additionally, reading a large amount of content in to memory as strings or byte arrays can also result in allocations that work poorly with the garbage collector, resulting in additional performance penalties.

A better option for reading large payloads is to send the content in smaller chunks and process the payload as a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream). This can be used when reading large JavaScript (JS) interop JSON payloads or if JS interop data is available as raw bytes. For an example that demonstrates sending large binary payloads in server-side apps that uses techniques similar to the [`InputFile` component](../file-uploads.md), see the [Binary Submit sample app](https://github.com/aspnet/samples/tree/main/samples/aspnetcore/blazor/BinarySubmit) and the [Blazor `InputLargeTextArea` Component Sample](https://github.com/aspnet/samples/tree/main/samples/aspnetcore/blazor/InputLargeTextArea).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


Forms that process large payloads over SignalR can also use streaming JS interop directly. For more information, see [blazor/js-interop/call-dotnet-from-javascript#stream-from-javascript-to-net](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-dotnet-from-javascript%23stream-from-javascript-to-net). For a forms example that streams `<textarea>` data to the server, see [blazor/forms/troubleshoot#large-form-payloads-and-the-signalr-message-size-limit](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Ftroubleshoot%23large-form-payloads-and-the-signalr-message-size-limit).



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

One approach involves increasing the limit by setting [Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize) in the `Program` file. The following example sets the maximum receive message size to 64 KB:

```csharp
builder.Services.AddServerSideBlazor()
    .AddHubOptions(options => options.MaximumReceiveMessageSize = 64 * 1024);
```

Increasing the SignalR incoming message size limit comes at the cost of requiring more server resources, and it increases the risk of [Denial of Service (DoS) attacks](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23denial-of-service-dos-attacks). Additionally, reading a large amount of content in to memory as strings or byte arrays can also result in allocations that work poorly with the garbage collector, resulting in additional performance penalties.

A better option for reading large payloads is to send the content in smaller chunks and process the payload as a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream). This can be used when reading large JavaScript (JS) interop JSON payloads or if JS interop data is available as raw bytes. For an example that demonstrates sending large binary payloads in Blazor Server that uses techniques similar to the [`InputFile` component](../file-uploads.md), see the [Binary Submit sample app](https://github.com/aspnet/samples/tree/main/samples/aspnetcore/blazor/BinarySubmit) and the [Blazor `InputLargeTextArea` Component Sample](https://github.com/aspnet/samples/tree/main/samples/aspnetcore/blazor/InputLargeTextArea).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


Forms that process large payloads over SignalR can also use streaming JS interop directly. For more information, see [blazor/js-interop/call-dotnet-from-javascript#stream-from-javascript-to-net](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-dotnet-from-javascript%23stream-from-javascript-to-net). For a forms example that streams `<textarea>` data in a Blazor Server app, see [blazor/forms/troubleshoot#large-form-payloads-and-the-signalr-message-size-limit](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Ftroubleshoot%23large-form-payloads-and-the-signalr-message-size-limit).



**Applies to: < aspnetcore-6.0**

Increase the limit by setting [Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize) in `Startup.ConfigureServices`:

```csharp
services.AddServerSideBlazor()
    .AddHubOptions(options => options.MaximumReceiveMessageSize = 64 * 1024);
```

Increasing the SignalR incoming message size limit comes at the cost of requiring more server resources, and it increases the risk of [Denial of Service (DoS) attacks](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23denial-of-service-dos-attacks). Additionally, reading a large amount of content in to memory as strings or byte arrays can also result in allocations that work poorly with the garbage collector, resulting in additional performance penalties.



Consider the following guidance when developing code that transfers a large amount of data:

**Applies to: \>= aspnetcore-6.0**

* Leverage the native streaming JS interop support to transfer data larger than the SignalR incoming message size limit:
  * [blazor/js-interop/call-javascript-from-dotnet#stream-from-net-to-javascript](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-javascript-from-dotnet%23stream-from-net-to-javascript)
  * [blazor/js-interop/call-dotnet-from-javascript#stream-from-javascript-to-net](https://learn.microsoft.com/search/?terms=blazor%2Fjs-interop%2Fcall-dotnet-from-javascript%23stream-from-javascript-to-net)
  * Form payload example: [blazor/forms/troubleshoot#large-form-payloads-and-the-signalr-message-size-limit](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Ftroubleshoot%23large-form-payloads-and-the-signalr-message-size-limit)
* General tips:
  * Don't allocate large objects in JS and C# code.
  * Free consumed memory when the process is completed or cancelled.
  * Enforce the following additional requirements for security purposes:
    * Declare the maximum file or data size that can be passed.
    * Declare the minimum upload rate from the client to the server.
  * After the data is received by the server, the data can be:
    * Temporarily stored in a memory buffer until all of the segments are collected.
    * Consumed immediately. For example, the data can be stored immediately in a database or written to disk as each segment is received.



**Applies to: < aspnetcore-6.0**

* Slice the data into smaller pieces, and send the data segments sequentially until all of the data is received by the server.
* Don't allocate large objects in JS and C# code.
* Don't block the main UI thread for long periods when sending or receiving data.
* Free consumed memory when the process is completed or cancelled.
* Enforce the following additional requirements for security purposes:
  * Declare the maximum file or data size that can be passed.
  * Declare the minimum upload rate from the client to the server.
* After the data is received by the server, the data can be:
  * Temporarily stored in a memory buffer until all of the segments are collected.
  * Consumed immediately. For example, the data can be stored immediately in a database or written to disk as each segment is received.



## Blazor server-side Hub endpoint route configuration

In the `Program` file, call [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) to map the Blazor [Microsoft.AspNetCore.SignalR.Hub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub) to the app's default path. The Blazor script (`blazor.*.js`) automatically points to the endpoint created by [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A).

## Reflect the server-side connection state in the UI

If the client detects a lost connection (circuit) to the server, a default UI is displayed to the user while the client attempts to reconnect:

**Applies to: \>= aspnetcore-9.0**

The default reconnection UI.



**Applies to: < aspnetcore-9.0**

The default reconnection UI.



If reconnection fails, the user is instructed to retry or reload the page:

**Applies to: \>= aspnetcore-9.0**

The default retry UI.



**Applies to: < aspnetcore-9.0**

The default retry UI.



If reconnection succeeds, user state is often lost. Custom code can be added to any component to save and reload user state across connection failures. For more information, see [blazor/state-management/index](../state-management/index.md) and [blazor/state-management/server](../state-management/server.md).

**Applies to: \>= aspnetcore-10.0**

To create UI elements that track reconnection state, the following table describes:

* A set of `components-reconnect-*` CSS classes (**CSS class** column) that are set or unset by Blazor on an element with an `id` of `components-reconnect-modal`.
* A `components-reconnect-state-changed` event (**Event** column) that indicates a reconnection status change.

| CSS class | Event | Indicates&hellip; |
| --- | --- | --- |
| `components-reconnect-show` | `show` | A lost connection. The client is attempting to reconnect. The reconnection modal is shown. |
| `components-reconnect-paused` | `paused` | The connection is paused. For more information, see [Pause and resume circuits](https://learn.microsoft.com/search/?terms=blazor%2Fstate-management%2Fserver%23pause-and-resume-circuits). |
| `components-reconnect-hide` | `hide` | An active connection is re-established to the server. The reconnection model is closed. |
| `components-reconnect-retrying` | `retrying` | The client is attempting to reconnect. |
| `components-reconnect-failed` | `failed` | Reconnection failed, probably due to a network failure. |
| `components-reconnect-rejected` | `rejected` | Reconnection rejected. |

When the reconnection state change in `components-reconnect-state-changed` is `failed`, call `Blazor.reconnect()` in JavaScript to attempt reconnection.

When the reconnection state change is `rejected`, the server was reached but refused the connection, and the user's state on the server is lost. To reload the app, call `location.reload()` in JavaScript. This connection state may result when:

* A crash in the server-side circuit occurs.
* The client is disconnected long enough for the server to drop the user's state. Instances of the user's components are disposed.
* The server is restarted, or the app's worker process is recycled.

The developer adds an event listener on the reconnect modal element to monitor and react to reconnection state changes, as seen in the following example:

```javascript
const reconnectModal = document.getElementById("components-reconnect-modal");
reconnectModal.addEventListener("components-reconnect-state-changed", 
  handleReconnectStateChanged);

function handleReconnectStateChanged(event) {
  if (event.detail.state === "show") {
    reconnectModal.showModal();
  } else if (event.detail.state === "hide") {
    reconnectModal.close();
  } else if (event.detail.state === "failed") {
    Blazor.reconnect();
  } else if (event.detail.state === "rejected") {
    location.reload();
  }
}
```

An element with an `id` of `components-reconnect-max-retries` displays the maximum number of reconnect retries:

```html
<span id="components-reconnect-max-retries"></span>
```

An element with an `id` of `components-reconnect-current-attempt` displays the current reconnect attempt:

```html
<span id="components-reconnect-current-attempt"></span>
```

An element with an `id` of `components-seconds-to-next-attempt` displays the number of seconds to the next reconnection attempt:

```html
<span id="components-seconds-to-next-attempt"></span>
```

The [Blazor Web App project template](https://github.com/dotnet/aspnetcore/tree/main/src/ProjectTemplates/Web.ProjectTemplates/content/BlazorWeb-CSharp) includes a `ReconnectModal` component (`Components/Layout/ReconnectModal.razor`) with collocated stylesheet and JavaScript files (`ReconnectModal.razor.css`, `ReconnectModal.razor.js`) that can be customized as needed. These files can be examined in the ASP.NET Core reference source or by inspecting an app created from the Blazor Web App project template. The component is added to the project when the project is created in Visual Studio with **Interactive render mode** set to **Server** or **Auto** or created with the .NET CLI with the option `--interactivity server` (default) or `--interactivity auto`.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).




**Applies to: \>= aspnetcore-8.0 < aspnetcore-10.0**

To customize the UI, define a single element with an `id` of `components-reconnect-modal` in the `<body>` element content. The following example places the element in the `App` component.

`App.razor`:



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

To customize the UI, define a single element with an `id` of `components-reconnect-modal` in the `<body>` element content. The following example places the element in the host page.

`Pages/_Host.cshtml`:



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

To customize the UI, define a single element with an `id` of `components-reconnect-modal` in the `<body>` element content. The following example places the element in the layout page.

`Pages/_Layout.cshtml`:



**Applies to: < aspnetcore-6.0**

To customize the UI, define a single element with an `id` of `components-reconnect-modal` in the `<body>` element content. The following example places the element in the host page.

`Pages/_Host.cshtml`:



**Applies to: < aspnetcore-10.0**

```cshtml
<div id="components-reconnect-modal">
    Connection lost.<br>Attempting to reconnect...
</div>
```

> **Note:**
> If more than one element with an `id` of `components-reconnect-modal` are rendered by the app, only the first rendered element receives CSS class changes to display or hide the element. 

Add the following CSS styles to the site's stylesheet.



**Applies to: \>= aspnetcore-8.0 < aspnetcore-10.0**

`wwwroot/app.css`:



**Applies to: < aspnetcore-8.0**

`wwwroot/css/site.css`:



**Applies to: < aspnetcore-10.0**

```css
#components-reconnect-modal {
    display: none;
}

#components-reconnect-modal.components-reconnect-show, 
#components-reconnect-modal.components-reconnect-failed, 
#components-reconnect-modal.components-reconnect-rejected {
    display: block;
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: center;
    box-shadow: 0 3px 6px 2px rgba(0, 0, 0, 0.3);
    margin: 50px 50px;
    position: fixed;
    top: 0;
    z-index: 10001;
}
```

The following table describes the CSS classes applied to the `components-reconnect-modal` element by the Blazor framework.

| CSS class | Indicates&hellip; |
| --- | --- |
| `components-reconnect-show` | A lost connection. The client is attempting to reconnect. Show the modal. |
| `components-reconnect-hide` | An active connection is re-established to the server. Hide the modal. |
| `components-reconnect-failed` | Reconnection failed, probably due to a network failure. To attempt reconnection, call `window.Blazor.reconnect()` in JavaScript. |
| `components-reconnect-rejected` | Reconnection rejected. The server was reached but refused the connection, and the user's state on the server is lost. To reload the app, call `location.reload()` in JavaScript. This connection state may result when:<ul><li>A crash in the server-side circuit occurs.</li><li>The client is disconnected long enough for the server to drop the user's state. Instances of the user's components are disposed.</li><li>The server is restarted, or the app's worker process is recycled.</li></ul> |



**Applies to: \>= aspnetcore-5.0 < aspnetcore-10.0**

Customize the delay before the reconnection UI appears by setting the `transition-delay` property in the site's CSS for the modal element. The following example sets the transition delay from 500 ms (default) to 1,000 ms (1 second).



**Applies to: \>= aspnetcore-8.0 < aspnetcore-10.0**

`wwwroot/app.css`:



**Applies to: \>= aspnetcore-5.0 < aspnetcore-8.0**

`wwwroot/css/site.css`:



**Applies to: \>= aspnetcore-5.0 < aspnetcore-10.0**

```css
#components-reconnect-modal {
    transition: visibility 0s linear 1000ms;
}
```

To display the current reconnect attempt, define an element with an `id` of `components-reconnect-current-attempt`. To display the maximum number of reconnect retries, define an element with an `id` of `components-reconnect-max-retries`. The following example places these elements inside a reconnect attempt modal element following the previous example.

```cshtml
<div id="components-reconnect-modal">
    There was a problem with the connection!
    (Current reconnect attempt: 
    <span id="components-reconnect-current-attempt"></span> /
    <span id="components-reconnect-max-retries"></span>)
</div>
```

When the custom reconnect modal appears, it renders the following content with a reconnection attempt counter:

> There was a problem with the connection! (Current reconnect attempt: 1 / 8)



## Server-side rendering

**Applies to: \>= aspnetcore-8.0**

By default, components are prerendered on the server before the client connection to the server is established. For more information, see [blazor/state-management/prerendered-state-persistence](../state-management/prerendered-state-persistence.md).



**Applies to: < aspnetcore-8.0**

By default, components are prerendered on the server before the client connection to the server is established. For more information, see [mvc/views/tag-helpers/builtin-th/component-tag-helper](../../mvc/views/tag-helpers/built-in/component-tag-helper.md).



**Applies to: \>= aspnetcore-8.0**

## Monitor server-side circuit activity

Monitor inbound circuit activity using the [Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler.CreateInboundActivityHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler.CreateInboundActivityHandler%252A) method on [Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler). Inbound circuit activity is any activity sent from the browser to the server, such as UI events or JavaScript-to-.NET interop calls.

For example, you can use a circuit activity handler to detect if the client is idle and log its circuit ID ([Microsoft.AspNetCore.Components.Server.Circuits.Circuit.Id](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.Circuits.Circuit.Id)):

```csharp
using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.Extensions.Options;
using Timer = System.Timers.Timer;

public sealed class IdleCircuitHandler : CircuitHandler, IDisposable
{
    private Circuit? currentCircuit;
    private readonly ILogger logger;
    private readonly Timer timer;

    public IdleCircuitHandler(ILogger<IdleCircuitHandler> logger, 
        IOptions<IdleCircuitOptions> options)
    {
        timer = new Timer
        {
            Interval = options.Value.IdleTimeout.TotalMilliseconds,
            AutoReset = false
        };

        timer.Elapsed += CircuitIdle;
        this.logger = logger;
    }

    private void CircuitIdle(object? sender, System.Timers.ElapsedEventArgs e)
    {
        logger.LogInformation("{CircuitId} is idle", currentCircuit?.Id);
    }

    public override Task OnCircuitOpenedAsync(Circuit circuit, 
        CancellationToken cancellationToken)
    {
        currentCircuit = circuit;

        return Task.CompletedTask;
    }

    public override Func<CircuitInboundActivityContext, Task> CreateInboundActivityHandler(
        Func<CircuitInboundActivityContext, Task> next)
    {
        return context =>
        {
            timer.Stop();
            timer.Start();

            return next(context);
        };
    }

    public void Dispose() => timer.Dispose();
}

public class IdleCircuitOptions
{
    public TimeSpan IdleTimeout { get; set; } = TimeSpan.FromMinutes(5);
}

public static class IdleCircuitHandlerServiceCollectionExtensions
{
    public static IServiceCollection AddIdleCircuitHandler(
        this IServiceCollection services, 
        Action<IdleCircuitOptions> configureOptions)
    {
        services.Configure(configureOptions);
        services.AddIdleCircuitHandler();

        return services;
    }

    public static IServiceCollection AddIdleCircuitHandler(
        this IServiceCollection services)
    {
        services.AddScoped<CircuitHandler, IdleCircuitHandler>();

        return services;
    }
}
```

Register the service in the `Program` file. The following example configures the default idle timeout of five minutes to five seconds in order to test the preceding `IdleCircuitHandler` implementation:

```csharp
builder.Services.AddIdleCircuitHandler(options => 
    options.IdleTimeout = TimeSpan.FromSeconds(5));
```

Circuit activity handlers also provide an approach for accessing scoped Blazor services from other non-Blazor dependency injection (DI) scopes. For more information and examples, see:

* [blazor/fundamentals/dependency-injection#access-server-side-blazor-services-from-a-different-di-scope](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fdependency-injection%23access-server-side-blazor-services-from-a-different-di-scope)
* [blazor/security/additional-scenarios#access-authenticationstateprovider-in-outgoing-request-middleware](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23access-authenticationstateprovider-in-outgoing-request-middleware)



## Blazor startup

**Applies to: \>= aspnetcore-8.0**

Configure the manual start of Blazor's SignalR circuit in the `App.razor` file of a Blazor Web App:



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

Configure the manual start of Blazor's SignalR circuit in the `Pages/_Host.cshtml` file (Blazor Server):



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

Configure the manual start of Blazor's SignalR circuit in the `Pages/_Layout.cshtml` file (Blazor Server):



**Applies to: < aspnetcore-6.0**

Configure the manual start of Blazor's SignalR circuit in the `Pages/_Host.cshtml` file (Blazor Server):



* Add an `autostart="false"` attribute to the `<script>` tag for the `blazor.*.js` script.
* Place a script that calls `Blazor.start()` after the Blazor script is loaded and inside the closing `</body>` tag.

When `autostart` is disabled, any aspect of the app that doesn't depend on the circuit works normally. For example, client-side routing is operational. However, any aspect that depends on the circuit isn't operational until `Blazor.start()` is called. App behavior is unpredictable without an established circuit. For example, component methods fail to execute while the circuit is disconnected.

For more information, including how to initialize Blazor when the document is ready and how to chain to a [JS `Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise), see [blazor/fundamentals/startup](startup.md).

## Configure SignalR timeouts and Keep-Alive on the client

**Applies to: \>= aspnetcore-8.0**

Configure the following values for the client:

* `withServerTimeout`: Configures the server timeout in milliseconds. If this timeout elapses without receiving any messages from the server, the connection is terminated with an error. The default timeout value is 30 seconds. The server timeout should be at least double the value assigned to the Keep-Alive interval (`withKeepAliveInterval`).
* `withKeepAliveInterval`: Configures the Keep-Alive interval in milliseconds (default interval at which to ping the server). This setting allows the server to detect hard disconnects, such as when a client unplugs their computer from the network. The ping occurs at most as often as the server pings. If the server pings every five seconds, assigning a value lower than `5000` (5 seconds) pings every five seconds. The default value is 15 seconds. The Keep-Alive interval should be less than or equal to half the value assigned to the server timeout (`withServerTimeout`).

The following example for the `App.razor` file (Blazor Web App) shows the assignment of default values.



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-8.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      configureSignalR: function (builder) {
        builder.withServerTimeout(30000).withKeepAliveInterval(15000);
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).

The following example for the `Pages/_Host.cshtml` file (Blazor Server, all versions except ASP.NET Core in .NET 6) or `Pages/_Layout.cshtml` file (Blazor Server, ASP.NET Core in .NET 6).



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Server:

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    configureSignalR: function (builder) {
      builder.withServerTimeout(30000).withKeepAliveInterval(15000);
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).



**Applies to: \>= aspnetcore-8.0**

When creating a hub connection in a component, set the [Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout) (default: 30 seconds) and [Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval) (default: 15 seconds) on the [Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder). Set the [Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout) (default: 15 seconds) on the built [Microsoft.AspNetCore.SignalR.Client.HubConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection). The following example shows the assignment of default values:

```csharp
protected override async Task OnInitializedAsync()
{
    hubConnection = new HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
        .WithServerTimeout(TimeSpan.FromSeconds(30))
        .WithKeepAliveInterval(TimeSpan.FromSeconds(15))
        .Build();

    hubConnection.HandshakeTimeout = TimeSpan.FromSeconds(15);

    hubConnection.On<string, string>("ReceiveMessage", (user, message) => ...

    await hubConnection.StartAsync();
}
```



**Applies to: < aspnetcore-8.0**

Configure the following values for the client:

* `serverTimeoutInMilliseconds`: The server timeout in milliseconds. If this timeout elapses without receiving any messages from the server, the connection is terminated with an error. The default timeout value is 30 seconds. The server timeout should be at least double the value assigned to the Keep-Alive interval (`keepAliveIntervalInMilliseconds`).
* `keepAliveIntervalInMilliseconds`: Default interval at which to ping the server. This setting allows the server to detect hard disconnects, such as when a client unplugs their computer from the network. The ping occurs at most as often as the server pings. If the server pings every five seconds, assigning a value lower than `5000` (5 seconds) pings every five seconds. The default value is 15 seconds. The Keep-Alive interval should be less than or equal to half the value assigned to the server timeout (`serverTimeoutInMilliseconds`).

The following example for the `Pages/_Host.cshtml` file (Blazor Server, all versions except ASP.NET Core in .NET 6) or `Pages/_Layout.cshtml` file (Blazor Server, ASP.NET Core in .NET 6):

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    configureSignalR: function (builder) {
      let c = builder.build();
      c.serverTimeoutInMilliseconds = 30000;
      c.keepAliveIntervalInMilliseconds = 15000;
      builder.build = () => {
        return c;
      };
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).

When creating a hub connection in a component, set the [Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout) (default: 30 seconds), [Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout) (default: 15 seconds), and [Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval) (default: 15 seconds) on the built [Microsoft.AspNetCore.SignalR.Client.HubConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection). The following example shows the assignment of default values:

```csharp
protected override async Task OnInitializedAsync()
{
    hubConnection = new HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
        .Build();

    hubConnection.ServerTimeout = TimeSpan.FromSeconds(30);
    hubConnection.HandshakeTimeout = TimeSpan.FromSeconds(15);
    hubConnection.KeepAliveInterval = TimeSpan.FromSeconds(15);

    hubConnection.On<string, string>("ReceiveMessage", (user, message) => ...

    await hubConnection.StartAsync();
}
```



When changing the values of the server timeout ([Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout)) or the Keep-Alive interval ([Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval)):

* The server timeout should be at least double the value assigned to the Keep-Alive interval.
* The Keep-Alive interval should be less than or equal to half the value assigned to the server timeout.

For more information, see the *Global deployment and connection failures* sections of the following articles:

* [blazor/host-and-deploy/server/index#global-deployment-and-connection-failures](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fserver%2Findex%23global-deployment-and-connection-failures)
* [blazor/host-and-deploy/webassembly/index#global-deployment-and-connection-failures](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fwebassembly%2Findex%23global-deployment-and-connection-failures)

## Adjust the server-side reconnection retry count and interval

To adjust the reconnection retry count and interval, set the number of retries (`maxRetries`) and period in milliseconds permitted for each retry attempt (`retryIntervalMilliseconds`).

**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-8.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      reconnectionOptions: {
        maxRetries: 3,
        retryIntervalMilliseconds: 2000
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Server:



**Applies to: < aspnetcore-11.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    reconnectionOptions: {
      maxRetries: 3,
      retryIntervalMilliseconds: 2000
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).



**Applies to: \>= aspnetcore-9.0**

When the user navigates back to an app with a disconnected circuit, reconnection is attempted immediately rather than waiting for the duration of the next reconnect interval. This behavior seeks to resume the connection as quickly as possible for the user.

The default reconnect timing uses a computed backoff strategy. The first several reconnection attempts occur in rapid succession before computed delays are introduced between attempts. The default logic for computing the retry interval is an implementation detail subject to change without notice, but you can find the default logic that the Blazor framework uses [in the `computeDefaultRetryInterval` function (reference source)](https://github.com/search?q=repo%3Adotnet%2Faspnetcore%20computeDefaultRetryInterval&type=code).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


Customize the retry interval behavior by specifying a function to compute the retry interval. In the following exponential backoff example, the number of previous reconnection attempts is multiplied by 1,000 ms to calculate the retry interval. When the count of previous attempts to reconnect (`previousAttempts`) is greater than the maximum retry limit (`maxRetries`), `null` is assigned to the retry interval (`retryIntervalMilliseconds`) to cease further reconnection attempts:



**Applies to: \>= aspnetcore-9.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-9.0**

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



**Applies to: \>= aspnetcore-9.0 < aspnetcore-11.0**

Blazor Server:

```javascript
Blazor.start({
  reconnectionOptions: {
    retryIntervalMilliseconds: (previousAttempts, maxRetries) => 
      previousAttempts >= maxRetries ? null : previousAttempts * 1000
  },
});
```



**Applies to: \>= aspnetcore-9.0**

An alternative is to specify the exact sequence of retry intervals. After the last specified retry interval, retries stop because the `retryIntervalMilliseconds` function returns `undefined`:



**Applies to: \>= aspnetcore-9.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-9.0**

```javascript
Blazor.start({
  circuit: {
    reconnectionOptions: {
      retryIntervalMilliseconds: 
        Array.prototype.at.bind([0, 1000, 2000, 5000, 10000, 15000, 30000]),
    },
  },
});
```



**Applies to: \>= aspnetcore-9.0 < aspnetcore-11.0**

Blazor Server:

```javascript
Blazor.start({
  reconnectionOptions: {
    retryIntervalMilliseconds: 
      Array.prototype.at.bind([0, 1000, 2000, 5000, 10000, 15000, 30000]),
  },
});
```



**Applies to: \>= aspnetcore-9.0**

For more information on Blazor startup, see [blazor/fundamentals/startup](startup.md).



**Applies to: \>= aspnetcore-6.0**

## Control when the reconnection UI appears

Controlling when the reconnection UI appears can be useful in the following situations:

* A deployed app frequently displays the reconnection UI due to ping timeouts caused by internal network or Internet latency, and you would like to increase the delay.
* An app should report to users that the connection has dropped sooner, and you would like to shorten the delay.

The timing of the appearance of the reconnection UI is influenced by adjusting the Keep-Alive interval and timeouts on the client. The reconnection UI appears when the server timeout is reached on the client (`withServerTimeout`, [Client configuration](#client-configuration) section). However, changing the value of `withServerTimeout` requires changes to other Keep-Alive, timeout, and handshake settings described in the following guidance.

As general recommendations for the guidance that follows:

* The Keep-Alive interval should match between client and server configurations.
* Timeouts should be at least double the value assigned to the Keep-Alive interval.

### Server configuration

Set the following:

* [Microsoft.AspNetCore.SignalR.HubOptions.ClientTimeoutInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.ClientTimeoutInterval) (default: 30 seconds): The time window clients have to send a message before the server closes the connection.
* [Microsoft.AspNetCore.SignalR.HubOptions.HandshakeTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.HandshakeTimeout) (default: 15 seconds): The interval used by the server to timeout incoming handshake requests by clients.
* [Microsoft.AspNetCore.SignalR.HubOptions.KeepAliveInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.KeepAliveInterval) (default: 15 seconds): The interval used by the server to send keep alive pings to connected clients. Note that there is also a Keep-Alive interval setting on the client, which should match the server's value.

The [Microsoft.AspNetCore.SignalR.HubOptions.ClientTimeoutInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.ClientTimeoutInterval) and [Microsoft.AspNetCore.SignalR.HubOptions.HandshakeTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.HandshakeTimeout) can be increased, and the [Microsoft.AspNetCore.SignalR.HubOptions.KeepAliveInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.KeepAliveInterval) can remain the same. The important consideration is that if you change the values, make sure that the timeouts are at least double the value of the Keep-Alive interval and that the Keep-Alive interval matches between server and client. For more information, see the [Configure SignalR timeouts and Keep-Alive on the client](#configure-signalr-timeouts-and-keep-alive-on-the-client) section.

In the following example:

* The [Microsoft.AspNetCore.SignalR.HubOptions.ClientTimeoutInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.ClientTimeoutInterval) is increased to 60 seconds (default value: 30 seconds).
* The [Microsoft.AspNetCore.SignalR.HubOptions.HandshakeTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.HandshakeTimeout) is increased to 30 seconds (default value: 15 seconds).
* The [Microsoft.AspNetCore.SignalR.HubOptions.KeepAliveInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubOptions.KeepAliveInterval) isn't set in developer code and uses its default value of 15 seconds. Decreasing the value of the Keep-Alive interval increases the frequency of communication pings, which increases the load on the app, server, and network. Care must be taken to avoid introducing poor performance when lowering the Keep-Alive interval.

**Blazor Web App** (.NET 8 or later) in the server project's `Program` file:

```csharp
builder.Services.AddRazorComponents().AddInteractiveServerComponents()
    .AddHubOptions(options =>
{
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(60);
    options.HandshakeTimeout = TimeSpan.FromSeconds(30);
});
```

**Blazor Server** in the `Program` file:

```csharp
builder.Services.AddServerSideBlazor()
    .AddHubOptions(options =>
    {
        options.ClientTimeoutInterval = TimeSpan.FromSeconds(60);
        options.HandshakeTimeout = TimeSpan.FromSeconds(30);
    });
```

For more information, see the [Server-side circuit handler options](#server-side-circuit-handler-options) section.

### Client configuration



**Applies to: \>= aspnetcore-8.0**

Set the following:

* `withServerTimeout` (default: 30 seconds): Configures the server timeout, specified in milliseconds, for the circuit's hub connection.
* `withKeepAliveInterval` (default: 15 seconds): The interval, specified in milliseconds, at which the connection sends Keep-Alive messages.

The server timeout can be increased, and the Keep-Alive interval can remain the same. The important consideration is that if you change the values, make sure that the server timeout is at least double the value of the Keep-Alive interval and that the Keep-Alive interval values match between server and client. For more information, see the [Configure SignalR timeouts and Keep-Alive on the client](#configure-signalr-timeouts-and-keep-alive-on-the-client) section.

In the following [startup configuration](startup.md) example ([location of the Blazor script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script)), a custom value of 60 seconds is used for the server timeout. The Keep-Alive interval (`withKeepAliveInterval`) isn't set and uses its default value of 15 seconds.



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-8.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      configureSignalR: function (builder) {
        builder.withServerTimeout(60000);
      }
    }
  });
</script>
```



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Server:

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    configureSignalR: function (builder) {
      builder.withServerTimeout(60000);
    }
  });
</script>
```



**Applies to: \>= aspnetcore-8.0**

When creating a hub connection in a component, set the server timeout ([Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderExtensions.WithServerTimeout%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderExtensions.WithServerTimeout%252A), default: 30 seconds) on the [Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder). Set the [Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout) (default: 15 seconds) on the built [Microsoft.AspNetCore.SignalR.Client.HubConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection). Confirm that the timeouts are at least double the Keep-Alive interval ([Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderExtensions.WithKeepAliveInterval%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderExtensions.WithKeepAliveInterval%252A)/[Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval)) and that the Keep-Alive value matches between server and client.

The following example is based on the `Index` component in the [SignalR with Blazor tutorial](../tutorials/signalr-blazor.md). The server timeout is increased to 60 seconds, and the handshake timeout is increased to 30 seconds. The Keep-Alive interval isn't set and uses its default value of 15 seconds.

```csharp
protected override async Task OnInitializedAsync()
{
    hubConnection = new HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
        .WithServerTimeout(TimeSpan.FromSeconds(60))
        .Build();

    hubConnection.HandshakeTimeout = TimeSpan.FromSeconds(30);

    hubConnection.On<string, string>("ReceiveMessage", (user, message) => ...

    await hubConnection.StartAsync();
}
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

Set the following:

* `serverTimeoutInMilliseconds` (default: 30 seconds): Configures the server timeout, specified in milliseconds, for the circuit's hub connection.
* `keepAliveIntervalInMilliseconds` (default: 15 seconds): The interval, specified in milliseconds, at which the connection sends Keep-Alive messages.

The server timeout can be increased, and the Keep-Alive interval can remain the same. The important consideration is that if you change the values, make sure that the server timeout is at least double the value of the Keep-Alive interval and that the Keep-Alive interval values match between server and client. For more information, see the [Configure SignalR timeouts and Keep-Alive on the client](#configure-signalr-timeouts-and-keep-alive-on-the-client) section.

In the following [startup configuration](startup.md) example ([location of the Blazor script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script)), a custom value of 60 seconds is used for the server timeout. The Keep-Alive interval (`keepAliveIntervalInMilliseconds`) isn't set and uses its default value of 15 seconds.

In `Pages/_Host.cshtml`:

```html
<script src="_framework/blazor.server.js" autostart="false"></script>
<script>
  Blazor.start({
    configureSignalR: function (builder) {
      let c = builder.build();
      c.serverTimeoutInMilliseconds = 60000;
      builder.build = () => {
        return c;
      };
    }
  });
</script>
```

When creating a hub connection in a component, set the [Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout) (default: 30 seconds) and [Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout) (default: 15 seconds) on the built [Microsoft.AspNetCore.SignalR.Client.HubConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection). Confirm that the timeouts are at least double the Keep-Alive interval. Confirm that the Keep-Alive interval matches between server and client.

The following example is based on the `Index` component in the [SignalR with Blazor tutorial](../tutorials/signalr-blazor.md). The [Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout) is increased to 60 seconds, and the [Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout) is increased to 30 seconds. The Keep-Alive interval ([Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval)) isn't set and uses its default value of 15 seconds.

```csharp
protected override async Task OnInitializedAsync()
{
    hubConnection = new HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
        .Build();

    hubConnection.ServerTimeout = TimeSpan.FromSeconds(60);
    hubConnection.HandshakeTimeout = TimeSpan.FromSeconds(30);

    hubConnection.On<string, string>("ReceiveMessage", (user, message) => ...

    await hubConnection.StartAsync();
}
```



## Modify the server-side reconnection handler

The reconnection handler's circuit connection events can be modified for custom behaviors, such as:

* To notify the user if the connection is dropped.
* To perform logging (from the client) when a circuit is connected.

To modify the connection events, register callbacks for the following connection changes:

* Dropped connections use `onConnectionDown`.
* Established/re-established connections use `onConnectionUp`.

**Both `onConnectionDown` and `onConnectionUp` must be specified.**

**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-8.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      reconnectionHandler: {
        onConnectionDown: (options, error) => console.error(error),
        onConnectionUp: () => console.log("Up, up, and away!")
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Server:



**Applies to: < aspnetcore-11.0**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    reconnectionHandler: {
      onConnectionDown: (options, error) => console.error(error),
      onConnectionUp: () => console.log("Up, up, and away!")
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).



**Applies to: \>= aspnetcore-7.0**

## Programmatic control of reconnection and reload behavior



**Applies to: \>= aspnetcore-9.0**

Blazor automatically attempts reconnection and refreshes the browser when reconnection fails. For more information, see the [Adjust the server-side reconnection retry count and interval](#adjust-the-server-side-reconnection-retry-count-and-interval) section. However, developer code can implement a custom reconnection handler to take full control of reconnection behavior.



**Applies to: \>= aspnetcore-7.0 < aspnetcore-9.0**

The default reconnection behavior requires the user to take manual action to refresh the page after reconnection fails. However, developer code can implement a custom reconnection handler to take full control of reconnection behavior, including implementing automatic page refresh after reconnection attempts fail.



**Applies to: \>= aspnetcore-8.0**

`App.razor`:



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`Pages/_Host.cshtml`:



**Applies to: \>= aspnetcore-7.0**

```html
<div id="reconnect-modal" style="display: none;"></div>
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script src="boot.js"></script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see [blazor/project-structure#location-of-the-blazor-script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script).

Create the following `wwwroot/boot.js` file.



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web App:



**Applies to: \>= aspnetcore-8.0**

```javascript
(() => {
  const maximumRetryCount = 3;
  const retryIntervalMilliseconds = 5000;
  const reconnectModal = document.getElementById('reconnect-modal');
  
  const startReconnectionProcess = () => {
    reconnectModal.style.display = 'block';

    let isCanceled = false;

    (async () => {
      for (let i = 0; i < maximumRetryCount; i++) {
        reconnectModal.innerText = `Attempting to reconnect: ${i + 1} of ${maximumRetryCount}`;

        await new Promise(resolve => setTimeout(resolve, retryIntervalMilliseconds));

        if (isCanceled) {
          return;
        }

        try {
          const result = await Blazor.reconnect();
          if (!result) {
            // The server was reached, but the connection was rejected; reload the page.
            location.reload();
            return;
          }

          // Successfully reconnected to the server.
          return;
        } catch {
          // Didn't reach the server; try again.
        }
      }

      // Retried too many times; reload the page.
      location.reload();
    })();

    return {
      cancel: () => {
        isCanceled = true;
        reconnectModal.style.display = 'none';
      },
    };
  };

  let currentReconnectionProcess = null;

  Blazor.start({
    circuit: {
      reconnectionHandler: {
        onConnectionDown: () => currentReconnectionProcess ??= startReconnectionProcess(),
        onConnectionUp: () => {
          currentReconnectionProcess?.cancel();
          currentReconnectionProcess = null;
        }
      }
    }
  });
})();
```



**Applies to: \>= aspnetcore-7.0 < aspnetcore-11.0**

Blazor Server:

```javascript
(() => {
  const maximumRetryCount = 3;
  const retryIntervalMilliseconds = 5000;
  const reconnectModal = document.getElementById('reconnect-modal');
  
  const startReconnectionProcess = () => {
    reconnectModal.style.display = 'block';

    let isCanceled = false;

    (async () => {
      for (let i = 0; i < maximumRetryCount; i++) {
        reconnectModal.innerText = `Attempting to reconnect: ${i + 1} of ${maximumRetryCount}`;

        await new Promise(resolve => setTimeout(resolve, retryIntervalMilliseconds));

        if (isCanceled) {
          return;
        }

        try {
          const result = await Blazor.reconnect();
          if (!result) {
            // The server was reached, but the connection was rejected; reload the page.
            location.reload();
            return;
          }

          // Successfully reconnected to the server.
          return;
        } catch {
          // Didn't reach the server; try again.
        }
      }

      // Retried too many times; reload the page.
      location.reload();
    })();

    return {
      cancel: () => {
        isCanceled = true;
        reconnectModal.style.display = 'none';
      },
    };
  };

  let currentReconnectionProcess = null;

  Blazor.start({
    reconnectionHandler: {
      onConnectionDown: () => currentReconnectionProcess ??= startReconnectionProcess(),
      onConnectionUp: () => {
        currentReconnectionProcess?.cancel();
        currentReconnectionProcess = null;
      }
    }
  });
})();
```

For more information on Blazor startup, see [blazor/fundamentals/startup](startup.md).



**Applies to: \>= aspnetcore-5.0**

## Disconnect Blazor's SignalR circuit from the client

Blazor's SignalR circuit is disconnected when the [`unload` page event](https://developer.mozilla.org/docs/Web/API/Window/unload_event) is triggered. To disconnect the circuit for other scenarios on the client, invoke `Blazor.disconnect` in the appropriate event handler. In the following example, the circuit is disconnected when the page is hidden ([`pagehide` event](https://developer.mozilla.org/docs/Web/API/Window/pagehide_event)):

```javascript
window.addEventListener('pagehide', () => {
  Blazor.disconnect();
});
```

For more information on Blazor startup, see [blazor/fundamentals/startup](startup.md).



## Server-side circuit handler

You can define a *circuit handler*, which allows running code on changes to the state of a user's circuit. A circuit handler is implemented by deriving from [Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler) and registering the class in the app's service container. The following example of a circuit handler tracks open SignalR connections.

`TrackingCircuitHandler.cs`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/7.0/BlazorSample_Server/TrackingCircuitHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/fundamentals/signalr.md)

Circuit handlers are registered using DI. Scoped instances are created per instance of a circuit. Using the `TrackingCircuitHandler` in the preceding example, a singleton service is created because the state of all circuits must be tracked.

**Applies to: \>= aspnetcore-6.0**

In the `Program` file:

```csharp
builder.Services.AddSingleton<CircuitHandler, TrackingCircuitHandler>();
```



**Applies to: < aspnetcore-6.0**

In `Startup.ConfigureServices` of `Startup.cs`:

```csharp
services.AddSingleton<CircuitHandler, TrackingCircuitHandler>();
```



If a custom circuit handler's methods throw an unhandled exception, the exception is fatal to the circuit. To tolerate exceptions in a handler's code or called methods, wrap the code in one or more [`try-catch`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/try-catch) statements with error handling and logging.

When a circuit ends because a user has disconnected and the framework is cleaning up the circuit state, the framework disposes of the circuit's DI scope. Disposing the scope disposes any circuit-scoped DI services that implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable). If any DI service throws an unhandled exception during disposal, the framework logs the exception. For more information, see [blazor/fundamentals/dependency-injection#service-lifetime](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fdependency-injection%23service-lifetime).

## Server-side circuit handler to capture users for custom services

Use a [Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler) to capture a user from the [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) and set that user in a service. For more information and example code, see [blazor/security/additional-scenarios#circuit-handler-to-capture-users-for-custom-services](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fadditional-scenarios%23circuit-handler-to-capture-users-for-custom-services).

**Applies to: \>= aspnetcore-8.0**

## Closure of circuits when there are no remaining Interactive Server components

Interactive Server components handle web UI events using a real-time connection with the browser called a circuit. A circuit and its associated state are created when a root Interactive Server component is rendered. The circuit is closed when there are no remaining Interactive Server components on the page, which frees up server resources.




## Start the SignalR circuit at a different URL

Prevent automatically starting the app by adding `autostart="false"` to the Blazor `<script>` tag ([location of the Blazor start script](https://learn.microsoft.com/search/?terms=blazor%2Fproject-structure%23location-of-the-blazor-script)). Manually establish the circuit URL using `Blazor.start`. The following examples use the path `/signalr`.

**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Web Apps:



**Applies to: \>= aspnetcore-8.0**

```diff
- <script src="_framework/blazor.web.js"></script>
+ <script src="_framework/blazor.web.js" autostart="false"></script>
+ <script>
+   Blazor.start({
+     circuit: {
+       configureSignalR: builder => builder.withUrl("/signalr")
+     },
+   });
+ </script>
```



**Applies to: \>= aspnetcore-8.0 < aspnetcore-11.0**

Blazor Server:



**Applies to: < aspnetcore-11.0**

```diff
- <script src="_framework/blazor.server.js"></script>
+ <script src="_framework/blazor.server.js" autostart="false"></script>
+ <script>
+   Blazor.start({
+     configureSignalR: builder => builder.withUrl("/signalr")
+   });
+ </script>
```



Add the following [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) call with the hub path to the middleware processing pipeline in the server app's `Program` file.

**Applies to: \>= aspnetcore-8.0**

Blazor Web Apps:

```csharp
app.MapBlazorHub("/signalr");
```

Blazor Server:



Leave the existing call to [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) in the file and add a new call to [Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub%252A) with the path:

```diff
app.MapBlazorHub();
+ app.MapBlazorHub("/signalr");
```

## Impersonation for Windows Authentication

Authenticated hub connections ([Microsoft.AspNetCore.SignalR.Client.HubConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection)) are created with [Microsoft.AspNetCore.Http.Connections.Client.HttpConnectionOptions.UseDefaultCredentials%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Connections.Client.HttpConnectionOptions.UseDefaultCredentials%252A) to indicate the use of default credentials for HTTP requests. For more information, see [signalr/authn-and-authz#windows-authentication](https://learn.microsoft.com/search/?terms=signalr%2Fauthn-and-authz%23windows-authentication).

When the app is running in IIS Express as the signed-in user under Windows Authentication, which is likely the user's personal or work account, the default credentials are those of the signed-in user.

When the app is published to IIS, the app runs under the *Application Pool Identity*. The [Microsoft.AspNetCore.SignalR.Client.HubConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection) connects as the IIS "user" account hosting the app, not the user accessing the page.

Implement *impersonation* with the [Microsoft.AspNetCore.SignalR.Client.HubConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection) to use the identity of the browsing user.

In the following example:

* The user from the authentication state provider is cast to a [System.Security.Principal.WindowsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Principal.WindowsIdentity).
* The identity's access token is passed to [System.Security.Principal.WindowsIdentity.RunImpersonatedAsync%2A](https://learn.microsoft.com/search/?terms=System.Security.Principal.WindowsIdentity.RunImpersonatedAsync%252A) with the code that builds and starts the [Microsoft.AspNetCore.SignalR.Client.HubConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection).

```csharp
protected override async Task OnInitializedAsync()
{
    var authState = await AuthenticationStateProvider.GetAuthenticationStateAsync();

    if (authState?.User.Identity is not null)
    {
        var user = authState.User.Identity as WindowsIdentity;

        if (user is not null)
        {
            await WindowsIdentity.RunImpersonatedAsync(user.AccessToken, 
                async () =>
                {
                    hubConnection = new HubConnectionBuilder()
                        .WithUrl(NavManager.ToAbsoluteUri("/hub"), config =>
                        {
                            config.UseDefaultCredentials = true;
                        })
                        .WithAutomaticReconnect()
                        .Build();

                        hubConnection.On<string>("name", userName =>
                        {
                            name = userName;
                            InvokeAsync(StateHasChanged);
                        });

                        await hubConnection.StartAsync();
                });
        }
    }
}
```

In the preceding code, `NavManager` is a [Microsoft.AspNetCore.Components.NavigationManager](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager), and `AuthenticationStateProvider` is an [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) service instance ([`AuthenticationStateProvider` documentation](../security/authentication-state.md)).

## Configure the hub URL endpoint for a loopback connection

*This section only applies to server-side Blazor apps.*

If HTTP requests in a server-side Blazor app are failing to connect to itself when using [Microsoft.AspNetCore.Components.NavigationManager.ToAbsoluteUri%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.ToAbsoluteUri%252A), you might have a load balancer or proxy that isn't expecting requests from the backend server. In this scenario, you can try to change the hub URL that the client is using to connect directly to the backend server.

The following example:

* Configures the hub URL using [System.UriBuilder](https://learn.microsoft.com/search/?terms=System.UriBuilder) and passes it to [Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderHttpExtensions.WithUrl%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderHttpExtensions.WithUrl%252A).
* Sets the URI based on the server's address ([Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature)) and machine name ([System.Environment.MachineName%2A](https://learn.microsoft.com/search/?terms=System.Environment.MachineName%252A)).

```razor
@using System.Net
@using System.Net.Sockets
@using Microsoft.AspNetCore.Hosting.Server
@using Microsoft.AspNetCore.Hosting.Server.Features
@using Microsoft.AspNetCore.SignalR.Client
@inject IHostEnvironment Environment
@inject IServer Server

...

@code {
    private HubConnection? hubConnection;

    protected override async Task OnInitializedAsync()
    {
        var serverAddress = Server.Features
           .Get<IServerAddressesFeature>()?
           .Addresses
           .FirstOrDefault(a => a.StartsWith("http://") || a.StartsWith("https://"));

        if (serverAddress is null)
        {
            throw new InvalidOperationException("No server address available.");
        }

        var uri = new UriBuilder(serverAddress + "/chathub");

        // If Kestrel is bound to a wildcard, substitute a real IP
        if (uri.Host is "0.0.0.0" or "[::]" or "+" or "*")
        {
            var addresses = await Dns.GetHostAddressesAsync(
                System.Environment.MachineName);
            var ip = addresses.FirstOrDefault(a =>
                a.AddressFamily == AddressFamily.InterNetwork
                && !IPAddress.IsLoopback(a));

            if (ip is null)
            {
                throw new InvalidOperationException("No suitable IP address.");
            }

            uri.Host = ip.ToString();
        }

        hubConnection = new HubConnectionBuilder()
            .WithUrl(uri.Uri)
            .Build();

        hubConnection.On<ChatMessage>("ReceiveMessage", (message) =>
        {
            ...
        });

        await hubConnection.StartAsync();
    }
}
```

## Additional server-side resources

* [Server-side host and deployment guidance: SignalR configuration](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fserver%2Findex%23signalr-configuration)
* [signalr/introduction](../../signalr/introduction.md)
* [signalr/configuration](../../signalr/configuration.md)
* Server-side security documentation
  * [blazor/security/index](../security/index.md)
  * [blazor/security/index](../security/index.md)
  * [blazor/security/interactive-server-side-rendering](../security/interactive-server-side-rendering.md)
  * [blazor/security/additional-scenarios](../security/additional-scenarios.md)
* [blazor/components/httpcontext](../components/httpcontext.md)
* [Server-side reconnection events and component lifecycle events](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flifecycle%23blazor-server-reconnection-events)
* [What is Azure SignalR Service?](https://learn.microsoft.com/azure/azure-signalr/signalr-overview)
* [Performance guide for Azure SignalR Service](https://learn.microsoft.com/azure/azure-signalr/signalr-concept-performance)
* [signalr/publish-to-azure-web-app](../../signalr/publish-to-azure-web-app.md)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))
