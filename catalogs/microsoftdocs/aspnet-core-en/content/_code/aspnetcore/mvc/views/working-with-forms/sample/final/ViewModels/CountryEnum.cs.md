# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/ViewModels/CountryEnum.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace FormsTagHelper.ViewModels
{
    public enum CountryEnum
    {
        [Display(Name = "United Mexican States")]
        Mexico,
        [Display(Name = "United States of America")]
        USA,
        Canada,
        France,
        Germany,
        Spain
    }
}
```
