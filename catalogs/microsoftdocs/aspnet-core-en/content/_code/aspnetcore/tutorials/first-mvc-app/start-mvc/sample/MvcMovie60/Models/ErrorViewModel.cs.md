# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace MvcMovie.Models
{
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
