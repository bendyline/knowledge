# Source code: samples/core/Modeling/BackingFields/FluentAPI/BackingFieldNoProperty.cs

Complete source file; linked examples may select a region or line range.

```
using System.Net.Http;
using Microsoft.EntityFrameworkCore;

namespace EFModeling.BackingFields.FluentAPI.BackingFieldNoProperty;

#region Sample
internal class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>()
            .Property("_validatedUrl");
    }
}

public class Blog
{
    private string _validatedUrl;

    public int BlogId { get; set; }

    public string GetUrl()
    {
        return _validatedUrl;
    }

    public void SetUrl(string url)
    {
        using (var client = new HttpClient())
        {
            var response = client.GetAsync(url).Result;
            response.EnsureSuccessStatusCode();
        }

        _validatedUrl = url;
    }
}
#endregion
```
