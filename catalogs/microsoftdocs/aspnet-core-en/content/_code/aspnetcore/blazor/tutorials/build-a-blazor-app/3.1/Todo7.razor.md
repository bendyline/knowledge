# Source code: aspnetcore/blazor/tutorials/build-a-blazor-app/3.1/Todo7.razor

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
