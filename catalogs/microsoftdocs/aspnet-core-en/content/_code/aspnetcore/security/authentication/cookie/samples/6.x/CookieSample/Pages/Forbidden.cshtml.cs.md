# Source code: aspnetcore/security/authentication/cookie/samples/6.x/CookieSample/Pages/Forbidden.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CookieSample.Pages
{
    public class ForbiddenModel : PageModel
    {
        public string Message { get; set; }

        public void OnGet()
        {
            Message = "Forbidden page.";
        }
    }
}

```
