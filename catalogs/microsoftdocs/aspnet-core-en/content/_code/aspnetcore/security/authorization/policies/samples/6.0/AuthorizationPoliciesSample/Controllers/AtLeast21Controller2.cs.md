# Source code: aspnetcore/security/authorization/policies/samples/6.0/AuthorizationPoliciesSample/Controllers/AtLeast21Controller2.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthorizationPoliciesSample.Controllers;

#region snippet
[Authorize(Policy = "AtLeast21")]
public class AtLeast21Controller2 : Controller
{
    [Authorize(Policy = "IdentificationValidated")]
    public IActionResult Index() => View();
}
#endregion

```
