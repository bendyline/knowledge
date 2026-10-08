---
title: Configure HTTP and JSON for gRPC JSON transcoding ASP.NET Core apps
author: jamesnk
description: Learn how to configure HTTP and JSON for gRPC JSON transcoding apps.
monikerRange: '>= aspnetcore-7.0'
ms.author: wpickett
ms.date: 09/20/2022
uid: grpc/json-transcoding-binding
---
# Configure HTTP and JSON for gRPC JSON transcoding

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


By [James Newton-King](https://twitter.com/jamesnk)

gRPC JSON transcoding creates RESTful JSON web APIs from gRPC methods. It uses annotations and options for customizing how a RESTful API maps to the gRPC methods.

## HTTP rules

gRPC methods must be annotated with an HTTP rule before they support transcoding. The HTTP rule includes information about calling the gRPC method as a RESTful API, such as the HTTP method and route.

[Code reference unavailable in this source snapshot: ~/grpc/json-transcoding-binding/basic.proto?highlight=1,5-7](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/json-transcoding-binding.md)

An HTTP rule is:

* An annotation on gRPC methods.
* Identified by the name `google.api.http`.
* Imported from the `google/api/annotations.proto` file. The [`google/api/http.proto`](https://github.com/dotnet/aspnetcore/blob/main/src/Grpc/JsonTranscoding/test/testassets/Sandbox/google/api/http.proto) and [`google/api/annotations.proto`](https://github.com/dotnet/aspnetcore/blob/main/src/Grpc/JsonTranscoding/test/testassets/Sandbox/google/api/annotations.proto) files need to be in the project.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


### HTTP method

The HTTP method is specified by setting the route to the matching HTTP method field name:

* `get`
* `put`
* `post`
* `delete`
* `patch`

The `custom` field allows for other HTTP methods.

In the following example, the `CreateAddress` method is mapped to `POST` with the specified route:

[Code reference unavailable in this source snapshot: ~/grpc/json-transcoding-binding/httpmethod.proto?highlight=4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/json-transcoding-binding.md)

### Route

gRPC JSON transcoding routes support route parameters. For example, `{name}` in a route binds to the `name` field on the request message.

To bind a field on a nested message, specify the path to the field. In the following example, `{params.org}` binds to the `org` field on the `IssueParams` message:

[Code reference unavailable in this source snapshot: ~/grpc/json-transcoding-binding/route.proto?highlight=4,11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/json-transcoding-binding.md)

Transcoding routes and [ASP.NET Core routes](../fundamentals/routing.md) have a similar syntax and feature set. However, some ASP.NET Core routing features aren't supported by transcoding. These include:

* [Route constraints](https://learn.microsoft.com/search/?terms=fundamentals%2Frouting%23route-constraints)
* [Default values](https://learn.microsoft.com/search/?terms=fundamentals%2Frouting%23route-templates)
* [Optional parameters](https://learn.microsoft.com/search/?terms=fundamentals%2Frouting%23route-templates)
* [Complex segments](https://learn.microsoft.com/search/?terms=fundamentals%2Frouting%23complex-segments)

### Request body

Transcoding deserializes the request body JSON to the request message. The `body` field specifies how the HTTP request body maps to the request message. The value is either the name of the request field whose value is mapped to the HTTP request body or `*` for mapping all request fields.

In the following example, the HTTP request body is deserialized to the `address` field:

[Code reference unavailable in this source snapshot: ~/grpc/json-transcoding-binding/requestbody.proto?highlight=5,12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/json-transcoding-binding.md)

### Query parameters

Any fields in the request message that aren't bound by route parameters or the request body can be set using HTTP query parameters.

[Code reference unavailable in this source snapshot: ~/grpc/json-transcoding-binding/queryparameters.proto?highlight=12-13](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/json-transcoding-binding.md)

In the preceding example:

* `org` and `repo` fields are bound from route parameters.
* Other fields, such as `text` and the nested fields from `page`, can be bound from the query string: `?text=value&page.index=0&page.size=10`

### Response body

By default, transcoding serializes the entire response message as JSON. The `response_body` field allows serialization of a subset of the response message.

[Code reference unavailable in this source snapshot: ~/grpc/json-transcoding-binding/responsebody.proto?highlight=5,12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/grpc/json-transcoding-binding.md)

In the preceding example, the `address` field is serialized to the response body as JSON.

### Specification

For more information about customizing gRPC transcoding, see the [HttpRule specification](https://cloud.google.com/service-infrastructure/docs/service-management/reference/rpc/google.api#google.api.HttpRule).

## Customize JSON

Messages are converted to and from JSON using the [JSON mapping in the Protobuf specification](https://developers.google.com/protocol-buffers/docs/proto3#json). Protobuf's JSON mapping is a standardized way to convert between JSON and Protobuf, and all serialization follows these rules.

However, gRPC JSON transcoding offers some limited options for customizing JSON with [Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings), as shown in the following table.

| Option | Default Value | Description |
| --- | --- | --- |
| [Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.IgnoreDefaultValues](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.IgnoreDefaultValues) | `false` | If set to `true`, fields with default values are ignored during serialization. |
| [Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.WriteEnumsAsIntegers](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.WriteEnumsAsIntegers) | `false` | If set to `true`, enum values are written as integers instead of strings. |
| [Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.WriteInt64sAsStrings](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.WriteInt64sAsStrings) | `false` | If set to `true`, `Int64` and `UInt64` values are written as strings instead of numbers. |
| [Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.WriteIndented](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.WriteIndented) | `false` | If set to `true`, JSON is written using pretty printing. This option doesn't affect streaming methods, which write line-delimited JSON messages and can't use pretty printing. |

```csharp
builder.Services.AddGrpc().AddJsonTranscoding(o =>
{
    o.JsonSettings.WriteIndented = true;
});
```

In the `.proto` file, the `json_name` field option customizes a field's name when it's serialized as JSON, as in the following example:

```protobuf
message TestMessage {
  string my_field = 1 [json_name="customFieldName"];
}
```

Transcoding doesn't support advanced JSON customization. Apps requiring precise JSON structure control should consider using [ASP.NET Core Web API](../web-api/index.md).

## Additional resources

* [grpc/json-transcoding](json-transcoding.md)
* [HttpRule specification](https://cloud.google.com/service-infrastructure/docs/service-management/reference/rpc/google.api#google.api.HttpRule)
