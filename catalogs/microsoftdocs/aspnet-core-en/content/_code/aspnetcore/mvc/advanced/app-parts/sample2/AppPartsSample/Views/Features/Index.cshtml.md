# Source code: aspnetcore/mvc/advanced/app-parts/sample2/AppPartsSample/Views/Features/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@{
    ViewData["Title"] = "Home Page";
}
@model FeaturesViewModel

<h1>Features</h1>

<b>Controllers:</b>
<div class="pre-scrollable" style="max-height:100px">
    <ul>
        @foreach (var item in Model.Controllers)
        {
            <li>@item.Name</li>
        }
    </ul>
</div>

<b>Tag Helpers:</b>
<div class="pre-scrollable" style="max-height: 100px">
    <ul>
        @foreach (var item in Model.TagHelpers)
        {
            <li>@item.Name</li>
        }
    </ul>
</div>
<b>View Components:</b>
<div class="pre-scrollable" style="max-height: 100px">
    <ul>
        @foreach (var item in Model.ViewComponents)
            {
            <li>@item.Name</li>
        }
    </ul>
</div>
<a asp-controller="Home">Home</a>

```
