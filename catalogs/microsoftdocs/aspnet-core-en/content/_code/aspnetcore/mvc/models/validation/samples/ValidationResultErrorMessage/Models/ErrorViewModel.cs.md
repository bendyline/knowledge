# Source code: aspnetcore/mvc/models/validation/samples/ValidationResultErrorMessage/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace ValidationResultErrorMessage.Models;

public class ErrorViewModel
{
    public string? RequestId { get; set; }

    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);

    public string Message { get; set; } = string.Empty;
}

```
