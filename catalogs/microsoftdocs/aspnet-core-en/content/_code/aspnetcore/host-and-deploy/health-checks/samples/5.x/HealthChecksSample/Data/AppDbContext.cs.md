# Source code: aspnetcore/host-and-deploy/health-checks/samples/5.x/HealthChecksSample/Data/AppDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace SampleApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Blog> Blogs { get; set; }
    }
}

```
