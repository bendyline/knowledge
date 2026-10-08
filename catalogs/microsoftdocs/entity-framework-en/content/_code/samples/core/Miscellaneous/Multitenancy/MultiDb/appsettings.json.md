# Source code: samples/core/Miscellaneous/Multitenancy/MultiDb/appsettings.json

Complete source file; linked examples may select a region or line range.

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "TenantA": "Data Source=tenantacontacts.sqlite",
    "TenantB": "Data Source=tenantbcontacts.sqlite"
  },
  "AllowedHosts": "*"
}

```
