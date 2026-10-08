# Source code: aspnetcore/performance/performance-best-practices/samples/3.0/Controllers/AsyncSecondController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace performance_best_practices.Controllers
{
    #region snippet1
    public class AsyncGoodTaskController : Controller
    {
        [HttpGet("/async")]
        public async Task Get()
        {
            await Task.Delay(1000);

            await Response.WriteAsync("Hello World");
        }
    }
    #endregion
}

```
