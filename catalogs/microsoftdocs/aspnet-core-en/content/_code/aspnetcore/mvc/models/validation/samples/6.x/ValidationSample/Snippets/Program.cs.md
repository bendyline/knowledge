# Source code: aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Snippets/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using ValidationSample.Validation;

namespace ValidationSample.Snippets;

public static class Program
{
    public static void DisableValidation(WebApplicationBuilder builder)
    {
        // <snippet_DisableValidation>
        builder.Services.AddSingleton<IObjectModelValidator, NullObjectModelValidator>();
        // </snippet_DisableValidation>
    }

    public static void DisableClientValidation(WebApplicationBuilder builder)
    {
        // <snippet_DisableClientValidation>
        builder.Services.AddRazorPages()
            .AddViewOptions(options =>
            {
                options.HtmlHelperOptions.ClientValidationEnabled = false;
            });
        // </snippet_DisableClientValidation>   
    }
}

```
