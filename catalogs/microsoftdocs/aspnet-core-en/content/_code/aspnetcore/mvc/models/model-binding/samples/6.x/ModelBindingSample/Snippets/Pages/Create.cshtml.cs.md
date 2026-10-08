# Source code: aspnetcore/mvc/models/model-binding/samples/6.x/ModelBindingSample/Snippets/Pages/Create.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ModelBindingSample.Snippets.Pages;

// <snippet_Class>
[BindProperties]
public class CreateModel : PageModel
{
    public Instructor? Instructor { get; set; }

    // ...
}
// </snippet_Class>

```
