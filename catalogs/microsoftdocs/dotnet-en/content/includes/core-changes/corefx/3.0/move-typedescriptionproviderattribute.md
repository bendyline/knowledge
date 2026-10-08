### TypeDescriptionProviderAttribute moved to another assembly

The [System.ComponentModel.TypeDescriptionProviderAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeDescriptionProviderAttribute) class has been moved.

#### Change description

In .NET Core 2.2 and earlier versions, The [System.ComponentModel.TypeDescriptionProviderAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeDescriptionProviderAttribute) class is found in the *System.ComponentModel.TypeConverter* assembly.

Starting with .NET Core 3.0, it is found in the *System.ObjectModel* assembly.

#### Version introduced

3.0

#### Recommended action

This change only affects applications that use reflection to load the [System.ComponentModel.TypeDescriptionProviderAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.TypeDescriptionProviderAttribute) type by calling a method such as [System.Reflection.Assembly.GetType%2A](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetType%252A) or an overload of [System.Activator.CreateInstance%2A](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance%252A) that assumes the type is in a particular assembly. If that is the case, the assembly referenced in the method call should be updated to reflect the type's new assembly location.

#### Category

Windows Forms

#### Affected APIs

None.

<!--

#### Affected APIs

- Not detectable via API analysis

-->
