# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/ViewModels/RegisterAddressViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace FormsTagHelper.ViewModels
{ 
    public class RegisterAddressViewModel
    {
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }

        public AddressViewModel Address { get; set; }
    }
}


```
