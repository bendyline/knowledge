# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Demo/Edit.cshtml

Complete source file; linked examples may select a region or line range.

```
@model List<ToDoItem>

<form asp-controller="ToDo" asp-action="Edit" method="post">
    <table>
        <tr> <th>Name</th> <th>Is Done</th> </tr>

        @for (int i = 0; i < Model.Count; i++)
        {
            <tr>
                @Html.EditorFor(model => model[i])
            </tr>
        }

    </table>
    <button type="submit">Save</button>
</form>

```
