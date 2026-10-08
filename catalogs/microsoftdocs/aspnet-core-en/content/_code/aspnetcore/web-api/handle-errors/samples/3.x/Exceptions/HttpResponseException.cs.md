# Source code: aspnetcore/web-api/handle-errors/samples/3.x/Exceptions/HttpResponseException.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace WebApiSample.Exceptions
{
    // <snippet_HttpResponseException>
    public class HttpResponseException : Exception
    {
        public int Status { get; set; } = 500;

        public object Value { get; set; }
    }
    // </snippet_HttpResponseException>
}

```
