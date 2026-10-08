---
title: Access data in AI functions
description: Learn how to pass data to AIFunction objects and how to access the data within the function delegate.
ms.date: 11/17/2025
---

# Access data in AI functions

When you create AI functions, you might need to access contextual data beyond the parameters provided by the AI model. The `Microsoft.Extensions.AI` library provides several mechanisms to pass data to function delegates.

## `AIFunction` class

The [Microsoft.Extensions.AI.AIFunction](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunction) type represents a function that can be described to an AI service and invoked. You can create `AIFunction` objects by calling one of the [Microsoft.Extensions.AI.AIFunctionFactory.Create*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionFactory.Create*) overloads. But [Microsoft.Extensions.AI.AIFunction](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunction) is also a base class, and you can derive from it and implement your own AI function type. [Microsoft.Extensions.AI.DelegatingAIFunction](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.DelegatingAIFunction) provides an easy way to wrap an existing `AIFunction` and layer in additional functionality, including capturing additional data to be used.

## Pass data

You can associate data with the function at the time it's created, either via closure or via [Microsoft.Extensions.AI.ChatOptions.AdditionalProperties](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions.AdditionalProperties). If you're creating your own function, you can populate `AdditionalProperties` however you want. If you use [Microsoft.Extensions.AI.AIFunctionFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionFactory) to create the function, you can populate data using [Microsoft.Extensions.AI.AIFunctionFactoryOptions.AdditionalProperties](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionFactoryOptions.AdditionalProperties).

You can also capture any references to data as part of the delegate provided to `AIFunctionFactory`. That is, you can bake in whatever you want to reference as part of the `AIFunction` itself.

## Access data in function delegates

You might call your `AIFunction` directly, or you might call it indirectly by using [Microsoft.Extensions.AI.FunctionInvokingChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.FunctionInvokingChatClient). The following sections describe how to access argument data using either approach.

### Manual function invocation

If you manually invoke an [Microsoft.Extensions.AI.AIFunction](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunction) by calling [Microsoft.Extensions.AI.AIFunction.InvokeAsync(Microsoft.Extensions.AI.AIFunctionArguments,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunction.InvokeAsync(Microsoft.Extensions.AI.AIFunctionArguments%2CSystem.Threading.CancellationToken)), you pass in [Microsoft.Extensions.AI.AIFunctionArguments](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionArguments). The [Microsoft.Extensions.AI.AIFunctionArguments](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionArguments) type includes:

- A dictionary of named arguments.
- [Microsoft.Extensions.AI.AIFunctionArguments.Context](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionArguments.Context): An arbitrary `IDictionary<object, object>` for passing additional ambient data into the function.
- [Microsoft.Extensions.AI.AIFunctionArguments.Services](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionArguments.Services): An [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) that lets the `AIFunction` resolve arbitrary state from a [dependency injection (DI)](../../core/extensions/dependency-injection/overview.md) container.

If you want to access either the `AIFunctionArguments` or the `IServiceProvider` from within your [Microsoft.Extensions.AI.AIFunctionFactory.Create*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionFactory.Create*) delegate, create a parameter typed as `IServiceProvider` or `AIFunctionArguments`. That parameter will be bound to the relevant data from the `AIFunctionArguments` passed to `AIFunction.InvokeAsync()`.

The following code shows an example:

[language="csharp" source="snippets/access-data/ArgumentsExample.cs" id="UseAIFunctionArguments"::: (complete source file; reference: snippets/access-data/ArgumentsExample.cs)](../../../_code/docs/ai/how-to/snippets/access-data/ArgumentsExample.cs.md)

[System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) is also special-cased: if the `AIFunctionFactory.Create` delegate or lambda has a `CancellationToken` parameter, it will be bound to the `CancellationToken` that was passed to `AIFunction.InvokeAsync()`.

### Invocation through `FunctionInvokingChatClient`

[Microsoft.Extensions.AI.FunctionInvokingChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.FunctionInvokingChatClient) publishes state about the current invocation to [Microsoft.Extensions.AI.FunctionInvokingChatClient.CurrentContext](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.FunctionInvokingChatClient.CurrentContext), including not only the arguments, but all of the input `ChatMessage` objects, the [Microsoft.Extensions.AI.ChatOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions), and details on which function is being invoked (out of how many). You can add any data you want into [Microsoft.Extensions.AI.ChatOptions.AdditionalProperties](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions.AdditionalProperties) and extract that inside of your `AIFunction` from `FunctionInvokingChatClient.CurrentContext.Options.AdditionalProperties`.

The following code shows an example:

[language="csharp" source="snippets/access-data/ArgumentsExample.cs" id="UseAdditionalProperties"::: (complete source file; reference: snippets/access-data/ArgumentsExample.cs)](../../../_code/docs/ai/how-to/snippets/access-data/ArgumentsExample.cs.md)

#### Dependency injection

If you use [Microsoft.Extensions.AI.FunctionInvokingChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.FunctionInvokingChatClient) to invoke functions automatically, that client configures an [Microsoft.Extensions.AI.AIFunctionArguments](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionArguments) object that it passes into the `AIFunction`. Because `AIFunctionArguments` includes the `IServiceProvider` that the `FunctionInvokingChatClient` was itself provided with, if you construct your client using standard DI means, that `IServiceProvider` is passed all the way into your `AIFunction`. At that point, you can query it for anything you want from DI.

## Advanced techniques

If you want more fine-grained control over how parameters are bound, you can use [Microsoft.Extensions.AI.AIFunctionFactoryOptions.ConfigureParameterBinding](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionFactoryOptions.ConfigureParameterBinding), which puts you in control over how each parameter is populated. For example, the [MCP C# SDK uses this technique](https://github.com/modelcontextprotocol/csharp-sdk/blob/d344c651203841ec1c9e828736d234a6e4aebd07/src/ModelContextProtocol.Core/Server/AIFunctionMcpServerTool.cs#L83-L107) to automatically bind parameters from DI.

If you use the [Microsoft.Extensions.AI.AIFunctionFactory.Create(System.Reflection.MethodInfo,System.Func{Microsoft.Extensions.AI.AIFunctionArguments,System.Object},Microsoft.Extensions.AI.AIFunctionFactoryOptions)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionFactory.Create(System.Reflection.MethodInfo%2CSystem.Func%7BMicrosoft.Extensions.AI.AIFunctionArguments%2CSystem.Object%7D%2CMicrosoft.Extensions.AI.AIFunctionFactoryOptions)) overload, you can also run your own arbitrary logic when you create the target object that the instance method will be called on, each time. And you can do whatever you want to configure that instance.
