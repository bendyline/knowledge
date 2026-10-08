# Source code: aspnetcore/fundamentals/error-handling/samples/5.x/ErrorHandlingSample/Pages/Privacy.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace ErrorHandlingSample.Pages
{
    public class PrivacyModel : PageModel
    {
        private readonly ILogger<PrivacyModel> _logger;

        public PrivacyModel(ILogger<PrivacyModel> logger)
        {
            _logger = logger;
        }

        // <snippet>
        public void OnGet()
        {
            // using Microsoft.AspNetCore.Diagnostics;
            var statusCodePagesFeature = HttpContext.Features.Get<IStatusCodePagesFeature>();

            if (statusCodePagesFeature != null)
            {
                statusCodePagesFeature.Enabled = false;
            }
        }
        // </snippet>
    }
}

```
