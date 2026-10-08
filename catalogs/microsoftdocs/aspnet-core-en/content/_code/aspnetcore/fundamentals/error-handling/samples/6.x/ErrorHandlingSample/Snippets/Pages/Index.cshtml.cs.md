# Source code: aspnetcore/fundamentals/error-handling/samples/6.x/ErrorHandlingSample/Snippets/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ErrorHandlingSample.Snippets.Pages;

public class IndexModel : PageModel
{
    // <snippet_OnGet>
    public void OnGet()
    {
        var statusCodePagesFeature =
            HttpContext.Features.Get<IStatusCodePagesFeature>();

        if (statusCodePagesFeature is not null)
        {
            statusCodePagesFeature.Enabled = false;
        }
    }
    // </snippet_OnGet>
}

```
