**Applies to: < aspnetcore-6.0**

## The Create, Delete, Details, and Edit pages

Examine the `Pages/Movies/Index.cshtml.cs` Page Model:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippetFull)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs.md)

Razor Pages are derived from `PageModel`. By convention, the `PageModel`-derived class is named `<PageName>Model`. The constructor uses [dependency injection](../../../../fundamentals/dependency-injection.md) to add the `RazorPagesMovieContext` to the page:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs?name=snippet1\&highlight=5)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml.cs.md)

See [Asynchronous code](https://learn.microsoft.com/search/?terms=data%2Fef-rp%2Fintro%23asynchronous-code) for more information on asynchronous programming with Entity Framework.

When a request is made for the page, the `OnGetAsync` method returns a list of movies to the Razor Page. On a Razor Page, `OnGetAsync` or `OnGet` is called to initialize the state of the page. In this case, `OnGetAsync` gets a list of movies and displays them.

When `OnGet` returns `void` or `OnGetAsync` returns `Task`, no return statement is used. For example the Privacy Page:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Privacy.cshtml.cs?name=snippet)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Privacy.cshtml.cs.md)

When the return type is `IActionResult` or `Task<IActionResult>`, a return statement must be provided. For example, the `Pages/Movies/Create.cshtml.cs` `OnPostAsync` method:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Create.cshtml.cs?name=snippet)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Create.cshtml.cs.md)

<a name="index"></a>
Examine the `Pages/Movies/Index.cshtml` Razor Page:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml.md)

Razor can transition from HTML into C# or into Razor-specific markup. When an `@` symbol is followed by a [Razor reserved keyword](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23razor-reserved-keywords), it transitions into Razor-specific markup, otherwise it transitions into C#.

### The @page directive

The `@page` Razor directive makes the file an MVC action, which means that it can handle requests. `@page` must be the first Razor directive on a page. `@page` and `@model` are examples of transitioning into Razor-specific markup. See [Razor syntax](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23razor-syntax) for more information.

<a name="md"></a>

### The @model directive

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml?range=1-2\&highlight=2)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml.md)

The `@model` directive specifies the type of the model passed to the Razor Page. In the preceding example, the `@model` line makes the `PageModel`-derived class available to the Razor Page. The model is used in the `@Html.DisplayNameFor` and `@Html.DisplayFor` [HTML Helpers](https://learn.microsoft.com/aspnet/mvc/overview/older-versions-1/views/creating-custom-html-helpers-cs#understanding-html-helpers) on the page.


Examine the lambda expression used in the following HTML Helper:

```cshtml
@Html.DisplayNameFor(model => model.Movie[0].Title)
```

The [Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper%601.DisplayNameFor%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper%25601.DisplayNameFor%252A) HTML Helper inspects the `Title` property referenced in the lambda expression to determine the display name. The lambda expression is inspected rather than evaluated. That means there is no access violation when `model`, `model.Movie`, or `model.Movie[0]` is `null` or empty. When the lambda expression is evaluated, for example, with `@Html.DisplayFor(modelItem => item.Title)`, the model's property values are evaluated.

### The layout page

Select the menu links **RazorPagesMovie**, **Home**, and **Privacy**. Each page shows the same menu layout. The menu layout is implemented in the `Pages/Shared/_Layout.cshtml` file.

Open and examine the `Pages/Shared/_Layout.cshtml` file.

[Layout](../../../../mvc/views/layout.md) templates allow the HTML container layout to be:

* Specified in one place.
* Applied in multiple pages in the site.

Find the `@RenderBody()` line. `RenderBody` is a placeholder where all the page-specific views show up, *wrapped* in the layout page. For example, select the **Privacy** link and the `Pages/Privacy.cshtml` view is rendered inside the `RenderBody` method.

<a name="vd"></a>

### ViewData and layout

Consider the following markup from the `Pages/Movies/Index.cshtml` file:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml?range=1-6\&highlight=4-999)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Index.cshtml.md)

The preceding highlighted markup is an example of Razor transitioning into C#. The `{` and `}` characters enclose a block of C# code.

The `PageModel` base class contains a `ViewData` dictionary property that can be used to pass data to a View. Objects are added to the `ViewData` dictionary using a ***key value*** pattern. In the preceding sample, the `Title` property is added to the `ViewData` dictionary.

The `Title` property is used in the `Pages/Shared/_Layout.cshtml` file. The following markup shows the first few lines of the `_Layout.cshtml` file.

<!-- We need a snapshot copy of layout because we are changing in the next step. -->

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample/RazorPagesMovie/Pages/NU/\_Layout.cshtml?highlight=6)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample/RazorPagesMovie/Pages/NU/_Layout.cshtml.md)

The line `@*Markup removed for brevity.*@` is a Razor comment. Unlike HTML comments `<!-- -->`, Razor comments are not sent to the client. See [MDN web docs: Getting started with HTML](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML/Getting_started#HTML_comments) for more information.

### Update the layout

1. Change the `<title>` element in the `Pages/Shared/_Layout.cshtml` file to display **Movie** rather than **RazorPagesMovie**.

   [Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Shared/\_Layout.cshtml?range=1-6\&highlight=6)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Shared/_Layout.cshtml.md)

