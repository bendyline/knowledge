---
title: Razor Pages architecture and concepts in ASP.NET Core
author: tdykstra
description: Learn the architecture, concepts, and patterns of Razor Pages in ASP.NET Core for building page-focused web applications.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 08/27/2025
uid: razor-pages/index
---

# Razor Pages architecture and concepts in ASP.NET Core

By [Rick Anderson](https://twitter.com/RickAndMSFT), [Dave Brock](https://twitter.com/daveabrock), and [Kirk Larkin](https://twitter.com/serpent5)


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


Razor Pages can make coding page-focused scenarios easier and more productive than using controllers and views.

If you're looking for a tutorial that uses the Model-View-Controller approach, see [Get started with ASP.NET Core MVC](../tutorials/first-mvc-app/start-mvc.md).

This article covers the architecture, concepts, and patterns that make Razor Pages effective for building page-focused web applications. It explains how Razor Pages work, their key components, and best practices for implementation. If you prefer hands-on learning with step-by-step instructions, see [Tutorial: Create a Razor Pages web app with ASP.NET Core](../tutorials/razor-pages/index.md). For an overview of ASP.NET Core, see the [Introduction to ASP.NET Core](../overview.md).

## Prerequisites

**Applies to: \>= aspnetcore-6.0**

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


---

<a name="rpvs17"></a>

## Create a Razor Pages project

# [Visual Studio](#tab/visual-studio)

See [Get started with Razor Pages](../tutorials/razor-pages/razor-pages-start.md) for detailed instructions on how to create a Razor Pages project.

# [Visual Studio Code](#tab/visual-studio-code)

Run `dotnet new webapp` from the command line.

---

## Razor Pages

Razor Pages is enabled in `Program.cs`:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesIntro/Program.cs?highlight=3,20)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesIntro/Program.cs.md)

In the preceding code:

* [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%252A) adds services for Razor Pages to the app.
* [Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages%252A) adds endpoints for Razor Pages to the [Microsoft.AspNetCore.Routing.IEndpointRouteBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.IEndpointRouteBuilder). 

Consider a basic page:
<a name="OnGet"></a>

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesIntro/Pages/Index.cshtml?highlight=1)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesIntro/Pages/Index.cshtml.md)

The preceding code looks a lot like a [Razor view file](../tutorials/first-mvc-app/adding-view.md) used in an ASP.NET Core app with controllers and views. What makes it different is the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. `@page` makes the file into an MVC action, which means that it handles requests directly, without going through a controller. `@page` must be the first Razor directive on a page. `@page` affects the behavior of other [Razor](../mvc/views/razor.md) constructs. Razor Pages file names have a `.cshtml` suffix.

A similar page, using a `PageModel` class, is shown in the following two files. The `Pages/Index2.cshtml` file:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesIntro/Pages/Index2.cshtml)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesIntro/Pages/Index2.cshtml.md)

The `Pages/Index2.cshtml.cs` page model:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesIntro/Pages/Index2.cshtml.cs)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesIntro/Pages/Index2.cshtml.cs.md)

By convention, the `PageModel` class file has the same name as the Razor Page file with `.cs` appended. For example, the previous Razor Page is `Pages/Index2.cshtml`. The file containing the `PageModel` class is named `Pages/Index2.cshtml.cs`.

The associations of URL paths to pages are determined by the page's location in the file system. The following table shows a Razor Page path and the matching URL.

| File name and path | matching URL |
| --- | --- |
| `/Pages/Index.cshtml` | `/` or `/Index` |
| `/Pages/Contact.cshtml` | `/Contact` |
| `/Pages/Store/Contact.cshtml` | `/Store/Contact` |
| `/Pages/Store/Index.cshtml` | `/Store` or `/Store/Index` |

Notes:

* The runtime looks for Razor Pages files in the *Pages* folder by default.
* `Index` is the default page when a URL doesn't include a page.

## Write a basic form

Razor Pages is designed to make common patterns used with web browsers easy to implement when building an app. [Model binding](../mvc/models/model-binding.md), [Tag Helpers](../mvc/views/tag-helpers/intro.md), and HTML helpers work with the properties defined in a Razor Page class. Consider a page that implements a basic "contact us" form for the `Contact` model:

For the samples in this document, the `DbContext` is initialized in the [Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Program.cs#L11-L12) file.

The in memory database requires the `Microsoft.EntityFrameworkCore.InMemory` NuGet package.

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Program.cs?name=snippet1\&highlight=7-8)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Program.cs.md)

The data model:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Models/Customer.cs)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Models/Customer.cs.md)

The db context:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Data/CustomerDbContext.cs?name=snippet)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Data/CustomerDbContext.cs.md)

The `Pages/Customers/Create.cshtml` view file:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.md)

The `Pages/Customers/Create.cshtml.cs` page model:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_PageModel)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs.md)

By convention, the `PageModel` class is called `<PageName>Model` and is in the same namespace as the page.

The `PageModel` class allows separation of the logic of a page from its presentation. It defines page handlers for requests sent to the page and the data used to render the page. This separation allows:

* Managing of page dependencies through [dependency injection](../fundamentals/dependency-injection.md).
* [Unit testing](../test/razor-pages-tests.md)

The page has an `OnPostAsync` *handler method*, which runs on `POST` requests (when a user posts the form). Handler methods for any HTTP verb can be added. The most common handlers are:

* `OnGet` to initialize state needed for the page. In the preceding code, the `OnGet` method displays the `Create.cshtml` Razor Page.
* `OnPost` to handle form submissions.

The `Async` naming suffix is optional but is often used by convention for asynchronous functions. The preceding code is typical for Razor Pages.

If you're familiar with ASP.NET apps using controllers and views:

* The `OnPostAsync` code in the preceding example looks similar to typical controller code.
* Most of the MVC primitives like [model binding](../mvc/models/model-binding.md), [validation](../mvc/models/validation.md), and action results work the same with Controllers and Razor Pages. 

The previous `OnPostAsync` method:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_OnPostAsync)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs.md)

The basic flow of `OnPostAsync`:

Check for validation errors.

* If there are no errors, save the data and redirect.
* If there are errors, show the page again with validation messages. In many cases, validation errors would be detected on the client, and never submitted to the server.

The `Pages/Customers/Create.cshtml` view file:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.md)

The rendered HTML from `Pages/Customers/Create.cshtml`:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create4.html)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create4.html.md)

In the previous code, posting the form:

* With valid data:

  * The `OnPostAsync` handler method calls the [Microsoft.AspNetCore.Mvc.RazorPages.PageModel.RedirectToPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageModel.RedirectToPage%252A) helper method. `RedirectToPage` returns an instance of [Microsoft.AspNetCore.Mvc.RedirectToPageResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RedirectToPageResult). `RedirectToPage`:

    * Is an action result.
    * Is similar to `RedirectToAction` or `RedirectToRoute` (used in controllers and views).
    * Is customized for pages. In the preceding sample, it redirects to the root Index page (`/Index`). `RedirectToPage` is detailed in the [URL generation for Pages](#url_gen) section.

* With validation errors that are passed to the server:

  * The `OnPostAsync` handler method calls the [Microsoft.AspNetCore.Mvc.RazorPages.PageBase.Page%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageBase.Page%252A) helper method. `Page` returns an instance of [Microsoft.AspNetCore.Mvc.RazorPages.PageResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageResult). Returning `Page` is similar to how actions in controllers return `View`. `PageResult` is the default return type for a handler method. A handler method that returns `void` renders the page.
  * In the preceding example, posting the form with no value results in [ModelState.IsValid](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.IsValid) returning false. In this sample, no validation errors are displayed on the client. Validation error handling is covered later in this document.

  [Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_OnPostAsync\&highlight=6-9)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs.md)

* With validation errors detected by client side validation:

  * Data is **not** posted to the server.
  * Client-side validation is explained later in this document.

The `Customer` property uses [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute to opt in to model binding:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_OnPostAsync\&highlight=1-2)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs.md)

