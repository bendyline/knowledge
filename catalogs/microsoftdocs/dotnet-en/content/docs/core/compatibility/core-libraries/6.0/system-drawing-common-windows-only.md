---
title: "Breaking change: System.Drawing.Common only supported on Windows"
description: Learn about the .NET 6 breaking change where the System.Drawing.Common package is no longer supported on non-Windows operating systems.
ms.date: 11/08/2022
---
# System.Drawing.Common only supported on Windows

The [System.Drawing.Common](https://www.nuget.org/packages/System.Drawing.Common/) NuGet package is now attributed as a Windows-specific library. The platform analyzer emits warning at compile time when compiling for non-Windows operating systems.

On non-Windows operating systems, unless you set a runtime configuration switch, a [System.TypeInitializationException](https://learn.microsoft.com/search/?terms=System.TypeInitializationException) exception is thrown with [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) as the inner exception.

## Old behavior

Prior to .NET 6, using the System.Drawing.Common package did not produce any compile-time warnings, and no runtime exceptions were thrown.

## New behavior

Starting in .NET 6, the platform analyzer emits compile-time warnings when referencing code is compiled for non-Windows operating systems. In addition, the following runtime exception is thrown unless you set a configuration option:

```
System.TypeInitializationException : The type initializer for 'Gdip' threw an exception.
      ---- System.PlatformNotSupportedException : System.Drawing.Common is not supported on non-Windows platforms. See https://aka.ms/systemdrawingnonwindows for more information.
      Stack Trace:
           at System.Drawing.SafeNativeMethods.Gdip.GdipCreateBitmapFromFile(String filename, IntPtr& bitmap)
        /_/src/libraries/System.Drawing.Common/src/System/Drawing/Bitmap.cs(42,0): at System.Drawing.Bitmap..ctor(String filename, Boolean useIcm)
        /_/src/libraries/System.Drawing.Common/src/System/Drawing/Bitmap.cs(25,0): at System.Drawing.Bitmap..ctor(String filename)
        /_/src/libraries/System.Resources.ResourceManager/tests/ResourceManagerTests.cs(270,0): at System.Resources.Tests.ResourceManagerTests.EnglishImageResourceData()+MoveNext()
        /_/src/libraries/System.Linq/src/System/Linq/Select.cs(136,0): at System.Linq.Enumerable.SelectEnumerableIterator`2.MoveNext()
        ----- Inner Stack Trace -----
        /_/src/libraries/System.Drawing.Common/src/System/Drawing/LibraryResolver.cs(31,0): at System.Drawing.LibraryResolver.EnsureRegistered()
        /_/src/libraries/System.Drawing.Common/src/System/Drawing/GdiplusNative.Unix.cs(65,0): at System.Drawing.SafeNativeMethods.Gdip.PlatformInitialize()
        /_/src/libraries/System.Drawing.Common/src/System/Drawing/Gdiplus.cs(27,0): at System.Drawing.SafeNativeMethods.Gdip..cctor()
```

## Version introduced

.NET 6

## Type of breaking change

This change can affect [source compatibility](../../categories.md#source-compatibility) and [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

Because `System.Drawing.Common` was designed to be a thin wrapper over Windows technologies, its cross-platform implementation is subpar.

`libgdiplus` is the main provider of the cross-platform implementation of `System.Drawing.Common` on the native side. `libgdiplus` is effectively a reimplementation of the parts of Windows that `System.Drawing.Common` depends on. That implementation makes `libgdiplus` a non-trivial component. It's around 30,000 lines of C code that's largely untested, and it lacks a lot of functionality. `libgdiplus` also has numerous external dependencies for image processing and text rendering, such as `cairo`, `pango`, and other native libraries. Those dependencies make maintaining and shipping the component even more challenging. Since the inclusion of the Mono cross-platform implementation, we have redirected numerous issues to `libgdiplus` that never got fixed. In comparison, other external dependencies we have taken, such as `icu` or `openssl`, are high-quality libraries. It's not viable to get `libgdiplus` to the point where its feature set and quality is on par with the rest of the .NET stack.

From analysis of NuGet packages, we've observed that `System.Drawing.Common` is used cross-platform mostly for image manipulation, such as QR code generators and text rendering. We haven't noticed heavy graphics usage, as our cross-platform graphics support is incomplete. The usages we see of `System.Drawing.Common` in non-Windows environments are typically well supported with SkiaSharp and ImageSharp.

`System.Drawing.Common` will continue to evolve only in the context of Windows Forms and GDI+.

## Recommended action

To use these APIs for cross-platform apps, migrate to one of the following libraries:

- [SkiaSharp](https://github.com/mono/SkiaSharp)
- [ImageSharp](https://sixlabors.com/products/imagesharp) (tiered license)
- [Aspose.Drawing](https://products.aspose.com/drawing/net/) (commercial license)
- [Microsoft.Maui.Graphics](https://learn.microsoft.com/dotnet/maui/user-interface/graphics/)

Alternatively, you can enable support for non-Windows platforms in .NET 6 by setting the `System.Drawing.EnableUnixSupport` [runtime configuration switch](../../../runtime-config/index.md) to `true` in the *runtimeconfig.json* file.

*runtimeconfig.template.json* template file:

```json
{
   "configProperties": {
      "System.Drawing.EnableUnixSupport": true
   }
}
```

*[appname].runtimeconfig.json* output file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.Drawing.EnableUnixSupport": true
      }
   }
}
```

> **Note:**
>
> - This configuration switch was added to give cross-platform apps that depend heavily on this package time to migrate to more modern libraries. However, non-Windows bugs will not be fixed.
> - This switch is only available in .NET 6 and was removed in .NET 7. For more information, see [System.Drawing.Common config switch removed](../7.0/system-drawing.md).

## Affected APIs

[System.Drawing](https://learn.microsoft.com/search/?terms=System.Drawing) namespace:

- [System.Drawing.Bitmap](https://learn.microsoft.com/search/?terms=System.Drawing.Bitmap)
- [System.Drawing.Brush](https://learn.microsoft.com/search/?terms=System.Drawing.Brush)
- [System.Drawing.Brushes](https://learn.microsoft.com/search/?terms=System.Drawing.Brushes)
- [System.Drawing.BufferedGraphics](https://learn.microsoft.com/search/?terms=System.Drawing.BufferedGraphics)
- [System.Drawing.BufferedGraphicsContext](https://learn.microsoft.com/search/?terms=System.Drawing.BufferedGraphicsContext)
- [System.Drawing.Font](https://learn.microsoft.com/search/?terms=System.Drawing.Font)
- [System.Drawing.FontFamily](https://learn.microsoft.com/search/?terms=System.Drawing.FontFamily)
- [System.Drawing.FontConverter](https://learn.microsoft.com/search/?terms=System.Drawing.FontConverter)
- [System.Drawing.Graphics](https://learn.microsoft.com/search/?terms=System.Drawing.Graphics)
- [System.Drawing.Icon](https://learn.microsoft.com/search/?terms=System.Drawing.Icon)
- [System.Drawing.IconConverter](https://learn.microsoft.com/search/?terms=System.Drawing.IconConverter)
- [System.Drawing.Image](https://learn.microsoft.com/search/?terms=System.Drawing.Image)
- [System.Drawing.ImageAnimator](https://learn.microsoft.com/search/?terms=System.Drawing.ImageAnimator)
- [System.Drawing.Pen](https://learn.microsoft.com/search/?terms=System.Drawing.Pen)
- [System.Drawing.Pens](https://learn.microsoft.com/search/?terms=System.Drawing.Pens)
- [System.Drawing.Region](https://learn.microsoft.com/search/?terms=System.Drawing.Region)
- [System.Drawing.SolidBrush](https://learn.microsoft.com/search/?terms=System.Drawing.SolidBrush)
- [System.Drawing.StringFormat](https://learn.microsoft.com/search/?terms=System.Drawing.StringFormat)
- [System.Drawing.SystemBrushes](https://learn.microsoft.com/search/?terms=System.Drawing.SystemBrushes)
- [System.Drawing.SystemFonts](https://learn.microsoft.com/search/?terms=System.Drawing.SystemFonts)
- [System.Drawing.SystemIcons](https://learn.microsoft.com/search/?terms=System.Drawing.SystemIcons)
- [System.Drawing.SystemPens](https://learn.microsoft.com/search/?terms=System.Drawing.SystemPens)
- [System.Drawing.TextureBrush](https://learn.microsoft.com/search/?terms=System.Drawing.TextureBrush)

[System.Drawing.Drawing2D](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D) namespace:

- [System.Drawing.Drawing2D.AdjustableArrowCap](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D.AdjustableArrowCap)
- [System.Drawing.Drawing2D.CustomLineCap](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D.CustomLineCap)
- [System.Drawing.Drawing2D.GraphicsPath](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D.GraphicsPath)
- [System.Drawing.Drawing2D.GraphicsPathIterator](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D.GraphicsPathIterator)
- [System.Drawing.Drawing2D.GraphicsState](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D.GraphicsState)
- [System.Drawing.Drawing2D.HatchBrush](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D.HatchBrush)
- [System.Drawing.Drawing2D.LinearGradientBrush](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D.LinearGradientBrush)
- [System.Drawing.Drawing2D.Matrix](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D.Matrix)
- [System.Drawing.Drawing2D.PathGradientBrush](https://learn.microsoft.com/search/?terms=System.Drawing.Drawing2D.PathGradientBrush)

[System.Drawing.Imaging](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging) namespace:

- [System.Drawing.Imaging.Encoder](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.Encoder)
- [System.Drawing.Imaging.EncoderParameter](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.EncoderParameter)
- [System.Drawing.Imaging.EncoderParameters](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.EncoderParameters)
- [System.Drawing.Imaging.ImageAttributes](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.ImageAttributes)
- [System.Drawing.Imaging.ImageCodecInfo](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.ImageCodecInfo)
- [System.Drawing.Imaging.ImageFormat](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.ImageFormat)
- [System.Drawing.Imaging.Metafile](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.Metafile)
- [System.Drawing.Imaging.MetafileHeader](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.MetafileHeader)
- [System.Drawing.Imaging.PlayRecordCallback](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.PlayRecordCallback)

[System.Drawing.Printing](https://learn.microsoft.com/search/?terms=System.Drawing.Printing) namespace:

- [System.Drawing.Printing.PageSettings](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PageSettings)
- [System.Drawing.Printing.PreviewPageInfo](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PreviewPageInfo)
- [System.Drawing.Printing.PrintController](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintController)
- [System.Drawing.Printing.PrintDocument](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintDocument)
- [System.Drawing.Printing.PrinterSettings](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrinterSettings)
- [System.Drawing.Printing.PrintEventArgs](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintEventArgs)
- [System.Drawing.Printing.PrintEventHandler](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintEventHandler)
- [System.Drawing.Printing.PrintPageEventArgs](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintPageEventArgs)
- [System.Drawing.Printing.PrintPageEventHandler](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintPageEventHandler)

[System.Drawing.Text](https://learn.microsoft.com/search/?terms=System.Drawing.Text) namespace:

- [System.Drawing.Text.FontCollection](https://learn.microsoft.com/search/?terms=System.Drawing.Text.FontCollection)
- [System.Drawing.Text.InstalledFontCollection](https://learn.microsoft.com/search/?terms=System.Drawing.Text.InstalledFontCollection)
- [System.Drawing.Text.PrivateFontCollection](https://learn.microsoft.com/search/?terms=System.Drawing.Text.PrivateFontCollection)

## See also

- [`System.Drawing.Common` only supported on Windows - dotnet/designs](https://github.com/dotnet/designs/blob/main/accepted/2021/system-drawing-win-only/system-drawing-win-only.md)
