# Source code: docs/csharp/fundamentals/program-structure/snippets/top-level-statements-5/Program.cs

Complete source file; linked examples may select a region or line range.

```
string? s = Console.ReadLine();

int returnValue = int.Parse(s ?? "-1");
return returnValue;

```
