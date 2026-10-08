# Source code: samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks Data.DataTableRelation/VB/source.vb

Complete source file; linked examples may select a region or line range.

```
Option Explicit On
Option Strict On

Imports System.Data


Module Module1

    Sub Main()
        Dim customerOrders As New DataSet()

        ' <Snippet1>
        Dim customerOrdersRelation As DataRelation = _
           customerOrders.Relations.Add("CustOrders", _
           customerOrders.Tables("Customers").Columns("CustomerID"), _
           customerOrders.Tables("Orders").Columns("CustomerID"))

        Dim custRow, orderRow As DataRow

        For Each custRow In customerOrders.Tables("Customers").Rows
            Console.WriteLine("Customer ID:" & custRow("CustomerID").ToString())

            For Each orderRow In custRow.GetChildRows(customerOrdersRelation)
                Console.WriteLine(orderRow("OrderID").ToString())
            Next
        Next
        ' </Snippet1>
    End Sub

End Module

```
