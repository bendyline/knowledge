# Source code: aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Attendee.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TagHelpersBuiltIn.Pages
{
    public class AttendeeModel : PageModel
    {
        public void OnGet()
        {
            ViewData["AttendeeId"] = null;
        }

        #region snippet_OnGetProfileHandler
        public void OnGetProfile(int attendeeId)
        {
            ViewData["AttendeeId"] = attendeeId;

            // code omitted for brevity
        }
        #endregion
    }
}
```
