# Source code: aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample/Services/ISmsSender.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomIdentityProviderSample.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}

```
