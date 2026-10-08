# Source code: aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Snippets/HttpResponseException.cs

Complete source file; linked examples may select a region or line range.

```
namespace HandleErrorsSample.Snippets;

// <snippet_Class>
public class HttpResponseException : Exception
{
    public HttpResponseException(int statusCode, object? value = null) =>
        (StatusCode, Value) = (statusCode, value);

    public int StatusCode { get; }

    public object? Value { get; }
}
// </snippet_Class>

```
