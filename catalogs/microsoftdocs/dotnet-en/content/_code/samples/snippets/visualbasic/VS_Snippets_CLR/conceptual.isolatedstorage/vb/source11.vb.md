# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source11.vb

Complete source file; linked examples may select a region or line range.

```
'<snippet16>
Imports System.IO.IsolatedStorage

Class UserDomainAssembly_IsoStorage
    Public Shared Sub Main()
        SnippetA()
        SnippetB()
    End Sub

    Public Shared Sub SnippetA()
        '<snippet17>
        Dim isoFile As IsolatedStorageFile = _
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User Or _
                IsolatedStorageScope.Assembly, Nothing, Nothing)
        '</snippet17>
    End Sub

    Public Shared Sub SnippetB()
        '<snippet18>
        Dim isoFile As IsolatedStorageFile = _
            IsolatedStorageFile.GetUserStoreForAssembly()
        '</snippet18>
    End Sub
End Class
'</snippet16>

```
