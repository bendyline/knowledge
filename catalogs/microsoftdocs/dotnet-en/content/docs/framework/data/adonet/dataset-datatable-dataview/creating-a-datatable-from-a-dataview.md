---
description: "Learn more about creating a DataTable from a DataView by calling DataView.ToTable to copy all or some of the data."
title: "Creating a DataTable from a DataView"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.custom: sfi-ropc-nochange
---
# Create a DataTable from a DataView

Once you've retrieved data from a data source,and have filled a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) with the data, you might want to sort, filter, or otherwise limit the returned data without retrieving it again. The [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) class makes this possible. In addition, if you need to create a new [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) from the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), you can use the [System.Data.DataView.ToTable*](https://learn.microsoft.com/search/?terms=System.Data.DataView.ToTable*) method to copy all the rows and columns, or a subset of the data, into a new [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable). The [System.Data.DataView.ToTable*](https://learn.microsoft.com/search/?terms=System.Data.DataView.ToTable*) method provides overloads to:

- Create a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) containing columns that are a subset of the columns in the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView).
- Create a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) that includes only distinct rows from the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), analogously to the `DISTINCT` keyword in Transact-SQL.

## Example

 The following console application example creates a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) that contains data from the **Person.Contact** table in the **AdventureWorks** sample database. Next, the example creates a sorted and filtered [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) based on the [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable). After displaying the contents of the [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) and the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), the example creates a new [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) from the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) by calling the [System.Data.DataView.ToTable*](https://learn.microsoft.com/search/?terms=System.Data.DataView.ToTable*) method, selecting only a subset of the available columns. Finally, the example displays the contents of the new [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable).

```vb
Private Sub DemonstrateDataView()
    ' Retrieve a DataTable from the AdventureWorks sample database.
    ' connectionString is assumed to be a valid connection string.
    Dim adapter As New SqlDataAdapter( _
       "SELECT FirstName, LastName, EmailAddress FROM Person.Contact WHERE FirstName LIKE 'Mich%'", connectionString)
    Dim table As New DataTable

    adapter.Fill(table)
    Console.WriteLine("Original table name: " & table.TableName)
    ' Print current table values.
    PrintTableOrView(table, "Current Values in Table")

    ' Now create a DataView based on the DataTable.
    ' Sort and filter the data.
    Dim view As DataView = table.DefaultView
    view.Sort = "LastName, FirstName"
    view.RowFilter = "LastName > 'M'"
    PrintTableOrView(view, "Current Values in View")

    ' Create a new DataTable based on the DataView,
    ' requesting only two columns with distinct values
    ' in the columns.
    Dim newTable As DataTable = view.ToTable("UniqueLastNames", True, "FirstName", "LastName")
    PrintTableOrView(newTable, "Table created from DataView")
    Console.WriteLine("New table name: " & newTable.TableName)

    Console.WriteLine("Press any key to continue.")
    Console.ReadKey()
    End Sub

Private Sub PrintTableOrView(ByVal dv As DataView, ByVal label As String)
    Dim sw As System.IO.StringWriter
    Dim output As String
    Dim table As DataTable = dv.Table

    Console.WriteLine(label)

    ' Loop through each row in the view.
    For Each rowView As DataRowView In dv
        sw = New System.IO.StringWriter

        ' Loop through each column.
        For Each col As DataColumn In table.Columns
            ' Output the value of each column's data.
            sw.Write(rowView(col.ColumnName).ToString() & ", ")
        Next
        output = sw.ToString
        ' Trim off the trailing ", ", so the output looks correct.
        If output.Length > 2 Then
            output = output.Substring(0, output.Length - 2)
        End If
        ' Display the row in the console window.
        Console.WriteLine(output)
    Next
    Console.WriteLine()
End Sub

Private Sub PrintTableOrView(ByVal table As DataTable, ByVal label As String)
    Dim sw As System.IO.StringWriter
    Dim output As String

    Console.WriteLine(label)

    ' Loop through each row in the table.
    For Each row As DataRow In table.Rows
        sw = New System.IO.StringWriter
        ' Loop through each column.
        For Each col As DataColumn In table.Columns
            ' Output the value of each column's data.
            sw.Write(row(col).ToString() & ", ")
        Next
        output = sw.ToString
        ' Trim off the trailing ", ", so the output looks correct.
        If output.Length > 2 Then
            output = output.Substring(0, output.Length - 2)
        End If
        ' Display the row in the console window.
        Console.WriteLine(output)
    Next
    Console.WriteLine()
    End Sub
End Module
```

```csharp
private static void DemonstrateDataView()
{
// Retrieve a DataTable from the AdventureWorks sample database.
// connectionString is assumed to be a valid connection string.
SqlDataAdapter adapter = new SqlDataAdapter(
    "SELECT FirstName, LastName, EmailAddress " +
    "FROM Person.Contact WHERE FirstName LIKE 'Mich%'",
       GetConnectionString());
DataTable table = new DataTable();

adapter.Fill(table);
Console.WriteLine("Original table name: " + table.TableName);
// Print current table values.
PrintTableOrView(table, "Current Values in Table");

// Now create a DataView based on the DataTable.
// Sort and filter the data.
DataView view = table.DefaultView;
view.Sort = "LastName, FirstName";
view.RowFilter = "LastName > 'M'";
PrintTableOrView(view, "Current Values in View");

// Create a new DataTable based on the DataView,
// requesting only two columns with distinct values
// in the columns.
DataTable newTable = view.ToTable("UniqueLastNames",
     true, "FirstName", "LastName");
PrintTableOrView(newTable, "Table created from DataView");
Console.WriteLine("New table name: " + newTable.TableName);

Console.WriteLine("Press any key to continue.");
Console.ReadKey();
}

private static void PrintTableOrView(DataView dv, string label)
{
System.IO.StringWriter sw;
string output;
DataTable table = dv.Table;

Console.WriteLine(label);

// Loop through each row in the view.
foreach (DataRowView rowView in dv)
{
    sw = new System.IO.StringWriter();

    // Loop through each column.
    foreach (DataColumn col in table.Columns)
    {
        // Output the value of each column's data.
        sw.Write(rowView[col.ColumnName].ToString() + ", ");
    }
    output = sw.ToString();
    // Trim off the trailing ", ", so the output looks correct.
    if (output.Length > 2)
    {
        output = output.Substring(0, output.Length - 2);
    }
    // Display the row in the console window.
    Console.WriteLine(output);
}
Console.WriteLine();
}

private static void PrintTableOrView(DataTable table, string label)
{
System.IO.StringWriter sw;
string output;

Console.WriteLine(label);

// Loop through each row in the table.
foreach (DataRow row in table.Rows)
{
    sw = new System.IO.StringWriter();
    // Loop through each column.
    foreach (DataColumn col in table.Columns)
    {
        // Output the value of each column's data.
        sw.Write(row[col].ToString() + ", ");
    }
    output = sw.ToString();
    // Trim off the trailing ", ", so the output looks correct.
    if (output.Length > 2)
    {
        output = output.Substring(0, output.Length - 2);
    }
    // Display the row in the console window.
    Console.WriteLine(output);
} //
Console.WriteLine();
}
```

## See also

- [System.Data.DataView.ToTable*](https://learn.microsoft.com/search/?terms=System.Data.DataView.ToTable*)
- [DataViews](dataviews.md)
- [ADO.NET Overview](../ado-net-overview.md)
