# Source code: aspnetcore/mvc/models/model-binding/samples/8.x/ModelBindingSample/Snippets/InstructorBindRequired.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ModelBindingSample.Snippets;

// <snippet_Class>
public class InstructorBindRequired
{
    // ...

    [BindRequired]
    public DateTime HireDate { get; set; }
}
// </snippet_Class>

```
