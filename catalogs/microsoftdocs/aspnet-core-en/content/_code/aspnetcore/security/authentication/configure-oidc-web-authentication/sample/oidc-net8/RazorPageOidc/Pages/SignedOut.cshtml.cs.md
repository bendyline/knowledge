# Source code: aspnetcore/security/authentication/configure-oidc-web-authentication/sample/oidc-net8/RazorPageOidc/Pages/SignedOut.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorPageOidc.Pages;

[AllowAnonymous]
public class SignedOutModel : PageModel
{
    public void OnGet()
    {
    }
}
```
