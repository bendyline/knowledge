# Source code: aspnetcore/mvc/views/view-components/sample/ViewCompFinal/Views/ToDo/IndexFinal.cshtml

Complete source file; linked examples may select a region or line range.

```
@using ViewComponentSample.Models
@model IEnumerable<TodoItem>

<h2>ToDo</h2>
<table>
    <tr>
        <th>
            @Html.DisplayNameFor(model => model.IsDone)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.Priority)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.Name)
        </th>
        <th></th>
    </tr>
    @foreach (var item in Model)
    {
        <tr>
            <td>
                @Html.DisplayFor(modelItem => item.IsDone)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Priority)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Name)
            </td>
        </tr>
    }
</table>

<div>
    @await Component.InvokeAsync("PriorityList", new { maxPriority = 4, isDone = true })
</div>

```
