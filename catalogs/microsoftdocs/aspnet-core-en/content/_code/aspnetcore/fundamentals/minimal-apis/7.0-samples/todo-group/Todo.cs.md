# Source code: aspnetcore/fundamentals/minimal-apis/7.0-samples/todo-group/Todo.cs

Complete source file; linked examples may select a region or line range.

```
namespace MinApiRouteGroupSample;

public class Todo
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsDone { get; set; }
    public bool IsPrivate { get; set; }
}

```
