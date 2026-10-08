# Source code: aspnetcore/security/anti-request-forgery/samples/6.x/AntiRequestForgerySample/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace AntiRequestForgerySample.Models;

public class ErrorViewModel
{
    public string? RequestId { get; set; }

    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
}

```
