# Source code: aspnetcore/security/authentication/2fa/sample/Web2FA/Services/ISmsSender.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2FA.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}

```
