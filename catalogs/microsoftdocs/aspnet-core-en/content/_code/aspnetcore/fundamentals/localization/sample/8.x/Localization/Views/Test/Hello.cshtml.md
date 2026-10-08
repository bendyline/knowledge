# Source code: aspnetcore/fundamentals/localization/sample/8.x/Localization/Views/Test/Hello.cshtml

Complete source file; linked examples may select a region or line range.

```
@using Microsoft.AspNetCore.Mvc.Localization

@inject IViewLocalizer Localizer

@{
    ViewData["Title"] = Localizer["About"];
}
<h2>@ViewData["Title"].</h2>
<h3>@ViewData["Message"]</h3>

<p>@Localizer["Use this area to provide additional information."]</p>

```
