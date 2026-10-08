---
title: Motion in practice - animation in Windows apps
description: Learn how Fluent motion fundamentals like timing, easing, directionality, and gravity come together in your app.
label: Motion in practice
template: detail.hbs
ms.date: 10/29/2025
ms.topic: how-to
doc-status: Published
ms.localizationpriority: medium
ms.custom: RS5
---
# Animations in Windows app

Timing, easing, directionality, and gravity work together to form the foundation of Fluent motion. Each has to be considered in the context of the others, and applied appropriately in the context of your app.

Here are 3 ways to apply Fluent motion fundamentals in your app.

- **Implicit animation**<br/>
Automatic tween and timing between values in a parameter change to achieve very simple Fluent motion using the standardized values.
- **Built-in animation**<br/>
System components, such as common controls and shared motion, are "Fluent by default". Fundamentals have been applied in a manner consistent with their implied usage.
- **Custom animation following guidance recommendations**<br/>
There may be times when the system does not yet provide an exact motion solution for your scenario. In those cases, use the baseline fundamental recommendations as a starting point for your experiences.

**_Transition example_**

functional animation



<b>Direction Forward Out:</b><br>
Fade out: 150m; Easing: Default Accelerate
<b>Direction Forward In:</b><br>
Slide up 150px: 300ms; Easing: Default Decelerate


<b>Direction Backward Out:</b><br>
Slide down 150px: 150ms; Easing: Default Accelerate
<b>Direction Backward In:</b><br>
Fade in: 300ms; Easing: Default Decelerate



**_Object example_**

 300ms motion



<b>Direction Expand:</b><br>
Grow: 300ms; Easing: Standard


<b>Direction Contract:</b><br>
Grow: 150ms; Easing: Default Accelerate



## Implicit Animations

Implicit animations are a simple way to achieve Fluent motion by automatically interpolating between the old and new values during a parameter change.

> 
>
> - **Important APIs:** [Windows.UI.Xaml.Media.Animation Namespace](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.animation), [Windows.UI.Xaml.Controls namespace](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls)

> 
> [Open the WinUI 3 Gallery app and see Implicit Transitions in action](winui3gallery://item/ImplicitTransition)

> <table>
<tbody><tr>
<td>WinUI 3 Gallery icon</td>
<td>The <strong>WinUI 3 Gallery</strong> app includes interactive examples of WinUI controls and features. Get the app from the <a href="https://apps.microsoft.com/detail/9P3JFPWWDZRC">Microsoft Store</a> or browse the source code on <a href="https://github.com/microsoft/WinUI-Gallery">GitHub</a>.</td>
</tr>
</tbody>

You can implicitly animate changes to the following properties:

- [UIElement](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement)
  - **Opacity**
  - **Rotation**
  - **Scale**
  - **Translation**

- [Border](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.border), [ContentPresenter](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.contentpresenter), or [Panel](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.panel)
  - **Background**

Each property that can have changes implicitly animated has a corresponding _transition_ property. To animate the property, you assign a transition type to the corresponding _transition_ property. This table shows the _transition_ properties and the transition type to use for each one.

| Animated property | Transition property | Implicit transition type |
| --- | --- | --- |
| [UIElement.Opacity](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.opacity) | [OpacityTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.opacitytransition) | [ScalarTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.scalartransition) |
| [UIElement.Rotation](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.rotation) | [RotationTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.rotationtransition) | [ScalarTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.scalartransition) |
| [UIElement.Scale](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.scale) | [ScaleTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.scaletransition) | [Vector3Transition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.vector3transition) |
| [UIElement.Translation](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.translation) | [TranslationTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.translationtransition) | [Vector3Transition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.vector3transition) |
| [Border.Background](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.border.background) | [BackgroundTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.border.backgroundtransition) | [BrushTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.brushtransition) |
| [ContentPresenter.Background](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.contentpresenter.background) | [BackgroundTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.contentpresenter.backgroundtransition) | [BrushTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.brushtransition) |
| [Panel.Background](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.panel.background) | [BackgroundTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.panel.backgroundtransition) | [BrushTransition](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.brushtransition) |

This example shows how to use the Opacity property and transition to make a button fade in when the control is enabled and fade out when it's disabled.

```xaml
<Button x:Name="SubmitButton"
        Content="Submit"
        Opacity="{x:Bind OpaqueIfEnabled(SubmitButton.IsEnabled), Mode=OneWay}">
    <Button.OpacityTransition>
        <ScalarTransition />
    </Button.OpacityTransition>
</Button>
```

```csharp
public double OpaqueIfEnabled(bool IsEnabled)
{
    return IsEnabled ? 1.0 : 0.2;
}
```

## Related articles

- [Motion overview](../../design/signature-experiences/motion.md)
- [Timing and easing](../../design/motion/timing-and-easing.md)
- [Directionality and gravity](../../design/motion/directionality-and-gravity.md)
