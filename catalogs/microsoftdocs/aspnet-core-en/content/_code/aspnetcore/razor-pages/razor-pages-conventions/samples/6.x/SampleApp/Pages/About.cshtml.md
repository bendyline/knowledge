# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/6.x/SampleApp/Pages/About.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model AboutModel
@{
    ViewData["Title"] = "About";
}

<h1>@ViewData["Title"]</h1>
<h2>@Model.Message</h2>

<p>Use this area to provide additional information.</p>

<p>@Model.RouteDataGlobalTemplateValue</p>

<p>@Model.RouteDataAboutTemplateValue</p>

```
