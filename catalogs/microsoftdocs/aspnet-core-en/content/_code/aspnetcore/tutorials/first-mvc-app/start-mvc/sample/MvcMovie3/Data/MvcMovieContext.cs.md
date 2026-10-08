# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie3/Data/MvcMovieContext.cs

Complete source file; linked examples may select a region or line range.

```
// Unused usings removed.
using Microsoft.EntityFrameworkCore;
using MvcMovie.Models;  // Enables public DbSet<Movie> Movie

namespace MvcMovie.Data
{
    public class MvcMovieContext : DbContext
    {
        public MvcMovieContext (DbContextOptions<MvcMovieContext> options)
            : base(options)
        {
        }

        public DbSet<Movie> Movie { get; set; }
    }
}
```
