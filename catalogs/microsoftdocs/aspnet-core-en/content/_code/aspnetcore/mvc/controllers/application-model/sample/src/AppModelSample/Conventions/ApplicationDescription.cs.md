# Source code: aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/ApplicationDescription.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace AppModelSample.Conventions
{
    public class ApplicationDescription : IApplicationModelConvention
    {
        private readonly string _description;

        public ApplicationDescription(string description)
        {
            _description = description;
        }

        public void Apply(ApplicationModel application)
        {
            application.Properties["description"] = _description;
        }
    }
}
```
