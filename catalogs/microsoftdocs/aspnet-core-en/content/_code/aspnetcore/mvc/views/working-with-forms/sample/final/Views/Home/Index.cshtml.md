# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Home/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@model CountryViewModel

<form asp-controller="Home" asp-action="Index" method="post">
    <select asp-for="Country" asp-items="Model.Countries"></select> 
    <br /><button type="submit">Register</button>
</form>

```
