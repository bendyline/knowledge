# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.conversion/cs/iconvertible1.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class Example3
{
    public static void Main()
    {
        CallEII();
        Console.WriteLine("-----");
    }

    private static void CallEII()
    {
        // <Snippet7>
        int codePoint = 1067;
        IConvertible iConv = codePoint;
        char ch = iConv.ToChar(null);
        Console.WriteLine($"Converted {codePoint} to {ch}.");
        // </Snippet7>
    }
}

```
