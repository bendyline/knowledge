# Source code: aspnetcore/mvc/models/model-binding/samples/8.x/ModelBindingSample/Snippets/Pages/Edit.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ModelBindingSample.Snippets.Pages;

// <snippet_Class>
public class EditModel : PageModel
{
    [BindProperty]
    public Instructor? Instructor { get; set; }

    // ...
}
// </snippet_Class>

```
