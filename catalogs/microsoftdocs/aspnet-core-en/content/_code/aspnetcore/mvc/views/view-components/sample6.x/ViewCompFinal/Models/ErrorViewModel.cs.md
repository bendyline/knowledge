# Source code: aspnetcore/mvc/views/view-components/sample6.x/ViewCompFinal/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace ViewComponentSample.Models
{
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
