# Source code: aspnetcore/mvc/controllers/routing/samples/6.x/main/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```

namespace WebMvcRouting.Models;
public class ErrorViewModel
{
    public string? RequestId { get; set; }

    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
}

```
