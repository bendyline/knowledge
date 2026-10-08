# Source code: aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Services/IUserService.cs

Complete source file; linked examples may select a region or line range.

```
namespace ValidationSample.Services
{
    public interface IUserService
    {
        bool VerifyEmail(string email);
        bool VerifyName(string firstName, string lastName);
    }
}

```
