# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Home/IndexOption.cshtml

Complete source file; linked examples may select a region or line range.

```
@model CountryViewModel

<form asp-controller="Home" asp-action="IndexEmpty" method="post">
    <select asp-for="Country">
        <option value="">&lt;none&gt;</option>
        <option value="MX">Mexico</option>
        <option value="CA">Canada</option>
        <option value="US">USA</option>
    </select> 
    <br /><button type="submit">Register</button>
</form>

```
