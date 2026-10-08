# Source code: aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Validation/NullObjectModelValidator.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace ValidationSample.Validation;

// <snippet_Class>
public class NullObjectModelValidator : IObjectModelValidator
{
    public void Validate(ActionContext actionContext,
        ValidationStateDictionary? validationState, string prefix, object? model)
    {

    }
}
// </snippet_Class>

```
