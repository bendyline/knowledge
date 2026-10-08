# Source code: docs/csharp/whats-new/tutorials/snippets/primary-constructors/ExampleController.cs

Complete source file; linked examples may select a region or line range.

```
using StructTwo;
using Microsoft.AspNetCore.Mvc;

namespace PrimaryConstructors;

// <DependencyInjection>
public interface IService
{
    Distance GetDistance();
}

public class ExampleController(IService service) : ControllerBase
{
    [HttpGet]
    public ActionResult<Distance> Get()
    {
        return service.GetDistance();
    }
}
// </DependencyInjection>

```
