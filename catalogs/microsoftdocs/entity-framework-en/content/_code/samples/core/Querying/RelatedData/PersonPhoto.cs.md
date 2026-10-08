# Source code: samples/core/Querying/RelatedData/PersonPhoto.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFQuerying.RelatedData;

public class PersonPhoto
{
    public int PersonPhotoId { get; set; }
    public string Caption { get; set; }
    public byte[] Photo { get; set; }

    public Person Person { get; set; }
}
```
