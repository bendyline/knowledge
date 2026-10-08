# Source code: samples/core/Miscellaneous/Multitenancy/Common/ITenantService.cs

Complete source file; linked examples may select a region or line range.

```
namespace Common
{
    public interface ITenantService
    {
        string Tenant { get; }

        void SetTenant(string tenant);

        string[] GetTenants();

        event TenantChangedEventHandler OnTenantChanged;
    }
}

```