`[BindProperty]` should **not** be used on models containing properties that should not be changed by the client. For more information, see [Overposting](https://learn.microsoft.com/search/?terms=data%2Fef-rp%2Fcrud%23overposting).

Razor Pages, by default, bind properties only with non-`GET` verbs. Binding to properties removes the need to writing code to convert HTTP data to the model type. Binding reduces code by using the same property to render form fields (`<input asp-for="Customer.Name">`) and accept the input.

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


Reviewing the `Pages/Customers/Create.cshtml` view file:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml?highlight=3,9)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.md)

* In the preceding code, the [input tag helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-input-tag-helper) `<input asp-for="Customer.Name" />` binds the HTML `<input>` element to the `Customer.Name` model expression.
* [`@addTagHelper`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Ftag-helpers%2Fintro%23addtaghelper-makes-tag-helpers-available) makes Tag Helpers available.

### The home page

`Index.cshtml` is the home page:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml.md)

The associated `PageModel` class (`Index.cshtml.cs`):

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml.cs?name=snippet)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml.cs.md)

The `Index.cshtml` file contains the following markup:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml?name=snippet_Edit)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml.md)

The `<a /a>` [Anchor Tag Helper](../mvc/views/tag-helpers/built-in/anchor-tag-helper.md) used the `asp-route-{value}` attribute to generate a link to the Edit page. The link contains route data with the contact ID. For example, `https://localhost:5001/Edit/1`. [Tag Helpers](../mvc/views/tag-helpers/intro.md) enable server-side code to participate in creating and rendering HTML elements in Razor files.

The `Index.cshtml` file contains markup to create a delete button for each customer contact:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml?name=snippet_Delete)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml.md)

The rendered HTML:

```html
<button type="submit" formaction="/Customers?id=1&amp;handler=delete">delete</button>
```

When the delete button is rendered in HTML, its [formaction](https://developer.mozilla.org/docs/Web/HTML/Element/button#attr-formaction) includes parameters for:

* The customer contact ID, specified by the `asp-route-id` attribute.
* The `handler`, specified by the `asp-page-handler` attribute.

When the button is selected, a form `POST` request is sent to the server. By convention, the name of the handler method is selected based on the value of the `handler` parameter according to the scheme `OnPost[handler]Async`.

Because the `handler` is `delete` in this example, the `OnPostDeleteAsync` handler method is used to process the `POST` request. If the `asp-page-handler` is set to a different value, such as `remove`, a handler method with the name `OnPostRemoveAsync` is selected.

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml.cs?name=snippet2)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml.cs.md)

The `OnPostDeleteAsync` method:

* Gets the `id` from the query string.
* Queries the database for the customer contact with `FindAsync`.
* If the customer contact is found, it's removed and the database is updated.
* Calls [Microsoft.AspNetCore.Mvc.RazorPages.PageModel.RedirectToPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageModel.RedirectToPage%252A) to redirect to the root Index page (`/Index`).

### The Edit.cshtml file

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Edit.cshtml?highlight=1)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Edit.cshtml.md)

The first line contains the `@page "{id:int}"` directive. The routing constraint `"{id:int}"` tells the page to accept requests to the page that contain `int` route data. If a request to the page doesn't contain route data that can be converted to an `int`, the runtime returns an HTTP 404 (not found) error. To make the ID optional, append `?` to the route constraint:

 ```cshtml
@page "{id:int?}"
```

The `Edit.cshtml.cs` file:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Edit.cshtml.cs?name=snippet)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Edit.cshtml.cs.md)

## Validation

Validation rules:

* Are declaratively specified in the model class.
* Are enforced everywhere in the app.

The [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace provides a set of built-in validation attributes that are applied declaratively to a class or property. DataAnnotations also contains formatting attributes like [`[DataType]`](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) that help with formatting and don't provide any validation.

Consider the `Customer` model:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Models/Customer.cs)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Models/Customer.cs.md)

Using the following `Create.cshtml` view file:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create3.cshtml?highlight=3,8-9,15-99)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create3.cshtml.md)

The preceding code:

* Includes jQuery and jQuery validation scripts.
* Uses the `<div />` and `<span />` [Tag Helpers](../mvc/views/tag-helpers/intro.md) to enable:

  * Client-side validation.
  * Validation error rendering.

* Generates the following HTML:

  [Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create5.html)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create5.html.md)

Posting the Create form without a name value displays the error message "The Name field is required." on the form. If JavaScript is enabled on the client, the browser displays the error without posting to the server.

The `[StringLength(10)]` attribute generates `data-val-length-max="10"` on the rendered HTML. `data-val-length-max` prevents browsers from entering more than the maximum length specified. If a tool such as [Fiddler](https://www.telerik.com/fiddler) is used to edit and replay the post:

* With the name longer than 10.
* The error message "The field Name must be a string with a maximum length of 10." is returned.

Consider the following `Movie` model:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/MovieDateRatingDA.cs?name=snippet1)](../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/MovieDateRatingDA.cs.md)

The validation attributes specify behavior to enforce on the model properties they're applied to:

* The `Required` and `MinimumLength` attributes indicate that a property must have a value, but nothing prevents a user from entering white space to satisfy this validation.
* The `RegularExpression` attribute is used to limit what characters can be input. In the preceding code, "Genre":

  * Must only use letters.
  * The first letter is required to be uppercase. White space, numbers, and special
   characters are not allowed.

* The `RegularExpression` "Rating":

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a "Genre".

* The `Range` attribute constrains a value to within a specified range.
* The `StringLength` attribute sets the maximum length of a string property, and optionally its minimum length.
* Value types (such as `decimal`, `int`, `float`, `DateTime`) are inherently required and don't need the `[Required]` attribute.

The Create page for the `Movie` model shows displays errors with invalid values:

Movie view form with multiple jQuery client-side validation errors

For more information, see:

* [Add validation to the Movie app](../tutorials/razor-pages/validation.md)
* [Model validation in ASP.NET Core](../mvc/models/validation.md).

## CSS isolation

Isolate CSS styles to individual pages, views, and components to reduce or avoid:

* Dependencies on global styles that can be challenging to maintain.
* Style conflicts in nested content.

To add a *scoped CSS file* for a page or view, place the CSS styles in a companion `.cshtml.css` file matching the name of the `.cshtml` file. In the following example, an `Index.cshtml.css` file supplies CSS styles that are only applied to the `Index.cshtml` page or view.

`Pages/Index.cshtml.css` (Razor Pages) or `Views/Index.cshtml.css` (MVC):

```css
h1 {
    color: red;
}
```

CSS isolation occurs at build time. The framework rewrites CSS selectors to match markup rendered by the app's pages or views. The rewritten CSS styles are bundled and produced as a static asset, `{APP ASSEMBLY}.styles.css`. The placeholder `{APP ASSEMBLY}` is the assembly name of the project. A link to the bundled CSS styles is placed in the app's layout. 

In the `<head>` content of the app's `Pages/Shared/_Layout.cshtml` (Razor Pages) or `Views/Shared/_Layout.cshtml` (MVC), add or confirm the presence of the link to the bundled CSS styles:

```html
<link rel="stylesheet" href="~/{APP ASSEMBLY}.styles.css" />
```

In the following example, the app's assembly name is `WebApp`:

```html
<link rel="stylesheet" href="WebApp.styles.css" />
```

The styles defined in a scoped CSS file are only applied to the rendered output of the matching file. In the preceding example, any `h1` CSS declarations defined elsewhere in the app don't conflict with the `Index`'s heading style. CSS style cascading and inheritance rules remain in effect for scoped CSS files. For example, styles applied directly to an `<h1>` element in the `Index.cshtml` file override the scoped CSS file's styles in `Index.cshtml.css`.

> **Note:**
> In order to guarantee CSS style isolation when bundling occurs, importing CSS in Razor code blocks isn't supported.
>
> CSS isolation only applies to HTML elements. CSS isolation isn't supported for [Tag Helpers](../mvc/views/tag-helpers/intro.md).

Within the bundled CSS file, each page, view, or Razor component is associated with a scope identifier in the format `b-{STRING}`, where the `{STRING}` placeholder is a ten-character string generated by the framework. The following example provides the style for the preceding `<h1>` element in the `Index` page of a Razor Pages app:

