# Source code: aspnetcore/razor-pages/index/3.0sample/RazorPagesContacts/Pages/Customers/Create2.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model RazorPagesContacts.Pages.Customers.Create2Model
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<p>customer name page 2:</p>

<form method="post">
    Name:
    <input asp-for="Customer.Name" />
    <input type="submit" />
</form>
```
