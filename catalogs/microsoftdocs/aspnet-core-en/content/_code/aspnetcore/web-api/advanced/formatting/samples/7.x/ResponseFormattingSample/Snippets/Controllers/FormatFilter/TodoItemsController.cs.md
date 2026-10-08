# Source code: aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Controllers/FormatFilter/TodoItemsController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using ResponseFormattingSample.Models;

namespace ResponseFormattingSample.Snippets.Controllers.FormatFilter;

[NonController]
// <snippet_ClassGet>
[ApiController]
[Route("api/[controller]")]
[FormatFilter]
public class TodoItemsController : ControllerBase
{
    private readonly TodoItemStore _todoItemStore;

    public TodoItemsController(TodoItemStore todoItemStore)
        => _todoItemStore = todoItemStore;

    [HttpGet("{id:long}.{format?}")]
    public TodoItem? GetById(long id)
        => _todoItemStore.GetById(id);
    // </snippet_ClassGet>

    // ...
}

```
