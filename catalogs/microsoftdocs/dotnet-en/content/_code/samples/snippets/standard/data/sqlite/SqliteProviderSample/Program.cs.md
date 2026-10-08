# Source code: samples/snippets/standard/data/sqlite/SqliteProviderSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Data.Sqlite;
using System;

namespace SqliteProviderSample
{
    class Program
    {
        static void Main()
        {
            SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());

            using var connection = new SqliteConnection();
            Console.WriteLine($"System SQLite version: {connection.ServerVersion}");
        }
    }
}
```
