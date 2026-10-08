# Source code: aspnetcore/mvc/controllers/areas/31samples/RPareas/Areas/Products/Pages/About.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RPareas.Areas.Products.Pages
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
