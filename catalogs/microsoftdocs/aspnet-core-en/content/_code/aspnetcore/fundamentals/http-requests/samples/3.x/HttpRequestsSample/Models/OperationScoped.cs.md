# Source code: aspnetcore/fundamentals/http-requests/samples/3.x/HttpRequestsSample/Models/OperationScoped.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace HttpRequestsSample.Models
{
    // <snippet_Types>
    public interface IOperationScoped 
    {
        string OperationId { get; }
    }

    public class OperationScoped : IOperationScoped
    {
        public string OperationId { get; } = Guid.NewGuid().ToString()[^4..];
    }
    // </snippet_Types>
}

```
