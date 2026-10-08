### "dataAnnotations:dataTypeAttribute:disableRegEx" app setting is on by default in .NET Framework 4.7.2

#### Details

In .NET Framework 4.6.1, an app setting (`dataAnnotations:dataTypeAttribute:disableRegEx`) was introduced that allows users to disable the use of regular expressions in data type attributes (such as [System.ComponentModel.DataAnnotations.EmailAddressAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.EmailAddressAttribute), [System.ComponentModel.DataAnnotations.UrlAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.UrlAttribute), and [System.ComponentModel.DataAnnotations.PhoneAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.PhoneAttribute)). This helps to reduce security vulnerability such as avoiding the possibility of a Denial of Service attack using specific regular expressions.<br/>In .NET Framework 4.6.1, this app setting to disable RegEx usage was set to `false` by default. Starting with .NET Framework 4.7.2, this config switch is set to `true` by default to further reduce secure vulnerability for web applications that target .NET Framework 4.7.2 and above.

#### Suggestion

If you find that regular expressions in your web application do not work after upgrading to .NET Framework 4.7.2, you can update the value of the `dataAnnotations:dataTypeAttribute:disableRegEx` setting to `false` to revert to the previous behavior.

```xml
<configuration>
<appSettings>
...
<add key="dataAnnotations:dataTypeAttribute:disableRegEx" value="false"/>
...
</appSettings>
</configuration>
```

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.7.2 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
