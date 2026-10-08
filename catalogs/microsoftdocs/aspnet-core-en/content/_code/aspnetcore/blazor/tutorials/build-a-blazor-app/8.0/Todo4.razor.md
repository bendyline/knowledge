# Source code: aspnetcore/blazor/tutorials/build-a-blazor-app/8.0/Todo4.razor

Complete source file; linked examples may select a region or line range.

```
<input placeholder="Something todo" />
<button @onclick="AddTodo">Add todo</button>

@code {
    private List<TodoItem> todos = [];

    private void AddTodo()
    {
        // Todo: Add the todo
    }
}

```
