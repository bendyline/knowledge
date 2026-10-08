### ListBoxItem IsSelected binding issue with ObservableCollection&lt;T&gt;.Move

#### Details

Calling [System.Collections.ObjectModel.ObservableCollection%601.Move(System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ObservableCollection%25601.Move(System.Int32%2CSystem.Int32)) or [System.Collections.ObjectModel.ObservableCollection%601.MoveItem(System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ObservableCollection%25601.MoveItem(System.Int32%2CSystem.Int32)) on a collection bound to a [System.Windows.Controls.ListBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ListBox) with items selected can lead to erratic behavior with future selection or unselection of [System.Windows.Controls.ListBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ListBox) items.

#### Suggestion

Calling [System.Collections.ObjectModel.Collection%601.Remove(%600)](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.Collection%25601.Remove(%25600)) and [System.Collections.ObjectModel.Collection%601.Insert(System.Int32,%600)](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.Collection%25601.Insert(System.Int32%2C%25600)) instead of [System.Collections.ObjectModel.ObservableCollection%601.Move(System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ObservableCollection%25601.Move(System.Int32%2CSystem.Int32)) will work around this issue. Alternatively, this issue has been fixed in the .NET Framework 4.6 and may be addressed by upgrading to that version of the .NET Framework.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Collections.ObjectModel.ObservableCollection%601.Move(System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ObservableCollection%25601.Move(System.Int32%2CSystem.Int32))
- [System.Collections.ObjectModel.ObservableCollection%601.MoveItem(System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ObservableCollection%25601.MoveItem(System.Int32%2CSystem.Int32))

<!--

#### Affected APIs

- ``M:System.Collections.ObjectModel.ObservableCollection`1.Move(System.Int32,System.Int32)``
- ``M:System.Collections.ObjectModel.ObservableCollection`1.MoveItem(System.Int32,System.Int32)``

-->
