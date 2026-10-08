# Source code: aspnetcore/data/ef-rp/intro/samples/cu20snapshots/cu-part5-complex/Filters/HandleSqlExceptionAttribute.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Data.SqlClient;

namespace ContosoUniversity.Filters
{
    public class HandleSqlExceptionAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var result = new ViewResult
            {
                ViewName = "Students/Error"
            };

            var exception = context.Exception;

            // If the exception is of the exact type we're seeking, 
            // populate TempData with instructions for the user.
            if (exception is SqlException ) //  && ((SqlException)exception).Number == 4060)
            {
                var msg = "Run \"dotnet ef database update\" " + exception.ToString();
                result.TempData = new TempDataDictionary(context.HttpContext, new SessionStateTempDataProvider())
                {
                    { "HandleSqlException", msg }
                };

                context.Result = result;
                context.ExceptionHandled = true;
            }
        }
    }
}
```
