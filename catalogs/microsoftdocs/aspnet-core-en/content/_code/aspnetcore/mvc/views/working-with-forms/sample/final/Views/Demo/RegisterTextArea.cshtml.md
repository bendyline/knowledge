# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Demo/RegisterTextArea.cshtml

Complete source file; linked examples may select a region or line range.

```
@model DescriptionViewModel

<form asp-controller="Demo" asp-action="RegisterTextArea" method="post">
    <textarea asp-for="Description"></textarea>
    <button type="submit">Test</button>
</form>
```
