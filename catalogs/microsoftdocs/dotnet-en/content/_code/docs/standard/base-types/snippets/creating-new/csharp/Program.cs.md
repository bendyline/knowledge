# Source code: docs/standard/base-types/snippets/creating-new/csharp/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;

// <UsingSpanConstructor>
static string CreateStringFromSpan()
{
    Span<char> span = stackalloc char[5];
    for (int i = 0; i < 5; i++)
    {
        span[i] = (char)('a' + i);
    }
    return new string(span);
}

Console.WriteLine(CreateStringFromSpan()); // abcde
// </UsingSpanConstructor>

// <UsingStringCreate>
string result = string.Create(5, 'a', (span, firstChar) =>
{
    for (int i = 0; i < span.Length; i++)
    {
        span[i] = (char)(firstChar + i);
    }
});

Console.WriteLine(result); // abcde
// </UsingStringCreate>


```
