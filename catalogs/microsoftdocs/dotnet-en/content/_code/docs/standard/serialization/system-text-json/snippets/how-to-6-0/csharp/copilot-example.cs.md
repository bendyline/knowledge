# Source code: docs/standard/serialization/system-text-json/snippets/how-to-6-0/csharp/copilot-example.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int Age { get; set; }
    public string? Country { get; set; }
}

public class Program
{
    public static void Main()
    {
        var person = new Person
        {
            FirstName = "John",
            LastName = "Doe",
            Age = 30,
            Country = "USA"
        };

        string jsonString = JsonSerializer.Serialize(person);
        Console.WriteLine(jsonString);
    }
}

```
