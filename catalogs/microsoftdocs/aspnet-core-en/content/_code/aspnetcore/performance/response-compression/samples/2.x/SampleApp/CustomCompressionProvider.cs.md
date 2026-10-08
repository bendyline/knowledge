# Source code: aspnetcore/performance/response-compression/samples/2.x/SampleApp/CustomCompressionProvider.cs

Complete source file; linked examples may select a region or line range.

```
using System.IO;
using Microsoft.AspNetCore.ResponseCompression;

namespace ResponseCompressionSample
{
    #region snippet1
    public class CustomCompressionProvider : ICompressionProvider
    {
        public string EncodingName => "mycustomcompression";
        public bool SupportsFlush => true;

        public Stream CreateStream(Stream outputStream)
        {
            // Create a custom compression stream wrapper here
            return outputStream;
        }
    }
    #endregion
}

```
