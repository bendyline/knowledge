---
title: "Breaking change: Forms scale according to AutoScaleMode"
description: Learn about the breaking change in .NET 8 for Windows Forms where top-level windows in PerMonitorV2-mode apps scale according to AutoScaleMode.
ms.date: 01/31/2023
---
# Forms scale according to AutoScaleMode

In [System.Windows.Forms.HighDpiMode.PerMonitorV2](https://learn.microsoft.com/search/?terms=System.Windows.Forms.HighDpiMode.PerMonitorV2)-mode apps, Windows Forms has been using linear sizes (also known as DPI-scaled sizes) provided by Windows for top-level windows, regardless of the [System.Windows.Forms.AutoScaleMode](https://learn.microsoft.com/search/?terms=System.Windows.Forms.AutoScaleMode). This implementation was problematic when using the [System.Windows.Forms.AutoScaleMode.Font](https://learn.microsoft.com/search/?terms=System.Windows.Forms.AutoScaleMode.Font) scaling mode, where [System.Windows.Forms.Form](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form) scaling should be non-linear. The child controls are scaled non-linearly and depend on the font that was assigned to the [System.Windows.Forms.Form](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form) or child controls.

This change enables `WM_GETDPISCALEDSIZE` message handling for top-level [System.Windows.Forms.Form](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form) objects. It utilizes [WM_GETDPISCALEDSIZE](https://learn.microsoft.com/windows/win32/hidpi/wm-getdpiscaledsize) to let Windows know that the [System.Windows.Forms.Form](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form) may need non-linear sizes depending on [System.Windows.Forms.AutoScaleMode](https://learn.microsoft.com/search/?terms=System.Windows.Forms.AutoScaleMode).

## Version introduced

.NET 8 Preview 1

## Previous behavior

Previously, in [System.Windows.Forms.HighDpiMode.PerMonitorV2](https://learn.microsoft.com/search/?terms=System.Windows.Forms.HighDpiMode.PerMonitorV2)-mode apps, top-level windows were scaled by Windows and disregarded [System.Windows.Forms.AutoScaleMode](https://learn.microsoft.com/search/?terms=System.Windows.Forms.AutoScaleMode) as specified in the WinForms application. This implementation led to inconsistent scaling between [System.Windows.Forms.Form](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form) objects and their child controls.

## New behavior

In [System.Windows.Forms.HighDpiMode.PerMonitorV2](https://learn.microsoft.com/search/?terms=System.Windows.Forms.HighDpiMode.PerMonitorV2)-mode apps, top-level windows (such as [Forms](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form)) are scaled according to [System.Windows.Forms.AutoScaleMode](https://learn.microsoft.com/search/?terms=System.Windows.Forms.AutoScaleMode). This implementation ensures that top-level windows scale consistently with their child controls.

## Change category

This change is a [*behavioral change*](../../categories.md#behavioral-change).

## Reason for change

This change was made to improve the high-DPI experience for Windows Forms apps in [System.Windows.Forms.HighDpiMode.PerMonitorV2](https://learn.microsoft.com/search/?terms=System.Windows.Forms.HighDpiMode.PerMonitorV2) mode.

## Recommended action

No action is required.

## Affected APIs

N/A

## See also

- [Top-level forms scale minimum and maximum size to DPI](forms-scale-size-to-dpi.md)
