# Source code: docs/fundamentals/networking/snippets/httpclient/HttpResponseMessageExtensions.cs

Complete source file; linked examples may select a region or line range.

```
static class HttpResponseMessageExtensions
{
    internal static void WriteRequestToConsole(this HttpResponseMessage response)
    {
        if (response is null)
        {
            return;
        }

        var request = response.RequestMessage;
        Console.Write($"{request?.Method} ");
        Console.Write($"{request?.RequestUri} ");
        Console.WriteLine($"HTTP/{request?.Version}");        
    }
}

```
