---
title: ASP.NET Core Blazor `QuickGrid` component
ai-usage: ai-assisted
author: guardrex
description: The QuickGrid component is a Razor component for quickly and efficiently displaying data in tabular form.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 09/17/2026
uid: blazor/components/quickgrid
---
# ASP.NET Core Blazor `QuickGrid` component

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


The [`QuickGrid` component](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid) is a Razor component for quickly and efficiently displaying data in tabular form. QuickGrid provides a simple and convenient data grid component for common grid rendering scenarios and serves as a reference architecture and performance baseline for building data grid components. QuickGrid is highly optimized and uses advanced techniques to achieve optimal rendering performance.

## Package

Add a package reference for the [`Microsoft.AspNetCore.Components.QuickGrid` package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.QuickGrid).

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


## Sample app

For various QuickGrid demonstrations, see the [**QuickGrid for Blazor** sample app](https://aspnet.github.io/quickgridsamples/). The demo site is hosted on GitHub Pages. The site loads fast thanks to static prerendering using the community-maintained [`BlazorWasmPrerendering.Build` GitHub project](https://github.com/jsakamoto/BlazorWasmPreRendering.Build).

## QuickGrid implementation

To implement a `QuickGrid` component:

**Applies to: \>= aspnetcore-11.0**

<!-- UPDATE 11.0 - API Browser cross-links 

<xref:Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.InitialItemIndex%2A>
<xref:Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ScrollToItemAsync%2A>
<xref:Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.AnchorMode%2A>
<xref:Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemComparer%2A>
<xref:Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.QueryParameterNameOptions%2A>
<xref:Microsoft.AspNetCore.Components.QuickGrid.QueryParameterNameOptions>

-->

* Specify tags for the `QuickGrid` component in Razor markup (`<QuickGrid>...</QuickGrid>`).
* Name a queryable source of data for the grid. Use ***either*** of the following data sources:
  * [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Items%252A): A nullable `IQueryable<TGridItem>`, where `TGridItem` is the type of data represented by each row in the grid.
  * [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemsProvider%252A): A callback that supplies data for the grid.
* `QueryParameterNameOptions`: Controls the names of the query string parameters that persist the grid's sort column, sort direction, and page number in the URL. The default value is an instance that results in query parameters named "`sort`", "`direction`", and "`page`". Assigning unique names to these query string parameters allows the use of multiple `QuickGrid` components on the same page without their URL parameters conflicting with each other. For more information, see the [Pagination modes](#pagination-modes), [Query parameter names](#query-parameter-names), and [Multiple grids on the same page](#multiple-grids-on-the-same-page) sections.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Class%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Class%252A): An optional CSS class name. If provided, the class name is included in the `class` attribute of the rendered table.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Theme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Theme%252A): A theme name (default value: `default`). This affects which styling rules match the table.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A): If true, the grid is rendered with virtualization. This is normally used in conjunction with scrolling and causes the grid to fetch and render only the data around the current scroll viewport. This can greatly improve the performance when scrolling through large data sets. If you use [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A), you should supply a value for [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemSize%252A) and must ensure that every row renders with a constant height. Generally, it's preferable not to use [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A) if the amount of data rendered is small or if you're using pagination.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemSize%252A): Only applicable when using [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A). [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemSize%252A) defines an expected height in pixels for each row, allowing the virtualization mechanism to fetch the correct number of items to match the display size and to ensure accurate scrolling.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemKey%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemKey%252A): Optionally defines a value for `@key` on each rendered row. Typically, this is used to specify a unique identifier, such as a primary key value, for each data item. This allows the grid to preserve the association between row elements and data items based on their unique identifiers, even when the `TGridItem` instances are replaced by new copies (for example, after a new query against the underlying data store). If not set, the `@key` is the `TGridItem` instance.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.OverscanCount%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.OverscanCount%252A): Defines how many additional items to render before and after the visible region to reduce rendering frequency during scrolling. While higher values can improve scroll smoothness by rendering more items off-screen, a higher value can also result in an increase in initial load times. Finding a balance based on your data set size and user experience requirements is recommended. The default value is `3`. Only available when using [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A).
* `InitialItemIndex`: Only applicable when using [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A). Scrolls the grid to the given zero-based row index on the first interactive render. The value is applied once and clamped to the valid range. This forwards to the inner `Virtualize` component. For more information, see [blazor/components/virtualization#scroll-to-a-specific-item](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fvirtualization%23scroll-to-a-specific-item).
* `ScrollToItemAsync`: Only applicable when using [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A). Programmatically scrolls the grid to the given zero-based row index, aligning it to the top. The last call wins, and the method throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) when virtualization is disabled or the grid isn't rendered yet. This forwards to the inner `Virtualize` component. For more information, see [blazor/components/virtualization#scroll-to-a-specific-item](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fvirtualization%23scroll-to-a-specific-item).
* `AnchorMode`: Only applicable when using [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A). Controls how the viewport behaves at list edges when items are dynamically added (default: `Start`). This is an experimental API that requires opting in to the `ASP0030` diagnostic, and it forwards to the inner `Virtualize` component. For more information, see [blazor/components/virtualization#control-viewport-scroll-position-behavior-when-items-are-dynamically-added](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fvirtualization%23control-viewport-scroll-position-behavior-when-items-are-dynamically-added).
* `ItemComparer`: Only applicable when using [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A). A comparer used to detect whether items were prepended or appended between data loads, which is useful for class-typed items supplied by an [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemsProvider%252A). This is an experimental API that requires opting in to the `ASP0030` diagnostic, and it forwards to the inner `Virtualize` component. For more information, see [blazor/components/virtualization#control-viewport-scroll-position-behavior-when-items-are-dynamically-added](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fvirtualization%23control-viewport-scroll-position-behavior-when-items-are-dynamically-added).
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Pagination%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Pagination%252A): Optionally links this `TGridItem` instance with a [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) model, causing the grid to fetch and render only the current page of data. This is normally used in conjunction with a [Microsoft.AspNetCore.Components.QuickGrid.Paginator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.Paginator) component or some other UI logic that displays and updates the supplied [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) instance. [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) includes API for interacting with the current zero-based page index, the number of items on each page, the zero-based index of the last page, and the total number of items across all pages.
* In the QuickGrid child content ([Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment)), specify [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602)s, which represent `TGridItem` columns whose cells display values:
  * [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602.Property%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602.Property%252A): Defines the value to be displayed in this column's cells.
  * [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602.Format%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602.Format%252A): Optionally specifies a format string for the value. Using [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602.Format%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602.Format%252A) requires the `TProp` type to implement [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable).
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Sortable%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Sortable%252A): Indicates whether the data should be sortable by this column. The default value may vary according to the column type. For example, a [Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%25601) is sorted if any [Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%601.SortBy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%25601.SortBy%252A) parameter is specified.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.InitialSortDirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.InitialSortDirection%252A): Indicates the sort direction if [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.IsDefaultSortColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.IsDefaultSortColumn%252A) is `true`.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.IsDefaultSortColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.IsDefaultSortColumn%252A): Indicates whether this column should be sorted by default.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.PlaceholderTemplate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.PlaceholderTemplate%252A): If specified, virtualized grids use this template to render cells whose data hasn't been loaded.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.HeaderTemplate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.HeaderTemplate): An optional template for this column's header cell. If not specified, the default header template includes the [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Title](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Title), along with any applicable sort indicators and options buttons.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Title](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Title): Title text for the column. The title is rendered automatically if [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.HeaderTemplate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.HeaderTemplate) isn't used.



