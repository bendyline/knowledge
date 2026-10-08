# Source code: aspnetcore/fundamentals/logging/index/samples/2.x/TodoApiSample/Core/Interfaces/ITodoRepository.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using TodoApiSample.Core.Model;

namespace TodoApiSample.Core.Interfaces
{
    public interface ITodoRepository
    {
        void Add(TodoItem item);
        IEnumerable<TodoItem> GetAll();
        TodoItem Find(string key);
        TodoItem Remove(string key);
        void Update(TodoItem item);
    }
}

```
