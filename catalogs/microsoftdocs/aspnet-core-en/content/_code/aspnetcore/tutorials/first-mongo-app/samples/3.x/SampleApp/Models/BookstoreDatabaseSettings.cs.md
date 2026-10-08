# Source code: aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/BookstoreDatabaseSettings.cs

Complete source file; linked examples may select a region or line range.

```
namespace BooksApi.Models
{
    public class BookstoreDatabaseSettings : IBookstoreDatabaseSettings
    {
        public string BooksCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IBookstoreDatabaseSettings
    {
        string BooksCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}

```
