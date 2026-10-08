### ObsoleteAttribute exports as both ObsoleteAttribute and DeprecatedAttribute in WinMD scenarios

#### Details

When you create a Windows Metadata library (.winmd file), the [System.ObsoleteAttribute](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute) attribute is exported as both [System.ObsoleteAttribute](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute) and [Windows.Foundation.DeprecatedAttribute](https://learn.microsoft.com/uwp/api/windows.foundation.metadata.deprecatedattribute).

#### Suggestion

Recompilation of existing source code that uses the [System.ObsoleteAttribute](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute) attribute may generate warnings when consuming that code from C++/CX or JavaScript.We do not recommend applying both [System.ObsoleteAttribute](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute) and [Windows.Foundation.DeprecatedAttribute](https://learn.microsoft.com/uwp/api/windows.foundation.metadata.deprecatedattribute) to code in managed assemblies; it may result in build warnings.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5.1 |
| Type | Retargeting |
