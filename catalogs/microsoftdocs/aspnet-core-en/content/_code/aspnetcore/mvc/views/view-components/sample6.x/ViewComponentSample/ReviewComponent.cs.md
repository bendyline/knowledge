# Source code: aspnetcore/mvc/views/view-components/sample6.x/ViewComponentSample/ReviewComponent.cs

Complete source file; linked examples may select a region or line range.

```
#region snippet
using Microsoft.AspNetCore.Mvc;

[NonViewComponent]
public class ReviewComponent
{
    public string Status(string name) => JobStatus.GetCurrentStatus(name);
}
#endregion

public static class JobStatus
{
    public static string GetCurrentStatus(string name) => name;
}

```
