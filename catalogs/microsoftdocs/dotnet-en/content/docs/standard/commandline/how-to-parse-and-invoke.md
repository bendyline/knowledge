---
title: "How to parse and invoke the result"
description: "Learn how to get parsed values and define actions for your commands."
ms.date: 06/19/2025
no-loc: [System.CommandLine]
helpviewer_keywords:
  - "command line interface"
  - "command line"
  - "System.CommandLine"
---

# Parsing and invocation in System.CommandLine

System.CommandLine provides a clear separation between command-line parsing and action invocation. The *parsing process* is responsible for parsing command-line input and creating a [System.CommandLine.ParseResult](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult) object that contains the parsed values (and parse errors). The *action invocation process* is responsible for invoking the action associated with the parsed command, option, or directive (arguments can't have actions).

In the following example from the [Get started with System.CommandLine](get-started-tutorial.md) tutorial, the `ParseResult` is created by parsing the command-line input. No actions are defined or invoked:

[language="csharp" source="snippets/get-started-tutorial/csharp/Stage0/Program.cs" id="all" ::: (complete source file; reference: snippets/get-started-tutorial/csharp/Stage0/Program.cs)](../../../_code/docs/standard/commandline/snippets/get-started-tutorial/csharp/Stage0/Program.cs.md)

An action is invoked when a given command (or directive, or option) is parsed successfully. The action is a delegate that takes a `ParseResult` argument and returns an `int` exit code ([async actions](#asynchronous-actions) are also available). The exit code is returned by the [System.CommandLine.ParseResult.Invoke(System.CommandLine.InvocationConfiguration)](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.Invoke(System.CommandLine.InvocationConfiguration)) method and can be used to indicate whether the command was executed successfully or not.

In the following example from the [Get started with System.CommandLine](get-started-tutorial.md) tutorial, the action is defined for the root command and invoked after parsing the command-line input:

[language="csharp" source="snippets/get-started-tutorial/csharp/Stage1/Program.cs" id="all" ::: (complete source file; reference: snippets/get-started-tutorial/csharp/Stage1/Program.cs)](../../../_code/docs/standard/commandline/snippets/get-started-tutorial/csharp/Stage1/Program.cs.md)

Some built-in symbols, such as [System.CommandLine.Help.HelpOption](https://learn.microsoft.com/search/?terms=System.CommandLine.Help.HelpOption), [System.CommandLine.VersionOption](https://learn.microsoft.com/search/?terms=System.CommandLine.VersionOption), and [System.CommandLine.Completions.SuggestDirective](https://learn.microsoft.com/search/?terms=System.CommandLine.Completions.SuggestDirective), come with predefined actions. These symbols are automatically added to the root command when you create it, and when you invoke the [System.CommandLine.ParseResult](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult), they "just work." Using actions allows you to focus on your app logic, while the library takes care of parsing and invoking actions for built-in symbols. If you prefer, you can stick to the parsing process and not define any actions (as in the first example in this article).

## `ParseResult`

The [System.CommandLine.ParseResult](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult) class represents the results of parsing the command-line input. You need to use it to get the parsed values for options and arguments (no matter if you're using actions or not). You can also check if there were any parse errors or unmatched [tokens](syntax.md#tokens).

### GetValue

The [System.CommandLine.ParseResult.GetValue*](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.GetValue*) method lets you retrieve the values of options and arguments:

[language="csharp" source="snippets/model-binding/csharp/Program.cs" id="getvalue" ::: (complete source file; reference: snippets/model-binding/csharp/Program.cs)](../../../_code/docs/standard/commandline/snippets/model-binding/csharp/Program.cs.md)

You can also get values by name, but this requires you to specify the type of the value you want to get.

The following example uses C# collection initializers to create a root command:

[language="csharp" source="snippets/model-binding/csharp/Program.cs" id="collectioninitializersyntax" ::: (complete source file; reference: snippets/model-binding/csharp/Program.cs)](../../../_code/docs/standard/commandline/snippets/model-binding/csharp/Program.cs.md)

Then it uses the `GetValue` method to get the values by name:

[language="csharp" source="snippets/model-binding/csharp/Program.cs" id="lambdanames" ::: (complete source file; reference: snippets/model-binding/csharp/Program.cs)](../../../_code/docs/standard/commandline/snippets/model-binding/csharp/Program.cs.md)

This overload of `GetValue` gets the parsed or default value for the specified symbol name, in the context of the parsed command (not the entire symbol tree). It accepts the symbol name, not an [alias](syntax.md#aliases).

### Parse errors

The [System.CommandLine.ParseResult.Errors](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.Errors) property contains a list of parse errors that occurred during the parsing process. Each error is represented by a [System.CommandLine.Parsing.ParseError](https://learn.microsoft.com/search/?terms=System.CommandLine.Parsing.ParseError) object, which contains information about the error, such as the error message and the token that caused the error.

When you call the [System.CommandLine.ParseResult.Invoke(System.CommandLine.InvocationConfiguration)](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.Invoke(System.CommandLine.InvocationConfiguration)) method, it returns an exit code that indicates whether the parsing was successful or not. If there were any parse errors, the exit code is non-zero, and all the parse errors are printed to the standard error.

If you don't call the `ParseResult.Invoke` method, you need to handle the errors on your own, for example, by printing them:

[language="csharp" source="snippets/get-started-tutorial/csharp/Stage0/Program.cs" id="errors" ::: (complete source file; reference: snippets/get-started-tutorial/csharp/Stage0/Program.cs)](../../../_code/docs/standard/commandline/snippets/get-started-tutorial/csharp/Stage0/Program.cs.md)

### Unmatched tokens

The [System.CommandLine.ParseResult.UnmatchedTokens](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.UnmatchedTokens) property contains a list of the tokens that were parsed but didn't match any configured command, option, or argument.

The list of unmatched tokens is useful in commands that behave like wrappers. A wrapper command takes a set of [tokens](syntax.md#tokens) and forwards them to another command or app. The `sudo` command in Linux is an example. It takes the name of a user to impersonate followed by a command to run. For example, the following command runs the `apt update` command as the user `admin`:

```console
sudo -u admin apt update
```

To implement a wrapper command like this one, set the command property `System.CommandLine.Command.TreatUnmatchedTokensAsErrors` to `false`. Then the `System.CommandLine.Parsing.ParseResult.UnmatchedTokens` property will contain all of the arguments that don't explicitly belong to the command. In the preceding example, `ParseResult.UnmatchedTokens` would contain the `apt` and `update` tokens.

## Actions

Actions are delegates that are invoked when a command (or an option or a directive) is parsed successfully. They take a [System.CommandLine.ParseResult](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult) argument and return an `int` (or `Task<int>`) exit code. The exit code is used to indicate whether the action was executed successfully or not.

System.CommandLine provides an abstract base class [System.CommandLine.Invocation.CommandLineAction](https://learn.microsoft.com/search/?terms=System.CommandLine.Invocation.CommandLineAction) and two derived classes: [System.CommandLine.Invocation.SynchronousCommandLineAction](https://learn.microsoft.com/search/?terms=System.CommandLine.Invocation.SynchronousCommandLineAction) and [System.CommandLine.Invocation.AsynchronousCommandLineAction](https://learn.microsoft.com/search/?terms=System.CommandLine.Invocation.AsynchronousCommandLineAction). The former is used for synchronous actions that return an `int` exit code, while the latter is used for asynchronous actions that return a `Task<int>` exit code.

You don't need to create a derived type to define an action. You can use the [System.CommandLine.Command.SetAction*](https://learn.microsoft.com/search/?terms=System.CommandLine.Command.SetAction*) method to set an action for a command. The synchronous action can be a delegate that takes a `ParseResult` argument and returns an `int` exit code. The asynchronous action can be a delegate that takes `ParseResult` and [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) arguments and returns a `Task<int>`.

[language="csharp" source="snippets/get-started-tutorial/csharp/Stage1/Program.cs" id="setaction" ::: (complete source file; reference: snippets/get-started-tutorial/csharp/Stage1/Program.cs)](../../../_code/docs/standard/commandline/snippets/get-started-tutorial/csharp/Stage1/Program.cs.md)

### Asynchronous actions

Synchronous and asynchronous actions should not be mixed in the same application. If you want to use asynchronous actions, your application needs to be asynchronous throughout. This means that all actions should be asynchronous, and you should use the `SetAction` method that accepts a delegate returning a `Task<int>` exit code. Moreover, the [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) that's passed to the action delegate needs to be passed further to all the methods that can be canceled, such as file I/O operations or network requests.

You also need to ensure that the [System.CommandLine.ParseResult.InvokeAsync(System.CommandLine.InvocationConfiguration,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.CommandLine.ParseResult.InvokeAsync(System.CommandLine.InvocationConfiguration%2CSystem.Threading.CancellationToken)) method is used instead of `Invoke`. This method is asynchronous and returns a `Task<int>` exit code. It also accepts an optional [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) parameter that can be used to cancel the action.

The following code uses a `SetAction` overload that gets a [ParseResult](#parseresult) and a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) rather than just `ParseResult`:

[language="csharp" source="snippets/handle-termination/csharp/Program.cs" id="asyncaction" ::: (complete source file; reference: snippets/handle-termination/csharp/Program.cs)](../../../_code/docs/standard/commandline/snippets/handle-termination/csharp/Program.cs.md)

#### Process termination timeout

[System.CommandLine.InvocationConfiguration.ProcessTerminationTimeout](https://learn.microsoft.com/search/?terms=System.CommandLine.InvocationConfiguration.ProcessTerminationTimeout) enables signaling and handling of process termination (<kbd>Ctrl</kbd>+<kbd>C</kbd>, `SIGINT`, `SIGTERM`) via a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) that's passed to every async action during invocation. It's enabled by default (2 seconds), but you can set it to `null` to disable it.

When enabled, if the action doesn't complete within the specified timeout, the process will be terminated. This is useful for handling the termination gracefully, for example, by saving the state before the process is terminated.

To test the sample code from previous paragraph, run the command with a URL that will take a moment to load, and before it finishes loading, press <kbd>Ctrl</kbd>+<kbd>C</kbd>. On macOS press <kbd>Command</kbd>+<kbd>Period(.)</kbd>. For example:

```dotnetcli
testapp --url https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis
```

```output
The operation was aborted
```

### Exit codes

The exit code is an integer value returned by an action indicating its success or failure. By convention, an exit code of `0` signifies success, while any non-zero value indicates an error. It's important to define meaningful exit codes in your application to communicate the status of command execution clearly.

Every `SetAction` method has an overload that accepts a delegate returning an `int` exit code where the exit code needs to be provided in explicit way and an overload that returns `0`.

[language="csharp" source="snippets/model-binding/csharp/ReturnExitCode.cs" id="returnexitcode" ::: (complete source file; reference: snippets/model-binding/csharp/ReturnExitCode.cs)](../../../_code/docs/standard/commandline/snippets/model-binding/csharp/ReturnExitCode.cs.md)

## See also

- [How to customize parsing and validation in System.CommandLine](how-to-customize-parsing-and-validation.md)
- [System.CommandLine overview](index.md)
