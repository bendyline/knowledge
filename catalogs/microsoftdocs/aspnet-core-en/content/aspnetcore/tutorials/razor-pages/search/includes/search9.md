**Applies to: \= aspnetcore-9.0**

In the following sections, searching movies by *genre* or *name* is added.

Add the following highlighted code to `Pages/Movies/Index.cshtml.cs`:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs?name=snippet_search_newProps\&highlight=12-18)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs.md)

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

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs?name=snippet_search_1stSearch)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs.md)

The first line of the `OnGetAsync` method creates a [LINQ](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/) query to select the movies:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs?name=snippet_search_linq)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs.md)

The query is only ***defined*** at this point, it has ***not*** been run against the database.

If the `SearchString` property is not `null` or empty, the movies query is modified to filter on the search string:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs?name=snippet_search_SearchNull)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index.cshtml.cs.md)

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

The ASP.NET Core runtime uses [model binding](../../../../mvc/models/model-binding.md) to set the value of the `SearchString` property from the query string (`?searchString=Ghost`) or route data (`https://localhost:5001/Movies/Ghost`). Model binding is ***not*** case sensitive.

However, users cannot be expected to modify the URL to search for a movie. In this step, UI is added to filter movies. If you added the route constraint `"{searchString?}"`, remove it.

Open the `Pages/Movies/Index.cshtml` file, and add the markup highlighted in the following code:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedTitle.cshtml?highlight=14-19\&range=1-22)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedTitle.cshtml.md)

The HTML `<form>` tag uses the following [Tag Helpers](../../../../mvc/views/tag-helpers/intro.md):

* [Form Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper). When the form is submitted, the filter string is sent to the *Pages/Movies/Index* page via query string.
* [Input Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-input-tag-helper)

Save the changes and test the filter.

Index view with the word ghost typed into the Title filter textbox

## Search by genre

Update the `Movies/Index.cshtml.cs` page `OnGetAsync` method with the following code:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.cs?range=30-55)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.cs.md)

The following code is a LINQ query that retrieves all the genres from the database.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.cs?name=snippet_search_linqQuery)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.cs.md)

The `SelectList` of genres is created by projecting the distinct genres:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.cs?name=snippet_search_selectList)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.cs.md)

### Add search by genre to the Razor Page

Update the `Index.cshtml` [`<form>` element](https://developer.mozilla.org/docs/Web/HTML/Element/form) as highlighted in the following markup:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml?highlight=16-18\&range=1-22)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Index_SearchAddedGenre.cshtml.md)

Test the app by searching by genre, by movie title, and by both:

Index view complete with Genre selector and Title textbox search filters

## Next steps


> 
> [Previous: Update the pages](../../da1.md)
> [Next: Add a new field](../../new-field.md)
