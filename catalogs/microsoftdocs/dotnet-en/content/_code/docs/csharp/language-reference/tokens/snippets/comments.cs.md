# Source code: docs/csharp/language-reference/tokens/snippets/comments.cs

Complete source file; linked examples may select a region or line range.

```


public class C
{
    // <ExampleComments>
    // This is a single line comment.

    /* This could be a summary of all the
       code that's in this class.
       You might add multiple paragraphs, or links to pages
       like https://learn.microsoft.com/dotnet/csharp.
       
       You could even include emojis. This example is 🔥
       Then, when you're done, close with
       */
    // </ExampleComments>

    // <InlineComment>
    public static int Add(int left, int right)
    {
        return left /* first operand */ + right /* second operand */;
    }
    // </InlineComment>

    public static int Increment(int source)
    {
        // <LineEndingComment>
        return source++; // increment the source.
        // </LineEndingComment>
    }

}
```
