# Source code: docs/csharp/language-reference/keywords/snippets/InitExample5.cs

Complete source file; linked examples may select a region or line range.

```
class Person_InitExampleFieldProperty
{
    public int YearOfBirth
    {
        get;
        init
        {
            field = (value <= DateTime.Now.Year)
                ? value
                : throw new ArgumentOutOfRangeException(nameof(value), "Year of birth can't be in the future");
        }
    }
}

```
