### Calling Items.Refresh on a WPF ListBox, ListView, or DataGrid with items selected can cause duplicate items to appear in the element

#### Details

In the .NET Framework 4.5, calling ListBox.Items.Refresh from code while items are selected in a [System.Windows.Controls.ListBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ListBox) can cause the selected items to be duplicated in the list. A similar issue occurs with [System.Windows.Controls.ListView](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ListView) and [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid). This is fixed in the .NET Framework 4.6.

#### Suggestion

This issue may be worked around by programmatically unselecting items before [System.Windows.Data.CollectionView.Refresh](https://learn.microsoft.com/search/?terms=System.Windows.Data.CollectionView.Refresh) is called and then re-selecting them after the call is completed. Alternatively, this issue has been fixed in the .NET Framework 4.6 and may be addressed by upgrading to that version of the .NET Framework.

|  | Value |
| :--- | :--- |
| **Scope** | Minor |
| **Version** | 4.5 |
| **Type** | Runtime |

#### Affected APIs

- [System.Windows.Data.CollectionView.Refresh](https://learn.microsoft.com/search/?terms=System.Windows.Data.CollectionView.Refresh)

<!--

#### Affected APIs

- `M:System.Windows.Data.CollectionView.Refresh`

-->
