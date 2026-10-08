# Source code: aspnetcore/mvc/controllers/routing/samples/6.x/AreasRouting/Models/ErrorViewModel.cs

Complete source file; linked examples may select a region or line range.

```

namespace AreasRouting.Models;
public class ErrorViewModel
{
    public string? RequestId { get; set; }

    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
}

```
