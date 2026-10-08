---
title: Compiler Directives
description: Learn about F# language conditional compilation directives, line directives, and warn directives.
ms.date: 10/21/2025
f1_keywords:
 - "#endif_FS"
ai-usage: ai-assisted
---
# Compiler Directives

This topic describes compiler directives, for F# Interactive (`dotnet fsi`) directives, see [Interactive Programming with F#](../tools/fsharp-interactive/index.md).

A compiler directive is prefixed with the # symbol and appears on a line by itself.

The following table lists the compiler directives that are available in F#.

| Directive | Description |
| --- | --- |
| `#if` *if-expression* | Supports conditional compilation. Code in the section after the `#if` is included if the *if-expression* evaluates to `defined` (see below). |
| `#else` | Supports conditional compilation. Marks a section of code to include if the symbol used with the previous `#if` does not evaluate to `defined`. |
| `#endif` | Supports conditional compilation. Marks the end of a conditional section of code. |
| `#`[line] *int*,<br/>`#`[line] *int* *string*,<br/>`#`[line] *int* *verbatim-string* | Indicates the original source code line and file name, for debugging. This feature is provided for tools that generate F# source code. |
| `#nowarn` *warningcodes* | Disables one or more compiler warnings as specified by *warningcodes* (see below). |
| `#warnon` *warningcodes* | Enables one or more compiler warnings as specified by *warningcodes* (see below). |

## Conditional Compilation Directives

Code that is deactivated by one of these directives appears dimmed in the Visual Studio Code Editor.

The following code illustrates the use of the `#if`, `#else`, and `#endif` directives. In this example, the code contains two versions of the definition of `function1`. When `VERSION1` is defined by using the [-define compiler option](compiler-options.md), the code between the `#if` directive and the `#else` directive is activated. Otherwise, the code between `#else` and `#endif` is activated.

[Main (complete source file; reference: \~/samples/snippets/fsharp/lang-ref-2/snippet7301.fs)](../../../_code/samples/snippets/fsharp/lang-ref-2/snippet7301.fs.md)

The `#if` directive also accepts logical expressions:

```fsharp
#if SILVERLIGHT || COMPILED && (NETCOREFX || !DEBUG)
#endif
```

The following expressions can be used.

| if-expr | evaluation |
| --- | --- |
| `if-expr1 \|\| if-expr2` | `defined` if `if-expr1` or `if-expr2` is `defined`. |
| `if-expr1 && if-expr2` | `defined` if `if-expr1` and `if-expr2` are `defined`. |
| `!if-expr1` | `defined` if `if-expr1` is not `defined`. |
| `( if-expr1 )` | defined if `if-expr1` is defined. |
| `symbol` | `defined` if it is flagged as defined by the `-define` compiler option. |

The logical operators have the usual logical precedence.

There is no `#define` compiler directive in F#. You must use the compiler option or project settings to define the symbols used by the `#if` directive.

Conditional compilation directives can be nested. Indentation is not significant for compiler directives.

## Predefined symbols

The F# compiler and build system automatically define several symbols that can be used for conditional compilation.

### Build configuration symbols

The following symbols are defined based on your build configuration:

- `DEBUG`: Defined when compiling in Debug mode. In the project system, the `DEBUG` symbol is automatically defined in the Debug configuration, but not in the Release configuration. This symbol is commonly used with assertions and diagnostic code. For more information, see [Assertions](assertions.md).
- `TRACE`: Defined for builds that enable tracing. Like `DEBUG`, this symbol is typically defined in Debug configurations but can also be enabled in Release configurations.

You can override these values using the [`-define` compiler option](compiler-options.md) or project settings.

### Compilation mode symbols

The following symbols distinguish between different compilation modes:

- `COMPILED`: Defined when compiling code with the F# compiler. This symbol is useful when you need code to behave differently in compiled assemblies versus F# Interactive sessions.
- `INTERACTIVE`: Defined when compiling or executing code in F# Interactive (`dotnet fsi`), including both interactive sessions and script execution. This allows you to write code that works differently when running interactively.

