# Source code: aspnetcore/mvc/models/model-binding/samples/6.x/ModelBindingSample/Snippets/Controllers/PetsController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace ModelBindingSample.Snippets.Controllers;

[NonController]
public class PetsController : ControllerBase
{
    // <snippet_GetById>
    [HttpGet("{id}")]
    public ActionResult<Pet> GetById(int id, bool dogsOnly)
    // </snippet_GetById>
    {
        return NoContent();
    }

    // <snippet_Create>
    public ActionResult<Pet> Create([FromBody] Pet pet)
    // </snippet_Create>
    {
        return NoContent();
    }
}

```
