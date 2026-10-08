# Source code: samples/core/Miscellaneous/ConfiguringDbContext/WebApp/Controllers/MyController.cs

Complete source file; linked examples may select a region or line range.

```
namespace WebApp.Controllers;

#region MyController
public class MyController
{
    private readonly ApplicationDbContext _context;

    public MyController(ApplicationDbContext context)
    {
        _context = context;
    }
}
#endregion
```
