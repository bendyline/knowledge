---
title: "Mitigation: Path Colon Checks"
description: Learn about the changes made in .NET Framework 4.6.2 to support checks for the proper drive separator syntax (the colon).
ms.date: "03/30/2017"
ms.assetid: a0bb52de-d279-419d-8f23-4b12d1a3f36e
---
# Mitigation: Path Colon Checks

Starting with apps that target the .NET Framework 4.6.2, a number of changes were made to support previously unsupported paths (both in terms of length and format). In particular, checks for the proper drive separator syntax (the colon) were made more correct.

## Impact

 These changes block some URI paths the [System.IO.Path.GetDirectoryName*](https://learn.microsoft.com/search/?terms=System.IO.Path.GetDirectoryName*) and [System.IO.Path.GetPathRoot*](https://learn.microsoft.com/search/?terms=System.IO.Path.GetPathRoot*) methods previously supported.

## Mitigation

 To work around the problem of a previously acceptable path that is no longer supported by the [System.IO.Path.GetDirectoryName*](https://learn.microsoft.com/search/?terms=System.IO.Path.GetDirectoryName*) and [System.IO.Path.GetPathRoot*](https://learn.microsoft.com/search/?terms=System.IO.Path.GetPathRoot*) methods, you can do the following:

- Manually remove the scheme from a URL. For example, remove `file://` from a URL.

- Pass the URI to a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) constructor,  and retrieve the value of the [System.Uri.LocalPath](https://learn.microsoft.com/search/?terms=System.Uri.LocalPath) property.

- Opt out of the new path normalization by setting the `Switch.System.IO.UseLegacyPathHandling`[System.AppContext](https://learn.microsoft.com/search/?terms=System.AppContext) switch to `true`.

    ```xml
    <runtime>
        <AppContextSwitchOverrides value="Switch.System.IO.UseLegacyPathHandling=true" />
    </runtime>
    ```

## See also

- [Application compatibility](application-compatibility.md)
