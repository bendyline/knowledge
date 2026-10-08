# Source code: aspnetcore/data/entity-framework-6/sample/EF6/SchoolContext.cs

Complete source file; linked examples may select a region or line range.

```
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using EF6.Models;

namespace EF6
{
    #region snippet_Constructor
    public class SchoolContext : DbContext
    {
        public SchoolContext(string connString) : base(connString)
        {
        }
        #endregion

        public DbSet<Student> Students { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
```
