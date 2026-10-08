# Source code: aspnetcore/fundamentals/middleware/extensibility/samples/2.x/MiddlewareExtensibilitySample/Models/Request.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace MiddlewareExtensibilitySample.Models
{
    public class Request
    {
        public int Id { get; set; }
        public DateTime DT { get; set; }
        public string MiddlewareActivation { get; set; }
        public string Value { get; set; }
    }
}

```
