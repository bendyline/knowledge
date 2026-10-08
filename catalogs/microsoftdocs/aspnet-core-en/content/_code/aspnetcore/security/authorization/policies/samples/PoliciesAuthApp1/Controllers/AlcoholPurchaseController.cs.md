# Source code: aspnetcore/security/authorization/policies/samples/PoliciesAuthApp1/Controllers/AlcoholPurchaseController.cs

Complete source file; linked examples may select a region or line range.

```
namespace PoliciesAuthApp1.Controllers
{
    // <snippet_AlcoholPurchaseControllerClass>
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(Policy = "AtLeast21")]
    public class AlcoholPurchaseController : Controller
    {
        public IActionResult Index() => View();
    }
    // </snippet_AlcoholPurchaseControllerClass>
}

```
