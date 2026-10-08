# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/Filters/LogConstantFilter.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace FiltersSample.Filters
{
    // <snippet_TypeFilter_Implementation>
    public class LogConstantFilter : IActionFilter
    {
        private readonly string _value;
        private readonly ILogger<LogConstantFilter> _logger;

        public LogConstantFilter(string value, ILogger<LogConstantFilter> logger)
        {
            _logger = logger;
            _value = value;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation(_value);
        }

        public void OnActionExecuted(ActionExecutedContext context)
        { }
    }
    // </snippet_TypeFilter_Implementation>
}

```
