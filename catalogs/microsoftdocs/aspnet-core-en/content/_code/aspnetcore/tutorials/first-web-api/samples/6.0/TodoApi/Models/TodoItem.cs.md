# Source code: aspnetcore/tutorials/first-web-api/samples/6.0/TodoApi/Models/TodoItem.cs

Complete source file; linked examples may select a region or line range.

```
namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
```
