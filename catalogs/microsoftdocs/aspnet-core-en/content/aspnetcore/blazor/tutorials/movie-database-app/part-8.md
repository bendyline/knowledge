---
title: Build a Blazor movie database app (Part 8 - Add interactivity)
author: guardrex
description: This part of the Blazor movie database app tutorial explains how to adopt interactive SSR rendering in the app.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/tutorials/movie-database-app/part-8
zone_pivot_groups: tooling
---
# Build a Blazor movie database app (Part 8 - Add interactivity)

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


This article is the eighth part of the Blazor movie database app tutorial that teaches you the basics of building an ASP.NET Core Blazor Web App with features to manage a movie database.

Up to this point in the tutorial, the entire app has been *enabled* for interactivity, but the app has only *adopted* interactivity in its `Counter` sample component. This part of the tutorial series explains how to adopt interactivity in the movie `Index` component.

> **Important:**
> Confirm that the app isn't running for the next steps.

## Adopt interactivity

*Interactivity* means that a component has the capacity to process UI events via C# code, such as a button click. The events are either processed on the server by the ASP.NET Core runtime or in the browser on the client by the WebAssembly-based Blazor runtime. This tutorial adopts interactive server-side rendering (interactive SSR), also known generally as Interactive Server (`InteractiveServer`) rendering. Client-side rendering (CSR), which is inherently interactive, is covered in the Blazor reference documentation.

Interactive SSR enables a rich user experience like one would expect from a client app but without the need to create API endpoints to access server resources. UI interactions are handled by the server over a real-time SignalR connection with the browser. Page content for interactive pages is prerendered, where content on the server is initially generated and sent to the client without enabling event handlers for rendered controls. With prerendering, the server outputs the HTML UI of the page as soon as possible in response to the initial request, which makes the app feel more responsive to users.

Review the API in the `Program` file (`Program.cs`) that enables interactive SSR. Razor component services are added to the app to enable Razor components to render statically from the server ([Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A)) and execute code with interactive SSR ([Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%252A)):

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
```

[Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents%252A) maps components defined in the root `App` component to the given .NET assembly and renders routable components, and [Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%252A) configures the app's SignalR hub to support interactive SSR:

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
```

Up to this point in the tutorial series, the calls to [Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents%252A) and [Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode%252A) weren't required for the movie pages because the app only adopted static SSR features for the movie components. This article explains how to adopt interactive features in the movie `Index` component.

When Blazor sets the type of rendering for a component, the rendering is referred to as the component's *render mode*. The following table shows the available render modes for rendering Razor components in a Blazor Web App.

| Name | Description | Render location | Interactive |
| --- | --- | :---: | :---: |
| Static Server | Static server-side rendering (static SSR) | Server | <span aria-hidden="true">❌</span><span class="visually-hidden">No</span> |
| Interactive Server | Interactive server-side rendering (interactive SSR) using Blazor Server. | Server | <span aria-hidden="true">✔️</span><span class="visually-hidden">Yes</span> |
| Interactive WebAssembly | Client-side rendering (CSR) using Blazor WebAssembly. | Client | <span aria-hidden="true">✔️</span><span class="visually-hidden">Yes</span> |
| Interactive Auto | Interactive SSR using Blazor Server initially and then CSR on subsequent visits after the Blazor bundle is downloaded. | Server, then client | <span aria-hidden="true">✔️</span><span class="visually-hidden">Yes</span> |

To apply a render mode to a component, the developer either uses the `@rendermode` directive or directive attribute on the component instance or on the component definition:

* The following example shows how to set the render mode on a component instance with the `@rendermode` directive attribute. The following example uses a hypothetical dialog (`Dialog`) component in a parent chat (`Chat`) component.

  Within the `Components/Pages/Chat.razor` file:

  ```razor
  <Dialog @rendermode="InteractiveServer" />
  ```

* The following example shows how to set the render mode on a component definition with the `@rendermode` directive. The following example shows setting the render mode in a hypothetical sales forecast (`SalesForecast`) component definition file (`.razor`).

  At the top of `Components/Pages/SalesForecast.razor` file:

  ```razor
  @page "/sales-forecast"
  @rendermode InteractiveServer
  ```