1. Find the following anchor element in the `Pages/Shared/_Layout.cshtml` file.

   ```cshtml
   <a class="navbar-brand" asp-area="" asp-page="/Index">RazorPagesMovie</a>
   ```

1. Replace the preceding element with the following markup:

   ```cshtml
   <a class="navbar-brand" asp-page="/Movies/Index">RpMovie</a>
   ```

   The preceding anchor element is a [Tag Helper](../../../../mvc/views/tag-helpers/intro.md). In this case, it's the [Anchor Tag Helper](../../../../mvc/views/tag-helpers/built-in/anchor-tag-helper.md). The `asp-page="/Movies/Index"` Tag Helper attribute and value creates a link to the `/Movies/Index` Razor Page. The `asp-area` attribute value is empty, so the area isn't used in the link. See [Areas](../../../../mvc/controllers/areas.md) for more information.

1. Save the changes and test the app by selecting the **RpMovie** link. See the [_Layout.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Shared/_Layout.cshtml) file in GitHub if you have any problems.

1. Test the **Home**, **RpMovie**, **Create**, **Edit**, and **Delete** links. Each page sets the title, which you can see in the browser tab. When you bookmark a page, the title is used for the bookmark.

> **Note:**
> You may not be able to enter decimal commas in the `Price` field. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize the app. See this [GitHub issue 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-326590420) for instructions on adding decimal comma.

The `Layout` property is set in the `Pages/_ViewStart.cshtml` file:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/\_ViewStart.cshtml)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/_ViewStart.cshtml.md)

The preceding markup sets the layout file to `Pages/Shared/_Layout.cshtml` for all Razor files under the *Pages* folder. See [Layout](https://learn.microsoft.com/search/?terms=razor-pages%2Findex%23layout) for more information.

### The Create page model

Examine the `Pages/Movies/Create.cshtml.cs` page model:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Create.cshtml.cs?name=snippetALL)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Create.cshtml.cs.md)

The `OnGet` method initializes any state needed for the page. The Create page doesn't have any state to initialize, so `Page` is returned. Later in the tutorial, an example of `OnGet` initializing state is shown. The `Page` method creates a `PageResult` object that renders the `Create.cshtml` page.

The `Movie` property uses the [\[BindProperty\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute to opt-in to [model binding](../../../../mvc/models/model-binding.md). When the Create form posts the form values, the ASP.NET Core runtime binds the posted values to the `Movie` model.

The `OnPostAsync` method is run when the page posts form data:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Create.cshtml.cs?name=snippetPost)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Create.cshtml.cs.md)

If there are any model errors, the form is redisplayed, along with any form data posted. Most model errors can be caught on the client-side before the form is posted. An example of a model error is posting a value for the date field that cannot be converted to a date. Client-side validation and model validation are discussed later in the tutorial.

If there are no model errors:

* The data is saved.
* The browser is redirected to the Index page.

### The Create Razor Page

Examine the `Pages/Movies/Create.cshtml` Razor Page file:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Create.cshtml)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Create.cshtml.md)

# [Visual Studio](#tab/visual-studio)

Visual Studio displays the following tags in a distinctive bold font used for Tag Helpers:

* `<form method="post">`
* `<div asp-validation-summary="ModelOnly" class="text-danger"></div>`
* `<label asp-for="Movie.Title" class="control-label"></label>`
* `<input asp-for="Movie.Title" class="form-control" />`
* `<span asp-validation-for="Movie.Title" class="text-danger"></span>`

VS17 view of Create.cshtml page

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

The following Tag Helpers are shown in the preceding markup:

* `<form method="post">`
* `<div asp-validation-summary="ModelOnly" class="text-danger"></div>`
* `<label asp-for="Movie.Title" class="control-label"></label>`
* `<input asp-for="Movie.Title" class="form-control" />`
* `<span asp-validation-for="Movie.Title" class="text-danger"></span>`

---

The `<form method="post">` element is a [Form Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper). The Form Tag Helper automatically includes an [antiforgery token](../../../../security/anti-request-forgery.md).

The scaffolding engine creates Razor markup for each field in the model, except the ID, similar to the following:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Create.cshtml?range=15-20)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample3/RazorPagesMovie30/Pages/Movies/Create.cshtml.md)

The [Validation Tag Helpers](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-validation-tag-helpers) (`<div asp-validation-summary` and `<span asp-validation-for`) display validation errors. Validation is covered in more detail later in this series.

The [Label Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-label-tag-helper) (`<label asp-for="Movie.Title" class="control-label"></label>`) generates the label caption and `[for]` attribute for the `Title` property.

The [Input Tag Helper](../../../../mvc/views/working-with-forms.md) (`<input asp-for="Movie.Title" class="form-control">`) uses the [DataAnnotations](https://learn.microsoft.com/aspnet/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-6) attributes and produces HTML attributes needed for jQuery Validation on the client-side.

For more information on Tag Helpers such as `<form method="post">`, see [Tag Helpers in ASP.NET Core](../../../../mvc/views/tag-helpers/intro.md).

## Next steps

> 
> [Previous: Add a model](../../model.md)
> [Next: Work with a database](../../sql.md)
