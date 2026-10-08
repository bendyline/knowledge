# Source code: aspnetcore/security/authorization/policies/samples/PoliciesAuthApp2/Pages/AlcoholPurchase.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
namespace PoliciesAuthApp2.Pages
{
    // <snippet_AlcoholPurchaseModelClass>
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc.RazorPages;

    [Authorize(Policy = "AtLeast21")]
    public class AlcoholPurchaseModel : PageModel
    {
    }
    // </snippet_AlcoholPurchaseModelClass>
}

```
