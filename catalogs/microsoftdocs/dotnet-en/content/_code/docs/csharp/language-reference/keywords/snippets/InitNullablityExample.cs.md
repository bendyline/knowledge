# Source code: docs/csharp/language-reference/keywords/snippets/InitNullablityExample.cs

Complete source file; linked examples may select a region or line range.

```
namespace InitExample;

// <Snippet4>
class Person_InitExampleNullability
{
    private int? _yearOfBirth;

    public int? YearOfBirth
    {
        get => _yearOfBirth;
        init => _yearOfBirth = value;
    }
}
// </Snippet4>

// <SnippetNonNullable>
class Person_InitExampleNonNull
{
    private int _yearOfBirth;

    public required int YearOfBirth
    {
        get => _yearOfBirth;
        init => _yearOfBirth = value;
    }
}
// </SnippetNonNullable>

```
