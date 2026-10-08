# Source code: aspnetcore/release-notes/aspnetcore-6.0/samples/WebMvcEF/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace WebMvcEF.Models
{
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
