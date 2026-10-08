# Source code: aspnetcore/mvc/views/view-components/sample/ViewCompFinal/Views/Shared/Components/PriorityList/Default1.cshtml

Complete source file; linked examples may select a region or line range.

```
@model IEnumerable<ViewComponentSample.Models.TodoItem>

<h3>Priority Items</h3>
<ul>
    @foreach (var todo in Model)
    {
        <li>@todo.Name</li>
    }
</ul>
```
