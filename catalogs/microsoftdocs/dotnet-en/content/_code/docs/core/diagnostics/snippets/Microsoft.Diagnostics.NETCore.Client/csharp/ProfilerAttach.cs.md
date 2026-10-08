# Source code: docs/core/diagnostics/snippets/Microsoft.Diagnostics.NETCore.Client/csharp/ProfilerAttach.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.Diagnostics.NETCore.Client;

public class Profiler
{
    public static void AttachProfiler(int processId, Guid profilerGuid, string profilerPath)
    {
        var client = new DiagnosticsClient(processId);
        client.AttachProfiler(TimeSpan.FromSeconds(10), profilerGuid, profilerPath);
    }
}

```
