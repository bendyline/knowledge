# Source code: samples/core/Miscellaneous/Multitenancy/SingleDbSingleTable/Pages/Index.razor

Complete source file; linked examples may select a region or line range.

```
@page "/"
@using Common;
@using Microsoft.EntityFrameworkCore
@using SingleDbSingleTable.Data
@inject ITenantService Service
@inject IDbContextFactory<ContactContext> Factory

<PageTitle>Contacts for @Service.Tenant</PageTitle>

<ContactList FetchContacts="RefreshContacts"/>

@code
{
    private List<Contact> RefreshContacts()
    {
        var list = Factory.CreateDbContext();        
        return new List<Contact>(list.Contacts);
    }
}
```
