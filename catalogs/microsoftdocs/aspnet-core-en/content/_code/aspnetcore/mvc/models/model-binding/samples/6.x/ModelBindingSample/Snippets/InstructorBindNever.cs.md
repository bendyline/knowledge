# Source code: aspnetcore/mvc/models/model-binding/samples/6.x/ModelBindingSample/Snippets/InstructorBindNever.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ModelBindingSample.Snippets;

// <snippet_Class>
public class InstructorBindNever
{
    [BindNever]
    public int Id { get; set; }

    // ...
}
// </snippet_Class>

```
