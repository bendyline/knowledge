# Source code: samples/snippets/csharp/snippets/tour/UnmanagedResources.csx

Complete source file; linked examples may select a region or line range.

```
using System.IO;

using (FileStream stream = GetFileStream(context))
{
    // Operations on the stream
}
```
