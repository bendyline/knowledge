---
title: Entity Framework Core tools reference - EF Core
description: Reference guide for the Entity Framework Core CLI tool and the Visual Studio Package Manager Console
author: SamMonoRT
ms.date: 09/19/2018
uid: core/cli/index
---

# Entity Framework Core tools reference

The Entity Framework Core tools help with design-time development tasks. They're primarily used to manage Migrations and to scaffold a `DbContext` and entity types by reverse engineering the schema of a database.

Either of the following tools can be installed, as both tools expose the same functionality:

* The [EF Core Package Manager Console tools](powershell.md) run in the [Package Manager Console](https://learn.microsoft.com/nuget/tools/package-manager-console) in Visual Studio. We recommend using these tools if you are developing in Visual Studio as they provide a more integrated experience.

* The [EF Core .NET command-line interface (CLI) tools](dotnet.md) are an extension to the cross-platform [.NET CLI tools](https://learn.microsoft.com/dotnet/core/tools/). These tools require a .NET SDK project (one with `Sdk="Microsoft.NET.Sdk"` or similar in the project file).

## Next steps

* [EF Core Package Manager Console tools reference](powershell.md)
* [EF Core .NET CLI tools reference](dotnet.md)
