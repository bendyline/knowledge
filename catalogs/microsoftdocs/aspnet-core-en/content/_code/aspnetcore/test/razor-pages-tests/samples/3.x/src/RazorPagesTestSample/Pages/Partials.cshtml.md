# Source code: aspnetcore/test/razor-pages-tests/samples/3.x/src/RazorPagesTestSample/Pages/Partials.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model RazorPagesTestSample.Pages.PartialsModel
@{
    ViewData["Title"] = "Partial Page Sample";
}

<h1>@ViewData["Title"]</h1>

<a asp-page-handler="Partial">Get Partial</a>

```
