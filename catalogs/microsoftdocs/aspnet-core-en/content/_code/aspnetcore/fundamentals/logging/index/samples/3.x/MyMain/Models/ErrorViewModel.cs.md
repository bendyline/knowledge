# Source code: aspnetcore/fundamentals/logging/index/samples/3.x/MyMain/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace MyMain.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}

```
