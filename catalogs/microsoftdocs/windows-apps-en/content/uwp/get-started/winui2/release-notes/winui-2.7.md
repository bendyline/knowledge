---
title: WinUI 2.7 Release Notes
description: Release notes for WinUI 2.7, including new features and bug fixes.
ms.date: 09/13/2021
ms.topic: release-notes
---

# WinUI 2.7

WinUI 2.7 is the September 2021 release of WinUI for UWP applications (and desktop applications using [XAML Islands](https://learn.microsoft.com/windows/apps/desktop/modernize/xaml-islands/xaml-islands)).

> **Note:**
> For more information on building Windows desktop and UWP apps with the latest version of **WinUI 3**, see [WinUI 3](https://learn.microsoft.com/windows/apps/winui/winui3/).

WinUI is hosted on [GitHub](https://github.com/microsoft/microsoft-ui-xaml) where we encourage you to file bug reports.

All stable releases (and prereleases) are available for download from our [GitHub release page](https://github.com/microsoft/microsoft-ui-xaml/tags) or from our [NuGet page](https://www.nuget.org/packages/Microsoft.UI.Xaml).

WinUI packages can be added to Visual Studio projects through the NuGet package manager. For more information, see [Get started with WinUI 2 for UWP](../getting-started.md).

New or updated features for WinUI 2.7 include:

## InfoBadge

Badging is a non-intrusive and intuitive way to indicate notifications, display alerts, highlight new content, or draw focus to an area within an app. An [InfoBadge](https://learn.microsoft.com/uwp/api/microsoft.ui.xaml.controls.infobadge) is a small piece of UI that can be added into an app and customized to display a number, icon, or a simple dot.

Dot, icon, and numeric InfoBadges

InfoBadge is built into the [NavigationView](https://learn.microsoft.com/windows/apps/design/controls/navigationview) control. It can also be specified as a standalone element in the XAML tree, letting you place InfoBadge into any control or piece of UI that you choose.

Example of an InfoBadge in NavigationView.

[Usage guidelines](https://learn.microsoft.com/windows/apps/design/controls/info-badge)

[API reference](https://learn.microsoft.com/windows/winui/api/microsoft.ui.xaml.controls.infobadge)

## Horizontal Orientation in ColorPicker

Use the Orientation property of the ColorPicker control to specify whether the editing controls should align vertically or horizontally, relative to the color spectrum.

Example of a horizontally aligned ColorPicker.

[Usage guidelines](https://learn.microsoft.com/windows/apps/design/controls/color-picker#specify-the-layout-direction)

[API reference](https://learn.microsoft.com/windows/winui/api/microsoft.ui.xaml.controls.colorpicker.orientation)

## Examples

> **Tip:**
> For more info, design guidance, and code examples, see [Design for Windows apps](https://learn.microsoft.com/windows/apps/design/).
>
> The **WinUI 2 Gallery** app includes interactive examples of most WinUI 2 controls, features, and functionality.
>
> If the gallery app is installed already, click [**WinUI 2 Gallery**](winui2gallery:) to open it.
>
> If it's not installed, download the [**WinUI 2 Gallery**](https://apps.microsoft.com/detail/9MSVH128X2ZT) from the Microsoft Store.
>
> You can also get the source code from [GitHub](https://github.com/Microsoft/WinUI-Gallery) (select the *winui2* branch).

## Other updates

- See our [Notable Changes](https://github.com/microsoft/microsoft-ui-xaml/releases/tag/v2.7.0) list for many of the GitHub issues addressed in this release.
