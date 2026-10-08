# Source code: aspnetcore/fundamentals/app-state/6.0samples/RazorPagesContacts/Data/RazorPagesContactsContext.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RazorPagesContacts.Models;

namespace RazorPagesContacts.Data
{
    public class RazorPagesContactsContext : DbContext
    {
        public RazorPagesContactsContext (DbContextOptions<RazorPagesContactsContext> options)
            : base(options)
        {
        }

        public DbSet<RazorPagesContacts.Models.Customer> Customer { get; set; }
    }
}

```
