# Source code: aspnetcore/signalr/hubcontext/sample/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace SignalRNotify.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
