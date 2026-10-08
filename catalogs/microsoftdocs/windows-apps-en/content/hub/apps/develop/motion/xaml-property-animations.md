---
title: XAML property animations
description: Learn how to animate properties on a XAML UIElement directly by using composition animations.
ms.date: 10/31/2025
ms.topic: concept-article
ms.localizationpriority: medium
ms.custom: RS5
---
# Animating XAML elements with composition animations

This article introduces properties that let you animate a XAML UIElement with the performance of composition animations and the ease of setting XAML properties.

Typically, you use either XAML or Composition APIs to build animations in your Windows apps:

- Use XAML constructs like [Storyboarded animations](storyboarded-animations.md), or the _*ThemeTransition_ and _*ThemeAnimation_ classes in the [Microsoft.UI.Xaml.Media.Animation](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.animation) namespace.
- Use composition animations as described in [Using the Visual Layer with XAML](https://learn.microsoft.com/windows/uwp/composition/using-the-visual-layer-with-xaml).

Using the visual layer provides better performance than using the XAML constructs. But using [ElementCompositionPreview](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Hosting.ElementCompositionPreview) to get the element's underlying composition [Visual](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.composition.visual) object, and then animating the Visual with composition animations, is more complex to use.

However, some properties on a UIElement let you animate them directly using composition animations without the requirement to get the underlying composition Visual.

> 
>
> - **Important APIs**: [UIElement class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement), [CompositionAnimation class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.composition.compositionanimation)

> 
> [Open the WinUI 3 Gallery app and see Animation interop in action](winui3gallery://item/XamlCompInterop)

> <table>
<tbody><tr>
<td>WinUI 3 Gallery icon</td>
<td>The <strong>WinUI 3 Gallery</strong> app includes interactive examples of WinUI controls and features. Get the app from the <a href="https://apps.microsoft.com/detail/9P3JFPWWDZRC">Microsoft Store</a> or browse the source code on <a href="https://github.com/microsoft/WinUI-Gallery">GitHub</a>.</td>
</tr>
</tbody>

## Composition rendering properties replace XAML rendering properties

This table shows the properties you can use to modify the rendering of a UIElement, that can also be animated with a [CompositionAnimation](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.composition.compositionanimation).

| Property | Type | Description |
| --- | --- | --- |
| [Opacity](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.opacity) | Double | The degree of the object's opacity |
| [Translation](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.translation) | Vector3 | Shift the X/Y/Z position of the element |
| [TransformMatrix](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.transformmatrix) | Matrix4x4 | The transform matrix to apply to the element |
| [Scale](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.scale) | Vector3 | Scale the element, centered on the CenterPoint |
| [Rotation](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.rotation) | Float | Rotate the element around the RotationAxis and CenterPoint |
| [RotationAxis](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.rotationaxis) | Vector3 | The axis of rotation |
| [CenterPoint](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.centerpoint) | Vector3 | The center point of scale and rotation |

The `TransformMatrix` property value is combined with the `Scale`, `Rotation`, and `Translation` properties in the following order:  `TransformMatrix`, `Scale`, `Rotation`, `Translation`.

These properties don't affect the element's layout, so modifying these properties does not cause a new [Measure](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.measure)/[Arrange](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.arrange) pass.

These properties have the same purpose and behavior as the like-named properties on the composition [Visual](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.composition.visual) class (except for `Translation`, which isn't on `Visual`).

### Example: Setting the Scale property

This example shows how to set the `Scale` property on a `Button`.

```xaml
<Button Scale="2,2,1" Content="I am a large button" />
```

```csharp
var button = new Button();
button.Content = "I am a large button";
button.Scale = new Vector3(2.0f,2.0f,1.0f);
```

### Mutual exclusivity between composition and XAML rendering properties

> **Note:**
> The **Opacity** property does not enforce the mutual exclusivity described in this section. You use the same `Opacity` property whether you use XAML or composition animations.

The properties that can be animated with a CompositionAnimation are replacements for several existing UIElement properties:

- [RenderTransform](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.rendertransform)
- [RenderTransformOrigin](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.rendertransformorigin)
- [Projection](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.projection)
- [Transform3D](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.transform3d)

> **Note:**
> For the sake of convenience, we refer to the newer properties that support composition animations as _new_ properties, and properties that support XAML constructs as _old_ properties.

When you set (or animate) any of the new properties, you cannot use the old properties. Conversely, if you set (or animate) any of the old properties, you cannot use the new properties.

You also cannot use the new properties if you use ElementCompositionPreview to get and manage the [Visual](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.composition.visual) yourself using these methods:

- [ElementCompositionPreview.GetElementVisual](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.hosting.elementcompositionpreview.getelementvisual)
- [ElementCompositionPreview.SetIsTranslationEnabled](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.hosting.elementcompositionpreview.setistranslationenabled)

> **Warning:**
> Attempting to mix the use of the two sets of properties will cause the API call to fail and produce an error message.

It's possible to switch from one set of properties by clearing them, though for simplicity it's not recommended. If the property is backed by a [DependencyProperty](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.dependencyproperty) (for example, UIElement.Projection is backed by UIElement.ProjectionProperty), then call [ClearValue](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.dependencyobject.clearvalue) to restore it to its "unused" state. Otherwise (for example, the `Scale` property), set the property to its default value.

## Animating UIElement properties with CompositionAnimation

You can animate the rendering properties listed in the table with a CompositionAnimation. These properties can also be referenced by an [ExpressionAnimation](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.composition.expressionanimation).

Use the [StartAnimation](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.startanimation) and [StopAnimation](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.stopanimation) methods on UIElement to animate the UIElement properties.

### Example: Animating the Scale property with a Vector3KeyFrameAnimation

This example shows how to animate the scale of a Button.

```csharp
var compositor = Window.Current.Compositor;
var animation = compositor.CreateVector3KeyFrameAnimation();

animation.InsertKeyFrame(1.0f, new Vector3(2.0f,2.0f,1.0f));
animation.Duration = TimeSpan.FromSeconds(1);
animation.Target = "Scale";

button.StartAnimation(animation);
```

### Example: Animating the Scale property with an ExpressionAnimation

A page has two buttons. The second button animates to be twice as large (via scale) as the first button.

```xaml
<Button x:Name="sourceButton" Content="Source"/>
<Button x:Name="destinationButton" Content="Destination"/>
```

```csharp
Compositor compositor =
        CompositionTarget.GetCompositorForCurrentThread();
ExpressionAnimation animation = 
        compositor.CreateExpressionAnimation("sourceButton.Scale*2");
animation.SetExpressionReferenceParameter("sourceButton", sourceButton);
animation.Target = "Scale";
destinationButton.StartAnimation(animation);
```

## Related topics

- [Storyboarded animations](storyboarded-animations.md)
- [Using the Visual Layer with XAML](https://learn.microsoft.com/windows/uwp/composition/using-the-visual-layer-with-xaml)
- [Transforms overview](../platform/xaml/transforms.md)
