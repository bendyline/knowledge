# Source code: aspnetcore/tutorials/first-web-api/samples/5.x/TodoApi/Models/TodoItem.cs

Complete source file; linked examples may select a region or line range.

```
#region snippet
namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
#endregion
```
