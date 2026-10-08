# Source code: aspnetcore/blazor/tutorials/build-a-blazor-app/8.0/Todo7.razor

Complete source file; linked examples may select a region or line range.

```
<ul>
    @foreach (var todo in todos)
    {
        <li>
            <input type="checkbox" @bind="todo.IsDone" />
            <input @bind="todo.Title" />
        </li>
    }
</ul>

```
