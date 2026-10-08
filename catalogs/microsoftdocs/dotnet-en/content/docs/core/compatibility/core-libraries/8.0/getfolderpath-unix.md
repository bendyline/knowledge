---
title: ".NET 8 breaking change: GetFolderPath behavior on Unix"
description: Learn about the .NET 8 breaking change in core .NET libraries where the behavior of Environment.GetFolderPath has changed on Unix.
ms.date: 11/18/2022
---
# GetFolderPath behavior on Unix

Starting in .NET 8, the behavior of [System.Environment.GetFolderPath*](https://learn.microsoft.com/search/?terms=System.Environment.GetFolderPath*) on Unix operating systems has changed.

## Change description

The following tables show how the returned path value changes for each Unix operating system for various special folders.

### Linux

| SpecialFolder value | Path (.NET 7 and earlier) | Path (.NET 8 and later) |
| --- | --- | --- |
| `MyDocuments` | `$HOME` | Uses `XDG_DOCUMENTS_DIR` if available; otherwise `$HOME/Documents` |
| `Personal` | `$HOME` | Uses `XDG_DOCUMENTS_DIR` if available; otherwise `$HOME/Documents` |

### macOS

| SpecialFolder value | Path (.NET 7 and earlier) | Path (.NET 8 and later) |
| --- | --- | --- |
| `MyDocuments` | `$HOME` | [NSDocumentDirectory](https://developer.apple.com/documentation/foundation/nssearchpathdirectory/nsdocumentdirectory) (`$HOME/Documents`) |
| `Personal` | `$HOME` | [NSDocumentDirectory](https://developer.apple.com/documentation/foundation/nssearchpathdirectory/nsdocumentdirectory) (`$HOME/Documents`) |
| `ApplicationData` | `$HOME/.config` | [NSApplicationSupportDirectory](https://developer.apple.com/documentation/foundation/nssearchpathdirectory/nsapplicationsupportdirectory) (Library/Application Support) |
| `LocalApplicationData` | `$HOME/.local/share` | [NSApplicationSupportDirectory](https://developer.apple.com/documentation/foundation/nssearchpathdirectory/nsapplicationsupportdirectory) (Library/Application Support) |
| `MyVideos` | `$HOME/Videos` | [NSMoviesDirectory](https://developer.apple.com/documentation/foundation/nssearchpathdirectory/nsmoviesdirectory) (`$HOME/Movies`) |

### Android

| SpecialFolder value | Path (.NET 7 and earlier) | Path (.NET 8 and later) |
| --- | --- | --- |
| `MyDocuments` | `$HOME` | `$HOME/Documents` |
| `Personal` | `$HOME` | `$HOME/Documents` |

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The previous behavior was incorrect and didn't meet user expectations for Linux, macOS, and Android.

## Recommended action

The most common break is if you're passing [System.Environment.SpecialFolder.Personal](https://learn.microsoft.com/search/?terms=System.Environment.SpecialFolder.Personal) to [System.Environment.GetFolderPath(System.Environment.SpecialFolder)](https://learn.microsoft.com/search/?terms=System.Environment.GetFolderPath(System.Environment.SpecialFolder)) on Unix to get the `$HOME` directory (`Environment.GetFolderPath(Environment.SpecialFolder.Personal)`). [System.Environment.SpecialFolder.Personal](https://learn.microsoft.com/search/?terms=System.Environment.SpecialFolder.Personal) and [System.Environment.SpecialFolder.MyDocuments](https://learn.microsoft.com/search/?terms=System.Environment.SpecialFolder.MyDocuments) are aliases for the same underlying enumeration value. If you're using [System.Environment.SpecialFolder.Personal](https://learn.microsoft.com/search/?terms=System.Environment.SpecialFolder.Personal) in this way, change your code to pass [System.Environment.SpecialFolder.UserProfile](https://learn.microsoft.com/search/?terms=System.Environment.SpecialFolder.UserProfile) instead (`Environment.GetFolderPath(Environment.SpecialFolder.UserProfile)`).

For other breaks, the recommended action is to do one of the following:

- Migrate your application's files to the appropriate directory.
- Add a fallback check for the previous location to your code.

## Affected APIs

- [System.Environment.GetFolderPath(System.Environment.SpecialFolder)](https://learn.microsoft.com/search/?terms=System.Environment.GetFolderPath(System.Environment.SpecialFolder))
- [System.Environment.GetFolderPath(System.Environment.SpecialFolder,System.Environment.SpecialFolderOption)](https://learn.microsoft.com/search/?terms=System.Environment.GetFolderPath(System.Environment.SpecialFolder%2CSystem.Environment.SpecialFolderOption))
