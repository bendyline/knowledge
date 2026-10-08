# Source code: aspnetcore/common/samples/WebApplication1/Services/ISmsSender.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}

```
