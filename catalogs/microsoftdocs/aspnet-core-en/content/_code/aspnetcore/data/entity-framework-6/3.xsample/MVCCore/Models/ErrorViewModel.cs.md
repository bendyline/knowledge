# Source code: aspnetcore/data/entity-framework-6/3.xsample/MVCCore/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
namespace ContosoUniversity.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}

```
