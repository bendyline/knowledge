# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/Filters/UnprocessableResultFilter.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Net;

namespace FiltersSample.Filters
{
    // <snippet>
    public class UnprocessableResultFilter : Attribute, IAlwaysRunResultFilter
    {
        public void OnResultExecuting(ResultExecutingContext context)
        {
            if (context.Result is StatusCodeResult statusCodeResult &&
                statusCodeResult.StatusCode == (int) HttpStatusCode.UnsupportedMediaType)
            {
                context.Result = new ObjectResult("Can't process this!")
                {
                    StatusCode = (int) HttpStatusCode.UnsupportedMediaType,
                };
            }
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {
        }
    }
    // </snippet>
}

```
