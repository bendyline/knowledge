# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source10.vb

Complete source file; linked examples may select a region or line range.

```
'<snippet13>
Imports System.IO.IsolatedStorage

Class UserDomainAssembly_IsoStorage
    Public Shared Sub Main()
        SnippetA()
        SnippetB()
    End Sub

    Public Shared Sub SnippetA()
        '<snippet14>
        Dim isoFile As IsolatedStorageFile = _
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User Or _
                IsolatedStorageScope.Domain Or _
                IsolatedStorageScope.Assembly, Nothing, Nothing)
        '</snippet14>
    End Sub

    Public Shared Sub SnippetB()
        '<snippet15>
        Dim isoFile As IsolatedStorageFile = _
            IsolatedStorageFile.GetUserStoreForDomain()
        '</snippet15>
    End Sub
End Class
'</snippet13>

```