Using the preceding approaches, you can apply a render mode on a per-page/component basis. However, an entire app can adopt a single render mode via a root component that then by inheritance sets the render mode of every other component loaded. This is termed *global interactivity*, as opposed to *per-page/component interactivity*. Global interactivity is useful if most of the app requires interactive features. Global interactivity is usually applied via the `App` component, which is the root component of an app created from the Blazor Web App project template.

> **Note:**
> More information on render modes and global interactivity is provided by Blazor's reference documentation. For the purposes of this tutorial, the app only adopts interactive SSR on a per-page/component basis. After the tutorial, you're free to use this app to study the other component render modes and the global interactivity location.

Open the movie `Index` component file (`Components/Pages/MoviePages/Index.razor`), and add the following `@rendermode` directive immediately after the `@page` directive to make the component interactive:

```diff
@rendermode InteractiveServer
```

To see how making a component interactive enhances the user experience, let's provide three enhancements to the app in the following sections:

* Add pagination to the movie `QuickGrid` component.
* Make the `QuickGrid` component *sortable*.
* Replace the HTML form for filtering movies by title with C# code that:
  * Runs on the server.
  * Renders content interactively over the underlying SignalR connection.

## Add pagination to the QuickGrid

The `QuickGrid` component can page data from the database.

Open the `Index` component (`Components/Pages/Movies/Index.razor`). Add a [Microsoft.AspNetCore.Components.QuickGrid.PaginationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState) instance to the `@code` block. Because the tutorial only uses five movie records for demonstration, set the [Microsoft.AspNetCore.Components.QuickGrid.PaginationState.ItemsPerPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState.ItemsPerPage%252A) to `2` items in order to demonstrate pagination. Normally, the number of items to display would be set to a higher value or set dynamically via a dropdown list.

```csharp
private PaginationState pagination = new PaginationState { ItemsPerPage = 2 };
```

Set the `QuickGrid` component's [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Pagination](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Pagination) property to `pagination`:

```diff
- <QuickGrid Class="table" Items="FilteredMovies">
+ <QuickGrid Class="table" Items="FilteredMovies" Pagination="pagination">
```

To provide a UI for pagination below the `QuickGrid` component, add a [`Paginator` component](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.Paginator) below the `QuickGrid` component.  Set the [Microsoft.AspNetCore.Components.QuickGrid.Paginator.State%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.Paginator.State%252A) to `pagination`:

```razor
<Paginator State="pagination" />
```

Run the app and navigate to the movies `Index` page. You can page through the movie items at two movies per page:

Movie list showing the second page of two items

The component is *interactive*. The page doesn't reload for paging to occur. The paging is performed live over the SignalR connection between the browser and the server, where the paging operation is performed on the server with the rendered result sent back to the client for the browser to display.

Change [Microsoft.AspNetCore.Components.QuickGrid.PaginationState.ItemsPerPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PaginationState.ItemsPerPage%252A) to a more reasonable value, such as five items per page:

```diff
- private PaginationState pagination = new PaginationState { ItemsPerPage = 2 };
+ private PaginationState pagination = new PaginationState { ItemsPerPage = 5 };
```

## Sortable QuickGrid

Open the `Index` component (`Components/Pages/Movies/Index.razor`).

Add `Sortable="true"` ([Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%601.Sortable%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.ColumnBase%25601.Sortable%252A)) to the title [Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%602](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn%25602):

```diff
- <PropertyColumn Property="movie => movie.Title" />
+ <PropertyColumn Property="movie => movie.Title" Sortable="true" />
```

You can sort the QuickGrid by movie title by selecting the **Title** column. The page doesn't reload for sorting to occur. The sorting is performed live over the SignalR connection, where the sorting operation is performed on the server with the rendered result sent back to the client:

Movie list sorted by the Title column

## Use C# code and interactivity to search by title

In an earlier part of the tutorial series, the `Index` component was modified to allow the user to filter movies by title. This was accomplished by:

