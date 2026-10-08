# Source code: samples/core/Miscellaneous/NewInEFCore9.CompiledModels/App/Program.cs

Complete source file; linked examples may select a region or line range.

```
using NewInEfCore9;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("Starting application...");

        using var context = new BlogsContext();

        Console.WriteLine($"Model loaded with {context.Model.GetEntityTypes().Count()} entity types.");
    }
}

```
