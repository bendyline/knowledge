# Source code: samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbLINQtoSQLHowTos/VB/Form7.vb

Complete source file; linked examples may select a region or line range.

```
Public Class Form7

    Private Sub Form7_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        '<Snippet14>
        Dim db As New northwindDataContext

        Dim minimumOrders = Aggregate cust In db.Customers
                            Where cust.City = "London"
                            Into Min(cust.Orders.Count)

        MsgBox("Minimum Orders from a London Customer: " & minimumOrders)

        Dim maximumOrdersByCountry = From cust In db.Customers
                                     Group By cust.Country
                                       Into MaxOrders = Max(cust.Orders.Count)

        DataGridView1.DataSource = maximumOrdersByCountry
        '</Snippet14>
    End Sub
End Class

```
