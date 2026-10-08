# Source code: aspnetcore/mvc/models/model-binding/samples/6.x/ModelBindingSample/CookieValueProviderFactory.cs

Complete source file; linked examples may select a region or line range.

```
using System.Globalization;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ModelBindingSample;

public class CookieValueProviderFactory : IValueProviderFactory
{
    public Task CreateValueProviderAsync(ValueProviderFactoryContext context)
    {
        _ = context ?? throw new ArgumentNullException(nameof(context));

        var cookies = context.ActionContext.HttpContext.Request.Cookies;
        if (cookies is not null && cookies.Count > 0)
        {
            var valueProvider = new CookieValueProvider(
                BindingSource.ModelBinding,
                cookies,
                CultureInfo.InvariantCulture);

            context.ValueProviders.Add(valueProvider);
        }

        return Task.CompletedTask;
    }
}

```
