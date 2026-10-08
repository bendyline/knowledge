# Source code: samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.conflictmodeenumeration/vb/module1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Data.Linq
Imports System.Data.Linq.Mapping

Module Module1

    Sub Main()
        ' <Snippet1>
        Dim db As New Northwnd("...")

        ' Create, update, delete code.

        db.SubmitChanges(ConflictMode.FailOnFirstConflict)
        ' or
        db.SubmitChanges(ConflictMode.ContinueOnConflict)
        ' </Snippet1>


        Console.ReadLine()

    End Sub



End Module

```
