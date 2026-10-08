
## SQL Logging of Entity Framework Core

Logging configuration is commonly provided by the `Logging` section of `appsettings.{Environment}.json` files. To log SQL statements, add `"Microsoft.EntityFrameworkCore.Database.Command": "Information"` to the `appsettings.Development.json` file:

[Code example (complete source file; reference: \~/includes/sql-log/appsettings.json?highlight=10)](../../_code/aspnetcore/includes/sql-log/appsettings.json.md)

With the preceding JSON, SQL statements are displayed on the command line and in the Visual Studio output window.

For more information, see the following resources:

* [fundamentals/logging/index#configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23configuration)
* [ASP.NET template disables EF Core SQL logging by default (`dotnet/aspnetcore` #32977)](https://github.com/dotnet/aspnetcore/issues/32977)