```css
/* /Pages/Index.cshtml.rz.scp.css */
h1[b-3xxtam6d07] {
    color: red;
}
```

In the `Index` page where the CSS style is applied from the bundled file, the scope identifier is appended as an HTML attribute:

```html
<h1 b-3xxtam6d07>
```

The identifier is unique to an app. At build time, a project bundle is created with the convention `{STATIC WEB ASSETS BASE PATH}/Project.lib.scp.css`, where the placeholder `{STATIC WEB ASSETS BASE PATH}` is the static web assets base path.

If other projects are utilized, such as NuGet packages or [Razor class libraries](ui-class.md), the bundled file:

* References the styles using CSS imports.
* Isn't published as a static web asset of the app that consumes the styles.

## CSS preprocessor support

CSS preprocessors are useful for improving CSS development by utilizing features such as variables, nesting, modules, mixins, and inheritance. While CSS isolation doesn't natively support CSS preprocessors such as Sass or Less, integrating CSS preprocessors is seamless as long as preprocessor compilation occurs before the framework rewrites the CSS selectors during the build process. Using Visual Studio for example, configure existing preprocessor compilation as a **Before Build** task in the Visual Studio Task Runner Explorer.

Many third-party NuGet packages, such as [`AspNetCore.SassCompiler`](https://www.nuget.org/packages/AspNetCore.SassCompiler#readme-body-tab), can compile SASS/SCSS files at the beginning of the build process before CSS isolation occurs, and no additional configuration is required.

## CSS isolation configuration

CSS isolation permits configuration for some advanced scenarios, such as when there are dependencies on existing tools or workflows.

### Customize scope identifier format

*In this section, the `{Pages|Views}` placeholder is either `Pages` for Razor Pages apps or `Views` for MVC apps.*

By default, scope identifiers use the format `b-{STRING}`, where the `{STRING}` placeholder is a ten-character string generated by the framework. To customize the scope identifier format, update the project file to a desired pattern:

```xml
<ItemGroup>
  <None Update="{Pages|Views}/Index.cshtml.css" CssScope="custom-scope-identifier" />
</ItemGroup>
```

In the preceding example, the CSS generated for `Index.cshtml.css` changes its scope identifier from `b-{STRING}` to `custom-scope-identifier`.

Use scope identifiers to achieve inheritance with scoped CSS files. In the following project file example, a `BaseView.cshtml.css` file contains common styles across views. A `DerivedView.cshtml.css` file inherits these styles.

```xml
<ItemGroup>
  <None Update="{Pages|Views}/BaseView.cshtml.css" CssScope="custom-scope-identifier" />
  <None Update="{Pages|Views}/DerivedView.cshtml.css" CssScope="custom-scope-identifier" />
</ItemGroup>
```

Use the wildcard (`*`) operator to share scope identifiers across multiple files:

```xml
<ItemGroup>
  <None Update="{Pages|Views}/*.cshtml.css" CssScope="custom-scope-identifier" />
</ItemGroup>
```

### Change base path for static web assets

The scoped CSS file is generated at the root of the app. In the project file, use the `StaticWebAssetBasePath` property to change the default path. The following example places the scoped CSS file, and the rest of the app's assets, at the `_content` path:

```xml
<PropertyGroup>
  <StaticWebAssetBasePath>_content/$(PackageId)</StaticWebAssetBasePath>
</PropertyGroup>
```

### Disable automatic bundling

To opt out of how framework publishes and loads scoped files at runtime, use the `DisableScopedCssBundling` property. When using this property, other tools or processes are responsible for taking the isolated CSS files from the `obj` directory and publishing and loading them at runtime:

```xml
<PropertyGroup>
  <DisableScopedCssBundling>true</DisableScopedCssBundling>
</PropertyGroup>
```

## Razor class library (RCL) support

When a [Razor class library (RCL)](ui-class.md) provides isolated styles, the `<link>` tag's `href` attribute points to `{STATIC WEB ASSET BASE PATH}/{PACKAGE ID}.bundle.scp.css`, where the placeholders are:

* `{STATIC WEB ASSET BASE PATH}`: The static web asset base path.
* `{PACKAGE ID}`: The library's [package identifier](https://learn.microsoft.com/nuget/create-packages/creating-a-package-msbuild#set-properties). The package identifier defaults to the project's assembly name if the package identifier isn't specified in the project file.

In the following example:

* The static web asset base path is `_content/ClassLib`.
* The class library's assembly name is `ClassLib`.

`Pages/Shared/_Layout.cshtml` (Razor Pages) or `Views/Shared/_Layout.cshtml` (MVC):

```html
<link href="_content/ClassLib/ClassLib.bundle.scp.css" rel="stylesheet">
```

For more information on RCLs, see the following articles:

* [razor-pages/ui-class](ui-class.md)
* [blazor/components/class-libraries](../blazor/components/class-libraries.md)

For information on Blazor CSS isolation, see [blazor/components/css-isolation](../blazor/components/css-isolation.md).


## Handle HEAD requests with an OnGet handler fallback

`HEAD` requests allow retrieving the headers for a specific resource. Unlike `GET` requests, `HEAD` requests don't return a response body.

Ordinarily, an `OnHead` handler is created and called for `HEAD` requests:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Privacy.cshtml.cs?name=snippet)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Privacy.cshtml.cs.md)

Razor Pages falls back to calling the `OnGet` handler if no `OnHead` handler is defined.

<a name="xsrf"></a>

## XSRF/CSRF and Razor Pages

Razor Pages are protected by [Antiforgery validation](../security/anti-request-forgery.md). The [FormTagHelper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper) injects antiforgery tokens into HTML form elements.

<a name="layout"></a>

## Using Layouts, partials, templates, and Tag Helpers with Razor Pages

Pages work with all the capabilities of the Razor view engine. Layouts, partials, templates, Tag Helpers, `_ViewStart.cshtml`, and `_ViewImports.cshtml` work in the same way they do for conventional Razor views.

Let's declutter this page by taking advantage of some of those capabilities.

Add a [layout page](../mvc/views/layout.md) to `Pages/Shared/_Layout.cshtml`:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Shared/\_Layout2.cshtml?highlight=12)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Shared/_Layout2.cshtml.md)

The [Layout](../mvc/views/layout.md):

* Controls the layout of each page (unless the page opts out of layout).
* Imports HTML structures such as JavaScript and stylesheets.
* The contents of the Razor page are rendered where `@RenderBody()` is called.

For more information, see [layout page](../mvc/views/layout.md).

The [Layout](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Flayout%23specifying-a-layout) property is set in `Pages/_ViewStart.cshtml`:

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesContacts2/Pages/\_ViewStart.cshtml)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/_ViewStart.cshtml.md)

The layout is in the *Pages/Shared* folder. Pages look for other views (layouts, templates, partials) hierarchically, starting in the same folder as the current page. A layout in the *Pages/Shared* folder can be used from any Razor page under the *Pages* folder.

The layout file should go in the *Pages/Shared* folder.

We recommend you **not** put the layout file in the *Views/Shared* folder. *Views/Shared* is an MVC views pattern. Razor Pages are meant to rely on folder hierarchy, not path conventions.

View search from a Razor Page includes the *Pages* folder. The layouts, templates, and partials used with MVC controllers and conventional Razor views *just work*.

Add a `Pages/_ViewImports.cshtml` file:

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesContacts2/Pages/\_ViewImports.cshtml)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/_ViewImports.cshtml.md)

`@namespace` is explained later in the tutorial. The `@addTagHelper` directive brings in the [built-in Tag Helpers](../mvc/views/tag-helpers/built-in/index.md) to all the pages in the *Pages* folder.

<a name="namespace"></a>

The `@namespace` directive set on a page:

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesIntro/Pages/Customers/Namespace2.cshtml?highlight=2)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesIntro/Pages/Customers/Namespace2.cshtml.md)

The `@namespace` directive sets the namespace for the page. The `@model` directive doesn't need to include the namespace.

