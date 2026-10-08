# Source code: aspnetcore/performance/caching/memory/samples/3.x/RPcache/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RPcache.Pages
{
    public class IndexModel : PageModel
    {
        [TempData]
        public string DateTime_Now { get; set; }

        public void OnGet()
        {

        }
    }
}

```
