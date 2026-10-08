# Source code: aspnetcore/security/gdpr/sample/RP2.2/Pages/Consent.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RPCC.Pages
{
    public class Consent : PageModel
    {
        public void OnGet()
        {
        }

        public IActionResult OnPostGrantAsync()
        {
            HttpContext.Features.Get<ITrackingConsentFeature>().GrantConsent();
            return RedirectToPage("./Index");
        }

        public IActionResult OnPostWithdrawAsync()
        {
            HttpContext.Features.Get<ITrackingConsentFeature>().WithdrawConsent();
            return RedirectToPage("./Index");
        }
    }
}

```
