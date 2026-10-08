# Source code: aspnetcore/razor-pages/filter/sample/PageFilter/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page "{id:int?}"
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<h2>@ViewData["Title"]</h2>
<h3>@Model.Message</h3>

<p>Simplified Index page.</p>
```