**Applies to: \>= aspnetcore-9.0 < aspnetcore-11.0**

* Specify tags for the `QuickGrid` component in Razor markup (`<QuickGrid>...</QuickGrid>`).
* Name a queryable source of data for the grid. Use ***either*** of the following data sources:
  * [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Items%252A): A nullable `IQueryable<TGridItem>`, where `TGridItem` is the type of data represented by each row in the grid.
  * [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemsProvider%252A): A callback that supplies data for the grid.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Class%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Class%252A): An optional CSS class name. If provided, the class name is included in the `class` attribute of the rendered table.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Theme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Theme%252A): A theme name (default value: `default`). This affects which styling rules match the table.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A): If true, the grid is rendered with virtualization. This is normally used in conjunction with scrolling and causes the grid to fetch and render only the data around the current scroll viewport. This can greatly improve the performance when scrolling through large data sets. If you use [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A), you should supply a value for [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemSize%252A) and must ensure that every row renders with a constant height. Generally, it's preferable not to use [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A) if the amount of data rendered is small or if you're using pagination.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemSize%252A): Only applicable when using [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A). [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemSize%252A) defines an expected height in pixels for each row, allowing the virtualization mechanism to fetch the correct number of items to match the display size and to ensure accurate scrolling.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemKey%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemKey%252A): Optionally defines a value for `@key` on each rendered row. Typically, this is used to specify a unique identifier, such as a primary key value, for each data item. This allows the grid to preserve the association between row elements and data items based on their unique identifiers, even when the `TGridItem` instances are replaced by new copies (for example, after a new query against the underlying data store). If not set, the `@key` is the `TGridItem` instance.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.OverscanCount%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.OverscanCount%252A): Defines how many additional items to render before and after the visible region to reduce rendering frequency during scrolling. While higher values can improve scroll smoothness by rendering more items off-screen, a higher value can also result in an increase in initial load times. Finding a balance based on your data set size and user experience requirements is recommended. The default value is `3`. Only available when using [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A).
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Pagination%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Pagination%252A): Optionally links this `TGridItem` instance with a [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) model, causing the grid to fetch and render only the current page of data. This is normally used in conjunction with a [Microsoft.AspNetCore.Components.QuickGrid.Paginator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.Paginator) component or some other UI logic that displays and updates the supplied [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) instance. [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) includes API for interacting with the current zero-based page index, the number of items on each page, the zero-based index of the last page, and the total number of items across all pages.
* In the QuickGrid child content ([Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment)), specify [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602)s, which represent `TGridItem` columns whose cells display values:
  * [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602.Property%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602.Property%252A): Defines the value to be displayed in this column's cells.
  * [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602.Format%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602.Format%252A): Optionally specifies a format string for the value. Using [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602.Format%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602.Format%252A) requires the `TProp` type to implement [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable).
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Sortable%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Sortable%252A): Indicates whether the data should be sortable by this column. The default value may vary according to the column type. For example, a [Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%25601) is sorted if any [Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%601.SortBy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%25601.SortBy%252A) parameter is specified.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.InitialSortDirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.InitialSortDirection%252A): Indicates the sort direction if [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.IsDefaultSortColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.IsDefaultSortColumn%252A) is `true`.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.IsDefaultSortColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.IsDefaultSortColumn%252A): Indicates whether this column should be sorted by default.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.PlaceholderTemplate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.PlaceholderTemplate%252A): If specified, virtualized grids use this template to render cells whose data hasn't been loaded.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.HeaderTemplate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.HeaderTemplate): An optional template for this column's header cell. If not specified, the default header template includes the [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Title](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Title), along with any applicable sort indicators and options buttons.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Title](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Title): Title text for the column. The title is rendered automatically if [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.HeaderTemplate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.HeaderTemplate) isn't used.



**Applies to: < aspnetcore-9.0**

* Specify tags for the `QuickGrid` component in Razor markup (`<QuickGrid>...</QuickGrid>`).
* Name a queryable source of data for the grid. Use ***either*** of the following data sources:
  * [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Items%252A): A nullable `IQueryable<TGridItem>`, where `TGridItem` is the type of data represented by each row in the grid.
  * [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemsProvider%252A): A callback that supplies data for the grid.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Class%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Class%252A): An optional CSS class name. If provided, the class name is included in the `class` attribute of the rendered table.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Theme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Theme%252A): A theme name (default value: `default`). This affects which styling rules match the table.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A): If true, the grid is rendered with virtualization. This is normally used in conjunction with scrolling and causes the grid to fetch and render only the data around the current scroll viewport. This can greatly improve the performance when scrolling through large data sets. If you use [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A), you should supply a value for [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemSize%252A) and must ensure that every row renders with a constant height. Generally, it's preferable not to use [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A) if the amount of data rendered is small or if you're using pagination.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemSize%252A): Only applicable when using [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Virtualize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Virtualize%252A). [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemSize%252A) defines an expected height in pixels for each row, allowing the virtualization mechanism to fetch the correct number of items to match the display size and to ensure accurate scrolling.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemKey%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemKey%252A): Optionally defines a value for `@key` on each rendered row. Typically, this is used to specify a unique identifier, such as a primary key value, for each data item. This allows the grid to preserve the association between row elements and data items based on their unique identifiers, even when the `TGridItem` instances are replaced by new copies (for example, after a new query against the underlying data store). If not set, the `@key` is the `TGridItem` instance.
* [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Pagination%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Pagination%252A): Optionally links this `TGridItem` instance with a [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) model, causing the grid to fetch and render only the current page of data. This is normally used in conjunction with a [Microsoft.AspNetCore.Components.QuickGrid.Paginator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.Paginator) component or some other UI logic that displays and updates the supplied [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) instance. [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) includes API for interacting with the current zero-based page index, the number of items on each page, the zero-based index of the last page, and the total number of items across all pages.
* In the QuickGrid child content ([Microsoft.AspNetCore.Components.RenderFragment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderFragment)), specify [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602)s, which represent `TGridItem` columns whose cells display values:
  * [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602.Property%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602.Property%252A): Defines the value to be displayed in this column's cells.
  * [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602.Format%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602.Format%252A): Optionally specifies a format string for the value. Using [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602.Format%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602.Format%252A) requires the `TProp` type to implement [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable).
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Sortable%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Sortable%252A): Indicates whether the data should be sortable by this column. The default value may vary according to the column type. For example, a [Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%25601) is sorted if any [Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%601.SortBy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn%25601.SortBy%252A) parameter is specified.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.InitialSortDirection%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.InitialSortDirection%252A): Indicates the sort direction if [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.IsDefaultSortColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.IsDefaultSortColumn%252A) is `true`.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.IsDefaultSortColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.IsDefaultSortColumn%252A): Indicates whether this column should be sorted by default.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.PlaceholderTemplate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.PlaceholderTemplate%252A): If specified, virtualized grids use this template to render cells whose data hasn't been loaded.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.HeaderTemplate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.HeaderTemplate): An optional template for this column's header cell. If not specified, the default header template includes the [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Title](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Title), along with any applicable sort indicators and options buttons.
  * [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Title](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Title): Title text for the column. The title is rendered automatically if [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.HeaderTemplate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.HeaderTemplate) isn't used.



