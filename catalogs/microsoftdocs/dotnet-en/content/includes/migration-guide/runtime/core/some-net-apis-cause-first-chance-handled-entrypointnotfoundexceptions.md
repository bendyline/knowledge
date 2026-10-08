### Some .NET APIs cause first chance (handled) EntryPointNotFoundExceptions

#### Details

In the .NET Framework 4.5, a small number of .NET methods began throwing first chance [System.EntryPointNotFoundException](https://learn.microsoft.com/search/?terms=System.EntryPointNotFoundException)s. These exceptions were handled within the .NET Framework, but could break test automation that did not expect the first chance exceptions. These same APIs break some ApiVerifier scenarios when HighVersionLie is enabled.

#### Suggestion

This bug can be avoided by upgrading to .NET Framework 4.5.1. Alternatively, test automation can be updated to not break on first-chance [System.EntryPointNotFoundException](https://learn.microsoft.com/search/?terms=System.EntryPointNotFoundException) exceptions.

|  | Value |
| :--- | :--- |
| **Scope** | Edge |
| **Version** | 4.5 |
| **Type** | Runtime |

#### Affected APIs

- [System.Diagnostics.Debug.Assert(System.Boolean)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Assert(System.Boolean))
- [System.Diagnostics.Debug.Assert(System.Boolean,System.String)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Assert(System.Boolean%2CSystem.String))
- [System.Diagnostics.Debug.Assert(System.Boolean,System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Assert(System.Boolean%2CSystem.String%2CSystem.String))
- [System.Diagnostics.Debug.Assert(System.Boolean,System.String,System.String,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Assert(System.Boolean%2CSystem.String%2CSystem.String%2CSystem.Object%5B%5D))
- [System.Xml.Serialization.XmlSerializer.%23ctor(System.Type)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.%2523ctor(System.Type))

<!--

#### Affected APIs

- `M:System.Diagnostics.Debug.Assert(System.Boolean)`
- `M:System.Diagnostics.Debug.Assert(System.Boolean,System.String)`
- `M:System.Diagnostics.Debug.Assert(System.Boolean,System.String,System.String)`
- `M:System.Diagnostics.Debug.Assert(System.Boolean,System.String,System.String,System.Object[])`
- `M:System.Xml.Serialization.XmlSerializer.#ctor(System.Type)`

-->
