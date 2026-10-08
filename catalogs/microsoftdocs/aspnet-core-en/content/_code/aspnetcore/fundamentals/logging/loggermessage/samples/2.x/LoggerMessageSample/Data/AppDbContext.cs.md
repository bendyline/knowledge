# Source code: aspnetcore/fundamentals/logging/loggermessage/samples/2.x/LoggerMessageSample/Data/AppDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace LoggerMessageSample.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Quote> Quotes { get; set; }
    }
}

```
