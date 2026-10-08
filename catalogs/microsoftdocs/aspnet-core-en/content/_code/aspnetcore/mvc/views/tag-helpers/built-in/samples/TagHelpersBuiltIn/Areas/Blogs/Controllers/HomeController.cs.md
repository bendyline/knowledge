# Source code: aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Areas/Blogs/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace TagHelpersBuiltInAspNetCore.Areas.Blogs.Controllers
{
    [Area("Blogs")]
    public class HomeController : Controller
    {
        // need route and attribute on controller: [Area("Blogs")]
        //[Area("Blogs")]
        public IActionResult Index() => View();

        //[Area("Blogs")]
        public IActionResult AboutBlog() => View();
    }
}

```
