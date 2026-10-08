# Source code: aspnetcore/security/authentication/social/additional-claims/samples/6.x/ClaimsSample/Pages/MyClaims.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
#nullable disable

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebGoogOauth.Pages
{
    public class MyClaimsModel : PageModel
    {
        public IDictionary<string, string> AuthProperties { get; set; }

        public async void OnGetAsync()
        {
            var authResult = await HttpContext.AuthenticateAsync();
            if (authResult != null)
            {
                AuthProperties = authResult.Properties.Items;
            }
        }
    }
}

```
