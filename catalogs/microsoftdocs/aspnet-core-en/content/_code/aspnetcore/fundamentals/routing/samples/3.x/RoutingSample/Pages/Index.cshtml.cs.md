# Source code: aspnetcore/fundamentals/routing/samples/3.x/RoutingSample/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RoutingSample.Pages
{
    // <snippet>
    public class IndexModel : PageModel
    {
        public void OnGet()
        {
            var url = Url.Page("./Edit", new { id = 17, });
            ViewData["URL"] = url;
        }
    }
    // </snippet>
}

```
