---
title: How to configure the parser in System.CommandLine
description: "Learn how to configure the parser in System.CommandLine."
ms.date: 06/19/2025
no-loc: [System.CommandLine]
helpviewer_keywords:
  - "command line interface"
  - "command line"
  - "System.CommandLine"
ms.topic: how-to
---

# How to configure the parser in System.CommandLine

Parsing and invocation are two separate steps, so each of them has their own configuration:

- [System.CommandLine.ParserConfiguration](https://learn.microsoft.com/search/?terms=System.CommandLine.ParserConfiguration) is a class that provides properties to configure the parsing. It is an optional argument for every `Parse` method, such as [System.CommandLine.Command.Parse*](https://learn.microsoft.com/search/?terms=System.CommandLine.Command.Parse*) and [System.CommandLine.Parsing.CommandLineParser.Parse*](https://learn.microsoft.com/search/?terms=System.CommandLine.Parsing.CommandLineParser.Parse*).
- [System.CommandLine.InvocationConfiguration](https://learn.microsoft.com/search/?terms=System.CommandLine.InvocationConfiguration) is a class that provides properties to configure the invocation. It is an optional argument of the [System.CommandLine.ParseResult.Invoke*](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.Invoke*) and [System.CommandLine.ParseResult.InvokeAsync*](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.InvokeAsync*) methods.

They are exposed by the [System.CommandLine.ParseResult.Configuration](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.Configuration) and [System.CommandLine.ParseResult.InvocationConfiguration](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.InvocationConfiguration) properties. When they aren't provided, the default configurations are used.

## ParserConfiguration

### EnablePosixBundling

[Bundling](syntax.md#option-bundling) of single-character options is enabled by default, but you can disable it by setting the [System.CommandLine.ParserConfiguration.EnablePosixBundling](https://learn.microsoft.com/search/?terms=System.CommandLine.ParserConfiguration.EnablePosixBundling) property to `false`.

### ResponseFileTokenReplacer

[Response files](syntax.md#response-files) are enabled by default, but you can disable them by setting the [System.CommandLine.ParserConfiguration.ResponseFileTokenReplacer](https://learn.microsoft.com/search/?terms=System.CommandLine.ParserConfiguration.ResponseFileTokenReplacer) property to `null`. You can also provide a custom implementation to customize how response files are processed.

Response file can contain other response file names, hence parsing might include opening other files. The library expects that all response files were generated and stored by trustworthy agents.

## InvocationConfiguration

### Standard output and error

[System.CommandLine.InvocationConfiguration](https://learn.microsoft.com/search/?terms=System.CommandLine.InvocationConfiguration) makes testing, as well as many extensibility scenarios, easier than using `System.Console`. It exposes two `TextWriter` properties: [System.CommandLine.InvocationConfiguration.Output](https://learn.microsoft.com/search/?terms=System.CommandLine.InvocationConfiguration.Output) and [System.CommandLine.InvocationConfiguration.Error](https://learn.microsoft.com/search/?terms=System.CommandLine.InvocationConfiguration.Error). You can set these properties to any `TextWriter` instance, such as a `StringWriter`, which you can use to capture output for testing.

Define a simple command that writes to standard output:

[language="csharp" source="snippets/configuration/csharp/Program.cs" id="rootcommand"::: (complete source file; reference: snippets/configuration/csharp/Program.cs)](../../../_code/docs/standard/commandline/snippets/configuration/csharp/Program.cs.md)

Now, use [System.CommandLine.InvocationConfiguration](https://learn.microsoft.com/search/?terms=System.CommandLine.InvocationConfiguration) to capture the output:

[language="csharp" source="snippets/configuration/csharp/Program.cs" id="captureoutput"::: (complete source file; reference: snippets/configuration/csharp/Program.cs)](../../../_code/docs/standard/commandline/snippets/configuration/csharp/Program.cs.md)

### ProcessTerminationTimeout

[Process termination timeout](how-to-parse-and-invoke.md#process-termination-timeout) can be configured via the [System.CommandLine.InvocationConfiguration.ProcessTerminationTimeout](https://learn.microsoft.com/search/?terms=System.CommandLine.InvocationConfiguration.ProcessTerminationTimeout) property. The default value is 2 seconds.

### EnableDefaultExceptionHandler

By default, all unhandled exceptions thrown during the invocation of a command are caught and reported to the user. You can disable this behavior by setting the [System.CommandLine.InvocationConfiguration.EnableDefaultExceptionHandler](https://learn.microsoft.com/search/?terms=System.CommandLine.InvocationConfiguration.EnableDefaultExceptionHandler) property to `false`. This is useful when you want to handle exceptions in a custom way, such as logging them or providing a different user experience.

### Derived classes

[System.CommandLine.InvocationConfiguration](https://learn.microsoft.com/search/?terms=System.CommandLine.InvocationConfiguration) is not sealed, so you can derive from it to add custom properties or methods. This is useful when you want to provide additional configuration options specific to your application.

## See also

- [System.CommandLine overview](index.md)
