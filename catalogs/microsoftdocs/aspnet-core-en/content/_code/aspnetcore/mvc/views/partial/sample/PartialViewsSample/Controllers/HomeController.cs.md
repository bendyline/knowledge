# Source code: aspnetcore/mvc/views/partial/sample/PartialViewsSample/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace PartialViewsSample.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Discovery() => View();

        public IActionResult Error() => View();
    }
}

```
