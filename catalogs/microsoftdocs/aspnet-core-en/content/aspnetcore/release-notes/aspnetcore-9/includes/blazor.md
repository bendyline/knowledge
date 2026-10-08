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

For more information, see [blazor/hybrid/tutorials/maui-blazor-web-app](../../../blazor/hybrid/tutorials/maui-blazor-web-app.md).

### Detect rendering location, interactivity, and assigned render mode at runtime

We've introduced a new API designed to simplify the process of querying component states at runtime. This API provides the following capabilities:

* **Determine the current execution location of the component**: This can be useful for debugging and optimizing component performance.
* **Check if the component is running in an interactive environment**: This can be helpful for components that have different behaviors based on the interactivity of their environment.
* **Retrieve the assigned render mode for the component**: Understanding the render mode can help in optimizing the rendering process and improving the overall performance of a component.

For more information, see [blazor/components/render-modes](../../../blazor/components/render-modes.md).

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

For more information, see [blazor/fundamentals/signalr](../../../blazor/fundamentals/signalr.md).

### Simplified authentication state serialization for Blazor Web Apps

New APIs make it easier to add authentication to an existing Blazor Web App. When you create a new Blazor Web App with authentication using **Individual Accounts** and you enable WebAssembly-based interactivity, the project includes a custom [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) in both the server and client projects. 

These providers flow the user's authentication state to the browser. Authenticating on the server rather than the client allows the app to access authentication state during prerendering and before the .NET WebAssembly runtime is initialized.

The custom [Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider) implementations use the [Persistent Component State service](../../../blazor/state-management/prerendered-state-persistence.md) ([Microsoft.AspNetCore.Components.PersistentComponentState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.PersistentComponentState)) to serialize the authentication state into HTML comments and read it back from WebAssembly to create a new [Microsoft.AspNetCore.Components.Authorization.AuthenticationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationState) instance. 

This works well if you've started from the Blazor Web App project template and selected the **Individual Accounts** option, but it's a lot of code to implement yourself or copy if you're trying to add authentication to an existing project. There are now APIs, which are now part of the Blazor Web App project template, that can be called in the server and client projects to add this functionality:

* [Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%252A): Adds the necessary services to serialize the authentication state on the server.
* [Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%252A): Adds the necessary services to deserialize the authentication state in the browser.

By default, the API only serializes the server-side name and role claims for access in the browser. An option can be passed to [Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%252A) to include all claims.

For more information, see the following sections of [blazor/security/index](../../../blazor/security/index.md):

* [Blazor Identity UI (Individual Accounts)](../../../blazor/security/index.md)
* [Manage authentication state in Blazor Web Apps](../../../blazor/security/index.md)

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

This feature is covered by the reference documentation in [blazor/components/render-modes](../../../blazor/components/render-modes.md).

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

For more information, see [blazor/fundamentals/dependency-injection](../../../blazor/fundamentals/dependency-injection.md).

### Websocket compression for Interactive Server components

By default, Interactive Server components enable compression for [WebSocket connections](../../../fundamentals/websockets.md) and set a `frame-ancestors` [Content Security Policy (CSP)](https://developer.mozilla.org/docs/Web/HTTP/Guides/CSP) directive set to `'self'` ([MDN's CSP reference guidance](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy)), which only permits embedding the app in an `<iframe>` of the origin from which the app is served when compression is enabled or when a configuration for the WebSocket context is provided.

Compression can be disabled by setting `ConfigureWebSocketOptions` to `null`, which reduces the [vulnerability of the app to attack](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Finteractive-server-side-rendering%23interactive-server-components-with-websocket-compression-enabled) but may result in reduced performance:

```csharp
.AddInteractiveServerRenderMode(o => o.ConfigureWebSocketOptions = null)
```

Configure a stricter `frame-ancestors` CSP with a value of `'none'` (single quotes required), which allows WebSocket compression but prevents browsers from embedding the app into any `<iframe>`:

```csharp
.AddInteractiveServerRenderMode(o => o.ContentSecurityFrameAncestorsPolicy = "'none'")
```

For more information, see the following resources:

* [blazor/fundamentals/signalr](../../../blazor/fundamentals/signalr.md)
* [blazor/security/interactive-server-side-rendering](../../../blazor/security/interactive-server-side-rendering.md)

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

For more information, see [blazor/js-interop/ssr](../../../blazor/javascript-interoperability/static-server-rendering.md).

### Client-side request streaming

Interactive WebAssembly rendering in Blazor now supports client-side request streaming using the `request.SetBrowserRequestStreamingEnabled(true)` option on `HttpRequestMessage`. 

For more information, see the following resources:

* [blazor/call-web-api](../../../blazor/call-web-api.md)
* [blazor/file-uploads](../../../blazor/file-uploads.md)
