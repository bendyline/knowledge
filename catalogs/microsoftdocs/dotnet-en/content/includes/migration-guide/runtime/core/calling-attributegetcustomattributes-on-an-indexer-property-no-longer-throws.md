### Calling Attribute.GetCustomAttributes on an indexer property no longer throws AmbiguousMatchException if the ambiguity can be resolved by index's type

#### Details

Prior to the .NET Framework 4.6, calling `GetCustomAttribute(s)` on an indexer property which differed from another property only by the type of the index would result in an [System.Reflection.AmbiguousMatchException](https://learn.microsoft.com/search/?terms=System.Reflection.AmbiguousMatchException). Beginning in the .NET Framework 4.6, the property's attributes will be correctly returned.

#### Suggestion

Be aware that GetCustomAttribute(s) will work more frequently now. If an app was previously relying on the [System.Reflection.AmbiguousMatchException](https://learn.microsoft.com/search/?terms=System.Reflection.AmbiguousMatchException), reflection should now be used to explicitly look for multiple indexers, instead.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6 |
| Type | Runtime |

#### Affected APIs

- [System.Attribute.GetCustomAttribute(System.Reflection.MemberInfo,System.Type)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttribute(System.Reflection.MemberInfo%2CSystem.Type))
- [System.Attribute.GetCustomAttribute(System.Reflection.MemberInfo,System.Type,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttribute(System.Reflection.MemberInfo%2CSystem.Type%2CSystem.Boolean))
- [System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo))
- [System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Boolean))
- [System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Type))
- [System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Type%2CSystem.Boolean))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttribute(System.Reflection.MemberInfo,System.Type)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttribute(System.Reflection.MemberInfo%2CSystem.Type))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttribute(System.Reflection.MemberInfo,System.Type,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttribute(System.Reflection.MemberInfo%2CSystem.Type%2CSystem.Boolean))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttribute%60%601(System.Reflection.MemberInfo)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttribute%2560%25601(System.Reflection.MemberInfo))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttribute%60%601(System.Reflection.MemberInfo,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttribute%2560%25601(System.Reflection.MemberInfo%2CSystem.Boolean))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Boolean))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo,System.Type)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Type))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo,System.Type,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo%2CSystem.Type%2CSystem.Boolean))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttributes%60%601(System.Reflection.MemberInfo)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttributes%2560%25601(System.Reflection.MemberInfo))
- [System.Reflection.CustomAttributeExtensions.GetCustomAttributes%60%601(System.Reflection.MemberInfo,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Reflection.CustomAttributeExtensions.GetCustomAttributes%2560%25601(System.Reflection.MemberInfo%2CSystem.Boolean))

<!--

#### Affected APIs

- `M:System.Attribute.GetCustomAttribute(System.Reflection.MemberInfo,System.Type)`
- `M:System.Attribute.GetCustomAttribute(System.Reflection.MemberInfo,System.Type,System.Boolean)`
- `M:System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo)`
- `M:System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Boolean)`
- `M:System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type)`
- `M:System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type,System.Boolean)`
- `M:System.Reflection.CustomAttributeExtensions.GetCustomAttribute(System.Reflection.MemberInfo,System.Type)`
- `M:System.Reflection.CustomAttributeExtensions.GetCustomAttribute(System.Reflection.MemberInfo,System.Type,System.Boolean)`
- ``M:System.Reflection.CustomAttributeExtensions.GetCustomAttribute``1(System.Reflection.MemberInfo)``
- ``M:System.Reflection.CustomAttributeExtensions.GetCustomAttribute``1(System.Reflection.MemberInfo,System.Boolean)``
- `M:System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo)`
- `M:System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo,System.Boolean)`
- `M:System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo,System.Type)`
- `M:System.Reflection.CustomAttributeExtensions.GetCustomAttributes(System.Reflection.MemberInfo,System.Type,System.Boolean)`
- ``M:System.Reflection.CustomAttributeExtensions.GetCustomAttributes``1(System.Reflection.MemberInfo)``
- ``M:System.Reflection.CustomAttributeExtensions.GetCustomAttributes``1(System.Reflection.MemberInfo,System.Boolean)``

-->
