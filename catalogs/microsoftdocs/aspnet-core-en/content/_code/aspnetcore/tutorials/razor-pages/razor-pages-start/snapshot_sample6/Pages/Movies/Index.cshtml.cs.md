# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot_sample6/Pages/Movies/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
#region snippetFull 
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using RazorPagesMovie.Models;

#region snippet
namespace RazorPagesMovie.Pages.Movies
{
    #region snippet2
    public class IndexModel : PageModel
    {
        private readonly RazorPagesMovie.Data.RazorPagesMovieContext _context;

        public IndexModel(RazorPagesMovie.Data.RazorPagesMovieContext context)
        {
            _context = context;
        }
        #endregion

        public IList<Movie> Movie { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.Movie != null)
            {
                Movie = await _context.Movie.ToListAsync();
            }
        }
    }
}
#endregion
#endregion

```
