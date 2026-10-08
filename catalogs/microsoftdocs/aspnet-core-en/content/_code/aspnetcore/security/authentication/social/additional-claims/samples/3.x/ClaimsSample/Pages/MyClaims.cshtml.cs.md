# Source code: aspnetcore/security/authentication/social/additional-claims/samples/3.x/ClaimsSample/Pages/MyClaims.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ClaimsSample.Pages
{
    public class MyClaimsModel : PageModel
    {
        public IDictionary<string, string> AuthProperties { get; set; }

        public async void OnGetAsync()
        {
            var authResult = await HttpContext.AuthenticateAsync();
            AuthProperties = authResult.Properties.Items;
        }
    }
}

```
