# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/2.x/SampleApp/Filters/EmptyFilter.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.Filters;

namespace SampleApp.Filters
{
    public class EmptyFilter : IActionFilter
    {
        public EmptyFilter()
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {

        }

        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }
}

```
