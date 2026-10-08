# Source code: aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Data/MovieContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;
using ValidationSample.Models;

namespace ValidationSample.Data
{
    public class MovieContext : DbContext
    {
        public MovieContext(DbContextOptions<MovieContext> options)
            : base(options)
        {

        }

        public DbSet<Movie> Movies { get; set; }
    }
}

```
