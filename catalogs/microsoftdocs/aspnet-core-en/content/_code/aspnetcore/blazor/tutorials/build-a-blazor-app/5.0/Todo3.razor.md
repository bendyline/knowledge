# Source code: aspnetcore/blazor/tutorials/build-a-blazor-app/5.0/Todo3.razor

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

<input placeholder="Something todo" />
<button>Add todo</button>

@code {
    private List<TodoItem> todos = new();
}

```
