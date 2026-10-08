# Source code: aspnetcore/security/anti-request-forgery/samples/6.x/AntiRequestForgerySample/Controllers/JavaScriptController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace AntiRequestForgerySample.Controllers;

public class JavaScriptController : Controller
{
    public IActionResult Index()
        => View();

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult FetchEndpoint()
        => Content("Success");
}

```
