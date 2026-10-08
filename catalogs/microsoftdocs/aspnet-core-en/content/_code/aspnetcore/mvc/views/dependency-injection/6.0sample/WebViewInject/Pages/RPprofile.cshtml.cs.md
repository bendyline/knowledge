# Source code: aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Pages/RPprofile.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ViewInjectSample.Model;

namespace WebViewInject.Pages;

public class RPprofileModel : PageModel
{

    [BindProperty(SupportsGet = true)]
    public Profile? MyProfile { get; set; }

    public void OnGet()
    {
        MyProfile = new Profile()
        {
            Name = "Rick",
            FavColor = "Blue",
            Gender = "Male",
            State = new State("Ohio", "OH")
        };
    }
}

```
