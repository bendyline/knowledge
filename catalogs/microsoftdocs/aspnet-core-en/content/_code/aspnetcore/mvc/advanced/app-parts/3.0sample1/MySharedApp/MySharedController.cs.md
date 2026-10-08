# Source code: aspnetcore/mvc/advanced/app-parts/3.0sample1/MySharedApp/MySharedController.cs

Complete source file; linked examples may select a region or line range.

```
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
            // This method works with all the startup files 
            // .UseStartup<StartupViews>(); 
            // in Program.cs
            return View("Index");
        }
    }
}
```
