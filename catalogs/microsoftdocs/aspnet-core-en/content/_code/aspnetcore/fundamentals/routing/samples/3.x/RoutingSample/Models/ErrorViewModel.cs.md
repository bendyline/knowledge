# Source code: aspnetcore/fundamentals/routing/samples/3.x/RoutingSample/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace RoutingSample.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}

```
