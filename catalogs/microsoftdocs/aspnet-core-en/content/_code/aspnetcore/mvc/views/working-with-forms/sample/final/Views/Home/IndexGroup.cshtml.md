# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Home/IndexGroup.cshtml

Complete source file; linked examples may select a region or line range.

```
@model CountryViewModelGroup

<form asp-controller="Home" asp-action="IndexGroup" method="post">
    <select asp-for="Country" asp-items="Model.Countries"></select> 
    <br /><button type="submit">Register</button>
</form>

```
