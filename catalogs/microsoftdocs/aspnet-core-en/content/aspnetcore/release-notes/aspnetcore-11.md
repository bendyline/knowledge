---
title: What's new in ASP.NET Core in .NET 11
ai-usage: ai-assisted
author: wadepickett
description: Learn about the new features in ASP.NET Core in .NET 11.
ms.author: wpickett
ms.date: 09/22/2026
uid: aspnetcore-11
---
# What's new in ASP.NET Core in .NET 11

This article highlights the most significant changes in ASP.NET Core in .NET 11 with links to relevant documentation.

This article will be updated as new preview releases are made available.

## Blazor

This section describes new features for Blazor.

### New `DisplayName` component and support for `[Display]` and `[DisplayName]` attributes

<!-- UPDATE 11.0 - API cross-link 

<xref:Microsoft.AspNetCore.Components.Forms.DisplayName%601>
-->
The `DisplayName` component can be used to display property names from metadata attributes:

```csharp
[Required, DisplayName("Production Date")]
public DateTime ProductionDate { get; set; }
```

The [`[Display]` attribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute) on the model class property is supported:

```csharp
[Required, Display(Name = "Production Date")]
public DateTime ProductionDate { get; set; }
```

Of the two approaches, the `[Display]` attribute is recommended, which makes additional properties available. The `[Display]` attribute also enables assigning a resource type for localization. When both attributes are present, `[Display]` takes precedence over `[DisplayName]`. If neither attribute is present, the component falls back to the property name.

Use the `DisplayName` component in labels or table headers:

```razor
<label>
    <DisplayName For="@(() => Model!.ProductionDate)" />
    <InputDate @bind-Value="Model!.ProductionDate" />
</label>
```

### Blazor Web script startup options format now supported for Blazor Server and Blazor WebAssembly scripts

The Blazor Web App script (`blazor.web.js`) options object passed to `Blazor.start()` uses the following format since the release of .NET 8:

```javascript
Blazor.start({
  ssr: { ... },
  circuit: { ... },
  webAssembly: { ... },
});
```

Now, Blazor Server (`blazor.server.js`) and Blazor WebAssembly (`blazor.webassembly.js`) scripts can use the same options format.

The following example shows the prior options format, which remains supported:

```javascript
Blazor.start({
  loadBootResource: function (...) {
      ...
    },
  });
```

The newly supported options format for the preceding example:

```javascript
Blazor.start({
  webAssembly: {
    loadBootResource: function (...) {
      ...
    },
  },
});
```

For more information, see [blazor/fundamentals/startup](../blazor/fundamentals/startup.md).

### New `BasePath` component

Blazor Web Apps can use the new `BasePath` component (`<BasePath />`) to render the app's app base path (`<base href>`) HTML tag automatically. For more information, see [blazor/host-and-deploy/app-base-path](../blazor/host-and-deploy/app-base-path.md).

### Inline JS event handler removed from the `NavMenu` component

The inline JS event handler that toggles the display of navigation links is no longer present in the `NavMenu` component of the Blazor Web App project template. Apps generated from the project template now use a [collocated JS module](../blazor/javascript-interoperability/location-of-javascript.md) approach to show or hide the navigation bar on the rendered page. The new approach improves [Content Security Policy (CSP) compliance](../blazor/security/content-security-policy.md) because it doesn't require the CSP to include an unsafe hash for the inline JS.

To migrate an existing app to .NET 11, including adopting the new JS module approach for the navigation bar toggler, see [migration/100-to-110](../migration/100-to-110.md).

### `NavigateTo` and `NavLink` support for relative navigation

The new `RelativeToCurrentUri` parameter (default: `false`) for [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) and the [`NavLink` component](../blazor/fundamentals/routing.md) allows you to navigate to URIs relative to the current page path rather than the app's base URI.

Consider the following nested endpoints:

* `/docs`
  * `/getting-started`
    * `/installation`
    * `/configuration`

When the browser's URI is `/docs/getting-started/installation` and you want to navigate the user to `/docs/getting-started/configuration`, `NavigateTo("/configuration")` redirects to `/configuration` at the app's root instead of the relative path at `/docs/getting-started/configuration`. Set the `RelativeToCurrentUri` with [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) or the [`NavLink` component](../blazor/fundamentals/routing.md) for the desired navigation:

```csharp
Navigation.NavigateTo("/configuration", new NavigationOptions
{
    RelativeToCurrentUri = true
});
```

```razor
<NavLink href="configuration" RelativeToCurrentUri="true">Configuration</NavLink>
```

### Persist temporary data between HTTP requests during static server-side rendering (static SSR)

To persist temporary data between HTTP requests during static server-side rendering (static SSR), Blazor supports TempData. TempData is ideal for scenarios such as flash messages after form submissions, passing data during redirects (POST-Redirect-GET pattern), and one-time notifications.

TempData is available when [Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A) is called in the app's `Program` file and is provided as a cascading value with the [`[CascadingParameter]` attribute](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingparameter-attribute).

```csharp
[CascadingParameter]
public ITempData? TempData { get; set; }
```

When supplied to a parameter for simple read/write of a single value, use the `[SupplyParameterFromTempData]` attribute:

```csharp
[SupplyParameterFromTempData]
public string? Message { get; set; }
```

For more information, see [blazor/state-management/server](../blazor/state-management/server.md).

### New Blazor Web Worker template (`blazorwebworker`)

The .NET Web Worker project template, which contains a Web Worker client for offloading long-running work to a background thread, has been renamed to the **Blazor Web Worker** project template (`blazorwebworker`). The name change makes it clearer that the template is part of the Blazor stack for use in Blazor WebAssembly and Blazor Web apps (for client-side rendering, CSR).

Two often-requested capabilities have been added to the generated `WebWorkerClient`:

* `InvokeVoidAsync` for fire-and-forget worker calls that don't return a value, mirroring the shape on `IJSRuntime`.
* Cancellation and timeout support on both worker creation and worker invocations, so callers can pass a `CancellationToken` and tear down a stuck worker cleanly.

Existing projects created with the old template continue to work. The rename only affects the template name shown in `dotnet new list` and in Visual Studio's list of **Create a new project** templates.

For more information, see the following resources:

