# Source code: samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks Data.DataTableAdd/CS/source.cs

Complete source file; linked examples may select a region or line range.

```
using System.Data;
namespace DataTableAddCS;

static class Program
{
    static void Main()
    {
        // <Snippet1>
        DataSet customerOrders = new("CustomerOrders");

        DataTable ordersTable = customerOrders.Tables.Add("Orders");

        DataColumn pkOrderID =
            ordersTable.Columns.Add("OrderID", typeof(int));
        ordersTable.Columns.Add("OrderQuantity", typeof(int));
        ordersTable.Columns.Add("CompanyName", typeof(string));

        ordersTable.PrimaryKey = new DataColumn[] { pkOrderID };
        // </Snippet1>
    }
}

```
