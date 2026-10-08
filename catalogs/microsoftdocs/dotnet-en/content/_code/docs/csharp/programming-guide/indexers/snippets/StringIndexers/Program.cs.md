# Source code: docs/csharp/programming-guide/indexers/snippets/StringIndexers/Program.cs

Complete source file; linked examples may select a region or line range.

```
var week = new DayCollection();
Console.WriteLine(week["Fri"]);

try
{
    Console.WriteLine(week["Made-up day"]);
}
catch (ArgumentOutOfRangeException e)
{
    Console.WriteLine($"Not supported input: {e.Message}");
}

```
