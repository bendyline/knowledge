# Source code: aspnetcore/security/anti-request-forgery/samples/2.x/MvcSample/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace MvcSample.Controllers
{
    [AutoValidateAntiforgeryToken]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SamplePost([FromForm] string message)
        {
            ViewData["Message"] = message;
            return View("Index");
        }

        public IActionResult Ajax()
        {
            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public IActionResult Antiforgery()
        {
            return Content("Successful antiforgery!");
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}

```
