# Source code: samples/core/Performance/AspNetContextPoolingWithState/Tenant.cs

Complete source file; linked examples may select a region or line range.

```
namespace Performance.AspNetContextPoolingWithState;

public class Tenant : ITenant
{
    public Tenant(int tenantId)
        => TenantId = tenantId;

    public int TenantId { get; set; }
}
```
