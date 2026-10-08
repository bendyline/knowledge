# Source code: aspnetcore/mvc/views/view-components/sample6.x/ViewComponentSample/Views/Shared/Components/PriorityList/PVC.cshtml

Complete source file; linked examples may select a region or line range.

```
@model IEnumerable<ViewComponentSample.Models.TodoItem>

<h2> PVC Named Priority Component View</h2>
<h4>@ViewBag.PriorityMessage</h4>
<ul>
    @foreach (var todo in Model)
    {
        <li>@todo.Name</li>
    }
</ul>
```
