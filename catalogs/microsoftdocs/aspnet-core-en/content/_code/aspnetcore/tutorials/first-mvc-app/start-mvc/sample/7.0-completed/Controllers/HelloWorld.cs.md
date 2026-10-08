# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/7.0-completed/Controllers/HelloWorld.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace MvcMovie.Controllers
{
    public class HelloWorldController : Controller
    {
        // 
        // GET: /HelloWorld/

    public IActionResult Index()
{
    return View();
}

        // 
        // GET: /HelloWorld/Welcome/ 

// GET: /HelloWorld/Welcome/ 
// Requires using System.Text.Encodings.Web;
public string Welcome(string name, int numTimes = 1)
{
    return HtmlEncoder.Default.Encode($"Hello {name}, NumTimes is: {numTimes}");
}
    }
}
```
