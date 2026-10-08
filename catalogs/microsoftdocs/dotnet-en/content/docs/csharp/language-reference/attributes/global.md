---
title: "Attributes interpreted by the compiler: Global attributes"
ms.date: 01/14/2026
description: Attributes provide metadata the compiler uses to understand more semantics of your program
---
# Assembly level attributes interpreted by the C# compiler

Most attributes apply to specific language elements such as classes or methods. However, some attributes are global. They apply to an entire assembly or module. For example, use the [System.Reflection.AssemblyVersionAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyVersionAttribute) attribute to embed version information into an assembly, like this:

```csharp
[assembly: AssemblyVersion("1.0.0.0")]
```

Global attributes appear in the source code after any top level `using` directives and before any type, module, or namespace declarations. You can include global attributes in multiple source files, but you must compile the files in a single compilation pass. In .NET Framework projects, Visual Studio adds global attributes to the AssemblyInfo.cs file. These attributes aren't added to .NET Core projects.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


Assembly attributes provide information about an assembly. They fall into the following categories:

- Assembly identity attributes
- Informational attributes
- Assembly manifest attributes

## Assembly identity attributes

Three attributes (with a strong name, if applicable) determine the identity of an assembly: name, version, and culture. These attributes form the full name of the assembly and are required when you reference it in code. You can set an assembly's version and culture by using attributes. However, you set the name value by the compiler, the Visual Studio IDE in the [Assembly Information Dialog Box](https://learn.microsoft.com/visualstudio/ide/reference/assembly-information-dialog-box), or the Assembly Linker (Al.exe) when you create the assembly. The assembly name is based on the assembly manifest. The [System.Reflection.AssemblyFlagsAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyFlagsAttribute) attribute specifies whether multiple copies of the assembly can coexist.

The following table shows the identity attributes.

| Attribute | Purpose |
| --- | --- |
| [System.Reflection.AssemblyVersionAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyVersionAttribute) | Specifies the version of an assembly. |
| [System.Reflection.AssemblyCultureAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyCultureAttribute) | Specifies which culture the assembly supports. |
| [System.Reflection.AssemblyFlagsAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyFlagsAttribute) | Specifies a bitwise combination of flags for an assembly, describing just-in-time (JIT) compiler options, whether the assembly is retargetable, and whether it has a full or tokenized public key. |

## Informational attributes

Use informational attributes to provide more company or product information for an assembly. The following table shows the informational attributes defined in the [System.Reflection](https://learn.microsoft.com/search/?terms=System.Reflection) namespace.

| Attribute | Purpose |
| --- | --- |
| [System.Reflection.AssemblyProductAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyProductAttribute) | Specifies a product name for an assembly manifest. |
| [System.Reflection.AssemblyTrademarkAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyTrademarkAttribute) | Specifies a trademark for an assembly manifest. |
| [System.Reflection.AssemblyInformationalVersionAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyInformationalVersionAttribute) | Specifies an informational version for an assembly manifest. |
| [System.Reflection.AssemblyCompanyAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyCompanyAttribute) | Specifies a company name for an assembly manifest. |
| [System.Reflection.AssemblyCopyrightAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyCopyrightAttribute) | Defines a custom attribute that specifies a copyright for an assembly manifest. |
| [System.Reflection.AssemblyFileVersionAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyFileVersionAttribute) | Sets a specific version number for the Win32 file version resource. |
| [System.CLSCompliantAttribute](https://learn.microsoft.com/search/?terms=System.CLSCompliantAttribute) | Indicates whether the assembly is compliant with the Common Language Specification (CLS). |

## Assembly manifest attributes

Use assembly manifest attributes to provide information in the assembly manifest. The attributes include title, description, default alias, and configuration. The following table shows the assembly manifest attributes defined in the [System.Reflection](https://learn.microsoft.com/search/?terms=System.Reflection) namespace.

| Attribute | Purpose |
| --- | --- |
| [System.Reflection.AssemblyTitleAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyTitleAttribute) | Specifies an assembly title for an assembly manifest. |
| [System.Reflection.AssemblyDescriptionAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyDescriptionAttribute) | Specifies an assembly description for an assembly manifest. |
| [System.Reflection.AssemblyConfigurationAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyConfigurationAttribute) | Specifies an assembly configuration (such as retail or debug) for an assembly manifest. |
| [System.Reflection.AssemblyDefaultAliasAttribute](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyDefaultAliasAttribute) | Defines a friendly default alias for an assembly manifest. |
