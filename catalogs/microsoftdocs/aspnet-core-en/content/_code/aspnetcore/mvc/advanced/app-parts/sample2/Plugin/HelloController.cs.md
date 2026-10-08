# Source code: aspnetcore/mvc/advanced/app-parts/sample2/Plugin/HelloController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace Plugin
{
    public class HelloController : Controller
    {
        public IActionResult Index()
        {
            return Ok("Hello from a plugin assembly!");
        }
    }
}

```
