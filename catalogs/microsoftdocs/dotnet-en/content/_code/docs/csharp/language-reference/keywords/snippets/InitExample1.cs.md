# Source code: docs/csharp/language-reference/keywords/snippets/InitExample1.cs

Complete source file; linked examples may select a region or line range.

```
class Person_InitExample
{
     private int _yearOfBirth;

     public int YearOfBirth
     {
         get { return _yearOfBirth; }
         init { _yearOfBirth = value; }
     }
}

```
