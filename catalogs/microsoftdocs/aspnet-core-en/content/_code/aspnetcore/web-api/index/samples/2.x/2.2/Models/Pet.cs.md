# Source code: aspnetcore/web-api/index/samples/2.x/2.2/Models/Pet.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace WebApiSample.Models
{
    public class Pet
    {
        public int Id { get; set; }

        [Required]
        public string Breed { get; set; }

        public string Name { get; set; }

        [Required]
        public PetType PetType { get; set; }
    }

    public enum PetType
    {
        Dog = 0,
        Cat = 1
    }
}

```