When the `@namespace` directive is contained in `_ViewImports.cshtml`, the specified namespace supplies the prefix for the generated namespace in the Page that imports the `@namespace` directive. The rest of the generated namespace (the suffix portion) is the dot-separated relative path between the folder containing `_ViewImports.cshtml` and the folder containing the page.

For example, the `PageModel` class `Pages/Customers/Edit.cshtml.cs` explicitly sets the namespace:

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/Edit.cshtml.cs?name=snippet_namespace)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/Edit.cshtml.cs.md)

The `Pages/_ViewImports.cshtml` file sets the following namespace:

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesContacts2/Pages/\_ViewImports.cshtml?highlight=1)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/_ViewImports.cshtml.md)

The generated namespace for the `Pages/Customers/Edit.cshtml` Razor Page is the same as the `PageModel` class.

`@namespace` *also works with conventional Razor views.*

Consider the `Pages/Customers/Create.cshtml` view file:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create3.cshtml?highlight=2-3)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create3.cshtml.md)

The updated `Pages/Customers/Create.cshtml` view file with `_ViewImports.cshtml` and the preceding layout file:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create4.cshtml?highlight=2)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create4.cshtml.md)

In the preceding code, the `_ViewImports.cshtml` imported the namespace and Tag Helpers. The layout file imported the JavaScript files.

The [Razor Pages starter project](#rpvs17) contains the `Pages/_ValidationScriptsPartial.cshtml`, which hooks up client-side validation.

For more information on partial views, see [mvc/views/partial](../mvc/views/partial.md).

<a name="url_gen"></a>

## URL generation for Pages

The `Create` page, shown previously, uses `RedirectToPage`:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_PageModel\&highlight=28)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs.md)

The app has the following file/folder structure:

* */Pages*

  * `Index.cshtml`
  * `Privacy.cshtml`
  * */Customers*

    * `Create.cshtml`
    * `Edit.cshtml`
    * `Index.cshtml`

The `Pages/Customers/Create.cshtml` and `Pages/Customers/Edit.cshtml` pages redirect to `Pages/Customers/Index.cshtml` after success. The string `./Index` is a relative page name used to access the preceding page. It is used to generate URLs to the `Pages/Customers/Index.cshtml` page. For example:

* `Url.Page("./Index", ...)`
* `<a asp-page="./Index">Customers Index Page</a>`
* `RedirectToPage("./Index")`

The absolute page name `/Index` is used to generate URLs to the `Pages/Index.cshtml` page. For example:

* `Url.Page("/Index", ...)`
* `<a asp-page="/Index">Home Index Page</a>`
* `RedirectToPage("/Index")`

The page name is the path to the page from the root */Pages* folder including a leading `/` (for example, `/Index`). The preceding URL generation samples offer enhanced options and functional capabilities over hard-coding a URL. URL generation uses [routing](../mvc/controllers/routing.md) and can generate and encode parameters according to how the route is defined in the destination path.

URL generation for pages supports relative names. The following table shows which Index page is selected using different `RedirectToPage` parameters in `Pages/Customers/Create.cshtml`.

| RedirectToPage(x) | Page |
| --- | --- |
| RedirectToPage("/Index") | *Pages/Index* |
| RedirectToPage("./Index"); | *Pages/Customers/Index* |
| RedirectToPage("../Index") | *Pages/Index* |
| RedirectToPage("Index") | *Pages/Customers/Index* |

<!-- Test via ~/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Details.cshtml.cs -->

`RedirectToPage("Index")`, `RedirectToPage("./Index")`, and `RedirectToPage("../Index")` are *relative names*. The `RedirectToPage` parameter is *combined* with the path of the current page to compute the name of the destination page.

Relative name linking is useful when building sites with a complex structure. When relative names are used to link between pages in a folder:

* Renaming a folder doesn't break the relative links.
* Links are not broken because they don't include the folder name.

To redirect to a page in a different [Area](../mvc/controllers/areas.md), specify the area:

```csharp
RedirectToPage("/Index", new { area = "Services" });
```

For more information, see [mvc/controllers/areas](../mvc/controllers/areas.md) and [razor-pages/razor-pages-conventions](razor-pages-conventions.md).

## ViewData attribute

Data can be passed to a page with [Microsoft.AspNetCore.Mvc.ViewDataAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewDataAttribute). Properties with the `[ViewData]` attribute have their values stored and loaded from the [Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary).

In the following example, the `AboutModel` applies the `[ViewData]` attribute to the `Title` property:

```csharp
public class AboutModel : PageModel
{
    [ViewData]
    public string Title { get; } = "About";

    public void OnGet()
    {
    }
}
```

In the About page, access the `Title` property as a model property:

```cshtml
<h1>@Model.Title</h1>
```

In the layout, the title is read from the ViewData dictionary:

```cshtml
<!DOCTYPE html>
<html lang="en">
<head>
    <title>@ViewData["Title"] - WebApplication</title>
    ...
```

## TempData

ASP.NET Core exposes the [Microsoft.AspNetCore.Mvc.Controller.TempData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Controller.TempData). This property stores data until it's read. The [Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Keep%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Keep%252A) and [Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Peek%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Peek%252A) methods can be used to examine the data without deletion. `TempData` is useful for redirection, when data is needed for more than a single request.

The following code sets the value of `Message` using `TempData`:

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateDot.cshtml.cs?highlight=10-11,25\&name=snippet_Temp)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateDot.cshtml.cs.md)

The following markup in the `Pages/Customers/Index.cshtml` file displays the value of `Message` using `TempData`.

```cshtml
<h3>Msg: @Model.Message</h3>
```

The `Pages/Customers/Index.cshtml.cs` page model applies the `[TempData]` attribute to the `Message` property.

```csharp
[TempData]
public string Message { get; set; }
```

For more information, see [TempData](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata).

<a name="mhpp"></a>

## Multiple handlers per page

The following page generates markup for two handlers using the `asp-page-handler` Tag Helper:

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateFATH.cshtml?highlight=12-13)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateFATH.cshtml.md)

The form in the preceding example has two submit buttons, each using the `FormActionTagHelper` to submit to a different URL. The `asp-page-handler` attribute is a companion to `asp-page`. `asp-page-handler` generates URLs that submit to each of the handler methods defined by a page. `asp-page` isn't specified because the sample is linking to the current page.

The page model:

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateFATH.cshtml.cs?highlight=20,32)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateFATH.cshtml.cs.md)

The preceding code uses *named handler methods*. Named handler methods are created by taking the text in the name after `On<HTTP Verb>` and before `Async` (if present). In the preceding example, the page methods are OnPost**JoinList**Async and OnPost**JoinListUC**Async. With *OnPost* and *Async* removed, the handler names are `JoinList` and `JoinListUC`.

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateFATH.cshtml?name=snippet_Handlers)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateFATH.cshtml.md)

Using the preceding code, the URL path that submits to `OnPostJoinListAsync` is `https://localhost:5001/Customers/CreateFATH?handler=JoinList`. The URL path that submits to `OnPostJoinListUCAsync` is `https://localhost:5001/Customers/CreateFATH?handler=JoinListUC`.

## Custom routes

Use the `@page` directive to:

* Specify a custom route to a page. For example, the route to the About page can be set to `/Some/Other/Path` with `@page "/Some/Other/Path"`.
* Append segments to a page's default route. For example, an "item" segment can be added to a page's default route with `@page "item"`.
* Append parameters to a page's default route. For example, an ID parameter, `id`, can be required for a page with `@page "{id}"`.

A root-relative path designated by a tilde (`~`) at the beginning of the path is supported. For example, `@page "~/Some/Other/Path"` is the same as `@page "/Some/Other/Path"`.

If you don't like the query string `?handler=JoinList` in the URL, change the route to put the handler name in the path portion of the URL. The route can be customized by adding a route template enclosed in double quotes after the `@page` directive.

[Code example (complete source file; reference: \~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateRoute.cshtml?highlight=1)](../../_code/aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateRoute.cshtml.md)

