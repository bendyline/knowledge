---
title: "Breaking change: WebRequest, WebClient, and ServicePoint are obsolete"
description: Learn about the breaking change in .NET 6 where WebRequest, WebClient, and ServicePoint are deprecated in favor of HttpClient.
ms.date: 04/26/2021
---
# WebRequest, WebClient, and ServicePoint are obsolete

[System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest), [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient), and [System.Net.ServicePoint](https://learn.microsoft.com/search/?terms=System.Net.ServicePoint) classes are marked as obsolete and generate a `SYSLIB0014` warning at compile time.

## Version introduced

6.0

## Change description

[System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest), [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient), and [System.Net.ServicePoint](https://learn.microsoft.com/search/?terms=System.Net.ServicePoint) classes were added to .NET Core in version 2.0 for backward compatibility. However, they introduced several runtime breaking changes, for example, `WebRequest.GetRequestStream` allocates memory for the whole response, and `WebClient.CancelAsync` doesn't always cancel immediately.

Starting in .NET 6, the [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest), [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient), and [System.Net.ServicePoint](https://learn.microsoft.com/search/?terms=System.Net.ServicePoint) classes are deprecated. The classes are still available, but they're not recommended for new development. To reduce the number of analyzer warnings, only construction methods are decorated with the [System.ObsoleteAttribute](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute) attribute.

## Recommended action

Use the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) class instead.

For FTP, since [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) doesn't support it, we recommend using a third-party library.

## Affected APIs

- [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest)
- [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest)
- [System.Net.FtpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.FtpWebRequest)
- [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient)
- [System.Net.ServicePoint](https://learn.microsoft.com/search/?terms=System.Net.ServicePoint)

## See also

- [HttpWebRequest to HttpClient migration guide](../../../../fundamentals/networking/http/httpclient-migrate-from-httpwebrequest.md)
