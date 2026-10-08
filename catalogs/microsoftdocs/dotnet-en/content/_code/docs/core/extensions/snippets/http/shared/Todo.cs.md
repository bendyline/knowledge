# Source code: docs/core/extensions/snippets/http/shared/Todo.cs

Complete source file; linked examples may select a region or line range.

```
namespace Shared;

public record class Todo(
    int UserId,
    int Id,
    string Title,
    bool Completed);

```
