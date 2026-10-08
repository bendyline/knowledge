# Source code: aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoItemDTO.cs

Complete source file; linked examples may select a region or line range.

```
public class TodoItemDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }

    public TodoItemDTO() { }
    public TodoItemDTO(Todo todoItem) =>
    (Id, Name, IsComplete) = (todoItem.Id, todoItem.Name, todoItem.IsComplete);
}
```
