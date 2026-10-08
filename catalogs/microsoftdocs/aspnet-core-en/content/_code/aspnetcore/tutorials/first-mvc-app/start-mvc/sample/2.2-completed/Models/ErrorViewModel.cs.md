# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/2.2-completed/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace MvcMovie.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
