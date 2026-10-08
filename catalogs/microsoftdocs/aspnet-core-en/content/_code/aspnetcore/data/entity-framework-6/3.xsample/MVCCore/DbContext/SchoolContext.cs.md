# Source code: aspnetcore/data/entity-framework-6/3.xsample/MVCCore/DbContext/SchoolContext.cs

Complete source file; linked examples may select a region or line range.

```
using ContosoUniversity.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ContosoUniversity
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(string connString) : base(connString)
        {
        }

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
