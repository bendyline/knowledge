# Source code: aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs

Complete source file; linked examples may select a region or line range.

```
namespace BookStoreApi.Models;

public class BookStoreDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string BooksCollectionName { get; set; } = null!;
}
```
