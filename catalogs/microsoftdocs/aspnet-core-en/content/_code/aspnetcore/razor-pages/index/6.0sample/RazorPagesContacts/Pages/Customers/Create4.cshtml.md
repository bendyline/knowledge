# Source code: aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Pages/Customers/Create4.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model CreateModel

<p>Enter a customer name:</p>

<form method="post">
    Name:
    <input asp-for="Customer!.Name" />
    <input type="submit" />
</form>

```
