---
title: ASP.NET Core code generator tool (`aspnet-codegenerator`)
author: tdykstra
description: The ASP.NET Core code generator tool scaffolds ASP.NET Core projects.
monikerRange: '>= aspnetcore-2.1'
ms.author: tdykstra
ms.date: 11/09/2024
uid: fundamentals/tools/dotnet-aspnet-codegenerator
---
# ASP.NET Core code generator tool (`aspnet-codegenerator`)

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


The `dotnet aspnet-codegenerator` command runs the ASP.NET Core scaffolding engine. Running the `dotnet aspnet-codegenerator` command is required to scaffold from the command line or when using Visual Studio Code. The command isn't required to use scaffolding with Visual Studio, which includes the scaffolding engine by default.

## Install and update the code generator tool

Install the [.NET SDK](https://dotnet.microsoft.com/download).

`dotnet aspnet-codegenerator` is a [global tool](https://learn.microsoft.com/dotnet/core/tools/global-tools) that must be installed. The following command installs the latest stable version of the ASP.NET Core code generator tool:

```dotnetcli
dotnet tool install -g dotnet-aspnet-codegenerator
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


If the tool is already installed, the following command updates the tool to the latest stable version available from the installed .NET SDKs:

```dotnetcli
dotnet tool update -g dotnet-aspnet-codegenerator
```

## Uninstall the code generator tool

It may be necessary to uninstall the ASP.NET Core code generator tool to resolve problems. For example, if you installed a preview version of the tool, uninstall it before installing the released version.

The following commands uninstall the ASP.NET Core code generator tool and install the latest stable version:

```dotnetcli
dotnet tool uninstall -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-aspnet-codegenerator
```

## Synopsis

```
dotnet aspnet-codegenerator [arguments] [-b|--build-base-path] [-c|--configuration] [-n|--nuget-package-dir] [--no-build] [-p|--project] [-tfm|--target-framework]
dotnet aspnet-codegenerator [-h|--help]
```

## Description

The `dotnet aspnet-codegenerator` global command runs the ASP.NET Core code generator and scaffolding engine.

## Arguments

`generator`

The code generator to run. The available generators are shown in the following table.

**Applies to: \>= aspnetcore-8.0**

| Generator | Operation |
| --- | --- |
| `area` | [Scaffolds an area](../../mvc/controllers/areas.md). |
| `blazor` | [Scaffolds Blazor create, read, update, delete, and list pages](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fquickgrid%23quickgrid-scaffolder). |
| `blazor-identity` | Generates Blazor Identity files. |
| `controller` | [Scaffolds a controller](../../tutorials/first-mvc-app/adding-model.md). |
| `identity` | [Scaffolds Identity](../../security/authentication/scaffold-identity.md). |
| `minimalapi` | Generates an endpoints file (with CRUD API endpoints) given a model and optional database context. |
| `razorpage` | [Scaffolds Razor Pages](../../tutorials/razor-pages/model.md). |
| `view` | [Scaffolds a view](../../mvc/views/overview.md). |



**Applies to: < aspnetcore-8.0**

| Generator | Operation |
| --- | --- |
| `area` | [Scaffolds an area](../../mvc/controllers/areas.md). |
| `controller` | [Scaffolds a controller](../../tutorials/first-mvc-app/adding-model.md). |
| `identity` | [Scaffolds Identity](../../security/authentication/scaffold-identity.md). |
| `minimalapi` | Generates an endpoints file (with CRUD API endpoints) given a model and optional database context. |
| `razorpage` | [Scaffolds Razor Pages](../../tutorials/razor-pages/model.md). |
| `view` | [Scaffolds a view](../../mvc/views/overview.md). |



## Options

`-b|--build-base-path`

The build base path.

`-c|--configuration {Debug|Release}`

Defines the build configuration. The default value is `Debug`.

`-h|--help`

Prints out a short help for the command.

`-n|--nuget-package-dir`

Specifies the NuGet package directory.

`--no-build`

Doesn't build the project before running. Passing `--no-build` also implicitly sets the `--no-restore` flag.

`-p|--project <PATH>`

Specifies the path of the project file to run (folder name or full path). If not specified, the tool defaults to the current directory.

`-tfm|--target-framework`

The target [framework](https://learn.microsoft.com/dotnet/standard/frameworks) to use.

## Generator options

The following sections detail the options available for the supported generators:

**Applies to: \>= aspnetcore-8.0**

* [Area (`area`)](#area-options)
* [Controller (`controller`)](#controller-options)
* [Blazor (`blazor`)](#blazor-options)
* [Blazor Identity (`blazor-identity`)](#blazor-identity-options)
* [Identity (`identity`)](#identity-options)
* [Minimal API (`minimalapi`)](#minimal-api-options)
* [Razor page (`razorpage`)](#razor-page-options)
* [View (`view`)](#view-options)



**Applies to: < aspnetcore-8.0**

* [Area (`area`)](#area-options)
* [Controller (`controller`)](#controller-options)
* [Identity (`identity`)](#identity-options)
* [Minimal API (`minimalapi`)](#minimal-api-options)
* [Razor page (`razorpage`)](#razor-page-options)
* [View (`view`)](#view-options)



### Area options

Usage: `dotnet aspnet-codegenerator area {AREA NAME}`

The `{AREA NAME}` placeholder is the name of the area to generate.

The preceding command generates the following folders:

* `Areas`
  * `{AREA NAME}`
    * `Controllers`
    * `Data`
    * `Models`
    * `Views`

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator area -h
```

**Applies to: \>= aspnetcore-8.0**

### Blazor options

Razor components can be individually scaffolded for Blazor apps by specifying the name of the template to use. The supported templates are:

* `Empty`
* `Create`
* `Edit`
* `Delete`
* `Details`
* `List`
* `CRUD`: *CRUD* is an acronym for Create, Read, Update, and Delete. The `CRUD` template produces `Create`, `Edit`, `Delete`, `Details`, and `Index` (`List`) components for the app.

The options for the `blazor` generator are shown in the following table.

| Option | Description |
| --- | --- |
| `-dbProvider | --databaseProvider` | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, or `postgres`. |
| `-dc | --dataContext` | Database context class to use. |
| `-m | --model` | Model class to use. |
| `-ns | --namespaceName` | Specify the name of the namespace to use for the generated Endpoints file. |
| `--relativeFolderPath | -outDir` | Relative output folder path. If not specified, files are generated in the project folder. |

The following example:

* Uses the `Edit` template to generate an `Edit` component (`Edit.razor`) in the `Components/Pages/MoviePages` folder of the app. If the `MoviePages` folder doesn't exist, the tool creates the folder automatically.
* Uses the SQLite database provider.
* Uses `BlazorWebAppMovies.Data.BlazorWebAppMoviesContext` for the database context.
* Uses the `Movie` model.

```dotnetcli
dotnet aspnet-codegenerator blazor Edit -dbProvider sqlite -dc BlazorWebAppMovies.Data.BlazorWebAppMoviesContext -m Movie -outDir Components/Pages
```

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator blazor -h
```

For an example that uses the `blazor` generator, see [blazor/tutorials/movie-database-app/index](../../blazor/tutorials/movie-database-app/index.md).

For more information, see [blazor/components/quickgrid#quickgrid-scaffolder](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fquickgrid%23quickgrid-scaffolder).

### Blazor Identity options

Scaffold Identity Razor components into a Blazor app with the `blazor-identity` generator.

The options for the `blazor-identity` template are shown in the following table.

| Option | Description |
| --- | --- |
| `-dbProvider | --databaseProvider` | Database provider to use. Options include `sqlserver` (default) and `sqlite`. |
| `-dc | --dataContext` | Database context class to use. |
| `-f | --force` | Use this option to overwrite existing files. |
| `-fi | --files` | List of semicolon separated files to scaffold. Use the `-lf | --listFiles` option to see the available options. |
| `-lf | --listFiles` | Lists the files that can be scaffolded by using the `-fi | --files` option. |
| `-rn | --rootNamespace` | Root namespace to use for generating Identity code. |
| `-u | --userClass` | Name of the user class to generate. |

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator blazor-identity -h
```



### Controller options

General options are shown in the following table.

<!-- ASP.NET Core code generator tool options common to Razor pages, controllers, and views. -->

| Option | Description |
| --- | --- |
| `-b | --bootstrapVersion` | Specifies the bootstrap version and creates a `wwwroot` folder for the Bootstrap assets if the folder isn't present. |
| `-dbProvider | --databaseProvider` | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`. |
| `-dc | --dataContext` | The database context class to use or the name of the class to generate. |
| `-f | --force` | Overwrite existing files. |
| `-l | --layout` | Custom layout page to use. |
| `-m | --model` | Model class to use. |
| `-outDir | --relativeFolderPath` | Relative output folder path. If not specified, files are generated in the project folder. |
| `-scripts | --referenceScriptLibraries` | Reference script libraries in the generated views. Adds `_ValidationScriptsPartial` to `Edit` and `Create` pages. |
| `-sqlite | --useSqlite` | Flag to specify if the database context should use SQLite instead of SQL Server. |
| `-udl | --useDefaultLayout` | Use the default layout for the views. |


The options unique to `controller` are shown in the following table.

| Option | Description |
| --- | --- |
| `-actions | --readWriteActions` | Generate controller with read/write actions without a model. |
| `-api | --restWithNoViews` | Generate a controller with REST style API. `noViews` is assumed and any view related options are ignored. |
| `-async | --useAsyncActions` | Generate asynchronous controller actions. |
| `-name | --controllerName` | Name of the controller. |
| `-namespace | --controllerNamespace` | Specify the name of the namespace to use for the generated controller. |
| `-nv | --noViews` | Generate **no** views. |

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator controller -h
```

For an example that uses the `controller` generator, see [tutorials/first-mvc-app/adding-model](../../tutorials/first-mvc-app/adding-model.md).

### Identity options

For more information, see [security/authentication/scaffold-identity](../../security/authentication/scaffold-identity.md).

### Minimal API options

Scaffold a Minimal API backend with the `minimalapi` template.

The options for `minimalapi` are shown in the following table.

| Option | Description |
| --- | --- |
| `-dbProvider | --databaseProvider` | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, or `postgres`. |
| `-dc | --dataContext` | Database context class to use. |
| `-e | --endpoints` | Endpoints class to use (not the file name). |
| `-m | --model` | Model class to use. |
| `-namespace | --endpointsNamespace` | Specify the name of the namespace to use for the generated endpoints file. |
| `-o | --open` | Use this option to enable OpenAPI. |
| `-outDir | --relativeFolderPath` | Relative output folder path. If not specified, files are generated in the project folder. |
| `-sqlite | --useSqlite` | Flag to specify if the database context should use SQLite instead of SQL Server. |

The following example:

* Generates an endpoints class named `SpeakersEndpoints` with API endpoints that map to database operations using the `ApplicationDbContext` database context class and the `BackEnd.Models.Speaker` model.
* Adds `app.MapSpeakerEndpoints();` to the `Program` file (`Program.cs`) to register the endpoints class.

```dotnetcli
dotnet aspnet-codegenerator minimalapi -dc ApplicationDbContext -e SpeakerEndpoints -m BackEnd.Models.Speaker -o
```

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator minimalapi -h
```

### Razor page options

Razor Pages can be individually scaffolded by specifying the name of the new page and the template to use. The supported templates are:

* `Empty`
* `Create`
* `Edit`
* `Delete`
* `Details`
* `List`

Typically, the template and generated file name isn't specified, which creates the following templates:

* `Create`
* `Edit`
* `Delete`
* `Details`
* `List`

General options are shown in the following table.

<!-- ASP.NET Core code generator tool options common to Razor pages, controllers, and views. -->

| Option | Description |
| --- | --- |
| `-b | --bootstrapVersion` | Specifies the bootstrap version and creates a `wwwroot` folder for the Bootstrap assets if the folder isn't present. |
| `-dbProvider | --databaseProvider` | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`. |
| `-dc | --dataContext` | The database context class to use or the name of the class to generate. |
| `-f | --force` | Overwrite existing files. |
| `-l | --layout` | Custom layout page to use. |
| `-m | --model` | Model class to use. |
| `-outDir | --relativeFolderPath` | Relative output folder path. If not specified, files are generated in the project folder. |
| `-scripts | --referenceScriptLibraries` | Reference script libraries in the generated views. Adds `_ValidationScriptsPartial` to `Edit` and `Create` pages. |
| `-sqlite | --useSqlite` | Flag to specify if the database context should use SQLite instead of SQL Server. |
| `-udl | --useDefaultLayout` | Use the default layout for the views. |


The options unique to `razorpage` are shown in the following table.

| Option | Description |
| --- | --- |
| `-namespace | --namespaceName` | The name of the namespace to use for the generated `PageModel` class. |
| `-npm | --noPageModel` | Don't generate a `PageModel` class for the `Empty` template. |
| `-partial | --partialView` | Generate a partial view. Layout options `-l` and `-udl` are ignored if this is specified. |

The following example uses the `Edit` template to generate `CustomEditPage.cshtml` and `CustomEditPage.cshtml.cs` in the `Pages/Movies` folder:

```dotnetcli
dotnet aspnet-codegenerator razorpage CustomEditPage Edit -dc RazorPagesMovieContext -m Movie -outDir Pages/Movies
```

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator razorpage -h
```

For an example that uses the `razorpage` generator, see [tutorials/razor-pages/model](../../tutorials/razor-pages/model.md).

### View options

Views can be individually scaffolded by specifying the name of the view and the template. The supported templates are:

* `Empty`
* `Create`
* `Edit`
* `Delete`
* `Details`
* `List`

General options are shown in the following table.

<!-- ASP.NET Core code generator tool options common to Razor pages, controllers, and views. -->

| Option | Description |
| --- | --- |
| `-b | --bootstrapVersion` | Specifies the bootstrap version and creates a `wwwroot` folder for the Bootstrap assets if the folder isn't present. |
| `-dbProvider | --databaseProvider` | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`. |
| `-dc | --dataContext` | The database context class to use or the name of the class to generate. |
| `-f | --force` | Overwrite existing files. |
| `-l | --layout` | Custom layout page to use. |
| `-m | --model` | Model class to use. |
| `-outDir | --relativeFolderPath` | Relative output folder path. If not specified, files are generated in the project folder. |
| `-scripts | --referenceScriptLibraries` | Reference script libraries in the generated views. Adds `_ValidationScriptsPartial` to `Edit` and `Create` pages. |
| `-sqlite | --useSqlite` | Flag to specify if the database context should use SQLite instead of SQL Server. |
| `-udl | --useDefaultLayout` | Use the default layout for the views. |


The options unique to `view` are shown in the following table.

| Option | Description |
| --- | --- |
| `-namespace | --controllerNamespace` | Specify the name of the namespace to use for the generated controller. |
| `-partial | --partialView` | Generate a partial view. Other layout options (`-l` and `-udl`) are ignored if this is specified. |

The following example uses the `Edit` template to generate `CustomEditView.cshtml` in the `Views/Movies` folder:

```dotnetcli
dotnet aspnet-codegenerator view CustomEditView Edit -dc MovieContext -m Movie -outDir Views/Movies
```

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator view -h
```
