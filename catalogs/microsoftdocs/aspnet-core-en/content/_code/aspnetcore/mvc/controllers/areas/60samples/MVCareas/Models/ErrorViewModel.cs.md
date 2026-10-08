# Source code: aspnetcore/mvc/controllers/areas/60samples/MVCareas/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace MVCareas.Models
{
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
