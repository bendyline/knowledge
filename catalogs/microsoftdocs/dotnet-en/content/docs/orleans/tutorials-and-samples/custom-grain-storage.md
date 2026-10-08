---
title: Custom grain storage sample project
description: Explore a custom grain storage sample project written with .NET Orleans.
ms.date: 03/10/2026
ms.topic: tutorial
zone_pivot_groups: orleans-version
ai-usage: ai-assisted
---

# Custom grain storage

In the tutorial on declarative actor storage, you learned how to allow grains to store their state in an Azure table using one of the built-in storage providers. While Azure is a great place to store your data, many alternatives exist. There are so many that supporting them all isn't feasible. Instead, Orleans is designed to let you easily add support for your preferred storage by writing a custom grain storage provider.

In this tutorial, you'll walk through how to write a simple file-based grain storage provider. A file system isn't the best place to store grain states because it's local, can have issues with file locks, and the last update date isn't sufficient to prevent inconsistency. However, it's an easy example to illustrate the implementation of a _grain storage_ provider.

## Get started

An Orleans grain storage provider is a class that implements [Orleans.Storage.IGrainStorage](https://learn.microsoft.com/search/?terms=Orleans.Storage.IGrainStorage), included in the [Microsoft.Orleans.Core](https://www.nuget.org/packages/Microsoft.Orleans.Core) NuGet package. It also inherits from `ILifecycleParticipant<ISiloLifecycle>`, allowing you to subscribe to specific events in the silo's lifecycle. Start by creating a class named `FileGrainStorage`.

**Applies to: orleans-7-0,orleans-8-0,orleans-9-0,orleans-10-0**


```csharp
using Microsoft.Extensions.Options;
using Orleans.Configuration;
using Orleans.Runtime;
using Orleans.Storage;

namespace GrainStorage;

public sealed class FileGrainStorage : IGrainStorage, ILifecycleParticipant<ISiloLifecycle>
{
    private readonly string _storageName;
    private readonly FileGrainStorageOptions _options;
    private readonly ClusterOptions _clusterOptions;

    public FileGrainStorage(
        string storageName,
        FileGrainStorageOptions options,
        IOptions<ClusterOptions> clusterOptions)
    {
        _storageName = storageName;
        _options = options;
        _clusterOptions = clusterOptions.Value;
    }

    public Task ClearStateAsync<T>(
        string stateName,
        GrainId grainId,
        IGrainState<T> grainState)
    {
        throw new NotImplementedException();
    }

    public Task ReadStateAsync<T>(
        string stateName,
        GrainId grainId,
        IGrainState<T> grainState)
    {
        throw new NotImplementedException();
    }

    public Task WriteStateAsync<T>(
        string stateName,
        GrainId grainId,
        IGrainState<T> grainState)
    {
        throw new NotImplementedException();
    }

    public void Participate(ISiloLifecycle lifecycle) =>
        throw new NotImplementedException();
}
```

Each method implements the corresponding method in the [Orleans.Storage.IGrainStorage](https://learn.microsoft.com/search/?terms=Orleans.Storage.IGrainStorage) interface, accepting a generic type parameter for the underlying state type. The methods are:

- [Orleans.Storage.IGrainStorage.ReadStateAsync*](https://learn.microsoft.com/search/?terms=Orleans.Storage.IGrainStorage.ReadStateAsync*): Reads the state of a grain.
- [Orleans.Storage.IGrainStorage.WriteStateAsync*](https://learn.microsoft.com/search/?terms=Orleans.Storage.IGrainStorage.WriteStateAsync*): Writes the state of a grain.
- [Orleans.Storage.IGrainStorage.ClearStateAsync*](https://learn.microsoft.com/search/?terms=Orleans.Storage.IGrainStorage.ClearStateAsync*): Clears the state of a grain.

The [Orleans.ILifecycleParticipant`1.Participate*](https://learn.microsoft.com/search/?terms=Orleans.ILifecycleParticipant%601.Participate*) method subscribes to the silo's lifecycle.

Before starting the implementation, create an options class containing the root directory where grain state files are persisted. Create an options file named `FileGrainStorageOptions` containing the following:

[source="snippets/custom-grain-storage/FileGrainStorageOptions.cs"::: (complete source file; reference: snippets/custom-grain-storage/FileGrainStorageOptions.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileGrainStorageOptions.cs.md)

With the options class created, explore the constructor parameters of the `FileGrainStorage` class:

- `storageName`: Specifies which grains should use this storage provider, for example, `[StorageProvider(ProviderName = "File")]`.
- `options`: The options class just created.
- `clusterOptions`: The cluster options used for retrieving the [Orleans.Configuration.ClusterOptions.ServiceId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ServiceId).

## Initialize the storage

To initialize the storage, subscribe to the [Orleans.ServiceLifecycleStage.ApplicationServices](https://learn.microsoft.com/search/?terms=Orleans.ServiceLifecycleStage.ApplicationServices) stage with an `onStart` function. Consider the following [Orleans.ILifecycleParticipant`1.Participate*](https://learn.microsoft.com/search/?terms=Orleans.ILifecycleParticipant%601.Participate*) implementation:

[source="snippets/custom-grain-storage/FileGrainStorage.cs" id="participate"::: (complete source file; reference: snippets/custom-grain-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileGrainStorage.cs.md)

The `onStart` function conditionally creates the root directory to store grain states if it doesn't already exist.

Also, provide a common function to construct the filename, ensuring uniqueness per service, grain ID, and grain type:

[source="snippets/custom-grain-storage/FileGrainStorage.cs" id="getkeystring"::: (complete source file; reference: snippets/custom-grain-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileGrainStorage.cs.md)

## Read state

To read a grain state, get the filename using the `GetKeyString` function and combine it with the root directory from the `_options` instance.

[source="snippets/custom-grain-storage/FileGrainStorage.cs" id="readstateasync"::: (complete source file; reference: snippets/custom-grain-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileGrainStorage.cs.md)

Use `fileInfo.LastWriteTimeUtc` as an `ETag`, which other functions use for inconsistency checks to prevent data loss.

For deserialization, use the [Orleans.Storage.IStorageProviderSerializerOptions.GrainStorageSerializer](https://learn.microsoft.com/search/?terms=Orleans.Storage.IStorageProviderSerializerOptions.GrainStorageSerializer). This is important for correctly serializing and deserializing the state.

## Write state

Writing the state is similar to reading the state.

[source="snippets/custom-grain-storage/FileGrainStorage.cs" id="writestateasync"::: (complete source file; reference: snippets/custom-grain-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileGrainStorage.cs.md)

Similar to reading state, use the [Orleans.Storage.IStorageProviderSerializerOptions.GrainStorageSerializer](https://learn.microsoft.com/search/?terms=Orleans.Storage.IStorageProviderSerializerOptions.GrainStorageSerializer) to write the state. The current `ETag` checks against the file's last updated UTC time. If the date differs, it means another activation of the same grain changed the state concurrently. In this situation, throw an [Orleans.Storage.InconsistentStateException](https://learn.microsoft.com/search/?terms=Orleans.Storage.InconsistentStateException). This results in the current activation being killed to prevent overwriting the state previously saved by the other activated grain.

## Clear state

Clearing the state involves deleting the file if it exists.

[source="snippets/custom-grain-storage/FileGrainStorage.cs" id="clearstateasync"::: (complete source file; reference: snippets/custom-grain-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileGrainStorage.cs.md)

For the same reason as [Orleans.Grain`1.WriteStateAsync*](https://learn.microsoft.com/search/?terms=Orleans.Grain%601.WriteStateAsync*), check for inconsistency. Before deleting the file and resetting the `ETag`, check if the current `ETag` matches the last write time UTC.

## Put it all together

Next, create a factory that allows scoping the options to the provider name while creating an instance of `FileGrainStorage` to ease registration with the service collection.

[source="snippets/custom-grain-storage/FileGrainStorageFactory.cs"::: (complete source file; reference: snippets/custom-grain-storage/FileGrainStorageFactory.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileGrainStorageFactory.cs.md)

Lastly, to register the grain storage, create an extension on [Orleans.Hosting.ISiloBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.ISiloBuilder). This extension registers the grain storage as a keyed singleton using [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddKeyedSingleton*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddKeyedSingleton*), the standard .NET 8+ keyed DI API.

[source="snippets/custom-grain-storage/FileSiloBuilderExtensions.cs"::: (complete source file; reference: snippets/custom-grain-storage/FileSiloBuilderExtensions.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileSiloBuilderExtensions.cs.md)

The `FileGrainStorage` implements two interfaces, [Orleans.Storage.IGrainStorage](https://learn.microsoft.com/search/?terms=Orleans.Storage.IGrainStorage) and `ILifecycleParticipant<ISiloLifecycle>`. Therefore, register two keyed singleton services, one for each interface.

[source="snippets/custom-grain-storage/FileSiloBuilderExtensions.cs" id="KeyedRegistrations"::: (complete source file; reference: snippets/custom-grain-storage/FileSiloBuilderExtensions.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileSiloBuilderExtensions.cs.md)

This enables adding the file storage using the extension on [Orleans.Hosting.ISiloBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.ISiloBuilder):

[source="snippets/custom-grain-storage/Program.cs"::: (complete source file; reference: snippets/custom-grain-storage/Program.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/Program.cs.md)

Now you can decorate your grains with the provider `[StorageProvider(ProviderName = "File")]`, and it stores the grain state in the root directory set in the options. Consider the full implementation of `FileGrainStorage`:

[source="snippets/custom-grain-storage/FileGrainStorage.cs"::: (complete source file; reference: snippets/custom-grain-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/FileGrainStorage.cs.md)



**Applies to: orleans-3-x**


[language="csharp" source="snippets-v3/custom-storage/FileGrainStorage.cs" id="file_grain_storage"::: (complete source file; reference: snippets-v3/custom-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorage.cs.md)

Before starting the implementation, create an options class containing the root directory where grain state files are stored. Create an options file named `FileGrainStorageOptions`:

[language="csharp" source="snippets-v3/custom-storage/FileGrainStorageOptions.cs" id="file_grain_storage_options"::: (complete source file; reference: snippets-v3/custom-storage/FileGrainStorageOptions.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorageOptions.cs.md)

Create a constructor containing two fields: `storageName` to specify which grains should use this storage (`[StorageProvider(ProviderName = "File")]`) and `directory`, the directory where grain states are saved.

[Orleans.IGrainFactory](https://learn.microsoft.com/search/?terms=Orleans.IGrainFactory) and `ITypeResolver` are used in the next section to initialize the storage.

Also, take two options as arguments: your own `FileGrainStorageOptions` and the [Orleans.Configuration.ClusterOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions). These are needed for implementing the storage functionalities.

You also need `JsonSerializerSettings` as you are serializing and deserializing in JSON format.

> **Important:**
> JSON is an implementation detail. It's up to you to decide which serialization/deserialization protocol fits your application. Another common format is binary.

## Initialize the storage

To initialize the storage, register an `Init` function on the `ApplicationServices` lifecycle.

[language="csharp" source="snippets-v3/custom-storage/FileGrainStorage.cs" id="participate"::: (complete source file; reference: snippets-v3/custom-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorage.cs.md)

The `Init` function sets the `_jsonSettings` used to configure the JSON serializer. At the same time, create the folder to store grain states if it doesn't exist yet.

[language="csharp" source="snippets-v3/custom-storage/FileGrainStorage.cs" id="init"::: (complete source file; reference: snippets-v3/custom-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorage.cs.md)

Also, provide a common function to construct the filename, ensuring uniqueness per service, grain ID, and grain type.

[language="csharp" source="snippets-v3/custom-storage/FileGrainStorage.cs" id="getkeystring"::: (complete source file; reference: snippets-v3/custom-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorage.cs.md)

## Read state

To read a grain state, get the filename using the previously defined function and combine it with the root directory from the options.

[language="csharp" source="snippets-v3/custom-storage/FileGrainStorage.cs" id="readstateasync"::: (complete source file; reference: snippets-v3/custom-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorage.cs.md)

Use `fileInfo.LastWriteTimeUtc` as an ETag, which other functions use for inconsistency checks to prevent data loss.

Note that for deserialization, use the `_jsonSettings` set in the `Init` function. This is important for correctly serializing/deserializing the state.

## Write state

Writing the state is similar to reading the state.

[language="csharp" source="snippets-v3/custom-storage/FileGrainStorage.cs" id="writestateasync"::: (complete source file; reference: snippets-v3/custom-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorage.cs.md)

Similar to reading state, use `_jsonSettings` to write the state. The current ETag checks against the file's last updated UTC time. If the date differs, it means another activation of the same grain changed the state concurrently. In this situation, throw an [Orleans.Storage.InconsistentStateException](https://learn.microsoft.com/search/?terms=Orleans.Storage.InconsistentStateException), which results in the current activation being killed to prevent overwriting the state previously saved by the other activated grain.

## Clear state

Clearing the state involves deleting the file if it exists.

[language="csharp" source="snippets-v3/custom-storage/FileGrainStorage.cs" id="clearstateasync"::: (complete source file; reference: snippets-v3/custom-storage/FileGrainStorage.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorage.cs.md)

For the same reason as [Orleans.Grain`1.WriteStateAsync*](https://learn.microsoft.com/search/?terms=Orleans.Grain%601.WriteStateAsync*), check for inconsistency. Before deleting the file and resetting the ETag, check if the current ETag matches the last write time UTC.

## Put it all together

Next, create a factory that allows scoping the options to the provider name while creating an instance of `FileGrainStorage` to ease registration with the service collection.

[language="csharp" source="snippets-v3/custom-storage/FileGrainStorageFactory.cs" id="file_grain_storage_factory"::: (complete source file; reference: snippets-v3/custom-storage/FileGrainStorageFactory.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileGrainStorageFactory.cs.md)

Lastly, to register the grain storage, create an extension on [Orleans.Hosting.ISiloHostBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.ISiloHostBuilder). This extension internally registers the grain storage as a named service using `.AddSingletonNamedService(...)`, an extension provided by `Orleans.Core`.

[language="csharp" source="snippets-v3/custom-storage/FileSiloBuilderExtensions.cs" id="file_silo_builder_extensions"::: (complete source file; reference: snippets-v3/custom-storage/FileSiloBuilderExtensions.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/FileSiloBuilderExtensions.cs.md)

The `FileGrainStorage` implements two interfaces, [Orleans.Storage.IGrainStorage](https://learn.microsoft.com/search/?terms=Orleans.Storage.IGrainStorage) and `ILifecycleParticipant<ISiloLifecycle>`. Therefore, register two named services, one for each interface. This enables adding the file storage using the extension on [Orleans.Hosting.ISiloHostBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.ISiloHostBuilder):

[language="csharp" source="snippets-v3/custom-storage/Program.cs" id="silo_host_builder"::: (complete source file; reference: snippets-v3/custom-storage/Program.cs)](../../../_code/docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/Program.cs.md)

Now you can decorate your grains with the provider `[StorageProvider(ProviderName = "File")]`, and it stores the grain state in the root directory set in the options.
