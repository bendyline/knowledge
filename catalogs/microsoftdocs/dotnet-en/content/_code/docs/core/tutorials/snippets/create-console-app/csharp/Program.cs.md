# Source code: docs/core/tutorials/snippets/create-console-app/csharp/Program.cs

Complete source file; linked examples may select a region or line range.

```
// <MainMethod>
Console.WriteLine("What is your name?");
var name = Console.ReadLine();
var currentDate = DateTime.Now;
Console.WriteLine($"{Environment.NewLine}Hello, {name}, on {currentDate:d} at {currentDate:t}!");
Console.Write($"{Environment.NewLine}Press Enter to exit...");
Console.Read();
// </MainMethod>

```