Using the preceding code, the URL path that submits to `OnPostJoinListAsync` is `https://localhost:5001/Customers/CreateFATH/JoinList`. The URL path that submits to `OnPostJoinListUCAsync` is `https://localhost:5001/Customers/CreateFATH/JoinListUC`.

The `?` following `handler` means the route parameter is optional.

## Collocation of JavaScript (JS) files

Collocation of JavaScript (JS) files for pages and views is a convenient way to organize scripts in an app.

Collocate JS files using the following filename extension conventions:

* Pages of Razor Pages apps and views of MVC apps: `.cshtml.js`. Examples:
  * `Pages/Index.cshtml.js` for the `Index` page of a Razor Pages app at `Pages/Index.cshtml`.
  * `Views/Home/Index.cshtml.js` for the `Index` view of an MVC app at `Views/Home/Index.cshtml`.

Collocated JS files are publicly addressable using the ***path to the file in the project***:

* Pages and views from a collocated scripts file in the app:

  `{PATH}/{PAGE, VIEW, OR COMPONENT}.{EXTENSION}.js`
  
  * The `{PATH}` placeholder is the path to the page, view, or component.
  * The `{PAGE, VIEW, OR COMPONENT}` placeholder is the page, view, or component.
  * The `{EXTENSION}` placeholder matches the extension of the page, view, or component, either `razor` or `cshtml`.

  Razor Pages example:

  A JS file for the `Index` page is placed in the `Pages` folder (`Pages/Index.cshtml.js`) next to the `Index` page (`Pages/Index.cshtml`). In the `Index` page, the script is referenced at the path in the `Pages` folder:

  ```razor
  @section Scripts {
    <script src="~/Pages/Index.cshtml.js"></script>
  }
  ```

The default layout `Pages/Shared/_Layout.cshtml` can be configured to include collocated JS files, eliminating the need to configure each page individually:

[language="razor" source="\~/mvc/views/tag-helpers/built-in/samples/ScriptTagHelper/Pages/Shared/\_Layout.cshtml"  range="54-54"::: (complete source file; reference: \~/mvc/views/tag-helpers/built-in/samples/ScriptTagHelper/Pages/Shared/\_Layout.cshtml)](../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/ScriptTagHelper/Pages/Shared/_Layout.cshtml.md)

The [sample download](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/views/tag-helpers/built-in/samples/ScriptTagHelper) uses the preceding code snippet to include collocated JS files in the default layout.
  
  When the app is published, the framework automatically moves the script to the web root. In the preceding example, the script is moved to `bin\Release\{TARGET FRAMEWORK MONIKER}\publish\wwwroot\Pages\Index.cshtml.js`, where the `{TARGET FRAMEWORK MONIKER}` placeholder is the [Target Framework Moniker (TFM)](https://learn.microsoft.com/dotnet/standard/frameworks). No change is required to the script's relative URL in the `Index` page.

  When the app is published, the framework automatically moves the script to the web root. In the preceding example, the script is moved to `bin\Release\{TARGET FRAMEWORK MONIKER}\publish\wwwroot\Components\Pages\Index.razor.js`, where the `{TARGET FRAMEWORK MONIKER}` placeholder is the [Target Framework Moniker (TFM)](https://learn.microsoft.com/dotnet/standard/frameworks). No change is required to the script's relative URL in the `Index` component.

* For scripts provided by a Razor class library (RCL):

  `_content/{PACKAGE ID}/{PATH}/{PAGE, VIEW, OR COMPONENT}.{EXTENSION}.js`

  * The `{PACKAGE ID}` placeholder is the RCL's package identifier (or library name for a class library referenced by the app).
  * The `{PATH}` placeholder is the path to the page, view, or component. If a Razor component is located at the root of the RCL, the path segment isn't included.
  * The `{PAGE, VIEW, OR COMPONENT}` placeholder is the page, view, or component.
  * The `{EXTENSION}` placeholder matches the extension of page, view, or component, either `razor` or `cshtml`.


## Advanced configuration and settings

The configuration and settings in following sections is not required by most apps.

To configure advanced options, use the [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%252A) overload that configures [Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions):
[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Program.cs?name=snippet_ac\&highlight=5-9)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Program.cs.md)

Use the [Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions) to set the root directory for pages, or add application model conventions for pages. For more information on conventions, see [Razor Pages authorization conventions](security/authorization/conventions.md).

To precompile views, see [Razor view compilation](../mvc/views/view-compilation.md).

### Specify that Razor Pages are at the content root

By default, Razor Pages are rooted in the */Pages* directory. Add [Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcBuilderExtensions.WithRazorPagesAtContentRoot%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcBuilderExtensions.WithRazorPagesAtContentRoot%252A) to specify that your Razor Pages are at the [content root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23content-root) ([Microsoft.AspNetCore.Hosting.IHostingEnvironment.ContentRootPath](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IHostingEnvironment.ContentRootPath)) of the app:

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Program.cs?name=snippet_cr\&highlight=5-9)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Program.cs.md)

### Specify that Razor Pages are at a custom root directory

Add [Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcCoreBuilderExtensions.WithRazorPagesRoot%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcCoreBuilderExtensions.WithRazorPagesRoot%252A) to specify that Razor Pages are at a custom root directory in the app (provide a relative path):

[Code example (complete source file; reference: \~/razor-pages/index/6.0sample/RazorPagesContacts/Program.cs?name=snippet_crd\&highlight=5-9)](../../_code/aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Program.cs.md)

## Additional resources

