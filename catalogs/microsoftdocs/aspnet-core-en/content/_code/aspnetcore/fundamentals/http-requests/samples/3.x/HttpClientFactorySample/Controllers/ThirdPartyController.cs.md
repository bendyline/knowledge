# Source code: aspnetcore/fundamentals/http-requests/samples/3.x/HttpClientFactorySample/Controllers/ThirdPartyController.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace HttpClientFactorySample.Controllers
{
    public class ThirdPartyController : Controller
    {
        [Route("unreliable")]
        public IActionResult UnreliableEndpoint()
        {
            var second = DateTime.UtcNow.Second;

            // about 50% of the time this will fail
            return second % 2 != 0 ? Ok() : StatusCode((int)HttpStatusCode.ServiceUnavailable);
        }
    }
}
```
