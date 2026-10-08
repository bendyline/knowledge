# Source code: aspnetcore/data/ef-mvc/intro/samples/cu-final/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace ContosoUniversity.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
