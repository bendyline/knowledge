---
title: Part 6, add search
author: wadepickett
description: Part 6 of tutorial series on Razor Pages.
ms.author: wpickett
ms.date: 01/08/2026
uid: tutorials/razor-pages/search
---
# Part 6, add search to ASP.NET Core Razor Pages

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


By [Rick Anderson](https://twitter.com/RickAndMSFT)

**Applies to: \>= aspnetcore-10.0**

In the following sections, you add the ability to search movies by *genre* or *name*.

Add the following highlighted code to `Pages/Movies/Index.cshtml.cs`:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index.cshtml.cs?name=snippet_search_newProps\&highlight=12-18)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index.cshtml.cs.md)

In the previous code:

* `SearchString`: Contains the text users enter in the search text box. `SearchString` has the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute. `[BindProperty]` binds form values and query strings with the same name as the property. `[BindProperty(SupportsGet = true)]` is required for binding on HTTP GET requests.
* `Genres`: Contains the list of genres. `Genres` allows the user to select a genre from the list. `SelectList` requires `using Microsoft.AspNetCore.Mvc.Rendering;`
* `MovieGenre`: Contains the specific genre the user selects. For example, "Western".
* `Genres` and `MovieGenre` are used later in this tutorial.

> **Warning:**
> For security reasons, you must opt in to binding `GET` request data to page model properties. Verify user input before mapping it to properties. Opting into `GET` binding is useful when addressing scenarios that rely on query string or route values.
>
> To bind a property on `GET` requests, set the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute's `SupportsGet` property to `true`:
>
> ```csharp
> [BindProperty(SupportsGet = true)]
> ```
>
> For more information, see [ASP.NET Core Community Standup: Bind on GET discussion (YouTube)](https://www.youtube.com/watch?v=p7iHB9V-KVU&feature=youtu.be&t=54m27s).


Update the `Movies/Index` page's `OnGetAsync` method with the following code:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index.cshtml.cs?name=snippet_search_1stSearch)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index.cshtml.cs.md)

The first line of the `OnGetAsync` method creates a [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) query to select the movies:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index.cshtml.cs?name=snippet_search_linq)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index.cshtml.cs.md)

The query is only ***defined*** at this point. It isn't run against the database.

If the `SearchString` property isn't `null` or empty, the movies query is modified to filter on the search string:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index.cshtml.cs?name=snippet_search_SearchNull)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index.cshtml.cs.md)

The `s => s.Title.Contains()` code is a [Lambda Expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). Lambdas are used in method-based [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) queries as arguments to standard query operator methods such as the [Where](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/query-syntax-and-method-syntax-in-linq) method or `Contains`. LINQ queries aren't executed when you define them or when you modify them by calling a method, such as `Where`, `Contains`, or `OrderBy`. Rather, query execution is deferred. The evaluation of an expression is delayed until its realized value is iterated over or the `ToListAsync` method is called. For more information, see [Query Execution](https://learn.microsoft.com/dotnet/csharp/linq/get-started/introduction-to-linq-queries#deferred).

