# Source code: aspnetcore/mvc/controllers/filters/samples/8.x/FiltersSample/Filters/GlobalSampleActionFilter.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.Filters;

namespace FiltersSample.Filters;

public class GlobalSampleActionFilter : IActionFilter
{

    public void OnActionExecuting(ActionExecutingContext context)
    {
        Console.WriteLine(
            $"- {nameof(GlobalSampleActionFilter)}.{nameof(OnActionExecuting)}");
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        Console.WriteLine(
            $"- {nameof(GlobalSampleActionFilter)}.{nameof(OnActionExecuted)}");
    }
}

```
