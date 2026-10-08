### Icon.ToBitmap successfully converts icons with PNG frames into Bitmap objects

#### Details

Starting with the apps that target the .NET Framework 4.6, the [System.Drawing.Icon.ToBitmap%2A](https://learn.microsoft.com/search/?terms=System.Drawing.Icon.ToBitmap%252A) method successfully converts icons with PNG frames into Bitmap objects.

In apps that target the .NET Framework 4.5.2 and earlier versions, the  [System.Drawing.Icon.ToBitmap%2A](https://learn.microsoft.com/search/?terms=System.Drawing.Icon.ToBitmap%252A) method throws an [System.ArgumentOutOfRangeException](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException) exception if the Icon object has PNG frames.

This change affects apps that are recompiled to target the .NET Framework 4.6 and that implement special handling for the [System.ArgumentOutOfRangeException](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException) that is thrown when an Icon object has PNG frames. When running under the .NET Framework 4.6, the conversion is successful, an [System.ArgumentOutOfRangeException](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException) is no longer thrown, and therefore the exception handler is no longer invoked.

#### Suggestion

If this behavior is undesirable, you can retain the previous behavior by adding the following element to the `<runtime>` section of your app.config file:

```xml
<AppContextSwitchOverrides
value="Switch.System.Drawing.DontSupportPngFramesInIcons=true" />
```

If the app.config file already contains the `AppContextSwitchOverrides` element, the new value should be merged with the value attribute like this:

```xml
<AppContextSwitchOverrides
value="Switch.System.Drawing.DontSupportPngFramesInIcons=true;<previous key>=<previous value>" />
```

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6 |
| Type | Retargeting |

#### Affected APIs

- [System.Drawing.Icon.ToBitmap](https://learn.microsoft.com/search/?terms=System.Drawing.Icon.ToBitmap)
