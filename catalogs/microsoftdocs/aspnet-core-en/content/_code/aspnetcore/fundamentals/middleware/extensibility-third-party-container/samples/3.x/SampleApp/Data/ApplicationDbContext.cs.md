# Source code: aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/3.x/SampleApp/Data/ApplicationDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;
using MiddlewareExtensibilitySample.Models;

namespace MiddlewareExtensibilitySample.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Request> Requests { get; set; }
    }
}

```
