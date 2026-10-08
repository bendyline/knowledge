# Source code: aspnetcore/mvc/models/model-binding/samples/3.x/ModelBindingSample/Controllers/CustomJsonController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using ModelBindingSample.Models;

namespace ModelBindingSample.Controllers
{
    #region snippet_Class
    [ApiController]
    [Route("[controller]")]
    public class CustomJsonController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post(ModelWithObjectId model) =>
            Ok(model);
    }
    #endregion
}

```
