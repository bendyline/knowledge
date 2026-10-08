# Source code: docs/core/whats-new/snippets/dotnet-core-2-1/csharp/brotli.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.IO;
using System.IO.Compression;

public static class BrotliExample
{
    // <Snippet1>
    public static Stream DecompressWithBrotli(Stream toDecompress)
    {
        MemoryStream decompressedStream = new MemoryStream();
        using (BrotliStream decompressionStream = new BrotliStream(toDecompress, CompressionMode.Decompress))
        {
            decompressionStream.CopyTo(decompressedStream);
        }
        decompressedStream.Position = 0;
        return decompressedStream;
    }
    // </Snippet1>
}
```
