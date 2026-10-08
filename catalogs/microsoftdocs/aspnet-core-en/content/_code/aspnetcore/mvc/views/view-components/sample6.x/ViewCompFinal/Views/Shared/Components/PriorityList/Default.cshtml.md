# Source code: aspnetcore/mvc/views/view-components/sample6.x/ViewCompFinal/Views/Shared/Components/PriorityList/Default.cshtml

Complete source file; linked examples may select a region or line range.

```
@model IEnumerable<ViewComponentSample.Models.TodoItem>

<h3>Shared Priority Items</h3>
<ul>
    @foreach (var todo in Model)
    {
        <li>@todo.Name</li>
    }
</ul>

```
