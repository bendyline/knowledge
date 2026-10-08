---
title: ASP.NET Core Razor component virtualization
author: guardrex
description: Learn how to use component virtualization in ASP.NET Core Blazor apps.
monikerRange: '>= aspnetcore-5.0'
ms.author: wpickett
ms.date: 09/10/2026
uid: blazor/components/virtualization
---
# ASP.NET Core Razor component virtualization

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


This article explains how to use component virtualization in ASP.NET Core Blazor apps.

## Virtualization

Improve the perceived performance of component rendering using the Blazor framework's built-in virtualization support with the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component. Virtualization is a technique for limiting UI rendering to just the parts that are currently visible. For example, virtualization is helpful when the app must render a long list of items and only a subset of items is required to be visible at any given time.

Use the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component when:

* Rendering a set of data items in a loop.
* Most of the items aren't visible due to scrolling.

When the user scrolls to an arbitrary point in the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component's list of items, the component calculates the visible items to show. Unseen items aren't rendered.

Without virtualization, a typical list might use a C# [`foreach`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/foreach-in) loop to render each item in a list. In the following example:

* `allFlights` is a collection of airplane flights.
* The `FlightSummary` component displays details about each flight.
* The [`@key` directive attribute](element-component-model-relationships.md) preserves the relationship of each `FlightSummary` component to its rendered flight by the flight's `FlightId`.

```razor
<div style="height:500px;overflow-y:scroll">
    @foreach (var flight in allFlights)
    {
        <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
    }
</div>
```

If the collection contains thousands of flights, rendering the flights takes a long time and users experience a noticeable UI lag. Most of the flights fall outside of the height of the `<div>` element, so most of them aren't seen.

Instead of rendering the entire list of flights at once, replace the [`foreach`](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/foreach-in) loop in the preceding example with the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component:

