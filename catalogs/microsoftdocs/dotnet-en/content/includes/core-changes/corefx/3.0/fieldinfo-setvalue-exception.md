### FieldInfo.SetValue throws exception for static, init-only fields

Starting in .NET Core 3.0, an exception is thrown when you attempt to set a value on a static, [System.Reflection.FieldAttributes.InitOnly](https://learn.microsoft.com/search/?terms=System.Reflection.FieldAttributes.InitOnly) field by calling [System.Reflection.FieldInfo.SetValue%2A](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.SetValue%252A).

#### Change description

In .NET Framework and versions of .NET Core prior to 3.0, you could set the value of a static field that's constant after it is initialized ([readonly in C#](../../../../docs/csharp/language-reference/keywords/readonly.md)) by calling [System.Reflection.FieldInfo.SetValue%2A](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.SetValue%252A). However, setting such a field in this way resulted in unpredictable behavior based on the target framework and optimization settings.

In .NET Core 3.0 and later versions, when you call [System.Reflection.FieldInfo.SetValue%2A](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.SetValue%252A) on a static, [System.Reflection.FieldAttributes.InitOnly](https://learn.microsoft.com/search/?terms=System.Reflection.FieldAttributes.InitOnly) field, a [System.FieldAccessException](https://learn.microsoft.com/search/?terms=System.FieldAccessException) exception is thrown.

> **Tip:**
> An [System.Reflection.FieldAttributes.InitOnly](https://learn.microsoft.com/search/?terms=System.Reflection.FieldAttributes.InitOnly) field is one that can only be set at the time it's declared or in the constructor for the containing class. In other words, it's constant after it is initialized.

#### Version introduced

3.0

#### Recommended action

Initialize static, [System.Reflection.FieldAttributes.InitOnly](https://learn.microsoft.com/search/?terms=System.Reflection.FieldAttributes.InitOnly) fields in a static constructor. This applies to both dynamic and non-dynamic types.

Alternatively, you can remove the [System.Reflection.FieldAttributes.InitOnly](https://learn.microsoft.com/search/?terms=System.Reflection.FieldAttributes.InitOnly) attribute from the field, and then call [System.Reflection.FieldInfo.SetValue%2A](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.SetValue%252A).

#### Category

Core .NET libraries

#### Affected APIs

- [System.Reflection.FieldInfo.SetValue(System.Object,System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.SetValue(System.Object%2CSystem.Object))
- [System.Reflection.FieldInfo.SetValue(System.Object,System.Object,System.Reflection.BindingFlags,System.Reflection.Binder,System.Globalization.CultureInfo)](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo.SetValue(System.Object%2CSystem.Object%2CSystem.Reflection.BindingFlags%2CSystem.Reflection.Binder%2CSystem.Globalization.CultureInfo))

<!--

#### Affected APIs

- `M:System.Reflection.FieldInfo.SetValue(System.Object,System.Object)`
- `M:System.Reflection.FieldInfo.SetValue(System.Object,System.Object,System.Reflection.BindingFlags,System.Reflection.Binder,System.Globalization.CultureInfo)`

-->
