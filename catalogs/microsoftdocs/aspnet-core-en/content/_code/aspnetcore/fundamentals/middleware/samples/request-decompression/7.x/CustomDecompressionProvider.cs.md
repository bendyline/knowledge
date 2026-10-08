# Source code: aspnetcore/fundamentals/middleware/samples/request-decompression/7.x/CustomDecompressionProvider.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.RequestDecompression;

namespace RequestDecompressionSample;

#region snippet_CustomDecompressionProvider
public class CustomDecompressionProvider : IDecompressionProvider
{
    public Stream GetDecompressionStream(Stream stream)
    {
        // Perform custom decompression logic here
        return stream;
    }
}
#endregion

```
