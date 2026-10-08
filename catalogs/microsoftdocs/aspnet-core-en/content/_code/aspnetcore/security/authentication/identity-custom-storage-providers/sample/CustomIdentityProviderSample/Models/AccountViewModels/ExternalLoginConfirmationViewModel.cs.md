# Source code: aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample/Models/AccountViewModels/ExternalLoginConfirmationViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CustomIdentityProviderSample.Models.AccountViewModels
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}

```
