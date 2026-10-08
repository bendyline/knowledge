### Keytips behavior improved in WPF

#### Details

Keytips behavior has been modified to bring parity with behavior on Microsoft Word and Windows Explorer. By checking whether keytip state is enabled or not in the case of a [System.Windows.Input.KeyEventArgs.SystemKey](https://learn.microsoft.com/search/?terms=System.Windows.Input.KeyEventArgs.SystemKey) (in particular, [System.Windows.Input.Key](https://learn.microsoft.com/search/?terms=System.Windows.Input.Key) or [System.Windows.Input.Key.F11](https://learn.microsoft.com/search/?terms=System.Windows.Input.Key.F11)) being pressed, WPF handles keytip keys appropriately. Keytips now dismiss a menu even when it is opened by mouse.

#### Suggestion

N/A

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.7.2 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
