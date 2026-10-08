# Source code: aspnetcore/security/authorization/policies/samples/6.0/AuthorizationPoliciesSample/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics;
using AuthorizationPoliciesSample.Models;
using Microsoft.AspNetCore.Mvc;

namespace AuthorizationPoliciesSample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

```
