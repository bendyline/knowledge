# Source code: aspnetcore/mvc/models/model-binding/samples/3.x/ModelBindingSample/Models/Pet.cs

Complete source file; linked examples may select a region or line range.

```
namespace WebApiSample.DataAccess.Models
{
    public class Pet
    {
        public int Id { get; set; }

        public string Breed { get; set; }
        public string Name { get; set; }

        public PetType PetType { get; set; }
    }

    public enum PetType
    {
        Dog = 0,
        Cat = 1
    }
}

```
