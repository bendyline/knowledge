# Source code: aspnetcore/mvc/models/model-binding/samples/6.x/ModelBindingSample/Snippets/InstructorObjectId.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace ModelBindingSample.Snippets;

// <snippet_Class>
public class InstructorObjectId
{
    [Required]
    public ObjectId ObjectId { get; set; } = null!;
}
// </snippet_Class>

```