* Specify `allFlights` as a fixed item source to [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.Items%252A). Only the currently visible flights are rendered by the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component.

  If a non-generic collection supplies the items, for example a collection of [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow), follow the guidance in the [Item provider delegate](#item-provider-delegate) section to supply the items.
* Specify a context for each flight with the `Context` parameter. In the following example, `flight` is used as the context, which provides access to each flight's members.

```razor
<div style="height:500px;overflow-y:scroll">
    <Virtualize Items="allFlights" Context="flight">
        <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
    </Virtualize>
</div>
```

If a context isn't specified with the `Context` parameter, use the value of `context` in the item content template to access each flight's members:

```razor
<div style="height:500px;overflow-y:scroll">
    <Virtualize Items="allFlights">
        <FlightSummary @key="context.FlightId" Details="@context.Summary" />
    </Virtualize>
</div>
```

The [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component:

* Calculates the number of items to render based on the height of the container and the size of the rendered items.
* Recalculates and rerenders the items as the user scrolls.
* Only fetches the slice of records from an external API that correspond to the currently visible region, including overscan, when `ItemsProvider` is used instead of `Items` (see the [Item provider delegate](#item-provider-delegate) section).

The item content for the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component can include:

* Plain HTML and Razor code, as the preceding example shows.
* One or more Razor components.
* A mix of HTML/Razor and Razor components.

## Item provider delegate

If you don't want to load all of the items into memory or the collection isn't a generic [System.Collections.Generic.ICollection%601](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%25601), you can specify an items provider delegate method to the component's [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.ItemsProvider%252A) parameter that asynchronously retrieves the requested items on demand. In the following example, the `LoadEmployees` method provides the items to the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component:

```razor
<Virtualize Context="employee" ItemsProvider="LoadEmployees">
    <p>
        @employee.FirstName @employee.LastName has the 
        job title of @employee.JobTitle.
    </p>
</Virtualize>
```

The items provider receives an [Microsoft.AspNetCore.Components.Web.Virtualization.ItemsProviderRequest](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.ItemsProviderRequest), which specifies the required number of items starting at a specific start index. The items provider then retrieves the requested items from a database or other service and returns them as an [Microsoft.AspNetCore.Components.Web.Virtualization.ItemsProviderResult%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.ItemsProviderResult%25601) along with a count of the total items. The items provider can choose to retrieve the items with each request or cache them so that they're readily available.

A [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component can only accept **one item source** from its parameters, so don't attempt to simultaneously use an items provider and assign a collection to `Items`. If both are assigned, an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) is thrown when the component's parameters are set at runtime.

The following example loads employees from an `EmployeeService` (not shown). The `totalEmployees` field would typically be assigned by calling a method on the same service (for example, `EmployeesService.GetEmployeesCountAsync`) elsewhere, such as during component initialization.

```csharp
private async ValueTask<ItemsProviderResult<Employee>> LoadEmployees(
    ItemsProviderRequest request)
{
    var numEmployees = Math.Min(request.Count, totalEmployees - request.StartIndex);
    var employees = await EmployeesService.GetEmployeesAsync(request.StartIndex, 
        numEmployees, request.CancellationToken);

    return new ItemsProviderResult<Employee>(employees, totalEmployees);
}
```

In the following example, a collection of [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) is a non-generic collection, so an items provider delegate is used for virtualization:

```razor
<Virtualize Context="row" ItemsProvider="GetRows">
    ...
</Virtualize>

@code{
    ...

    private ValueTask<ItemsProviderResult<DataRow>> GetRows(ItemsProviderRequest request) => 
        new(new ItemsProviderResult<DataRow>(
            dataTable.Rows.OfType<DataRow>().Skip(request.StartIndex).Take(request.Count),
            dataTable.Rows.Count));
}
```

[Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.RefreshDataAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.RefreshDataAsync%252A) instructs the component to rerequest data from its [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.ItemsProvider%252A). This is useful when external data changes. There's usually no need to call [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.RefreshDataAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.RefreshDataAsync%252A) when using [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.Items%252A). 

**Applies to: \>= aspnetcore-6.0**

[Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.RefreshDataAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.RefreshDataAsync%252A) updates a [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component's data without causing a rerender. If [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.RefreshDataAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.RefreshDataAsync%252A) is invoked from a Blazor event handler or component lifecycle method, triggering a render isn't required because a render is automatically triggered at the end of the event handler or lifecycle method. If [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.RefreshDataAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.RefreshDataAsync%252A) is triggered separately from a background task or event, such as in the following `ForecastUpdated` delegate, call [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) to update the UI at the end of the background task or event:

```csharp
<Virtualize ... @ref="virtualizeComponent">
    ...
</Virtualize>

...

private Virtualize<FetchData>? virtualizeComponent;

protected override void OnInitialized()
{
    WeatherForecastSource.ForecastUpdated += async () => 
    {
        await InvokeAsync(async () =>
        {
            await virtualizeComponent?.RefreshDataAsync();
            StateHasChanged();
        });
    });
}
```

In the preceding example:

* [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.RefreshDataAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.RefreshDataAsync%252A) is called first to obtain new data for the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component.
* `StateHasChanged` is called to rerender the component.



## Placeholder

Because requesting items from a remote data source might take some time, you have the option to render a placeholder with item content:

* Use a [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.Placeholder%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.Placeholder%252A) (`<Placeholder>...</Placeholder>`) to display content until the item data is available.
* Use [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.ItemContent%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.ItemContent%252A) to set the item template for the list.

```razor
<Virtualize Context="employee" ItemsProvider="LoadEmployees">
    <ItemContent>
        <p>
            @employee.FirstName @employee.LastName has the 
            job title of @employee.JobTitle.
        </p>
    </ItemContent>
    <Placeholder>
        <p>
            Loading&hellip;
        </p>
    </Placeholder>
</Virtualize>
```

**Applies to: \>= aspnetcore-8.0**

## Empty content

Use the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.EmptyContent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.EmptyContent) parameter to supply content when the component has loaded and either [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.Items%252A) is empty or [Microsoft.AspNetCore.Components.Web.Virtualization.ItemsProviderResult%601.TotalItemCount%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.ItemsProviderResult%25601.TotalItemCount%252A) is zero.

`EmptyContent.razor`:



**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EmptyContent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/virtualization.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/EmptyContent.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/virtualization.md)



**Applies to: \>= aspnetcore-8.0**

Change the `OnInitialized` method lambda to see the component display strings:

```csharp
protected override void OnInitialized() =>
    stringList ??= [ "Here's a string!", "Here's another string!" ];
```



## Item size

**Applies to: \>= aspnetcore-11.0**

The height of each item in pixels can be set initially with [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.ItemSize%252A) (default: 50). The following example sets the initial height of each item from 50 pixels to 25 pixels:

```razor
<Virtualize Context="employee" Items="employees" ItemSize="25">
    ...
</Virtualize>
```

The [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component measures actual item heights as they enter the viewport and maintains a running average of measured heights. All items use this running average for positioning (or the default [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.ItemSize%252A) parameter before any measurements exist).



**Applies to: < aspnetcore-11.0**

The height of each item in pixels can be set with [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.ItemSize%252A) (default: 50). The following example changes the height of each item from the default of 50 pixels to 25 pixels:

```razor
<Virtualize Context="employee" Items="employees" ItemSize="25">
    ...
</Virtualize>
```

The [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component measures the rendering size (height) of individual items *after* the initial render occurs. Use [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.ItemSize%252A) to provide an exact item size in advance to assist with accurate initial render performance and to ensure the correct scroll position for page reloads. If the default [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.ItemSize%252A) causes some items to render outside of the currently visible view, a second rerender is triggered. To correctly maintain the browser's scroll position in a virtualized list, the initial render must be correct. If not, users might view the wrong items.



## Overscan count

**Applies to: \>= aspnetcore-11.0**

[Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.OverscanCount%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.OverscanCount%252A) determines how many additional items are rendered before and after the visible region. This setting helps to reduce the frequency of rendering during scrolling. However, higher values result in more elements rendered in the page (default: 15). The following example changes the overscan count from the default of 15 items to 17 items:

```razor
<Virtualize Context="employee" Items="employees" OverscanCount="17">
    ...
</Virtualize>
```



**Applies to: < aspnetcore-11.0**

[Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.OverscanCount%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.OverscanCount%252A) determines how many additional items are rendered before and after the visible region. This setting helps to reduce the frequency of rendering during scrolling. However, higher values result in more elements rendered in the page (default: 3). The following example changes the overscan count from the default of three items to four items:

```razor
<Virtualize Context="employee" Items="employees" OverscanCount="4">
    ...
</Virtualize>
```



**Applies to: \>= aspnetcore-11.0**

<!-- UPDATE 11.0 - API Browser cross-links -->

## Scroll to a specific item

The [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component provides two ways to control scroll position: `InitialItemIndex` for the first render and `ScrollToItemAsync` for programmatic scrolling after the component is rendered.

### `InitialItemIndex` parameter

Set `InitialItemIndex` to open the list at a specific item index on the first interactive render. This is a one-shot parameter—changes after first render are ignored. Out-of-range values are clamped.

```razor
<Virtualize Items="allFlights" Context="flight" InitialItemIndex="500">
    <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
</Virtualize>
```

### `ScrollToItemAsync` method

Call `ScrollToItemAsync` to programmatically scroll to an item after the first render. The scroll is instant (no animation). The method returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that completes when the target item is aligned to the top of the viewport. Cancellation is supported via a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken).

If multiple calls occur, the last call wins—earlier calls complete normally but only the final target is honored. If the user scrolls during a programmatic scroll, the user's scroll takes precedence. Calling before the first interactive render throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException).

```razor
<Virtualize Items="allFlights" Context="flight" @ref="virtualizeComponent">
    <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
</Virtualize>

<button @onclick="ScrollToFlight">Go to flight 200</button>

@code {
    private Virtualize<Flight>? virtualizeComponent;

    private async Task ScrollToFlight()
    {
        if (virtualizeComponent is not null)
        {
            await virtualizeComponent.ScrollToItemAsync(200);
        }
    }
}
```



**Applies to: \>= aspnetcore-11.0**

## Control viewport scroll position behavior when items are dynamically added

<!-- UPDATE 11.0 - API cross-links -->

Assign a `VirtualizeAnchorMode` value to the `AnchorMode` parameter to control how the viewport behaves at list edges when items are dynamically added:

* `None`: No edge pinning. The viewport stays at the current scroll position regardless of item changes.
* `Start`: Pins the viewport to the start of the list. When the user is at a scroll position near the top of the list and new items arrive at the start, the viewport stays at the top showing the newest items. For example, this pinning behavior is useful for a news feed user experience.
* `End`: Pins the viewport to the end of the list. When the user is at a scroll position near the bottom of the list and new items arrive at the end, the viewport auto-scrolls to show them. If the user has scrolled away, auto-scroll disengages until they return to the bottom. For example, this pinning behavior is useful for a chat or logging user experience.

The following example pins the viewport to the start of a virtualized flight list:

```razor
<div style="height:500px;overflow-y:scroll">
    <Virtualize Items="allFlights" Context="flight" AnchorMode="Start">
        <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
    </Virtualize>
</div>
```

Modes can be combined. For example, assigning `Start | End` pins both edges. Combining `None` with other modes is supported but doesn't change the combined value.

`Virtualize.ItemComparer` gets or sets a comparer used to detect whether items were prepended or appended when using class-typed items with an [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.ItemsProvider%252A) (for more information, see the [Item provider delegate](#item-provider-delegate) section).

The comparer determines if the first loaded item changed between provider calls, which indicates items were inserted at the top. For records, the default comparer's value-equality behavior (`EqualityComparer<T>.Default`) works automatically. For an in-memory [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.Items%252A) assignment, an `ItemComparer` comparer isn't required because the component can detect prepends automatically. In cases where non-primative objects are virtualized and the framework can't detect if an item is prepended or appended, assign an [System.Collections.Generic.IEqualityComparer%601](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEqualityComparer%25601) to the `Virtualize` component:

<!-- UPDATE 11.0 - Does the 'itemComparer' in the following example
                   need the '@' symbol (ItemComparer="@itemComparer")? 
                   I thought that it wouldn't need it. -->

```razor
<Virtualize ItemsProvider="LoadFlights" AnchorMode="Start" 
    ItemComparer="itemComparer">
    ...
</Virtualize>

@code {
    private static readonly IEqualityComparer<Flight> itemComparer =
        EqualityComparer<Flight>.Create((a, b) => 
            a.Index == b.Index, item => item.Index);

    private async ValueTask<ItemsProviderResult<Flight>> LoadFlights(
        ItemsProviderRequest request)
    {
        ...
    }
}
```



## State changes

When making changes to items rendered by the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component, call [Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged%252A) to enqueue re-evaluation and rerendering of the component. For more information, see [blazor/components/rendering](rendering.md).

**Applies to: \>= aspnetcore-6.0**

## Keyboard scroll support

To allow users to scroll virtualized content using their keyboard, ensure that the virtualized elements or scroll container itself is focusable. If you fail to take this step, keyboard scrolling doesn't work in Chromium-based browsers.

For example, you can use a `tabindex` attribute on the scroll container:

```razor
<div style="height:500px; overflow-y:scroll" tabindex="-1">
    <Virtualize Items="allFlights">
        <div class="flight-info">...</div>
    </Virtualize>
</div>
```

To learn more about the meaning of `tabindex` value `-1`, `0`, or other values, see [`tabindex`](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex).

## Advanced styles and scroll detection

The [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component is only designed to support specific element layout mechanisms. To understand which element layouts work correctly, the following explains how `Virtualize` detects which elements should be visible for display in the correct place.

If your source code looks like the following:

```razor
<div style="height:500px; overflow-y:scroll" tabindex="-1">
    <Virtualize Items="allFlights" ItemSize="100">
        <div class="flight-info">Flight @context.Id</div>
    </Virtualize>
</div>
```

At runtime, the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component renders a DOM structure similar to the following:



**Applies to: \>= aspnetcore-11.0**

```html
<div style="height:500px; overflow-y:scroll" tabindex="-1">
    <div data-blazor-virtualize-reserved-height="1100" aria-hidden="true"></div>
    <div class="flight-info">Flight 12</div>
    <div class="flight-info">Flight 13</div>
    <div class="flight-info">Flight 14</div>
    <div class="flight-info">Flight 15</div>
    <div class="flight-info">Flight 16</div>
    <div data-blazor-virtualize-reserved-height="3400" aria-hidden="true"></div>
</div>
```



**Applies to: < aspnetcore-11.0**

```html
<div style="height:500px; overflow-y:scroll" tabindex="-1">
    <div style="height:1100px"></div>
    <div class="flight-info">Flight 12</div>
    <div class="flight-info">Flight 13</div>
    <div class="flight-info">Flight 14</div>
    <div class="flight-info">Flight 15</div>
    <div class="flight-info">Flight 16</div>
    <div style="height:3400px"></div>
</div>
```



**Applies to: \>= aspnetcore-6.0**

The actual number of rows rendered and the size of the spacers vary according to your styling and `Items` collection size. However, notice that there are spacer `div` elements injected before and after your content. These serve two purposes:

* To provide an offset before and after your content, causing currently-visible items to appear at the correct location in the scroll range and the scroll range itself to represent the total size of all content.
* To detect when the user is scrolling beyond the current visible range, meaning that different content must be rendered.

> **Note:**
> To learn how to control the spacer HTML element tag, see the [Control the spacer element tag name](#control-the-spacer-element-tag-name) section later in this article.

The spacer elements internally use an [Intersection Observer](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API) to receive notification when they're becoming visible. `Virtualize` depends on receiving these events.

`Virtualize` works under the following conditions:

* **All rendered content items, including [placeholder content](#placeholder), are of identical height.** This makes it possible to calculate which content corresponds to a given scroll position without first fetching every data item and rendering the data into a DOM element.

* **Both the spacers and the content rows are rendered in a single vertical stack with every item filling the entire horizontal width.** In typical use cases, `Virtualize` works with `div` elements. If you're using CSS to create a more advanced layout, bear in mind the following requirements:

  * Scroll container styling requires a `display` with any of the following values:
    * `block` (the default for a `div`).
    * `table-row-group` (the default for a `tbody`).
    * `flex` with `flex-direction` set to `column`. Ensure that immediate children of the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component don't shrink under flex rules. For example, add `.mycontainer > div { flex-shrink: 0 }`.
  * Content row styling requires a `display` with either of the following values:
    * `block` (the default for a `div`).
    * `table-row` (the default for a `tr`).
  * Don't use CSS to interfere with the layout for the spacer elements. The spacer elements have a `display` value of `block`, except if the parent is a table row group, in which case they default to `table-row`. Don't try to influence spacer element width or height, including by causing them to have a border or `content` pseudo-elements.

Any approach that stops the spacers and content elements from rendering as a single vertical stack, or causes the content items to vary in height, prevents correct functioning of the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component.



## Root-level virtualization

**Applies to: \>= aspnetcore-7.0**

The [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component supports using the document itself as the scroll root, as an alternative to having some other element with `overflow-y: scroll`. In the following example, the `<html>` or `<body>` elements are styled in a component with `overflow-y: scroll`:

```razor
<HeadContent>
    <style>
        html, body { overflow-y: scroll }
    </style>
</HeadContent>
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

The [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component supports using the document itself as the scroll root, as an alternative to having some other element with `overflow-y: scroll`. When using the document as the scroll root, avoid styling the `<html>` or `<body>` elements with `overflow-y: scroll` because it causes the [intersection observer](#advanced-styles-and-scroll-detection) to treat the full scrollable height of the page as the visible region, instead of just the window viewport.

You can reproduce this problem by creating a large virtualized list (for example, 100,000 items) and attempt to use the document as the scroll root with `html { overflow-y: scroll }` in the page CSS styles. Although it may work correctly at times, the browser attempts to render all 100,000 items at least once at the start of rendering, which may cause a browser tab lockup.

To work around this problem prior to the release of .NET 7, either avoid styling `<html>`/`<body>` elements with `overflow-y: scroll` or adopt an alternative approach. In the following example, the height of the `<html>` element is set to just over 100% of the viewport height:

```razor
<HeadContent>
    <style>
        html { min-height: calc(100vh + 0.3px) }
    </style>
</HeadContent>
```



**Applies to: < aspnetcore-6.0**

The [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component supports using the document itself as the scroll root, as an alternative to having some other element with `overflow-y: scroll`. When using the document as the scroll root, avoid styling the `<html>` or `<body>` elements with `overflow-y: scroll` because it causes the full scrollable height of the page to be treated as the visible region, instead of just the window viewport.

You can reproduce this problem by creating a large virtualized list (for example, 100,000 items) and attempt to use the document as the scroll root with `html { overflow-y: scroll }` in the page CSS styles. Although it may work correctly at times, the browser attempts to render all 100,000 items at least once at the start of rendering, which may cause a browser tab lockup.

To work around this problem prior to the release of .NET 7, either avoid styling `<html>`/`<body>` elements with `overflow-y: scroll` or adopt an alternative approach. In the following example, the height of the `<html>` element is set to just over 100% of the viewport height:

```razor
<style>
    html { min-height: calc(100vh + 0.3px) }
</style>
```



**Applies to: \>= aspnetcore-7.0**

## Control the spacer element tag name

If the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component is placed inside an element that requires a specific child tag name, [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601.SpacerElement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601.SpacerElement) allows you to obtain or set the virtualization spacer tag name. The default value is `div`. For the following example, the [Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize%25601) component renders inside a table body element ([`tbody`](https://developer.mozilla.org/docs/Web/HTML/Element/tbody)), so the appropriate child element for a table row ([`tr`](https://developer.mozilla.org/docs/Web/HTML/Element/tr)) is set as the spacer.

`VirtualizedTable.razor`:

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/VirtualizedTable.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/virtualization.md)

In the preceding example, the document root is used as the scroll container, so the `html` and `body` elements are styled with `overflow-y: scroll`. For more information, see the following resources:

* [Root-level virtualization](#root-level-virtualization) section
* [blazor/components/control-head-content](control-head-content.md)



## Content Security Policy (CSP) compliance

**Applies to: \>= aspnetcore-11.0**

CSP violations are avoided because `Virtualize` components:

* Render calculated spacer and placeholder heights as numeric values in `data-blazor-virtualize-reserved-height` attributes.
* When required, render the trailing spacer's vertical offset as a numeric value in a `data-blazor-virtualize-loop-breaker-transform` attribute to hide the spacer.

A JS [`MutationObserver`](https://developer.mozilla.org/docs/Web/API/MutationObserver) validates the attribute values and applies them via the [CSS Object Model (CSSOM)](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model) as pixel-based `height` and `transform` styles.



**Applies to: \>= aspnetcore-7.0 < aspnetcore-11.0**

The `Virtualize` component renders dynamic inline `style` attributes on its spacer elements because spacer heights are calculated at runtime based on scroll position, item count, and average item size, which change on every scroll interaction. To avoid CSP violations, render CSS height in a `data-blazor-virtualize-reserved-height` attribute instead of a `style` attribute, which makes the rendered component compatible with strict [Content Security Policy (CSP)](https://developer.mozilla.org/docs/Web/HTTP/Guides/CSP) configurations.

In the following example, the height is set to 3,400 pixels:

```razor
<div data-blazor-virtualize-reserved-height="3400" aria-hidden="true"></div>
```



**Applies to: < aspnetcore-7.0**

The `Virtualize` component renders dynamic inline `style` attributes on its spacer elements because spacer heights are calculated at runtime based on scroll position, item count, and average item size, which change on every scroll interaction. Apps are required to relax `style-src` with `'unsafe-inline'` to allow inline styles for the component to function.
