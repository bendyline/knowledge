# Source code: aspnetcore/client-side/spa-services/sample/SpaServicesSampleApp/Controllers/BlogsController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using SpaServicesSampleApp.Data;

namespace SpaServicesSampleApp.Controllers
{
    [Route("api/[controller]")]
    public class BlogsController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            var blogs = SampleData.Blogs();

            return Ok(blogs);
        }
    }
}
```
