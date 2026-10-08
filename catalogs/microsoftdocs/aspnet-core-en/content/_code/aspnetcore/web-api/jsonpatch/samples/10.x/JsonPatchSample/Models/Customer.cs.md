# Source code: aspnetcore/web-api/jsonpatch/samples/10.x/JsonPatchSample/Models/Customer.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace App.Models;

public class Customer
{
    public string Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public List<Order>? Orders { get; set; }
    public Customer()
    {
        Id = Guid.NewGuid().ToString();
    }
}

```