* Adding an HTML form that issues a GET request to the server with the user's title search string as a query string field-value pair (for example, `?titleFilter=road+warrior` if the user searches for "`road warrior`").
* Adding code to the component that obtains the title search string from the query string and uses it to filter the database's records.

The preceding approach is effective for a component that adopts static SSR, where the only interaction between the client and server is via HTTP requests. There was no live SignalR connection between the client and the server, and there was no way for the app on the server to process C# code *interactively* based on the user's actions in the component's UI and return content.

Now that the component is interactive, it can provide an improved user experience with Blazor features for binding and event handling.

Add a delegate event handler that the user can trigger to filter the database's movie records. The method uses the value of the `TitleFilter` property to perform the operation. If the user clears `TitleFilter` and searches, the method loads the entire movie list for display.

Delete the following lines from the `@code` block:

```diff
- [SupplyParameterFromQuery]
- private string? TitleFilter { get; set; }
    
- private IQueryable<Movie> FilteredMovies =>
-     context.Movie.Where(m => m.Title!.Contains(TitleFilter ?? string.Empty));
```

Replace the deleted code with the following code:

```csharp
private string titleFilter = string.Empty;

private IQueryable<Movie> FilteredMovies => 
    context.Movie.Where(m => m.Title!.Contains(titleFilter));
```

Next, the component should bind the `titleFilter` field to an `<input>` element, so user input is stored in the `titleFilter` variable. Binding is achieved in Blazor with the `@bind` directive attribute.

Remove the HTML form from the component:

```diff
- <form action="/movies" data-enhance>
-     <input type="search" name="titleFilter" />
-     <input type="submit" value="Search" />
- </form>
```

In its place, add the following Razor markup:

```razor
<input type="search" @bind="titleFilter" @bind:event="oninput" />
```

`@bind:event="oninput"` performs binding for the HTML's `oninput` event, which fires when the `<input>` element's value is changed as a direct result of a user typing in the search box. The QuickGrid is bound to `FilteredMovies`. As `titleFilter` changes with the value of the search box, rerendering the QuickGrid bound to the `FilteredMovies` method filters movie entities based on the updated value of `titleFilter`.

**Applies to: vs**


Run the app, type "`road warrior`" into the search field and notice how the QuickGrid is filtered for each character entered until *The Road Warrior* movie is left when the search field reaches "`road `" (&quot;road&quot; followed by a space).

Movie list filtered to 'The Road Warrior' movie when the search box reaches 'road ' ('road' followed by a space).



**Applies to: vsc**


Run the app, type "`Road Warrior`" into the search field and notice how the QuickGrid is filtered for each character entered until *The Road Warrior* movie is left when the search field reaches "`Road `" (&quot;Road&quot; followed by a space).

Movie list filtered to 'The Road Warrior' movie when the search box reaches 'Road ' ('Road' followed by a space).



**Applies to: cli**


Run the app, type "`Road Warrior`" into the search field and notice how the QuickGrid is filtered for each character entered until *The Road Warrior* movie is left when the search field reaches "`Road `" (&quot;Road&quot; followed by a space).

Movie list filtered to 'The Road Warrior' movie when the search box reaches 'Road ' ('Road' followed by a space).



Filtering database records is performed on the server, and the server interactively sends back the HTML to display over the same SignalR connection. The page doesn't reload. The user feels like their interactions with the page are running code on the client. Actually, the code is running the server.

Instead of an HTML form, submitting a GET request in this scenario could've also used JavaScript to submit the request to the server, either using the [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API)` or [XMLHttpRequest API](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest). In most cases, JavaScript can be replaced by using Blazor and C# in an interactive component.

## Style the `QuickGrid` component

You can apply styles to the rendered `QuickGrid` component with a stylesheet isolated to the `Index` component using *CSS isolation*.

CSS isolation is applied by adding a stylesheet file using the file name format `{COMPONENT NAME}.razor.css`, where the `{COMPONENT NAME}` placeholder is the component name.

To apply styles to a child component, such as the `QuickGrid` component of the `Index` component, use the `::deep` pseudo-element. 

