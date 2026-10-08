# Source code: samples/core/Miscellaneous/Multitenancy/SingleDbSingleTable/Data/MultitenantContact.cs

Complete source file; linked examples may select a region or line range.

```
using Common;

namespace SingleDbSingleTable.Data
{
    public class MultitenantContact : Contact
    {
        public MultitenantContact() { }

        public MultitenantContact(Contact contact, string tenant)
        {
            IsUnicorn = contact.IsUnicorn;
            Name = contact.Name;
            Tenant = tenant;
        }
        public string Tenant { get; set; } = null!;
    }
}

```
