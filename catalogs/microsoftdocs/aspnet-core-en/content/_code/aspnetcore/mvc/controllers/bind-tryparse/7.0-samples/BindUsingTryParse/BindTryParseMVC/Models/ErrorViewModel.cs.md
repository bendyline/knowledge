# Source code: aspnetcore/mvc/controllers/bind-tryparse/7.0-samples/BindUsingTryParse/BindTryParseMVC/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace BindTryParseMVC.Models
{
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```