In the `MoviePages` folder, add the following stylesheet for the `Index` component. Use `::deep` pseudo-elements to make the row height `3em` and vertically center the table cell content.

`Components/Pages/MoviePages/Index.razor.css`:

```css
::deep tr {
    height: 3em;
}

    ::deep tr > td {
        vertical-align: middle;
    }
```

The `::deep` pseudo-element only works with descendant elements, so the `QuickGrid` component must be wrapped with a `<div>` or some other block-level element in order to apply the styles to it.

In `Components/Pages/MoviePages/Index.razor`, place `<div>` tags around the `QuickGrid` component:

```diff
+ <div>
    <QuickGrid ...>
        ...
    </QuickGrid>
+ </div>
```

Blazor rewrites CSS selectors to match the markup rendered by the component. The rewritten CSS styles are bundled and produced as a static asset, so you don't need to take further action to apply the styles to the rendered `QuickGrid` component.

Movie list showing row heights at 3em with vertically-centered content

## Clean up

**Applies to: vs**


When you're finished with the tutorial and delete the sample app from your local system, you can also delete the `BlazorWebAppMovies` database in Visual Studio's SQL Server Object Explorer (SSOX):

1. Access SSOX by selecting **View** > **SQL Server Object Explorer** from the menu bar.
1. Display the database list by selecting the triangles next to `SQL Server` > `(localdb)\MSSQLLocalDB` > `Databases`.
1. Right-click the `BlazorWebAppMovies` database in the list and select **Delete**.
1. Select the checkbox to close existing connections before selecting **OK**.

When deleting the database in SSOX, the database's physical files are removed from your Windows user folder.



**Applies to: vsc**


When you're finished with the tutorial and delete the sample app from your local system, you can also manually delete the `BlazorWebAppMovies` database. The database's location varies depending on the platform and operating system, but you can search for it by the file name indicated in the database connection string of app settings file (`appsettings.json`).



**Applies to: cli**


When you're finished with the tutorial and delete the sample app from your local system, you can also manually delete the `BlazorWebAppMovies` database. The database's location varies depending on the platform and operating system, but you can search for it by the file name indicated in the database connection string of the app settings file (`appsettings.json`).



## Congratulations!

Congratulations on completing the tutorial series! We hope you enjoyed this tutorial on Blazor. Blazor offers many more features than we were able to cover in this series, and we invite you to explore the Blazor documentation, examples, and sample apps to learn more. *Happy coding with Blazor!*

## Next steps

If you're new to Blazor, we recommend reading the following Blazor articles that cover important general information for Blazor development:

* [blazor/index](../../index.md)
* [blazor/supported-platforms](../../supported-platforms.md)
* [blazor/tooling](../../tooling.md)
* [blazor/hosting-models](../../hosting-models.md)
* [blazor/project-structure](../../project-structure.md)
* [blazor/fundamentals/index](../../fundamentals/index.md) and the other *Fundamentals* node articles.
* [blazor/components/index](../../components/index.md) and the other *Components* node articles.
* [blazor/forms/index](../../forms/index.md)
* [blazor/js-interop/index](../../javascript-interoperability/index.md) and the other *JavaScript interop* articles.
* [blazor/security/index](../../security/index.md)
* [blazor/host-and-deploy/index](../../host-and-deploy/index.md)
* [blazor/blazor-ef-core](../../blazor-ef-core.md) covers concurrency with EF Core in Blazor apps.

For guidance on adding a thumbnail file upload feature to this tutorial's sample app, see [blazor/file-uploads#save-small-files-directly-to-a-database-with-ef-core](https://learn.microsoft.com/search/?terms=blazor%2Ffile-uploads%23save-small-files-directly-to-a-database-with-ef-core).

In the documentation website's sidebar navigation, articles are organized by subject matter and laid out in roughly in a general-to-specific or basic-to-complex order. The best approach when starting to learn about Blazor is to read down the table of contents from top to bottom.

## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

[Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.


> 
> [Previous: Add a new field](part-7.md)
