# Source code: aspnetcore/security/authentication/social/social-without-identity/samples_snapshot/3.x/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApp1.Pages
{
    // <snippet_Class>
    public class IndexModel : PageModel
    {
        public async Task<IActionResult> OnPostLogoutAsync()
        {
            await HttpContext.SignOutAsync();
            return RedirectToPage();
        }
    }
    // </snippet_Class>
}

```
