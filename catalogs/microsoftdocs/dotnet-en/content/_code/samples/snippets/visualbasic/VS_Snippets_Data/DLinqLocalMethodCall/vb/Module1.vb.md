# Source code: samples/snippets/visualbasic/VS_Snippets_Data/DLinqLocalMethodCall/vb/Module1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Data.Linq
Imports System.Data.Linq.Mapping
Imports System.Linq



Module Module1

    Sub Main()
        Dim db As New Northwnd("")

        ' <Snippet1>
        ' Query 1.
        Dim q0 = _
            From ord In db.Orders _
            Where ord.EmployeeID = 9 _
            Select ord

        For Each ordObj In q0
            Console.WriteLine("{0}, {1}", ordObj.OrderID, _
                ordObj.ShipVia.Value)
        Next
        ' </Snippet1>


    End Sub

End Module

```
