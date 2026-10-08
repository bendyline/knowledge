# Source code: aspnetcore/fundamentals/minimal-apis/7.0-samples/todo-group/appsettings.Development.json

Complete source file; linked examples may select a region or line range.

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "Authentication": {
    "Schemes": {
      "Bearer": {
        "ValidAudiences": [
          "http://localhost:5000"
        ],
        "ValidIssuer": "dotnet-user-jwts"
      }
    }
  }
}
```
