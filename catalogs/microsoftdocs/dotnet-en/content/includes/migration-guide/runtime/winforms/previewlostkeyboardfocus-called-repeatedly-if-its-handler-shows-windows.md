### PreviewLostKeyboardFocus is called repeatedly if its handler shows a Windows Forms message box

#### Details

Beginning in the .NET Framework 4.5, calling [System.Windows.Forms.MessageBox.Show%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MessageBox.Show%252A) from a [System.Windows.UIElement.PreviewLostKeyboardFocus](https://learn.microsoft.com/search/?terms=System.Windows.UIElement.PreviewLostKeyboardFocus) handler will cause the handler to re-fire when the message box is closed, potentially resulting in an infinite loop of message boxes.

#### Suggestion

There are two options to work around this issue:

- It may be avoided by calling [System.Windows.MessageBox.Show%2A](https://learn.microsoft.com/search/?terms=System.Windows.MessageBox.Show%252A) instead of [System.Windows.Forms.MessageBox.Show%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MessageBox.Show%252A).
- It may be avoided by showing the message box from a [System.Windows.UIElement.LostKeyboardFocus](https://learn.microsoft.com/search/?terms=System.Windows.UIElement.LostKeyboardFocus) event handler (as opposed to a [System.Windows.UIElement.PreviewLostKeyboardFocus](https://learn.microsoft.com/search/?terms=System.Windows.UIElement.PreviewLostKeyboardFocus) event handler).

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.ContentElement.PreviewLostKeyboardFocus](https://learn.microsoft.com/search/?terms=System.Windows.ContentElement.PreviewLostKeyboardFocus)
- [System.Windows.IInputElement.PreviewLostKeyboardFocus](https://learn.microsoft.com/search/?terms=System.Windows.IInputElement.PreviewLostKeyboardFocus)
- [System.Windows.UIElement.PreviewLostKeyboardFocus](https://learn.microsoft.com/search/?terms=System.Windows.UIElement.PreviewLostKeyboardFocus)
- [System.Windows.UIElement3D.PreviewLostKeyboardFocus](https://learn.microsoft.com/search/?terms=System.Windows.UIElement3D.PreviewLostKeyboardFocus)

<!--

#### Affected APIs

- `E:System.Windows.ContentElement.PreviewLostKeyboardFocus`
- `E:System.Windows.IInputElement.PreviewLostKeyboardFocus`
- `E:System.Windows.UIElement.PreviewLostKeyboardFocus`
- `E:System.Windows.UIElement3D.PreviewLostKeyboardFocus`

-->
