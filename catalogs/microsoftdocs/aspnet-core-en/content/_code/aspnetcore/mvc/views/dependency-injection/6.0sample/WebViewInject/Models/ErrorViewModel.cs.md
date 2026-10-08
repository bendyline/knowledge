# Source code: aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace WebViewInject.Models
{
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
