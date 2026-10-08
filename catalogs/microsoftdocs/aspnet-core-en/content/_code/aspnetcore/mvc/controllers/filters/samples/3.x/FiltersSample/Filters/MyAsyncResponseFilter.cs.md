# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/Filters/MyAsyncResponseFilter.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

namespace FiltersSample.Filters
{
    // <snippet>
    public class MyAsyncResponseFilter : IAsyncResultFilter
    {
        public async Task OnResultExecutionAsync(ResultExecutingContext context,
                                                 ResultExecutionDelegate next)
        {
            if (!(context.Result is EmptyResult))
            {
                await next();
            }
            else
            {
                context.Cancel = true;
            }

        }
    }
    // </snippet>
}
```
