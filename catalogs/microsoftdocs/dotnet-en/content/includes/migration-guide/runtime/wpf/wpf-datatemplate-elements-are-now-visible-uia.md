### WPF DataTemplate elements are now visible to UIA

#### Details

Previously, [System.Windows.DataTemplate](https://learn.microsoft.com/search/?terms=System.Windows.DataTemplate) elements were invisible to UI Automation. Beginning in 4.5, UI Automation will detect these elements. This is useful in many cases, but can break tests that depend on UIA trees not containing [System.Windows.DataTemplate](https://learn.microsoft.com/search/?terms=System.Windows.DataTemplate) elements.

#### Suggestion

UI Automation tests for this app may need updated to account for the UIA tree now including previously invisible [System.Windows.DataTemplate](https://learn.microsoft.com/search/?terms=System.Windows.DataTemplate) elements. For example, tests that expect some elements to be next to each other may now need to expect previously invisible UIA elements in between. Or tests that rely on certain counts or indexes for UIA elements may need updated with new values.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.DataTemplate.%23ctor](https://learn.microsoft.com/search/?terms=System.Windows.DataTemplate.%2523ctor)
- [System.Windows.DataTemplate.%23ctor(System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.DataTemplate.%2523ctor(System.Object))

<!--

#### Affected APIs

- `M:System.Windows.DataTemplate.#ctor`
- `M:System.Windows.DataTemplate.#ctor(System.Object)`

-->
