# Source code: aspnetcore/security/authorization/policies/samples/6.0/AuthorizationPoliciesSample/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace AuthorizationPoliciesSample.Models
{
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}

```
