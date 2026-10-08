# Source code: aspnetcore/client-side/spa-services/sample/SpaServicesSampleApp/Controllers/PostsController.cs

Complete source file; linked examples may select a region or line range.

```
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SpaServicesSampleApp.Data;

namespace SpaServicesSampleApp.Controllers
{
    [Route("api/blogs/{blogId}/posts")]
    public class PostsController : Controller
    {
        [HttpGet()]
        public IActionResult Get(int blogId)
        {
            var posts = SampleData.Posts().Where(p => p.BlogId == blogId);

            return Ok(posts);
        }
    }
}

```
