# Source code: aspnetcore/mvc/advanced/custom-model-binding/samples/2.x/CustomModelBindingSample/Data/AppDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace CustomModelBindingSample.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Author> Authors { get; set; }
    }
}

```
