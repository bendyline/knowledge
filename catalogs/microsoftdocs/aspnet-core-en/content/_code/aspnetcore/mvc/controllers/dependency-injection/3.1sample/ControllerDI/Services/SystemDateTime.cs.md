# Source code: aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Services/SystemDateTime.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using ControllerDI.Interfaces;

namespace ControllerDI.Services
{
    #region snippet
    public class SystemDateTime : IDateTime
    {
        public DateTime Now
        {
            get { return DateTime.Now; }
        }
    }
    #endregion
}

```
