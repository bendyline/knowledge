# Source code: aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/ActionDescriptionAttribute.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace AppModelSample.Conventions
{
    public class ActionDescriptionAttribute : Attribute, IActionModelConvention
    {
        private readonly string _description;

        public ActionDescriptionAttribute(string description)
        {
            _description = description;
        }

        public void Apply(ActionModel actionModel)
        {
            actionModel.Properties["description"] = _description;
        }
    }
}
```
