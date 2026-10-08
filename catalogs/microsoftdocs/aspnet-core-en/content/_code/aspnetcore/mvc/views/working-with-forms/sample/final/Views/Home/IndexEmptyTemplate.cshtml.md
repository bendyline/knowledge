# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Home/IndexEmptyTemplate.cshtml

Complete source file; linked examples may select a region or line range.

```
@model CountryViewModel

<form asp-controller="Home" asp-action="IndexEmpty" method="post">
    @Html.EditorForModel()
    <br /><button type="submit">Register</button>
</form>
```
