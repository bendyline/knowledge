# Source code: docs/core/extensions/snippets/primitives/string/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics;
using BenchmarkDotNet.Running;

_ = bool.TryParse(args?[0], out bool runBenchmark);
if (runBenchmark && !Debugger.IsAttached)
{
    Console.WriteLine("Running benchmarks.");
    Console.WriteLine();

    _ = BenchmarkRunner.Run<Example>();
}
else
{
    var example = new Example();

    example.RunTokenizer();
    example.RunSegments();
    example.ShowStringValues();
}

```
