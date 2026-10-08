# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/2.x/SampleApp/Filters/AddHeader.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.Filters;

namespace SampleApp.Filters
{
    #region snippet1
    public class AddHeaderAttribute : ResultFilterAttribute
    {
        private readonly string _name;
        private readonly string[] _values;

        public AddHeaderAttribute(string name, string[] values)
        {
            _name = name;
            _values = values;
        }

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            context.HttpContext.Response.Headers.Add(_name, _values);
            base.OnResultExecuting(context);
        }
    }
    #endregion
}

```
