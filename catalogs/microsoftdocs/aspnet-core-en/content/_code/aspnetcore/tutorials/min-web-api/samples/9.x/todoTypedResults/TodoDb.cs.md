# Source code: aspnetcore/tutorials/min-web-api/samples/9.x/todoTypedResults/TodoDb.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

class TodoDb : DbContext
{
    public TodoDb(DbContextOptions<TodoDb> options)
        : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();
}

```