For example, add the following component to render a grid.

**Applies to: < aspnetcore-11.0**

For Blazor Web Apps, the `QuickGrid` component must adopt an [interactive render mode](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frender-modes%23render-modes) to enable interactive features, such as paging and sorting.



`PromotionGrid.razor`:

**Applies to: \>= aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/PromotionGrid.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/quickgrid.md)



**Applies to: < aspnetcore-9.0**

[Code reference unavailable in this source snapshot: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/PromotionGrid.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/blazor/components/quickgrid.md)



Access the component in a browser at the relative path `/promotion-grid`.

There aren't current plans to extend QuickGrid with features that full-blown commercial grids tend to offer, for example, hierarchical rows, drag-to-reorder columns, or Excel-like range selections. If you require advanced features that you don't wish to develop on your own, continue using third-party grids.

## Page items with a `Paginator` component

**Applies to: \>= aspnetcore-11.0**

The `QuickGrid` component can page data from the data source.



**Applies to: < aspnetcore-11.0**

The `QuickGrid` component can page data from the data source. In Blazor Web Apps, paging requires the component to adopt an [interactive render mode](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frender-modes%23render-modes).



Add a [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) instance to the component's `@code` block. Set the [Microsoft.AspNetCore.Components.QuickGrid.PaginationState.ItemsPerPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState.ItemsPerPage%252A) to the number of items to display per page. In the following example, the instance is named `pagination`, and ten items per page is set:

```csharp
PaginationState pagination = new PaginationState { ItemsPerPage = 10 };
```

Set the `QuickGrid` component's [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Pagination](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Pagination) property to `pagination`:

```razor
<QuickGrid Items="..." Pagination="pagination">
```

**Applies to: \>= aspnetcore-11.0**

To provide a UI for pagination, add a [`Paginator` component](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.Paginator) above, below, or both above and below the `QuickGrid` component. Set the [Microsoft.AspNetCore.Components.QuickGrid.Paginator.State%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.Paginator.State%252A) to `pagination`:



**Applies to: < aspnetcore-11.0**

To provide a UI for pagination, add a [`Paginator` component](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.Paginator) above or below the `QuickGrid` component. Set the [Microsoft.AspNetCore.Components.QuickGrid.Paginator.State%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.Paginator.State%252A) to `pagination`:



```razor
<Paginator State="pagination" />
```

In the running app, page through the items using a rendered `Paginator` component.

**Applies to: < aspnetcore-11.0**

QuickGrid renders additional empty rows to fill in the final page of data when used with a `Paginator` component. In .NET 9 or later, empty data cells (`<td></td>`) are added to the empty rows. The empty rows are intended to facilitate rendering the QuickGrid with stable row height and styling across all pages.



**Applies to: \>= aspnetcore-11.0**

<!-- UPDATE 11.0 - API Browser cross-link -->

`GetPageUrl` returns a URL with the one-based page number. Page index 0 (page 1) omits the query parameter entirely.



## Pagination modes

**Applies to: \>= aspnetcore-11.0**

`QuickGrid` supports *URL-based navigation* with pagination and sort state persisted by the URL's query string. When users paginate or sort, the URL updates (example: `?page=2&sort=Name&direction=asc`). This enables link sharing, browser back/forward, and static SSR without interactivity.

