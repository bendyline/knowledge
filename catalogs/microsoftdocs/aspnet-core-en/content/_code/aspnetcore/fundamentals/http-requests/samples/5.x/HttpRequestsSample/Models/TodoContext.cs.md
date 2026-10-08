# Source code: aspnetcore/fundamentals/http-requests/samples/5.x/HttpRequestsSample/Models/TodoContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace HttpRequestsSample.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options) { }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}

```