> **Note:**
> The [System.Data.Objects.DataClasses.EntityCollection%601.Contains%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EntityCollection%25601.Contains%252A) method runs on the database, not in the C# code. The case sensitivity on the query depends on the database and the collation. On SQL Server, `Contains` maps to [SQL LIKE](https://learn.microsoft.com/sql/t-sql/language-elements/like-transact-sql), which is case insensitive. SQLite with the default collation is a mixture of case sensitive and case ***IN***sensitive, depending on the query. For information on making case insensitive SQLite queries, see the following:
> 
> * [How to use case-insensitive query with Sqlite provider? (`dotnet/efcore` #11414)](https://github.com/dotnet/efcore/issues/11414)
> * [How to make a SQLite column case insensitive (`dotnet/AspNetCore.Docs` #22314)](https://github.com/dotnet/AspNetCore.Docs/issues/22314)
> * [Collations and Case Sensitivity](https://learn.microsoft.com/ef/core/miscellaneous/collations-and-case-sensitivity)

Navigate to the Movies page and append a query string such as `?searchString=Ghost` to the URL. For example, `https://localhost:7247/Movies?searchString=Ghost`. The filtered movies are displayed.

Index view with the search string ghost in the URL and a returned movie list.

If you add the following route template to the Index page, you can pass the search string as a URL segment. For example, `https://localhost:7247/Movies/Ghost`.

```cshtml
@page "{searchString?}"
```

The preceding route constraint allows searching the title as route data (a URL segment) instead of as a query string value.  The `?` in `"{searchString?}"` means this is an optional route parameter.

Index view with the word ghost added to the Url and a returned movie list of two movies, Ghostbusters and Ghostbusters 2.

The ASP.NET Core runtime uses [model binding](../../mvc/models/model-binding.md) to set the value of the `SearchString` property from the query string (`?searchString=Ghost`) or route data (`https://localhost:7247/Movies/Ghost`). Model binding isn't case sensitive.

However, users can't be expected to modify the URL to search for a movie. In this step, you add UI to filter movies. If you added the route constraint `"{searchString?}"`, remove it.

Open the `Pages/Movies/Index.cshtml` file, and add the markup highlighted in the following code:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedTitle.cshtml?highlight=14-19\&range=1-22)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedTitle.cshtml.md)

The HTML `<form>` tag uses the following [Tag Helpers](../../mvc/views/tag-helpers/intro.md):

* [Form Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper). When you submit the form, it sends the filter string to the *Pages/Movies/Index* page through the query string.
* [Input Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-input-tag-helper)

Save your changes and test the filter.

Index view with the word ghost typed into the Title filter textbox.

## Search by genre

Update the `Movies/Index.cshtml.cs` page `OnGetAsync` method with the following code:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedGenre.cshtml.cs?range=30-55)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedGenre.cshtml.cs.md)

The following code is a LINQ query that retrieves all the genres from the database.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedGenre.cshtml.cs?name=snippet_search_linqQuery)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedGenre.cshtml.cs.md)

The `SelectList` of genres is created by projecting the distinct genres:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedGenre.cshtml.cs?name=snippet_search_selectList)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedGenre.cshtml.cs.md)

### Add search by genre to the Razor Page

