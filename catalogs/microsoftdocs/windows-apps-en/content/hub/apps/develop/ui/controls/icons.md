---
description: Learn when and how to create icons within your app.
title: Icons in Windows apps
ms.assetid: b90ac02d-5467-4304-99bd-292d6272a014
label: Icons in Windows apps
template: detail.hbs
ms.date: 11/21/2025
ms.topic: article
keywords: windows 10, uwp
doc-status: Published
ms.localizationpriority: medium
ms.custom:
  - RS5
  - sfi-image-nochange
---
# Icons in Windows apps

Icons provide a visual shorthand for an action, concept, or product. By compressing meaning into a symbolic image, icons can cross language barriers and help conserve a valuable resource: screen space. Good icons harmonize with typography and with the rest of the design language. They don't mix metaphors, and they communicate only what's needed, as speedily and simply as possible.

A command bar flyout with icons for add - plus sign, edit - pencil, share - page and arrow, and settings - gear

Icons can appear within apps and outside them. Inside your app, you use icons to represent an action, such as copying text or going to the settings page.

This article describes icons within your app UI. To learn about icons that represent your app in Windows (app icons), see [App icons](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/style/iconography/overview.md).

## Know when to use icons

Icons can save space, but when should you use them?

Use an icon for actions, like cut, copy, paste, and save, or for items on a navigation menu. Use an icon if it's easy for the user to understand what the icon means and it's simple enough to be clear at small sizes.

Don't use an icon if its meaning isn't clear, or if making it clear requires a complex shape.

## Use the right type of icon

There are many ways to create an icon. You can use a symbol font like the [Segoe Fluent Icons font](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/style/segoe-fluent-icons-font.md). You can create your own vector-based image. You can even use a bitmap image, although we don't recommend it. Here's a summary of the ways that you can add an icon to your app.

To add an icon in your XAML app, you use either an [IconElement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconelement) or an [IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconsource).

This table shows the different kinds of icons that are derived from IconElement and IconSource.

| [IconElement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconelement) | [IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconsource) | Description |
| --- | --- | --- |
| [AnimatedIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.animatedicon) | [AnimatedIconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.animatediconsource) | Represents an icon that displays and controls a visual that can animate in response to user interaction and visual state changes. |
| [BitmapIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.bitmapicon) | [BitmapIconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.bitmapiconsource) | Represents an icon that uses a bitmap as its content. |
| [FontIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon) | [FontIconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticonsource) | Represents an icon that uses a glyph from the specified font. |
| [IconSourceElement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconsourceelement) | N/A | Represents an icon that uses an IconSource as its content. |
| [ImageIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.imageicon) | [ImageIconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.imageiconsource) | Represents an icon that uses an image as its content. |
| [PathIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.pathicon) | [PathIconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.pathiconsource) | Represents an icon that uses a vector path as its content. |
| [SymbolIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbolicon) | [SymbolIconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symboliconsource) | Represents an icon that uses a glyph from the `SymbolThemeFontFamily` resource as its content. |

### IconElement vs. IconSource

[IconElement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconelement) is a [FrameworkElement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.frameworkelement), so it can be added to the XAML object tree just like any other element of your app's UI. However, it can't be added to a [ResourceDictionary](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.resourcedictionary) and reused as a shared resource.

[IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconsource) is similar to IconElement; however, because it is not a [FrameworkElement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.frameworkelement), it can't be used as a standalone element in your UI, but it can be shared as a resource. [IconSourceElement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconsourceelement) is a special icon element that wraps an IconSource so you can use it anywhere you need an IconElement. An example of these features is shown in the next section.

#### IconElement examples

You can use an [IconElement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconelement)-derived class as a standalone UI component.

This example shows how to set an icon glyph as the content of a Button. Set the button's [FontFamily](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.control.fontfamily) to `SymbolThemeFontFamily` and its content property to the Unicode value of the glyph that you want to use.

```xaml
<Button FontFamily="{ThemeResource SymbolThemeFontFamily}"
        Content="&#xE768;"/>
```

A button with the play icon, an outline of a triangle pointing to the right

You can also explicitly add one of the icon element objects listed previously, like SymbolIcon. This gives you more types of icons to choose from. It also lets you combine icons and other types of content, such as text, if you want.

