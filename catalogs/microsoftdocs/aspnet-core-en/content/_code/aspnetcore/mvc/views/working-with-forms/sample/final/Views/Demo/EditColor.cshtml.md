# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Demo/EditColor.cshtml

Complete source file; linked examples may select a region or line range.

```
@model Person
@{
    var index = (int)ViewData["index"];
}

<form asp-controller="ToDo" asp-action="Edit" method="post">
    @Html.EditorFor(m => m.Colors[index])
    <label asp-for="Age"></label>
    <input asp-for="Age" /><br />
    <button type="submit">Post</button>
</form>
```