Update the `Index.cshtml` [`<form>` element](https://developer.mozilla.org/docs/Web/HTML/Element/form) as highlighted in the following markup:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedGenre.cshtml?highlight=16-18\&range=1-22)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Index_SearchAddedGenre.cshtml.md)

Test the app by searching by genre, by movie title, and by both:

Index view complete with Genre selector and Title textbox search filters.

## Next steps


> 
> [Previous: Update the pages](da1.md)
> [Next: Add a new field](new-field.md)



**Applies to: \= aspnetcore-9.0**

In the following sections, searching movies by *genre* or *name* is added.

Add the following highlighted code to `Pages/Movies/Index.cshtml.cs`:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs?name=snippet_search_newProps\\&highlight=12-18](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

In the previous code:

* `SearchString`: Contains the text users enter in the search text box. `SearchString` has the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute. `[BindProperty]` binds form values and query strings with the same name as the property. `[BindProperty(SupportsGet = true)]` is required for binding on HTTP GET requests.
* `Genres`: Contains the list of genres. `Genres` allows the user to select a genre from the list. `SelectList` requires `using Microsoft.AspNetCore.Mvc.Rendering;`
* `MovieGenre`: Contains the specific genre the user selects. For example, "Western".
* `Genres` and `MovieGenre` are used later in this tutorial.

> **Warning:**
> For security reasons, you must opt in to binding `GET` request data to page model properties. Verify user input before mapping it to properties. Opting into `GET` binding is useful when addressing scenarios that rely on query string or route values.
>
> To bind a property on `GET` requests, set the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute's `SupportsGet` property to `true`:
>
> ```csharp
> [BindProperty(SupportsGet = true)]
> ```
>
> For more information, see [ASP.NET Core Community Standup: Bind on GET discussion (YouTube)](https://www.youtube.com/watch?v=p7iHB9V-KVU&feature=youtu.be&t=54m27s).


Update the `Movies/Index` page's `OnGetAsync` method with the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs?name=snippet_search_1stSearch](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The first line of the `OnGetAsync` method creates a [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) query to select the movies:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs?name=snippet_search_linq](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The query is only ***defined*** at this point, it has ***not*** been run against the database.

If the `SearchString` property is not `null` or empty, the movies query is modified to filter on the search string:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs?name=snippet_search_SearchNull](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The `s => s.Title.Contains()` code is a [Lambda Expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). Lambdas are used in method-based [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) queries as arguments to standard query operator methods such as the [Where](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/query-syntax-and-method-syntax-in-linq) method or `Contains`. LINQ queries are not executed when they're defined or when they're modified by calling a method, such as `Where`, `Contains`, or `OrderBy`. Rather, query execution is deferred. The evaluation of an expression is delayed until its realized value is iterated over or the `ToListAsync` method is called. See [Query Execution](https://learn.microsoft.com/dotnet/csharp/linq/get-started/introduction-to-linq-queries#deferred) for more information.

> **Note:**
> The [System.Data.Objects.DataClasses.EntityCollection%601.Contains%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EntityCollection%25601.Contains%252A) method is run on the database, not in the C# code. The case sensitivity on the query depends on the database and the collation. On SQL Server, `Contains` maps to [SQL LIKE](https://learn.microsoft.com/sql/t-sql/language-elements/like-transact-sql), which is case insensitive. SQLite with the default collation is a mixture of case sensitive and case ***IN***sensitive, depending on the query. For information on making case insensitive SQLite queries, see the following:
> 
> * [How to use case-insensitive query with Sqlite provider? (`dotnet/efcore` #11414)](https://github.com/dotnet/efcore/issues/11414)
> * [How to make a SQLite column case insensitive (`dotnet/AspNetCore.Docs` #22314)](https://github.com/dotnet/AspNetCore.Docs/issues/22314)
> * [Collations and Case Sensitivity](https://learn.microsoft.com/ef/core/miscellaneous/collations-and-case-sensitivity)

Navigate to the Movies page and append a query string such as `?searchString=Ghost` to the URL. For example, `https://localhost:5001/Movies?searchString=Ghost`. The filtered movies are displayed.

Index view

If the following route template is added to the Index page, the search string can be passed as a URL segment. For example, `https://localhost:5001/Movies/Ghost`.

```cshtml
@page "{searchString?}"
```

The preceding route constraint allows searching the title as route data (a URL segment) instead of as a query string value.  The `?` in `"{searchString?}"` means this is an optional route parameter.

Index view with the word ghost added to the Url and a returned movie list of two movies, Ghostbusters and Ghostbusters 2

The ASP.NET Core runtime uses [model binding](../../mvc/models/model-binding.md) to set the value of the `SearchString` property from the query string (`?searchString=Ghost`) or route data (`https://localhost:5001/Movies/Ghost`). Model binding is ***not*** case sensitive.

However, users cannot be expected to modify the URL to search for a movie. In this step, UI is added to filter movies. If you added the route constraint `"{searchString?}"`, remove it.

Open the `Pages/Movies/Index.cshtml` file, and add the markup highlighted in the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedTitle.cshtml?highlight=14-19\\&range=1-22](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The HTML `<form>` tag uses the following [Tag Helpers](../../mvc/views/tag-helpers/intro.md):

* [Form Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper). When the form is submitted, the filter string is sent to the *Pages/Movies/Index* page via query string.
* [Input Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-input-tag-helper)

Save the changes and test the filter.

Index view with the word ghost typed into the Title filter textbox

## Search by genre

Update the `Movies/Index.cshtml.cs` page `OnGetAsync` method with the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.cs?range=30-55](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The following code is a LINQ query that retrieves all the genres from the database.

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.cs?name=snippet_search_linqQuery](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The `SelectList` of genres is created by projecting the distinct genres:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.cs?name=snippet_search_selectList](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

### Add search by genre to the Razor Page

Update the `Index.cshtml` [`<form>` element](https://developer.mozilla.org/docs/Web/HTML/Element/form) as highlighted in the following markup:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml?highlight=16-18\\&range=1-22](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

Test the app by searching by genre, by movie title, and by both:

Index view complete with Genre selector and Title textbox search filters

## Next steps


> 
> [Previous: Update the pages](da1.md)
> [Next: Add a new field](new-field.md)





**Applies to: \= aspnetcore-8.0**

In the following sections, searching movies by *genre* or *name* is added.

Add the following highlighted code to `Pages/Movies/Index.cshtml.cs`:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Pages/Movies/Index.cshtml.cs?name=snippet_newProps\\&highlight=12-18](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

In the previous code:

* `SearchString`: Contains the text users enter in the search text box. `SearchString` has the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute. `[BindProperty]` binds form values and query strings with the same name as the property. `[BindProperty(SupportsGet = true)]` is required for binding on HTTP GET requests.
* `Genres`: Contains the list of genres. `Genres` allows the user to select a genre from the list. `SelectList` requires `using Microsoft.AspNetCore.Mvc.Rendering;`
* `MovieGenre`: Contains the specific genre the user selects. For example, "Western".
* `Genres` and `MovieGenre` are used later in this tutorial.

> **Warning:**
> For security reasons, you must opt in to binding `GET` request data to page model properties. Verify user input before mapping it to properties. Opting into `GET` binding is useful when addressing scenarios that rely on query string or route values.
>
> To bind a property on `GET` requests, set the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute's `SupportsGet` property to `true`:
>
> ```csharp
> [BindProperty(SupportsGet = true)]
> ```
>
> For more information, see [ASP.NET Core Community Standup: Bind on GET discussion (YouTube)](https://www.youtube.com/watch?v=p7iHB9V-KVU&feature=youtu.be&t=54m27s).


Update the Index page's `OnGetAsync` method with the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet_1stSearch](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The first line of the `OnGetAsync` method creates a [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) query to select the movies:

```csharp
// using System.Linq;
var movies = from m in _context.Movie
             select m;
```

The query is only ***defined*** at this point, it has ***not*** been run against the database.

If the `SearchString` property is not `null` or empty, the movies query is modified to filter on the search string:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Pages/Movies/Index.cshtml.cs?name=snippet_SearchNull](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The `s => s.Title.Contains()` code is a [Lambda Expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). Lambdas are used in method-based [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) queries as arguments to standard query operator methods such as the [Where](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/query-syntax-and-method-syntax-in-linq) method or `Contains`. LINQ queries are not executed when they're defined or when they're modified by calling a method, such as `Where`, `Contains`, or `OrderBy`. Rather, query execution is deferred. The evaluation of an expression is delayed until its realized value is iterated over or the `ToListAsync` method is called. See [Query Execution](https://learn.microsoft.com/dotnet/csharp/linq/get-started/introduction-to-linq-queries#deferred) for more information.

> **Note:**
> The [System.Data.Objects.DataClasses.EntityCollection%601.Contains%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EntityCollection%25601.Contains%252A) method is run on the database, not in the C# code. The case sensitivity on the query depends on the database and the collation. On SQL Server, `Contains` maps to [SQL LIKE](https://learn.microsoft.com/sql/t-sql/language-elements/like-transact-sql), which is case insensitive. SQLite with the default collation is a mixture of case sensitive and case ***IN***sensitive, depending on the query. For information on making case insensitive SQLite queries, see the following:
> 
> * [How to use case-insensitive query with Sqlite provider? (`dotnet/efcore` #11414)](https://github.com/dotnet/efcore/issues/11414)
> * [How to make a SQLite column case insensitive (`dotnet/AspNetCore.Docs` #22314)](https://github.com/dotnet/AspNetCore.Docs/issues/22314)
> * [Collations and Case Sensitivity](https://learn.microsoft.com/ef/core/miscellaneous/collations-and-case-sensitivity)

Navigate to the Movies page and append a query string such as `?searchString=Ghost` to the URL. For example, `https://localhost:5001/Movies?searchString=Ghost`. The filtered movies are displayed.

Index view

If the following route template is added to the Index page, the search string can be passed as a URL segment. For example, `https://localhost:5001/Movies/Ghost`.

```cshtml
@page "{searchString?}"
```

The preceding route constraint allows searching the title as route data (a URL segment) instead of as a query string value.  The `?` in `"{searchString?}"` means this is an optional route parameter.

Index view with the word ghost added to the Url and a returned movie list of two movies, Ghostbusters and Ghostbusters 2

The ASP.NET Core runtime uses [model binding](../../mvc/models/model-binding.md) to set the value of the `SearchString` property from the query string (`?searchString=Ghost`) or route data (`https://localhost:5001/Movies/Ghost`). Model binding is ***not*** case sensitive.

However, users cannot be expected to modify the URL to search for a movie. In this step, UI is added to filter movies. If you added the route constraint `"{searchString?}"`, remove it.

Open the `Pages/Movies/Index.cshtml` file, and add the markup highlighted in the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample6/Pages/Movies/Index2.cshtml?highlight=14-19\\&range=1-22](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The HTML `<form>` tag uses the following [Tag Helpers](../../mvc/views/tag-helpers/intro.md):

* [Form Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper). When the form is submitted, the filter string is sent to the *Pages/Movies/Index* page via query string.
* [Input Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-input-tag-helper)

Save the changes and test the filter.

Index view with the word ghost typed into the Title filter textbox

## Search by genre

Update the `Movies/Index.cshtml.cs` page `OnGetAsync` method with the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Pages/Movies/Index.cshtml.cs?name=snippet_SearchGenre](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The following code is a LINQ query that retrieves all the genres from the database.

```csharp
// Use LINQ to get list of genres.
IQueryable<string> genreQuery = from m in _context.Movie
                                orderby m.Genre
                                select m.Genre;
```

The `SelectList` of genres is created by projecting the distinct genres.

```csharp
Genres = new SelectList(await genreQuery.Distinct().ToListAsync());
```

### Add search by genre to the Razor Page

Update the `Index.cshtml` [`<form>` element](https://developer.mozilla.org/docs/Web/HTML/Element/form) as highlighted in the following markup:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample6/Pages/Movies/IndexFormGenreNoRating.cshtml?highlight=16-18\\&range=1-22](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

Test the app by searching by genre, by movie title, and by both.

## Next steps

> 
> [Previous: Update the pages](da1.md)
> [Next: Add a new field](new-field.md)





**Applies to: \= aspnetcore-7.0**

In the following sections, searching movies by *genre* or *name* is added.

Add the following highlighted code to `Pages/Movies/Index.cshtml.cs`:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Pages/Movies/Index.cshtml.cs?name=snippet_newProps\\&highlight=12-18](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

In the previous code:

* `SearchString`: Contains the text users enter in the search text box. `SearchString` has the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute. `[BindProperty]` binds form values and query strings with the same name as the property. `[BindProperty(SupportsGet = true)]` is required for binding on HTTP GET requests.
* `Genres`: Contains the list of genres. `Genres` allows the user to select a genre from the list. `SelectList` requires `using Microsoft.AspNetCore.Mvc.Rendering;`
* `MovieGenre`: Contains the specific genre the user selects. For example, "Western".
* `Genres` and `MovieGenre` are used later in this tutorial.

> **Warning:**
> For security reasons, you must opt in to binding `GET` request data to page model properties. Verify user input before mapping it to properties. Opting into `GET` binding is useful when addressing scenarios that rely on query string or route values.
>
> To bind a property on `GET` requests, set the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute's `SupportsGet` property to `true`:
>
> ```csharp
> [BindProperty(SupportsGet = true)]
> ```
>
> For more information, see [ASP.NET Core Community Standup: Bind on GET discussion (YouTube)](https://www.youtube.com/watch?v=p7iHB9V-KVU&feature=youtu.be&t=54m27s).


Update the Index page's `OnGetAsync` method with the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet_1stSearch](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The first line of the `OnGetAsync` method creates a [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) query to select the movies:

```csharp
// using System.Linq;
var movies = from m in _context.Movie
             select m;
```

The query is only ***defined*** at this point, it has ***not*** been run against the database.

If the `SearchString` property is not `null` or empty, the movies query is modified to filter on the search string:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Pages/Movies/Index.cshtml.cs?name=snippet_SearchNull](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The `s => s.Title.Contains()` code is a [Lambda Expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). Lambdas are used in method-based [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) queries as arguments to standard query operator methods such as the [Where](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/query-syntax-and-method-syntax-in-linq) method or `Contains`. LINQ queries are not executed when they're defined or when they're modified by calling a method, such as `Where`, `Contains`, or `OrderBy`. Rather, query execution is deferred. The evaluation of an expression is delayed until its realized value is iterated over or the `ToListAsync` method is called. See [Query Execution](https://learn.microsoft.com/dotnet/csharp/linq/get-started/introduction-to-linq-queries#deferred) for more information.

> **Note:**
> The [System.Data.Objects.DataClasses.EntityCollection%601.Contains%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EntityCollection%25601.Contains%252A) method is run on the database, not in the C# code. The case sensitivity on the query depends on the database and the collation. On SQL Server, `Contains` maps to [SQL LIKE](https://learn.microsoft.com/sql/t-sql/language-elements/like-transact-sql), which is case insensitive. SQLite with the default collation is a mixture of case sensitive and case ***IN***sensitive, depending on the query. For information on making case insensitive SQLite queries, see the following:

* [This GitHub issue](https://github.com/dotnet/efcore/issues/11414)
* [This GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/22314)
* [Collations and Case Sensitivity](https://learn.microsoft.com/ef/core/miscellaneous/collations-and-case-sensitivity)

Navigate to the Movies page and append a query string such as `?searchString=Ghost` to the URL. For example, `https://localhost:5001/Movies?searchString=Ghost`. The filtered movies are displayed.

Index view

If the following route template is added to the Index page, the search string can be passed as a URL segment. For example, `https://localhost:5001/Movies/Ghost`.

```cshtml
@page "{searchString?}"
```

The preceding route constraint allows searching the title as route data (a URL segment) instead of as a query string value.  The `?` in `"{searchString?}"` means this is an optional route parameter.

Index view with the word ghost added to the Url and a returned movie list of two movies, Ghostbusters and Ghostbusters 2

The ASP.NET Core runtime uses [model binding](../../mvc/models/model-binding.md) to set the value of the `SearchString` property from the query string (`?searchString=Ghost`) or route data (`https://localhost:5001/Movies/Ghost`). Model binding is ***not*** case sensitive.

However, users cannot be expected to modify the URL to search for a movie. In this step, UI is added to filter movies. If you added the route constraint `"{searchString?}"`, remove it.

Open the `Pages/Movies/Index.cshtml` file, and add the markup highlighted in the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample6/Pages/Movies/Index2.cshtml?highlight=14-19\\&range=1-22](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The HTML `<form>` tag uses the following [Tag Helpers](../../mvc/views/tag-helpers/intro.md):

* [Form Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper). When the form is submitted, the filter string is sent to the *Pages/Movies/Index* page via query string.
* [Input Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-input-tag-helper)

Save the changes and test the filter.

Index view with the word ghost typed into the Title filter textbox

## Search by genre

Update the Index page's `OnGetAsync` method with the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Pages/Movies/Index.cshtml.cs?name=snippet_SearchGenre](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The following code is a LINQ query that retrieves all the genres from the database.

```csharp
// Use LINQ to get list of genres.
IQueryable<string> genreQuery = from m in _context.Movie
                                orderby m.Genre
                                select m.Genre;
```

The `SelectList` of genres is created by projecting the distinct genres.

```csharp
Genres = new SelectList(await genreQuery.Distinct().ToListAsync());
```

### Add search by genre to the Razor Page

Update the `Index.cshtml` [`<form>` element](https://developer.mozilla.org/docs/Web/HTML/Element/form) as highlighted in the following markup:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample6/Pages/Movies/IndexFormGenreNoRating.cshtml?highlight=16-18\\&range=1-22](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

Test the app by searching by genre, by movie title, and by both.

## Next steps

> 
> [Previous: Update the pages](da1.md)
> [Next: Add a new field](new-field.md)




**Applies to: \= aspnetcore-6.0**

In the following sections, searching movies by *genre* or *name* is added.

Add the following highlighted code to `Pages/Movies/Index.cshtml.cs`:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Pages/Movies/Index.cshtml.cs?name=snippet_newProps\\&highlight=3,22-27](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

In the previous code:

* `SearchString`: Contains the text users enter in the search text box. `SearchString` has the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute. `[BindProperty]` binds form values and query strings with the same name as the property. `[BindProperty(SupportsGet = true)]` is required for binding on HTTP GET requests.
* `Genres`: Contains the list of genres. `Genres` allows the user to select a genre from the list. `SelectList` requires `using Microsoft.AspNetCore.Mvc.Rendering;`
* `MovieGenre`: Contains the specific genre the user selects. For example, "Western".
* `Genres` and `MovieGenre` are used later in this tutorial.

> **Warning:**
> For security reasons, you must opt in to binding `GET` request data to page model properties. Verify user input before mapping it to properties. Opting into `GET` binding is useful when addressing scenarios that rely on query string or route values.
>
> To bind a property on `GET` requests, set the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute's `SupportsGet` property to `true`:
>
> ```csharp
> [BindProperty(SupportsGet = true)]
> ```
>
> For more information, see [ASP.NET Core Community Standup: Bind on GET discussion (YouTube)](https://www.youtube.com/watch?v=p7iHB9V-KVU&feature=youtu.be&t=54m27s).


Update the Index page's `OnGetAsync` method with the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet_1stSearch](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The first line of the `OnGetAsync` method creates a [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) query to select the movies:

```csharp
// using System.Linq;
var movies = from m in _context.Movie
             select m;
```

The query is only ***defined*** at this point, it has ***not*** been run against the database.

If the `SearchString` property is not null or empty, the movies query is modified to filter on the search string:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Pages/Movies/Index.cshtml.cs?name=snippet_SearchNull](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The `s => s.Title.Contains()` code is a [Lambda Expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). Lambdas are used in method-based [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) queries as arguments to standard query operator methods such as the [Where](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/query-syntax-and-method-syntax-in-linq) method or `Contains`. LINQ queries are not executed when they're defined or when they're modified by calling a method, such as `Where`, `Contains`, or `OrderBy`. Rather, query execution is deferred. The evaluation of an expression is delayed until its realized value is iterated over or the `ToListAsync` method is called. See [Query Execution](https://learn.microsoft.com/dotnet/csharp/linq/get-started/introduction-to-linq-queries#deferred) for more information.

> **Note:**
> The [System.Data.Objects.DataClasses.EntityCollection%601.Contains%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EntityCollection%25601.Contains%252A) method is run on the database, not in the C# code. The case sensitivity on the query depends on the database and the collation. On SQL Server, `Contains` maps to [SQL LIKE](https://learn.microsoft.com/sql/t-sql/language-elements/like-transact-sql), which is case insensitive. SQLite with the default collation is a mixture of case sensitive and case ***IN***sensitive, depending on the query. For information on making case insensitive SQLite queries, see the following:

* [This GitHub issue](https://github.com/dotnet/efcore/issues/11414)
* [This GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/22314)
* [Collations and Case Sensitivity](https://learn.microsoft.com/ef/core/miscellaneous/collations-and-case-sensitivity)

Navigate to the Movies page and append a query string such as `?searchString=Ghost` to the URL. For example, `https://localhost:5001/Movies?searchString=Ghost`. The filtered movies are displayed.

Index view

If the following route template is added to the Index page, the search string can be passed as a URL segment. For example, `https://localhost:5001/Movies/Ghost`.

```cshtml
@page "{searchString?}"
```

The preceding route constraint allows searching the title as route data (a URL segment) instead of as a query string value.  The `?` in `"{searchString?}"` means this is an optional route parameter.

Index view with the word ghost added to the Url and a returned movie list of two movies, Ghostbusters and Ghostbusters 2

The ASP.NET Core runtime uses [model binding](../../mvc/models/model-binding.md) to set the value of the `SearchString` property from the query string (`?searchString=Ghost`) or route data (`https://localhost:5001/Movies/Ghost`). Model binding is ***not*** case sensitive.

However, users cannot be expected to modify the URL to search for a movie. In this step, UI is added to filter movies. If you added the route constraint `"{searchString?}"`, remove it.

Open the `Pages/Movies/Index.cshtml` file, and add the markup highlighted in the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample6/Pages/Movies/Index2.cshtml?highlight=14-19\\&range=1-22](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The HTML `<form>` tag uses the following [Tag Helpers](../../mvc/views/tag-helpers/intro.md):

* [Form Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper). When the form is submitted, the filter string is sent to the *Pages/Movies/Index* page via query string.
* [Input Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-input-tag-helper)

Save the changes and test the filter.

Index view with the word ghost typed into the Title filter textbox

## Search by genre

Update the Index page's `OnGetAsync` method with the following code:

   [Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Pages/Movies/Index.cshtml.cs?name=snippet_SearchGenre](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The following code is a LINQ query that retrieves all the genres from the database.

```csharp
// Use LINQ to get list of genres.
IQueryable<string> genreQuery = from m in _context.Movie
                                orderby m.Genre
                                select m.Genre;
```

The `SelectList` of genres is created by projecting the distinct genres.

```csharp
Genres = new SelectList(await genreQuery.Distinct().ToListAsync());
```

### Add search by genre to the Razor Page

Update the `Index.cshtml` [`<form>` element](https://developer.mozilla.org/docs/Web/HTML/Element/form) as highlighted in the following markup:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample6/Pages/Movies/IndexFormGenreNoRating.cshtml?highlight=16-18\\&range=1-22](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

Test the app by searching by genre, by movie title, and by both.

## Next steps

> 
> [Previous: Update the pages](da1.md)
> [Next: Add a new field](new-field.md)




**Applies to: < aspnetcore-6.0**

In the following sections, searching movies by *genre* or *name* is added.

Add the following highlighted using statement and properties to `Pages/Movies/Index.cshtml.cs`:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet_newProps\\&highlight=3,23,24,25,26,27](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

In the previous code:

* `SearchString`: Contains the text users enter in the search text box. `SearchString` has the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute. `[BindProperty]` binds form values and query strings with the same name as the property. `[BindProperty(SupportsGet = true)]` is required for binding on HTTP GET requests.
* `Genres`: Contains the list of genres. `Genres` allows the user to select a genre from the list. `SelectList` requires `using Microsoft.AspNetCore.Mvc.Rendering;`
* `MovieGenre`: Contains the specific genre the user selects. For example, "Western".
* `Genres` and `MovieGenre` are used later in this tutorial.

> **Warning:**
> For security reasons, you must opt in to binding `GET` request data to page model properties. Verify user input before mapping it to properties. Opting into `GET` binding is useful when addressing scenarios that rely on query string or route values.
>
> To bind a property on `GET` requests, set the [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute's `SupportsGet` property to `true`:
>
> ```csharp
> [BindProperty(SupportsGet = true)]
> ```
>
> For more information, see [ASP.NET Core Community Standup: Bind on GET discussion (YouTube)](https://www.youtube.com/watch?v=p7iHB9V-KVU&feature=youtu.be&t=54m27s).


Update the Index page's `OnGetAsync` method with the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet_1stSearch](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The first line of the `OnGetAsync` method creates a [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) query to select the movies:

```csharp
// using System.Linq;
var movies = from m in _context.Movie
             select m;
```

The query is only ***defined*** at this point, it has ***not*** been run against the database.

If the `SearchString` property is not null or empty, the movies query is modified to filter on the search string:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet_SearchNull](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The `s => s.Title.Contains()` code is a [Lambda Expression](https://learn.microsoft.com/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions). Lambdas are used in method-based [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) queries as arguments to standard query operator methods such as the [Where](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/query-syntax-and-method-syntax-in-linq) method or `Contains`. LINQ queries are not executed when they're defined or when they're modified by calling a method, such as `Where`, `Contains`, or `OrderBy`. Rather, query execution is deferred. The evaluation of an expression is delayed until its realized value is iterated over or the `ToListAsync` method is called. See [Query Execution](https://learn.microsoft.com/dotnet/csharp/linq/get-started/introduction-to-linq-queries#deferred) for more information.

> **Note:**
> The [System.Data.Objects.DataClasses.EntityCollection%601.Contains%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EntityCollection%25601.Contains%252A) method is run on the database, not in the C# code. The case sensitivity on the query depends on the database and the collation. On SQL Server, `Contains` maps to [SQL LIKE](https://learn.microsoft.com/sql/t-sql/language-elements/like-transact-sql), which is case insensitive. SQLite with the default collation is a mixture of case sensitive and case ***IN***sensitive, depending on the query. For information on making case insensitive SQLite queries, see the following:
* [This GitHub issue](https://github.com/dotnet/efcore/issues/11414).
* [This GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/22314)
* [Collations and Case Sensitivity](https://learn.microsoft.com/ef/core/miscellaneous/collations-and-case-sensitivity)

Navigate to the Movies page and append a query string such as `?searchString=Ghost` to the URL. For example, `https://localhost:5001/Movies?searchString=Ghost`. The filtered movies are displayed.

Index view

If the following route template is added to the Index page, the search string can be passed as a URL segment. For example, `https://localhost:5001/Movies/Ghost`.

```cshtml
@page "{searchString?}"
```

The preceding route constraint allows searching the title as route data (a URL segment) instead of as a query string value.  The `?` in `"{searchString?}"` means this is an optional route parameter.

Index view with the word ghost added to the Url and a returned movie list of two movies, Ghostbusters and Ghostbusters 2

The ASP.NET Core runtime uses [model binding](../../mvc/models/model-binding.md) to set the value of the `SearchString` property from the query string (`?searchString=Ghost`) or route data (`https://localhost:5001/Movies/Ghost`). Model binding is ***not*** case sensitive.

However, users cannot be expected to modify the URL to search for a movie. In this step, UI is added to filter movies. If you added the route constraint `"{searchString?}"`, remove it.

Open the `Pages/Movies/Index.cshtml` file, and add the markup highlighted in the following code:

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/SnapShots/Index2.cshtml?highlight=14-19\\&range=1-22](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The HTML `<form>` tag uses the following [Tag Helpers](../../mvc/views/tag-helpers/intro.md):

* [Form Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper). When the form is submitted, the filter string is sent to the *Pages/Movies/Index* page via query string.
* [Input Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-input-tag-helper)

Save the changes and test the filter.

Index view with the word ghost typed into the Title filter textbox

## Search by genre

Update the Index page's `OnGetAsync` method with the following code:

   [Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet_SearchGenre](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The following code is a LINQ query that retrieves all the genres from the database.

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet_LINQ](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

The `SelectList` of genres is created by projecting the distinct genres.

[Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet_SelectList](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

### Add search by genre to the Razor Page

1. Update the `Index.cshtml` [`<form>` element](https://developer.mozilla.org/docs/Web/HTML/Element/form) as highlighted in the following markup:

   [Code reference unavailable in this source snapshot: search/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/SnapShots/IndexFormGenreNoRating.cshtml?highlight=16-18\\&range=1-26](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/search.md)

1. Test the app by searching by genre, by movie title, and by both.

## Next steps

> 
> [Previous: Update the pages](da1.md)
> [Next: Add a new field](new-field.md)
