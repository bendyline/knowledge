# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/Pages/Movies/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using FiltersSample.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

// In Program.cs, call webBuilder.UseStartup<StartupRP>();

namespace FiltersSample.Pages.Movies
{
    // <snippet>
    [AddHeader("Author", "Rick Anderson")]
    [ServiceFilter(typeof(MyActionFilterAttribute))]
    public class IndexModel : PageModel
    {
        public void OnGet()
        {
        }
    }
    // </snippet>
}

```
