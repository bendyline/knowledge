# Source code: samples/core/Miscellaneous/Logging/Logging/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Threading.Tasks;

namespace EFLogging;

public class Program
{
    public static async Task Main()
    {
        using (var db = new BloggingContext())
        {
            await db.Database.EnsureCreatedAsync();
            db.Blogs.Add(new Blog { Url = "http://sample.com" });
            await db.SaveChangesAsync();
        }

        using (var db = new BloggingContext())
        {
            foreach (var blog in db.Blogs)
            {
                Console.WriteLine(blog.Url);
            }
        }

        using (var db = new BloggingContextWithFiltering())
        {
            await db.Database.EnsureCreatedAsync();
            db.Blogs.Add(new Blog { Url = "http://sample.com" });
            await db.SaveChangesAsync();
        }

        using (var db = new BloggingContextWithFiltering())
        {
            foreach (var blog in db.Blogs)
            {
                Console.WriteLine(blog.Url);
            }
        }
    }
}

```
