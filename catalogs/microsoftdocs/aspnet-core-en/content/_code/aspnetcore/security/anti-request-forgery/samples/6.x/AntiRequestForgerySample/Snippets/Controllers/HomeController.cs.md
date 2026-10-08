# Source code: aspnetcore/security/anti-request-forgery/samples/6.x/AntiRequestForgerySample/Snippets/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace AntiRequestForgerySample.Snippets.Controllers;

// <snippet_AutoValidateAntiforgeryToken>
[AutoValidateAntiforgeryToken]
public class HomeController : Controller
// </snippet_AutoValidateAntiforgeryToken>
{
    // <snippet_ValidateAntiForgeryToken>
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Index()
    {
        // ...

        return RedirectToAction();
    }
    // </snippet_ValidateAntiForgeryToken>

    // <snippet_IgnoreAntiforgeryToken>
    [IgnoreAntiforgeryToken]
    public IActionResult IndexOverride()
    {
        // ...

        return RedirectToAction();
    }
    // </snippet_IgnoreAntiforgeryToken>
}

```
