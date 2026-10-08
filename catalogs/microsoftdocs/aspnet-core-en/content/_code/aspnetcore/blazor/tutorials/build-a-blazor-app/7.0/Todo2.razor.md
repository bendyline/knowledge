# Source code: aspnetcore/blazor/tutorials/build-a-blazor-app/7.0/Todo2.razor

Complete source file; linked examples may select a region or line range.

```
@page "/todo"

<PageTitle>Todo</PageTitle>

<h3>Todo</h3>

<ul>
    @foreach (var todo in todos)
    {
        <li>@todo.Title</li>
    }
</ul>

@code {
    private List<TodoItem> todos = new();
}

```
