# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/padding.cs

Complete source file; linked examples may select a region or line range.

```
// <snippet2>
using System;

class Example
{
    public static void Main()
    {
        PadLeft();
        PadRight();
    }

    public static void PadLeft()
    {
        // <snippet3>
        string MyString = "Hello World!";
        Console.WriteLine(MyString.PadLeft(20, '-'));
        // </snippet3>
    }

    public static void PadRight()
    {
        // <snippet4>
        string MyString = "Hello World!";
        Console.WriteLine(MyString.PadRight(20, '-'));
        // </snippet4>
    }
}
// </snippet2>

```
