---
title: Link Tag Helper in ASP.NET Core
author: tdykstra
ms.author: tdykstra
description: Discover the ASP.NET Core Link Tag Helper attributes and the role each attribute plays in extending behavior of the HTML Link tag.
ms.date: 09/24/2019
uid: mvc/views/tag-helpers/builtin-th/link-tag-helper
---
# Link Tag Helper in ASP.NET Core

By [Rick Anderson](https://twitter.com/RickAndMSFT)

The [Link Tag Helper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper) generates a link to a primary or fall back CSS file. Typically the primary CSS file is on a [Content Delivery Network](https://learn.microsoft.com/office365/enterprise/content-delivery-networks#what-exactly-is-a-cdn) (CDN).

A CDN:

* Provides several [performance advantages](https://learn.microsoft.com/office365/enterprise/content-delivery-networks#how-do-cdns-make-services-work-faster) vs hosting the asset with the web app.
* Should not be relied on as the only source for the asset. CDNs are not always available, therefore a reliable fallback should be used. Typically the fallback is the site hosting the web app.

The Link Tag Helper allows you to specify a CDN for the CSS file and a fallback when the CDN is not available. The Link Tag Helper provides the performance advantage of a CDN with the robustness of local hosting.

The following Razor markup shows the `head` element of a layout file created with the ASP.NET Core web app template:

[Code example (complete source file; reference: link-tag-helper/sample/\_Layout.cshtml?name=snippet)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/link-tag-helper/sample/_Layout.cshtml.md)

The following is rendered HTML from the preceding code (in a non-`Development` environment):

[Code example (complete source file; reference: link-tag-helper/sample/HtmlPage1.html)](../../../../../_code/aspnetcore/mvc/views/tag-helpers/built-in/link-tag-helper/sample/HtmlPage1.html.md)

In the preceding code, the Link Tag Helper generated the `<meta name="x-stylesheet-fallback-test" content="" class="sr-only" />` element and the following JavaScript which is used to verify the requested `bootstrap.css` file is available on the CDN. In this case, the CSS file was available so the Tag Helper generated the `<link />` element with the CDN CSS file.

## Commonly used Link Tag Helper attributes

See [Link Tag Helper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper)  for all the Link Tag Helper attributes, properties, and methods.

### href

Preferred address of the linked resource. The address is passed thought to the generated HTML in all cases.

### asp-fallback-href

The URL of a CSS stylesheet to fallback to in the case the primary URL fails.

### asp-fallback-test-class

The class name defined in the stylesheet to use for the fallback test. For more information, see [Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper.FallbackTestClass](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper.FallbackTestClass).

### asp-fallback-test-property

The CSS property name to use for the fallback test. For more information, see [Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper.FallbackTestProperty](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper.FallbackTestProperty).

### asp-fallback-test-value

The CSS property value to use for the fallback test. For more information, see [Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper.FallbackTestValue](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper.FallbackTestValue).

## Additional resources

* [mvc/views/tag-helpers/intro](../intro.md)
* [mvc/controllers/areas](../../../controllers/areas.md)
* [razor-pages/index](../../../../razor-pages/index.md)
* [mvc/compatibility-version](../../../compatibility-version.md)
