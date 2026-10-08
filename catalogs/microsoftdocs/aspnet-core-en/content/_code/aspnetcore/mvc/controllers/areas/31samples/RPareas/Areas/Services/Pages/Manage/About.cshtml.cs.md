# Source code: aspnetcore/mvc/controllers/areas/31samples/RPareas/Areas/Services/Pages/Manage/About.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RPareas.Areas.Services.Pages.Manage
{
    public class AboutModel : PageModel
    {
        public void OnGet()
        {
            ViewData["routeInfo"] = PageContext.ToCtxStringP();
        }
    }
}
```
