# Source code: docs/core/diagnostics/snippets/MetricsGen/MyMetrics.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics.Metrics;
using Microsoft.Extensions.Diagnostics.Metrics;

namespace MetricsGen;
// <tag>
public struct RequestTags
{
    public string Region { get; set; }
}

public static partial class MyMetrics
{
    [Counter<int>(typeof(RequestTags))]
    public static partial RequestCount CreateRequestCount(Meter meter);
}
// </tag>

```
