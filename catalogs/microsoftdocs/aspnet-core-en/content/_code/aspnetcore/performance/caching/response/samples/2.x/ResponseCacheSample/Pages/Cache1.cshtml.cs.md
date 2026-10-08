# Source code: aspnetcore/performance/caching/response/samples/2.x/ResponseCacheSample/Pages/Cache1.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ResponseCacheSample.Pages
{
    #region snippet
    [ResponseCache(VaryByHeader = "User-Agent", Duration = 30)]
    public class Cache1Model : PageModel
    {
    #endregion
        public void OnGet()
        {
        }
    }
}

```
