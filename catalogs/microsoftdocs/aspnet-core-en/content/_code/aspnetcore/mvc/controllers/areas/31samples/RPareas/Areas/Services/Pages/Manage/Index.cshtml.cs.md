# Source code: aspnetcore/mvc/controllers/areas/31samples/RPareas/Areas/Services/Pages/Manage/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RPareas.Areas.Services.Pages.Manage
{
    public class IndexModel : PageModel
    {
        public void OnGet()
        {
            ViewData["routeInfo"] = PageContext.ToCtxStringP();
        }
    }
}
```
