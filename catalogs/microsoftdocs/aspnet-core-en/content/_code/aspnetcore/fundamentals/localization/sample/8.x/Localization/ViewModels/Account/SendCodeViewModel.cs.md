# Source code: aspnetcore/fundamentals/localization/sample/8.x/Localization/ViewModels/Account/SendCodeViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Localization.ViewModels.Account
{
    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }

        public ICollection<SelectListItem> Providers { get; set; }

        public string ReturnUrl { get; set; }

        public bool RememberMe { get; set; }
    }
}

```
