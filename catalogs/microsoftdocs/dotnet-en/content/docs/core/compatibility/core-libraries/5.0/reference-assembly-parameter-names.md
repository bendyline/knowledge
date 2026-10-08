---
title: "Breaking change: Parameter names changed in reference assemblies"
description: Learn about the .NET 5 breaking change in core .NET libraries where some reference assembly parameter names have changed to match parameter names in the implementation assemblies.
ms.date: 11/01/2020
---
# Parameter names changed in reference assemblies

Some reference assembly parameter names have changed to match parameter names in the implementation assemblies.

## Change description

In previous .NET versions, some [reference assembly](../../../../standard/assembly/reference-assemblies.md) parameter names are different to their corresponding parameters in the implementation assembly. This can cause problems while using named arguments and reflection.

In .NET 5, these mismatched parameter names were updated in the reference assemblies to exactly match the corresponding parameter names in the implementation assemblies.

The following table shows the APIs and parameter names that changed.

| API | Old parameter name | New parameter name |
| --- | --- | --- |
| [System.CodeDom.Compiler.CodeGenerator.GenerateStatements(System.CodeDom.CodeStatementCollection)](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeGenerator.GenerateStatements(System.CodeDom.CodeStatementCollection)) | `stms` | `stmts` |
| [System.Drawing.Icon.System%23Runtime%23Serialization%23ISerializable%23GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Drawing.Icon.System%2523Runtime%2523Serialization%2523ISerializable%2523GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | `info` | `si` |
| [System.Drawing.Image.System%23Runtime%23Serialization%23ISerializable%23GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Drawing.Image.System%2523Runtime%2523Serialization%2523ISerializable%2523GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | `info` | `si` |
| [System.Net.IPAddress.Parse(System.ReadOnlySpan{System.Char})](https://learn.microsoft.com/search/?terms=System.Net.IPAddress.Parse(System.ReadOnlySpan%7BSystem.Char%7D)) | `ipString` | `ipSpan` |
| [System.Net.IPAddress.TryParse(System.ReadOnlySpan{System.Char},System.Net.IPAddress@)](https://learn.microsoft.com/search/?terms=System.Net.IPAddress.TryParse(System.ReadOnlySpan%7BSystem.Char%7D%2CSystem.Net.IPAddress%40)) | `ipString` | `ipSpan` |
| [System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginRead(System.Byte\[\],System.Int32,System.Int32,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginRead(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.AsyncCallback%2CSystem.Object)) | `buffer` | `array` |
| [System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginWrite(System.Byte\[\],System.Int32,System.Int32,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginWrite(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.AsyncCallback%2CSystem.Object)) | `buffer` | `array` |
| [System.Net.NetworkCredential.GetCredential(System.String,System.Int32,System.String)](https://learn.microsoft.com/search/?terms=System.Net.NetworkCredential.GetCredential(System.String%2CSystem.Int32%2CSystem.String)) | `authType` | `authenticationType` |
| [System.ComponentModel.ParenthesizePropertyNameAttribute.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.ComponentModel.ParenthesizePropertyNameAttribute.Equals(System.Object)) | `o` | `obj` |
| [System.ComponentModel.RefreshPropertiesAttribute.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.ComponentModel.RefreshPropertiesAttribute.Equals(System.Object)) | `value` | `obj` |
| [System.Diagnostics.StackFrame.%23ctor(System.Boolean)](https://learn.microsoft.com/search/?terms=System.Diagnostics.StackFrame.%2523ctor(System.Boolean)) | `fNeedFileInfo` | `needFileInfo` |
| [System.Diagnostics.StackFrame.%23ctor(System.Int32,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Diagnostics.StackFrame.%2523ctor(System.Int32%2CSystem.Boolean)) | `fNeedFileInfo` | `needFileInfo` |
| [System.StringNormalizationExtensions.IsNormalized(System.String,System.Text.NormalizationForm)](https://learn.microsoft.com/search/?terms=System.StringNormalizationExtensions.IsNormalized(System.String%2CSystem.Text.NormalizationForm)) | `value` | `strInput` |
| [System.StringNormalizationExtensions.IsNormalized(System.String)](https://learn.microsoft.com/search/?terms=System.StringNormalizationExtensions.IsNormalized(System.String)) | `value` | `strInput` |
| [System.StringNormalizationExtensions.Normalize(System.String,System.Text.NormalizationForm)](https://learn.microsoft.com/search/?terms=System.StringNormalizationExtensions.Normalize(System.String%2CSystem.Text.NormalizationForm)) | `value` | `strInput` |
| [System.StringNormalizationExtensions.Normalize(System.String)](https://learn.microsoft.com/search/?terms=System.StringNormalizationExtensions.Normalize(System.String)) | `value` | `strInput` |

## Reason for change

The parameter names were changed for consistency and to avoid failures when using named arguments and reflection.

## Version introduced

5.0

## Recommended action

If you encounter a compiler error due to a parameter name change, update the parameter name accordingly.

## Affected APIs

- [System.CodeDom.Compiler.CodeGenerator.GenerateStatements(System.CodeDom.CodeStatementCollection)](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeGenerator.GenerateStatements(System.CodeDom.CodeStatementCollection))
- [System.ComponentModel.ParenthesizePropertyNameAttribute.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.ComponentModel.ParenthesizePropertyNameAttribute.Equals(System.Object))
- [System.ComponentModel.RefreshPropertiesAttribute.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.ComponentModel.RefreshPropertiesAttribute.Equals(System.Object))
- [System.Diagnostics.StackFrame.%23ctor(System.Boolean)](https://learn.microsoft.com/search/?terms=System.Diagnostics.StackFrame.%2523ctor(System.Boolean))
- [System.Diagnostics.StackFrame.%23ctor(System.Int32,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Diagnostics.StackFrame.%2523ctor(System.Int32%2CSystem.Boolean))
- [System.Drawing.Icon.System%23Runtime%23Serialization%23ISerializable%23GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Drawing.Icon.System%2523Runtime%2523Serialization%2523ISerializable%2523GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.Drawing.Image.System%23Runtime%23Serialization%23ISerializable%23GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Drawing.Image.System%2523Runtime%2523Serialization%2523ISerializable%2523GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext))
- [System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginRead(System.Byte\[\],System.Int32,System.Int32,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginRead(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.AsyncCallback%2CSystem.Object))
- [System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginWrite(System.Byte\[\],System.Int32,System.Int32,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginWrite(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.AsyncCallback%2CSystem.Object))
- [System.Net.IPAddress.Parse(System.ReadOnlySpan{System.Char})](https://learn.microsoft.com/search/?terms=System.Net.IPAddress.Parse(System.ReadOnlySpan%7BSystem.Char%7D))
- [System.Net.IPAddress.TryParse(System.ReadOnlySpan{System.Char},System.Net.IPAddress@)](https://learn.microsoft.com/search/?terms=System.Net.IPAddress.TryParse(System.ReadOnlySpan%7BSystem.Char%7D%2CSystem.Net.IPAddress%40))
- [System.Net.NetworkCredential.GetCredential(System.String,System.Int32,System.String)](https://learn.microsoft.com/search/?terms=System.Net.NetworkCredential.GetCredential(System.String%2CSystem.Int32%2CSystem.String))
- [System.StringNormalizationExtensions.IsNormalized(System.String,System.Text.NormalizationForm)](https://learn.microsoft.com/search/?terms=System.StringNormalizationExtensions.IsNormalized(System.String%2CSystem.Text.NormalizationForm))
- [System.StringNormalizationExtensions.IsNormalized(System.String)](https://learn.microsoft.com/search/?terms=System.StringNormalizationExtensions.IsNormalized(System.String))
- [System.StringNormalizationExtensions.Normalize(System.String,System.Text.NormalizationForm)](https://learn.microsoft.com/search/?terms=System.StringNormalizationExtensions.Normalize(System.String%2CSystem.Text.NormalizationForm))
- [System.StringNormalizationExtensions.Normalize(System.String)](https://learn.microsoft.com/search/?terms=System.StringNormalizationExtensions.Normalize(System.String))

<!--

#### Category

Core .NET libraries

### Affected APIs

- `M:System.CodeDom.Compiler.CodeGenerator.GenerateStatements(System.CodeDom.CodeStatementCollection)`
- `M:System.Diagnostics.StackFrame.#ctor(System.Boolean)`
- `M:System.Diagnostics.StackFrame.#ctor(System.Int32,System.Boolean)`
- `M:System.Net.NetworkCredential.GetCredential(System.String,System.Int32,System.String)`
- `M:System.Net.IPAddress.Parse(System.ReadOnlySpan{System.Char})`
- `M:System.Net.IPAddress.TryParse(System.ReadOnlySpan{System.Char},System.Net.IPAddress@)`
- `M:System.StringNormalizationExtensions.IsNormalized(System.String,System.Text.NormalizationForm)`
- `M:System.StringNormalizationExtensions.IsNormalized(System.String)`
- `M:System.StringNormalizationExtensions.Normalize(System.String,System.Text.NormalizationForm)`
- `M:System.StringNormalizationExtensions.Normalize(System.String)`
- `M:System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginRead(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)`
- `M:System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginWrite(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)`
- `M:System.ComponentModel.ParenthesizePropertyNameAttribute.Equals(System.Object)`
- `M:System.ComponentModel.RefreshPropertiesAttribute.Equals(System.Object)`
- `M:System.Drawing.Icon.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `M:System.Drawing.Image.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`

-->
