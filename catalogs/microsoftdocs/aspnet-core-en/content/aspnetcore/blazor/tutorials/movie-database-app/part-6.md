---
title: Build a Blazor movie database app (Part 6 - Add search)
author: guardrex
description: This part of the Blazor movie database app tutorial explains how to add a search feature to filter movies by title.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/tutorials/movie-database-app/part-6
zone_pivot_groups: tooling
---
# Build a Blazor movie database app (Part 6 - Add search)

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


This article is the sixth part of the Blazor movie database app tutorial that teaches you the basics of building an ASP.NET Core Blazor Web App with features to manage a movie database.

This part of the tutorial series covers adding a search feature to the movies `Index` component to filter movies by title.

## Implement a filter feature for the `QuickGrid` component

The [`QuickGrid` component](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid) is used by the movie `Index` component (`Components/MoviePages/Index.razor`) to display movies from the database:

```razor
<QuickGrid Class="table" Items="context.Movie">
    ...
</QuickGrid>
```

The [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Items%252A) parameter receives an `IQueryable<TGridItem>`, where `TGridItem` is the type of data represented by each row in the grid (`Movie`). [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Items%252A) is assigned a collection of movie entities (`DbSet<Movie>`) obtained from the created database context ([Microsoft.EntityFrameworkCore.IDbContextFactory%601.CreateDbContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.IDbContextFactory%25601.CreateDbContext%252A)) of the injected database context factory (`DbFactory`).

To make the `QuickGrid` component filter on the movie title, the `Index` component should:

* Set a filter string as a *component parameter* from the query string.
* If the parameter has a value, filter the movies returned from the database.
* Provide an input for the user to provide the filter string and a button to trigger a reload using the filter.

Start by adding the following code to the `@code` block of the `Index` component (`MoviePages/Index.razor`):

```csharp
[SupplyParameterFromQuery]
private string? TitleFilter { get; set; }

private IQueryable<Movie> FilteredMovies => 
    context.Movie.Where(m => m.Title!.Contains(TitleFilter ?? string.Empty));
```

