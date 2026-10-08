# Source code: aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateDot.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model CreateDotModel

<html>
<body>
    <p>
        RedirectToPage("./Index");
    </p>
    <div asp-validation-summary="All"></div>
    <form method="POST">
        <div><label>Name: <input asp-for="Customer.Name" /></label></div>
        <input type="submit" />
    </form>
</body>
</html>
```
