---
title: Create a NuGet package with the .NET CLI
description: Learn how to create a NuGet package with the 'dotnet pack' command.
ms.date: 06/20/2016
---
# How to create a NuGet package with the .NET CLI

> **Note:**
> The following shows command-line samples using Unix. The `dotnet pack` command as shown here works the same way on Windows.

.NET Standard and .NET Core libraries are expected to be distributed as NuGet packages. This is in fact how all of the .NET Standard libraries are distributed and consumed. This is most easily done with the `dotnet pack` command.

Imagine that you just wrote an awesome new library that you would like to distribute over NuGet. You can create a NuGet package with cross-platform tools to do exactly that! The following example assumes a library called **SuperAwesomeLibrary** that targets `netstandard1.0`.

If you have transitive dependencies, that is, a project that depends on another package, make sure to restore packages for the entire solution with the `dotnet restore` command before you create a NuGet package. Failing to do so will result in the `dotnet pack` command not working properly.

You don't have to run [`dotnet restore`](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/docs/core/tools/dotnet-restore.md) because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as [continuous integration builds in Azure DevOps Services](https://learn.microsoft.com/azure/devops/build-release/apps/aspnet/build-aspnet-core) or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the [`dotnet restore` documentation](../tools/dotnet-restore.md).


After ensuring packages are restored, you can navigate to the directory where a library lives:

```console
cd src/SuperAwesomeLibrary
```

Then it's just a single command from the command line:

```dotnetcli
dotnet pack
```

Your */bin/Debug* folder will now look like this:

```console
$ ls bin/Debug
netstandard1.0/
SuperAwesomeLibrary.1.0.0.nupkg
SuperAwesomeLibrary.1.0.0.symbols.nupkg
```

This produces a package that is capable of being debugged. If you want to build a NuGet package with release binaries, all you need to do is add the `--configuration` (or `-c`) switch and use `release` as the argument.

```dotnetcli
dotnet pack --configuration release
```

Your */bin* folder will now have a *release* folder containing your NuGet package with release binaries:

```console
$ ls bin/release
netstandard1.0/
SuperAwesomeLibrary.1.0.0.nupkg
SuperAwesomeLibrary.1.0.0.symbols.nupkg
```

And now you have the necessary files to publish a NuGet package!

## Don't confuse `dotnet pack` with `dotnet publish`

It is important to note that at no point is the `dotnet publish` command involved. The `dotnet publish` command is for deploying applications with all of their dependencies in the same bundle -- not for generating a NuGet package to be distributed and consumed via NuGet.

## See also

- [Quickstart: Create and publish a package](https://learn.microsoft.com/nuget/quickstart/create-and-publish-a-package-using-the-dotnet-cli)
