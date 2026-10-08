# Source code: samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks SqlNotification.Perms/CS/source.cs

Complete source file; linked examples may select a region or line range.

```
using System.Security.Permissions;
using System.Data.SqlClient;

class Program
{
    static void Main()
    {
    }

    // <Snippet1>
    // Code requires directives to
    // System.Security.Permissions and
    // System.Data.SqlClient

    private bool CanRequestNotifications()
    {
        SqlClientPermission permission =
            new SqlClientPermission(
            PermissionState.Unrestricted);
        try
        {
            permission.Demand();
            return true;
        }
        catch (System.Exception)
        {
            return false;
        }
    }
    // </Snippet1>
}

```
