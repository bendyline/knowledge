# Source code: docs/core/diagnostics/snippets/Microsoft.Diagnostics.NETCore.Client/csharp/TriggerCoreDump.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Diagnostics.NETCore.Client;

public partial class Dumper
{
    public static void TriggerCoreDump(int processId)
    {
        var client = new DiagnosticsClient(processId);
        client.WriteDump(DumpType.Normal, "/tmp/minidump.dmp");
    }
}

```
