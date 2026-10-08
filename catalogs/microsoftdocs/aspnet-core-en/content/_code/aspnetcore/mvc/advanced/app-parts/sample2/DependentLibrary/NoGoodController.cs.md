# Source code: aspnetcore/mvc/advanced/app-parts/sample2/DependentLibrary/NoGoodController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace DependentLibrary
{
    /// <summary>
    /// Since the MVC project references this project, this controller 
    /// ordinarily is discovered and available.
    /// </summary>
    public class NoGoodController : Controller
    {
        public IActionResult Index()
        {
            return Ok("We don't want to load this controller.");
        }

    }
}

```
