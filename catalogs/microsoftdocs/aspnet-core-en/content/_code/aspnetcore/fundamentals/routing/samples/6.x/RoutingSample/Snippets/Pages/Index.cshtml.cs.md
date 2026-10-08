# Source code: aspnetcore/fundamentals/routing/samples/6.x/RoutingSample/Snippets/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RoutingSample.Snippets.Pages;

// <snippet_Class>
public class IndexModel : PageModel
{
    public void OnGet()
    {
        var editUrl = Url.Page("./Edit", new { id = 17 });

        // ...
    }
}
// </snippet_Class>

```
