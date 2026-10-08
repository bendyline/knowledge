# Source code: aspnetcore/mvc/views/razor/sample/Utilities/CustomTemplateEngine.cs

Complete source file; linked examples may select a region or line range.

```
#if V2
using Microsoft.AspNetCore.Mvc.Razor.Extensions;
using Microsoft.AspNetCore.Razor.Language;

public class CustomTemplateEngine : MvcRazorTemplateEngine
{
    public CustomTemplateEngine(RazorEngine engine, RazorProject project) 
        : base(engine, project)
    {
    }
        
    public override RazorCSharpDocument GenerateCode(RazorCodeDocument codeDocument)
    {
        var csharpDocument = base.GenerateCode(codeDocument);
        var generatedCode = csharpDocument.GeneratedCode;

        // Look at generatedCode

        return csharpDocument;
    }
}
#endif

```
