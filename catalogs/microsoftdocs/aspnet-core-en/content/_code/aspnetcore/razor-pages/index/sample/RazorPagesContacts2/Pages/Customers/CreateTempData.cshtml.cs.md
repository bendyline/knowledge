# Source code: aspnetcore/razor-pages/index/sample/RazorPagesContacts2/Pages/Customers/CreateTempData.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorPagesContacts.Data;

namespace RazorPagesContacts.Pages.Customers
{
    public class CreateTempDataModel : PageModel
    {
        private readonly AppDbContext _db;

        public CreateTempDataModel(AppDbContext db)
        {
            _db = db;
        }

        [BindProperty]
        public Customer Customer { get; set; }

        [TempData]
        public string Message { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _db.Customers.Add(Customer);
            await _db.SaveChangesAsync();
            Message = "Cust ID = " + Customer.Id.ToString();
            return RedirectToPage("Index");
        }
    }
}
```
