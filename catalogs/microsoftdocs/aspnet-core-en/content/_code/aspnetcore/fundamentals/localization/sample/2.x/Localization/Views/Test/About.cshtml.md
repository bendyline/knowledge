# Source code: aspnetcore/fundamentals/localization/sample/2.x/Localization/Views/Test/About.cshtml

Complete source file; linked examples may select a region or line range.

```
@using Microsoft.AspNetCore.Mvc.Localization
@using Localization.Services

@inject IViewLocalizer Localizer
@inject IHtmlLocalizer<SharedResource> SharedLocalizer

@{
    ViewData["Title"] = Localizer["About"];
}
<h2>@ViewData["Title"].</h2>

<h1>@SharedLocalizer["Hello!"]</h1>

```
