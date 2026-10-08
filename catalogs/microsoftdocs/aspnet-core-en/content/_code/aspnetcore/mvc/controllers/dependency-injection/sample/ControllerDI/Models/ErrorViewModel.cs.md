# Source code: aspnetcore/mvc/controllers/dependency-injection/sample/ControllerDI/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace ControllerDI.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
