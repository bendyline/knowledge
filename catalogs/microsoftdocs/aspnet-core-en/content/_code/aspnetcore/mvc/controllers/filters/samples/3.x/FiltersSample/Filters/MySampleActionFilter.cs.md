# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/Filters/MySampleActionFilter.cs

Complete source file; linked examples may select a region or line range.

```
using FiltersSample.Helper;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Reflection;

namespace FiltersSample.Filters
{
    // <snippet_ActionFilter>
    public class MySampleActionFilter : IActionFilter 
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Do something before the action executes.
            MyDebug.Write(MethodBase.GetCurrentMethod(), context.HttpContext.Request.Path);
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Do something after the action executes.
            MyDebug.Write(MethodBase.GetCurrentMethod(), context.HttpContext.Request.Path);
        }
    }
    // </snippet_ActionFilter>
}    
```
