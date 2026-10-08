# Source code: aspnetcore/test/razor-pages-tests/samples/3.x/src/RazorPagesTestSample/Pages/Partials.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorPagesTestSample.Pages
{
    public class PartialsModel : PageModel
    {
        public void OnGet()
        {
        }

        public IActionResult OnGetPartial() => Partial("_Partial");
    }
}

```
