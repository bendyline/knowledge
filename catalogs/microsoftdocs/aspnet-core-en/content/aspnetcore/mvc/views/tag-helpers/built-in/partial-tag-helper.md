---
title: Partial Tag Helper in ASP.NET Core
author: wadepickett
description: Discover the ASP.NET Core Partial Tag Helper and the role each of its attributes play in rendering a partial view.
monikerRange: '>= aspnetcore-2.1'
ms.author: wpickett
ms.date: 04/06/2019
uid: mvc/views/tag-helpers/builtin-th/partial-tag-helper
---
# Partial Tag Helper in ASP.NET Core

By [Scott Addie](https://github.com/scottaddie)

For an overview of Tag Helpers, see [mvc/views/tag-helpers/intro](../intro.md).

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/views/tag-helpers/built-in/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Overview

The Partial Tag Helper is used for rendering a [partial view](../../partial.md) in Razor Pages and MVC apps. Consider that it:

* Requires ASP.NET Core 2.1 or later.
* Is an alternative to [HTML Helper syntax](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fpartial%23reference-a-partial-view).
* Renders the partial view asynchronously.

The HTML Helper options for rendering a partial view include:

* [`@await Html.PartialAsync`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Rendering.HtmlHelperPartialExtensions.PartialAsync%252A)
* [`@await Html.RenderPartialAsync`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Rendering.HtmlHelperPartialExtensions.RenderPartialAsync%252A)
* [`@Html.Partial`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Rendering.HtmlHelperPartialExtensions.Partial%252A)
* [`@Html.RenderPartial`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Rendering.HtmlHelperPartialExtensions.RenderPartial%252A)

The *Product* model is used in samples throughout this document:

[Code example (complete source file; reference: samples/TagHelpersBuiltIn/Models/Product.cs)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Models/Product.cs.md)

An inventory of the Partial Tag Helper attributes follows.

## name

The `name` attribute is required. It indicates the name or the path of the partial view to be rendered. When a partial view name is provided, the [view discovery](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Foverview%23view-discovery) process is initiated. That process is bypassed when an explicit path is provided. For all acceptable `name` values, see [Partial view discovery](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fpartial%23partial-view-discovery).

The following markup uses an explicit path, indicating that `_ProductPartial.cshtml` is to be loaded from the *Shared* folder. Using the [for](#for) attribute, a model is passed to the partial view for binding.

[Code example (complete source file; reference: samples/TagHelpersBuiltIn/Pages/Product.cshtml?name=snippet_Name)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Product.cshtml.md)

## for

The `for` attribute assigns a [Microsoft.AspNetCore.Mvc.ViewFeatures.ModelExpression](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewFeatures.ModelExpression) to be evaluated against the current model. A `ModelExpression` infers the `@Model.` syntax. For example, `for="Product"` can be used instead of `for="@Model.Product"`. This default inference behavior is overridden by using the `@` symbol to define an inline expression.

The following markup loads `_ProductPartial.cshtml`:

[Code example (complete source file; reference: samples/TagHelpersBuiltIn/Pages/Product.cshtml?name=snippet_For)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Product.cshtml.md)

The partial view is bound to the associated page model's `Product` property:

[Code example (complete source file; reference: samples/TagHelpersBuiltIn/Pages/Product.cshtml.cs?highlight=8)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Product.cshtml.cs.md)

## model

The `model` attribute assigns a model instance to pass to the partial view. The `model` attribute can't be used with the [for](#for) attribute.

In the following markup, a new `Product` object is instantiated and passed to the `model` attribute for binding:

[Code example (complete source file; reference: samples/TagHelpersBuiltIn/Pages/Product.cshtml?name=snippet_Model)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Product.cshtml.md)

## view-data

The `view-data` attribute assigns a [Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary) to pass to the partial view. The following markup makes the entire ViewData collection accessible to the partial view:

[Code example (complete source file; reference: samples/TagHelpersBuiltIn/Pages/Product.cshtml?name=snippet_ViewData\&highlight=5-)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Product.cshtml.md)

In the preceding code, the `IsNumberReadOnly` key value is set to `true` and added to the ViewData collection. Consequently, `ViewData["IsNumberReadOnly"]` is made accessible within the following partial view:

[Code example (complete source file; reference: samples/TagHelpersBuiltIn/Pages/Shared/\_ProductViewDataPartial.cshtml?highlight=5)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Shared/_ProductViewDataPartial.cshtml.md)

In this example, the value of `ViewData["IsNumberReadOnly"]` determines whether the *Number* field is displayed as read only.

## Migrate from an HTML Helper

Consider the following asynchronous HTML Helper example. A collection of products is iterated and displayed. Per the `PartialAsync` method's first parameter, the `_ProductPartial.cshtml` partial view is loaded. An instance of the `Product` model is passed to the partial view for binding.

[Code example (complete source file; reference: samples/TagHelpersBuiltIn/Pages/Products.cshtml?name=snippet_HtmlHelper\&highlight=3)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Products.cshtml.md)

The following Partial Tag Helper achieves the same asynchronous rendering behavior as the `PartialAsync` HTML Helper. The `model` attribute is assigned a `Product` model instance for binding to the partial view.

[Code example (complete source file; reference: samples/TagHelpersBuiltIn/Pages/Products.cshtml?name=snippet_TagHelper\&highlight=3)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Products.cshtml.md)

## Additional resources

* [mvc/views/partial](../../partial.md)
* [mvc/views/overview#weakly-typed-data-viewdata-viewdata-attribute-and-viewbag](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Foverview%23weakly-typed-data-viewdata-viewdata-attribute-and-viewbag)
