# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/6.x/SampleApp/Pages/OtherPages/Page3.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model Page3Model
@{
    ViewData["Title"] = "OtherPages/Page3";
}

<h1>@ViewData["Title"]</h1>
<h2>@Model.Message</h2>

<p>@Model.RouteDataGlobalTemplateValue</p>

<p>@Model.RouteDataOtherPagesTemplateValue</p>

```
