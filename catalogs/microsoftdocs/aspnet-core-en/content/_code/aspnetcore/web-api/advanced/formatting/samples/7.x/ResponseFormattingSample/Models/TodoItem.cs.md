# Source code: aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Models/TodoItem.cs

Complete source file; linked examples may select a region or line range.

```
namespace ResponseFormattingSample.Models;

public class TodoItem
{
    public TodoItem() { }

    public TodoItem(long id, string name, bool isComplete = false)
        => (Id, Name, IsComplete) = (id, name, isComplete);

    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public bool IsComplete { get; set; } = false;
}

```
