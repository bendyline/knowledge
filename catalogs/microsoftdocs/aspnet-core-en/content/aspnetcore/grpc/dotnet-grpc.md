---
title: Manage Protobuf references with dotnet-grpc
author: jamesnk
description: Learn about adding, updating, removing, and listing Protobuf references with the dotnet-grpc global tool.
monikerRange: '>= aspnetcore-3.0'
ms.author: wpickett
ms.date: 10/17/2019
uid: grpc/dotnet-grpc
---
# Manage Protobuf references with dotnet-grpc

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


`dotnet-grpc` is a .NET Global Tool for managing [Protobuf (`.proto`)](https://learn.microsoft.com/search/?terms=grpc%2Fbasics%23proto-file) references within a .NET gRPC project. The tool can be used to add, refresh, remove, and list Protobuf references.

## Installation

To install the `dotnet-grpc` [.NET Global Tool](https://learn.microsoft.com/dotnet/core/tools/global-tools), run the following command:

```dotnetcli
dotnet tool install -g dotnet-grpc
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


## Add references

`dotnet-grpc` can be used to add Protobuf references as `<Protobuf />` items to the `.csproj` file:

```xml
<Protobuf Include="Protos\greet.proto" GrpcServices="Server" />
```

The Protobuf references are used to generate the C# client and/or server assets. The `dotnet-grpc` tool can:

* Create a Protobuf reference from local files on disk.
* Create a Protobuf reference from a remote file specified by a URL.
* Ensure the correct gRPC package dependencies are added to the project.

For example, the `Grpc.AspNetCore` package is added to a web app. `Grpc.AspNetCore` contains gRPC server and client libraries and tooling support. Alternatively, the `Grpc.Net.Client`, `Grpc.Tools` and `Google.Protobuf` packages, which contain only the gRPC client libraries and tooling support, are added to a Console app.

### Add file

The `add-file` command is used to add local files on disk as Protobuf references. The file paths provided:

* Can be relative to the current directory or absolute paths.
* May contain wild cards for pattern-based file [globbing](https://wikipedia.org/wiki/Glob_(programming)).

If any files are outside the project directory, a `Link` element is added to display the file under the folder `Protos` in Visual Studio.

### Usage

```dotnetcli
dotnet-grpc add-file [options] <files>...
```

#### Arguments

| Argument | Description |
| --- | --- |
| files | The protobuf file references. These can be a path to glob for local protobuf files. |

#### Options

| Short option | Long option | Description |
| --- | --- | --- |
| -p | --project | The path to the project file to operate on. If a file is not specified, the command searches the current directory for one. |
| -s | --services | The type of gRPC services that should be generated. If `Default` is specified, `Both` is used for Web projects and `Client` is used for non-Web projects. Accepted values are `Both`, `Client`, `Default`, `None`, `Server`. |
| -i | --additional-import-dirs | Additional directories to be used when resolving imports for the protobuf files. This is a semicolon separated list of paths. |
|  | --access | The access modifier to use for the generated C# classes. The default value is `Public`. Accepted values are `Internal` and `Public`. |

### Add URL

The `add-url` command is used to add a remote file specified by an source URL as Protobuf reference. A file path must be provided to specify where to download the remote file. The file path can be relative to the current directory or an absolute path. If the file path is outside the project directory, a `Link` element is added to display the file under the virtual folder `Protos` in Visual Studio.

### Usage

```dotnetcli
dotnet-grpc add-url [options] <url>
```

#### Arguments

| Argument | Description |
| --- | --- |
| url | The URL to a remote protobuf file. |

#### Options

| Short option | Long option | Description |
| --- | --- | --- |
| -o | --output | Specifies the download path for the remote protobuf file. This is a required option. |
| -p | --project | The path to the project file to operate on. If a file is not specified, the command searches the current directory for one. |
| -s | --services | The type of gRPC services that should be generated. If `Default` is specified, `Both` is used for Web projects and `Client` is used for non-Web projects. Accepted values are `Both`, `Client`, `Default`, `None`, `Server`. |
| -i | --additional-import-dirs | Additional directories to be used when resolving imports for the protobuf files. This is a semicolon separated list of paths. |
|  | --access | The access modifier to use for the generated C# classes. Default value is `Public`. Accepted values are `Internal` and `Public`. |

## Remove

The `remove` command is used to remove Protobuf references from the `.csproj` file. The command accepts path arguments and source URLs as arguments. The tool:

* Only removes the Protobuf reference.
* Does not delete the `.proto` file, even if it was originally downloaded from a remote URL.

### Usage

```dotnetcli
dotnet-grpc remove [options] <references>...
```

### Arguments

| Argument | Description |
| --- | --- |
| references | The URLs or file paths of the protobuf references to remove. |

### Options

| Short option | Long option | Description |
| --- | --- | --- |
| -p | --project | The path to the project file to operate on. If a file is not specified, the command searches the current directory for one. |

## Refresh

The `refresh` command is used to update a remote reference with the latest content from the source URL. Both the download file path and the source URL can be used to specify the reference to be updated. Note:

* The hashes of the file contents are compared to determine whether the local file should be updated.
* No timestamp information is compared.

The tool always replaces the local file with the remote file if an update is needed.

### Usage

```dotnetcli
dotnet-grpc refresh [options] [<references>...]
```

### Arguments

| Argument | Description |
| --- | --- |
| references | The URLs or file paths to remote protobuf references that should be updated. Leave this argument empty to refresh all remote references. |

### Options

| Short option | Long option | Description |
| --- | --- | --- |
| -p | --project | The path to the project file to operate on. If a file is not specified, the command searches the current directory for one. |
|  | --dry-run | Outputs a list of files that would be updated without downloading any new content. |

## List

The `list` command is used to display all the Protobuf references in the project file. If all values of a column are default values, the column may be omitted.

### Usage

```dotnetcli
dotnet-grpc list [options]
```

### Options

| Short option | Long option | Description |
| --- | --- | --- |
| -p | --project | The path to the project file to operate on. If a file is not specified, the command searches the current directory for one. |

## Additional resources

* [grpc/index](index.md)
* [grpc/basics](basics.md)
* [grpc/aspnetcore](aspnetcore.md)
