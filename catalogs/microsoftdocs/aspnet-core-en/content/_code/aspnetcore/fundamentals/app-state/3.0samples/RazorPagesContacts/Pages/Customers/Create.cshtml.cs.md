# Source code: aspnetcore/fundamentals/app-state/3.0samples/RazorPagesContacts/Pages/Customers/Create.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorPagesContacts.Data;
using RazorPagesContacts.Models;
using System.Threading.Tasks;

namespace RazorPagesContacts.Pages.Customers
{
    #region snippet
    public class CreateModel : PageModel
    {
        private readonly RazorPagesContactsContext _context;

        public CreateModel(RazorPagesContactsContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [TempData]
        public string Message { get; set; }

        [BindProperty]
        public Customer Customer { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Customer.Add(Customer);
            await _context.SaveChangesAsync();
            Message = $"Customer {Customer.Name} added";

            return RedirectToPage("./IndexPeek");
        }
    }
    #endregion
}
```
