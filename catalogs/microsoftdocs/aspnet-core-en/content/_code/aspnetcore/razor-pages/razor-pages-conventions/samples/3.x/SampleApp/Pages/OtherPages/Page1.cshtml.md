# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/3.x/SampleApp/Pages/OtherPages/Page1.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model Page1Model
@{
    ViewData["Title"] = "OtherPages/Page1";
}

<h1>@ViewData["Title"]</h1>
<h2>@Model.Message</h2>

<p>@Model.RouteDataGlobalTemplateValue</p>

<p>@Model.RouteDataOtherPagesTemplateValue</p>

```