Sortable column headers and [paginator controls](#page-items-with-a-paginator-component) render as `<a>` elements with `href` attributes. The links support standard browser behavior, such as opening a page in a new tab or window. The `StaticHtmlRenderer` renders these anchors. On each request, the server reads the query string to determine current page and sort state&mdash;no JavaScript runtime required.

Query string parameters:

* `page`: One-based page number. The first page omits the parameter for clean URLs.
* `sort`: Column title for sorting the grid.
* `direction`: Ascending (`asc`) or descending (`desc`).

If the `page` value is malformed, zero, or negative, `QuickGrid` displays the first page. If the value is greater than the number of available pages, `QuickGrid` displays the last page. This behavior applies when the grid receives data from either `Items` or `ItemsProvider`. An `ItemsProvider` must return an accurate total item count for `QuickGrid` to resolve the last page correctly.

Rename the preceding query string parameters with the `QueryParameterNameOptions` parameter. For more information, see the [Query parameter names](#query-parameter-names) section.

The `sort` column is identified by the column's `Title` property. Columns without a `Title` render a non-clickable `<div>` header.

`QuickGrid` reads the URL on initialization and subscribes to `NavigationManager.LocationChanged`, so browser back/forward and direct URL entry work. When sort parameters are removed from the URL, it falls back to the default sort column/direction.

> **Note:**
> Disabled [paginator links](#page-items-with-a-paginator-component) are marked with `aria-disabled="true"`, removed from the tab order with `tabindex="-1"`, and made non-interactive with `pointer-events: none`.



**Applies to: < aspnetcore-11.0**

Pagination and sort state is managed in memory inside the `QuickGrid` component without changing the URL, called *inner-state navigation*. An interactive render mode is required.



**Applies to: \>= aspnetcore-11.0**

To disable URL-based navigation, set the `AppContext` switch for the feature to `false`:

```csharp
AppContext.SetSwitch(
    "Microsoft.AspNetCore.Components.QuickGrid.EnableUrlBasedQuickGridNavigationAndSorting",
    false);
```

This restores `<button>` elements with `@onclick` handlers. An interactive render mode is required.

The switch only controls the rendered HTML element (`<a>` versus `<button>`). Even when disabled, `QuickGrid` still reads and writes state to the URL query string internally. `SortByColumnAsync` and `Paginator.GoToPageAsync` navigate via `NavigationManager.NavigateTo` regardless of the flag.



**Applies to: \>= aspnetcore-11.0**

## Query parameter names

<!-- UPDATE 11.0 - API Browser cross-links -->

The `QueryParameterNameOptions` parameter of the `QuickGrid` component controls the names of the query string parameters that persist grid state in the URL. The `QueryParameterNameOptions` class has three settable properties:

* `Sort`: Name of the query string parameter that holds the sort column. The default value is `sort`.
* `Direction`: Name of the query string parameter that holds the sort direction. The default value is `direction`.
* `Page`: Name of the query string parameter that holds the page number. The default value is `page`.

The parameter is never `null`. If the parameter isn't set, the `QuickGrid` component uses an instance created by the parameterless constructor, which results in the default names of the preceding list.

The constructor takes an optional prefix argument that's prepended to all three default names. The prefix must include any separator character that you want to appear between the prefix and the name. In the following example, the query string parameters are named `products_sort`, `products_direction`, and `products_page`:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid

<QuickGrid ... 
    QueryParameterNameOptions="@(new QueryParameterNameOptions("products_"))">
    ...
</QuickGrid>
```

To control the names individually, set the properties of the class. Properties set explicitly take precedence over a prefix passed to the constructor, so the two approaches can be combined. The following example names the query string parameters `orderBy`, `orderDir`, and `p`:

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

The page query parameter name is applied to the `PaginationState` instance assigned to the grid's [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Pagination%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Pagination%252A) parameter, so a linked `Paginator` component reads and writes the same parameter name automatically.

## Multiple grids on the same page

Multiple `QuickGrid` components on the same page require unique query parameter names to avoid query string conflicts. Assign a `QueryParameterNameOptions` parameter to all but one of the grids. For more information, see the [Query parameter names](#query-parameter-names) section.

Each `QuickGrid` must have its own `PaginationState` instance. Multiple grids must not share a `PaginationState` if they use different query parameter names&mdash;the last grid to render overwrites the query parameter name on the shared state, causing the `Paginator` to read from the wrong parameter.

In the following example, the first `QuickGrid` uses the default query parameter names, while the second one uses a `cities_` prefix:

```razor
<QuickGrid ... Pagination="@pagination1">
    ...
</QuickGrid>

<Paginator State="pagination1" />

<QuickGrid ... Pagination="@pagination2" 
    QueryParameterNameOptions="@(new QueryParameterNameOptions("cities_"))">
    ...
</QuickGrid>

<Paginator State="pagination2" />
```

In the following query string:

* The `page=2&sort=Name&direction=asc` portion applies to the first `QuickGrid` component.
* The `cities_page=3&cities_sort=Population&cities_direction=desc` portion applies to the second `QuickGrid` component.

```
?page=2&sort=Name&direction=asc&cities_page=3&cities_sort=Population&cities_direction=desc
```



**Applies to: \>= aspnetcore-11.0**

#### Row click event (`OnRowClick`)

The `QuickGrid` component supports row click events through the [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.OnRowClick%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.OnRowClick%252A) parameter. When set, the grid automatically applies appropriate styling (cursor pointer) and invokes the callback with the clicked item:

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

The feature includes built-in CSS styling that applies a pointer cursor to clickable rows through the `row-clickable` CSS class, providing clear visual feedback to users. The class is applied to the `tr` element of every data row when [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.OnRowClick%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.OnRowClick%252A) is set, and it's combined with any class returned by the [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.RowClass%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.RowClass%252A) parameter.

##### Event propagation from interactive cell content

The row click handler is registered on the row's `tr` element, so a click on an interactive control inside a cell, such as a button, a checkbox, or a link, bubbles up and also invokes [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.OnRowClick%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.OnRowClick%252A). To run only the control's own handler, stop propagation on the control with the [`@onclick:stopPropagation` directive attribute](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fevent-handling%23stop-event-propagation):

```razor
<QuickGrid Items="@people.AsQueryable()" 
    OnRowClick="@((Person args) => HandleRowClick(args))">
    <PropertyColumn Property="@(p => p.Name)" />
    <TemplateColumn Title="Actions">
        <button @onclick="@(() => Delete(context))" 
            @onclick:stopPropagation="true">
            Delete
        </button>
    </TemplateColumn>
</QuickGrid>
```

##### Accessibility

[Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.OnRowClick%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.OnRowClick%252A) is a pointer-based convenience. By design, it doesn't change the grid's table semantics, so rows don't receive keyboard focus, don't respond to <kbd>Enter</kbd> or <kbd>Space</kbd>, and aren't announced as interactive by assistive technologies. Making a row focusable with `tabindex` and `role="button"` isn't a supported workaround, as it breaks the table semantics that assistive technologies rely on to navigate the grid.

Treat a row click as a shortcut for pointer users rather than the only path to an action. For any action that a row click performs, provide a keyboard-accessible control in a cell, such as a button or a link:

```razor
<TemplateColumn Title="Details">
    <a href="@($"/person/{context.Id}")">View</a>
</TemplateColumn>
```



## Sort by column

**Applies to: \>= aspnetcore-11.0**

The `QuickGrid` component can sort items by columns. Selecting a header navigates to a URL with updated `sort` and `direction` parameters. `SortByColumnAsync` navigates via `NavigationManager.NavigateTo(GetSortQueryStringUrl(...))`, so the URL always reflects the sort state.



**Applies to: < aspnetcore-11.0**

The `QuickGrid` component can sort items by columns. In Blazor Web Apps, sorting requires the component to adopt an [interactive render mode](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Frender-modes%23render-modes).



Add `Sortable="true"` ([Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Sortable%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Sortable%252A)) to the [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602) tag:

```razor
<PropertyColumn Property="..." Sortable="true" />
```

In the running app, sort the QuickGrid column by selecting the rendered column title.

**Applies to: \>= aspnetcore-11.0**

Sort state in the URL uses the column's `Title` property as the identifier. The `sort` query parameter is set to `column.Title` (example for column title `Name`: `?sort=Name&direction=asc`). On a URL change, `QuickGrid` matches the `sort` value back to a column by executing `_columns.FirstOrDefault(c => c.Title == sort.ColumnTitle)`. If no column title matches, the sort is ignored and the grid falls back to its default sort.

Renaming a column's `Title` is a URL-breaking change. Any bookmarked or shared URLs containing the old title in the `sort` parameter stop matching, and the grid silently falls back to the default sort instead of sorting by the intended column. For `PropertyColumn`, the `Title` defaults to the property name (example: `Property="@(p => p.FirstName)"` produces `Title="First Name"`), so renaming the property or explicitly changing the `Title` parameter both break existing URLs.

> **Note:**
> If you want to share stylesheet classes between URL-based and inner-state based pagination, selectors targeting `button.col-title` must also target `a.col-title`, and `nav button`/`nav button:disabled` require `nav a`/`nav a[aria-disabled="true"]`. The built-in QuickGrid stylesheet provides both by default.



## Open and return from a details page with a paged QuickGrid component

**Applies to: \>= aspnetcore-11.0**

A paged QuickGrid component can open a details page for a record and return to the correct page of results using the approach in this section. URL-based navigation is used to save the page number and return the user to the same page of items from a details page.



**Applies to: < aspnetcore-11.0**

A paged QuickGrid component can open a details page for a record and return to the correct page of results using the approach in this section.

> **Note:**
> The approach described in this section is simplified by URL-based navigation in .NET 11 or later. For more information, see this section in a .NET 11 or later version of this article.

The following API is used:

* [Microsoft.AspNetCore.Components.QuickGrid.PaginationState.CurrentPageIndex%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState.CurrentPageIndex%252A): Gets the current zero-based page index.
* [Microsoft.AspNetCore.Components.QuickGrid.PaginationState.SetCurrentPageIndexAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState.SetCurrentPageIndexAsync%252A): Sets the current page index and notifies any associated `QuickGrid` components to fetch and render updated data.



The `Details` component receives the page number from the query string in the `Page` property and uses it to form a link back to the `QuickGrid` component at `/scifi-characters`.

`Details.razor`:

```razor
@page "/details"

<ul>
    <li>Character ID for this detail record: @Id</li>
    <li>QuickGrid page number: @Page</li>
</ul>
<div>
    @if (Page.HasValue)
    {
        <a href="@($"/scifi-characters?page={Page}")">Back to List</a>
    }
    else
    {
        <a href="/scifi-characters">Back to List</a>
    }
</div>

@code {
    [SupplyParameterFromQuery]
    private int? Id { get; set; }

    [SupplyParameterFromQuery]
    private int? Page { get; set; }
}
```

The `SciFiCharacters` component:

**Applies to: \>= aspnetcore-11.0**

* Automatically pages the `QuickGrid` component on component initialization using [URL-based navigation](#pagination-modes), which sets the page index from the value of a `page` query string value, if it exists.
* Opens the preceding `Details` component with the current page number, which is the current page index ([Microsoft.AspNetCore.Components.QuickGrid.PaginationState.CurrentPageIndex%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState.CurrentPageIndex%252A)) incremented by one to make the value a one-based index in the query string. A one-based index for the `page` query string parameter matches the rendered `Paginator` component's rendered one-based page number in the UI.

`ScifiCharacters.razor`:

```razor
@page "/scifi-characters"
@using Microsoft.AspNetCore.Components.QuickGrid
@inject NavigationManager Navigation

<QuickGrid Items="characters" Pagination="pagination" 
    OnRowClick="@((Character args) => HandleRowClick(args))">
    <PropertyColumn Property="@(c => c.Id)" />
    <PropertyColumn Property="@(c => c.Name)" />
</QuickGrid>

<Paginator State="pagination" />

@code {
    PaginationState pagination = new PaginationState { ItemsPerPage = 3 };

    private record Character(int Id, string Name);

    private IQueryable<Character> characters = new[]
    {
        new Character(0, "Ellen Ripley"),
        new Character(1, "Darth Vader"),
        new Character(2, "Rick Deckard"),
        new Character(3, "Sarah Connor"),
        new Character(4, "Malcolm Reynolds"),
        new Character(5, "Kara Thrace"),
        new Character(6, "James Kirk"),
        new Character(7, "Flash Gordon"),
        new Character(8, "Max Rockatansky"),
        new Character(9, "Katniss Everdeen"),
        new Character(10, "Ellie Sattler"),
        new Character(11, "Leela")
    }.AsQueryable();

    private void HandleRowClick(Character character)
    {
        Navigation.NavigateTo(
            $"/details?id={character.Id}&page={pagination.CurrentPageIndex + 1}");
    }
}
```

If the `QuickGrid` component sets `QueryParameterNameOptions`, set the query string parameter key for the results page in the `Details` component to match the `Page` property of the options. In the following example, the `QuickGrid` component is assigned a `QueryParameterNameOptions` instance with a `scifi-characters-quickgrid_` prefix, which results in a page query string parameter named `scifi-characters-quickgrid_page`.

In `Characters.razor`:

```razor
<QuickGrid ... 
    QueryParameterNameOptions="@(new QueryParameterNameOptions("scifi-characters-quickgrid_"))">
```

In `Details.razor`:

```razor
<a href="@($"/scifi-characters?scifi-characters-quickgrid_page={Page}")">Back to List</a>
```

> **Note:**
> To disable URL-based navigation, set the following feature flag in the app's `Program` file:
>
> ```csharp
> AppContext.SetSwitch(
>     "Microsoft.AspNetCore.Components.QuickGrid.EnableUrlBasedQuickGridNavigationAndSorting", 
>     false);
> ```



**Applies to: < aspnetcore-11.0**

* Pages the `QuickGrid` component by calling [Microsoft.AspNetCore.Components.QuickGrid.PaginationState.SetCurrentPageIndexAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState.SetCurrentPageIndexAsync%252A) on component initialization, setting the page index with the value of `Page` (page number) minus one (`-1`). The `page` query string parameter is removed after setting the page index using [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) and [`GetUriWithQueryParameter`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23query-strings).
* Opens the preceding `Details` component with the current page number, the page index incremented by one (`+1`), to make the value a one-based index ([Microsoft.AspNetCore.Components.QuickGrid.PaginationState.CurrentPageIndex%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState.CurrentPageIndex%252A)) in the query string. A one-based index for the `page` query string parameter matches the rendered `Paginator` component's rendered one-based page number in the UI.

`ScifiCharacters.razor`:

```razor
@page "/scifi-characters"
@rendermode InteractiveServer
@using Microsoft.AspNetCore.Components.QuickGrid
@inject NavigationManager Navigation

<QuickGrid Items="characters" Pagination="pagination">
    <PropertyColumn Property="@(c => c.Id)" />
    <PropertyColumn Property="@(c => c.Name)" />
    <TemplateColumn Context="c">
        <a href="@($"/details?id={c.Id}&page={pagination.CurrentPageIndex + 1}")">
            Details
        </a>
    </TemplateColumn>
</QuickGrid>

<Paginator State="pagination" />

@code {
    PaginationState pagination = new PaginationState { ItemsPerPage = 3 };

    private record Character(int Id, string Name);

    private IQueryable<Character> characters = new[]
    {
        new Character(0, "Ellen Ripley"),
        new Character(1, "Darth Vader"),
        new Character(2, "Rick Deckard"),
        new Character(3, "Sarah Connor"),
        new Character(4, "Malcolm Reynolds"),
        new Character(5, "Kara Thrace"),
        new Character(6, "James Kirk"),
        new Character(7, "Flash Gordon"),
        new Character(8, "Max Rockatansky"),
        new Character(9, "Katniss Everdeen"),
        new Character(10, "Ellie Sattler"),
        new Character(11, "Leela")
    }.AsQueryable();

    [SupplyParameterFromQuery]
    private int? Page { get; set; }

    protected override async Task OnInitializedAsync()
    {
        if (Page.HasValue && Page > 0)
        {
            await pagination.SetCurrentPageIndexAsync(Page.Value - 1);
            Navigation.NavigateTo(
                Navigation.GetUriWithQueryParameter("page", (int?)null));
        }
    }
}
```



## Apply row styles

Apply styles to rows using [CSS isolation](css-isolation.md), which can include styling empty rows for `QuickGrid` components that [page data with a `Paginator` component](#page-items-with-a-paginator-component).

Wrap the `QuickGrid` component in a wrapper block element, for example a `<div>`:

```diff
+ <div>
    <QuickGrid ...>
        ...
    </QuickGrid>
+ </div>
```

Apply a row style with the `::deep` [pseudo-element](https://developer.mozilla.org/docs/Web/CSS/Pseudo-elements). In the following example, row height is set to `2em`, including for empty data rows.

`{COMPONENT}.razor.css`:

```css
::deep tr {
    height: 2em;
}
```

Alternatively, use the following CSS styling approach:

* Display row cells populated with data.
* Don't display empty row cells, which avoids empty row cell borders from rendering per Bootstrap styling.

`{COMPONENT}.razor.css`:

```css
::deep tr:has(> td:not(:empty)) > td {
    display: table-cell;
}

::deep td:empty {
    display: none;
}
```

For more information on using `::deep` [pseudo-elements](https://developer.mozilla.org/docs/Web/CSS/Pseudo-elements) with CSS isolation, see [blazor/components/css-isolation#child-component-support](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcss-isolation%23child-component-support).

## Custom attributes and styles

QuickGrid also supports passing custom attributes and style classes ([Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Class%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Class%252A)) to the rendered table element:

```razor
<QuickGrid Items="..." custom-attribute="value" Class="custom-class">
```

**Applies to: \>= aspnetcore-10.0**

## Style a table row based on the row item

Apply a stylesheet class to a row of the grid based on the row item using the [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.RowClass%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.RowClass%252A) parameter.

In the following example:

* A row item is represented by the `Person` [record](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/record). The `Person` record includes a `FirstName` property.
* The `GetRowCssClass` method applies the `highlight-row` class styles to any row where the person's first name is "`Julie`."

```razor
<QuickGrid ... RowClass="GetRowCssClass">
    ...
</QuickGrid>

@code {
    private record Person(int PersonId, string FirstName, string LastName);

    private string GetRowCssClass(Person person) =>
        person.FirstName == "Julie" ? "highlight-row" : null;
}
```



**Applies to: \>= aspnetcore-10.0**

### Close `QuickGrid` column options

Close the `QuickGrid` column options UI with the [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.HideColumnOptionsAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.HideColumnOptionsAsync%252A) method.

The following example closes the column options UI as soon as the title filter is applied:

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



## Entity Framework Core (EF Core) data source

Use the factory pattern to resolve an EF Core database context that provides data to a `QuickGrid` component. For more information on why the factory pattern is recommended, see [blazor/blazor-ef-core](../blazor-ef-core.md).

A database context factory ([Microsoft.EntityFrameworkCore.IDbContextFactory%601](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.IDbContextFactory%25601)) is injected into the component with the `@inject` directive. The factory approach requires disposal of the database context, so the component implements the [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface with the `@implements` directive. The item provider for the `QuickGrid` component is a `DbSet<T>` obtained from the created database context ([Microsoft.EntityFrameworkCore.IDbContextFactory%601.CreateDbContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.IDbContextFactory%25601.CreateDbContext%252A)) of the injected database context factory.

QuickGrid recognizes EF-supplied [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) instances and knows how to resolve queries asynchronously for efficiency.

Add a package reference for the [`Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter` NuGet package](https://www.nuget.org/packages/Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter).

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


Call [Microsoft.Extensions.DependencyInjection.EntityFrameworkAdapterServiceCollectionExtensions.AddQuickGridEntityFrameworkAdapter%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkAdapterServiceCollectionExtensions.AddQuickGridEntityFrameworkAdapter%252A) on the service collection in the `Program` file to register an EF-aware [Microsoft.AspNetCore.Components.QuickGrid.IAsyncQueryExecutor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.IAsyncQueryExecutor) implementation:

```csharp
builder.Services.AddQuickGridEntityFrameworkAdapter();
```

The following example uses an `ExampleTable` [Microsoft.EntityFrameworkCore.DbSet%601](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) (table) from a `AppDbContext` database context (`context`) as the data source for a `QuickGrid` component:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid
@using Microsoft.EntityFrameworkCore
@implements IAsyncDisposable
@inject IDbContextFactory<AppDbContext> DbFactory

...

<QuickGrid ... Items="context.ExampleTable" ...>
    ...
</QuickGrid>

@code {
    private AppDbContext context = default!;

    protected override void OnInitialized()
    {
        context = DbFactory.CreateDbContext();
    }

    public async ValueTask DisposeAsync() => await context.DisposeAsync();
}
```

In the code block (`@code`) of the preceding example:

* The `context` field holds the database context, typed as an `AppDbContext`.
* The `OnInitialized` lifecycle method assigns a new database context ([Microsoft.EntityFrameworkCore.IDbContextFactory%601.CreateDbContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.IDbContextFactory%25601.CreateDbContext%252A)) to the `context` field from the injected factory (`DbFactory`).
* The asynchronous `DisposeAsync` method disposes of the database context when the component is disposed.

You may also use any EF-supported LINQ operator to filter the data before passing it to the [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Items%252A) parameter.

The following example filters movies by a movie title entered in a search box. The database context is `BlazorWebAppMoviesContext`, and the model is `Movie`. The movie's `Title` property is used for the filter operation.

```razor
@using Microsoft.AspNetCore.Components.QuickGrid
@using Microsoft.EntityFrameworkCore
@implements IAsyncDisposable
@inject IDbContextFactory<BlazorWebAppMoviesContext> DbFactory

...

<p>
    <input type="search" @bind="titleFilter" @bind:event="oninput" />
</p>

<QuickGrid ... Items="FilteredMovies" ...>
    ...
</QuickGrid>

@code {
    private string titleFilter = string.Empty;
    private BlazorWebAppMoviesContext context = default!;

    protected override void OnInitialized()
    {
        context = DbFactory.CreateDbContext();
    }

    private IQueryable<Movie> FilteredMovies => 
        context.Movie.Where(m => m.Title!.Contains(titleFilter));

    public async ValueTask DisposeAsync() => await context.DisposeAsync();
}
```

For a working example, see the following resources:

* [Build a Blazor movie database app tutorial](../tutorials/movie-database-app/index.md)
* [Blazor movie database sample app](https://github.com/dotnet/blazor-samples): Select the latest version folder in the repository. The sample folder for the tutorial's project is named `BlazorWebAppMovies`.

## Display name support

A column title can be assigned using [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Title](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Title) in the [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602)'s tag. In the following movie example, the column is given the name "`Release Date`" for the column's movie release date data:

```razor
<PropertyColumn Property="movie => movie.ReleaseDate" Title="Release Date" />
```

However, managing column titles (names) from bound model properties is usually a better choice for maintaining an app. A model can control the display name of a property with the [`[Display]` attribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute). In the following example, the model specifies a movie release date display name of "`Release Date`" for its `ReleaseDate` property:

```csharp
[Display(Name = "Release Date")]
public DateTime ReleaseDate { get; set; }
```

To enable the `QuickGrid` component to use the [System.ComponentModel.DataAnnotations.DisplayAttribute.Name](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute.Name) property, subclass [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602), either in the component or in a separate class. Call the [System.ComponentModel.DataAnnotations.DisplayAttribute.GetName%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute.GetName%252A) method to return the localized [System.ComponentModel.DataAnnotations.DisplayAttribute.Name](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute.Name) value if an unlocalized [System.ComponentModel.DisplayNameAttribute.DisplayName](https://learn.microsoft.com/search/?terms=System.ComponentModel.DisplayNameAttribute.DisplayName) ([`\[DisplayName\]\` attribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DisplayNameAttribute)) doesn't hold the value:

```csharp
public class DisplayNameColumn<TGridItem, TProp> : PropertyColumn<TGridItem, TProp>
{
    protected override void OnParametersSet()
    {
        if (Title is null && Property.Body is MemberExpression memberExpression)
        {
            var memberInfo = memberExpression.Member;
            Title = 
                memberInfo.GetCustomAttribute<DisplayNameAttribute>().DisplayName ??
                memberInfo.GetCustomAttribute<DisplayAttribute>().GetName() ??
                memberInfo.Name;
        }

        base.OnParametersSet();
    }
}
```

Use the subclass in the `QuickGrid` component. In the following example, the preceding `DisplayNameColumn` is used. The name "`Release Date`" is provided by the [`[Display]` attribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute) in the model, so there's no need to specify a [Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Title](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Title):

```razor
<DisplayNameColumn Property="movie => movie.ReleaseDate" />
```

The [`[DisplayName]` attribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DisplayNameAttribute) is also supported:

```csharp
[DisplayName("Release Date")]
public DateTime ReleaseDate { get; set; }
```

However, the `[Display]` attribute is recommended because it makes additional properties available. For example, the `[Display]` attribute offers the ability to assign a resource type for localization.

## Remote data

In Blazor WebAssembly apps, fetching data from a JSON-based web API on a server is a common requirement. To fetch only the data that's required for the current page/viewport of data and apply sorting or filtering rules on the server, use the [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemsProvider%252A) parameter.

[Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemsProvider%252A) can also be used in a server-side Blazor app if the app is required to query an external endpoint or in other cases where the requirements aren't covered by an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable).

Supply a callback matching the [Microsoft.AspNetCore.Components.QuickGrid.GridItemsProvider%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.GridItemsProvider%25601) delegate type, where `TGridItem` is the type of data displayed in the grid. The callback is given a parameter of type [Microsoft.AspNetCore.Components.QuickGrid.GridItemsProviderRequest%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.GridItemsProviderRequest%25601), which specifies the start index, maximum row count, and sort order of data to return. In addition to returning the matching items, a total item count (`totalItemCount`) is also required for paging and virtualization to function correctly.

The following example obtains data from the public [OpenFDA Food Enforcement database](https://open.fda.gov/apis/food/enforcement/).

The [Microsoft.AspNetCore.Components.QuickGrid.GridItemsProvider%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.GridItemsProvider%25601) converts the [Microsoft.AspNetCore.Components.QuickGrid.GridItemsProviderRequest%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.GridItemsProviderRequest%25601) into a query against the OpenFDA database. Query parameters are translated into the particular URL format supported by the external JSON API. It's only possible to perform sorting and filtering via sorting and filtering that's supported by the external API. The OpenFDA endpoint doesn't support sorting, so none of the columns are marked as sortable. However, it does support skipping records (`skip` parameter) and limiting the return of records (`limit` parameter), so the component can enable virtualization and scroll quickly through tens of thousands of records.

`FoodRecalls.razor`:

```razor
@page "/food-recalls"
@inject HttpClient Http
@inject NavigationManager Navigation

<PageTitle>Food Recalls</PageTitle>

<h1>OpenFDA Food Recalls</h1>

<div class="grid" tabindex="-1">
    <QuickGrid ItemsProvider="@foodRecallProvider" Virtualize="true">
        <PropertyColumn Title="ID" Property="@(c => c.Event_Id)" />
        <PropertyColumn Property="@(c => c.State)" />
        <PropertyColumn Property="@(c => c.City)" />
        <PropertyColumn Title="Company" Property="@(c => c.Recalling_Firm)" />
        <PropertyColumn Property="@(c => c.Status)" />
    </QuickGrid>
</div>

<p>Total: <strong>@numResults results found</strong></p>

@code {
    private GridItemsProvider<FoodRecall>? foodRecallProvider;
    private int numResults;

    protected override async Task OnInitializedAsync()
    {
        foodRecallProvider = async req =>
        {
            var url = Navigation.GetUriWithQueryParameters(
                "https://api.fda.gov/food/enforcement.json", 
                new Dictionary<string, object?>
            {
                { "skip", req.StartIndex },
                { "limit", req.Count },
            });

            using var response = await Http.GetFromJsonAsync<FoodRecallQueryResult>(
                url, req.CancellationToken);

            return GridItemsProviderResult.From(
                items: response!.Results,
                totalItemCount: response!.Meta.Results.Total);
        };

        numResults = (await Http.GetFromJsonAsync<FoodRecallQueryResult>(
            "https://api.fda.gov/food/enforcement.json"))!.Meta.Results.Total;
    }
}
```

For more information on calling web APIs, see [blazor/call-web-api](../call-web-api.md).

## QuickGrid scaffolder

The QuickGrid scaffolder scaffolds Razor components with QuickGrid to display data from a database.

The scaffolder generates basic Create, Read, Update, and Delete (CRUD) pages based on an Entity Framework Core data model. You can scaffold individual pages or all of the CRUD pages. You select the model class and the `DbContext`, optionally creating a new `DbContext` if needed.

The scaffolded Razor components are added to the project's in a generated folder named after the model class. The generated `Index` component uses a `QuickGrid` component to display the data. Customize the generated components as needed and enable interactivity to take advantage of interactive features, such as [paging](#page-items-with-a-paginator-component), [sorting](#sort-by-column) and filtering.

The components produced by the scaffolder require server-side rendering (SSR), so they aren't supported when running on WebAssembly.

# [Visual Studio](#tab/visual-studio)

Right-click on the `Components/Pages` folder and select **Add** > **New Scaffolded Item**.

With the **Add New Scaffold Item** dialog open to **Installed** > **Common** > **Blazor** > **Razor Component**, select **Razor Components using Entity Framework (CRUD)**. Select the **Add** button.

*CRUD* is an acronym for Create, Read, Update, and Delete. The scaffolder produces create, edit, delete, details, and index components for the app.

Complete the **Add Razor Components using Entity Framework (CRUD)** dialog:

* The **Template** dropdown list includes other templates for specifically creating create, edit, delete, details, and list components. This dropdown list comes in handy when you only need to create a specific type of component scaffolded to a model class. Leave the **Template** dropdown list set to **CRUD** to scaffold a full set of components.
* In the **Model class** dropdown list, select the model class. A folder is created for the generated components from the model name (if the model class is named `Movie`, the folder is automatically named `MoviePages`).
* For **DbContext class**, take either of the following approaches:
  * Select an existing [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class.
  * Select the **+** (plus sign) button and use the **Add Data Context** modal dialog to supply a new [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class name. The scaffolder registers a new context with a factory provider instead of using the context type directly as a service registration, and it updates an existing `ApplicationDbContext` registration to use a factory provider when needed.
* After the model dialog closes, the **Database provider** dropdown list defaults to **SQL Server**. You can select the appropriate provider for the database that you're using. The options include SQL Server, SQLite, PostgreSQL, and Azure Cosmos DB.
* Select **Add**.

# [Visual Studio Code](#tab/visual-studio-code)

Paste all of the following commands at the prompt (`>`) of the **Terminal** (**Terminal** menu > **New Terminal**) opened to the project's root directory. When you paste multiple commands, a warning appears stating that multiple commands will execute. Dismiss the warning and proceed with the paste operation.

When you paste multiple commands, all of the commands execute except the last one. The last command doesn't execute until you press <kbd>Enter</kbd> on the keyboard.

```dotnetcli
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Components.QuickGrid
dotnet add package Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter
```

> **Important:**
> After the first eight commands execute, make sure that you press <kbd>Enter</kbd> on the keyboard to execute the last command.

The preceding commands add:

* [Command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet)
* [`aspnet-codegenerator` scaffolding tool](../../fundamentals/tools/dotnet-aspnet-codegenerator.md)
* Design time tools for EF Core
* The SQLite and SQL Server providers with the EF Core package as a dependency
* [`Microsoft.VisualStudio.Web.CodeGeneration.Design`](https://www.nuget.org/packages/Microsoft.VisualStudio.Web.CodeGeneration.Design) for scaffolding

In the **Terminal**, execute the following command to scaffold a full set of components with the `CRUD` template:

```dotnetcli
dotnet aspnet-codegenerator blazor CRUD -dbProvider {PROVIDER} -dc {DB CONTEXT CLASS} -m {MODEL} -outDir {PATH}
```

> **Note:**
> The preceding command is a .NET CLI command, and .NET CLI commands are executed when entered at a [PowerShell](https://learn.microsoft.com/powershell/) prompt, which is the default command shell of the VS Code **Terminal**.

The following table explains the ASP.NET Core code generator options in the preceding command.

| Option | Placeholder | Description |
| --- | --- | --- |
| `-dbProvider` | `{PROVIDER}` | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`. |
| `-dc` | `{DB CONTEXT CLASS}` | The [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class to use, including the namespace. |
| `-m` | `{MODEL}` | The name of the model class. |
| `-outDir` | `{PATH}` | The output directory for the generated components. A folder is created from the model name in the output directory to hold the components (if the model class is named `Movie`, the folder is automatically named `MoviePages`). The path is typically either `Components/Pages` for a Blazor Web App or `Pages` for a standalone Blazor WebAssembly app. |

For the additional Blazor provider options, use the .NET CLI help option (`-h`|`--help`):

```dotnetcli
dotnet aspnet-codegenerator blazor -h
```

# [.NET CLI](#tab/net-cli)

Paste all of the following commands at the prompt (`>`) of a command shell opened to the project's root directory. When you paste multiple commands, a warning appears stating that multiple commands will execute. Dismiss the warning and proceed with the paste operation.

When you paste multiple commands, all of the commands execute except the last one. The last command doesn't execute until you press <kbd>Enter</kbd> on the keyboard.

```dotnetcli
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Components.QuickGrid
dotnet add package Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter
```

> **Important:**
> After the first eight commands execute, make sure that you press <kbd>Enter</kbd> on the keyboard to execute the last command.

The preceding commands add:

* [Command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet)
* [`aspnet-codegenerator` scaffolding tool](../../fundamentals/tools/dotnet-aspnet-codegenerator.md)
* Design time tools for EF Core
* The SQLite and SQL Server providers with the EF Core package as a dependency
* [`Microsoft.VisualStudio.Web.CodeGeneration.Design`](https://www.nuget.org/packages/Microsoft.VisualStudio.Web.CodeGeneration.Design) for scaffolding.

In a command shell, execute the following command to scaffold a full set of components with the `CRUD` template:

```dotnetcli
dotnet aspnet-codegenerator blazor CRUD -dbProvider {PROVIDER} -dc {DB CONTEXT CLASS} -m {MODEL} -outDir {PATH}
```

The following table explains the ASP.NET Core code generator options in the preceding command.

| Option | Placeholder | Description |
| --- | --- | --- |
| `-dbProvider` | `{PROVIDER}` | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`. |
| `-dc` | `{DB CONTEXT CLASS}` | The [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class to use, including the namespace. |
| `-m` | `{MODEL}` | The name of the model class. |
| `-outDir` | `{PATH}` | The output directory for the generated components. A folder is created from the model name in the output directory to hold the components (if the model class is named `Movie`, the folder is automatically named `MoviePages`). The path is typically either `Components/Pages` for a Blazor Web App or `Pages` for a standalone Blazor WebAssembly app. |

For the additional Blazor provider options, use the .NET CLI help option (`-h`|`--help`):

```dotnetcli
dotnet aspnet-codegenerator blazor -h
```

---

For an example use of the QuickGrid scaffolder, see [blazor/tutorials/movie-database-app/index](../tutorials/movie-database-app/index.md).

<!-- UPDATE 12.0 - PU work tracked by https://github.com/dotnet/aspnetcore/issues/58716.
                   We will continue to show this for now. The PU plans to look at it
                   for framework updates at 12.0. -->

## Multiple concurrent EF Core queries trigger `System.InvalidOperationException`

Multiple concurrent EF Core queries can trigger the following [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException):

> System.InvalidOperationException: A second operation was started on this context instance before a previous operation completed. This is usually caused by different threads concurrently using the same instance of DbContext. For more information on how to avoid threading issues with DbContext, see https\://go.microsoft.com/fwlink/?linkid=2097913.

This scenario is scheduled for improvement in an upcoming release of ASP.NET Core. For more information, see [[Blazor] Improve the experience with QuickGrid and EF Core (`dotnet/aspnetcore` #58716)](https://github.com/dotnet/aspnetcore/issues/58716).

In the meantime, you can address the problem using an [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.ItemsProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.ItemsProvider%252A) with a cancellation token. The cancellation token prevents concurrent queries by cancelling the previous request when a new request is issued.

Consider the following example, which is based on the movie database `Index` component for the [blazor/tutorials/movie-database-app/index](../tutorials/movie-database-app/index.md) tutorial. The simpler version scaffolded into the app can be seen in the article's [sample app](https://learn.microsoft.com/search/?terms=blazor%2Ftutorials%2Fmovie-database-app%2Findex%23sample-app). The `Index` component scaffolded into the app is replaced by the following component.

`Components/Pages/MoviePages/Index.razor`:

```razor
@page "/movies"
@rendermode InteractiveServer
@using Microsoft.EntityFrameworkCore
@using Microsoft.AspNetCore.Components.QuickGrid
@using BlazorWebAppMovies.Models
@using BlazorWebAppMovies.Data
@inject IDbContextFactory<BlazorWebAppMovies.Data.BlazorWebAppMoviesContext> DbFactory

<PageTitle>Index</PageTitle>

<h1>Index</h1>

<div>
    <input type="search" @bind="titleFilter" @bind:event="oninput" />
</div>

<p>
    <a href="movies/create">Create New</a>
</p>

<div>
    <QuickGrid Class="table" TGridItem="Movie" ItemsProvider="GetMovies"
            ItemKey="(x => x.Id)" Pagination="pagination">
        <PropertyColumn Property="movie => movie.Title" Sortable="true" />
        <PropertyColumn Property="movie => movie.ReleaseDate" Title="Release Date" />
        <PropertyColumn Property="movie => movie.Genre" />
        <PropertyColumn Property="movie => movie.Price" />
        <PropertyColumn Property="movie => movie.Rating" />

        <TemplateColumn Context="movie">
            <a href="@($"movies/edit?id={movie.Id}")">Edit</a> |
            <a href="@($"movies/details?id={movie.Id}")">Details</a> |
            <a href="@($"movies/delete?id={movie.Id}")">Delete</a>
        </TemplateColumn>
    </QuickGrid>
</div>

<Paginator State="pagination" />

@code {
    private BlazorWebAppMoviesContext context = default!;
    private PaginationState pagination = new PaginationState { ItemsPerPage = 5 };
    private string titleFilter = string.Empty;

    public async ValueTask<GridItemsProviderResult<Movie>> GetMovies(GridItemsProviderRequest<Movie> request)
    {
        using var context = DbFactory.CreateDbContext();
        var totalCount = await context.Movie.CountAsync(request.CancellationToken);
        IQueryable<Movie> query = context.Movie.OrderBy(x => x.Id);
        query = request.ApplySorting(query).Skip(request.StartIndex);

        if (request.Count.HasValue)
        {
            query = query.Take(request.Count.Value);
        }

        var items = await query.ToArrayAsync(request.CancellationToken);

        var result = new GridItemsProviderResult<Movie>
        {
            Items = items,
            TotalItemCount = totalCount
        };

        return result;
    }
}
```
