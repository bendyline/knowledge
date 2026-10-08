# Source code: docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorageFactory.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Orleans.Configuration.Overrides;
using Orleans.Storage;

namespace GrainStorage;

// <file_grain_storage_factory>
public static class FileGrainStorageFactory
{
    internal static IGrainStorage Create(
        IServiceProvider services, string name)
    {
        IOptionsSnapshot<FileGrainStorageOptions> optionsSnapshot =
            services.GetRequiredService<IOptionsSnapshot<FileGrainStorageOptions>>();

        return ActivatorUtilities.CreateInstance<FileGrainStorageImpl>(
            services,
            name,
            optionsSnapshot.Get(name),
            services.GetProviderClusterOptions(name));
    }
}
// </file_grain_storage_factory>

```
