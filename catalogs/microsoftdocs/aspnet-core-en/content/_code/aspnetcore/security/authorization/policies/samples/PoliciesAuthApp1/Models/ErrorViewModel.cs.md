# Source code: aspnetcore/security/authorization/policies/samples/PoliciesAuthApp1/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace PoliciesAuthApp1.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
