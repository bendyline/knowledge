# Source code: aspnetcore/mvc/controllers/areas/samples/RPareas/Areas/Products/Pages/About.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model AboutModel
@{
    ViewData["Title"] = "Prod About";
}

<h2>Products/About</h2>

<a asp-area="Services" asp-page="/Manage/About">
    Services/Manage/About
</a>
```
