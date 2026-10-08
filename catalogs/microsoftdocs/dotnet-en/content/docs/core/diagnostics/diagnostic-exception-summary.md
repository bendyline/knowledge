---
title: Exception summarization in C#
description: Learn the value proposition of exception summarization within diagnostic metrics for .NET app development.
ms.date: 11/29/2023
---

# Exception summarization

When you're trying to generate meaningful diagnostic messages for exceptions, maintaining the inclusion of pertinent information can pose a challenge. The standard exception message often lacks critical details that accompany the exception, while invoking the [System.Exception.ToString*](https://learn.microsoft.com/search/?terms=System.Exception.ToString*) method yields an excess of state information.

This article relies on the [Microsoft.Extensions.Diagnostics.ExceptionSummarization](https://www.nuget.org/packages/Microsoft.Extensions.Diagnostics.ExceptionSummarization) NuGet package.

## The goal of exception summarization

Metric tags typically support a limited number of distinct values, and as such they are not suitable to represent values which are highly variable, such as the result of [System.Exception.ToString](https://learn.microsoft.com/search/?terms=System.Exception.ToString). An exception summary represents a low-cardinality version of an exception's information, suitable for such cases.

The goal of exception summarization is twofold:

- To reduce the cardinality associated with exception state such that exceptions can be reliably counted in metrics. This matters since metric dimensions have limited cardinality.
- To eliminate privacy-sensitive information from exception state such that some meaningful exception information can be added to logs.

## Exception summarization API

The [Microsoft.Extensions.Diagnostics.ExceptionSummarization.IExceptionSummarizer](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.ExceptionSummarization.IExceptionSummarizer) interface offers methods for extracting crucial details from recognized exception types, thereby furnishing a singular `string` that serves as the foundation for crafting top-quality diagnostic messages.

The [Microsoft.Extensions.Diagnostics.ExceptionSummarization.IExceptionSummarizer.Summarize*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.ExceptionSummarization.IExceptionSummarizer.Summarize*) method systematically traverses the roster of registered summarizers until it identifies a summarizer capable of handling the specific exception type. In the event that no summarizer is capable of recognizing the exception type, a meaningful default exception summary is provided instead.

The result of the `Summarize` method returns an [Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary) struct, and it contains the following properties:

- [Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.Description](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.Description): The summary description of the exception.
- [Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.AdditionalDetails](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.AdditionalDetails): Intended for low-level diagnostic use, this property contains additional details about the exception and has a relatively high cardinality. This property may contain privacy-sensitive information.
- [Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.ExceptionType](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.ExceptionType):  The type of the exception, unless inner exceptions are present, in which case both outer and inner types are reflected.

## Example exception summarization usage

The following example demonstrates how to use the `IExceptionSummarizer` interface to retrieve a summary of an exception.

[source="snippets/exception-summary/Program.cs"::: (complete source file; reference: snippets/exception-summary/Program.cs)](../../../_code/docs/core/diagnostics/snippets/exception-summary/Program.cs.md)

The preceding code:

- Instantiates a new [Microsoft.Extensions.DependencyInjection.ServiceCollection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollection) instance, chaining a call to the [Microsoft.Extensions.DependencyInjection.ExceptionSummarizationServiceCollectionExtensions.AddExceptionSummarizer*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ExceptionSummarizationServiceCollectionExtensions.AddExceptionSummarizer*) extension method.
  - The `AddExceptionSummarizer` extension method accepts a delegate that is used to configure the `ExceptionSummarizerBuilder` instance.
  - The `builder` is used to add the HTTP provider, which handles exceptions of type:
    - [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException)
    - [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException)
    - [System.Net.Sockets.SocketException](https://learn.microsoft.com/search/?terms=System.Net.Sockets.SocketException)
    - [System.Net.WebException](https://learn.microsoft.com/search/?terms=System.Net.WebException)
- Builds a new `ServiceProvider` instance from the `ServiceCollection` instance.
- Gets an instance of the `IExceptionSummarizer` interface from the `ServiceProvider` instance.
- Iterates over a collection of exceptions, calling the `Summarize` method on each exception and displaying the result.

> **Note:**
> The primary focus in the design of all exception summarization implementations is to provide diagnostic convenience, rather than prioritizing the protection of personally identifiable information (PII). The [Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.Description](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.Description) doesn't contain sensitive information, but the [Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.AdditionalDetails](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.AdditionalDetails) might contain sensitive information depending on the implementation.
