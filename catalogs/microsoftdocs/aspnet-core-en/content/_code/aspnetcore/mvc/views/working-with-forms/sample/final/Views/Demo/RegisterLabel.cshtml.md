# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Demo/RegisterLabel.cshtml

Complete source file; linked examples may select a region or line range.

```
@model SimpleViewModel

<form asp-controller="Demo" asp-action="RegisterLabel" method="post">
    <label asp-for="Email"></label>
    <input asp-for="Email" /> <br />
</form>
```
