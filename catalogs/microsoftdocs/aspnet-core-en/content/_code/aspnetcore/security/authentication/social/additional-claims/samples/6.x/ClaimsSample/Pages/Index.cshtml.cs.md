# Source code: aspnetcore/security/authentication/social/additional-claims/samples/6.x/ClaimsSample/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
#nullable disable

using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Security.Claims;

namespace WebGoogOauth.Pages
{
    public class IndexModel : PageModel
    {
        public Claim GivenNameClaim { get; set; }
        public Claim LocaleClaim { get; set; }
        public Claim PictureUrlClaim { get; set; }

        public void OnGet()
        {
            GivenNameClaim = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.GivenName);
            LocaleClaim = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == "urn:google:locale");
            PictureUrlClaim = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == "urn:google:picture");
        }
    }
}

```
