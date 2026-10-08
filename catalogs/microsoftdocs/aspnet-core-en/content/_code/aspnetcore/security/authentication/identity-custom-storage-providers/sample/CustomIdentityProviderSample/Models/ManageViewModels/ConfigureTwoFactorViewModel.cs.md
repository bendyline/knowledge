# Source code: aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample/Models/ManageViewModels/ConfigureTwoFactorViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CustomIdentityProviderSample.Models.ManageViewModels
{
    public class ConfigureTwoFactorViewModel
    {
        public string SelectedProvider { get; set; }

        public ICollection<SelectListItem> Providers { get; set; }
    }
}

```
