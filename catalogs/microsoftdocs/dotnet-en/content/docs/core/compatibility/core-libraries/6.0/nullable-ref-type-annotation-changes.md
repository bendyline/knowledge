---
title: "Breaking change: Nullable reference type annotation changes"
description: Learn about the .NET 6 breaking change in core .NET libraries where some nullable reference type annotations have changed.
ms.date: 12/13/2023
---
# Changes to nullable reference type annotations

In .NET 6, some nullability annotations in the .NET libraries have changed.

## Change description

In previous .NET versions, some nullable reference type annotations are incorrect, and build warnings are either absent or incorrect. Starting in .NET 6, some annotations that were previously applied have been updated. New build warnings will be produced and incorrect build warnings will no longer be produced for the affected APIs.

Some of these changes are considered to be *breaking* because they can lead to new build-time warnings. When you migrate to .NET 6, code that references these APIs will need to be updated.

Other changes that aren't considered to be breaking are also documented on this page. Any code that references the updated APIs may benefit from removing operators or pragmas that are no longer necessary.

## Version introduced

6.0

## Type of breaking change

This change can affect [source compatibility](../../categories.md#source-compatibility).

## Reason for change

Starting in .NET Core 3.0, nullability annotations were applied to the .NET libraries. From the outset of the effort, mistakes in these annotations were anticipated. Through feedback and further testing, the nullable annotations for the affected APIs were determined to be inaccurate. The updated annotations correctly represent the nullability contracts for the APIs.

## Recommended action

Update code that calls these APIs to reflect the revised nullability contracts.

## Affected APIs

The following table lists the affected APIs:

| API | What changed | Breaking or nonbreaking |
| --- | --- | --- |
| [System.ComponentModel.DataAnnotations.AssociatedMetadataTypeTypeDescriptionProvider.GetTypeDescriptor(System.Type,System.Object)](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.AssociatedMetadataTypeTypeDescriptionProvider.GetTypeDescriptor(System.Type%2CSystem.Object)) | `instance` parameter type is nullable | Nonbreaking |
| [System.ComponentModel.ISite.Container](https://learn.microsoft.com/search/?terms=System.ComponentModel.ISite.Container) | Property type is nullable | Breaking |
| [System.Xml.Linq.XContainer.Add(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer.Add(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XContainer.AddFirst(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer.AddFirst(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XContainer.ReplaceNodes(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer.ReplaceNodes(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XDocument.%23ctor(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.%2523ctor(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XDocument.%23ctor(System.Xml.Linq.XDeclaration,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument.%2523ctor(System.Xml.Linq.XDeclaration%2CSystem.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XElement.%23ctor(System.Xml.Linq.XName,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.%2523ctor(System.Xml.Linq.XName%2CSystem.Object%5B%5D)) | Second parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XElement.ReplaceAll(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.ReplaceAll(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XElement.ReplaceAttributes(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.ReplaceAttributes(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XNode.AddAfterSelf(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.AddAfterSelf(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XNode.AddBeforeSelf(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.AddBeforeSelf(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XNode.ReplaceWith(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.ReplaceWith(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XStreamingElement.%23ctor(System.Xml.Linq.XName,System.Object)](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XStreamingElement.%2523ctor(System.Xml.Linq.XName%2CSystem.Object)) | Second parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XStreamingElement.%23ctor(System.Xml.Linq.XName,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XStreamingElement.%2523ctor(System.Xml.Linq.XName%2CSystem.Object%5B%5D)) | Second parameter type is nullable | Nonbreaking |
| [System.Xml.Linq.XStreamingElement.Add(System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XStreamingElement.Add(System.Object%5B%5D)) | Parameter type is nullable | Nonbreaking |
| [System.Xml.XmlDocument.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.XmlResolver) | The setter accepts a nullable reference | Breaking |
| [System.Net.Http.HttpClient.PatchAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.PatchAsync*) | `content` parameter type is nullable | Nonbreaking |
| [System.Net.Http.HttpClient.PostAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.PostAsync*) | `content` parameter type is nullable | Nonbreaking |
| [System.Net.Http.HttpClient.PutAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.PutAsync*) | `content` parameter type is nullable | Nonbreaking |
| [System.Linq.Expressions.MethodCallExpression.Update(System.Linq.Expressions.Expression,System.Collections.Generic.IEnumerable{System.Linq.Expressions.Expression})](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.MethodCallExpression.Update(System.Linq.Expressions.Expression%2CSystem.Collections.Generic.IEnumerable%7BSystem.Linq.Expressions.Expression%7D)) | First parameter type is nullable | Nonbreaking |
| [System.Linq.Expressions.Expression`1.Update(System.Linq.Expressions.Expression,System.Collections.Generic.IEnumerable{System.Linq.Expressions.ParameterExpression})](https://learn.microsoft.com/search/?terms=System.Linq.Expressions.Expression%601.Update(System.Linq.Expressions.Expression%2CSystem.Collections.Generic.IEnumerable%7BSystem.Linq.Expressions.ParameterExpression%7D)) | Return type is not nullable | Nonbreaking |
| [System.Data.IDataRecord.GetBytes(System.Int32,System.Int64,System.Byte\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Data.IDataRecord.GetBytes(System.Int32%2CSystem.Int64%2CSystem.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32)) | `buffer` parameter type is nullable | Breaking |
| [System.Data.IDataRecord.GetChars(System.Int32,System.Int64,System.Char\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Data.IDataRecord.GetChars(System.Int32%2CSystem.Int64%2CSystem.Char%5B%5D%2CSystem.Int32%2CSystem.Int32)) | `buffer` parameter type is nullable | Breaking |
| [System.Data.Common.DbDataRecord.GetBytes(System.Int32,System.Int64,System.Byte\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataRecord.GetBytes(System.Int32%2CSystem.Int64%2CSystem.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32)) | `buffer` parameter type is nullable | Breaking |
| [System.Data.Common.DbDataRecord.GetChars(System.Int32,System.Int64,System.Char\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataRecord.GetChars(System.Int32%2CSystem.Int64%2CSystem.Char%5B%5D%2CSystem.Int32%2CSystem.Int32)) | `buffer` parameter type is nullable | Breaking |
| [System.Net.HttpListenerContext.AcceptWebSocketAsync*](https://learn.microsoft.com/search/?terms=System.Net.HttpListenerContext.AcceptWebSocketAsync*) | `subProtocol` parameter type is nullable | Nonbreaking |
| Methods that override [System.Object.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Object.Equals(System.Object)) and [many others that return `bool`](https://github.com/dotnet/runtime/pull/47598/files) | `[NotNullWhen(true)]` added to first nullable parameter | Breaking |
| [System.Collections.Immutable.ImmutableArray`1.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Collections.Immutable.ImmutableArray%601.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Collections.Specialized.BitVector32.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.BitVector32.Equals(System.Object)) | `NotNullWhen(true)` was added to the `o` parameter | Breaking |
| [System.Collections.Specialized.BitVector32.Section.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.BitVector32.Section.Equals(System.Object)) | `NotNullWhen(true)` was added to the `o` parameter | Breaking |
| [System.Reflection.Metadata.BlobContentId.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.BlobContentId.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.BlobHandle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.BlobHandle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.CustomDebugInformationHandle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.CustomDebugInformationHandle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.DocumentNameBlobHandle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.DocumentNameBlobHandle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.EntityHandle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.EntityHandle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.GuidHandle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.GuidHandle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.Handle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.Handle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.ImportScopeHandle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.ImportScopeHandle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.LocalConstantHandle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.LocalConstantHandle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.NamespaceDefinitionHandle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.NamespaceDefinitionHandle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.SequencePoint.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.SequencePoint.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.SignatureHeader.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.SignatureHeader.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.Ecma335.EditAndContinueLogEntry.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.Ecma335.EditAndContinueLogEntry.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Metadata.Ecma335.LabelHandle.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Metadata.Ecma335.LabelHandle.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Emit.Label.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.Label.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.Reflection.Emit.OpCode.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.OpCode.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |
| [System.DateOnly.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.DateOnly.Equals(System.Object)) | `NotNullWhen(true)` was added to the `value` parameter | Breaking |
| [System.TimeOnly.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.TimeOnly.Equals(System.Object)) | `NotNullWhen(true)` was added to the `value` parameter | Breaking |
| [System.Reflection.Pointer.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.Pointer.Equals(System.Object)) | `NotNullWhen(true)` was added to the `obj` parameter | Breaking |

## See also

- [Attributes for null-state static analysis](../../../../csharp/language-reference/attributes/nullable-analysis.md)
- [Nullable reference type annotation changes in ASP.NET Core](https://learn.microsoft.com/aspnet/core/breaking-changes/6/nullable-reference-type-annotations-changed)
