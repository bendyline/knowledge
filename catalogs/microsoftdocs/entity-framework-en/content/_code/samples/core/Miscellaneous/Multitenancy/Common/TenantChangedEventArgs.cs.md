# Source code: samples/core/Miscellaneous/Multitenancy/Common/TenantChangedEventArgs.cs

Complete source file; linked examples may select a region or line range.

```
namespace Common
{
    public class TenantChangedEventArgs : EventArgs
    {
        public TenantChangedEventArgs(string? oldTenant, string newTenant)
        {
            OldTenant = oldTenant;
            NewTenant = newTenant;
        }

        public string? OldTenant { get; private set; }

        public string NewTenant { get; private set; }
    }
}

```
