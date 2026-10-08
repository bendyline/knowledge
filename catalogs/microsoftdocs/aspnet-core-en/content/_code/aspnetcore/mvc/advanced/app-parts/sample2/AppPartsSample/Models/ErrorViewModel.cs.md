# Source code: aspnetcore/mvc/advanced/app-parts/sample2/AppPartsSample/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace AppPartsSample.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
