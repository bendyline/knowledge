# Source code: aspnetcore/mvc/controllers/filters/samples/8.x/FiltersSample/Filters/SampleActionFilterAttribute.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.Filters;

namespace FiltersSample.Filters;

public class SampleActionFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        Console.WriteLine(
            $"- {nameof(SampleActionFilterAttribute)}.{nameof(OnActionExecuting)}");

        base.OnActionExecuting(context);
    }

    public override void OnActionExecuted(ActionExecutedContext context)
    {
        Console.WriteLine(
            $"- {nameof(SampleActionFilterAttribute)}.{nameof(OnActionExecuted)}");

        base.OnActionExecuted(context);
    }
}

```
