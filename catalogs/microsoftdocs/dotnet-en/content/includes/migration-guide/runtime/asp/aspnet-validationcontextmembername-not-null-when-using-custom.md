### ASP.NET ValidationContext.MemberName is not NULL when using custom DataAnnotations.ValidationAttribute

#### Details

In .NET Framework 4.7.2 and earlier versions, when using a custom [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute), the [System.ComponentModel.DataAnnotations.ValidationContext.MemberName](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationContext.MemberName) property returns `null`. In .NET Framework 4.8 version prior to the October 2019 update, it returns the member name. Starting with [.NET Framework October 2019 Preview of Quality Rollup](https://devblogs.microsoft.com/dotnet/net-framework-october-2019-preview-of-quality-rollup/) for .NET Framework 4.8, it returns `null` by default, but you can opt in to return the member name instead.

#### Suggestion

Add the following setting to your *web.config* file for the property to return the member name in [.NET Framework October 2019 Preview of Quality Rollup](https://devblogs.microsoft.com/dotnet/net-framework-october-2019-preview-of-quality-rollup/) for .NET Framework 4.8 and later versions:

```xml
<configuration>
<appSettings>
...
<add key="aspnet:GetValidationMemberName"  value="true"/>
...
</appSettings>
</configuration>
```

In .NET Framework 4.8 version prior to the October 2019 update,  adding this to your *web.config* file restores the previous behavior and the property returns `null`.

| Name | Value |
| :--- | :--- |
| Scope | Unknown |
| Version | 4.8 |
| Type | Runtime |

#### Affected APIs

- [System.ComponentModel.DataAnnotations.ValidationContext.MemberName](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationContext.MemberName)

<!--

#### Affected APIs

- `P:System.ComponentModel.DataAnnotations.ValidationContext.MemberName`

-->
