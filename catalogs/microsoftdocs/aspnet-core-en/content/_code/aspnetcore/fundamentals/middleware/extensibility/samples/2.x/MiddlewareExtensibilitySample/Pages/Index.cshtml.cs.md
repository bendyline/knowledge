# Source code: aspnetcore/fundamentals/middleware/extensibility/samples/2.x/MiddlewareExtensibilitySample/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MiddlewareExtensibilitySample.Data;
using MiddlewareExtensibilitySample.Models;

namespace MiddlewareExtensibilitySample.Pages
{
    public class IndexModel : PageModel
    {
        private readonly AppDbContext _db;

        public IndexModel(AppDbContext db)
        {
            _db = db;
        }

        public List<Request> Requests { get; private set; }

        public async Task OnGetAsync()
        {
            Requests = await _db.Requests.ToListAsync();
        }
    }
}

```