For more information about using these symbols in scripts, see [Interactive Programming with F#](../tools/fsharp-interactive/index.md).

Example:

```fsharp
#if INTERACTIVE
// Code specific to F# Interactive
#r "nuget: Newtonsoft.Json"
#endif

#if COMPILED
// Code specific to compiled assemblies
open System.Configuration
#endif
```

### Target framework symbols

The build system also defines preprocessor symbols for different target frameworks in SDK-style projects. These symbols are useful when creating libraries or applications that target multiple .NET versions.

| Target Frameworks | Symbols | Additional symbols<br/>(available in .NET 5+ SDKs) | Platform symbols (available only<br/>when you specify an OS-specific TFM) |
| --- | --- | --- | --- |
| .NET Framework | `NETFRAMEWORK`, `NET481`, `NET48`, `NET472`, `NET471`, `NET47`, `NET462`, `NET461`, `NET46`, `NET452`, `NET451`, `NET45`, `NET40`, `NET35`, `NET20` | `NET48_OR_GREATER`, `NET472_OR_GREATER`, `NET471_OR_GREATER`, `NET47_OR_GREATER`, `NET462_OR_GREATER`, `NET461_OR_GREATER`, `NET46_OR_GREATER`, `NET452_OR_GREATER`, `NET451_OR_GREATER`, `NET45_OR_GREATER`, `NET40_OR_GREATER`, `NET35_OR_GREATER`, `NET20_OR_GREATER` |  |
| .NET Standard | `NETSTANDARD`, `NETSTANDARD2_1`, `NETSTANDARD2_0`, `NETSTANDARD1_6`, `NETSTANDARD1_5`, `NETSTANDARD1_4`, `NETSTANDARD1_3`, `NETSTANDARD1_2`, `NETSTANDARD1_1`, `NETSTANDARD1_0` | `NETSTANDARD2_1_OR_GREATER`, `NETSTANDARD2_0_OR_GREATER`, `NETSTANDARD1_6_OR_GREATER`, `NETSTANDARD1_5_OR_GREATER`, `NETSTANDARD1_4_OR_GREATER`, `NETSTANDARD1_3_OR_GREATER`, `NETSTANDARD1_2_OR_GREATER`, `NETSTANDARD1_1_OR_GREATER`, `NETSTANDARD1_0_OR_GREATER` |  |
| .NET 5+ (and .NET Core) | `NET`, `NET10_0`, `NET9_0`, `NET8_0`, `NET7_0`, `NET6_0`, `NET5_0`, `NETCOREAPP`, `NETCOREAPP3_1`, `NETCOREAPP3_0`, `NETCOREAPP2_2`, `NETCOREAPP2_1`, `NETCOREAPP2_0`, `NETCOREAPP1_1`, `NETCOREAPP1_0` | `NET10_0_OR_GREATER`, `NET9_0_OR_GREATER`, `NET8_0_OR_GREATER`, `NET7_0_OR_GREATER`, `NET6_0_OR_GREATER`, `NET5_0_OR_GREATER`, `NETCOREAPP3_1_OR_GREATER`, `NETCOREAPP3_0_OR_GREATER`, `NETCOREAPP2_2_OR_GREATER`, `NETCOREAPP2_1_OR_GREATER`, `NETCOREAPP2_0_OR_GREATER`, `NETCOREAPP1_1_OR_GREATER`, `NETCOREAPP1_0_OR_GREATER` | `ANDROID`, `BROWSER`, `IOS`, `MACCATALYST`, `MACOS`, `TVOS`, `WINDOWS`,<br/>`[OS][version]` (for example `IOS15_1`),<br/>`[OS][version]_OR_GREATER` (for example `IOS15_1_OR_GREATER`) |

> **Note:**
>
> * Versionless symbols are defined regardless of the version you're targeting.
> * Version-specific symbols are only defined for the version you're targeting.
> * The `<framework>_OR_GREATER` symbols are defined for the version you're targeting and all earlier versions. For example, if you're targeting .NET Framework 2.0, the following symbols are defined: `NET20`, `NET20_OR_GREATER`, `NET11_OR_GREATER`, and `NET10_OR_GREATER`.
> * The `NETSTANDARD<x>_<y>_OR_GREATER` symbols are only defined for .NET Standard targets, and not for targets that implement .NET Standard, such as .NET Core and .NET Framework.
> * These are different from the target framework monikers (TFMs) used by [the MSBuild `TargetFramework` property](../../standard/frameworks.md#supported-target-frameworks) and [NuGet](https://learn.microsoft.com/nuget/reference/target-frameworks).


For example, you can use these symbols to conditionally compile code based on the target framework:

```fsharp
#if NET6_0_OR_GREATER
// Use .NET 6+ specific APIs
#else
// Use alternative implementation for older frameworks
#endif
```

## NULLABLE directive

Starting with F# 9, you can enable nullable reference types in the project:

```xml
<Nullable>enable</Nullable>
```

This automatically sets `NULLABLE` directive to the build. It's useful while initially rolling out the feature, to conditionally change conflicting code by `#if NULLABLE` hash directives:

```fsharp
#if NULLABLE 
let length (arg: 'T when 'T: not null) =
    Seq.length arg
#else
let length arg =
    match arg with
    | null -> -1
    | s -> Seq.length s
#endif
```

## Line Directives

When building, the compiler reports errors in F# code by referencing line numbers on which each error occurs. These line numbers start at 1 for the first line in a file. However, if you are generating F# source code from another tool, the line numbers in the generated code are generally not of interest, because the errors in the generated F# code most likely arise from another source. The `#line` directive provides a way for authors of tools that generate F# source code to pass information about the original line numbers and source files to the generated F# code.

When you use the `#line` directive, file names must be enclosed in quotation marks. Unless the verbatim token (`@`) appears in front of the string, you must escape backslash characters by using two backslash characters instead of one in order to use them in the path. The following are valid line tokens. In these examples, assume that the original file `Script1` results in an automatically generated F# code file when it is run through a tool, and that the code at the location of these directives is generated from some tokens at line 25 in file `Script1`.

[Main (complete source file; reference: \~/samples/snippets/fsharp/lang-ref-2/snippet7303.fs)](../../../_code/samples/snippets/fsharp/lang-ref-2/snippet7303.fs.md)

These tokens indicate that the F# code generated at this location is derived from some constructs at or near line `25` in `Script1`.

Note that `#line` directives do not influence the behavior of `#nowarn` / `#warnon`. These two directives always relate the the file that is being compiled.

## Warn Directives

Warn directives disable or enable specified compiler warnings for parts of a source file.

A warn directive is a single line of source code that consists of

- Optional leading whitespace
- The string `#nowarn` or `#warnon`
- Whitespace
- One or more *warningcodes* (see below), separated by whitespace
- Optional whitespace
- Optional line comment

A *warningcode* is a sequence of digits (representing the warning number), optionally preceded by `FS`, optionally surrounded by double quotes.

A `#nowarn` directive disables a warning until a `#warnon` directive for the same warning number is found, or else until end of file. Similarly, a `#nowarn` directive disables a warning until a `#warnon` directive for the same warning numberis found, or else until end of file. Before and after such pairs, the compilation default applies, which is

- no warning if disabled by a --nowarn compiler option (or the respective msbuild property)
- no warning for [opt-in warnings](compiler-options.md#opt-in-warnings), unless enabled by the --warnon compiler option (or the respective msbuild property)

Here is a (contrived) example.

```
module A
match None with None -> ()     // warning
let x =
    #nowarn 25
    match None with None -> 1  // no warning
    #warnon FS25
match None with None -> ()     // warning
#nowarn "FS25" FS007 "42"
match None with None -> ()     // no warning
```

## See also

- [F# Language Reference](index.md)
- [Compiler Options](compiler-options.md)
