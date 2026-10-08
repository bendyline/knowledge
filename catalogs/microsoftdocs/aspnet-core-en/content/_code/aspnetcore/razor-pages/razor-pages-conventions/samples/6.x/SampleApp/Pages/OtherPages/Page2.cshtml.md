# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/6.x/SampleApp/Pages/OtherPages/Page2.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model Page2Model
@{
    ViewData["Title"] = "OtherPages/Page2";
}

<h1>@ViewData["Title"]</h1>
<h2>@Model.Message</h2>

<p>@Model.RouteDataGlobalTemplateValue</p>

<p>@Model.RouteDataOtherPagesTemplateValue</p>

```
