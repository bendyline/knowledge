---
title: What's new in .NET 7
description: Learn about the new features introduced in .NET 7.
ms.date: 11/08/2022
ms.update-cycle: 3650-days
---
# What's new in .NET 7

.NET 7 was the successor to [.NET 6](dotnet-6.md) and focused on being unified, modern, simple, and *fast*. .NET 7 was a standard-term support (STS) release (previously known as a *current* release).

This article lists the new features of .NET 7 and provides links to more detailed information on each.

## Performance

Performance is a key focus of .NET 7, and all of its features are designed with performance in mind. In addition, .NET 7 includes the following enhancements aimed purely at performance:

- On-stack replacement (OSR) is a complement to tiered compilation. It allows the runtime to change the code executed by a currently running method in the middle of its execution (that is, while it's "on stack"). Long-running methods can switch to more optimized versions mid-execution.
- Profile-guided optimization (PGO) now works with OSR and is easier to enable (by adding `<TieredPGO>true</TieredPGO>` to your project file). PGO can also instrument and optimize additional things, such as delegates.
- Improved code generation for Arm64.
- [Native AOT](../deploying/native-aot/index.md) produces a standalone executable in the target platform's file format with no external dependencies. It's entirely native, with no IL or JIT, and provides fast startup time and a small, self-contained deployment. In .NET 7, Native AOT focuses on console apps and requires apps to be trimmed.
- Performance improvements to the Mono runtime, which powers Blazor WebAssembly, Android, and iOS apps.

For a detailed look at many of the performance-focused features that make .NET 7 so fast, see the [Performance improvements in .NET 7](https://devblogs.microsoft.com/dotnet/performance_improvements_in_net_7/) blog post.

## System.Text.Json serialization

.NET 7 includes improvements to System.Text.Json serialization in the following areas:

- **Contract customization** gives you more control over how types are serialized and deserialized. For more information, see [Customize a JSON contract](../../standard/serialization/system-text-json/custom-contracts.md).
- **Polymorphic serialization** for user-defined type hierarchies. For more information, see [Serialize properties of derived classes](../../standard/serialization/system-text-json/polymorphism.md).
- Support for **required members**, which are properties that must be present in the JSON payload for deserialization to succeed. For more information, see [Required properties](../../standard/serialization/system-text-json/required-properties.md).

For information about these and other updates, see the [What's new in System.Text.Json in .NET 7](https://devblogs.microsoft.com/dotnet/system-text-json-in-dotnet-7/) blog post.

## Generic math

.NET 7 and C# 11 include innovations that allow you to perform mathematical operations generically&mdash;that is, without having to know the exact type you're working with. For example, if you wanted to write a method that adds two numbers, previously you had to add an overload of the method for each type. Now you can write a single, generic method, where the type parameter is constrained to be a number-like type. For more information, see the [Generic math](../../standard/generics/math.md) article and the [Generic math](https://devblogs.microsoft.com/dotnet/dotnet-7-generic-math/) blog post.

## Regular expressions

.NET's [regular expression](../../standard/base-types/regular-expressions.md) library has seen significant functional and performance improvements in .NET 7:

- The new option [System.Text.RegularExpressions.RegexOptions.NonBacktracking](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.RegexOptions.NonBacktracking) enables matching using an approach that avoids backtracking and guarantees linear-time processing in the length of the input. The nonbacktracking engine can't be used in a right-to-left search and has a few other restrictions, but is fast for all regular expressions and inputs. For more information, see [Nonbacktracking mode](../../standard/base-types/regular-expression-options.md#nonbacktracking-mode).

- Regular expression source generators are new. Source generators build an engine that's optimized for *your* pattern at compile time, providing throughput performance benefits. The source that's emitted is part of your project, so you can view and debug it. In addition, a new source-generator diagnostic `SYSLIB1045` alerts you to places you use [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) that could be converted to the source generator. For more information, see [.NET regular expression source generators](../../standard/base-types/regular-expression-source-generators.md).

- For case-insensitive searches, .NET 7 includes large performance gains. The gains come because specifying [System.Text.RegularExpressions.RegexOptions.IgnoreCase](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.RegexOptions.IgnoreCase) no longer calls [System.Char.ToLower*](https://learn.microsoft.com/search/?terms=System.Char.ToLower*) on each character in the pattern and on each character in the input. Instead, all casing-related work is done when the [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) is constructed.

- [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) now supports spans for some APIs. The following new methods have been added as part of this support:

  - [System.Text.RegularExpressions.Regex.EnumerateMatches*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.EnumerateMatches*)
  - [System.Text.RegularExpressions.Regex.Count*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Count*)
  - [System.Text.RegularExpressions.Regex.IsMatch(System.ReadOnlySpan{System.Char})](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.IsMatch(System.ReadOnlySpan%7BSystem.Char%7D)) (and a few other overloads)

For more information about these and other improvements, see the [Regular expression improvements in .NET 7](https://devblogs.microsoft.com/dotnet/regular-expression-improvements-in-dotnet-7/) blog post.

## .NET libraries

Many improvements have been made to .NET library APIs. Some are mentioned in other, dedicated sections of this article. Some others are summarized in the following table.

| Description | APIs | Further information |
| --- | --- | --- |
| Support for microseconds and nanoseconds in [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan), [System.TimeOnly](https://learn.microsoft.com/search/?terms=System.TimeOnly), [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime), and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) types | - [System.DateTime.Microsecond](https://learn.microsoft.com/search/?terms=System.DateTime.Microsecond)<br />- [System.DateTime.Nanosecond](https://learn.microsoft.com/search/?terms=System.DateTime.Nanosecond)<br />- [System.DateTime.AddMicroseconds(System.Double)](https://learn.microsoft.com/search/?terms=System.DateTime.AddMicroseconds(System.Double))<br />- New [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) constructor overloads<br /><br />- [System.DateTimeOffset.Microsecond](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Microsecond)<br />- [System.DateTimeOffset.Nanosecond](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Nanosecond)<br />- [System.DateTimeOffset.AddMicroseconds(System.Double)](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.AddMicroseconds(System.Double))<br />- New [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) constructor overloads<br /><br />- [System.TimeOnly.Microsecond](https://learn.microsoft.com/search/?terms=System.TimeOnly.Microsecond)<br />- [System.TimeOnly.Nanosecond](https://learn.microsoft.com/search/?terms=System.TimeOnly.Nanosecond)<br /><br />- [System.TimeSpan.Microseconds](https://learn.microsoft.com/search/?terms=System.TimeSpan.Microseconds)<br />- [System.TimeSpan.Nanoseconds](https://learn.microsoft.com/search/?terms=System.TimeSpan.Nanoseconds)<br />- [System.TimeSpan.FromMicroseconds(System.Double)](https://learn.microsoft.com/search/?terms=System.TimeSpan.FromMicroseconds(System.Double))<br />- And others... | These APIs mean you no longer have to perform computations on the "tick" value to determine microsecond and nanosecond values. For more information, see the [.NET 7 Preview 4](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7-preview-4/#adding-microseconds-and-nanoseconds-to-timestamp-datetime-datetimeoffset-and-timeonly) blog post. |
| APIs for reading, writing, archiving, and extracting Tar archives | [System.Formats.Tar](https://learn.microsoft.com/search/?terms=System.Formats.Tar) | For more information, see the [.NET 7 Preview 4](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7-preview-4/#added-new-tar-apis) and [.NET 7 Preview 6](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7-preview-6/#system-formats-tar-api-updates) blog posts. |
| Rate limiting APIs to protect a resource by keeping traffic at a safe level | [System.Threading.RateLimiting.RateLimiter](https://learn.microsoft.com/search/?terms=System.Threading.RateLimiting.RateLimiter) and others in the System.Threading.RateLimiting [NuGet package](https://www.nuget.org/packages/System.Threading.RateLimiting) | For more information, see [Rate limit an HTTP handler in .NET](../extensions/http-ratelimiter.md) and [Announcing rate limiting for .NET](https://devblogs.microsoft.com/dotnet/announcing-rate-limiting-for-dotnet/). |
| APIs to read *all* the data from a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) | - [System.IO.Stream.ReadExactly*](https://learn.microsoft.com/search/?terms=System.IO.Stream.ReadExactly*)<br />- [System.IO.Stream.ReadAtLeast*](https://learn.microsoft.com/search/?terms=System.IO.Stream.ReadAtLeast*) | [System.IO.Stream.Read*](https://learn.microsoft.com/search/?terms=System.IO.Stream.Read*) may return less data than what's available in the stream. The new `ReadExactly` methods read *exactly* the number of bytes requested, and the new `ReadAtLeast` methods read *at least* the number of bytes requested. For more information, see the [.NET 7 Preview 5](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7-preview-5/#system-io-stream) blog post. |
| New type converters for `DateOnly`, `TimeOnly`, `Int128`, `UInt128`, and `Half` | In the [System.ComponentModel](https://learn.microsoft.com/search/?terms=System.ComponentModel) namespace:<br /><br />- [System.ComponentModel.DateOnlyConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.DateOnlyConverter)<br />- [System.ComponentModel.TimeOnlyConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.TimeOnlyConverter)<br />- [System.ComponentModel.Int128Converter](https://learn.microsoft.com/search/?terms=System.ComponentModel.Int128Converter)<br />- [System.ComponentModel.UInt128Converter](https://learn.microsoft.com/search/?terms=System.ComponentModel.UInt128Converter)<br />- [System.ComponentModel.HalfConverter](https://learn.microsoft.com/search/?terms=System.ComponentModel.HalfConverter) | Type converters are often used to convert value types to and from a string. These new APIs add type converters for types that were added more recently. |
| Metrics support for [Microsoft.Extensions.Caching.Memory.IMemoryCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.IMemoryCache) | - [Microsoft.Extensions.Caching.Memory.MemoryCacheStatistics](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCacheStatistics)<br />- [Microsoft.Extensions.Caching.Memory.MemoryCache.GetCurrentStatistics](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCache.GetCurrentStatistics) | [Microsoft.Extensions.Caching.Memory.MemoryCache.GetCurrentStatistics](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Memory.MemoryCache.GetCurrentStatistics) lets you use event counters or metrics APIs to track statistics for one or more memory caches. For more information, see the [.NET 7 Preview 4](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7-preview-4/#added-metrics-for-microsoft-extensions-caching) blog post. |
| APIs to get and set Unix file permissions | - [System.IO.UnixFileMode](https://learn.microsoft.com/search/?terms=System.IO.UnixFileMode) enum<br />- [System.IO.File.GetUnixFileMode*](https://learn.microsoft.com/search/?terms=System.IO.File.GetUnixFileMode*)<br />- [System.IO.File.SetUnixFileMode*](https://learn.microsoft.com/search/?terms=System.IO.File.SetUnixFileMode*)<br />- [System.IO.FileSystemInfo.UnixFileMode](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo.UnixFileMode)<br />- [System.IO.Directory.CreateDirectory(System.String,System.IO.UnixFileMode)](https://learn.microsoft.com/search/?terms=System.IO.Directory.CreateDirectory(System.String%2CSystem.IO.UnixFileMode))<br />- [System.IO.FileStreamOptions.UnixCreateMode](https://learn.microsoft.com/search/?terms=System.IO.FileStreamOptions.UnixCreateMode) | For more information, see the [.NET 7 Preview 7](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7-preview-7/#support-for-unix-file-modes) blog post. |
| Attribute to indicate what kind of syntax is expected in a string | [System.Diagnostics.CodeAnalysis.StringSyntaxAttribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.StringSyntaxAttribute) | For example, you can specify that a `string` parameter expects a regular expression by attributing the parameter with `[StringSyntax(StringSyntaxAttribute.Regex)]`. |
| APIs to interop with JavaScript when running in the browser or other WebAssembly architectures | [System.Runtime.InteropServices.JavaScript](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.JavaScript) | JavaScript apps can use the expanded WebAssembly support in .NET 7 to reuse .NET libraries from JavaScript. For more information, see [Use .NET from any JavaScript app in .NET 7](https://devblogs.microsoft.com/dotnet/use-net-7-from-any-javascript-app-in-net-7/). |

## Observability

.NET 7 makes improvements to *observability*. Observability helps you understand the state of your app as it scales and as the technical complexity increases. .NET's observability implementation is primarily built around [OpenTelemetry](https://opentelemetry.io/). Improvements include:

- The new [System.Diagnostics.Activity.CurrentChanged](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.CurrentChanged) event, which you can use to detect when the span context of a managed thread changes.
- New, performant enumerator methods for [System.Diagnostics.Activity](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity) properties: [System.Diagnostics.Activity.EnumerateTagObjects](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.EnumerateTagObjects), [System.Diagnostics.Activity.EnumerateLinks](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.EnumerateLinks), and [System.Diagnostics.Activity.EnumerateEvents](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.EnumerateEvents).

For more information, see the [.NET 7 Preview 4](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7-preview-4/#observability) blog post.

## .NET SDK

The .NET 7 [SDK](../sdk.md) improves the CLI template experience. It also enables publishing to containers, and central package management with NuGet.

### Templates

Some welcome improvements have been made to the `dotnet new` command and to template authoring.

#### dotnet new

The [`dotnet new`](../tools/dotnet-new.md) CLI command, which creates a new project, configuration file, or solution based on a template, now supports [tab completion](../tools/enable-tab-autocomplete.md) for exploring:

- Available template names
- Template options
- Allowable option values

In addition, for better conformity, the `install`, `uninstall`, `search`, `list`, and `update` subcommands no longer have the `--` prefix.

#### Authoring

Template *constraints*, a new concept for .NET 7, let you define the context in which your templates are allowed. Constraints help the template engine determine which templates it should show in commands like `dotnet new list`. You can constrain your template to an operating system, a template engine host (for example, the .NET CLI or New Project dialog in Visual Studio), and an installed workload. You define constraints in your template's configuration file.

Also in the template configuration file, you can now annotate a template parameter as allowing multiple values. For example, the [`web` template](../tools/dotnet-new-sdk-templates.md) allows multiple forms of authentication.

For more information, see the [.NET 7 Preview 6](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7-preview-6/#template-authoring) blog post.

### Publish to a container

Containers are one of the easiest ways to distribute and run a wide variety of applications and services in the cloud. Container images are now a supported output type of the .NET SDK, and you can create containerized versions of your applications using [`dotnet publish`](../tools/dotnet-publish.md). For more information about the feature, see [Announcing built-in container support for the .NET SDK](https://devblogs.microsoft.com/dotnet/announcing-builtin-container-support-for-the-dotnet-sdk/). For a tutorial, see [Containerize a .NET app with dotnet publish](../containers/sdk-publish.md).

### Central package management

You can now manage common dependencies in your projects from one location using NuGet's central package management (CPM) feature. To enable it, you add a *Directory.Packages.props* file to the root of your repository. In this file, set the MSBuild property `ManagePackageVersionsCentrally` to `true` and add versions for common package dependency using `PackageVersion` items. Then, in the individual project files, you can omit `Version` attributes from any [PackageReference](../project-sdk/msbuild-props.md#packagereference) items that refer to centrally managed packages.

For more information, see [Central package management](https://learn.microsoft.com/nuget/consume-packages/Central-Package-Management).

## P/Invoke source generation

.NET 7 introduces a source generator for platform invokes (P/Invokes) in C#. The source generator looks for [System.Runtime.InteropServices.LibraryImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.LibraryImportAttribute) on `static`, `partial` methods to trigger compile-time source generation of marshalling code. By generating the marshalling code at compile time, no IL stub needs to be generated at runtime, as it does when using [System.Runtime.InteropServices.DllImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute). The source generator improves application performance and also allows the app to be ahead-of-time (AOT) compiled. For more information, see [Source generation for platform invokes](../../standard/native-interop/pinvoke-source-generation.md) and [Use custom marshallers in source-generated P/Invokes](../../standard/native-interop/tutorial-custom-marshaller.md).

## Related releases

This section contains information about related products that have releases that coincide with the .NET 7 release.

### Visual Studio 2022 version 17.4

For more information, see [What's new in Visual Studio 2022](https://learn.microsoft.com/visualstudio/ide/whats-new-visual-studio-2022).

### C# 11

C# 11 includes support for [generic math](../../standard/generics/math.md), raw string literals, file-scoped types, and other new features. For more information, see [What's new in C# 11](../../csharp/whats-new/csharp-version-history.md#c-version-11).

### F# 7

F# 7 continues the journey to make the language simpler and improve performance and interop with new C# features. For more information, see [Announcing F# 7](https://devblogs.microsoft.com/dotnet/announcing-fsharp-7/).

### .NET MAUI

.NET Multi-platform App UI (.NET MAUI) is a cross-platform framework for creating native mobile and desktop apps with C# and XAML. It unifies Android, iOS, macOS, and Windows APIs into a single API. For information about the latest updates, see [What's new in .NET MAUI for .NET 7](https://learn.microsoft.com/dotnet/maui/whats-new/dotnet-7).

### ASP.NET Core

ASP.NET Core 7.0 includes rate-limiting middleware, improvements to minimal APIs, and gRPC JSON transcoding. For information about all the updates, see [What's new in ASP.NET Core 7](https://learn.microsoft.com/aspnet/core/release-notes/aspnetcore-7.0).

### EF Core

Entity Framework Core 7.0 includes provider-agnostic support for JSON columns, improved performance for saving changes, and custom reverse engineering templates. For information about all the updates, see [What's new in EF Core 7.0](https://learn.microsoft.com/ef/core/what-is-new/ef-core-7.0/whatsnew).

### Windows Forms

Much work has gone into Windows Forms for .NET 7. Improvements have been made in the following areas:

- Accessibility
- High DPI and scaling
- Databinding

For more information, see [What's new in Windows Forms in .NET 7](https://devblogs.microsoft.com/dotnet/winforms-enhancements-in-dotnet-7).

### WPF

WPF in .NET 7 includes numerous bug fixes as well as performance and accessibility improvements. For more information, see the [What's new for WPF in .NET 7](https://devblogs.microsoft.com/dotnet/wpf-on-dotnet-7/) blog post.

### Orleans

Orleans is a cross-platform framework for building robust, scalable distributed applications. For information about the latest updates for Orleans, see [Migrate from Orleans 3.x to 7.0](../../orleans/migration-guide.md).

### ML.NET

ML.NET now includes a text classification API that makes it easy to train custom text classification models using the latest state-of-the-art deep learning techniques. For more information, see the [What's new with AutoML and tooling](https://devblogs.microsoft.com/dotnet/whats-new-with-mldotnet-automl/) and [Introducing the ML.NET Text Classification API](https://devblogs.microsoft.com/dotnet/introducing-the-ml-dotnet-text-classification-api-preview/) blog posts.

## See also

- [Release notes for .NET 7](https://github.com/dotnet/core/tree/main/release-notes/7.0)
