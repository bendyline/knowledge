# Source code: aspnetcore/mvc/models/model-binding/samples/8.x/ModelBindingSample/Snippets/Pet.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace ModelBindingSample.Snippets;

// <snippet_Class>
public class Pet
{
    public string Name { get; set; } = null!;

    [FromQuery] // Attribute is ignored.
    public string Breed { get; set; } = null!;
}
// </snippet_Class>

```
