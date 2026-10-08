# Source code: aspnetcore/mvc/views/tag-helpers/built-in/samples/ScriptTagHelper/Pages/NoScript.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ScriptTagHelper.Pages;

public class NoScriptModel : PageModel
{
    private readonly ILogger<NoScriptModel> _logger;

    public NoScriptModel(ILogger<NoScriptModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
    }
}

```
