# Source code: aspnetcore/mvc/advanced/custom-model-binding/samples/3.x/CustomModelBindingSample/Data/AuthorContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace CustomModelBindingSample.Data
{
    public class AuthorContext : DbContext
    {
        public AuthorContext(DbContextOptions<AuthorContext> options)
            : base(options) { }

        public DbSet<Author> Authors { get; set; }
    }
}

```
