# Source code: aspnetcore/release-notes/aspnetcore-6.0/samples/WebMvcEF/Data/MvcMovieContext.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebMvcEF.Models;

    public class MvcMovieContext : DbContext
    {
        public MvcMovieContext (DbContextOptions<MvcMovieContext> options)
            : base(options)
        {
        }

        public DbSet<WebMvcEF.Models.Movie> Movie { get; set; }
    }

```
