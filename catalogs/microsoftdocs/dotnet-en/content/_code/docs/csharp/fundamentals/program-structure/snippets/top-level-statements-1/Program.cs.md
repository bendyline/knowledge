# Source code: docs/csharp/fundamentals/program-structure/snippets/top-level-statements-1/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text;

StringBuilder builder = new();
builder.AppendLine("The following arguments are passed:");

foreach (var arg in args)
{
    builder.AppendLine($"Argument={arg}");
}

Console.WriteLine(builder.ToString());

return 0;

```
