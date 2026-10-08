---
title: Use the IChatClient interface
description: Learn how to use the IChatClient interface to get model responses and call tools.
ms.date: 03/13/2026
no-loc: ["IChatClient"]
---

# Use the IChatClient interface

The [Microsoft.Extensions.AI.IChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IChatClient) interface defines a client abstraction responsible for interacting with AI services that provide chat capabilities. It includes methods for sending and receiving messages with multi-modal content (such as text, images, and audio), either as a complete set or streamed incrementally. Additionally, it allows for retrieving strongly typed services provided by the client or its underlying services.

.NET libraries that provide clients for language models and services can provide an implementation of the `IChatClient` interface. Any consumers of the interface are then able to interoperate seamlessly with these models and services via the abstractions. You can find examples in the [Implementation examples](#implementation-examples) section.

## Request a chat response

With an instance of [Microsoft.Extensions.AI.IChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IChatClient), you can call the [Microsoft.Extensions.AI.IChatClient.GetResponseAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IChatClient.GetResponseAsync*) method to send a request and get a response. The request is composed of one or more messages, each of which is composed of one or more pieces of content. Accelerator methods exist to simplify common cases, such as constructing a request for a single piece of text content.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI/Program.cs"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI/Program.cs.md)

The core `IChatClient.GetResponseAsync` method accepts a list of messages. This list represents the history of all messages that are part of the conversation.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.GetResponseAsyncArgs/Program.cs" id="Snippet1"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.GetResponseAsyncArgs/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.GetResponseAsyncArgs/Program.cs.md)

The [Microsoft.Extensions.AI.ChatResponse](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatResponse) that's returned from `GetResponseAsync` exposes a list of [Microsoft.Extensions.AI.ChatMessage](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatMessage) instances that represent one or more messages generated as part of the operation. In common cases, there is only one response message, but in some situations, there can be multiple messages. The message list is ordered, such that the last message in the list represents the final message to the request. To provide all of those response messages back to the service in a subsequent request, you can add the messages from the response back into the messages list.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.AddMessages/Program.cs" id="Snippet1"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.AddMessages/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.AddMessages/Program.cs.md)

## Request a streaming chat response

The inputs to [Microsoft.Extensions.AI.IChatClient.GetStreamingResponseAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IChatClient.GetStreamingResponseAsync*) are identical to those of `GetResponseAsync`. However, rather than returning the complete response as part of a [Microsoft.Extensions.AI.ChatResponse](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatResponse) object, the method returns an [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) where `T` is [Microsoft.Extensions.AI.ChatResponseUpdate](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatResponseUpdate), providing a stream of updates that collectively form the single response.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.GetStreamingResponseAsync/Program.cs" id="Snippet1"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.GetStreamingResponseAsync/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.GetStreamingResponseAsync/Program.cs.md)

> **Tip:**
> Streaming APIs are nearly synonymous with AI user experiences. C# enables compelling scenarios with its `IAsyncEnumerable<T>` support, allowing for a natural and efficient way to stream data.

As with `GetResponseAsync`, you can add the updates from [Microsoft.Extensions.AI.IChatClient.GetStreamingResponseAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IChatClient.GetStreamingResponseAsync*) back into the messages list. Because the updates are individual pieces of a response, you can use helpers like [Microsoft.Extensions.AI.ChatResponseExtensions.ToChatResponse(System.Collections.Generic.IEnumerable{Microsoft.Extensions.AI.ChatResponseUpdate})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatResponseExtensions.ToChatResponse(System.Collections.Generic.IEnumerable%7BMicrosoft.Extensions.AI.ChatResponseUpdate%7D)) to compose one or more updates back into a single [Microsoft.Extensions.AI.ChatResponse](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatResponse) instance.

Helpers like [Microsoft.Extensions.AI.ChatResponseExtensions.AddMessages*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatResponseExtensions.AddMessages*) compose a [Microsoft.Extensions.AI.ChatResponse](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatResponse) and then extract the composed messages from the response and add them to a list.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.AddMessages/Program.cs" id="Snippet2"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.AddMessages/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.AddMessages/Program.cs.md)

## Tool calling

Some models and services support _tool calling_. To gather additional information, you can configure the [Microsoft.Extensions.AI.ChatOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions) with information about tools (usually .NET methods) that the model can request the client to invoke. Instead of sending a final response, the model requests a function invocation with specific arguments. The client then invokes the function and sends the results back to the model with the conversation history. The `Microsoft.Extensions.AI.Abstractions` library includes abstractions for various message content types, including function call requests and results. While `IChatClient` consumers can interact with this content directly, `Microsoft.Extensions.AI` provides helpers that can enable automatically invoking the tools in response to corresponding requests. The `Microsoft.Extensions.AI.Abstractions` and `Microsoft.Extensions.AI` libraries provide the following types:

- [Microsoft.Extensions.AI.AIFunction](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunction): Represents a function that can be described to an AI model and invoked.
- [Microsoft.Extensions.AI.AIFunctionFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionFactory): Provides factory methods for creating `AIFunction` instances that represent .NET methods.
- [Microsoft.Extensions.AI.FunctionInvokingChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.FunctionInvokingChatClient): Wraps an `IChatClient` as another `IChatClient` that adds automatic function-invocation capabilities.

The following example demonstrates a random function invocation (this example depends on the [📦 OllamaSharp](https://www.nuget.org/packages/OllamaSharp) NuGet package):

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.ToolCalling/Program.cs"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.ToolCalling/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.ToolCalling/Program.cs.md)

The preceding code:

- Defines a function named `GetCurrentWeather` that returns a random weather forecast.
- Instantiates a [Microsoft.Extensions.AI.ChatClientBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatClientBuilder) with an `OllamaSharp.OllamaApiClient` and configures it to use function invocation.
- Calls `GetStreamingResponseAsync` on the client, passing a prompt and a list of tools that includes a function created with [Microsoft.Extensions.AI.AIFunctionFactory.Create*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.AIFunctionFactory.Create*).
- Iterates over the response, printing each update to the console.

For more information about creating AI functions, see [Access data in AI functions](how-to/access-data-in-functions.md).

You can also use Model Context Protocol (MCP) tools with your `IChatClient`. For more information, see [Build a minimal MCP client](quickstarts/build-mcp-client.md).

## Cache responses

If you're familiar with [caching in .NET](../core/extensions/caching.md), it's good to know that [Microsoft.Extensions.AI](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI) provides delegating `IChatClient` implementations for caching. The [Microsoft.Extensions.AI.DistributedCachingChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.DistributedCachingChatClient) is an `IChatClient` that layers caching around another arbitrary `IChatClient` instance. When a novel chat history is submitted to the `DistributedCachingChatClient`, it forwards it to the underlying client and then caches the response before sending it back to the consumer. The next time the same history is submitted, such that a cached response can be found in the cache, the `DistributedCachingChatClient` returns the cached response rather than forwarding the request along the pipeline.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.CacheResponses/Program.cs"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.CacheResponses/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.CacheResponses/Program.cs.md)

This example depends on the [📦 Microsoft.Extensions.Caching.Memory](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Memory) NuGet package. For more information, see [Caching in .NET](../core/extensions/caching.md).

## Use telemetry

Another example of a delegating chat client is the [Microsoft.Extensions.AI.OpenTelemetryChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.OpenTelemetryChatClient). This implementation adheres to the [OpenTelemetry Semantic Conventions for Generative AI systems](https://opentelemetry.io/docs/specs/semconv/gen-ai/). Similar to other `IChatClient` delegators, it layers metrics and spans around other arbitrary `IChatClient` implementations.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.UseTelemetry/Program.cs"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.UseTelemetry/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.UseTelemetry/Program.cs.md)

(The preceding example depends on the [📦 OpenTelemetry.Exporter.Console](https://www.nuget.org/packages/OpenTelemetry.Exporter.Console) NuGet package.)

Alternatively, the [Microsoft.Extensions.AI.LoggingChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.LoggingChatClient) and corresponding [Microsoft.Extensions.AI.LoggingChatClientBuilderExtensions.UseLogging(Microsoft.Extensions.AI.ChatClientBuilder,Microsoft.Extensions.Logging.ILoggerFactory,System.Action{Microsoft.Extensions.AI.LoggingChatClient})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.LoggingChatClientBuilderExtensions.UseLogging(Microsoft.Extensions.AI.ChatClientBuilder%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Action%7BMicrosoft.Extensions.AI.LoggingChatClient%7D)) method provide a simple way to write log entries to an [Microsoft.Extensions.Logging.ILogger](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.ILogger) for every request and response.

## Provide options

Every call to [Microsoft.Extensions.AI.IChatClient.GetResponseAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IChatClient.GetResponseAsync*) or [Microsoft.Extensions.AI.IChatClient.GetStreamingResponseAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IChatClient.GetStreamingResponseAsync*) can optionally supply a [Microsoft.Extensions.AI.ChatOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions) instance containing additional parameters for the operation. The most common parameters among AI models and services show up as strongly typed properties on the type, such as [Microsoft.Extensions.AI.ChatOptions.Temperature](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions.Temperature). Other parameters can be supplied by name in a weakly typed manner, via the [Microsoft.Extensions.AI.ChatOptions.AdditionalProperties](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions.AdditionalProperties) dictionary, or via an options instance that the underlying provider understands, using the [Microsoft.Extensions.AI.ChatOptions.RawRepresentationFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions.RawRepresentationFactory) property.

You can also specify options when building an `IChatClient` with the fluent [Microsoft.Extensions.AI.ChatClientBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatClientBuilder) API by chaining a call to the [Microsoft.Extensions.AI.ConfigureOptionsChatClientBuilderExtensions.ConfigureOptions(Microsoft.Extensions.AI.ChatClientBuilder,System.Action{Microsoft.Extensions.AI.ChatOptions})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ConfigureOptionsChatClientBuilderExtensions.ConfigureOptions(Microsoft.Extensions.AI.ChatClientBuilder%2CSystem.Action%7BMicrosoft.Extensions.AI.ChatOptions%7D)) extension method. This delegating client wraps another client and invokes the supplied delegate to populate a `ChatOptions` instance for every call. For example, to ensure that the [Microsoft.Extensions.AI.ChatOptions.ModelId](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions.ModelId) property defaults to a particular model name, you can use code like the following:

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.ProvideOptions/Program.cs"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.ProvideOptions/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.ProvideOptions/Program.cs.md)

## Functionality pipelines

`IChatClient` instances can be layered to create a pipeline of components that each add additional functionality. These components can come from `Microsoft.Extensions.AI`, other NuGet packages, or custom implementations. This approach allows you to augment the behavior of the `IChatClient` in various ways to meet your specific needs. Consider the following code snippet that layers a distributed cache, function invocation, and OpenTelemetry tracing around a sample chat client:

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.FunctionalityPipelines/Program.cs" id="Snippet1"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.FunctionalityPipelines/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.FunctionalityPipelines/Program.cs.md)

## Custom `IChatClient` middleware

To add additional functionality, you can implement `IChatClient` directly or use the [Microsoft.Extensions.AI.DelegatingChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.DelegatingChatClient) class. This class serves as a base for creating chat clients that delegate operations to another `IChatClient` instance. It simplifies chaining multiple clients, which allows calls to pass through to an underlying client.

The `DelegatingChatClient` class provides default implementations for methods like `GetResponseAsync`, `GetStreamingResponseAsync`, and `Dispose`, which forward calls to the inner client. A derived class can then override only the methods it needs to augment the behavior, while delegating other calls to the base implementation. This approach is useful for creating flexible and modular chat clients that are easy to extend and compose.

The following is an example class derived from `DelegatingChatClient` that uses the [System.Threading.RateLimiting](https://www.nuget.org/packages/System.Threading.RateLimiting) library to provide rate-limiting functionality.

[language="csharp" source="snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClient.cs"::: (complete source file; reference: snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClient.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClient.cs.md)

As with other `IChatClient` implementations, the `RateLimitingChatClient` can be composed:

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.CustomClientMiddle/Program.cs"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.CustomClientMiddle/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.CustomClientMiddle/Program.cs.md)

To simplify the composition of such components with others, component authors should create a `Use*` extension method for registering the component into a pipeline. For example, consider the following `UseRateLimiting` extension method:

[language="csharp" source="snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClientExtensions.cs" id="one"::: (complete source file; reference: snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClientExtensions.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClientExtensions.cs.md)

Such extensions can also query for relevant services from the DI container; the [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) used by the pipeline is passed in as an optional parameter:

[language="csharp" source="snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClientExtensions.OptionalOverload.cs"  id="two"::: (complete source file; reference: snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClientExtensions.OptionalOverload.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/AI.Shared/RateLimitingChatClientExtensions.OptionalOverload.cs.md)

Now it's easy for the consumer to use this in their pipeline, for example:

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.ConsumeClientMiddleware/Program.cs" id="SnippetUse"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.ConsumeClientMiddleware/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.ConsumeClientMiddleware/Program.cs.md)

The previous extension methods demonstrate using a `Use` method on [Microsoft.Extensions.AI.ChatClientBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatClientBuilder). `ChatClientBuilder` also provides [Microsoft.Extensions.AI.ChatClientBuilder.Use*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatClientBuilder.Use*) overloads that make it easier to write such delegating handlers. For example, in the earlier `RateLimitingChatClient` example, the overrides of `GetResponseAsync` and `GetStreamingResponseAsync` only need to do work before and after delegating to the next client in the pipeline. To achieve the same thing without writing a custom class, you can use an overload of `Use` that accepts a delegate that's used for both `GetResponseAsync` and `GetStreamingResponseAsync`, reducing the boilerplate required:

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.UseExample/Program.cs"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.UseExample/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.UseExample/Program.cs.md)

For scenarios where you need a different implementation for `GetResponseAsync` and `GetStreamingResponseAsync` to handle their unique return types, you can use the [Microsoft.Extensions.AI.ChatClientBuilder.Use(System.Func{System.Collections.Generic.IEnumerable{Microsoft.Extensions.AI.ChatMessage},Microsoft.Extensions.AI.ChatOptions,Microsoft.Extensions.AI.IChatClient,System.Threading.CancellationToken,System.Threading.Tasks.Task{Microsoft.Extensions.AI.ChatResponse}},System.Func{System.Collections.Generic.IEnumerable{Microsoft.Extensions.AI.ChatMessage},Microsoft.Extensions.AI.ChatOptions,Microsoft.Extensions.AI.IChatClient,System.Threading.CancellationToken,System.Collections.Generic.IAsyncEnumerable{Microsoft.Extensions.AI.ChatResponseUpdate}})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatClientBuilder.Use(System.Func%7BSystem.Collections.Generic.IEnumerable%7BMicrosoft.Extensions.AI.ChatMessage%7D%2CMicrosoft.Extensions.AI.ChatOptions%2CMicrosoft.Extensions.AI.IChatClient%2CSystem.Threading.CancellationToken%2CSystem.Threading.Tasks.Task%7BMicrosoft.Extensions.AI.ChatResponse%7D%7D%2CSystem.Func%7BSystem.Collections.Generic.IEnumerable%7BMicrosoft.Extensions.AI.ChatMessage%7D%2CMicrosoft.Extensions.AI.ChatOptions%2CMicrosoft.Extensions.AI.IChatClient%2CSystem.Threading.CancellationToken%2CSystem.Collections.Generic.IAsyncEnumerable%7BMicrosoft.Extensions.AI.ChatResponseUpdate%7D%7D)) overload that accepts a delegate for each.

## Dependency injection

[Microsoft.Extensions.AI.IChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IChatClient) implementations are often provided to an application via [dependency injection (DI)](../core/extensions/dependency-injection/overview.md). In the following example, an [Microsoft.Extensions.Caching.Distributed.IDistributedCache](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Caching.Distributed.IDistributedCache) is added into the DI container, as is an `IChatClient`. The registration for the `IChatClient` uses a builder that creates a pipeline containing a caching client (which then uses an `IDistributedCache` retrieved from DI) and the sample client. The injected `IChatClient` can be retrieved and used elsewhere in the app.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.DependencyInjection/Program.cs"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.DependencyInjection/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.DependencyInjection/Program.cs.md)

What instance and configuration is injected can differ based on the current needs of the application, and multiple pipelines can be injected with different keys.

## Stateless vs. stateful clients

_Stateless_ services require all relevant conversation history to be sent back on every request. In contrast, _stateful_ services keep track of the history and require only additional messages to be sent with a request. The [Microsoft.Extensions.AI.IChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IChatClient) interface is designed to handle both stateless and stateful AI services.

When working with a stateless service, callers maintain a list of all messages. They add in all received response messages and provide the list back on subsequent interactions.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs" id="Snippet1"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs.md)

For stateful services, you might already know the identifier used for the relevant conversation. You can put that identifier into [Microsoft.Extensions.AI.ChatOptions.ConversationId](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatOptions.ConversationId). Usage then follows the same pattern, except there's no need to maintain a history manually.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs" id="Snippet2"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs.md)

Some services might support automatically creating a conversation ID for a request that doesn't have one, or creating a new conversation ID that represents the current state of the conversation after incorporating the last round of messages. In such cases, you can transfer the [Microsoft.Extensions.AI.ChatResponse.ConversationId](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatResponse.ConversationId) over to the `ChatOptions.ConversationId` for subsequent requests. For example:

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs" id="Snippet3"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs.md)

If you don't know ahead of time whether the service is stateless or stateful, you can check the response [Microsoft.Extensions.AI.ChatResponse.ConversationId](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ChatResponse.ConversationId) and act based on its value. If it's set, then that value is propagated to the options and the history is cleared so as to not resend the same history again. If the response `ConversationId` isn't set, then the response message is added to the history so that it's sent back to the service on the next turn.

[language="csharp" source="snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs" id="Snippet4"::: (complete source file; reference: snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs)](../../_code/docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.StatelessStateful/Program.cs.md)

## Implementation examples

The following sample implements `IChatClient` to show the general structure.

[language="csharp" source="./snippets/sample-implementations/SampleChatClient.cs"::: (complete source file; reference: ./snippets/sample-implementations/SampleChatClient.cs)](../../_code/docs/ai/snippets/sample-implementations/SampleChatClient.cs.md)

For more realistic, concrete implementations of `IChatClient`, see:

- [OpenAIChatClient.cs](https://github.com/dotnet/extensions/blob/main/src/Libraries/Microsoft.Extensions.AI.OpenAI/OpenAIChatClient.cs)
- [Microsoft.Extensions.AI chat clients](https://github.com/dotnet/extensions/tree/main/src/Libraries/Microsoft.Extensions.AI/ChatCompletion)

## Chat reduction (experimental)

> **Important:**
> This feature is experimental and subject to change.

Chat reduction helps manage conversation history by limiting the number of messages or summarizing older messages when the conversation exceeds a specified length. The `Microsoft.Extensions.AI` library provides reducers like [Microsoft.Extensions.AI.MessageCountingChatReducer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.MessageCountingChatReducer) that limits the number of non-system messages, and [Microsoft.Extensions.AI.SummarizingChatReducer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.SummarizingChatReducer) that automatically summarizes older messages while preserving context.

## Chat routing (experimental)

> **Important:**
> This feature is experimental and subject to change.

Chat routing helps direct each request to one of several chat clients&mdash;for example, based on the content of the request, or by failing over to another client when one is unavailable. The `Microsoft.Extensions.AI` library provides [Microsoft.Extensions.AI.RoutingChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.RoutingChatClient), an abstract `IChatClient` that selects and invokes another client for each request, and [Microsoft.Extensions.AI.FailoverChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.FailoverChatClient), an abstract subclass that retries with another client when an attempt fails before producing output. Samples include [Microsoft.Extensions.AI.OrderedFailoverChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.OrderedFailoverChatClient), which fails over across an ordered sequence of clients, and [Microsoft.Extensions.AI.SemanticRoutingChatClient](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.SemanticRoutingChatClient), which selects a client based on the semantic similarity of the request to example utterances.
