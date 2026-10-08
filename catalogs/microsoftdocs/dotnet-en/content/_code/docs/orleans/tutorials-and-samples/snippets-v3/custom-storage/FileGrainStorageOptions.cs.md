# Source code: docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorageOptions.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Options;

namespace GrainStorage;

// <file_grain_storage_options>
public class FileGrainStorageOptions
{
    public string RootDirectory { get; set; }
}
// </file_grain_storage_options>

```
