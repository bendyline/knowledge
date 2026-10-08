# Source code: aspnetcore/tutorials/first-web-api/samples/7.0/TodoApiDTO/Models/TodoItemDTO.cs

Complete source file; linked examples may select a region or line range.

```
namespace TodoApi.Models;

public class TodoItemDTO
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}

```
