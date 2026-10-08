# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca2227-collection-properties-should-be-read-only_1.vb

Complete source file; linked examples may select a region or line range.

```
Public Class WritableCollection

    ' This property violates rule CA2227.
    ' To fix the code, add the ReadOnly modifier to the property:
    ' ReadOnly Property SomeStrings As ArrayList
    Property SomeStrings As ArrayList

    Sub New()
        SomeStrings = New ArrayList(New String() {"one", "two", "three"})
    End Sub

End Class

Class ViolatingVersusPreferred

    Shared Sub Main2227()
        Dim newCollection As New ArrayList(New String() {"a", "new", "collection"})

        Dim collection As New WritableCollection()

        ' This line of code demonstrates how the entire collection
        ' can be replaced by a property that's not read only.
        collection.SomeStrings = newCollection

        ' If the intent is to replace an entire collection,
        ' implement and/or use the Clear() and AddRange() methods instead.
        collection.SomeStrings.Clear()
        collection.SomeStrings.AddRange(newCollection)
    End Sub

End Class

```
