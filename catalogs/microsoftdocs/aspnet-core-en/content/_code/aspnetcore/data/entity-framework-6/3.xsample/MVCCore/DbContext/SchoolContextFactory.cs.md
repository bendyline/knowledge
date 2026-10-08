# Source code: aspnetcore/data/entity-framework-6/3.xsample/MVCCore/DbContext/SchoolContextFactory.cs

Complete source file; linked examples may select a region or line range.

```
using System.Data.Entity.Infrastructure;

namespace ContosoUniversity
{
    public class SchoolContextFactory : IDbContextFactory<SchoolContext>
    {
        public SchoolContext Create()
        {
            return new SchoolContext("Server=(localdb)\\mssqllocaldb;Database=EF6MVCCoreExample;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
}

```
