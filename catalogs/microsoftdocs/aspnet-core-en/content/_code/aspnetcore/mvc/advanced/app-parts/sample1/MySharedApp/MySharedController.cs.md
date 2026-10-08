# Source code: aspnetcore/mvc/advanced/app-parts/sample1/MySharedApp/MySharedController.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MySharedApp.Controllers
{
    public class MySharedController : Controller
    {
        public IActionResult Index()
        {
            return Ok("Message from shared assembly!");
        }

        public IActionResult IndexView()
        {
            // This method requires 
            // .UseStartup<StartupViews>();
            // in Program.cs
            return View("Index");
        }
    }
}
```
