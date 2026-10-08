### DoNotSupportSelectAllShortcutInMultilineTextBox compatibility switch not supported

The `Switch.System.Windows.Forms.DoNotSupportSelectAllShortcutInMultilineTextBox` compatibility switch, which was introduced in .NET Framework 4.6.1, is not supported in Windows Forms on .NET Core and .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.6.1, selecting the <kbd>Ctrl</kbd> + <kbd>A</kbd> shortcut key in a [System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox) control selected all text. In .NET Framework 4.6 and previous versions, selecting the <kbd>Ctrl</kbd> + <kbd>A</kbd> shortcut key failed to select all text if the [Textbox.ShortcutsEnabled](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBoxBase.ShortcutsEnabled) and [System.Windows.Forms.TextBox.Multiline](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox.Multiline) properties were both set to `true`. The `Switch.System.Windows.Forms.DoNotSupportSelectAllShortcutInMultilineTextBox` compatibility switch was introduced in .NET Framework 4.6.1 to retain the original behavior. For more information see [System.Windows.Forms.TextBox.ProcessCmdKey%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox.ProcessCmdKey%252A).

In .NET Core and .NET 5.0 and later versions, the `Switch.System.Windows.Forms.DoNotSupportSelectAllShortcutInMultilineTextBox` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- None

<!-- 

#### Affected APIs

- Not detectable via API analysis

-->
