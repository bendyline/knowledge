---
title: "Breaking change: .NET 10 obsoletions with custom IDs"
titleSuffix: ""
description: Learn about the APIs that have been marked as obsolete in .NET 10 with a custom diagnostic ID.
ms.date: 09/08/2025
ai-usage: ai-assisted
---
# API obsoletions with non-default diagnostic IDs (.NET 10)

Some APIs have been marked as obsolete, starting in .NET 10. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is [CS0618](../../../../csharp/language-reference/compiler-messages/cs0618.md) for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 10 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
| --- | --- | --- |
| [SYSLIB0058](../../../../fundamentals/syslib-diagnostics/syslib0058.md) | The `KeyExchangeAlgorithm`, `KeyExchangeStrength`, `CipherAlgorithm`, `CipherAlgorithmStrength`, `HashAlgorithm`, and `HashStrength` properties of [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) are obsolete. Use [System.Net.Security.SslStream.NegotiatedCipherSuite](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.NegotiatedCipherSuite) instead. | Warning |
| [SYSLIB0059](../../../../fundamentals/syslib-diagnostics/syslib0059.md) | [Microsoft.Win32.SystemEvents.EventsThreadShutdown](https://learn.microsoft.com/search/?terms=Microsoft.Win32.SystemEvents.EventsThreadShutdown) callbacks aren't run before the process exits. Use [System.AppDomain.ProcessExit](https://learn.microsoft.com/search/?terms=System.AppDomain.ProcessExit) instead. | Warning |
| [SYSLIB0060](../../../../fundamentals/syslib-diagnostics/syslib0060.md) | [System.Security.Cryptography.Rfc2898DeriveBytes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes) constructors are obsolete. Use [System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*) instead. | Warning |
| [SYSLIB0061](../../../../fundamentals/syslib-diagnostics/syslib0061.md) | [System.Linq.Queryable.MaxBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MaxBy%60%602(System.Linq.IQueryable%7B%60%600%7D%2CSystem.Linq.Expressions.Expression%7BSystem.Func%7B%60%600%2C%60%601%7D%7D%2CSystem.Collections.Generic.IComparer%7B%60%600%7D)) and [System.Linq.Queryable.MinBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MinBy%60%602(System.Linq.IQueryable%7B%60%600%7D%2CSystem.Linq.Expressions.Expression%7BSystem.Func%7B%60%600%2C%60%601%7D%7D%2CSystem.Collections.Generic.IComparer%7B%60%600%7D)) taking an `IComparer<TSource>` are obsolete. Use the new ones that take an `IComparer<TKey>`. | Warning |
| [SYSLIB0062](../../../../fundamentals/syslib-diagnostics/syslib0062.md) | [System.Xml.Xsl.XsltSettings.EnableScript](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltSettings.EnableScript) is obsolete. | Warning |

## Version introduced

.NET 10

## Type of breaking change

These obsoletions can affect [source compatibility](../../categories.md#source-compatibility).

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0058

- [System.Net.Security.SslStream.KeyExchangeAlgorithm](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.KeyExchangeAlgorithm)
- [System.Net.Security.SslStream.KeyExchangeStrength](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.KeyExchangeStrength)
- [System.Net.Security.SslStream.CipherAlgorithm](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.CipherAlgorithm)
- [System.Net.Security.SslStream.CipherStrength](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.CipherStrength)
- [System.Net.Security.SslStream.HashAlgorithm](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.HashAlgorithm)
- [System.Net.Security.SslStream.HashStrength](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream.HashStrength)
- [System.Security.Authentication.ExchangeAlgorithmType](https://learn.microsoft.com/search/?terms=System.Security.Authentication.ExchangeAlgorithmType)
- [System.Security.Authentication.CipherAlgorithmType](https://learn.microsoft.com/search/?terms=System.Security.Authentication.CipherAlgorithmType)
- [System.Security.Authentication.HashAlgorithmType](https://learn.microsoft.com/search/?terms=System.Security.Authentication.HashAlgorithmType)

### SYSLIB0059

- [Microsoft.Win32.SystemEvents.EventsThreadShutdown](https://learn.microsoft.com/search/?terms=Microsoft.Win32.SystemEvents.EventsThreadShutdown)

### SYSLIB0060

- [System.Security.Cryptography.Rfc2898DeriveBytes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes)
- [System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*)

### SYSLIB0061

- [System.Linq.Queryable.MaxBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MaxBy%60%602(System.Linq.IQueryable%7B%60%600%7D%2CSystem.Linq.Expressions.Expression%7BSystem.Func%7B%60%600%2C%60%601%7D%7D%2CSystem.Collections.Generic.IComparer%7B%60%600%7D))
- [System.Linq.Queryable.MinBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MinBy%60%602(System.Linq.IQueryable%7B%60%600%7D%2CSystem.Linq.Expressions.Expression%7BSystem.Func%7B%60%600%2C%60%601%7D%7D%2CSystem.Collections.Generic.IComparer%7B%60%600%7D))

### SYSLIB0062

- [System.Xml.Xsl.XsltSettings.EnableScript](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltSettings.EnableScript)

## See also

- [API obsoletions with non-default diagnostic IDs (.NET 9)](../9.0/obsolete-apis-with-custom-diagnostics.md)
- [API obsoletions with non-default diagnostic IDs (.NET 8)](../8.0/obsolete-apis-with-custom-diagnostics.md)
- [Obsolete features in .NET 5+](../../../../fundamentals/syslib-diagnostics/obsoletions-overview.md)