```xaml
<Button>
    <StackPanel>
        <SymbolIcon Symbol="Play"/>
        <TextBlock Text="Play" HorizontalAlignment="Center"/>
    </StackPanel>
</Button>
```

A button with the play icon, an outline of a triangle pointing to the right, with the text play below it

This example shows how you can define a FontIconSource in a ResourceDictionary, and then use an IconSourceElement to reuse the resource in different places of your app.

```xaml
<!--App.xaml-->
<Application
   ...>
    <Application.Resources>
        <ResourceDictionary>
            ...
            <!-- Other app resources here -->

            <FontIconSource x:Key="CertIconSource" Glyph="&#xEB95;"/>

        </ResourceDictionary>
    </Application.Resources>
</Application>
```

```xaml
<StackPanel Orientation="Horizontal">
    <IconSourceElement IconSource="{StaticResource CertIconSource}"/>
    <TextBlock Text="Certificate is expired" Margin="4,0,0,0"/>
</StackPanel>

<Button>
    <StackPanel>
        <IconSourceElement IconSource="{StaticResource CertIconSource}"/>
        <TextBlock Text="View certificate" HorizontalAlignment="Center"/>
    </StackPanel>
</Button>

```

A certificate icon with the text certificate is expired, and a button with the certificate icon and the text view certificate

