# Source code: aspnetcore/migration/fx-to-core/examples/samples/mvc/3.x/Controllers/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace WebApp1.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}

```
