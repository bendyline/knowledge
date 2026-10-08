---
title: Custom formatters in ASP.NET Core Web API
author: tdykstra
description: Learn how to create and use custom formatters for web APIs in ASP.NET Core.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 01/26/2022
uid: web-api/advanced/custom-formatters
---
# Custom formatters in ASP.NET Core Web API

**Applies to: \>= aspnetcore-6.0**

ASP.NET Core MVC supports data exchange in Web APIs using input and output formatters. Input formatters are used by [Model Binding](../../mvc/models/model-binding.md). Output formatters are used to [format responses](formatting.md).

The framework provides built-in input and output formatters for JSON and XML. It provides a built-in output formatter for plain text, but doesn't provide an input formatter for plain text.

This article shows how to add support for additional formats by creating custom formatters. For an example of a custom plain text input formatter, see [TextPlainInputFormatter](https://github.com/aspnet/Entropy/blob/master/samples/Mvc.Formatters/TextPlainInputFormatter.cs) on GitHub.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## When to use a custom formatter

Use a custom formatter to add support for a content type that isn't handled by the built-in formatters.

## Overview of how to create a custom formatter

To create a custom formatter:

* For serializing data sent to the client, create an output formatter class.
* For deserializing data received from the client, create an input formatter class.
* Add instances of formatter classes to the [Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%252A) and [Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters%252A) collections in [Microsoft.AspNetCore.Mvc.MvcOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions).

## Create a custom formatter

To create a formatter:

* Derive the class from the appropriate base class. The sample app derives from [Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter) and [Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter).
* Specify supported media types and encodings in the constructor.
* Override the [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType%252A) and [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%252A) methods.
* Override the [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync%252A) and [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync%252A) methods.

The following code shows the `VcardOutputFormatter` class from the [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples):

[language="csharp" source="custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_Class"::: (complete source file; reference: custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

### Derive from the appropriate base class

For text media types (for example, vCard), derive from the [Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter) or [Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter) base class:

[language="csharp" source="custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_ClassDeclaration"::: (complete source file; reference: custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

For binary types, derive from the [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter) or [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter) base class.

### Specify supported media types and encodings

In the constructor, specify supported media types and encodings by adding to the [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.SupportedMediaTypes%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.SupportedMediaTypes%252A) and [Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter.SupportedEncodings%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter.SupportedEncodings%252A) collections:

[language="csharp" source="custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_ctor"::: (complete source file; reference: custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

A formatter class can **not** use constructor injection for its dependencies. For example, `ILogger<VcardOutputFormatter>` can't be added as a parameter to the constructor. To access services, use the context object that gets passed in to the methods. A code example in this article and the [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples) show how to do this.

### Override CanReadType and CanWriteType

Specify the type to deserialize into or serialize from by overriding the [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType%252A) or [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%252A) methods. For example, to create vCard text from a `Contact` type and vice versa:

[language="csharp" source="custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_CanWriteType"::: (complete source file; reference: custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

#### The CanWriteResult method

In some scenarios, [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteResult%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteResult%252A) must be overridden rather than [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%252A). Use `CanWriteResult` if the following conditions are true:

* The action method returns a model class.
* There are derived classes that might be returned at runtime.
* The derived class returned by the action must be known at runtime.

For example, suppose the action method:

* Signature returns a `Person` type.
* Can return a `Student` or `Instructor` type that derives from `Person`. 

For the formatter to handle only `Student` objects, check the type of [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatterCanWriteContext.Object](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatterCanWriteContext.Object) in the context object provided to the `CanWriteResult` method. When the action method returns [Microsoft.AspNetCore.Mvc.IActionResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.IActionResult):

* It's not necessary to use `CanWriteResult`.
* The `CanWriteType` method receives the runtime type.

<a id="read-write"></a>

### Override ReadRequestBodyAsync and WriteResponseBodyAsync

Deserialization or serialization is performed in [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync%252A) or [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync%252A). The following example shows how to get services from the dependency injection container. Services can't be obtained from constructor parameters:

[language="csharp" source="custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_WriteResponseBodyAsync"::: (complete source file; reference: custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

## Configure MVC to use a custom formatter

To use a custom formatter, add an instance of the formatter class to the [Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%252A) or [Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters%252A) collection:

[language="csharp" source="custom-formatters/samples/6.x/CustomFormattersSample/Program.cs" id="snippet_AddControllers" highlight="5-6"::: (complete source file; reference: custom-formatters/samples/6.x/CustomFormattersSample/Program.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/6.x/CustomFormattersSample/Program.cs.md)

Formatters are evaluated in the order they're inserted, where the first one takes precedence.

## The complete `VcardInputFormatter` class

The following code shows the `VcardInputFormatter` class from the [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples):

[language="csharp" source="custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardInputFormatter.cs" id="snippet_Class"::: (complete source file; reference: custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardInputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/6.x/CustomFormattersSample/Formatters/VcardInputFormatter.cs.md)

## Test the app

[Run the sample app for this article](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples), which implements basic vCard input and output formatters. The app reads and writes vCards similar to the following format:

```
BEGIN:VCARD
VERSION:2.1
N:Davolio;Nancy
FN:Nancy Davolio
END:VCARD
```

To see vCard output, run the app and send a Get request with Accept header `text/vcard` to `https://localhost:<port>/api/contacts`.

To add a vCard to the in-memory collection of contacts:

* Send a `Post` request to `/api/contacts` with a tool like [http-repl](../http-repl/index.md).
* Set the `Content-Type` header to `text/vcard`.
* Set `vCard` text in the body, formatted like the preceding example.

## Additional resources

* [web-api/advanced/formatting](formatting.md)
* [grpc/dotnet-grpc](../../grpc/dotnet-grpc.md)



**Applies to: < aspnetcore-6.0**

ASP.NET Core MVC supports data exchange in Web APIs using input and output formatters. Input formatters are used by [Model Binding](../../mvc/models/model-binding.md). Output formatters are used to [format responses](formatting.md).

The framework provides built-in input and output formatters for JSON and XML. It provides a built-in output formatter for plain text, but doesn't provide an input formatter for plain text.

This article shows how to add support for additional formats by creating custom formatters. For an example of a custom plain text input formatter, see [TextPlainInputFormatter](https://github.com/aspnet/Entropy/blob/master/samples/Mvc.Formatters/TextPlainInputFormatter.cs) on GitHub.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## When to use a custom formatter

Use a custom formatter to add support for a content type that isn't handled by the built-in formatters.

## Overview of how to create a custom formatter

To create a custom formatter:

* For serializing data sent to the client, create an output formatter class.
* For deserializing data received from the client, create an input formatter class.
* Add instances of formatter classes to the [Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%252A) and [Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters%252A) collections in [Microsoft.AspNetCore.Mvc.MvcOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions).

## Create a custom formatter

To create a formatter:

* Derive the class from the appropriate base class. The sample app derives from [Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter) and [Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter).
* Specify supported media types and encodings in the constructor.
* Override the [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType%252A) and [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%252A) methods.
* Override the [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync%252A) and [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync%252A) methods.

The following code shows the `VcardOutputFormatter` class from the [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples):

[language="csharp" source="custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_Class"::: (complete source file; reference: custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

### Derive from the appropriate base class

For text media types (for example, vCard), derive from the [Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter) or [Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter) base class:

[language="csharp" source="custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_ClassDeclaration"::: (complete source file; reference: custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

For binary types, derive from the [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter) or [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter) base class.

### Specify supported media types and encodings

In the constructor, specify supported media types and encodings by adding to the [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.SupportedMediaTypes%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.SupportedMediaTypes%252A) and [Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter.SupportedEncodings%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter.SupportedEncodings%252A) collections:

[language="csharp" source="custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_ctor"::: (complete source file; reference: custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

A formatter class can **not** use constructor injection for its dependencies. For example, `ILogger<VcardOutputFormatter>` can't be added as a parameter to the constructor. To access services, use the context object that gets passed in to the methods. A code example in this article and the [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples) show how to do this.

### Override CanReadType and CanWriteType

Specify the type to deserialize into or serialize from by overriding the [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType%252A) or [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%252A) methods. For example, to create vCard text from a `Contact` type and vice versa:

[language="csharp" source="custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_CanWriteType"::: (complete source file; reference: custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

#### The CanWriteResult method

In some scenarios, [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteResult%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteResult%252A) must be overridden rather than [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType%252A). Use `CanWriteResult` if the following conditions are true:

* The action method returns a model class.
* There are derived classes that might be returned at runtime.
* The derived class returned by the action must be known at runtime.

For example, suppose the action method:

* Signature returns a `Person` type.
* Can return a `Student` or `Instructor` type that derives from `Person`. 

For the formatter to handle only `Student` objects, check the type of [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatterCanWriteContext.Object](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatterCanWriteContext.Object) in the context object provided to the `CanWriteResult` method. When the action method returns [Microsoft.AspNetCore.Mvc.IActionResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.IActionResult):

* It's not necessary to use `CanWriteResult`.
* The `CanWriteType` method receives the runtime type.

<a id="read-write"></a>

### Override ReadRequestBodyAsync and WriteResponseBodyAsync

Deserialization or serialization is performed in [Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync%252A) or [Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync%252A). The following example shows how to get services from the dependency injection container. Services can't be obtained from constructor parameters:

[language="csharp" source="custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs" id="snippet_WriteResponseBodyAsync"::: (complete source file; reference: custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardOutputFormatter.cs.md)

## Configure MVC to use a custom formatter

To use a custom formatter, add an instance of the formatter class to the [Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters%252A) or [Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters%252A) collection:

[language="csharp" source="custom-formatters/samples/3.x/CustomFormattersSample/Startup.cs" id="snippet_ConfigureServices" highlight="5-6"::: (complete source file; reference: custom-formatters/samples/3.x/CustomFormattersSample/Startup.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/3.x/CustomFormattersSample/Startup.cs.md)

Formatters are evaluated in the order you insert them. The first one takes precedence.

## The complete `VcardInputFormatter` class

The following code shows the `VcardInputFormatter` class from the [sample](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples):

[language="csharp" source="custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardInputFormatter.cs" id="snippet_Class"::: (complete source file; reference: custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardInputFormatter.cs)](../../../_code/aspnetcore/web-api/advanced/custom-formatters/samples/3.x/CustomFormattersSample/Formatters/VcardInputFormatter.cs.md)

## Test the app

[Run the sample app for this article](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/advanced/custom-formatters/samples), which implements basic vCard input and output formatters. The app reads and writes vCards similar to the following format:

```
BEGIN:VCARD
VERSION:2.1
N:Davolio;Nancy
FN:Nancy Davolio
END:VCARD
```

To see vCard output, run the app and send a Get request with Accept header `text/vcard` to `https://localhost:5001/api/contacts`.

To add a vCard to the in-memory collection of contacts:

* Send a `Post` request to `/api/contacts` with a tool like curl.
* Set the `Content-Type` header to `text/vcard`.
* Set `vCard` text in the body, formatted like the preceding example.

## Additional resources

* [web-api/advanced/formatting](formatting.md)
* [grpc/dotnet-grpc](../../grpc/dotnet-grpc.md)
