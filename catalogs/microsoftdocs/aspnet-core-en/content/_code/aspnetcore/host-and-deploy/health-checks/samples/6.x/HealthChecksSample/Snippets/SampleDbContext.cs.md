# Source code: aspnetcore/host-and-deploy/health-checks/samples/6.x/HealthChecksSample/Snippets/SampleDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace HealthChecksSample.Snippets;

public class SampleDbContext : DbContext
{
    public SampleDbContext(DbContextOptions<SampleDbContext> dbContextOptions)
        : base(dbContextOptions) { }
}

```
