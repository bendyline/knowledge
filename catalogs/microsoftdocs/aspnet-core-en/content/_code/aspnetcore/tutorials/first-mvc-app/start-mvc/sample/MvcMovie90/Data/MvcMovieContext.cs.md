# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Data/MvcMovieContext.cs

Complete source file; linked examples may select a region or line range.

```
#define Second
#if First
// <snippet_First>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Models;

namespace MvcMovie.Data
{
    public class MvcMovieContext : DbContext
    {
        public MvcMovieContext (DbContextOptions<MvcMovieContext> options)
            : base(options)
        {
        }

        public DbSet<MvcMovie.Models.Movie> Movie { get; set; } = default!;
    }
}
// </snippet_First>
#endif
#if Second
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Models;

namespace MvcMovie.Data
{
    public class MvcMovieContext : DbContext
    {
        public MvcMovieContext(DbContextOptions<MvcMovieContext> options)
            : base(options)
        {
        }

        // <snippet_NRTChange>
        public DbSet<MvcMovie.Models.Movie> Movie { get; set; } = null!;
        // </snippet_NRTChange>
    }
}
#endif

```
