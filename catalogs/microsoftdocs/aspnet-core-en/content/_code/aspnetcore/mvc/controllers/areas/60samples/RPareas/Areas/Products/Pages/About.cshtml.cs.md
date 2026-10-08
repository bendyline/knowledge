# Source code: aspnetcore/mvc/controllers/areas/60samples/RPareas/Areas/Products/Pages/About.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Docs.Samples;

namespace RPareas.Areas.Products.Pages;

public class AboutModel : PageModel
{
    public IActionResult OnGet() =>
        PageContext.MyDisplayRouteInfoRP();
}

```
