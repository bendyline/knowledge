---
title: "FTP - .NET Framework"
titleSuffix: ""
description: Learn about the comprehensive support for the FTP protocol that .NET Framework provides with the FtpWebRequest and FtpWebResponse classes.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "FTP"
ms.assetid: 9b43f8b4-89d7-46a7-89fc-71aca916dd32
---
# FTP

.NET Framework provides comprehensive support for the FTP protocol with the [System.Net.FtpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.FtpWebRequest) and [System.Net.FtpWebResponse](https://learn.microsoft.com/search/?terms=System.Net.FtpWebResponse) classes. These classes are derived from [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest) and [System.Net.WebResponse](https://learn.microsoft.com/search/?terms=System.Net.WebResponse). In most cases, the [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest) and [System.Net.WebResponse](https://learn.microsoft.com/search/?terms=System.Net.WebResponse) classes provide all that's necessary to make the request, but if you need access to the FTP-specific features exposed as properties, you can typecast these classes to [System.Net.FtpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.FtpWebRequest) or [System.Net.FtpWebResponse](https://learn.microsoft.com/search/?terms=System.Net.FtpWebResponse).

> **Note:**
> This article is specific to projects that target .NET Framework. For projects that target .NET 6 and later versions, [FTP is no longer supported](../../core/compatibility/networking/6.0/webrequest-deprecated.md).

## Examples

For more information, see the following topics: [How to: Download Files with FTP](how-to-download-files-with-ftp.md), [How to: Upload Files with FTP](how-to-upload-files-with-ftp.md), and [How to: List Directory Contents with FTP](how-to-list-directory-contents-with-ftp.md).

## FTP and proxies

If a proxy (specified by the [System.Net.FtpWebRequest.Proxy](https://learn.microsoft.com/search/?terms=System.Net.FtpWebRequest.Proxy) property) is an HTTP proxy, then only the [System.Net.WebRequestMethods.Ftp.DownloadFile](https://learn.microsoft.com/search/?terms=System.Net.WebRequestMethods.Ftp.DownloadFile), [System.Net.WebRequestMethods.Ftp.ListDirectory](https://learn.microsoft.com/search/?terms=System.Net.WebRequestMethods.Ftp.ListDirectory), and [System.Net.WebRequestMethods.Ftp.ListDirectoryDetails](https://learn.microsoft.com/search/?terms=System.Net.WebRequestMethods.Ftp.ListDirectoryDetails) commands are supported.
