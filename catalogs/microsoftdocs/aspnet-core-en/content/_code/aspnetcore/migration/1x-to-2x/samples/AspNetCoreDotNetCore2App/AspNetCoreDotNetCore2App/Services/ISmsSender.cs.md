# Source code: aspnetcore/migration/1x-to-2x/samples/AspNetCoreDotNetCore2App/AspNetCoreDotNetCore2App/Services/ISmsSender.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreDotNetCore2App.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}

```
