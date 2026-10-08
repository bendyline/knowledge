# Source code: docs/csharp/programming-guide/classes-and-structs/snippets/instance-constructors/person/Program.cs

Complete source file; linked examples may select a region or line range.

```
public class Person
{
    public int age;
    public string name = "unknown";
}

class Example
{
    static void Main()
    {
        var person = new Person();
        Console.WriteLine($"Name: {person.name}, Age: {person.age}");
        // Output:  Name: unknown, Age: 0
    }
}

```
