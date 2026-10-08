---
title: W3CLogger in .NET and ASP.NET Core
author: wtgodbe
description: Learn how to create server logs in the W3C standard format.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 08/15/2022
ms.reviewer: wigodbe
uid: fundamentals/w3c-logger/index
---

# W3CLogger in ASP.NET Core

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


**Applies to: \= aspnetcore-6.0**

W3CLogger is a middleware that writes log files in the [W3C standard format](https://www.w3.org/TR/WD-logfile.html). The logs contain information about HTTP requests and HTTP responses. W3CLogger provides logs of:

* HTTP request information
* Common properties
* Headers
* HTTP response information
* Metadata about the request/response pair (date/time started, time taken)

W3CLogger is valuable in several scenarios to:

* Record information about incoming requests and responses.
* Filter which parts of the request and response are logged.
* Filter which headers to log.

W3CLogger ***can reduce the performance of an app***. Consider the performance impact when selecting fields to log - the performance reduction will increase as you log more properties. Test the performance impact of the selected logging properties.

> **Warning:**
> W3CLogger can potentially log personally identifiable information (PII). Consider the risk and avoid logging sensitive information. By default, fields that could contain PII aren't logged.

## Enable W3CLogger

Enable W3CLogger with [Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseW3CLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseW3CLogging%252A), which adds the W3CLogger middleware:

[language="csharp" source="samples/6.x/Program.cs" id="snippet_UseW3CLogging" highlight="3"::: (complete source file; reference: samples/6.x/Program.cs)](../../../_code/aspnetcore/fundamentals/w3c-logger/samples/6.x/Program.cs.md)

By default, W3CLogger logs common properties such as path, status-code, date, time, and protocol. All information about a single request/response pair is written to the same line.

```
#Version: 1.0
#Start-Date: 2021-09-29 22:18:28
#Fields: date time c-ip s-computername s-ip s-port cs-method cs-uri-stem cs-uri-query sc-status time-taken cs-version cs-host cs(User-Agent) cs(Referer)
2021-09-29 22:18:28 ::1 DESKTOP-LH3TLTA ::1 5000 GET / - 200 59.9171 HTTP/1.1 localhost:5000 Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/93.0.4577.82+Safari/537.36 -
2021-09-29 22:18:28 ::1 DESKTOP-LH3TLTA ::1 5000 GET / - 200 0.1802 HTTP/1.1 localhost:5000 Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/93.0.4577.82+Safari/537.36 -
2021-09-29 22:18:30 ::1 DESKTOP-LH3TLTA ::1 5000 GET / - 200 0.0966 HTTP/1.1 localhost:5000 Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/93.0.4577.82+Safari/537.36 -
```

## W3CLogger options

To configure the W3CLogger middleware, call [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddW3CLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddW3CLogging%252A) in `Program.cs`:

[language="csharp" source="samples/6.x/Program.cs" id="snippet_AddW3CLogging" highlight="3"::: (complete source file; reference: samples/6.x/Program.cs)](../../../_code/aspnetcore/fundamentals/w3c-logger/samples/6.x/Program.cs.md)

### `LoggingFields`

[Microsoft.AspNetCore.HttpLogging.W3CLoggerOptions.LoggingFields%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.W3CLoggerOptions.LoggingFields%252A) is a bit flag enumeration that configures specific parts of the request and response to log, and other information about the connection. `LoggingFields` defaults to include all possible fields except `UserName` and `Cookie`. For a complete list of available fields, see [Microsoft.AspNetCore.HttpLogging.W3CLoggingFields](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.W3CLoggingFields).



**Applies to: \>= aspnetcore-7.0**

W3CLogger is a middleware that writes log files in the [W3C standard format](https://www.w3.org/TR/WD-logfile.html). The logs contain information about HTTP requests and HTTP responses. W3CLogger provides logs of:

* HTTP request information
* Common properties
* Headers
* HTTP response information
* Metadata about the request/response pair (date/time started, time taken)

W3CLogger is valuable in several scenarios to:

* Record information about incoming requests and responses.
* Filter which parts of the request and response are logged.
* Filter which headers to log.

W3CLogger ***can reduce the performance of an app***. Consider the performance impact when selecting fields to log - the performance reduction will increase as you log more properties. Test the performance impact of the selected logging properties.

> **Warning:**
> W3CLogger can potentially log personally identifiable information (PII). Consider the risk and avoid logging sensitive information. By default, fields that could contain PII aren't logged.

## Enable W3CLogger

Enable W3CLogger with [Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseW3CLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseW3CLogging%252A), which adds the W3CLogger middleware:

[language="csharp" source="samples/6.x/Program.cs" id="snippet_UseW3CLogging" highlight="3"::: (complete source file; reference: samples/6.x/Program.cs)](../../../_code/aspnetcore/fundamentals/w3c-logger/samples/6.x/Program.cs.md)

By default, W3CLogger logs common properties such as path, status-code, date, time, and protocol. All information about a single request/response pair is written to the same line.

```
#Version: 1.0
#Start-Date: 2021-09-29 22:18:28
#Fields: date time c-ip s-computername s-ip s-port cs-method cs-uri-stem cs-uri-query sc-status time-taken cs-version cs-host cs(User-Agent) cs(Referer)
2021-09-29 22:18:28 ::1 DESKTOP-LH3TLTA ::1 5000 GET / - 200 59.9171 HTTP/1.1 localhost:5000 Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/93.0.4577.82+Safari/537.36 -
2021-09-29 22:18:28 ::1 DESKTOP-LH3TLTA ::1 5000 GET / - 200 0.1802 HTTP/1.1 localhost:5000 Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/93.0.4577.82+Safari/537.36 -
2021-09-29 22:18:30 ::1 DESKTOP-LH3TLTA ::1 5000 GET / - 200 0.0966 HTTP/1.1 localhost:5000 Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/93.0.4577.82+Safari/537.36 -
```

## W3CLogger options

To configure the W3CLogger middleware, call [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddW3CLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddW3CLogging%252A) in `Program.cs`:

[language="csharp" source="samples/7.x/Program.cs" id="snippet_AddW3CLogging" highlight="3"::: (complete source file; reference: samples/7.x/Program.cs)](../../../_code/aspnetcore/fundamentals/w3c-logger/samples/7.x/Program.cs.md)

### `LoggingFields`

[Microsoft.AspNetCore.HttpLogging.W3CLoggerOptions.LoggingFields%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.W3CLoggerOptions.LoggingFields%252A) is a bit flag enumeration that configures specific parts of the request and response to log, and other information about the connection. `LoggingFields` defaults to include all possible fields except `UserName` and `Cookie`. For a complete list of available fields, see [Microsoft.AspNetCore.HttpLogging.W3CLoggingFields](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.HttpLogging.W3CLoggingFields).
