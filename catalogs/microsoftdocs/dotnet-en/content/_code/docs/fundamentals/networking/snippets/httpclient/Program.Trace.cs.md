# Source code: docs/fundamentals/networking/snippets/httpclient/Program.Trace.cs

Complete source file; linked examples may select a region or line range.

```
static partial class Program
{
    static void Trace()
    {
        // <trace>
        using HttpRequestMessage request = new(
            HttpMethod.Trace, 
            "{ValidRequestUri}");
        // </trace>
    }
}

```
