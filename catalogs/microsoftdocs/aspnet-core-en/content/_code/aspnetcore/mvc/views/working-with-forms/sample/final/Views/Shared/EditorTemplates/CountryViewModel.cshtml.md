# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Shared/EditorTemplates/CountryViewModel.cshtml

Complete source file; linked examples may select a region or line range.

```
@model CountryViewModel

<select asp-for="Country" asp-items="Model.Countries">
    <option value="">--none--</option>
</select>
```
