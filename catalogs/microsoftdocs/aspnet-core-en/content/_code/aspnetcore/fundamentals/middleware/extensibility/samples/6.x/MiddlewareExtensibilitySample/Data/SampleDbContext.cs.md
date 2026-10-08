# Source code: aspnetcore/fundamentals/middleware/extensibility/samples/6.x/MiddlewareExtensibilitySample/Data/SampleDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace MiddlewareExtensibilitySample.Data;

public class SampleDbContext : DbContext
{
    public SampleDbContext(DbContextOptions<SampleDbContext> dbContextOptions)
        : base(dbContextOptions) { }

    public DbSet<Request> Requests { get; set; } = null!;
}

```