> 
> [Open the WinUI 3 Gallery app to see IconElement in action](winui3gallery://item/IconElement)

> <table>
<tbody><tr>
<td>WinUI 3 Gallery icon</td>
<td>The <strong>WinUI 3 Gallery</strong> app includes interactive examples of WinUI controls and features. Get the app from the <a href="https://apps.microsoft.com/detail/9P3JFPWWDZRC">Microsoft Store</a> or browse the source code on <a href="https://github.com/microsoft/WinUI-Gallery">GitHub</a>.</td>
</tr>
</tbody>

### Icon properties

You often place icons in your UI by assigning one to an _`icon`_ property of another XAML element. _`Icon`_ properties that include _`Source`_ in the name take an IconSource; otherwise, the property takes an IconElement.

This list shows some common elements that have an _`icon`_ property.

| Commands/Actions | Navigation | Status/Other |
| --- | --- | --- |
| [AppBarButton.Icon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.appbarbutton.icon) [AppBarToggleButton.Icon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.appbartogglebutton.icon) [AutoSuggestBox.QueryIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.autosuggestbox.queryicon) [MenuFlyoutItem.Icon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.menuflyoutitem.icon) [MenuFlyoutSubItem.Icon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.menuflyoutsubitem.icon) [SwipeItem.IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.swipeitem.iconsource) [XamlUICommand.IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.input.xamluicommand.iconsource) | [NavigationViewItem.Icon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.navigationviewitem.icon) [SelectorBarItem.Icon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.selectorbaritem.icon) [TabViewItem.IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.tabviewitem.iconsource) | [AnimatedIcon.FallbackIconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.animatedicon.fallbackiconsource) [AnimatedIconSource.FallbackIconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.animatediconsource.fallbackiconsource) [IconSourceElement.IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconsourceelement.iconsource) [InfoBadge.IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.infobadge.iconsource) [InfoBar.IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.infobar.iconsource) [TeachingTip.IconSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.teachingtip.iconsource) |

> **Tip:**
> You can view these controls in the WinUI 3 Gallery app to see examples of how icons are used with them.

The remaining examples on this page show how to assign an icon to the _`icon`_ property of a control.

## FontIcon and SymbolIcon

The most common way to add icons to your app is to use the system icons provided by the icon fonts in Windows. Windows 11 introduces a new system icon font, [Segoe Fluent Icons](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/style/segoe-fluent-icons-font.md), which provides more than 1,000 icons designed for the Fluent Design language. It might not be intuitive to get an icon from a font, but Windows font display technology means these icons will look crisp and sharp on any display, at any resolution, and at any size.

> **Important:**
> **Default font family**
>
> Rather than specifying a [FontFamily](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon.fontfamily) directly, FontIcon and SymbolIcon use the font family defined by the `SymbolThemeFontFamily` XAML theme resource. By default, this resource uses the Segoe Fluent Icon font family. If your app is run on Windows 10, version 20H2 or earlier, the Segoe Fluent Icon font family is not available and the `SymbolThemeFontFamily` resource falls back to the [Segoe MDL2 Assets](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/style/segoe-ui-symbol-font.md) font family instead.

### Symbol enumeration

Many common glyphs from the `SymbolThemeFontFamily` are included in the [Symbol](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbol) enumeration. If the glyph you need is available as a Symbol, you can use a [SymbolIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbolicon) anywhere you would use a FontIcon with the default font family.

You also use Symbol names to set an _`icon`_ property in XAML using [attribute syntax](https://learn.microsoft.com/windows/apps/develop/platform/xaml/xaml-syntax-guide#setting-a-property-by-using-attribute-syntax), like this

```xaml
<AppBarButton Icon="Send" Label="Send"/>
```

A button with the send icon, an outline of an arrow head pointing to the right

> **Tip:**
> You can only use Symbol names to set an _`icon`_ property using the shortened [attribute syntax](https://learn.microsoft.com/windows/apps/develop/platform/xaml/xaml-syntax-guide#setting-a-property-by-using-attribute-syntax). All other icon types must be set using the longer [property element syntax](https://learn.microsoft.com/windows/apps/develop/platform/xaml/xaml-syntax-guide#setting-a-property-by-using-property-element-syntax), as shown in other examples on this page.

### Font icons

Only a small subset of Segoe Fluent Icon glyphs are available in the [Symbol](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbol) enumeration. To use any of the other available glyphs, use a [FontIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon). This example shows how to create an [AppBarButton](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.appbarbutton) with the `SendFill` icon.

```xaml
<AppBarButton Label="Send">
    <AppBarButton.Icon>
        <FontIcon Glyph="&#xE725;"/>
    </AppBarButton.Icon>
</AppBarButton>

```

A button with the send fill icon, a filled in arrow head pointing to the right

If you don't specify a [FontFamily](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon.fontfamily), or you specify a FontFamily that is not available on the system at runtime, the FontIcon falls back to the default font family defined by the `SymbolThemeFontFamily` theme resource.

You can also specify an icon using a Glyph value from any available font. This example shows how to use a Glyph from the Segoe UI Emoji font.

```xaml
<AppBarToggleButton Label="FontIcon">
    <AppBarToggleButton.Icon>
        <FontIcon FontFamily="Segoe UI Emoji" Glyph="&#x25B6;"/>
    </AppBarToggleButton.Icon>
</AppBarToggleButton>
```

A button with the play icon from the Segoe UI Emoji font, a white arrow head pointing to the right on a blue background

For more information and examples, see the [FontIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon) and [SymbolIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbolicon) class documentation.

> **Tip:**
> Use the Iconography page in the WinUI 3 Gallery app to view, search, and copy code for all the icons available in Segoe Fluent Icons.

> 
> [Open the WinUI 3 Gallery app to the Iconography page](winui3gallery://item/Iconography)

## AnimatedIcon

Motion is an important part of the Fluent Design language. Animated icons draw attention to specific entry points, provide feedback from state to state, and add delight to an interaction.

You can use animated icons to implement lightweight, vector-based icons with motion using [Lottie](https://learn.microsoft.com/windows/communitytoolkit/animations/lottie) animations.

For more information and examples, see [Animated icons](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/animated-icon.md) and the [AnimatedIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.animatedicon) class documentation.

> 
> [Open the WinUI 3 Gallery app to see AnimatedIcon in action](winui3gallery://item/AnimatedIcon)

## PathIcon

You can use a [PathIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.pathicon) to create custom icons that use vector-based shapes, so they always look sharp. However, creating a shape using a XAML [Geometry](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.geometry) is complicated because you have to individually specify each point and curve.

This example shows two different ways to define the Geometry used in a PathIcon.

```xaml
<AppBarButton Label="PathIcon">
    <AppBarButton.Icon>
        <PathIcon Data="F1 M 16,12 20,2L 20,16 1,16"/>
    </AppBarButton.Icon>
</AppBarButton>

<AppBarButton Label="Circles">
    <AppBarButton.Icon>
        <PathIcon>
            <PathIcon.Data>
                <GeometryGroup>
                    <EllipseGeometry RadiusX="15" RadiusY="15" Center="90,90" />
                    <EllipseGeometry RadiusX="50" RadiusY="50" Center="90,90" />
                    <EllipseGeometry RadiusX="70" RadiusY="70" Center="90,90" />
                    <EllipseGeometry RadiusX="100" RadiusY="100" Center="90,90" />
                    <EllipseGeometry RadiusX="120" RadiusY="120" Center="90,90" />
                </GeometryGroup>      
            </PathIcon.Data>
        </PathIcon>
    </AppBarButton.Icon>
</AppBarButton>
```

A button with a custom path icon
A button with a custom path icon, two circles around a center point

To learn more about using [Geometry](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.geometry) classes to create custom shapes, see the class documentation and [Move and draw commands for geometries](https://learn.microsoft.com/windows/apps/develop/platform/xaml/move-draw-commands-syntax). Also see the [WPF Geometry documentation](https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/geometry-overview). The WinUI Geometry class doesn't have all the same features as the WPF class, but creating shapes is the same for both.

For more information and examples, see the [PathIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.pathicon) class documentation.

## BitmapIcon and ImageIcon

You can use a [BitmapIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.bitmapicon) or [ImageIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.imageicon) to create an icon from an image file (such as PNG, GIF, or JPEG), although we don't recommend it if another option is available. Bitmap images are created at a specific size, so they have to be scaled up or down depending on how large you want the icon to be and the resolution of the screen. When the image is scaled down (shrunk), it can appear blurry. When it's scaled up, it can appear blocky and pixelated.

### BitmapIcon

By default, a [BitmapIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.bitmapicon) strips out all color information from the image and renders all non-transparent pixels in the [Foreground](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconelement.foreground) color. To create a monochrome icon, use a solid image on a transparent background in PNG format. Other image formats will load apparently without error but result in a solid block of the Foreground color.

```xaml
<AppBarButton Label="ImageIcon">
    <AppBarButton.Icon>
        <ImageIcon Source="ms-appx:///Assets/slices3.png"/>
    </AppBarButton.Icon>
</AppBarButton>
```

A button with a bitmap icon, pie shaped slices in black and white

You can override the default behavior by setting the [ShowAsMonochrome](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.bitmapicon.showasmonochrome) property to `false`. In this case, the BitmapIcon behaves the same as an ImageIcon for supported bitmap file types (SVG files are not supported).

```xaml
<BitmapIcon UriSource="ms-appx:///Assets/slices3.jpg" 
            ShowAsMonochrome="False"/>
```

For more information and examples, see the [BitmapIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.bitmapicon) class documentation.

> **Tip:**
> Usage of BitmapIcon is similar to usage of BitmapImage; see the [BitmapImage](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.bitmapimage) class for more information that's applicable to BitmapIcon, like setting the UriSource property in code.

### ImageIcon

An [ImageIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.imageicon) shows the image provided by one of the [ImageSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imagesource)-derived classes. The most common is [BitmapSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.bitmapsource), but as mentioned previously, we don't recommend bitmap images for icons due to potential scaling issues.

Scalable Vector Graphics (SVG) resources are ideal for icons, because they always look sharp at any size or resolution. You can use an [SVGImageSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.svgimagesource) with an ImageIcon, which supports secure static mode from the SVG specification but does not support animations or interactions.
For more information, see [SVGImageSource](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.svgimagesource) and [SVG support](https://learn.microsoft.com/windows/desktop/Direct2D/svg-support).

An ImageIcon ignores the [Foreground](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.iconelement.foreground) property, so it always shows the image in its original color. Because Foreground color is ignored, the icon doesn't respond to visual state changes when used in a button or other similar control.

```xaml
<AppBarButton Label="ImageIcon">
    <AppBarButton.Icon>
        <ImageIcon Source="ms-appx:///Assets/slices3.svg"/>
    </AppBarButton.Icon>
</AppBarButton>
```

A button with an image icon, pie shaped slices in different colors

For more information and examples, see the [ImageIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.imageicon) class documentation.

> **Tip:**
> Usage of ImageIcon is similar to the Image control; see the [Image](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.image) class for more information that's applicable to ImageIcon. One notable difference is that with ImageIcon, only the first frame of a multi-frame image (like an animated GIF) is used. To use animated icons, see [AnimatedIcon](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/animated-icon.md).

## Related articles

- [Iconography in Windows](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/signature-experiences/iconography.md)
- [App icons](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/style/iconography/overview.md)
- [AnimatedIcon](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/animated-icon.md)
- [Command bar](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/command-bar.md)
