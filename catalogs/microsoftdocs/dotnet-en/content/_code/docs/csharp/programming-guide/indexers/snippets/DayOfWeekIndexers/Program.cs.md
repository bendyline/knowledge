# Source code: docs/csharp/programming-guide/indexers/snippets/DayOfWeekIndexers/Program.cs

Complete source file; linked examples may select a region or line range.

```
var week = new DayOfWeekCollection();
Console.WriteLine(week[DayOfWeek.Friday]);

try
{
    Console.WriteLine(week[(DayOfWeek)43]);
}
catch (ArgumentOutOfRangeException e)
{
    Console.WriteLine($"Not supported input: {e.Message}");
}

```
