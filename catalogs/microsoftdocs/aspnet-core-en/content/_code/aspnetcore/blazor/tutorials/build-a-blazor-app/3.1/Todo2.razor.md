# Source code: aspnetcore/blazor/tutorials/build-a-blazor-app/3.1/Todo2.razor

Complete source file; linked examples may select a region or line range.

```
@page "/todo"

<h3>Todo</h3>

<ul>
    @foreach (var todo in todos)
    {
        <li>@todo.Title</li>
    }
</ul>

@code {
    private IList<TodoItem> todos = new List<TodoItem>();
}

```
