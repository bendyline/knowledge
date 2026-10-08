# Source code: aspnetcore/security/authentication/social/additional-claims/samples/6.x/ClaimsSample/Pages/Index2.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebGoogOauth.Pages
{
    public class Index2Model : PageModel
    {
        private readonly ILogger<Index2Model> _logger;

        public Index2Model(ILogger<Index2Model> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}
```
