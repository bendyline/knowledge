# Source code: aspnetcore/web-api/jsonpatch/samples/3.x/api/Models/Customer.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace JsonPatchSample.Models
{
    public class Customer
    {
        public string CustomerName { get; set; }
        public List<Order> Orders { get; set; }
    }
}

```
