# Source code: samples/core/Saving/Disconnected/BloggingContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFSaving.Disconnected;

public class BloggingContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            @"Server=(localdb)\mssqllocaldb;Database=EFSaving.Disconnected;Trusted_Connection=True;ConnectRetryCount=0");
    }
}

```
