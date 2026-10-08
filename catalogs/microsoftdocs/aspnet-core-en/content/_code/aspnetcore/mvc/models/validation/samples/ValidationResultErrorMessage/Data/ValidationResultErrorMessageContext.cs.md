# Source code: aspnetcore/mvc/models/validation/samples/ValidationResultErrorMessage/Data/ValidationResultErrorMessageContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace ValidationResultErrorMessage.Data
{
    public class ValidationResultErrorMessageContext : DbContext
    {
        public ValidationResultErrorMessageContext(DbContextOptions<ValidationResultErrorMessageContext> options)
            : base(options)
        {
        }

        public DbSet<ValidationResultErrorMessage.Models.Contact> Contact { get; set; } = default!;
    }
}

```
