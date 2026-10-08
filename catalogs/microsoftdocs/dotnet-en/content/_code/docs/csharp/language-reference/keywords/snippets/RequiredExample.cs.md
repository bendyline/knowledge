# Source code: docs/csharp/language-reference/keywords/snippets/RequiredExample.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics.CodeAnalysis;

namespace RequiredMembers;

// <SnippetRequired>
public class Person
{
    public Person() { }

    [SetsRequiredMembers]
    public Person(string firstName, string lastName) =>
        (FirstName, LastName) = (firstName, lastName);

    public required string FirstName { get; init; }
    public required string LastName { get; init; }

    public int? Age { get; set; }
}

public class Student : Person
{
    public Student() : base()
    {
    }

    [SetsRequiredMembers]
    public Student(string firstName, string lastName) :
        base(firstName, lastName)
    {
    }

    public double GPA { get; set; }
}
// </SnippetRequired>

```
