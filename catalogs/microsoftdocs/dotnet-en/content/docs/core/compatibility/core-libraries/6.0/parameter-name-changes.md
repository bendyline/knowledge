---
title: "Breaking change: Parameter names changed in .NET 6"
description: Learn about the .NET 6 breaking change in core .NET libraries where some parameter names have changed to be consistent between reference and implementation assemblies.
ms.date: 10/15/2021
---
# Parameter names changed in .NET 6

Some parameter names have changed to be consistent between [reference](../../../../standard/assembly/reference-assemblies.md) and implementation assemblies. Most of the changes are in the reference assemblies, but a handful are in the implementation assemblies.

## Previous behavior

Some [reference assembly](../../../../standard/assembly/reference-assemblies.md) parameter names were different to their corresponding parameters in the implementation assembly. This can cause problems while using named arguments and reflection.

## New behavior

In .NET 6, these mismatched parameter names were updated to be consistent across the reference and implementation assemblies.

The following table shows the APIs and parameter names that changed. In addition, some parameter names on [`Stream`-derived types](parameters-renamed-on-stream-derived-types.md) were changed.

| API | Old parameter name | New parameter name | Where changed |
| - | - | - |
| [System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Type)) | `type` | `attributeType` | Reference and implementation assembly |
| [System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Type%2CSystem.Boolean)) | `type` | `attributeType` | Reference and implementation assembly |
| [Microsoft.VisualBasic.Strings.InStr(System.Int32,System.String,System.String,Microsoft.VisualBasic.CompareMethod)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings.InStr(System.Int32%2CSystem.String%2CSystem.String%2CMicrosoft.VisualBasic.CompareMethod)) | `StartPos` | `Start` | Reference assembly |
| [System.Collections.Generic.SortedList`2.System%23Collections%23ICollection%23CopyTo(System.Array,System.Int32)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602.System%2523Collections%2523ICollection%2523CopyTo(System.Array%2CSystem.Int32)) | `arrayIndex` | `index` | Reference assembly |
| [System.Numerics.Vector.Narrow*](https://learn.microsoft.com/search/?terms=System.Numerics.Vector.Narrow*) | `source1`, `source2` | `low`, `high` | Reference assembly |
| [System.Numerics.Vector.Widen*](https://learn.microsoft.com/search/?terms=System.Numerics.Vector.Widen*) | `dest1`, `dest2` | `low`, `high` | Reference assembly |
| [System.IO.StreamWriter.WriteLine(System.ReadOnlySpan{System.Char})](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.WriteLine(System.ReadOnlySpan%7BSystem.Char%7D)) | `value` | `buffer` | Implementation assembly |
| [System.IO.FileStream.BeginRead(System.Byte\[\],System.Int32,System.Int32,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.BeginRead(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.AsyncCallback%2CSystem.Object)) | `array`, `numBytes` | `buffer`, `count` | Implementation assembly |
| [System.IO.FileStream.BeginWrite(System.Byte\[\],System.Int32,System.Int32,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.BeginWrite(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.AsyncCallback%2CSystem.Object)) | `array`, `numBytes` | `buffer`, `count` | Implementation assembly |
| [System.IO.MemoryStream.Read(System.Span{System.Byte})](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream.Read(System.Span%7BSystem.Byte%7D)) | `destination` | `buffer` | Reference assembly |
| [System.IO.MemoryStream.ReadAsync(System.Memory{System.Byte},System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream.ReadAsync(System.Memory%7BSystem.Byte%7D%2CSystem.Threading.CancellationToken)) | `destination` | `buffer` | Reference assembly |
| [System.IO.MemoryStream.Write(System.ReadOnlySpan{System.Byte})](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream.Write(System.ReadOnlySpan%7BSystem.Byte%7D)) | `source` | `buffer` | Reference assembly |
| [System.IO.MemoryStream.WriteAsync(System.ReadOnlyMemory{System.Byte},System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream.WriteAsync(System.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.Threading.CancellationToken)) | `source` | `buffer` | Reference assembly |
| [System.IO.UnmanagedMemoryStream.Read(System.Span{System.Byte})](https://learn.microsoft.com/search/?terms=System.IO.UnmanagedMemoryStream.Read(System.Span%7BSystem.Byte%7D)) | `destination` | `buffer` | Reference assembly |
| [System.IO.UnmanagedMemoryStream.Write(System.ReadOnlySpan{System.Byte})](https://learn.microsoft.com/search/?terms=System.IO.UnmanagedMemoryStream.Write(System.ReadOnlySpan%7BSystem.Byte%7D)) | `source` | `buffer` | Reference assembly |
| [System.Security.Cryptography.Pkcs.SignerInfo.AddUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignerInfo.AddUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)) | `asnEncodedData` | `unsignedAttribute` | Reference assembly |
| [System.Security.Cryptography.Pkcs.SignerInfo.RemoveUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignerInfo.RemoveUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)) | `asnEncodedData` | `unsignedAttribute` | Reference assembly |
| [System.Security.Cryptography.Pkcs.Rfc3161TimestampRequest.ProcessResponse(System.ReadOnlyMemory{System.Byte},System.Int32@)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.Rfc3161TimestampRequest.ProcessResponse(System.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.Int32%40)) | `source` | `responseBytes` | Implementation assembly |
| [System.Security.Cryptography.Pkcs.Rfc3161TimestampToken.TryDecode(System.ReadOnlyMemory{System.Byte},System.Security.Cryptography.Pkcs.Rfc3161TimestampToken@,System.Int32@)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.Rfc3161TimestampToken.TryDecode(System.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.Security.Cryptography.Pkcs.Rfc3161TimestampToken%40%2CSystem.Int32%40)) | `source` | `encodedBytes` | Implementation assembly |
| [System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.%23ctor(System.Security.Cryptography.Oid,System.Security.Cryptography.Oid,System.ReadOnlyMemory{System.Byte},System.ReadOnlyMemory{System.Byte},System.DateTimeOffset,System.Nullable{System.Int64},System.Boolean,System.Nullable{System.ReadOnlyMemory{System.Byte}},System.Nullable{System.ReadOnlyMemory{System.Byte}},System.Security.Cryptography.X509Certificates.X509ExtensionCollection)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.%2523ctor(System.Security.Cryptography.Oid%2CSystem.Security.Cryptography.Oid%2CSystem.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.DateTimeOffset%2CSystem.Nullable%7BSystem.Int64%7D%2CSystem.Boolean%2CSystem.Nullable%7BSystem.ReadOnlyMemory%7BSystem.Byte%7D%7D%2CSystem.Nullable%7BSystem.ReadOnlyMemory%7BSystem.Byte%7D%7D%2CSystem.Security.Cryptography.X509Certificates.X509ExtensionCollection)) | `tsaName` | `timestampAuthorityName` | Implementation assembly |
| [System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.TryDecode(System.ReadOnlyMemory{System.Byte},System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo@,System.Int32@)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.TryDecode(System.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo%40%2CSystem.Int32%40)) | `` | `` |
| [System.Security.Permissions.PrincipalPermission.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission.Equals(System.Object)) | `o` | `obj` | Reference assembly |
| [System.Security.Policy.UrlMembershipCondition.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Security.Policy.UrlMembershipCondition.Equals(System.Object)) | `o` | `obj` | Reference assembly |
| [System.Data.Common.DBDataPermission.%23ctor(System.Data.Common.DBDataPermission)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.%2523ctor(System.Data.Common.DBDataPermission)) | `dataPermission` | `permission` | Implementation assembly |
| [System.Data.Common.DBDataPermission.%23ctor(System.Data.Common.DBDataPermissionAttribute)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.%2523ctor(System.Data.Common.DBDataPermissionAttribute)) | `attribute` | `permissionAttribute` | Implementation assembly |
| [System.Data.Common.DBDataPermission.%23ctor(System.Security.Permissions.PermissionState,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.%2523ctor(System.Security.Permissions.PermissionState%2CSystem.Boolean)) | `blankPassword` | `allowBlankPassword` | Implementation assembly |
| [System.Data.Common.DBDataPermission.FromXml(System.Security.SecurityElement)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.FromXml(System.Security.SecurityElement)) | `elem` | `securityElement` | Implementation assembly |
| [System.Data.Common.DBDataPermission.Union(System.Security.IPermission)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.Union(System.Security.IPermission)) | `other` | `target` | Implementation assembly |

## Reason for change

- In cases where the reference assembly parameter names were changed, the new names were deemed more appropriate or readable and minimally breaking.
- In cases where the names of runtime parameters were changed to gain consistency across platforms or with reference assemblies, the runtime implementation now matches the public API and documentation for the method.

## Version introduced

.NET 6

## Recommended action

If you encounter a compiler error due to a parameter name change, update the parameter name accordingly.

If you use runtime reflection to inspect methods and took a dependency on the parameter names, update the code to use the new parameter names.

## Affected APIs

- [Microsoft.VisualBasic.Strings.InStr(System.Int32,System.String,System.String,Microsoft.VisualBasic.CompareMethod)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings.InStr(System.Int32%2CSystem.String%2CSystem.String%2CMicrosoft.VisualBasic.CompareMethod))
- [System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Type))
- [System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Type%2CSystem.Boolean))
- [System.Collections.Generic.SortedList`2.System%23Collections%23ICollection%23CopyTo(System.Array,System.Int32)](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602.System%2523Collections%2523ICollection%2523CopyTo(System.Array%2CSystem.Int32))
- [System.IO.StreamWriter.WriteLine(System.ReadOnlySpan{System.Char})](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.WriteLine(System.ReadOnlySpan%7BSystem.Char%7D))
- [System.IO.FileStream.BeginRead(System.Byte\[\],System.Int32,System.Int32,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.BeginRead(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.AsyncCallback%2CSystem.Object))
- [System.IO.FileStream.BeginWrite(System.Byte\[\],System.Int32,System.Int32,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.BeginWrite(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.AsyncCallback%2CSystem.Object))
- [System.IO.MemoryStream.Read(System.Span{System.Byte})](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream.Read(System.Span%7BSystem.Byte%7D))
- [System.IO.MemoryStream.ReadAsync(System.Memory{System.Byte},System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream.ReadAsync(System.Memory%7BSystem.Byte%7D%2CSystem.Threading.CancellationToken))
- [System.IO.MemoryStream.Write(System.ReadOnlySpan{System.Byte})](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream.Write(System.ReadOnlySpan%7BSystem.Byte%7D))
- [System.IO.MemoryStream.WriteAsync(System.ReadOnlyMemory{System.Byte},System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream.WriteAsync(System.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.Threading.CancellationToken))
- [System.IO.UnmanagedMemoryStream.Read(System.Span{System.Byte})](https://learn.microsoft.com/search/?terms=System.IO.UnmanagedMemoryStream.Read(System.Span%7BSystem.Byte%7D))
- [System.IO.UnmanagedMemoryStream.Write(System.ReadOnlySpan{System.Byte})](https://learn.microsoft.com/search/?terms=System.IO.UnmanagedMemoryStream.Write(System.ReadOnlySpan%7BSystem.Byte%7D))
- [System.Numerics.Vector.Narrow*](https://learn.microsoft.com/search/?terms=System.Numerics.Vector.Narrow*)
- [System.Numerics.Vector.Widen*](https://learn.microsoft.com/search/?terms=System.Numerics.Vector.Widen*)
- [System.Security.Cryptography.Pkcs.Rfc3161TimestampRequest.ProcessResponse(System.ReadOnlyMemory{System.Byte},System.Int32@)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.Rfc3161TimestampRequest.ProcessResponse(System.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.Int32%40))
- [System.Security.Cryptography.Pkcs.Rfc3161TimestampToken.TryDecode(System.ReadOnlyMemory{System.Byte},System.Security.Cryptography.Pkcs.Rfc3161TimestampToken@,System.Int32@)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.Rfc3161TimestampToken.TryDecode(System.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.Security.Cryptography.Pkcs.Rfc3161TimestampToken%40%2CSystem.Int32%40))
- [System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.%23ctor(System.Security.Cryptography.Oid,System.Security.Cryptography.Oid,System.ReadOnlyMemory{System.Byte},System.ReadOnlyMemory{System.Byte},System.DateTimeOffset,System.Nullable{System.Int64},System.Boolean,System.Nullable{System.ReadOnlyMemory{System.Byte}},System.Nullable{System.ReadOnlyMemory{System.Byte}},System.Security.Cryptography.X509Certificates.X509ExtensionCollection)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.%2523ctor(System.Security.Cryptography.Oid%2CSystem.Security.Cryptography.Oid%2CSystem.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.DateTimeOffset%2CSystem.Nullable%7BSystem.Int64%7D%2CSystem.Boolean%2CSystem.Nullable%7BSystem.ReadOnlyMemory%7BSystem.Byte%7D%7D%2CSystem.Nullable%7BSystem.ReadOnlyMemory%7BSystem.Byte%7D%7D%2CSystem.Security.Cryptography.X509Certificates.X509ExtensionCollection))
- [System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.TryDecode(System.ReadOnlyMemory{System.Byte},System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo@,System.Int32@)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.TryDecode(System.ReadOnlyMemory%7BSystem.Byte%7D%2CSystem.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo%40%2CSystem.Int32%40))
- [System.Security.Cryptography.Pkcs.SignerInfo.AddUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignerInfo.AddUnsignedAttribute(System.Security.Cryptography.AsnEncodedData))
- [System.Security.Cryptography.Pkcs.SignerInfo.RemoveUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignerInfo.RemoveUnsignedAttribute(System.Security.Cryptography.AsnEncodedData))
- [System.Security.Permissions.PrincipalPermission.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission.Equals(System.Object))
- [System.Security.Policy.UrlMembershipCondition.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Security.Policy.UrlMembershipCondition.Equals(System.Object))
- [System.Data.Common.DBDataPermission.%23ctor(System.Data.Common.DBDataPermission)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.%2523ctor(System.Data.Common.DBDataPermission))
- [System.Data.Common.DBDataPermission.%23ctor(System.Data.Common.DBDataPermissionAttribute)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.%2523ctor(System.Data.Common.DBDataPermissionAttribute))
- [System.Data.Common.DBDataPermission.%23ctor(System.Security.Permissions.PermissionState,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.%2523ctor(System.Security.Permissions.PermissionState%2CSystem.Boolean))
- [System.Data.Common.DBDataPermission.FromXml(System.Security.SecurityElement)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.FromXml(System.Security.SecurityElement))
- [System.Data.Common.DBDataPermission.Union(System.Security.IPermission)](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission.Union(System.Security.IPermission))

## See also

- [Some parameters in Stream-derived types are renamed](parameters-renamed-on-stream-derived-types.md)
