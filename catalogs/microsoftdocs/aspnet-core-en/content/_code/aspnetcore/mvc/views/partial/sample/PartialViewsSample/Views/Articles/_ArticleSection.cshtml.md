# Source code: aspnetcore/mvc/views/partial/sample/PartialViewsSample/Views/Articles/_ArticleSection.cshtml

Complete source file; linked examples may select a region or line range.

```
@using PartialViewsSample.ViewModels
@model ArticleSection

<h3>@Model.Title Index: @ViewData["index"]</h3>
<div>
    @Model.Content
</div>

```
