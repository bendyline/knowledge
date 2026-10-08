# Source code: aspnetcore/mvc/controllers/routing/samples/6.x/AreasRouting/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace AreasRouting.Controllers
{
    // Use  webBuilder.UseStartup<Startup6>();
    #region snippet
    public class HomeController : Controller
    {
        public IActionResult About()
        {
            var url = Url.Action("AddUser", "Users", new { Area = "Zebra" });
            return Content($"URL: {url}");
        }
        #endregion

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}

```
