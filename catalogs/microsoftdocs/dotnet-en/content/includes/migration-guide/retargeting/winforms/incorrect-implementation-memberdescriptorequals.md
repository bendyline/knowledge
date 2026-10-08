### Incorrect implementation of MemberDescriptor.Equals

#### Details

The original implementation of the [System.ComponentModel.MemberDescriptor.Equals%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Equals%252A) method compares two different string properties from the objects being compared: the category name and the description string. The fix is to compare the [System.ComponentModel.MemberDescriptor.Category](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Category) of the first object to the [System.ComponentModel.MemberDescriptor.Category](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Category) of the second one, and the [System.ComponentModel.MemberDescriptor.Description](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Description) of the first to the [System.ComponentModel.MemberDescriptor.Description](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Description) of the second.

#### Suggestion

If your application depends on [System.ComponentModel.MemberDescriptor.Equals%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Equals%252A) sometimes returning `false` when descriptors are equivalent, and you are targeting the .NET Framework 4.6.2 or later, you have several options:

- Make code changes to compare the [System.ComponentModel.MemberDescriptor.Category](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Category) and [System.ComponentModel.MemberDescriptor.Description](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Description) fields manually in addition to calling the [System.ComponentModel.MemberDescriptor.Equals%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Equals%252A) method.
- Opt out of this change by adding the following value to the app.config file:

```xml
<runtime>
  <AppContextSwitchOverrides value="Switch.System.MemberDescriptorEqualsReturnsFalseIfEquivalent=true" />
</runtime>
```

If your application targets .NET Framework 4.6.1 or earlier and is running on the .NET Framework 4.6.2 or later and you want this change enabled, you can set the compatibility switch to `false` by adding the following value to the app.config file:

```xml
<runtime>
  <AppContextSwitchOverrides value="Switch.System.MemberDescriptorEqualsReturnsFalseIfEquivalent=false" />
</runtime>
```

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6.2 |
| Type | Retargeting |

#### Affected APIs

- [System.ComponentModel.MemberDescriptor.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.ComponentModel.MemberDescriptor.Equals(System.Object))
