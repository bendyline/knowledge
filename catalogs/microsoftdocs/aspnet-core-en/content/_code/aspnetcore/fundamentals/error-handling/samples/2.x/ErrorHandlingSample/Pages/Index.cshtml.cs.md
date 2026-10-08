# Source code: aspnetcore/fundamentals/error-handling/samples/2.x/ErrorHandlingSample/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ErrorHandlingSample.Pages
{
    public class IndexModel : PageModel
    {
        public void OnGet()
        {
            if (HttpContext.Request.Query.ContainsKey("throw"))
            {
                throw new FileNotFoundException("File not found exception thrown in index.chtml");
            }
        }
    }
}

```
