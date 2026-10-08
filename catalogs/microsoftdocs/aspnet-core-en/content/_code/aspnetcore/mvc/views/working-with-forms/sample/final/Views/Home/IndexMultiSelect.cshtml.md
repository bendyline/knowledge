# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Home/IndexMultiSelect.cshtml

Complete source file; linked examples may select a region or line range.

```
@model CountryViewModelIEnumerable

<form asp-controller="Home" asp-action="IndexMultiSelect" method="post">
    <select asp-for="CountryCodes" asp-items="Model.Countries"></select> 
    <br /><button type="submit">Register</button>
</form>

```
