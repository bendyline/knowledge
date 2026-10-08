---
title: "Use the Microsoft.Extensions.Primitives library"
description: Learn about the various primitive types from the Microsoft.Extensions.Primitives library.
ms.date: 08/27/2026
ai-usage: ai-assisted
---

# Primitives: The extensions library for .NET

In this article, you'll learn about the [Microsoft.Extensions.Primitives](https://learn.microsoft.com/dotnet/api/microsoft.extensions.primitives) library. The primitives in this article are *not* to be confused with .NET primitive types from the BCL, or that of the C# language. Instead, the types within the primitive's library serve as building blocks for some of the peripheral .NET NuGet packages, such as:

- [`Microsoft.Extensions.Configuration`](https://www.nuget.org/packages/Microsoft.Extensions.Configuration)
- [`Microsoft.Extensions.Configuration.FileExtensions`](https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions)
- [`Microsoft.Extensions.FileProviders.Composite`](https://www.nuget.org/packages/Microsoft.Extensions.FileProviders.Composite)
- [`Microsoft.Extensions.FileProviders.Physical`](https://www.nuget.org/packages/Microsoft.Extensions.FileProviders.Physical)
- [`Microsoft.Extensions.Logging.EventSource`](https://www.nuget.org/packages/Microsoft.Extensions.Logging.EventSource)
- [`Microsoft.Extensions.Options`](https://www.nuget.org/packages/Microsoft.Extensions.Options)
- [`System.Text.Json`](https://www.nuget.org/packages/System.Text.Json)

## Change notifications

Propagating notifications when a change occurs is a fundamental concept in programming. The observed state of an object more often than not can change. When change occurs, implementations of the [Microsoft.Extensions.Primitives.IChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken) interface can be used to notify interested parties of said change. The implementations available are as follows:

- [Microsoft.Extensions.Primitives.CancellationChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.CancellationChangeToken)
- [Microsoft.Extensions.Primitives.CompositeChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.CompositeChangeToken)

As a developer, you're also free to implement your own type. The [Microsoft.Extensions.Primitives.IChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken) interface defines a few properties:

- [Microsoft.Extensions.Primitives.IChangeToken.HasChanged](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken.HasChanged): Gets a value that indicates if a change has occurred.
- [Microsoft.Extensions.Primitives.IChangeToken.ActiveChangeCallbacks](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.IChangeToken.ActiveChangeCallbacks): Indicates whether the token proactively raises callbacks. If `false`, the token consumer must poll `HasChanged` to detect changes.

## Instance-based functionality

Consider the following example usage of the `CancellationChangeToken`:

[source="./snippets/primitives/change/Example.Cancellation.cs" id="Cancellation"::: (complete source file; reference: ./snippets/primitives/change/Example.Cancellation.cs)](../../../_code/docs/core/extensions/snippets/primitives/change/Example.Cancellation.cs.md)

In the preceding example, a [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) is instantiated and its [System.Threading.CancellationTokenSource.Token](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Token) is passed to the [Microsoft.Extensions.Primitives.CancellationChangeToken.%23ctor*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.CancellationChangeToken.%2523ctor*) constructor. The initial state of `HasChanged` is written to the console. An `Action<object?> callback` is created that writes when the callback is invoked to the console. The token's [Microsoft.Extensions.Primitives.CancellationChangeToken.RegisterChangeCallback(System.Action{System.Object},System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.CancellationChangeToken.RegisterChangeCallback(System.Action%7BSystem.Object%7D%2CSystem.Object)) method is called, given the `callback`. Within the `using` statement, the `cancellationTokenSource` is cancelled. This triggers the callback, and the state of `HasChanged` is again written to the console.

When you need to take action from multiple sources of change, use the [Microsoft.Extensions.Primitives.CompositeChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.CompositeChangeToken). This implementation aggregates one or more change tokens and fires each registered callback exactly one time regardless of the number of times a change is triggered. Consider the following example:

[source="./snippets/primitives/change/Example.Composites.cs" id="Composites"::: (complete source file; reference: ./snippets/primitives/change/Example.Composites.cs)](../../../_code/docs/core/extensions/snippets/primitives/change/Example.Composites.cs.md)

In the preceding C# code, three [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) objects instances are created and paired with corresponding [Microsoft.Extensions.Primitives.CancellationChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.CancellationChangeToken) instances. The composite token is instantiated by passing an array of the tokens to the [Microsoft.Extensions.Primitives.CompositeChangeToken.%23ctor*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.CompositeChangeToken.%2523ctor*) constructor. The `Action<object?> callback` is created, but this time the `state` object is used and written to console as a formatted message. The callback is registered four times, each with a slightly different state object argument. The code uses a pseudo-random number generator to pick one of the change token sources (doesn't matter which one) and call its [System.Threading.CancellationTokenSource.Cancel](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Cancel) method. This triggers the change, invoking each registered callback exactly once.

Note that `ActiveChangeCallbacks` of the `CompositeChangeToken` is `true` when at least one inner token supports active callbacks. The composite token subscribes only to those active inner tokens. To detect a change from a passive inner token, poll the composite token's `HasChanged` property.

## Alternative `static` approach

As an alternative to calling `RegisterChangeCallback`, you could use the [Microsoft.Extensions.Primitives.ChangeToken](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.ChangeToken) static class. Consider the following consumption pattern:

[source="./snippets/primitives/change/Example.Static.cs" id="Static"::: (complete source file; reference: ./snippets/primitives/change/Example.Static.cs)](../../../_code/docs/core/extensions/snippets/primitives/change/Example.Static.cs.md)

Much like previous examples, you'll need an `IChangeToken` implementation returned by `changeTokenProducer`. The producer is a `Func<IChangeToken?>`. After a change, it should return a new token for the next registration. If it returns `null`, `ChangeToken.OnChange` doesn't register a callback. Dispose the `IDisposable` returned by `OnChange` to unregister the consumer.

For a synchronous consumer, pass an `Action` or `Action<TState>`. Exceptions from the producer or consumer propagate to the caller that registers or triggers the token.

Starting in .NET 11, you can pass a `Func<Task>` or `Func<TState, Task>` for an asynchronous consumer. `ChangeToken.OnChange` waits for the returned task to complete before the consumer can be invoked again. This behavior prevents concurrent consumer calls, but it can combine multiple changes that occur while the task runs into one later callback. An exception thrown before the consumer returns its task propagates to the code that registers or triggers the token. Exceptions that occur after the task is returned are left unobserved by `ChangeToken.OnChange`.

> **Note:**
> When you recompile existing code for .NET 11, an `async` lambda can bind to a new task-returning overload instead of the synchronous `Action` overload. The new binding changes callback timing from `async void` behavior to task-based behavior. For more information, see [ChangeToken.OnChange async overloads rebind existing Task-returning callbacks](../compatibility/extensions/11/changetoken-onchange-async-overloads-rebind-callbacks.md).

## String tokenizers, segments, and values

Interacting with strings is commonplace in application development. Various representations of strings are parsed, split, or iterated over. The primitives library offers a few choice types that help to make interacting with strings more optimized and efficient. Consider the following types:

- [Microsoft.Extensions.Primitives.StringSegment](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringSegment): An optimized representation of a substring.
- [Microsoft.Extensions.Primitives.StringTokenizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringTokenizer): Tokenizes a `string` into `StringSegment` instances.
- [Microsoft.Extensions.Primitives.StringValues](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringValues): Represents `null`, zero, one, or many strings in an efficient way.

### The `StringSegment` type

In this section, you'll learn about an optimized representation of a substring known as the [Microsoft.Extensions.Primitives.StringSegment](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringSegment) `struct` type. Consider the following C# code example showing some of the `StringSegment` properties and the `AsSpan` method:

[source="./snippets/primitives/string/Example.Segment.cs" id="Segment"::: (complete source file; reference: ./snippets/primitives/string/Example.Segment.cs)](../../../_code/docs/core/extensions/snippets/primitives/string/Example.Segment.cs.md)

The preceding code instantiates the `StringSegment` given a `string` value, an `offset`, and a `length`. The [Microsoft.Extensions.Primitives.StringSegment.Buffer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringSegment.Buffer) is the original string argument, and the [Microsoft.Extensions.Primitives.StringSegment.Value](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringSegment.Value) is the substring based on the [Microsoft.Extensions.Primitives.StringSegment.Offset](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringSegment.Offset) and [Microsoft.Extensions.Primitives.StringSegment.Length](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringSegment.Length) values.

The `StringSegment` struct provides [many methods](https://learn.microsoft.com/dotnet/api/microsoft.extensions.primitives.stringsegment#methods) for interacting with the segment.

### The `StringTokenizer` type

The [Microsoft.Extensions.Primitives.StringTokenizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringTokenizer) object is a struct type that tokenizes a `string` into `StringSegment` instances. The tokenization of large strings usually involves splitting the string apart and iterating over it. With that said, [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) probably comes to mind. These APIs are similar, but in general, [Microsoft.Extensions.Primitives.StringTokenizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringTokenizer) provides better performance. First, consider the following example:

[source="./snippets/primitives/string/Example.Tokenizer.cs" id="Tokenizer"::: (complete source file; reference: ./snippets/primitives/string/Example.Tokenizer.cs)](../../../_code/docs/core/extensions/snippets/primitives/string/Example.Tokenizer.cs.md)

In the preceding code, an instance of the `StringTokenizer` type is created given 900 auto-generated paragraphs of Lorem Ipsum text and an array with a single value of a white-space character `' '`. Each value within the tokenizer is represented as a `StringSegment`. The code iterates the segments, allowing the consumer to interact with each `segment`.

#### Benchmark comparing `StringTokenizer` to `string.Split`

With the various ways of slicing and dicing strings, it feels appropriate to compare two methods with a benchmark. Using the [BenchmarkDotNet](https://www.nuget.org/packages/BenchmarkDotNet) NuGet package, consider the following two benchmark methods:

1. **Using [Microsoft.Extensions.Primitives.StringTokenizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringTokenizer)**:

    [source="./snippets/primitives/string/Example.Tokenizer.cs" id="TokenizerBenchmark"::: (complete source file; reference: ./snippets/primitives/string/Example.Tokenizer.cs)](../../../_code/docs/core/extensions/snippets/primitives/string/Example.Tokenizer.cs.md)

1. **Using [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*)**:

    [source="./snippets/primitives/string/Example.Tokenizer.cs" id="SplitBenchmark"::: (complete source file; reference: ./snippets/primitives/string/Example.Tokenizer.cs)](../../../_code/docs/core/extensions/snippets/primitives/string/Example.Tokenizer.cs.md)

Both methods look similar on the API surface area, and they're both capable of splitting a large string into chunks. The benchmark results below show that the `StringTokenizer` approach is nearly three times faster, but *results may vary*. As with all performance considerations, you should evaluate your specific use case.

| Method | Mean | Error | StdDev | Ratio |
| --- | ---: | ---: | ---: | ---: |
| Tokenizer | 3.315 ms | 0.0659 ms | 0.0705 ms | 0.32 |
| Split | 10.257 ms | 0.2018 ms | 0.2552 ms | 1.00 |

***Legend***

- Mean: Arithmetic mean of all measurements
- Error: Half of 99.9% confidence interval
- Standard deviation: Standard deviation of all measurements
- Median: Value separating the higher half of all measurements (50th percentile)
- Ratio: Mean of the ratio distribution (Current/Baseline)
- Ratio standard deviation: Standard deviation of the ratio distribution (Current/Baseline)
- 1 ms: 1 Millisecond (0.001 sec)

For more information on benchmarking with .NET, see [BenchmarkDotNet](https://old.dotnetfoundation.org/projects/benchmarkdotnet).

### The `StringValues` type

The [Microsoft.Extensions.Primitives.StringValues](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringValues) object is a `struct` type that represents `null`, zero, one, or many strings in an efficient way. The `StringValues` type can be constructed with either of the following syntaxes: `string?` or `string?[]?`. Using the text from the previous example, consider the following C# code:

[source="./snippets/primitives/string/Example.StringValues.cs" id="StringValues"::: (complete source file; reference: ./snippets/primitives/string/Example.StringValues.cs)](../../../_code/docs/core/extensions/snippets/primitives/string/Example.StringValues.cs.md)

The preceding code instantiates a `StringValues` object given an array of string values. The [Microsoft.Extensions.Primitives.StringValues.Count](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Primitives.StringValues.Count) is written to the console.

The `StringValues` type is an implementation of the following collection types:

- `IList<string>`
- `ICollection<string>`
- `IEnumerable<string>`
- `IEnumerable`
- `IReadOnlyList<string>`
- `IReadOnlyCollection<string>`

As such, it can be iterated over and each `value` can be interacted with as needed.

## See also

- [Options pattern in .NET](options.md)
- [Configuration in .NET](configuration.md)
- [Logging providers in .NET](logging/providers.md)
