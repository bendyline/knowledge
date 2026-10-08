# Source code: docs/core/tutorials/snippets/create-console-app/vb/Program.vb

Complete source file; linked examples may select a region or line range.

```
Module Program
    Sub Main(args As String())
        ' <MainMethod>
        Console.WriteLine("What is your name?")
        Dim name = Console.ReadLine()
        Dim currentDate = DateTime.Now
        Console.WriteLine($"{Environment.NewLine}Hello, {name}, on {currentDate:d} at {currentDate:t}")
        Console.Write($"{Environment.NewLine}Press any key to exit...")
        Console.ReadKey(True)
        ' </MainMethod>
    End Sub
End Module

```
