# Source code: samples/core/Testing/BusinessLogic/IBloggingRepository.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EF.Testing.BusinessLogic;

#region IBloggingRepository
public interface IBloggingRepository
{
    Task<Blog> GetBlogByNameAsync(string name);

    IAsyncEnumerable<Blog> GetAllBlogsAsync();

    void AddBlog(Blog blog);

    Task SaveChangesAsync();
}
#endregion

```
