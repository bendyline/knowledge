# Source code: samples/core/WPF/GetStartedWPF/GetStartedWPF/Category.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace GetStartedWPF
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Product>
            Products
        { get; private set; } =
            new ObservableCollection<Product>();
    }
}

```