* [blazor/blazor-web-workers](../blazor/blazor-with-dotnet-on-web-workers.md)
* [.NET Web Worker template update to Blazor Web Worker template (`dotnet/aspnetcore` #66070)](https://github.com/dotnet/aspnetcore/pull/66070) (Please don't comment on closed issues and PRs.)

### Virtualization enhancements

* The [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component no longer assumes every item has the same height. Previously, the component disabled the browser's native scroll anchoring (to avoid an infinite rendering loop), which meant any height change above the viewport&mdash;item expansion, data updates, lazy-loaded content&mdash;caused visible items to jump on screen. The `Virtualize` component now adapts to measured item sizes at runtime, which reduces incorrect spacing and scrolling when item heights vary.

  The updates use a hybrid approach: native CSS scroll anchoring on browsers that support it for non-`<table>` layouts with a manual `ResizeObserver`-based scroll-compensation fallback for `<table>` layouts and Safari, where native anchoring miscalculates positions on `<tr>` elements.
  
  Apps using the `Virtualize` component receive the benefits of these updates automatically. No developer API changes are required.

  These updates include an update to the default value of [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.OverscanCount%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.OverscanCount%252A), which was `3` in .NET 10 or earlier and now changes to `15` in .NET 11 or later. The change in default value increases the precision of average item height calculations.

  For more information, see the following resources:
  
  * [*Item size* section](../blazor/components/virtualization.md) and [*Overscan count* section](../blazor/components/virtualization.md) of the *Virtualization* article.
  * [[Virtualization] Visible content does not shift when in-DOM items above the viewport change height (`dotnet/aspnetcore` #65951)](https://github.com/dotnet/aspnetcore/pull/65951) (Please don't comment on closed issues and PRs).

* Use the new `AnchorMode` parameter to control how the viewport behaves at list edges when items are dynamically added:

  * `None`: No edge pinning. The viewport stays at the current scroll position regardless of item changes.
  * `Start` (default): Pins the viewport to the beginning of the list. For example, this pinning behavior is useful for a news feed user experience.
  * `End`: Pins the viewport to the end of the list. For example, this pinning behavior is useful for a chat or logging user experience.

  In the following example, the virtualized content is pinned to the beginning of the list:

  ```razor
  <Virtualize AnchorMode="Start" ...>
      ...
  </Virtualize>
  ```

  For more information, see the following resources:
  
  * [blazor/components/virtualization](../blazor/components/virtualization.md)
  * [[release/11.0-preview4] Virtualization AnchorMode with variable-height support (`dotnet/aspnetcore` #66521)](https://github.com/dotnet/aspnetcore/pull/66521) (Please don't comment on closed issues and PRs.)

* Content Security Policy (CSP) compliance

  The `Virtualize` component renders dynamic inline `style` attributes on its spacer and placeholder elements (for example, `style="height: 478896px; flex-shrink: 0;"`) because spacer heights are calculated at runtime based on scroll position, item count, and average item size, which change on every scroll interaction. These are blocked by a Content Security Policy (CSP) when `style-src 'self'` is set, breaking virtualization entirely for apps with strict CSP policies.

  Now, CSP violations are avoided because `Virtualize` components:

  * Render calculated spacer and placeholder heights as numeric values in `data-blazor-virtualize-reserved-height` attributes.
  * When required, render the trailing spacer's vertical offset as a numeric value in a `data-blazor-virtualize-loop-breaker-transform` attribute to hide the spacer.

### New service defaults library project template for Blazor WebAssembly apps

The `blazor-wasm-servicedefaults` project template creates a service defaults library for Blazor WebAssembly apps with [Aspire](https://learn.microsoft.com/dotnet/aspire/get-started/aspire-overview) integration. For more information, see [blazor/tooling](../blazor/tooling.md).

### New development server for Blazor WebAssembly apps

[`Microsoft.AspNetCore.Components.Gateway`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.Gateway) is a lightweight ASP.NET Core host that replaces [`Microsoft.AspNetCore.Components.WebAssembly.DevServer`](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.WebAssembly.DevServer) for serving standalone Blazor WebAssembly apps during development and production.

To adopt the Gateway in an existing standalone Blazor WebAssembly app, reference the `Microsoft.AspNetCore.Components.Gateway` package in the app's project file.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


Custom routing code and middleware aren't required by the app. Fallback endpoints come from the static web assets manifest the SDK emits when the `StaticWebAssetSpaFallbackEnabled` property is set in the app's project file, which is present by default in standalone Blazor WebAssembly apps created from the project template:

```xml
<StaticWebAssetSpaFallbackEnabled>true</StaticWebAssetSpaFallbackEnabled>
```

Prior to the release of .NET 11, the `inspectUri` property of the `Properties/launchSettings.json` file:

* Enables the IDE to detect that the app is a Blazor app.
* Instructs the script debugging infrastructure to connect to the browser through Blazor's debugging proxy.

The property is no longer required when using the new development server.

Open the `Properties/launchSettings.json` file of the startup project. Remove the `inspectUri` property in each launch profile of the file's `profiles` node:

```diff
- "inspectUri": "..."
```

For more information, see [[Blazor] Replace DevServer with BlazorGateway for standalone WASM apps (`dotnet/aspnetcore` #65982)](https://github.com/dotnet/aspnetcore/pull/65982) (Please don't comment on closed issues and PRs).

### Server-triggered circuit pause

*This feature applies to server-side Blazor apps.*

Blazor already supports graceful circuit pause and resume with [`Blazor.pauseCircuit()` and `Blazor.resumeCircuit()`](https://learn.microsoft.com/search/?terms=blazor%2Fstate-management%2Fserver%23pause-and-resume-circuits). .NET 11 introduces a symmetric server-side pause and resume capability, where the server can request that connected clients begin the graceful circuit-pause flow.

`Circuit.RequestCircuitPauseAsync(CancellationToken)` is used to request that the connected client begin the graceful circuit-pause flow. The `CancellationToken` cancels the request before it is accepted by the framework. The method returns `true` if the request was accepted and the client was asked to begin pausing.

This feature is useful in the following scenarios:

* Planned shutdowns and deployments.
* Instance draining.
* App maintenance windows.

For more information and an implementation example for server restarts, see [blazor/state-management/server](../blazor/state-management/server.md).

### Smaller Blazor WebAssembly publish output

Two trimming changes shrink published Blazor WebAssembly apps that don't use [OpenTelemetry (OTEL)](https://opentelemetry.io/) or Hot Reload:

* The `ComponentsMetrics` and `ComponentsActivitySource` types are now gated behind a `[FeatureSwitchDefinition]` attribute, so the trimmer can drop the metrics and tracing call paths from `Renderer` and friends when `System.Diagnostics.Metrics.Meter.IsSupported` is `false` (the default for trimmed apps) [[browser][wasm] Implement IL trimming for OTEL (`dotnet/aspnetcore` #65901)](https://github.com/dotnet/aspnetcore/pull/65901) (Please don't comment on closed issues and PRs).
* `HotReloadManager` now exposes a feature-switched `IsSupported` property tied to `System.Reflection.Metadata.MetadataUpdater.IsSupported`, so the trimmer can eliminate hot-reload caches and metadata-update handler registrations across the renderer when published [[blazor][wasm] Fix hot reload IL trimming (`dotnet/aspnetcore` #65903)](https://github.com/dotnet/aspnetcore/pull/65903) (Please don't comment on closed issues and PRs).

Apps that use OTEL or Hot Reload aren't affected by the preceding updates.

### `QuickGrid` improvements

The [`QuickGrid` component](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid) receives several new features in .NET 11.

For more information on the following features, see [blazor/components/quickgrid](../blazor/components/quickgrid.md).

#### Pagination modes

Prior to the release of .NET 11, pagination and sort state is managed in memory inside the `QuickGrid` component without changing the URL, called *inner-state navigation*. An interactive render mode is required.

With the release of .NET 11, `QuickGrid` supports *URL-based navigation*.

Pagination and sort state is persisted in the URL query string. When users paginate or sort, the URL updates (example: `?page=2&sort=Name&direction=asc`). This enables link sharing, browser back/forward, and static SSR without interactivity.

Sortable column headers and paginator controls render as `<a>` elements with `href` attributes. The `StaticHtmlRenderer` renders these anchors. On each request, the server reads the query string to determine current page and sort state&mdash;no JavaScript runtime required.

Query string parameters:

* `page`: One-based page number. The first page omits the parameter for clean URLs.
* `sort`: Column title for sorting the grid.
* `direction`: Ascending (`asc`) or descending (`desc`).

The `sort` column is identified by the column's `Title` property. Columns without a `Title` render a non-clickable `<div>` header.

`QuickGrid` reads the URL on initialization and subscribes to `NavigationManager.LocationChanged`, so browser back/forward and direct URL entry work. When sort parameters are removed from the URL, it falls back to the default sort column/direction.

Disabled paginator links use `aria-disabled="true"` and `pointer-events: none` instead of the HTML `disabled` attribute, which doesn't exist on `<a>` elements.

#### Query parameter names

The new `QueryParameterNameOptions` parameter of the `QuickGrid` component controls the names of the query string parameters that persist grid state in the URL. The `QueryParameterNameOptions` class has three settable properties:

* `Sort`: Name of the query string parameter that holds the sort column. The default value is `sort`.
* `Direction`: Name of the query string parameter that holds the sort direction. The default value is `direction`.
* `Page`: Name of the query string parameter that holds the page number. The default value is `page`.

The constructor takes an optional prefix argument that's prepended to all three default names. The prefix must include any separator character that you want to appear between the prefix and the name. In the following example, the query string parameters are named `products_sort`, `products_direction`, and `products_page`:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid

<QuickGrid ... 
    QueryParameterNameOptions="@(new QueryParameterNameOptions("products_"))">
    ...
</QuickGrid>
```

To control the names individually, set the properties of the class. Properties set explicitly take precedence over a prefix passed to the constructor, so the two approaches can be combined:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid

<QuickGrid ... QueryParameterNameOptions="@queryParameterNames">
    ...
</QuickGrid>

@code {
    private QueryParameterNameOptions queryParameterNames = new()
    {
        Sort = "orderBy",
        Direction = "orderDir",
        Page = "p"
    };
}
```

#### Multiple grids on the same page

Multiple `QuickGrid` components on the same page require unique query parameter names to avoid query string conflicts. Assign a `QueryParameterNameOptions` parameter to all but one of the grids.

Each `QuickGrid` must have its own `PaginationState` instance. Multiple grids must not share a `PaginationState` if they use different query parameter names&mdash;the last grid to render overwrites the query parameter name on the shared state, causing the `Paginator` to read from the wrong parameter.

In releases prior to .NET 11, the following `QuickGrid` components worked implicitly:

```razor
<QuickGrid ... Pagination="@pagination1">
    ...
</QuickGrid>

<QuickGrid ... Pagination="@pagination2">
    ...
</QuickGrid>
```

With the release of .NET 11, the following `QuickGrid` components require unique query parameter names. The first `QuickGrid` uses the default names, while the second one uses a `cities_` prefix:

```razor
<QuickGrid ... Pagination="@pagination1">
    ...
</QuickGrid>

<QuickGrid ... Pagination="@pagination2" 
    QueryParameterNameOptions="@(new QueryParameterNameOptions("cities_"))">
    ...
</QuickGrid>
```

Example query string for the preceding `QuickGrid` components:

```
?page=2&sort=Name&direction=asc&cities_page=3&cities_sort=Population&cities_direction=desc
```

#### Sort by column

Add `Sortable="true"` to a `PropertyColumn`. With URL-based navigation, selecting a header navigates to a URL with updated `sort` and `direction` parameters. With inner-state navigation, selecting a header triggers `@onclick`, which calls `SortByColumnAsync`. In both cases, `SortByColumnAsync` navigates via `NavigationManager.NavigateTo(GetSortQueryStringUrl(...))`, so the URL always reflects the sort state.

#### Title-based sort identification

Sort state in the URL uses the column's `Title` property as the identifier. The `sort` query parameter is set to `column.Title` (example for column title `Name`: `?sort=Name&direction=asc`). On a URL change, `QuickGrid` matches the `sort` value back to a column by executing `_columns.FirstOrDefault(c => c.Title == sort.ColumnTitle)`. If no column title matches, the sort is ignored and the grid falls back to its default sort.

Renaming a column's `Title` is a URL-breaking change. Any bookmarked or shared URLs containing the old title in the `sort` parameter stop matching, and the grid silently falls back to the default sort instead of sorting by the intended column. For `PropertyColumn`, the `Title` defaults to the property name (example: `Property="@(p => p.FirstName)"` produces `Title="First Name"`), so renaming the property or explicitly changing the `Title` parameter both break existing URLs.

#### Paginator

`Paginator` injects `NavigationManager`, subscribes to `LocationChanged`, and reads the page index from the query string on every location change. `GoToPageAsync` navigates to the target URL rather than directly mutating `PaginationState`. State is updated through the `LocationChanged` callback flow.

`GetPageUrl` returns a URL with the one-based page number. Page index 0 (page 1) omits the query parameter entirely.

#### CSS breaking change

When URL-based navigation is enabled, selectors targeting `button.col-title` must also target `a.col-title`, and `nav button`/`nav button:disabled` require `nav a`/`nav a[aria-disabled="true"]`. The built-in QuickGrid stylesheet provides both by default.

#### How to disable URL-based navigation

To disable URL-based navigation, set the `AppContext` switch for the feature to `false`:

```csharp
AppContext.SetSwitch(
    "Microsoft.AspNetCore.Components.QuickGrid.EnableUrlBasedQuickGridNavigationAndSorting",
    false);
```

This restores `<button>` elements with `@onclick` handlers. An interactive render mode is required.

The switch only controls the rendered HTML element (`<a>` versus `<button>`). Even when disabled, `QuickGrid` still reads and writes state to the URL query string internally. `SortByColumnAsync` and `Paginator.GoToPageAsync` navigate via `NavigationManager.NavigateTo` regardless of the flag.

#### Row click event (`OnRowClick`)

The `QuickGrid` component now supports row click events through the new [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.OnRowClick%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.OnRowClick%252A) parameter. When set, the grid automatically applies appropriate styling (cursor pointer) and invokes the callback with the clicked item:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid
@inject NavigationManager NavigationManager

<QuickGrid Items="@people.AsQueryable()" 
    OnRowClick="@((Person args) => HandleRowClick(args))">
    <PropertyColumn Property="@(p => p.Name)" />
    <PropertyColumn Property="@(p => p.Email)" />
</QuickGrid>

@code {
    private List<Person> people = new()
    {
        new(1, "Alice Smith", "alice@example.com", "Engineering"),
        new(2, "Bob Johnson", "bob@example.com", "Marketing"),
        new(3, "Carol Williams", "carol@example.com", "Engineering"),
    };

    private void HandleRowClick(Person person)
    {
        NavigationManager.NavigateTo($"/person/{person.Id}");
    }

    private record Person(int Id, string Name, string Email, string Department);
}
```

The feature includes built-in CSS styling that applies a pointer cursor to clickable rows through the row-clickable CSS class, providing clear visual feedback to users.

### Client-side prerendering in a Blazor Web App preserves the server's culture

By default, client-side prerendering on the server (`.Client` project in a Blazor Web App) persists the server's [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) and [System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture) into component state and applies them on the client before satellite assemblies load.

Apps that require the client to choose a culture independently of the server can opt out with `WebAssemblyComponentsOptions.UseCultureFromServer` in the Blazor Web App's `Program` file:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents(options =>
    {
        options.UseCultureFromServer = false;
    });
```

### Persist session data between HTTP requests during static server-side rendering (static SSR)

Session data persistence reads and writes cookie-based HTTP session values during static server-side rendering (static SSR), which is useful for scenarios such as shopping cart IDs or multi-step form progress. Unlike [temporary data persistence (`ITempData`)](#persist-temporary-data-between-http-requests-during-static-server-side-rendering-static-ssr), session values aren't cleared after reading. Values persist across multiple requests for the session lifetime.

Session storage configuration requires adding services by calling `AddSession` and request pipeline configuration with `UseSession`:

```csharp
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();
builder.Services.AddRazorComponents();

var app = builder.Build();

app.UseSession();
```

When supplied to a parameter, use the `[SupplyParameterFromSession]` attribute without or with a key (string):

```csharp
[SupplyParameterFromSession]
public string? Message { get; set; }

[SupplyParameterFromSession(Name = "flash_message")]
public string? FlashMessage { get; set; }
```

For more information, see [blazor/state-management/server](../blazor/state-management/server.md).

### `GetUriWithFragment` extension method

A new `GetUriWithFragment` extension method permits `NavigationManager` to easily construct URIs with hash fragments. This helper method provides an efficient, zero-allocation way to append hash fragments to the current URI. The following example demonstrates two use cases:

* Inline call that jumps to Section 1 (`id="section-1"`) of the rendered page.
* Method call that receives a section Id (`sectionId`) and navigates to the section of the page.

```razor
@inject NavigationManager Navigation

<a href="@Navigation.GetUriWithFragment("section-1")">
    Jump to Section 1
</a>

@code {
    private void NavigateToSection(string sectionId)
    {
        var uri = Navigation.GetUriWithFragment(sectionId);
        Navigation.NavigateTo(uri);
    }
}
```

The method uses `string.Create` for optimal performance and works correctly with non-root base URIs (for example, when using `<base href="/app/">`).

### `EnvironmentView` component

Blazor now includes a built-in `EnvironmentView` component for conditional rendering based on the hosting environment. This component provides a consistent way to render content based on the current environment across both server-side and client-side hosting models.

The `EnvironmentView` component accepts `Include` and `Exclude` parameters for specifying environment names. The component performs case-insensitive matching and follows the same semantics as MVC's `EnvironmentTagHelper`.

```razor
@using Microsoft.AspNetCore.Components.Web

<EnvironmentView Include="Development">
    <div class="alert alert-warning">
        Debug mode enabled
    </div>
</EnvironmentView>

<EnvironmentView Include="Development,Staging">
    <p>Pre-production environment</p>
</EnvironmentView>

<EnvironmentView Exclude="Production">
    <p>@DateTime.Now</p>
</EnvironmentView>
```

### MathML namespace support

Blazor now supports MathML elements in interactive rendering. MathML elements, such as `<math>`, `<mrow>`, `<mi>`, and `<mn>`, are created with the correct namespace (http://www.w3.org/1998/Math/MathML) using `document.createElementNS()`, similar to how SVG elements are handled:

```html
<math>
    <mrow>
        <mi>x</mi>
        <mo>=</mo>
        <mfrac>
            <mrow>
                <mo>−</mo>
                <mi>b</mi>
                <mo>±</mo>
                <msqrt>
                    <mrow>
                        <msup><mi>b</mi><mn>2</mn></msup>
                        <mo>−</mo>
                        <mn>4</mn>
                        <mi>a</mi>
                        <mi>c</mi>
                    </mrow>
                </msqrt>
            </mrow>
            <mrow>
                <mn>2</mn>
                <mi>a</mi>
            </mrow>
        </mfrac>
    </mrow>
</math>
```

This fix ensures that MathML content renders correctly in browsers when added dynamically through Blazor's renderer, resolving issues where MathML elements were previously created as regular HTML elements without the proper namespace.

### `InvokeVoidAsync()` analyzer

A new Blazor analyzer (BL0010) has been added that recommends using `InvokeVoidAsync` instead of `InvokeAsync<object>` when calling JavaScript functions that don't return values. This analyzer helps developers write more efficient JSInterop code.

**Problematic code:**

```csharp
// ⚠️ BL0010: Use InvokeVoidAsync for JavaScript functions that don't return a value
await JSRuntime.InvokeAsync<object>("console.log", "Hello");
```

**Recommended code:**

```csharp
// ✅ Correct: Use InvokeVoidAsync
await JSRuntime.InvokeVoidAsync("console.log", "Hello");
```

The analyzer helps catch performance issues where `InvokeAsync` is unnecessarily used with `object` or ignored return values, guiding developers toward the more appropriate `InvokeVoidAsync` method.

### `IComponentPropertyActivator`

Blazor now provides `IComponentPropertyActivator` for customizing how `[Inject]` properties are populated on components. This enables advanced scenarios such as:

* Providing additional context for property resolution.
* Support for custom DI containers that need to intercept property injection.
* Advanced scenarios requiring property injection customization.

```csharp
public interface IComponentPropertyActivator
{
    Action<IServiceProvider, IComponent> GetActivator(
        [DynamicallyAccessedMembers(Component)] Type componentType);
}
```

The default implementation caches activators per component type, supports keyed services via `[Inject(Key = "...")]`, integrates with Hot Reload for cache invalidation, and includes proper trimming annotations for AOT compatibility.

### SignalR `ConfigureConnection` for Interactive Server components

Blazor now provides access to configure the underlying SignalR connection options when using Interactive Server components through the new `ConfigureConnection` property on `ServerComponentsEndpointOptions`. This enables configuration of `HttpConnectionDispatcherOptions` properties that were previously only accessible through workarounds.

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

### `IHostedService` support in Blazor WebAssembly

Blazor WebAssembly now supports `IHostedService` for running background services in the browser. This brings feature parity with Blazor Server and enables scenarios like periodic data refresh, real-time updates, and background processing.

```csharp
public class DataRefreshService : IHostedService
{
    private Timer? _timer;
    
    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(RefreshData, null, TimeSpan.Zero, TimeSpan.FromMinutes(5));
        return Task.CompletedTask;
    }

    private void RefreshData(object? state)
    {
        // Refresh data periodically
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Dispose();
        return Task.CompletedTask;
    }
}

// Registration
builder.Services.AddHostedService<DataRefreshService>();
```

Hosted services are started when the app starts and stopped when it shuts down, providing a clean lifecycle for background operations in Blazor WebAssembly apps.

### Configure Blazor client behavior from the server

<!-- UPDATE 11.0 - We need reference article coverage for this, but we'll wait
                   for the API to completely stabilize at RC2 and possibly
                   for content from the PU to arrive. -->

Blazor apps can now configure client-side startup behavior from the server in C# when mapping Razor components instead of hand-writing `Blazor.start` JavaScript. `WithBrowserOptions` sets options that the server serializes into the rendered page and the Blazor script applies in the browser, across the Server, WebAssembly, and Auto render modes. The options cover the client log level, interactive Server reconnection, whether enhanced navigation preserves the DOM, and a WebAssembly runtime's environment name, culture, and environment variables:

```csharp
app.MapRazorComponents<App>()
    .WithBrowserOptions(options =>
    {
        options.InteractiveServer.ReconnectionDialogId = "reconnect-dialog";
        options.InteractiveServer.ReconnectionMaxRetries = 10;
        options.InteractiveServer.ReconnectionRetryInterval = TimeSpan.FromSeconds(1.5);
        options.InteractiveWebAssembly.EnvironmentVariables["OTEL_EXPORTER_OTLP_ENDPOINT"] =
            "https://localhost:4318";
        options.StaticServer.CircuitInactivityTimeout = TimeSpan.FromSeconds(1.5);
        options.StaticServer.PreserveDom = true;
        options.InteractiveWebAssembly.ApplicationCulture = "en-ca";
        options.InteractiveWebAssembly.EnvironmentName = "Staging";
        options.LogLevel = LogLevel.Warning;
    });
```

You can also set the options in a Razor component with the `ConfigureBrowser` component:

```razor
<ConfigureBrowser Options="RequestBrowserOptions" />

...
    
@code {
    private BrowserOptions RequestBrowserOptions => new()
    {
        LogLevel = LogLevel.Trace,
        StaticServer = { PreserveDom = true }
    };
}
```

Read the resolved options from `HttpContext` with `GetBrowserOptions()`:

```razor
@BrowserOptions.GetBrowserOptions(HttpContext).LogLevel
```

For more information, see the following resources:

* [API Proposal: BrowserOptions for server-to-client configuration (`dotnet/aspnetcore` #66393)](https://github.com/dotnet/aspnetcore/issues/66393)
* [Reshape BrowserConfiguration API per review (BrowserOptions) while preserving the JS wire format (`dotnet/aspnetcore` #67337)](https://github.com/dotnet/aspnetcore/pull/67337)
* [Reshape BrowserOptions server-to-client configuration API per review (`dotnet/aspnetcore` #67918)](https://github.com/dotnet/aspnetcore/pull/67918)

Please don't comment on closed issues and PRs. Open a new issue to provide feedback on this API.

### Environment variables in Blazor WebAssembly configuration

Blazor WebAssembly applications can now access environment variables through `IConfiguration`. This enables runtime configuration without rebuilding the application, making it easier to deploy the same build to different environments.

In the following example, the `API_ENDPOINT` and `ENABLE_FEATURE_X` environment variables are automatically included in configuration:

```csharp
var builder = WebAssemblyHostBuilder.CreateDefault(args);

var apiEndpoint = builder.Configuration["API_ENDPOINT"];
var featureFlag = builder.Configuration["ENABLE_FEATURE_X"];
```

Environment variables are loaded into the configuration system alongside other configuration sources, such as app settings (`appsettings.json`), providing a unified way to access configuration values regardless of their source.

### Blazor WebAssembly component metrics and tracing

Blazor WebAssembly apps now provide component specific metrics and tracing when support for metrics has been enabled in the runtime.

### Enable container support in Blazor Web App template

The Blazor Web App project template now supports the **Enable container support** option in Visual Studio. This makes it easier to containerize Blazor Web Apps and deploy them to container orchestration platforms, such as Kubernetes or Azure Container Apps.

### Static SSR supports client-side validation

Blazor static server-side rendering (static SSR) forms now get instant, in-browser validation feedback without a server round-trip, matching the experience provided by interactive Blazor apps and MVC apps with unobtrusive validation. The .NET model remains the single source of truth for validation rules. The server renders metadata for the validation rules which are then enforced by the Blazor JS code on the client-side.

The feature is enabled by default for all static SSR forms that include the `DataAnnotationsValidator` component. Both enhanced and non-enhanced forms are supported.

Complete feature coverage is available in [blazor/forms/validation-client-side](../blazor/forms/validation-client-side.md).

For more information, see the following resources:

* [Add .NET support for client-side validation in Blazor SSR (`dotnet/aspnetcore` #66441)](https://github.com/dotnet/aspnetcore/pull/66441)
* [Add JS library for client-side validation in Blazor SSR (`dotnet/aspnetcore` #66420)](https://github.com/dotnet/aspnetcore/pull/66420)

Please don't comment on closed issues and PRs. If you have feedback on this feature, please open a new issue on the `dotnet/aspnetcore` GitHub repository.

### Asynchronous form validation support

Blazor forms receive support for async validation rules, such as database lookups or remote API calls. In any rendering mode, `EditForm` submit validation awaits async validators end-to-end.

The built-in `DataAnnotationsValidator` component runs the asynchronous `DataAnnotations` APIs (`AsyncValidationAttribute` and `IAsyncValidatableObject`), so asynchronous rules declared on the model work without additional configuration.

Validator components register asynchronous work with `ValidationRequestedEventArgs.AddAsyncValidator` for the whole form and `EditContext.RegisterAsyncFieldValidator` for a single field. The framework owns the cancellation token source, cancels superseded validations, and exposes progress with `IsValidationPending(field)` and `IsValidationFaulted(field)`.

```razor
<EditForm EditContext="editContext" OnValidSubmit="HandleSubmit">
    <InputText @bind-Value="model.Username" />
    @if (editContext.IsValidationPending(() => model.Username))
    {
        <span>Checking availability...</span>
    }
    <ValidationMessage For="() => model.Username" />
    <button type="submit">Register</button>
</EditForm>

@code {
    [Inject] public UserService Users { get; set; } = default!;

    private readonly RegistrationModel model = new();
    private EditContext editContext = default!;
    private ValidationMessageStore messages = default!;

    protected override void OnInitialized()
    {
        editContext = new EditContext(model);
        messages = new ValidationMessageStore(editContext);
        editContext.OnFieldChanged += (_, e) =>
        {
            if (e.FieldIdentifier.FieldName == nameof(model.Username))
            {
                editContext.RegisterAsyncFieldValidator(e.FieldIdentifier,
                    token => CheckAsync(e.FieldIdentifier, model.Username, token));
            }
        };
    }

    private async Task CheckAsync(FieldIdentifier field, string value, CancellationToken ct)
    {
        messages.Clear(field);
        if (await Users.IsUsernameTakenAsync(value, ct))
        {
            messages.Add(field, "Username is taken.");
        }
        editContext.NotifyValidationStateChanged();
    }

    private Task HandleSubmit() => RegisterAsync();
}
```

Complete feature coverage is available in [blazor/forms/validation-advanced](../blazor/forms/validation-advanced.md).

For more information, see [Add built-in support for async form validation in Blazor (`dotnet/aspnetcore` #66526)](https://github.com/dotnet/aspnetcore/pull/66526).

Please don't comment on closed issues and PRs. If you have feedback on this feature, please open a new issue on the `dotnet/aspnetcore` GitHub repository.

### Fixes to TempData and `[SupplyParameterFromSession]` persistence for streaming SSR

When a page uses session-backed features, where a component has a `[SupplyParameterFromSession]` parameter (which creates a subscription) or the session-storage TempData provider is active, the session cookie (`.AspNetCore.Session`) is now issued before streaming begins, even if no value is ultimately written. Pages that don't use session-backed features are unaffected.

For more information, see [Fix TempData and SupplyParameterFromSession persistence for streaming SSR case (`dotnet/aspnetcore` #66832)](https://github.com/dotnet/aspnetcore/pull/66832). (Please don't comment on closed issues and PRs.)

### Antiforgery middleware (`app.UseAntiforgery()`) optional in Blazor Web Apps

[CSRF protection](https://learn.microsoft.com/search/?terms=security%2Fanti-request-forgery%23automatic-csrf-protection-in-aspnet-core) is enabled by default via the auto-injected CSRF protection middleware, so an explicit `app.UseAntiforgery()` call in a Blazor Web App is usually unnecessary and should only be added for specific use cases. The call no longer appears in apps created from the Blazor Web App project template.

For more information, see the following resources:

* [migration/100-to-110](../migration/100-to-110.md)
* [Blazor server-side rendering defers antiforgery validation to middleware (breaking change announcement)](https://learn.microsoft.com/aspnet/core/breaking-changes/11/blazor-server-side-rendering-deferred-cross-site-request-forgery-protection)

General coverage for the new automatic CSRF protection in ASP.NET Core:

* [security/anti-request-forgery](../security/anti-request-forgery.md)
* [blazor/forms/index](../blazor/forms/index.md)
* [blazor/security/index](../blazor/security/index.md)

### Blazor Virtualize can scroll to an item

The `Virtualize<TItem>` component can now open at a specific item and scroll to any item on demand. Two new public APIs make this possible:

* `InitialItemIndex` positions the list at a given item on the first interactive render, so the list opens at that item without a flash of the first item.
* `ScrollToItemAsync(int itemIndex, CancellationToken cancellationToken = default)` scrolls to an item at any time after the first render and returns a `Task` that completes when the target is aligned to the top of the viewport.

```razor
<Virtualize TItem="Product" Items="products" InitialItemIndex="500" @ref="list">
    <div class="product">@context.Name</div>
</Virtualize>

<button @onclick="GoToTop">Back to top</button>

@code {
    private Virtualize<Product> list = default!;
    private List<Product> products = ProductCatalog.All;

    private async Task GoToTop() => await list.ScrollToItemAsync(0);
}
```

Out-of-range indexes are clamped to the valid range. If a second `ScrollToItemAsync` call starts while one is still in flight, the last call wins. Calling `ScrollToItemAsync` before the first interactive render throws `InvalidOperationException`; use `InitialItemIndex` to set the starting position instead.

For more information, see the following resources:

* [blazor/components/virtualization#scroll-to-a-specific-item](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fvirtualization%23scroll-to-a-specific-item)
* [Add `InitialIndex` (sic&dagger;) parameter and `ScrollToIndexAsync` (sic&dagger;) API to `Virtualize<TItem>` (`dotnet/aspnetcore` #66753)](https://github.com/dotnet/aspnetcore/pull/66753). (Please don't comment on closed issues and PRs. *sic*&dagger;: API naming was changed without updating the title of the PR.)

### Automatic circuit pause on tab inactivity

Auto-pause can pause a circuit when the browser tab becomes hidden, freeing server memory and SignalR connections held by inactive users. It's an opt-in feature provided by the `Microsoft.AspNetCore.Components.Server.AutoPause` package. After adding a package reference, enable the feature by calling `AddAutoPause` when the app's root component is mapped:

```csharp
app.MapRazorComponents<App>()
    .WithBrowserOptions(options => options.AddAutoPause(p => p.HiddenDelay = TimeSpan.FromSeconds(30)));
```

After the tab is hidden for a configurable delay period (default: 2 minutes), the circuit pauses. If the user returns before the delay elapses, the pause doesn't occur.

For more information, see [blazor/state-management/server](../blazor/state-management/server.md).

### Wider support for `AuthorizationPolicy` and `IAuthorizationRequirementData`

Starting in .NET 11, you can apply [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) attributes to SignalR hubs and hub methods, MVC controllers and actions, and Blazor's [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component) and [`AuthorizeRouteView`](../blazor/security/authentication-state.md) components, not just to endpoints. For apps that target releases earlier than .NET 11, these attributes are only enforced on Minimal API and routed endpoints.

For more information, see [security/authorization/iard](../security/authorization/custom-authorization-policies-with-iauthorizationrequirementdata.md).

### QuickGrid APIs from Virtualize are exposed

The following new [`QuickGrid` component](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid) APIs are exposed when a grid is virtualized ([Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A) set to `true`):

* `InitialItemIndex`: Scrolls the grid to the given zero-based row index on the first interactive render. The value is applied once and clamped to the valid range. This forwards to the inner `Virtualize` component. For more information, see [blazor/components/virtualization](../blazor/components/virtualization.md).
* `ScrollToItemAsync`: Programmatically scrolls the grid to the given zero-based row index, aligning it to the top. The last call wins, and the method throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) when virtualization is disabled or the grid isn't rendered yet. This forwards to the inner `Virtualize` component. For more information, see [blazor/components/virtualization](../blazor/components/virtualization.md).
* `AnchorMode`: Controls how the viewport behaves at list edges when items are dynamically added (default: `Start`). This is an experimental API that requires opting in to the `ASP0030` diagnostic, and it forwards to the inner `Virtualize` component. For more information, see [blazor/components/virtualization](../blazor/components/virtualization.md).
* `ItemComparer`: A comparer used to detect whether items were prepended or appended between data loads, which is useful for class-typed items supplied by an [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemsProvider%252A). This is an experimental API that requires opting in to the `ASP0030` diagnostic, and it forwards to the inner `Virtualize` component. For more information, see [blazor/components/virtualization](../blazor/components/virtualization.md).

For more information, see [blazor/components/quickgrid](../blazor/components/quickgrid.md).

### Cache rendered output of a component subtree during static SSR

The new `CacheView` component caches the rendered output of a Razor component subtree during static server-side rendering (static SSR). On a cache hit, cached markup is replayed without instantiating or running the lifecycle of the child components that were included in the cached output.

`CacheView` is useful for expensive, mostly static sections of a page that don't require the entire response to be cached:

```razor
<CacheView VaryByQuery="category" ExpiresAfter="TimeSpan.FromMinutes(5)">
    <ProductList Category="@Category" />
</CacheView>
```

For more information, see [blazor/state-management/cacheview-component](../blazor/state-management/cacheview-component.md).

### Blazor Server circuits update after authentication refresh

Interactive Server components can now receive the refreshed `ClaimsPrincipal` without reconnecting the circuit. The Blazor component hub and client enable authentication refresh automatically, so no additional configuration is required.

After the connection refreshes its authentication, Blazor updates the authentication state and raises `AuthenticationStateChanged`. Components that consume `AuthenticationStateProvider`, including `AuthorizeView`, rerender using the refreshed identity and claims. This behavior is useful when a user's roles or permissions change during an active circuit or when a component should reload user-specific content after claims are refreshed. The UI can reflect the new authentication state without forcing the user to reconnect or reload the page.

For more information, see the following resources:

* [[Blazor] Propagate SignalR authentication refresh to server circuits (`dotnet/aspnetcore` #68221)](https://github.com/dotnet/aspnetcore/pull/68221)
* [[release/11.0-rc1] Harden SignalR authentication refresh (`dotnet/aspnetcore` #68593)](https://github.com/dotnet/aspnetcore/pull/68593)

Please don't comment on closed issues and PRs. If you have feedback on this feature, please open a new issue on the `dotnet/aspnetcore` GitHub repository.

### Experimental Blazor AI components for agentic user interfaces

Modern AI apps increasingly provide rich interactions with agents. A complete agentic user interface may need to stream ongoing work, visualize agent reasoning and progress, request approval before tools act, accept multimodal input, and synchronize state between the app and the agent. The Blazor AI components are designed to provide building blocks for creating these experiences using Blazor's component model.

The new [`Microsoft.AspNetCore.Components.AI` NuGet package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.AI) includes an initial set of Blazor AI components for streaming chat, rich-text and tool rendering, human approval flows, and typed, shared, and predictive UI state.

#### Get started

<!-- UPDATE 11.0 - Update the package reference. -->

> **Important:**
> The `Microsoft.AspNetCore.Components.AI` package is a prerelease, experimental package throughout .NET 11.

Add the package to a Blazor app:

```dotnetcli
dotnet add package Microsoft.AspNetCore.Components.AI --prerelease
```

Basic chat and the Components.AI block model work with any `IChatClient`. To connect the Blazor app to a remote agent over the [Agent User Interaction Protocol (AG-UI)](https://ag-ui.com), install the `AGUI.Client` package:

```dotnetcli
dotnet add package AGUI.Client
```

`AGUI.Client` includes a transitive reference to `AGUI.Abstractions`, which provides the AG-UI event types used in later examples. Register an [`AGUIChatClient`](https://docs.ag-ui.com/sdk/dotnet/client/chat-client) as the app's `IChatClient`:

```csharp
using AGUI.Client;
using Microsoft.Extensions.AI;

builder.Services.AddHttpClient<IChatClient>(httpClient =>
    new AGUIChatClient(new(httpClient, "https://api.example.com/agent")));
```

`AGUIChatClient` streams AG-UI events as `ChatResponseUpdate` values. The Blazor AI components render the conversational content from these updates, while apps can use the additional AG-UI event information to build richer agentic interactions. While basic chat functionality is supported with any `IChatClient`, AG-UI is required when a remote server and the Blazor client must exchange frontend tool declarations, backend tool events, approval interrupts, shared-state events, or AG-UI conversation identifiers.

Microsoft Agent Framework (MAF) can expose an `AIAgent` through an ASP.NET Core AG-UI endpoint. For the server-side setup, see [AG-UI integration with Agent Framework](https://learn.microsoft.com/agent-framework/integrations/by-component/ui/ag-ui/) and its [.NET getting-started guide](https://learn.microsoft.com/agent-framework/integrations/by-component/ui/ag-ui/getting-started).

#### Build a basic streaming conversation

The first step in an agentic UI is often a basic conversation that streams responses and retains message history across turns. The [initial chat support](https://github.com/dotnet/aspnetcore/pull/68323) is provider- and protocol-neutral. Apps supply an `IChatClient` from `Microsoft.Extensions.AI`, and `UIAgent` converts its streaming responses into observable content blocks.

`ChatPage` is a complete chat shell that combines three lower-level components:

* `AgentBoundary` creates and cascades the conversation state.
* `MessageList` renders each turn as it streams and provides default typing, error, and retry UI.
* `MessageInput` sends messages from a text area and disables input while a response is streaming.

The following component creates a `UIAgent` over an app-provided `IChatClient` and renders the conversation with `ChatPage`:

```razor
@rendermode InteractiveServer
@using Microsoft.AspNetCore.Components.AI
@using Microsoft.Extensions.AI
@implements IDisposable
@inject IChatClient ChatClient

<ChatPage Agent="agent" Placeholder="Type a message...">
    <WelcomeContent>
        <p>Ask the agent a question.</p>
    </WelcomeContent>
</ChatPage>

@code {
    private UIAgent agent = default!;

    protected override void OnInitialized()
    {
        agent = new UIAgent(ChatClient);
    }

    public void Dispose() => agent.Dispose();
}
```

`Placeholder` sets the hint shown in the empty message input. `WelcomeContent` supplies the content shown before the first message is sent.

Include the component styles in the `App` component (`Components/App.razor`):

```razor
<link rel="stylesheet" href="@Assets["_content/Microsoft.AspNetCore.Components.AI/ai-chat.css"]" />
```

Blazor AI chat interface showing a conversation with a travel planning agent

#### Render content blocks

An `IChatClient` streams model-facing content, such as `TextContent`, `RichTextContent`, and `FunctionCallContent`, in `ChatResponseUpdate` values. `UIAgent` maps this response content into UI-facing `ContentBlock` objects that retain rendering state and can update in place while the response streams. For example, both plain-text fragments and structured rich-text snapshots map to a `RichContentBlock`.

The built-in block types include:

* `RichContentBlock` for streamed text and structured rich content.
* `FunctionInvocationContentBlock` for a server function call and its eventual result.
* `UIActionBlock` for a function that runs in the Blazor app.
* `FunctionApprovalBlock` for a function call that is waiting for user approval.
* `ActivityContentBlock` for application-defined progress that updates in place.

`ChatPage` and `MessageList` include default rendering for `RichContentBlock` and `FunctionApprovalBlock`. Add a `BlockRenderer<TBlock>` to `ChatPage.MessageListContent` to replace this default rendering or render another block type. Its child content receives the matching block as `context`, including its current properties as they change during streaming.

The following example replaces the default rendering for conversational content:

```razor
<ChatPage Agent="agent">
    <MessageListContent>
        <BlockRenderer TBlock="RichContentBlock" Context="block">
            <div class="agent-response">@block.RawText</div>
        </BlockRenderer>
    </MessageListContent>
</ChatPage>
```

Use the renderer's `When` predicate to only handle selected blocks of a type. If multiple renderers match, the most recently registered renderer takes precedence. Apps can also define custom `ContentBlock` types and map response content to them with a `ContentBlockHandler<TState>`.

#### Render structured rich text

The [rich-text support](https://github.com/dotnet/aspnetcore/pull/68324) permits an agent to return a structured presentation model instead of plain text. `RichTextContent` is response content that contains both plain text and `RichTextNode` values for headings, paragraphs, emphasis, links, lists, code blocks, tables, and other presentation elements. `UIAgent` maps it to the same `RichContentBlock` used for plain `TextContent` but uses the supplied node tree instead of creating simple paragraphs.

Apps can produce `RichTextContent` directly or use `IChatClient` middleware to transform streamed `TextContent`, such as by parsing markdown into `RichTextNode` values. The package doesn't require or include a particular markdown implementation. Each `RichTextContent` is a complete snapshot, so it atomically replaces the previous content for the same message as streaming progresses. `ChatPage` and `MessageList` then render the structured content without requiring a custom `BlockRenderer`.

#### Render server tool calls

An agent can call a tool that runs on its server while the Blazor app renders the operation using app-specific UI. For example, the agent can call a weather tool, and the app can show the requested location immediately, followed by a weather card when the server returns the result.

Server tool calls become `FunctionInvocationContentBlock` instances, which pair the `FunctionCallContent` with its eventual `FunctionResultContent` and expose the tool name, arguments, and completion state.

The package's source generator creates a strongly typed block handler from a class annotated with `ToolBlock`, `ToolParameter`, and `ToolResult` ([[Blazor] Add Components.AI server tool rendering (`dotnet/aspnetcore` #68327)](https://github.com/dotnet/aspnetcore/pull/68327)):

```csharp
[ToolBlock("get_weather")]
public partial class WeatherToolBlock : FunctionInvocationContentBlock
{
    [ToolParameter(Name = "location")]
    public string? Location { get; set; }

    [ToolResult]
    public WeatherInfo? Weather { get; set; }
}
```

Register the generated handlers when constructing the `UIAgent`:

```csharp
var agent = new UIAgent(
    chatClient,
    options => options.AddGeneratedToolBlocks());
```

Render the generated block in `MessageListContent`:

```razor
<ChatPage Agent="agent">
    <MessageListContent>
        <BlockRenderer TBlock="WeatherToolBlock">
            @if (context.HasResult)
            {
                <p>@context.Location: @context.Weather?.Temperature&deg;C</p>
            }
            else
            {
                <p>Checking the weather for @context.Location...</p>
            }
        </BlockRenderer>
    </MessageListContent>
</ChatPage>
```

As the call arguments stream, the generated handler updates `Location` while `HasResult` remains `false`. When the result arrives, it populates `Weather`, sets `HasResult` to `true`, and rerenders the same block as the completed weather card.

A generated typed tool block rendering a weather result

When MAF hosts the remote agent, backend tools use its normal tool pipeline and AG-UI transports the call and result to the client. See [Backend tool rendering with AG-UI](https://learn.microsoft.com/agent-framework/integrations/by-component/ui/ag-ui/backend-tool-rendering).

#### Run frontend tools

Frontend tools run in the client app rather than on the agent server. For example, a Blazor app can expose a tool that changes UI state, reads a local preference, or asks the user for input. Create the tool with `AIFunctionFactory` from `Microsoft.Extensions.AI`, then register it with `UIAgentOptions.RegisterUIAction` ([[Blazor] Add Components.AI client tool rendering (`dotnet/aspnetcore` #68325)](https://github.com/dotnet/aspnetcore/pull/68325)).

`RegisterUIAction` advertises the `AIFunction` to the agent. When the agent requests it, `UIAgent` creates a `UIActionBlock` instead of executing the function immediately:

```csharp
var setAccentColor = AIFunctionFactory.Create(
    async (string color) =>
    {
        await InvokeAsync(() =>
        {
            accentColor = color;
            StateHasChanged();
        });
        return $"Changed the accent color to {color}.";
    },
    name: "set_accent_color");

var agent = new UIAgent(
    chatClient,
    options => options.RegisterUIAction(setAccentColor))
```

Place a `BlockRenderer<UIActionBlock>` in `MessageListContent` to handle the function call requested by the agent. For example, the renderer can use a component that automatically invokes the function and displays its progress:

```razor
<ChatPage Agent="agent">
    <MessageListContent>
        <BlockRenderer TBlock="UIActionBlock"
                       When='@(action => action.ToolName == "set_accent_color")'
                       Context="action">
            <AutoInvokeAction Action="action" />
        </BlockRenderer>
    </MessageListContent>
</ChatPage>
```

The `AutoInvokeAction` component calls `InvokeAsync` when it receives the block:

```razor
@if (Action.IsComplete)
{
    <span>Accent color updated</span>
}
else
{
    <span>Updating accent color...</span>
}

@code {
    [Parameter, EditorRequired]
    public UIActionBlock Action { get; set; } = default!;

    protected override async Task OnInitializedAsync()
    {
        if (!Action.IsComplete)
        {
            await Action.InvokeAsync();
        }
    }
}
```

Calling `InvokeAsync` executes the registered function with the arguments supplied by the agent. The function runs wherever the Blazor UI runs: in the server-side circuit for Blazor Server or in the browser for WebAssembly. When the function completes, `UIAgent` sends its result back to the agent and continues the conversation. Use the renderer's `When` predicate to provide different handling for each `action.ToolName`. A renderer can invoke the action automatically, as shown here, or present UI that collects input or confirmation first.

#### Require approval before tools run

An app can require the user to approve a consequential tool call, such as scheduling a meeting, before the agent proceeds. Tool approval requests become `FunctionApprovalBlock` instances. The conversation pauses until the UI calls `Approve` or `Reject` ([[Blazor] Add Components.AI human approval flows (`dotnet/aspnetcore` #68329)](https://github.com/dotnet/aspnetcore/pull/68329)):

```razor
<ChatPage Agent="agent">
    <MessageListContent>
        <BlockRenderer TBlock="FunctionApprovalBlock" Context="approval">
            <p>Allow <code>@approval.ToolName</code> to run?</p>
            <button @onclick="approval.Approve">Approve</button>
            <button @onclick="() => approval.Reject()">Reject</button>
        </BlockRenderer>
    </MessageListContent>
</ChatPage>
```

A tool call waiting for human approval

For a MAF agent, the server decides which functions require approval, and AG-UI transports the request and decision. See [Human-in-the-loop with AG-UI](https://learn.microsoft.com/agent-framework/integrations/by-component/ui/ag-ui/human-in-the-loop).

#### Display activities

An activity is an app-defined progress item that updates in place while an agent performs longer-running work. For example, a research agent can show that it's searching sources, comparing results, and completing the research without adding a separate message for every update.

`ActivityHandler<TBlock>` is a protocol-neutral extension point that maps provider- or app-specific progress updates into a mutable `ActivityContentBlock` ([[Blazor] Add agentic generative UI state rendering (`dotnet/aspnetcore` #68333)](https://github.com/dotnet/aspnetcore/pull/68333)). `TryCreateBlock` initializes and emits the block for the first matching update. `TryUpdateBlock` mutates the same block as later updates arrive and indicates when the activity is complete. Register the handler with `UIAgentOptions.AddBlockHandler`, then provide a `BlockRenderer` for the app-specific block. Activities don't have a default visual representation.

AG-UI's `ACTIVITY_SNAPSHOT` and `ACTIVITY_DELTA` events are one possible source of these updates. `AGUIChatClient` exposes the original event through `ChatResponseUpdate.RawRepresentation`. For example, an app can handle replacing snapshots whose payload includes an app-defined `complete` property:

```csharp
using System.Text.Json;
using Microsoft.AspNetCore.Components.AI;
using AGUI.Abstractions;

public sealed class ResearchActivityBlock : ActivityContentBlock
{
    public string ActivityMessageId { get; set; } = "";
}

public sealed class ResearchActivityHandler
    : ActivityHandler<ResearchActivityBlock>
{
    protected override bool TryCreateBlock(
        BlockMappingContext context,
        ResearchActivityBlock state)
        => TryApplySnapshot(context, state, out _);

    protected override bool TryUpdateBlock(
        BlockMappingContext context,
        ResearchActivityBlock state,
        out bool isCompleted)
        => TryApplySnapshot(context, state, out isCompleted);

    private static bool TryApplySnapshot(
        BlockMappingContext context,
        ResearchActivityBlock state,
        out bool isCompleted)
    {
        isCompleted = false;

        if (context.Update.RawRepresentation is not ActivitySnapshotEvent snapshot ||
            (state.ActivityMessageId.Length > 0 &&
             (state.ActivityMessageId != snapshot.MessageId ||
              snapshot.Replace == false)))
        {
            return false;
        }

        state.ActivityMessageId = snapshot.MessageId;
        state.ActivityType = snapshot.ActivityType;
        state.Content = snapshot.Content;
        isCompleted =
            snapshot.Content.ValueKind == JsonValueKind.Object &&
            snapshot.Content.TryGetProperty("complete", out var complete) &&
            complete.ValueKind == JsonValueKind.True;
        context.MarkUpdateHandled();
        return true;
    }
}
```

The handler stores the AG-UI message ID on the block to correlate later snapshots. Apps that consume `ActivityDeltaEvent` instead apply its RFC 6902 JSON Patch operations to the current `Content` before returning from `TryUpdateBlock`. The app defines the activity payload and completion semantics; Components.AI doesn't include an AG-UI-specific activity handler or JSON Patch implementation.

#### Shared state

Agentic UIs often show a shared workspace alongside the conversation, such as a recipe, document, form, or plan that the agent can update. `UIAgent<TState>` exposes this data as typed, observable UI state separately from conversational content ([[Blazor] Add agentic generative UI state rendering (`dotnet/aspnetcore` #68333)](https://github.com/dotnet/aspnetcore/pull/68333)).

The app configures a state mapper for the `ChatResponseUpdate` values produced by its `IChatClient`. In an AG-UI integration, the agent server explicitly maps selected tool results to `STATE_SNAPSHOT` or `STATE_DELTA` events. `AGUIChatClient` then exposes those events through `ChatResponseUpdate.RawRepresentation`, where the Blazor app can deserialize them and call `SetState`:

```csharp
using System.Text.Json;
using AGUI.Abstractions;
using Microsoft.AspNetCore.Components.AI;

var agent = new UIAgent<RecipeState>(chatClient, options =>
{
    options.StateMapper = context =>
    {
        if (context.Update.RawRepresentation is StateSnapshotEvent snapshot &&
            snapshot.Snapshot.Deserialize<RecipeState>(
                JsonSerializerOptions.Web) is { } state)
        {
            context.SetState(state);
        }
    };
});
```

Read the current value from `agent.State.Value` and subscribe to `agent.State.OnChanged` when the surrounding component needs to rerender. State mappers can also handle app-specific `AIContent` from other `IChatClient` implementations.

Typed agent state rendered as a recipe card

For the corresponding MAF server configuration, including mapping tool results to state snapshots and deltas, see [State management with AG-UI](https://learn.microsoft.com/agent-framework/integrations/by-component/ui/ag-ui/state-management).

#### Show predictive UI state

Predictive state permits an app to render an agent's proposed state change while the model is still generating it without replacing the committed state. For example, as an agent generates the complete contents of an edited document in a tool argument, the UI can progressively display the proposed document and a diff. When generation finishes, the user can accept the completed proposal or reject it and restore the committed document.

An AG-UI server integration can map streamed arguments for a state-writing tool to provisional state events. The completed tool-call arguments are the authoritative proposal. When creating the `UIAgent<TState>`, configure its state mapper to deserialize those events and call `SetPredictiveState`. `AgentState<TState>` then retains the prior committed value for rollback ([[Blazor] Add predictive state updates (`dotnet/aspnetcore` #68335)](https://github.com/dotnet/aspnetcore/pull/68335)):

```csharp
using System.Text.Json;
using AGUI.Abstractions;
using Microsoft.AspNetCore.Components.AI;

var agent = new UIAgent<DocumentState>(chatClient, options =>
{
    options.StateMapper = context =>
    {
        if (context.Update.RawRepresentation is StateSnapshotEvent snapshot &&
            snapshot.Snapshot.Deserialize<DocumentState>(
                JsonSerializerOptions.Web) is { } predictedState)
        {
            context.SetPredictiveState(predictedState);
        }
    };

    options.RegisterUIAction(AIFunctionFactory.Create(
        ConfirmChanges,
        name: "confirm_changes",
        description: "Confirm the proposed document changes."));
});
```

The example also registers a `confirm_changes` frontend action. When the action appears, a custom block renderer displays the accept and reject controls. The renderer adds the user's choice as the `accepted` argument and calls `UIActionBlock.InvokeAsync`, which runs the registered callback:

```csharp
private string ConfirmChanges(bool accepted)
{
    if (accepted)
    {
        agent.State.AcceptPredictiveState();
    }
    else
    {
        agent.State.RejectPredictiveState();
    }

    return accepted
        ? "The user accepted the changes."
        : "The user rejected the changes.";
}
```

The provisional value is immediately available from `agent.State.Value`, and `HasPendingPredictiveState` indicates that it isn't committed. The callback commits the completed proposal or restores the baseline, and its return value reports the decision to the agent in a follow-up run. If generation fails, is canceled, or ends without a decision, the provisional value is automatically rolled back. The server-side extraction and mapping of streamed tool arguments must be configured explicitly; see [State management with AG-UI](https://learn.microsoft.com/agent-framework/integrations/by-component/ui/ag-ui/state-management).

An express shipping proposal with accept and reject actions

#### Persist and restore conversations

An `IConversationThread` stores completed turns so a UI can rebuild its conversation after the component or app restarts. A thread can also retain protocol metadata, such as the `threadId` and previous `runId` used to continue a server-owned AG-UI conversation.

Pass the thread when constructing `UIAgent`, then call `UIAgent.RestoreAsync` or `AgentContext.RestoreAsync` to explicitly replay the stored updates into content blocks and typed state ([[Blazor] Add shared agent and UI state (`dotnet/aspnetcore` #68334)](https://github.com/dotnet/aspnetcore/pull/68334)):

```csharp
var agent = new UIAgent(
    chatClient,
    options => options.Thread = conversationThread);

var restoredBlocks = await agent.RestoreAsync();
```

Passing a thread to `UIAgent` enables new completed turns to be persisted but doesn't automatically restore earlier turns. For MAF-hosted AG-UI agents, see [AG-UI conversation continuity](https://learn.microsoft.com/agent-framework/integrations/by-component/ui/ag-ui/getting-started#conversation-continuity).


## Blazor Hybrid

This section describes new features for Blazor Hybrid.

*Release notes appear in this section as preview features become available.*


## SignalR

This section describes new features for SignalR.

### SignalR authentication refresh

SignalR connections can refresh authentication without dropping the connection when the access token expires. The server exposes a `/refresh` endpoint alongside `/negotiate` and reports the token lifetime in the negotiate response. A client re-authenticates before the token expires, so a hub connection that previously closed when its bearer token aged out can stay open.

<!-- TODO: Update `EnableAuthenticationRefresh`, `CloseOnAuthenticationExpiration`, `OnAuthenticationRefresh`, `OnAuthenticationRefreshedAsync`, `WithAuthenticationRefresh`, `AuthenticationRefreshed`, `AuthenticationRefreshFailed`, and `RefreshAuthenticationAsync` to <xref:> once API docs are published. -->

Enable the feature per hub on the server. The server can inspect or reject a refreshed identity by returning a value from `OnAuthenticationRefresh`:

```csharp
using System.Security.Claims;

app.MapHub<ChatHub>("/chat", options =>
{
    options.EnableAuthenticationRefresh = true;
    options.CloseOnAuthenticationExpiration = true;

    // Optional: inspect the refreshed identity and decide whether to accept it.
    options.OnAuthenticationRefresh = context =>
    {
        var previousSubject = context.PreviousUser.FindFirstValue("sub")
            ?? context.PreviousUser.FindFirstValue(ClaimTypes.NameIdentifier);
        var newSubject = context.NewUser.FindFirstValue("sub")
            ?? context.NewUser.FindFirstValue(ClaimTypes.NameIdentifier);

        return Task.FromResult(
            previousSubject is not null &&
            string.Equals(previousSubject, newSubject, StringComparison.Ordinal));
    };
});
```

A hub can react to a refreshed identity by overriding `OnAuthenticationRefreshedAsync`:

```csharp
public class ChatHub : Hub
{
    public override Task OnAuthenticationRefreshedAsync()
    {
        // The connection's User has been updated with the refreshed token.
        return Task.CompletedTask;
    }
}
```

Automatic refresh is on by default in the .NET client and is configurable with `WithAuthenticationRefresh`. Refresh notifications are events on [Microsoft.AspNetCore.SignalR.Client.HubConnection](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnection), and `RefreshAuthenticationAsync` requests an immediate refresh after the app obtains new claims:

```csharp
await using var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chat")
    .WithAuthenticationRefresh(options =>
    {
        // EnableAutoRefresh is true by default.
        options.RefreshBeforeExpiration = TimeSpan.FromMinutes(1);
    })
    .Build();

connection.AuthenticationRefreshed += context => Task.CompletedTask;
connection.AuthenticationRefreshFailed += context => Task.CompletedTask;

await connection.StartAsync();

// Refresh immediately after acquiring a token with updated claims.
await connection.RefreshAuthenticationAsync();
```


### Cancel hub invocations from the client

The SignalR client can cancel a regular, non-streaming hub method invocation. Previously only streaming invocations could be canceled from the client. Now, when you pass a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) to [Microsoft.AspNetCore.SignalR.Client.HubConnectionExtensions.InvokeAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Client.HubConnectionExtensions.InvokeAsync%252A) and cancel it, the client sends a cancellation message, and the hub method's `CancellationToken` parameter is triggered on the server.

```csharp
// Client — canceling the token cancels the server-side invocation.
using var cts = new CancellationTokenSource();
var work = connection.InvokeAsync("LongRunningWork", cts.Token);
// ...
cts.Cancel();
```

```csharp
// Hub — accept a CancellationToken to observe client cancellation.
public class WorkHub : Hub
{
    public async Task LongRunningWork(CancellationToken cancellationToken)
    {
        await Task.Delay(TimeSpan.FromMinutes(5), cancellationToken);
    }
}
```


### SignalR .NET client supports authentication refresh after redirects

The SignalR .NET client extends [SignalR authentication refresh](#signalr-authentication-refresh) so it works when negotiate redirects to another server, contributed by [@MoChilia](https://github.com/MoChilia). This client change enables support for redirecting servers such as Azure SignalR Service, which hasn't enabled the feature yet.

The client preserves the app-token provider across the redirect, adopts a refreshed transport token from the response, and retains `tokenLifetimeSeconds` so automatic refresh remains scheduled after the original token expires.

Thank you [@MoChilia](https://github.com/MoChilia) for this contribution!


### SignalR TypeScript client supports authentication refresh

The SignalR TypeScript client supports refreshing an access token without reconnecting. It can schedule a refresh based on the token lifetime that the server reports or refresh immediately after the app obtains updated claims.

Configure automatic refresh by using `withAuthenticationRefresh`. Register success and failure handlers on the built connection, and call `refreshAuthentication` to request a manual refresh:

```typescript
const connection = new signalR.HubConnectionBuilder()
  .withUrl("/clock", { accessTokenFactory: getAccessToken })
  .withAuthenticationRefresh({
    enableAutoRefresh: true,
    refreshBeforeExpirationInMilliseconds: 120_000,
  })
  .build();

connection.onAuthenticationRefreshed((context) => {
  console.log(`New token lifetime: ${context.newTokenLifetimeInSeconds}`);
});

connection.onAuthenticationRefreshFailed((context) => {
  console.error(context.error);
});

await connection.start();

// Refresh immediately after acquiring a token with updated claims.
await connection.refreshAuthentication();
```


## Minimal APIs

This section describes new features for Minimal APIs.

### Endpoint filters observe parameter-binding failures

When a Minimal API endpoint has any filters or filter factories configured, the filter pipeline now runs even if parameter binding fails. Filters can read `HttpContext.Response.StatusCode == 400` and substitute their own response body.

In the `Development` environment, set `RouteHandlerOptions.ThrowOnBadRequest = false` so the framework returns a 400 that the filter can observe instead of throwing [Microsoft.AspNetCore.Http.BadHttpRequestException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.BadHttpRequestException) to the developer exception page. This is already the default in non-`Development` environments.

Thank you [@marcominerva](https://github.com/marcominerva) for this contribution!


### C# union types

ASP.NET Core supports [C# union types](https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-15#union-types) ([C# language reference](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/union)), which are new in .NET 11, anywhere [`System.Text.Json`](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/overview) is used: JSON request and response bodies in Minimal APIs and MVC, SignalR's `JsonHubProtocol`, Blazor JavaScript interop, persistent component state, and prerendered component parameters.

```csharp
public union UnionIntString(int, string);

app.MapGet("/value", () => new UnionIntString(42));
```

Union types aren't supported for non-body binding sources such as route values, query strings, headers, and form fields.

For OpenAPI, an endpoint that returns a union is described with an `anyOf` schema listing each case type. Unlike polymorphic types, union cases don't carry a `$type` discriminator, so each case reuses its standalone component (for example, `#/components/schemas/Dog`) instead of a duplicated, prefixed one. ApiExplorer detects a union through `JsonTypeInfoKind.Union`, so the schema also flows through to Swashbuckle and NSwag. When multiple cases serialize to the same JSON shape, disambiguate them with a `[JsonUnion]` classifier. SignalR unions require the JSON hub protocol; the MessagePack and `Newtonsoft.Json` protocols don't support unions.

For examples and additional information that apply to Blazor apps, see the [Component parameters section in the Components overview article](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Findex%23component-parameters) and the [Pass parameters section of the Dynamically-rendered ASP.NET Core Razor components article](../blazor/components/dynamiccomponent.md).


### Async validation for Minimal APIs

Minimal API validation now supports asynchronous validators end-to-end ([dotnet/aspnetcore #66487](https://github.com/dotnet/aspnetcore/pull/66487), [dotnet/aspnetcore #67183](https://github.com/dotnet/aspnetcore/pull/67183)). Preview 5 shipped the building blocks for asynchronous form validation in Blazor. Preview 6 adds new asynchronous `DataAnnotations` APIs in the base libraries (`AsyncValidationAttribute` and `IAsyncValidatableObject`), and `Microsoft.Extensions.Validation` now runs them when an endpoint validates a request.

The simplest way to add an asynchronous rule is a custom validation attribute. Derive from `AsyncValidationAttribute` and implement `IsValidAsync` to query a database or call a remote API without blocking a thread. The synchronous `IsValid` is abstract too; throw from it when the attribute validates asynchronously only:

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;

public sealed class UniqueEmailAttribute : AsyncValidationAttribute
{
    // Synchronous IsValid. This attribute validates asynchronously only.
    protected override ValidationResult? IsValid(object? value, ValidationContext context) =>
        throw new InvalidOperationException("Validate this attribute with IsValidAsync.");

    protected override async Task<ValidationResult?> IsValidAsync(
        object? value, ValidationContext context, CancellationToken cancellationToken)
    {
        var users = context.GetRequiredService<IUserService>();
        
        if (value is string email && await users.EmailExistsAsync(email, cancellationToken))
        {
            return new ValidationResult("That email is already registered.");
        }

        return ValidationResult.Success;
    }
}
```

Apply `[UniqueEmail]` to a property like any built-in validation attribute.

For validation that spans several properties or the whole object, implement `IAsyncValidatableObject` and return results as an `IAsyncEnumerable<ValidationResult>`. Because `IAsyncValidatableObject` extends `IValidatableObject`, also implement the synchronous `Validate` method. When a type validates asynchronously only, throw from `Validate` so its validation isn't silently skipped by the synchronous APIs:

```csharp
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

public class ReservationRequest : IAsyncValidatableObject
{
    [Required]
    public string Email { get; set; } = "";

    public DateOnly Date { get; set; }

    // Synchronous IValidatableObject. This type validates asynchronously only.
    public IEnumerable<ValidationResult> Validate(ValidationContext context) =>
        throw new InvalidOperationException("Validate this type with ValidateAsync.");

    public async IAsyncEnumerable<ValidationResult> ValidateAsync(
        ValidationContext context,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var rooms = context.GetRequiredService<IRoomService>();

        if (!await rooms.HasAvailabilityAsync(Date, cancellationToken))
        {
            yield return new ValidationResult(
                "No rooms are available on that date.", [nameof(Date)]);
        }
    }
}
```

Register validation and the framework validates the request before the endpoint runs:

```csharp
builder.Services.AddValidation();

app.MapPost("/reservations", (ReservationRequest request) =>
    Results.Ok(request));
```

Validators run concurrently where possible: asynchronous attributes on the same member start together, collection items validate in parallel, and the framework preserves the existing ordering between member, type, and `IValidatableObject` validation.


### Short-circuit endpoints with an attribute

The new `[ShortCircuit]` attribute marks an endpoint to run immediately after routing, skipping the rest of the middleware pipeline. This is the attribute form of the existing `ShortCircuit()` endpoint convention, so it can be applied directly to MVC controllers and actions.

<!-- TODO: Update `[ShortCircuit]` to <xref:> once API docs are published. -->

Short-circuiting is useful for endpoints that don't need authentication, CORS, or other middleware—for example a health check or a `robots.txt` response, and it avoids the cost of running that middleware. The endpoint still runs and produces its response. Pass an optional status code, such as `[ShortCircuit(404)]`, to set the response status code.

```csharp
[ApiController]
[Route("robots.txt")]
[ShortCircuit]
public class RobotsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Content("User-agent: *\nDisallow:", "text/plain");
}
```

The same attribute works on Minimal API endpoints, and the existing `ShortCircuit()` convention continues to work unchanged:

```csharp
app.MapGet("/health", [ShortCircuit] () => "Healthy");
```

Thank you [@Porozhniakov](https://github.com/Porozhniakov) for contributing this feature!


### Validation localization is built in

`Microsoft.Extensions.Validation` localizes validation messages and display names without a separate package. Calling `AddLocalization` to register an `IStringLocalizerFactory`, followed by `AddValidation`, activates localization automatically. The validation source generator emits the localization lookup into your assembly.

<!-- TODO: Update `AddValidation`, `ValidationOptions.LocalizerProvider`, and `IValidationMessageFormatter` to <xref:> once API docs are published. -->

```csharp
builder.Services.AddLocalization();
builder.Services.AddValidation();
```

```csharp
[ValidatableType]
public class CustomerModel
{
    [Display(Name = "CustomerName")]          // resource key for the display name
    [Required(ErrorMessage = "NameRequired")] // resource key for the message
    public string? Name { get; set; }
}
```

By default, keys resolve against the resources of the type that declares the validated member. An explicit `ErrorMessage` value, such as `NameRequired` in the preceding example, is the first resource key that localization tries. When an attribute doesn't specify `ErrorMessage`, localization instead tries built-in resource-name conventions from most to least specific:

1. `{DeclaringType}_{MemberName}_{AttributeType}_Error`
1. `{DeclaringType}_{AttributeType}_Error`
1. `{AttributeType}_Error`

For example, a `[Required]` attribute on `CustomerModel.Name` resolves against `CustomerModel_Name_RequiredAttribute_Error`, `CustomerModel_RequiredAttribute_Error`, or the shared `RequiredAttribute_Error` resource. This allows the default message of an attribute to be translated once for the whole app. If no resource resolves, validation falls back to the attribute's built-in message. Use `ValidationOptions.LocalizerProvider` to resolve keys from a shared resource file instead:

```csharp
builder.Services.AddValidation(options =>
{
    options.LocalizerProvider = (_, factory) => factory.Create(typeof(ValidationMessages));
});
```

Localized strings don't have to come from resource files. Registering a custom `IStringLocalizerFactory` switches validation messages to that factory's backing store, such as a database or JSON files. A user-registered factory takes precedence over the default resource file implementation:

```csharp
builder.Services.AddSingleton<IStringLocalizerFactory, DbStringLocalizerFactory>();
builder.Services.AddValidation();
```

Attributes that already localize themselves (`ErrorMessageResourceType`, `[Display(ResourceType = ...)]`) bypass the pipeline entirely. A custom attribute that needs to substitute its own values into the message template can implement `IValidationMessageFormatter`:

```csharp
public sealed class DivisibleByAttribute : ValidationAttribute, IValidationMessageFormatter
{
    public int Divisor { get; init; }

    public string FormatMessage(CultureInfo culture, string template, string displayName)
        => string.Format(culture, template, displayName, Divisor); // {0} = name, {1} = divisor
}
```

The same localization rules apply to validation for minimal APIs and Blazor, so a message localizes identically wherever the model is used.

Complete feature coverage is available in the following articles:

* [fundamentals/validation](../fundamentals/validation.md)
* [fundamentals/minimal-apis](../fundamentals/minimal-apis.md)

For more information, see [Add localization support to Microsoft.Extensions.Validation (`dotnet/aspnetcore` #66646)](https://github.com/dotnet/aspnetcore/pull/66646).


### Validation attributes are no longer experimental

The [Microsoft.Extensions.Validation.ValidatableTypeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation.ValidatableTypeAttribute) and [Microsoft.Extensions.Validation.SkipValidationAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Validation.SkipValidationAttribute) attributes from the [`Microsoft.Extensions.Validation` NuGet package](https://www.nuget.org/packages/Microsoft.Extensions.Validation) are no longer marked experimental. If you suppressed `ASP0029` to use either attribute, remove the suppression.

For more information, see the following resources:

* [fundamentals/validation](../fundamentals/validation.md)
* [fundamentals/validation](../fundamentals/validation.md)


## OpenAPI

This section describes new features for OpenAPI.

### Describe binary file responses

ASP.NET Core 11 introduces support for generating OpenAPI descriptions for operations that return binary file responses. This support maps the `FileContentResult` result type to an OpenAPI schema with `type: string` and `format: binary`.

#### [Minimal APIs](#tab/minimal-apis)

Use the `Produces<T>` extension method with `T` of `FileContentResult` to specify the response type and content type:
<!-- UPDATE 11.0 - API cross-link needs to be entered in the line above for the new API
such as: <xref:Microsoft.AspNetCore.NEW_API_TO_BE_ENTERED_>
-->

```csharp
app.MapPost("/filecontentresult", () =>
{
    var content = "This endpoint returns a FileContentResult!"u8.ToArray();
    return TypedResults.File(content);
})
.Produces<FileContentResult>(contentType: MediaTypeNames.Application.Octet);
```

#### [Controllers](#tab/controllers)

Use the `ProducesResponseType<T>` attribute with `T` of `FileContentResult` to specify the response type and content type:

```csharp
[HttpPost("filecontentresult")]
[ProducesResponseType<FileContentResult>(StatusCodes.Status200OK, MediaTypeNames.Application.Octet)]
public IActionResult PostFileContentResult()
{
    var content = "This endpoint returns a FileContentResult!"u8.ToArray();
    return new FileContentResult(content, MediaTypeNames.Application.Octet);
}
```

---

The generated OpenAPI document describes the endpoint response as:

```yaml
responses:
  '200':
    description: OK
    content:
      application/octet-stream:
        schema:
          $ref: '#/components/schemas/FileContentResult'
```

The `FileContentResult` is defined in `components/schemas` as:

```yaml
components:
  schemas:
    FileContentResult:
      type: string
      format: binary
```


### OpenAPI 3.2.0 support (Breaking Change)

`Microsoft.AspNetCore.OpenApi` now supports OpenAPI 3.2.0 through an updated dependency on `Microsoft.OpenApi` 3.3.1. This update includes breaking changes from the underlying library. For more information, see the [Microsoft.OpenApi upgrade guide](https://github.com/microsoft/OpenAPI.NET/blob/main/docs/upgrade-guide-3.md).

To generate an OpenAPI 3.2.0 document, specify the version when calling [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A):

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_2;
});
```

Subsequent updates take advantage of new capabilities in the 3.2.0 specification, such as item schema support for streaming events.

Thank you [@baywet](https://github.com/baywet) for this contribution!


### HTTP QUERY in generated OpenAPI documents

OpenAPI document generation now recognizes [HTTP QUERY](https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body/) as a known operation type. QUERY is a proposed safe, idempotent method that lets clients send a request body when describing a search, useful when a query is too large or too structured to fit in a URL. Routing already accepts arbitrary verb strings via `MapMethods`, and OpenAPI 3.2 adds a [`query` field to the Path Item Object](https://spec.openapis.org/oas/v3.2.0.html#fixed-fields-6) so this can be described in the OpenAPI document.

Note that `query` is only valid in an OpenAPI 3.2 document, so set the `OpenApiVersion` in the `OpenApiOptions`. In earlier OpenAPI versions, the `query` operation is generated within an `x-oai-additionalOperations` specification extension in the Path Item Object.

```csharp
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = OpenApiSpecVersion.OpenApi3_2;
});

var app = builder.Build();

app.MapOpenApi();

app.MapMethods("/search", ["QUERY"], (SearchRequest request) =>
    SearchService.Run(request));

app.Run();
```

In an OpenAPI 3.2 document, the QUERY operation is described inline as a sibling of `get`, `post`, and other standard operations:

```json
"paths": {
  "/search": {
    "query": {
      "requestBody": { ... },
      "responses": { "200": { ... } }
    }
  }
}
```

In OpenAPI 3.0 and 3.1 documents, the same operation is represented under the `x-oai-additionalOperations` extension on the Path Item:

```json
"paths": {
  "/search": {
    "x-oai-additionalOperations": {
      "QUERY": {
        "requestBody": { ... },
        "responses": { "200": { ... } }
      }
    }
  }
}
```

Thank you [@kilifu](https://github.com/kilifu) for this contribution!


### File stream result types appear in OpenAPI documents

`FileStreamResult`, `FileContentHttpResult`, and `FileStreamHttpResult` are now described as binary string schemas in generated OpenAPI documents, so clients see accurate response shapes for endpoints that stream files. Annotate the endpoint with `.Produces<FileContentHttpResult>(contentType: "application/pdf")` (or the equivalent `FileStreamHttpResult`/`FileStreamResult` type) so OpenAPI sees the result type and emits the binary schema.

Thank you [@marcominerva](https://github.com/marcominerva) for this contribution!


### OpenAPI schemas better match ASP.NET Core behavior

OpenAPI generation now handles several schema cases more accurately. Non-body enum parameters keep the original C# enum member names even when HTTP JSON options configure a [System.Text.Json.Serialization.JsonStringEnumConverter](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonStringEnumConverter) naming policy, because query, route, header, and form binding use `Enum.TryParse` rather than JSON serialization. Array schema reference IDs now use valid component names such as `stringArray` and `TodoArray` instead of names with array syntax.

```csharp
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter(JsonNamingPolicy.KebabCaseLower));
});

app.MapGet("/orders", (OrderStatus status) => Results.Ok(status));
```

With this configuration, a body schema can still describe `OrderStatus.PendingReview` as `pending-review`, while the query parameter schema describes the accepted value as `PendingReview`.

Minimal API endpoints can support multiple [Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces%252A) extension method calls for the same status code—for example, to specify that a 200 response may arrive as `application/json` or `text/plain` with different schemas. The same support applies to MVC controllers via multiple [`[ProducesResponseType]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute) attributes.

In prior releases, the framework collapsed each status code to a single response type and silently dropped the rest, making it impossible to describe endpoints that serve multiple content types. [Microsoft.AspNetCore.Mvc.ApiExplorer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer) now preserves every declared response type with deterministic ordering, and the generated OpenAPI document emits separate content entries per media type—or an `anyOf` schema when multiple types share the same content type.

Thank you [@marcominerva](https://github.com/marcominerva) for the array schema reference contribution!


### OpenAPI 3.2 by default

Generated OpenAPI documents now target OpenAPI 3.2 by default. Documents continue to generate as before. Set the document version explicitly if you need to target an earlier version for tooling that doesn't yet support OpenAPI 3.2.

To target an earlier version, specify it when calling [Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi%252A):

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;
});
```


### Server-Sent Events support in OpenAPI 3.2

Endpoints that return `SseItem<T>` are described in the generated OpenAPI document with the OpenAPI 3.2 `itemSchema` shape for `text/event-stream` responses. The `itemSchema` describes a stream's per-event payload shape instead of falling back to a plain `string` schema.

```csharp
app.MapGet("/todos/stream", (CancellationToken ct) =>
    TypedResults.ServerSentEvents(GetTodosAsync(ct)))
   .WithName("StreamTodos");

static async IAsyncEnumerable<SseItem<Todo>> GetTodosAsync(
    [EnumeratorCancellation] CancellationToken ct = default)
{
    foreach (var todo in Todos.All)
    {
        yield return new SseItem<Todo>(todo) { EventId = todo.Id.ToString() };
        await Task.Delay(1000, ct);
    }
}
```

Return the stream through `TypedResults.ServerSentEvents`. A handler that returns `IAsyncEnumerable<SseItem<T>>` directly is serialized as JSON instead of SSE. Use the dedicated `SseItem<T>` overload without `eventType`. To use one event name for the whole stream, pass a plain `IAsyncEnumerable<T>` with `eventType`.

The generated 3.2 document describes the event payload with `itemSchema` referencing `#/components/schemas/Todo`, plus the standard SSE `event` and `id` string fields:

```yaml
responses:
  '200':
    description: OK
    content:
      text/event-stream:
        itemSchema:
          type: object
          required: [data]
          properties:
            data:
              $ref: '#/components/schemas/Todo'
            event: { type: string }
            id: { type: string }
```

If the event payload is a discriminated union (a preview C# 14 feature), OpenAPI also emits the union's case names as an `enum` on the `event` field.


### Select an environment for build-time OpenAPI document generation

Build-time OpenAPI document generation supports selecting the app environment with the `OpenApiGenerationEnvironment` MSBuild property. The property sets the host's environment for the generation process, equivalent to setting the `ASPNETCORE_ENVIRONMENT` or `DOTNET_ENVIRONMENT` environment variable. Environment-specific configuration and document transformations can therefore affect the generated OpenAPI document without requiring the environment variable to be set before running `dotnet build`.

Set the property in the project file:

```xml
<PropertyGroup>
  <OpenApiGenerationEnvironment>Development</OpenApiGenerationEnvironment>
</PropertyGroup>
```

For more information, see [fundamentals/openapi/aspnetcore-openapi#customize-build-time-document-generation](https://learn.microsoft.com/search/?terms=fundamentals%2Fopenapi%2Faspnetcore-openapi%23customize-build-time-document-generation).

Thank you [@ldsenow](https://github.com/ldsenow) for this contribution!


### OpenAPI reflects obsolete APIs

ASP.NET Core OpenAPI generation maps `[Obsolete]` to `deprecated: true` automatically for operations, schema types, and schema properties. API clients and documentation tools can therefore surface the same deprecation information as .NET callers without a custom OpenAPI transformer.

```csharp
app.MapGet("/catalog/{id}", GetCatalogItem);

#pragma warning disable CS0618 // This example intentionally declares and maps obsolete APIs.
app.MapGet("/catalog/legacy/{id}", GetLegacyCatalogItem);

[Obsolete("Use /catalog/{id}.")]
static LegacyCatalogItem GetLegacyCatalogItem(int id) =>
    new(id, $"Product {id}", $"SKU-{id:D4}");

static CatalogItem GetCatalogItem(int id) =>
    new(id, $"Product {id}", $"SKU-{id:D4}");

public sealed record CatalogItem(
    int Id,
    string Name,
    string StockKeepingUnit);

[Obsolete("Use CatalogItem.")]
public sealed record LegacyCatalogItem(
    int Id,
    string Name,
    [property: Obsolete("Use StockKeepingUnit.")] string Sku);

#pragma warning restore CS0618
```

The generated document marks the legacy operation, its response schema, and the `Sku` property as deprecated:

```json
{
  "paths": {
    "/catalog/legacy/{id}": {
      "get": {
        "deprecated": true
      }
    }
  },
  "components": {
    "schemas": {
      "LegacyCatalogItem": {
        "deprecated": true,
        "properties": {
          "sku": {
            "deprecated": true
          }
        }
      }
    }
  }
}
```

An [Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer) or [Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer) can override the generated value for a specific API.

Thank you [@fickleEfrit](https://github.com/fickleEfrit) for this contribution!


## Authentication and authorization

This section describes new features for authentication and authorization.

### `TimeProvider` support in ASP.NET Core Identity

ASP.NET Core Identity now uses `TimeProvider` instead of `DateTime` and `DateTimeOffset` for all time-related operations. This change makes Identity components more testable and provides better control over time in tests and specialized scenarios.

The following example shows how to use a fake `TimeProvider` for testing Identity features:

```csharp
// In tests
var fakeTimeProvider = new FakeTimeProvider(
    new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero));

services.AddSingleton<TimeProvider>(fakeTimeProvider);
services.AddIdentity<IdentityUser, IdentityRole>();

// Identity will now use the fake time provider
```

By using `TimeProvider`, you can more easily write deterministic tests for time-sensitive Identity features such as token expiration, lockout durations, and security stamp validation.

### Infer passkey display name from authenticator

ASP.NET Core Identity now automatically infers friendly display names for passkeys based on their AAGUID (Authenticator Attestation GUID). Built-in mappings are included for the most commonly used passkey authenticators, including Google Password Manager, iCloud Keychain, Windows Hello, 1Password, and Bitwarden.

For known authenticators, the name is automatically assigned without prompting the user. For unknown authenticators, the user is redirected to a rename page. Extend the mappings by adding entries to the `PasskeyAuthenticators` dictionary in the project.


### `dotnet user-jwts` supports file-based apps

The `dotnet user-jwts` tool creates signed development JWTs so you can call an app's authenticated endpoints without setting up a real identity provider. The `create` command generates a token, stores its signing key in the app's user secrets, and prints the token to use as a bearer token. It now works with file-based apps (a single `app.cs` with no project file) through the new `--file` option:

```bash
dotnet user-jwts create --file app.cs
```


### Consistent authorization metadata across the stack

Authorization metadata can be expressed as [Microsoft.AspNetCore.Authorization.IAuthorizeData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizeData), an [Microsoft.AspNetCore.Authorization.AuthorizationPolicy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicy), or an [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) attribute. MVC filters, SignalR hub methods, and Blazor's `AuthorizeView` and `AuthorizeRouteView` apply all three forms consistently.

<!-- TODO: Update `AuthorizationPolicy.CombineAsync` to <xref:> once the new overload's API docs are published. -->

A new `AuthorizationPolicy.CombineAsync` overload is the shared implementation:

```csharp
public class AuthorizationPolicy
{
    public static Task<AuthorizationPolicy?> CombineAsync(
        IAuthorizationPolicyProvider policyProvider,
        IEnumerable<object> metadata);
}
```

MVC, SignalR, and Blazor use this overload internally. A custom attribute that implements both [Microsoft.AspNetCore.Authorization.IAuthorizeData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizeData) and [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) contributes to the decision once. The legacy MVC path with `EnableEndpointRouting = false` is unchanged.


### Negotiate authentication uses TLS channel binding

Negotiate authentication on Kestrel uses the TLS endpoint channel binding token for HTTPS connections. The authentication handler supplies the token to the underlying Kerberos or NTLM exchange and retains it across multi-round authentication.

No configuration changes are required. Non-HTTPS connections and HTTPS connections where a channel binding token isn't available continue to use the existing behavior.


### Experimental Device Bound Session Credentials support

> **Important:**
> The `Microsoft.AspNetCore.Authentication.DeviceBoundSessions` package is experimental and remains prerelease throughout .NET 11 and until the specification stabilizes.

The [Device Bound Session Credentials (DBSC) specification](https://w3c.github.io/webappsec-dbsc/) defines a protocol that binds session refresh to a private key held by the browser. The app issues a short-lived session cookie, and the browser must provide a signed proof of possession to refresh it. A copied session cookie might remain usable until it expires, but an attacker without the device key can't use it to extend the session.

ASP.NET Core adds an experimental server-side DBSC implementation in the `Microsoft.AspNetCore.Authentication.DeviceBoundSessions` package. The authentication component layers over an existing cookie authentication scheme and manages the registration and refresh endpoints, a path-scoped refresh cookie, and the short-lived session cookie.

After adding the `Microsoft.AspNetCore.Authentication.DeviceBoundSessions` package, configure DBSC over an existing cookie authentication scheme:

```csharp
builder.Services
    .AddAuthentication("Application")
    .AddCookie("Application")
    .AddDeviceBoundSession("Application", options =>
    {
        options.ShortLivedCookieExpiration = TimeSpan.FromMinutes(10);
    });
```

Browser support currently requires an experimental DBSC implementation. For more information, see [Chrome's DBSC documentation](https://developer.chrome.com/docs/web-platform/device-bound-session-credentials).


## Miscellaneous

This section describes miscellaneous new features in .NET 11.

### `IOutputCachePolicyProvider` interface

ASP.NET Core in .NET 11 provides the [Microsoft.AspNetCore.OutputCaching.IOutputCachePolicyProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OutputCaching.IOutputCachePolicyProvider) interface for implementing custom output caching policy selection logic. By using this interface, apps can determine the default base caching policy, check for the existence of named policies, and support advanced scenarios where policies must be resolved dynamically. Examples include loading policies from external configuration sources, databases, or applying tenant-specific caching rules.

The following code shows the `IOutputCachePolicyProvider` interface:

```csharp
public interface IOutputCachePolicyProvider
{
    IReadOnlyList<IOutputCachePolicy> GetBasePolicies();
    ValueTask<IOutputCachePolicy?> GetPolicyAsync(string policyName);
}
```

Thank you [@lqlive](https://github.com/lqlive) for this contribution!


### Auto-trust development certificates in WSL

The development certificate setup now automatically trusts certificates in WSL (Windows Subsystem for Linux) environments. When you run `dotnet dev-certs https --trust` in WSL, the certificate is automatically installed and trusted in both the WSL environment and Windows, eliminating manual trust configuration.

```bash
# Automatically trusts certificates in both WSL and Windows
dotnet dev-certs https --trust
```

This improvement streamlines the development experience when using WSL, removing a common friction point for developers working in Linux environments on Windows.

Thank you [@StickFun](https://github.com/StickFun) for this contribution!

### Native OpenTelemetry tracing for ASP.NET Core

ASP.NET Core now natively adds OpenTelemetry semantic convention attributes to the HTTP server activity, aligning with the [OpenTelemetry HTTP server span specification](https://opentelemetry.io/docs/specs/semconv/http/http-spans/#http-server-span). All required attributes are included by default, matching the metadata previously only available through the `OpenTelemetry.Instrumentation.AspNetCore` library.

To collect the built-in tracing data, subscribe to the `Microsoft.AspNetCore` activity source in your OpenTelemetry configuration:

```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddSource("Microsoft.AspNetCore")
        .AddConsoleExporter());
```

No additional instrumentation library (such as `OpenTelemetry.Instrumentation.AspNetCore`) is needed. The framework now directly populates semantic convention attributes on the request activity, such as `http.request.method`, `url.path`, `http.response.status_code`, and `server.address`.

If you don't want OpenTelemetry attributes added to the activity, you can turn it off by setting the `Microsoft.AspNetCore.Hosting.SuppressActivityOpenTelemetryData` AppContext switch to `true`.


### Performance improvements

Kestrel's HTTP/1.1 request parser now uses a non-throwing code path for handling malformed requests. Instead of throwing [Microsoft.AspNetCore.Http.BadHttpRequestException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.BadHttpRequestException) on every parse failure, the parser returns a result struct indicating success, incomplete, or error states. In scenarios with many malformed requests — such as port scanning, malicious traffic, or misconfigured clients — this eliminates expensive exception handling overhead and improves throughput by up to 20-40%. There's no impact on valid request processing.

The HTTP logging middleware now pools its `ResponseBufferingStream` instances, reducing per-request allocations when response body logging or interceptors are enabled.


### Zstandard response compression and request decompression

ASP.NET Core now supports [Zstandard (zstd)](https://facebook.github.io/zstd/) for both response compression and request decompression. This adds zstd support to the existing response-compression and request-decompression middleware and enables zstd by default.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCompression();
builder.Services.AddRequestDecompression();
builder.Services.Configure<ZstandardCompressionProviderOptions>(options =>
{
    options.CompressionOptions = new ZstandardCompressionOptions
    {
        Quality = 6 // 1-22, higher = better compression, slower
    };
});
```

Thank you [@manandre](https://github.com/manandre) for this contribution!


### HTTP/3 starts processing requests earlier

Kestrel now starts processing HTTP/3 requests without waiting for the control stream and SETTINGS frame first, which reduces first-request latency on new connections.


### MCP Server template ships with the .NET SDK

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that AI applications and agents, such as those in Visual Studio, Visual Studio Code, and GitHub Copilot, use to discover and call external tools, data, and services through a consistent interface. An *MCP server* exposes your own functionality, such as custom tools or access to a data source, so an AI host can invoke it on the user's behalf.

Use the `mcpserver` template when you want to build a C# MCP server that integrates your code or services with AI-powered tools. The generated project uses the [official C# SDK for MCP](https://github.com/modelcontextprotocol/csharp-sdk) and includes a working sample tool, so you have a runnable starting point to extend with your own tools.

The `mcpserver` project template, previously available only by installing `Microsoft.McpServer.ProjectTemplates`, now ships as a bundled template in the .NET SDK:

```dotnetcli
dotnet new mcpserver -o MyMcpServer
```

Moving the template into ASP.NET Core makes it discoverable from `dotnet new list` without a separate install step, and aligns its servicing with the rest of the web stack.

For more information, see [Build a Model Context Protocol (MCP) server in C#](https://learn.microsoft.com/dotnet/ai/quickstarts/build-mcp-server).


### TLS handshake observability in Kestrel

Two related changes make it easier to diagnose and customize TLS connections in Kestrel.

`ITlsHandshakeFeature` now exposes an `Exception` property containing the exception thrown during a failed TLS handshake, so middleware and logging can record why a connection failed instead of seeing a bare `IOException` further up the stack. The feature continues to work after the handshake fails — Kestrel snapshots the relevant fields off the underlying `SslStream` before it is disposed.

The `TlsClientHelloBytesCallback` option on `HttpsConnectionAdapterOptions` was reworked as a connection middleware. The previous callback shape is now obsolete; configure ClientHello inspection via the new `ListenOptions.UseTlsClientHelloListener` extension instead. The example below uses both features together — connection middleware reads `ITlsHandshakeFeature.Exception` after the handshake, and `UseTlsClientHelloListener` inspects the ClientHello before TLS:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.Use(next => async context =>
        {
            await next(context);

            var tlsHandshakeFeature = context.Features.Get<ITlsHandshakeFeature>();
            if (tlsHandshakeFeature?.Exception is { } ex)
            {
                Console.WriteLine($"[TLS Handshake Failed] ConnectionId={context.ConnectionId}, Exception={ex.GetType().Name}: {ex.Message}");
            }
        });

        // UseTlsClientHelloListener must be called before UseHttps()
        listenOptions.UseTlsClientHelloListener((connection, clientHelloBytes) =>
        {
            Console.WriteLine($"TLS Client Hello received on {connection.ConnectionId}, {clientHelloBytes.Length} bytes");
        });
        listenOptions.UseHttps();
    });
});
```


### Response compression always emits `Vary: Accept-Encoding`

The response-compression middleware now adds `Vary: Accept-Encoding` to every response when compression is enabled, even when the response itself isn't compressed. This prevents shared caches and CDNs from serving a compressed payload to a client that didn't ask for one (or vice versa).

Thank you [@pedrobsaila](https://github.com/pedrobsaila) for this contribution!


### Runtime-async enabled for shared framework libraries

ASP.NET Core's shared-framework-only libraries are now compiled with the `runtime-async` feature on `net11.0+`. Runtime-async lets the runtime, rather than the C# compiler, generate the state machine for `async`/`await`, which can reduce per-await allocations and improve diagnostics. This is an internal codegen change with no public API impact — apps targeting `net11.0` automatically benefit when they call into the affected ASP.NET Core libraries.

Libraries that ship as both shared-framework members and standalone NuGet packages are excluded, because runtime-async is incompatible with WebAssembly and would otherwise break Wasm consumers of those packages.

Because runtime-async changes how `async`/`await` is generated for a large portion of the ASP.NET Core stack, try your apps against this preview and [file an issue](https://github.com/dotnet/aspnetcore/issues/new/choose) if you hit unexpected behavior, particularly around exception stacks, `ExecutionContext`/`AsyncLocal` flow, or anything that looks like a regression from .NET 10.


### Rate-limiting middleware returns accurate `Retry-After` headers

The [System.Threading.RateLimiting.FixedWindowRateLimiter](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.FixedWindowRateLimiter) now reports a [System.Threading.RateLimiting.MetadataName.RetryAfter](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.MetadataName.RetryAfter) metadata value that accurately reflects the next window boundary. Apps that propagate this metadata to the `Retry-After` response header in their [Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.RateLimiting.RateLimiterOptions.OnRejected) callback now produce correct retry intervals automatically, with no code changes required.

Additional fixes in `System.Threading.RateLimiting` resolve an issue where [System.Threading.RateLimiting.TokenBucketRateLimiter](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.TokenBucketRateLimiter) mishandled partial token refills during zero-permit acquisition, and improve the chained rate limiter returned by [System.Threading.RateLimiting.RateLimiter.CreateChained*](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.RateLimiter.CreateChained*) to correctly forward idle-duration and replenishment behavior from its inner limiters.

For an overview of the rate limiting middleware, see [Rate limiting middleware in ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/rate-limit).

Thank you [@asbjornvad](https://github.com/asbjornvad) and [@apoorvdarshan](https://github.com/apoorvdarshan) for these contributions!


### Kestrel applies trailer header timeouts

Kestrel now applies [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout) to fragmented HTTP/2 and HTTP/3 trailer headers that don't finish sending the header block. The same timeout that protects initial request headers now also prevents connections from staying open indefinitely while Kestrel waits for trailer `HEADERS` frames to complete.

```csharp
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(10);
});
```


### TLS channel-binding token access from `ITlsConnectionFeature`

Applications using TLS can read the connection's channel binding token to defend against relay attacks:

```csharp
using System.Security.Authentication.ExtendedProtection;

app.Use(async (context, next) =>
{
    var tls = context.Features.Get<ITlsConnectionFeature>();
    if (tls is not null && tls.TryGetChannelBindingBytes(
            ChannelBindingKind.Endpoint,
            out ReadOnlyMemory<byte> cbt))
    {
        // Compare cbt against the token the client presented during authentication.
    }

    await next(context);
});
```

Kestrel returns the binding from `SslStream.TransportContext.GetChannelBinding`. IIS and HTTP.sys return it from the request. On HTTP.sys, `HttpSysOptions.HttpAuthenticationHardeningLevel` controls Extended Protection and channel-binding token exposure:

* `Legacy` disables channel-binding validation and doesn't expose the token.
* `Medium`, the default, exposes the token and validates it when supplied, but tolerates its absence.
* `Strict` requires the token for authenticated requests and rejects requests without one. It also fails startup if the OS can't apply the configuration, while `Legacy` and `Medium` log the configuration failure and continue.


## Breaking changes

Use the articles in [Breaking changes in .NET](https://learn.microsoft.com/dotnet/core/compatibility/breaking-changes) to find breaking changes that might apply when upgrading an app to a newer version of .NET.
