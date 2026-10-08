# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Data/MvcMovieContext.cs

Complete source file; linked examples may select a region or line range.

```
#define Second
#if First
#region First
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

        public DbSet<MvcMovie.Models.Movie> Movie { get; set; }
    }
}
#endregion
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

        #region NRTChange
        public DbSet<MvcMovie.Models.Movie> Movie { get; set; } = null!;
        #endregion
    }
}
#endif

```