* See [Get started with Razor Pages](../tutorials/razor-pages/razor-pages-start.md), which builds on this introduction.
* [`[Authorize]` attribute in Razor Pages apps](https://learn.microsoft.com/search/?terms=razor-pages%2Fsecurity%2Fauthorization%2Fsimple%23authorize-attribute-in-razor-pages-apps)
* [Download or view sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/razor-pages/index/6.0sample)
* [index](../overview.md)
* [mvc/views/razor](../mvc/views/razor.md)
* [mvc/controllers/areas](../mvc/controllers/areas.md)
* [tutorials/razor-pages/razor-pages-start](../tutorials/razor-pages/razor-pages-start.md)
* [razor-pages/security/authorization/conventions](security/authorization/conventions.md)
* [razor-pages/razor-pages-conventions](razor-pages-conventions.md)
* [test/razor-pages-tests](../test/razor-pages-tests.md)
* [mvc/views/partial](../mvc/views/partial.md)



**Applies to: \= aspnetcore-3.1**

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2019 16.4 or later](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2019) with the **ASP.NET and web development** workload
* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on any platform (macOS, Linux, or Windows) and with any code editor. Minor changes may be required if you use something other than Visual Studio Code. For more information on installing Visual Studio Code on macOS, see [Visual Studio Code on macOS](https://code.visualstudio.com/docs/setup/mac).


# [Visual Studio for Mac](#tab/visual-studio-mac)

* [Visual Studio for Mac version 8.4 or later](https://learn.microsoft.com/lifecycle/announcements/visual-studio-mac-end-of-servicing)
* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)



---



**Applies to: \= aspnetcore-5.0**

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2019 16.8 or later](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2019) with the **ASP.NET and web development** workload
* [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


# [Visual Studio for Mac](#tab/visual-studio-mac)

* [Visual Studio for Mac](https://learn.microsoft.com/lifecycle/announcements/visual-studio-mac-end-of-servicing)
* [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)



---


**Applies to: < aspnetcore-6.0**

<a name="rpvs17"></a>

## Create a Razor Pages project

# [Visual Studio](#tab/visual-studio)

See [Get started with Razor Pages](../tutorials/razor-pages/razor-pages-start.md) for detailed instructions on how to create a Razor Pages project.

# [Visual Studio Code](#tab/visual-studio-code)

Run `dotnet new webapp` from the command line.

# [Visual Studio for Mac](#tab/visual-studio-mac)

See [Get started with Razor Pages](../tutorials/razor-pages/razor-pages-start.md) for detailed instructions on how to create a Razor Pages project.

---

## Razor Pages

Razor Pages is enabled in `Startup.cs`:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesIntro/Startup.cs?name=snippet_Startup\\&highlight=12,36](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

Consider a basic page:
<a name="OnGet"></a>

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesIntro/Pages/Index.cshtml?highlight=1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The preceding code looks a lot like a [Razor view file](../tutorials/first-mvc-app/adding-view.md) used in an ASP.NET Core app with controllers and views. What makes it different is the [`@page`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Frazor%23page) directive. `@page` makes the file into an MVC action - which means that it handles requests directly, without going through a controller. `@page` must be the first Razor directive on a page. `@page` affects the behavior of other [Razor](../mvc/views/razor.md) constructs. Razor Pages file names have a `.cshtml` suffix.

A similar page, using a `PageModel` class, is shown in the following two files. The `Pages/Index2.cshtml` file:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesIntro/Pages/Index2.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The `Pages/Index2.cshtml.cs` page model:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesIntro/Pages/Index2.cshtml.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

By convention, the `PageModel` class file has the same name as the Razor Page file with `.cs` appended. For example, the previous Razor Page is `Pages/Index2.cshtml`. The file containing the `PageModel` class is named `Pages/Index2.cshtml.cs`.

The associations of URL paths to pages are determined by the page's location in the file system. The following table shows a Razor Page path and the matching URL.

| File name and path | matching URL |
| --- | --- |
| `/Pages/Index.cshtml` | `/` or `/Index` |
| `/Pages/Contact.cshtml` | `/Contact` |
| `/Pages/Store/Contact.cshtml` | `/Store/Contact` |
| `/Pages/Store/Index.cshtml` | `/Store` or `/Store/Index` |

Notes:

* The runtime looks for Razor Pages files in the *Pages* folder by default.
* `Index` is the default page when a URL doesn't include a page.

## Write a basic form

Razor Pages is designed to make common patterns used with web browsers easy to implement when building an app. [Model binding](../mvc/models/model-binding.md), [Tag Helpers](../mvc/views/tag-helpers/intro.md), and HTML helpers all *just work* with the properties defined in a Razor Page class. Consider a page that implements a basic "contact us" form for the `Contact` model:

For the samples in this document, the `DbContext` is initialized in the [Startup.cs](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/razor-pages/index/3.0sample/RazorPagesContacts/Startup.cs#L23-L24) file.

The in memory database requires the `Microsoft.EntityFrameworkCore.InMemory` NuGet package.

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Startup.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The data model:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Models/Customer.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The db context:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Data/CustomerDbContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The `Pages/Create.cshtml` view file:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The `Pages/Create.cshtml.cs` page model:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_ALL](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

By convention, the `PageModel` class is called `<PageName>Model` and is in the same namespace as the page.

The `PageModel` class allows separation of the logic of a page from its presentation. It defines page handlers for requests sent to the page and the data used to render the page. This separation allows:

* Managing of page dependencies through [dependency injection](../fundamentals/dependency-injection.md).
* [Unit testing](../test/razor-pages-tests.md)

The page has an `OnPostAsync` *handler method*, which runs on `POST` requests (when a user posts the form). Handler methods for any HTTP verb can be added. The most common handlers are:

* `OnGet` to initialize state needed for the page. In the preceding code, the `OnGet` method displays the `CreateModel.cshtml` Razor Page.
* `OnPost` to handle form submissions.

The `Async` naming suffix is optional but is often used by convention for asynchronous functions. The preceding code is typical for Razor Pages.

If you're familiar with ASP.NET apps using controllers and views:

* The `OnPostAsync` code in the preceding example looks similar to typical controller code.
* Most of the MVC primitives like [model binding](../mvc/models/model-binding.md), [validation](../mvc/models/validation.md), and action results work the same with Controllers and Razor Pages. 

The previous `OnPostAsync` method:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_OnPostAsync](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The basic flow of `OnPostAsync`:

Check for validation errors.

* If there are no errors, save the data and redirect.
* If there are errors, show the page again with validation messages. In many cases, validation errors would be detected on the client, and never submitted to the server.

The `Pages/Create.cshtml` view file:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The rendered HTML from `Pages/Create.cshtml`:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create4.html](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

In the previous code, posting the form:

* With valid data:

  * The `OnPostAsync` handler method calls the [Microsoft.AspNetCore.Mvc.RazorPages.PageModel.RedirectToPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageModel.RedirectToPage%252A) helper method. `RedirectToPage` returns an instance of [Microsoft.AspNetCore.Mvc.RedirectToPageResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RedirectToPageResult). `RedirectToPage`:

    * Is an action result.
    * Is similar to `RedirectToAction` or `RedirectToRoute` (used in controllers and views).
    * Is customized for pages. In the preceding sample, it redirects to the root Index page (`/Index`). `RedirectToPage` is detailed in the [URL generation for Pages](#url_gen) section.

* With validation errors that are passed to the server:

  * The `OnPostAsync` handler method calls the [Microsoft.AspNetCore.Mvc.RazorPages.PageBase.Page%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageBase.Page%252A) helper method. `Page` returns an instance of [Microsoft.AspNetCore.Mvc.RazorPages.PageResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageResult). Returning `Page` is similar to how actions in controllers return `View`. `PageResult` is the default return type for a handler method. A handler method that returns `void` renders the page.
  * In the preceding example, posting the form with no value results in [ModelState.IsValid](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.IsValid) returning false. In this sample, no validation errors are displayed on the client. Validation error handling is covered later in this document.

  [Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_OnPostAsync\\&highlight=3-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

* With validation errors detected by client side validation:

  * Data is **not** posted to the server.
  * Client-side validation is explained later in this document.

The `Customer` property uses [`[BindProperty]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.BindPropertyAttribute) attribute to opt in to model binding:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_PageModel\\&highlight=15-16](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

`[BindProperty]` should **not** be used on models containing properties that should not be changed by the client. For more information, see [Overposting](https://learn.microsoft.com/search/?terms=data%2Fef-rp%2Fcrud%23overposting).

Razor Pages, by default, bind properties only with non-`GET` verbs. Binding to properties removes the need to writing code to convert HTTP data to the model type. Binding reduces code by using the same property to render form fields (`<input asp-for="Customer.Name">`) and accept the input.

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


Reviewing the `Pages/Create.cshtml` view file:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml?highlight=3,9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

* In the preceding code, the [input tag helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-input-tag-helper) `<input asp-for="Customer.Name" />` binds the HTML `<input>` element to the `Customer.Name` model expression.
* [`@addTagHelper`](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Ftag-helpers%2Fintro%23addtaghelper-makes-tag-helpers-available) makes Tag Helpers available.

### The home page

`Index.cshtml` is the home page:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The associated `PageModel` class (`Index.cshtml.cs`):

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The `Index.cshtml` file contains the following markup:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml?name=snippet_Edit](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The `<a /a>` [Anchor Tag Helper](../mvc/views/tag-helpers/built-in/anchor-tag-helper.md) used the `asp-route-{value}` attribute to generate a link to the Edit page. The link contains route data with the contact ID. For example, `https://localhost:5001/Edit/1`. [Tag Helpers](../mvc/views/tag-helpers/intro.md) enable server-side code to participate in creating and rendering HTML elements in Razor files.

The `Index.cshtml` file contains markup to create a delete button for each customer contact:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml?name=snippet_Delete](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The rendered HTML:

```html
<button type="submit" formaction="/Customers?id=1&amp;handler=delete">delete</button>
```

When the delete button is rendered in HTML, its [formaction](https://developer.mozilla.org/docs/Web/HTML/Element/button#attr-formaction) includes parameters for:

* The customer contact ID, specified by the `asp-route-id` attribute.
* The `handler`, specified by the `asp-page-handler` attribute.

When the button is selected, a form `POST` request is sent to the server. By convention, the name of the handler method is selected based on the value of the `handler` parameter according to the scheme `OnPost[handler]Async`.

Because the `handler` is `delete` in this example, the `OnPostDeleteAsync` handler method is used to process the `POST` request. If the `asp-page-handler` is set to a different value, such as `remove`, a handler method with the name `OnPostRemoveAsync` is selected.

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Index.cshtml.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The `OnPostDeleteAsync` method:

* Gets the `id` from the query string.
* Queries the database for the customer contact with `FindAsync`.
* If the customer contact is found, it's removed and the database is updated.
* Calls [Microsoft.AspNetCore.Mvc.RazorPages.PageModel.RedirectToPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageModel.RedirectToPage%252A) to redirect to the root Index page (`/Index`).

### The Edit.cshtml file

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Edit.cshtml?highlight=1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The first line contains the `@page "{id:int}"` directive. The routing constraint `"{id:int}"` tells the page to accept requests to the page that contain `int` route data. If a request to the page doesn't contain route data that can be converted to an `int`, the runtime returns an HTTP 404 (not found) error. To make the ID optional, append `?` to the route constraint:

 ```cshtml
@page "{id:int?}"
```

The `Edit.cshtml.cs` file:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Edit.cshtml.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

## Validation

Validation rules:

* Are declaratively specified in the model class.
* Are enforced everywhere in the app.

The [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace provides a set of built-in validation attributes that are applied declaratively to a class or property. DataAnnotations also contains formatting attributes like [`[DataType]`](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) that help with formatting and don't provide any validation.

Consider the `Customer` model:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Models/Customer.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

Using the following `Create.cshtml` view file:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create3.cshtml?highlight=3,8-9,15-99](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The preceding code:

* Includes jQuery and jQuery validation scripts.
* Uses the `<div />` and `<span />` [Tag Helpers](../mvc/views/tag-helpers/intro.md) to enable:

  * Client-side validation.
  * Validation error rendering.

* Generates the following HTML:

  [Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create5.html](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

Posting the Create form without a name value displays the error message "The Name field is required." on the form. If JavaScript is enabled on the client, the browser displays the error without posting to the server.

The `[StringLength(10)]` attribute generates `data-val-length-max="10"` on the rendered HTML. `data-val-length-max` prevents browsers from entering more than the maximum length specified. If a tool such as [Fiddler](https://www.telerik.com/fiddler) is used to edit and replay the post:

* With the name longer than 10.
* The error message "The field Name must be a string with a maximum length of 10." is returned.

Consider the following `Movie` model:

[Code reference unavailable in this source snapshot: index/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/MovieDateRatingDA.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The validation attributes specify behavior to enforce on the model properties they're applied to:

* The `Required` and `MinimumLength` attributes indicate that a property must have a value, but nothing prevents a user from entering white space to satisfy this validation.
* The `RegularExpression` attribute is used to limit what characters can be input. In the preceding code, "Genre":

  * Must only use letters.
  * The first letter is required to be uppercase. White space, numbers, and special
   characters are not allowed.

* The `RegularExpression` "Rating":

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a "Genre".

* The `Range` attribute constrains a value to within a specified range.
* The `StringLength` attribute sets the maximum length of a string property, and optionally its minimum length.
* Value types (such as `decimal`, `int`, `float`, `DateTime`) are inherently required and don't need the `[Required]` attribute.

The Create page for the `Movie` model shows displays errors with invalid values:

Movie view form with multiple jQuery client-side validation errors

For more information, see:

* [Add validation to the Movie app](../tutorials/razor-pages/validation.md)
* [Model validation in ASP.NET Core](../mvc/models/validation.md).

## Handle HEAD requests with an OnGet handler fallback

`HEAD` requests allow retrieving the headers for a specific resource. Unlike `GET` requests, `HEAD` requests don't return a response body.

Ordinarily, an `OnHead` handler is created and called for `HEAD` requests:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Privacy.cshtml.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

Razor Pages falls back to calling the `OnGet` handler if no `OnHead` handler is defined.

<a name="xsrf"></a>

## XSRF/CSRF and Razor Pages

Razor Pages are protected by [Antiforgery validation](../security/anti-request-forgery.md). The [FormTagHelper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-form-tag-helper) injects antiforgery tokens into HTML form elements.

<a name="layout"></a>

## Using Layouts, partials, templates, and Tag Helpers with Razor Pages

Pages work with all the capabilities of the Razor view engine. Layouts, partials, templates, Tag Helpers, `_ViewStart.cshtml`, and `_ViewImports.cshtml` work in the same way they do for conventional Razor views.

Let's declutter this page by taking advantage of some of those capabilities.

Add a [layout page](../mvc/views/layout.md) to `Pages/Shared/_Layout.cshtml`:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Shared/_Layout2.cshtml?highlight=12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The [Layout](../mvc/views/layout.md):

* Controls the layout of each page (unless the page opts out of layout).
* Imports HTML structures such as JavaScript and stylesheets.
* The contents of the Razor page are rendered where `@RenderBody()` is called.

For more information, see [layout page](../mvc/views/layout.md).

The [Layout](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Flayout%23specifying-a-layout) property is set in `Pages/_ViewStart.cshtml`:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesContacts2/Pages/_ViewStart.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The layout is in the *Pages/Shared* folder. Pages look for other views (layouts, templates, partials) hierarchically, starting in the same folder as the current page. A layout in the *Pages/Shared* folder can be used from any Razor page under the *Pages* folder.

The layout file should go in the *Pages/Shared* folder.

We recommend you **not** put the layout file in the *Views/Shared* folder. *Views/Shared* is an MVC views pattern. Razor Pages are meant to rely on folder hierarchy, not path conventions.

View search from a Razor Page includes the *Pages* folder. The layouts, templates, and partials used with MVC controllers and conventional Razor views *just work*.

Add a `Pages/_ViewImports.cshtml` file:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesContacts2/Pages/_ViewImports.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

`@namespace` is explained later in the tutorial. The `@addTagHelper` directive brings in the [built-in Tag Helpers](../mvc/views/tag-helpers/built-in/index.md) to all the pages in the *Pages* folder.

<a name="namespace"></a>

The `@namespace` directive set on a page:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesIntro/Pages/Customers/Namespace2.cshtml?highlight=2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The `@namespace` directive sets the namespace for the page. The `@model` directive doesn't need to include the namespace.

When the `@namespace` directive is contained in `_ViewImports.cshtml`, the specified namespace supplies the prefix for the generated namespace in the Page that imports the `@namespace` directive. The rest of the generated namespace (the suffix portion) is the dot-separated relative path between the folder containing `_ViewImports.cshtml` and the folder containing the page.

For example, the `PageModel` class `Pages/Customers/Edit.cshtml.cs` explicitly sets the namespace:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/Edit.cshtml.cs?name=snippet_namespace](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The `Pages/_ViewImports.cshtml` file sets the following namespace:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesContacts2/Pages/_ViewImports.cshtml?highlight=1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The generated namespace for the `Pages/Customers/Edit.cshtml` Razor Page is the same as the `PageModel` class.

`@namespace` *also works with conventional Razor views.*

Consider the `Pages/Create.cshtml` view file:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create3.cshtml?highlight=2-3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The updated `Pages/Create.cshtml` view file with `_ViewImports.cshtml` and the preceding layout file:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create4.cshtml?highlight=2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

In the preceding code, the `_ViewImports.cshtml` imported the namespace and Tag Helpers. The layout file imported the JavaScript files.

The [Razor Pages starter project](#rpvs17) contains the `Pages/_ValidationScriptsPartial.cshtml`, which hooks up client-side validation.

For more information on partial views, see [mvc/views/partial](../mvc/views/partial.md).

<a name="url_gen"></a>

## URL generation for Pages

The `Create` page, shown previously, uses `RedirectToPage`:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create.cshtml.cs?name=snippet_PageModel\\&highlight=28](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The app has the following file/folder structure:

* */Pages*

  * `Index.cshtml`
  * `Privacy.cshtml`
  * */Customers*

    * `Create.cshtml`
    * `Edit.cshtml`
    * `Index.cshtml`

The `Pages/Customers/Create.cshtml` and `Pages/Customers/Edit.cshtml` pages redirect to `Pages/Customers/Index.cshtml` after success. The string `./Index` is a relative page name used to access the preceding page. It is used to generate URLs to the `Pages/Customers/Index.cshtml` page. For example:

* `Url.Page("./Index", ...)`
* `<a asp-page="./Index">Customers Index Page</a>`
* `RedirectToPage("./Index")`

The absolute page name `/Index` is used to generate URLs to the `Pages/Index.cshtml` page. For example:

* `Url.Page("/Index", ...)`
* `<a asp-page="/Index">Home Index Page</a>`
* `RedirectToPage("/Index")`

The page name is the path to the page from the root */Pages* folder including a leading `/` (for example, `/Index`). The preceding URL generation samples offer enhanced options and functional capabilities over hard-coding a URL. URL generation uses [routing](../mvc/controllers/routing.md) and can generate and encode parameters according to how the route is defined in the destination path.

URL generation for pages supports relative names. The following table shows which Index page is selected using different `RedirectToPage` parameters in `Pages/Customers/Create.cshtml`.

| RedirectToPage(x) | Page |
| --- | --- |
| RedirectToPage("/Index") | *Pages/Index* |
| RedirectToPage("./Index"); | *Pages/Customers/Index* |
| RedirectToPage("../Index") | *Pages/Index* |
| RedirectToPage("Index") | *Pages/Customers/Index* |

<!-- Test via ~/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Details.cshtml.cs -->

`RedirectToPage("Index")`, `RedirectToPage("./Index")`, and `RedirectToPage("../Index")` are *relative names*. The `RedirectToPage` parameter is *combined* with the path of the current page to compute the name of the destination page.

Relative name linking is useful when building sites with a complex structure. When relative names are used to link between pages in a folder:

* Renaming a folder doesn't break the relative links.
* Links are not broken because they don't include the folder name.

To redirect to a page in a different [Area](../mvc/controllers/areas.md), specify the area:

```csharp
RedirectToPage("/Index", new { area = "Services" });
```

For more information, see [mvc/controllers/areas](../mvc/controllers/areas.md) and [razor-pages/razor-pages-conventions](razor-pages-conventions.md).

## ViewData attribute

Data can be passed to a page with [Microsoft.AspNetCore.Mvc.ViewDataAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewDataAttribute). Properties with the `[ViewData]` attribute have their values stored and loaded from the [Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary).

In the following example, the `AboutModel` applies the `[ViewData]` attribute to the `Title` property:

```csharp
public class AboutModel : PageModel
{
    [ViewData]
    public string Title { get; } = "About";

    public void OnGet()
    {
    }
}
```

In the About page, access the `Title` property as a model property:

```cshtml
<h1>@Model.Title</h1>
```

In the layout, the title is read from the ViewData dictionary:

```cshtml
<!DOCTYPE html>
<html lang="en">
<head>
    <title>@ViewData["Title"] - WebApplication</title>
    ...
```

## TempData

ASP.NET Core exposes the [Microsoft.AspNetCore.Mvc.Controller.TempData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Controller.TempData). This property stores data until it's read. The [Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Keep%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Keep%252A) and [Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Peek%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Peek%252A) methods can be used to examine the data without deletion. `TempData` is useful for redirection, when data is needed for more than a single request.

The following code sets the value of `Message` using `TempData`:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateDot.cshtml.cs?highlight=10-11,25\\&name=snippet_Temp](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The following markup in the `Pages/Customers/Index.cshtml` file displays the value of `Message` using `TempData`.

```cshtml
<h3>Msg: @Model.Message</h3>
```

The `Pages/Customers/Index.cshtml.cs` page model applies the `[TempData]` attribute to the `Message` property.

```csharp
[TempData]
public string Message { get; set; }
```

For more information, see [TempData](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata).

<a name="mhpp"></a>

## Multiple handlers per page

The following page generates markup for two handlers using the `asp-page-handler` Tag Helper:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateFATH.cshtml?highlight=12-13](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The form in the preceding example has two submit buttons, each using the `FormActionTagHelper` to submit to a different URL. The `asp-page-handler` attribute is a companion to `asp-page`. `asp-page-handler` generates URLs that submit to each of the handler methods defined by a page. `asp-page` isn't specified because the sample is linking to the current page.

The page model:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateFATH.cshtml.cs?highlight=20,32](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

The preceding code uses *named handler methods*. Named handler methods are created by taking the text in the name after `On<HTTP Verb>` and before `Async` (if present). In the preceding example, the page methods are OnPost**JoinList**Async and OnPost**JoinListUC**Async. With *OnPost* and *Async* removed, the handler names are `JoinList` and `JoinListUC`.

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateFATH.cshtml?name=snippet_Handlers](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

Using the preceding code, the URL path that submits to `OnPostJoinListAsync` is `https://localhost:5001/Customers/CreateFATH?handler=JoinList`. The URL path that submits to `OnPostJoinListUCAsync` is `https://localhost:5001/Customers/CreateFATH?handler=JoinListUC`.

## Custom routes

Use the `@page` directive to:

* Specify a custom route to a page. For example, the route to the About page can be set to `/Some/Other/Path` with `@page "/Some/Other/Path"`.
* Append segments to a page's default route. For example, an "item" segment can be added to a page's default route with `@page "item"`.
* Append parameters to a page's default route. For example, an ID parameter, `id`, can be required for a page with `@page "{id}"`.

A root-relative path designated by a tilde (`~`) at the beginning of the path is supported. For example, `@page "~/Some/Other/Path"` is the same as `@page "/Some/Other/Path"`.

If you don't like the query string `?handler=JoinList` in the URL, change the route to put the handler name in the path portion of the URL. The route can be customized by adding a route template enclosed in double quotes after the `@page` directive.

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateRoute.cshtml?highlight=1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

Using the preceding code, the URL path that submits to `OnPostJoinListAsync` is `https://localhost:5001/Customers/CreateFATH/JoinList`. The URL path that submits to `OnPostJoinListUCAsync` is `https://localhost:5001/Customers/CreateFATH/JoinListUC`.

The `?` following `handler` means the route parameter is optional.

## Advanced configuration and settings

The configuration and settings in following sections is not required by most apps.

To configure advanced options, use the [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages%252A) overload that configures [Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions):

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/StartupRPoptions.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

Use the [Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions) to set the root directory for pages, or add application model conventions for pages. For more information on conventions, see [Razor Pages authorization conventions](security/authorization/conventions.md).

To precompile views, see [Razor view compilation](../mvc/views/view-compilation.md).

### Specify that Razor Pages are at the content root

By default, Razor Pages are rooted in the */Pages* directory. Add [Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcBuilderExtensions.WithRazorPagesAtContentRoot%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcBuilderExtensions.WithRazorPagesAtContentRoot%252A) to specify that your Razor Pages are at the [content root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23content-root) ([Microsoft.AspNetCore.Hosting.IHostingEnvironment.ContentRootPath](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IHostingEnvironment.ContentRootPath)) of the app:

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/StartupWithRazorPagesAtContentRoot.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

### Specify that Razor Pages are at a custom root directory

Add [Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcCoreBuilderExtensions.WithRazorPagesRoot%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcCoreBuilderExtensions.WithRazorPagesRoot%252A) to specify that Razor Pages are at a custom root directory in the app (provide a relative path):

[Code reference unavailable in this source snapshot: index/includes/~/razor-pages/index/3.0sample/RazorPagesContacts/StartupWithRazorPagesRoot.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/index.md)

## Additional resources

* See [Get started with Razor Pages](../tutorials/razor-pages/razor-pages-start.md), which builds on this introduction.
* [`[Authorize]` attribute in Razor Pages apps](https://learn.microsoft.com/search/?terms=razor-pages%2Fsecurity%2Fauthorization%2Fsimple%23authorize-attribute-in-razor-pages-apps)
* [Download or view sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/razor-pages/index/3.0sample)
* [index](../overview.md)
* [mvc/views/razor](../mvc/views/razor.md)
* [mvc/controllers/areas](../mvc/controllers/areas.md)
* [tutorials/razor-pages/razor-pages-start](../tutorials/razor-pages/razor-pages-start.md)
* [razor-pages/security/authorization/conventions](security/authorization/conventions.md)
* [razor-pages/razor-pages-conventions](razor-pages-conventions.md)
* [test/razor-pages-tests](../test/razor-pages-tests.md)
* [mvc/views/partial](../mvc/views/partial.md)
