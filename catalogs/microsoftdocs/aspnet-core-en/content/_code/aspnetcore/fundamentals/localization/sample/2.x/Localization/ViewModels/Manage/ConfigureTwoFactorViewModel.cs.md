# Source code: aspnetcore/fundamentals/localization/sample/2.x/Localization/ViewModels/Manage/ConfigureTwoFactorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Localization.ViewModels.Manage
{
    public class ConfigureTwoFactorViewModel
    {
        public string SelectedProvider { get; set; }

        public ICollection<SelectListItem> Providers { get; set; }
    }
}

```
