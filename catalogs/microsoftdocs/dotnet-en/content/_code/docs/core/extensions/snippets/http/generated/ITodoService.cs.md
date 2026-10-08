# Source code: docs/core/extensions/snippets/http/generated/ITodoService.cs

Complete source file; linked examples may select a region or line range.

```
using Refit;
using Shared;

namespace GeneratedHttp.Example;

public interface ITodoService
{
    [Get("/todos?userId={userId}")]
    Task<Todo[]> GetUserTodosAsync(int userId);
}

```
