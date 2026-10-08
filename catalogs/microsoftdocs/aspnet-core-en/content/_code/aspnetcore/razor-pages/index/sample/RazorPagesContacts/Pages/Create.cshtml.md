# Source code: aspnetcore/razor-pages/index/sample/RazorPagesContacts/Pages/Create.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model RazorPagesContacts.Pages.CreateModel
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<html>
<body>
    <p>
        Enter your name.
    </p>
    <div asp-validation-summary="All"></div>
    <form method="POST">
        <div><label>Name: <input asp-for="Customer.Name" /></label></div>
        <input type="submit" />
    </form>
</body>
</html>
```
