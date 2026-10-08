# Source code: aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace TagHelpersBuiltIn.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(int? number)
        {
            ViewData["id"] = number?.ToString();

            return View();
        }

        public IActionResult About() => View();

        public IActionResult Error() => View();
    }
}

```
