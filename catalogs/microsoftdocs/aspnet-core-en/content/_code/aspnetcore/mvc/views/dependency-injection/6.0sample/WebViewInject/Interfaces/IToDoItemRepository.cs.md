# Source code: aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Interfaces/IToDoItemRepository.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewInjectSample.Model;

namespace ViewInjectSample.Interfaces
{
    public interface IToDoItemRepository
    {
        IEnumerable<ToDoItem> List();
    }
}

```
