# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace FiltersSample.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}

```
