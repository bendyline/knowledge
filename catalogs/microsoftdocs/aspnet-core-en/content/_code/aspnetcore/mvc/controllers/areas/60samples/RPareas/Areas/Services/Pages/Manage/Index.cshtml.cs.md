# Source code: aspnetcore/mvc/controllers/areas/60samples/RPareas/Areas/Services/Pages/Manage/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Docs.Samples;

namespace RPareas.Areas.Services.Pages.Manage;

public class IndexModel : PageModel
{
    public IActionResult OnGet() =>
            PageContext.MyDisplayRouteInfoRP();
}

```
