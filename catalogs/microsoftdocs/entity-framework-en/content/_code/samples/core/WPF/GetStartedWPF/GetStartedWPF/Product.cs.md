# Source code: samples/core/WPF/GetStartedWPF/GetStartedWPF/Product.cs

Complete source file; linked examples may select a region or line range.

```
namespace GetStartedWPF
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }

        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}

```
