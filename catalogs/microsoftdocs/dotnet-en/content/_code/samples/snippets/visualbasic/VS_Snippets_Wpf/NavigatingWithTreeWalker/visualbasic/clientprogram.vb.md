# Source code: samples/snippets/visualbasic/VS_Snippets_Wpf/NavigatingWithTreeWalker/visualbasic/clientprogram.vb

Complete source file; linked examples may select a region or line range.

```
Namespace NavigateWithTreeWalker
	Friend NotInheritable Class Program
		''' <summary>
		''' The main entry point for the application.
		''' </summary>
		Private Sub New()
		End Sub
		<STAThread>
		Shared Sub Main()
			Application.EnableVisualStyles()
			Application.Run(New NavigationWithTreeWalker())
		End Sub
	End Class
End Namespace
```
