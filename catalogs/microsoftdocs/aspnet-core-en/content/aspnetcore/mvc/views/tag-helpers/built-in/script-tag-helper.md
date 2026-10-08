---
title: Script Tag Helper in ASP.NET Core
author: tdykstra
ms.author: tdykstra
description: Discover the ASP.NET Core Script Tag Helper attributes and the role each attribute plays in extending behavior of the HTML Script tag.
ms.date: 9/12/2024
uid: mvc/views/tag-helpers/builtin-th/script-tag-helper
---
# Script Tag Helper in ASP.NET Core

By [Rick Anderson](https://twitter.com/RickAndMSFT)

The [Script Tag Helper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper) generates a link to a primary or fall back script file. Typically the primary script file is on a [Content Delivery Network](https://learn.microsoft.com/office365/enterprise/content-delivery-networks#what-exactly-is-a-cdn) (CDN).

A CDN:

* Provides several [performance advantages](https://learn.microsoft.com/office365/enterprise/content-delivery-networks#how-do-cdns-make-services-work-faster) vs hosting the asset with the web app.
* Should not be relied on as the only source for the asset. CDNs are not always available, therefore a reliable fallback should be used. Typically the fallback is the site hosting the web app.

The Script Tag Helper allows you to specify a CDN for the script file and a fallback when the CDN is not available. The Script Tag Helper provides the performance advantage of a CDN with the robustness of local hosting.

The following Razor markup shows a `script` element with a fallback:

```html
<script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-3.3.1.js"
        asp-fallback-src="~/lib/jquery/dist/jquery.js"
        asp-fallback-test="window.jQuery"
        crossorigin="anonymous"
        integrity="sha384-tsQFqpEReu7ZLhBV2VZlAu7zcOV+rXbYlF2cqB8txI/8aZajjp4Bqd+V6D5IgvKT">
</script>
```

Don't use the `<script>` element's [defer](https://developer.mozilla.org/docs/Web/HTML/Element/script) attribute to defer loading the CDN script. The Script Tag Helper renders JavaScript that immediately executes the [asp-fallback-test](#asp-fallback-test) expression. The expression fails if loading the CDN script is deferred.

## Commonly used Script Tag Helper attributes

See [Script Tag Helper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper) for all the Script Tag Helper attributes, properties, and methods.

### src

Address of the external script to use.

### asp-append-version

When `asp-append-version` is specified with a `true` value along with a [`src`](https://github.com/dotnet/aspnetcore/blob/main/src/Mvc/Mvc.TagHelpers/src/ScriptTagHelper.cs#L116) attribute, a unique version is generated.


For a Tag Helper to generate a version for a static file outside `wwwroot`, see [Serve files from multiple locations](https://learn.microsoft.com/search/?terms=fundamentals%2Fstatic-files%23serve-files-from-multiple-locations)

### asp-fallback-src

The URL of a Script tag to fallback to in the case the primary one fails.

### asp-fallback-src-exclude

A comma-separated list of globbed file patterns of JavaScript scripts to exclude from the fallback list, in the case the primary one fails. The glob patterns are assessed relative to the application's `webroot` setting. Must be used in conjunction with `asp-fallback-src-include`.

### asp-fallback-src-include

A comma-separated list of globbed file patterns of JavaScript scripts to fallback to in the case the primary one fails. The glob patterns are assessed relative to the application's `webroot` setting.

### asp-fallback-test

The script method defined in the primary script to use for the fallback test. For more information, see [Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper.FallbackTestExpression](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper.FallbackTestExpression).

### asp-order

When a set of `ITagHelper` instances are executed, their `Init(TagHelperContext)` methods are first invoked in the specified order; then their `ProcessAsync(TagHelperContext, TagHelperOutput)` methods are invoked in the specified order. Lower values are executed first.

### asp-src-exclude

A comma-separated list of globbed file patterns of JavaScript scripts to exclude from loading. The glob patterns are assessed relative to the application's `webroot` setting. Must be used in conjunction with `asp-src-include`.

### asp-src-include

A comma-separated list of globbed file patterns of JavaScript scripts to load. The glob patterns are assessed relative to the application's `webroot` setting.

### asp-suppress-fallback-integrity

Boolean value that determines if an integrity hash will be compared with the asp-fallback-src value.

## Additional resources

* [mvc/views/tag-helpers/intro](../intro.md)
* [mvc/controllers/areas](../../../controllers/areas.md)
* [razor-pages/index](../../../../razor-pages/index.md)
* [mvc/compatibility-version](../../../compatibility-version.md)
