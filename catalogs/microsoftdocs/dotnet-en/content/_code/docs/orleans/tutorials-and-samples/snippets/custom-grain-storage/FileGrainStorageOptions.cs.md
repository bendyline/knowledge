# Source code: docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileGrainStorageOptions.cs

Complete source file; linked examples may select a region or line range.

```
using Orleans.Storage;

namespace GrainStorage;

public sealed class FileGrainStorageOptions : IStorageProviderSerializerOptions
{
    public required string RootDirectory { get; set; }

    public required IGrainStorageSerializer GrainStorageSerializer { get; set; }
}

```
