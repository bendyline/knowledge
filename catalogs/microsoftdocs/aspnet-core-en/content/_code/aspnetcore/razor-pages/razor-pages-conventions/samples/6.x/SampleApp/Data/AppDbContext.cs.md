# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/6.x/SampleApp/Data/AppDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SampleApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Message> ? Messages { get; set; }
    }
}

```
