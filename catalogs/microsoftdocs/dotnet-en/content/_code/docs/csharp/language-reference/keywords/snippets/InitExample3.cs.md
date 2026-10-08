# Source code: docs/csharp/language-reference/keywords/snippets/InitExample3.cs

Complete source file; linked examples may select a region or line range.

```
class Person_InitExampleExpressionBodied
{
    private int _yearOfBirth;

    public int YearOfBirth
    {
        get => _yearOfBirth;
        init => _yearOfBirth = value;
    }
}

```
