# Source code: aspnetcore/web-api/http-repl/samples/SwaggerApp/Models/Person.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace SwaggerApp.Models
{
    public class Person
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}

```
