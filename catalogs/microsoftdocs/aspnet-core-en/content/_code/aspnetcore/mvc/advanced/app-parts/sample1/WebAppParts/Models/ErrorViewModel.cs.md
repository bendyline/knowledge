# Source code: aspnetcore/mvc/advanced/app-parts/sample1/WebAppParts/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace WebAppParts.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
