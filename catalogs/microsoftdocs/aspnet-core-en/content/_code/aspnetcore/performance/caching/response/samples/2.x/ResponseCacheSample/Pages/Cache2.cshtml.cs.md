# Source code: aspnetcore/performance/caching/response/samples/2.x/ResponseCacheSample/Pages/Cache2.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ResponseCacheSample.Pages
{
    #region snippet
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public class Cache2Model : PageModel
    {
    #endregion
        public void OnGet()
        {
        }
    }
}
```
