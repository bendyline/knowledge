# Source code: aspnetcore/performance/response-compression/samples/6.x/SampleApp/CustomCompressionProvider.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.ResponseCompression;

public class CustomCompressionProvider : ICompressionProvider
{
    public string EncodingName => "mycustomcompression";
    public bool SupportsFlush => true;

    public Stream CreateStream(Stream outputStream)
    {
        // Replace with a custom compression stream wrapper.
        return outputStream;
    }
}

```
