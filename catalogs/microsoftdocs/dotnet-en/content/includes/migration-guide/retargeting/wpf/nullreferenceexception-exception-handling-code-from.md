### NullReferenceException in exception handling code from ImageSourceConverter.ConvertFrom

#### Details

An error in the exception handling code for [System.Windows.Media.ImageSourceConverter.ConvertFrom(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Media.ImageSourceConverter.ConvertFrom(System.ComponentModel.ITypeDescriptorContext%2CSystem.Globalization.CultureInfo%2CSystem.Object)) caused an incorrect [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) to be thrown instead of the intended exception ( [System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException) or [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException)). This change corrects that error so that the method now throws the right exception.

By default all applications targeting .NET Framework 4.6.2 and earlier continue to throw [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) for compatibility. Developers targeting .NET Framework 4.7 and above should see the right exceptions.

#### Suggestion

Developers who wish to revert to getting [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) when targeting .NET Framework 4.7 or later can add/merge the following to their application's App.config file:

```xml
<configuration>
<runtime>
<AppContextSwitchOverrides value="Switch.System.Windows.Media.ImageSourceConverter.OverrideExceptionWithNullReferenceException=true"/>
</runtime>
</configuration>
```

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.7 |
| Type | Retargeting |

#### Affected APIs

- [System.Windows.Media.ImageSourceConverter.ConvertFrom(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Media.ImageSourceConverter.ConvertFrom(System.ComponentModel.ITypeDescriptorContext%2CSystem.Globalization.CultureInfo%2CSystem.Object))
