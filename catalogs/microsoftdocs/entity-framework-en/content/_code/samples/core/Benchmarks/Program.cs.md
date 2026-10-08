# Source code: samples/core/Benchmarks/Program.cs

Complete source file; linked examples may select a region or line range.

```
using BenchmarkDotNet.Running;

public class Program
{
    public static void Main(string[] args) => BenchmarkSwitcher.FromAssembly(typeof(Program).Assembly).Run(args);
}

```
