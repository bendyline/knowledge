# Source code: aspnetcore/web-api/http-repl/samples/SwaggerApp/Data/SampleContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;
using SwaggerApp.Models;

namespace SwaggerApp.Data
{
    public class SampleContext : DbContext
    {
        public SampleContext(DbContextOptions<SampleContext> options)
            : base(options)
        {
        }

        public DbSet<Fruit> Fruits { get; set; }
        public DbSet<Person> People { get; set; }
    }
}

```
