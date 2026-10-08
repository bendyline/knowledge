# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/10.0-completed/Models/ErrorViewModel.cs

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
