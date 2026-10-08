# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Home/IndexEnum.cshtml

Complete source file; linked examples may select a region or line range.

```
@model CountryEnumViewModel

<form asp-controller="Home" asp-action="IndexEnum" method="post">
    <select asp-for="EnumCountry" 
            asp-items="Html.GetEnumSelectList<CountryEnum>()">
    </select> 
    <br /><button type="submit">Register</button>
</form>

```
