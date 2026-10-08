# Source code: aspnetcore/mvc/controllers/routing/samples/3.x/AreasRouting/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace AreasRouting.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}

```
