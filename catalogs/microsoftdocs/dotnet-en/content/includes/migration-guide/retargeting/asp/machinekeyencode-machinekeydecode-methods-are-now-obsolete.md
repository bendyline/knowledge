### MachineKey.Encode and MachineKey.Decode methods are now obsolete

#### Details

These methods are now obsolete. Compilation of code that calls these methods produces a compiler warning.

#### Suggestion

The recommended alternatives are [System.Web.Security.MachineKey.Protect(System.Byte\[\],System.String\[\])](https://learn.microsoft.com/search/?terms=System.Web.Security.MachineKey.Protect(System.Byte%5B%5D%2CSystem.String%5B%5D)) and [System.Web.Security.MachineKey.Unprotect(System.Byte\[\],System.String\[\])](https://learn.microsoft.com/search/?terms=System.Web.Security.MachineKey.Unprotect(System.Byte%5B%5D%2CSystem.String%5B%5D)). Alternatively, the build warnings can be suppressed, or they can be avoided by using an older compiler. The APIs are still supported.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Retargeting |

#### Affected APIs

- [System.Web.Security.MachineKey.Encode(System.Byte\[\],System.Web.Security.MachineKeyProtection)](https://learn.microsoft.com/search/?terms=System.Web.Security.MachineKey.Encode(System.Byte%5B%5D%2CSystem.Web.Security.MachineKeyProtection))
- [System.Web.Security.MachineKey.Decode(System.String,System.Web.Security.MachineKeyProtection)](https://learn.microsoft.com/search/?terms=System.Web.Security.MachineKey.Decode(System.String%2CSystem.Web.Security.MachineKeyProtection))