`TitleFilter` is the filter string. The property is provided the [`[SupplyParameterFromQuery]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.SupplyParameterFromQueryAttribute), which lets Blazor know that the value of `TitleFilter` should be assigned from the query string when the query string contains a field of the same name (for example, `?titleFilter=road+warrior` yields a `TitleFilter` value of `road warrior`). Note that query string field names, such as `titleFilter`, aren't case sensitive.

The `FilteredMovies` property is an `IQueryable<Movie>`, which is the type for assignment to the QuickGrid's [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Items%252A) parameter. The property filters the list of movies based on the supplied `TitleFilter`. If a `TitleFilter` isn't assigned a value from the query string (`TitleFilter` is `null`), an empty string (`string.Empty`) is used for the [System.String.Contains%2A](https://learn.microsoft.com/search/?terms=System.String.Contains%252A) clause. Therefore, no movies are filtered for display.

Change the `QuickGrid` component's [Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%601.Items%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid.QuickGrid%25601.Items%252A) parameter to use the `movies` collection:

```diff
- <QuickGrid Class="table" Items="context.Movie">
+ <QuickGrid Class="table" Items="FilteredMovies">
```

The `movie => movie.Title!.Contains(...)` code is a *lambda expression*. Lambdas are used in method-based LINQ queries as arguments to standard query operator methods such as the [System.Linq.Queryable.Where%2A](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Where%252A) or [System.String.Contains%2A](https://learn.microsoft.com/search/?terms=System.String.Contains%252A) methods. LINQ queries aren't executed when they're defined or when they're modified by calling a method, such as [System.Linq.Queryable.Where%2A](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Where%252A), [System.String.Contains%2A](https://learn.microsoft.com/search/?terms=System.String.Contains%252A), or [System.Linq.Queryable.OrderBy%2A](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.OrderBy%252A). Rather, query execution is deferred. The evaluation of an expression is delayed until its realized value is iterated.

The [System.Linq.Queryable.Where%2A](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Where%252A) method is run on the database, not in the C# code. The case sensitivity of the query depends on the database and the collation. For SQL Server, [System.String.Contains%2A](https://learn.microsoft.com/search/?terms=System.String.Contains%252A) maps to [SQL `LIKE`](https://learn.microsoft.com/sql/t-sql/language-elements/like-transact-sql), which is case insensitive. SQLite with default collation provides a mixture of case-sensitive and case-insensitive filtering, depending on the query.

Run the app and navigate to the movies `Index` page at `/movies`. The movies in the database load:

Mad Max movies before filtering in the movies Index page

**Applies to: vs**


Append a query string to the URL in the address bar: `?titleFilter=road+warrior`. For example, the full URL appears as `https://localhost:7073/movies?titleFilter=road+warrior`, assuming the port number is `7073`. The filtered movie is displayed:

'The Road Warrior' Mad Max movie filtered using a query string in the browser's address bar



**Applies to: vsc**


Append a query string to the URL in the address bar: `?titleFilter=Road+Warrior`. For example, the full URL appears as `https://localhost:7073/movies?titleFilter=Road+Warrior`, assuming the port number is `7073`. The filtered movie is displayed:

'The Road Warrior' Mad Max movie filtered using a query string in the browser's address bar



**Applies to: cli**


Append a query string to the URL in the address bar: `?titleFilter=Road+Warrior`. For example, the full URL appears as `https://localhost:7073/movies?titleFilter=Road+Warrior`, assuming the port number is `7073`. The filtered movie is displayed:

'The Road Warrior' Mad Max movie filtered using a query string in the browser's address bar



Next, give users a way to provide the `titleFilter` filter string via the component's UI. Add the following HTML under the H1 heading (`<h1>Index</h1>`). The following HTML reloads the page with the contents of the textbox as a query string value:

```html
<div>
    <form action="/movies" data-enhance>
        <input type="search" name="titleFilter" />
        <input type="submit" value="Search" />
    </form>
</div>
```

The `data-enhance` attribute applies *enhanced navigation* to the component, where Blazor intercepts the GET request and performs a fetch request instead. Blazor then patches the response content into the page, which avoids a full-page reload and preserves more of the page state. The page loads faster, usually without losing the user's scroll position.

**Applies to: vs**


Save the file that you're working on. Apply the change by either restarting the app or using [Hot Reload](https://learn.microsoft.com/visualstudio/debugger/hot-reload) to apply the change to the running app.



**Applies to: vsc**


Close the browser window and in VS Code select **Run** > **Restart Debugging** or press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F5</kbd> on the keyboard. VS Code recompiles and runs the app with your saved changes and spawns a new browser window for the app.



**Applies to: cli**


Because the app is currently running with `dotnet watch`, saved changes are detected automatically and reflected in the existing browser window.



**Applies to: vs**


Type "`road warrior`" into the search box and select the **Search** button to filter the movies:

Mad Max movies before filtering in the movies Index page. The search field has the value 'road warrior'.

The result after searching on `road warrior`:

'The Road Warrior' Mad Max movie filtered using a GET request via an HTML form action

Notice that the search box loses the search value ("`road warrior`") when the movies are filtered. If you want to preserve the searched value, add the `data-permanent` attribute:



**Applies to: vsc**


Type "`Road Warrior`" into the search box and select the **Search** button to filter the movies:

Mad Max movies before filtering in the movies Index page. The search field has the value 'Road Warrior'.

The result after searching on `Road Warrior`:

'The Road Warrior' Mad Max movie filtered using a GET request via an HTML form action

Notice that the search box loses the search value ("`Road Warrior`") when the movies are filtered. If you want to preserve the searched value, add the `data-permanent` attribute:



**Applies to: cli**


Type "`Road Warrior`" into the search box and select the **Search** button to filter the movies:

Mad Max movies before filtering in the movies Index page. The search field has the value 'Road Warrior'.

The result after searching on `Road Warrior`:

'The Road Warrior' Mad Max movie filtered using a GET request via an HTML form action

Notice that the search box loses the search value ("`Road Warrior`") when the movies are filtered. If you want to preserve the searched value, add the `data-permanent` attribute:



```diff
- <form action="/movies" data-enhance>
+ <form action="/movies" data-enhance data-permanent>
```

## Stop the app

**Applies to: vs**


Stop the app by closing the browser's window.



**Applies to: vsc**


Stop the app by closing the browser's window and pressing <kbd>Shift</kbd>+<kbd>F5</kbd> on the keyboard in VS Code.



**Applies to: cli**


Stop the app by closing the browser's window and pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> in the command shell.



## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

[Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.


## Additional resources

* [LINQ documentation](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/)
* [Write C# LINQ queries to query data (C# documentation)](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/query-syntax-and-method-syntax-in-linq)
* [Lambda Expression (C# documentation](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions)

## Legal

[*Mad Max*, *The Road Warrior*, *Mad Max: Beyond Thunderdome*, *Mad Max: Fury Road*, and *Furiosa: A Mad Max Saga*](https://warnerbros.fandom.com/wiki/Mad_Max_(franchise)) are trademarks and copyrights of [Warner Bros. Entertainment](https://www.warnerbros.com/).

## Next steps

> 
> [Previous: Add validation](part-5.md)
> [Next: Add a new field](part-7.md)
