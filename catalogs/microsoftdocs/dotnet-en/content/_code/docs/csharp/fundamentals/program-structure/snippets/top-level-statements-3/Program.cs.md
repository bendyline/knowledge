# Source code: docs/csharp/fundamentals/program-structure/snippets/top-level-statements-3/Program.cs

Complete source file; linked examples may select a region or line range.

```
if (args.Length > 0)
{
    foreach (var arg in args)
    {
        Console.WriteLine($"Argument={arg}");
    }
}
else
{
    Console.WriteLine("No arguments");
}

```
