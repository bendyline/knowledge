# Source code: aspnetcore/mvc/advanced/app-parts/sample2/AppPartsSample/ViewModels/FeaturesViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using Microsoft.CodeAnalysis;
using TypeInfo = System.Reflection.TypeInfo;

namespace AppPartsSample.ViewModels
{
    public class FeaturesViewModel
    {
        public List<TypeInfo> Controllers { get; set; }

        public List<TypeInfo> TagHelpers { get; set; }

        public List<TypeInfo> ViewComponents { get; set; } 
    }
}

```
