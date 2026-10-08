# Source code: aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/7.x/NSwagSample/Models/TodoContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

// <snippet_PragmaWarningDisable>
namespace NSwagSample.Models;

#pragma warning disable CS1591
public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
}
#pragma warning restore CS1591
// </snippet_PragmaWarningDisable>

```
