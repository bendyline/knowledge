# Source code: aspnetcore/fundamentals/middleware/extensibility/samples/6.x/MiddlewareExtensibilitySample/Data/Request.cs

Complete source file; linked examples may select a region or line range.

```
namespace MiddlewareExtensibilitySample.Data;

public class Request
{
    public Request(string activation, string value)
        => (Activation, Value) = (activation, value);

    public Guid Id { get; set; } = new Guid();

    public DateTime DateTime { get; set; } = DateTime.UtcNow;

    public string Activation { get; set; }

    public string Value { get; set; }
}

```
