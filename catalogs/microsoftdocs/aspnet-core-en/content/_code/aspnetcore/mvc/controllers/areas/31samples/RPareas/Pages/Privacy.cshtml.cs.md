# Source code: aspnetcore/mvc/controllers/areas/31samples/RPareas/Pages/Privacy.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RPareas.Pages
{
    public class PrivacyModel : PageModel
    {
        public void OnGet()
        {
            ViewData["routeInfo"] = PageContext.ToCtxStringP();
        }
    }
}
```
