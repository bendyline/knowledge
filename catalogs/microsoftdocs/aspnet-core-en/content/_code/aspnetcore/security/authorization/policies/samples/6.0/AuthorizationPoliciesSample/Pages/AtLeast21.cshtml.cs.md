# Source code: aspnetcore/security/authorization/policies/samples/6.0/AuthorizationPoliciesSample/Pages/AtLeast21.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AuthorizationPoliciesSample.Pages;

[Authorize(Policy = "AtLeast21")]
public class AtLeast21Model : PageModel { }

```
