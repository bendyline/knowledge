# Source code: aspnetcore/mvc/views/display-templates/sample/Pages/Adr2/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using WebAddress.Data;

namespace WebAddress.Pages.Adr2
{
    public class IndexModel : PageModel
    {
        private readonly WebAddress.Data.WebAddressContext _context;

        public IndexModel(WebAddress.Data.WebAddressContext context)
        {
            _context = context;
        }

        public IList<Address> Address { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.Address != null)
            {
                Address = await _context.Address.ToListAsync();
            }
        }
    }
}

```
