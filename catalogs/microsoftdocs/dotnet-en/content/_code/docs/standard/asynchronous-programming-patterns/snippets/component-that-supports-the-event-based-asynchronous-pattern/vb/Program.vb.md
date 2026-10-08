# Source code: docs/standard/asynchronous-programming-patterns/snippets/component-that-supports-the-event-based-asynchronous-pattern/vb/Program.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Windows.Forms

Module Program
    <STAThread>
    Sub Main(args As String())
        Application.SetHighDpiMode(HighDpiMode.SystemAware)
        Application.EnableVisualStyles()
        Application.SetCompatibleTextRenderingDefault(False)
        Application.Run(New Form1())
    End Sub
End Module

```
