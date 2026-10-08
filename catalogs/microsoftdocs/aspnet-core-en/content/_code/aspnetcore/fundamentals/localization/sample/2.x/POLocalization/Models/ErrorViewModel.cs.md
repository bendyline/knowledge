# Source code: aspnetcore/fundamentals/localization/sample/2.x/POLocalization/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace POLocalization.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
