# Source code: aspnetcore/fundamentals/logging/index/samples/2.x/TodoApiSample/Infrastructure/TodoRepository.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using TodoApiSample.Core.Interfaces;
using TodoApiSample.Core.Model;


namespace TodoApiSample.Infrastructure
{
    public class TodoRepository : ITodoRepository
    {
        static ConcurrentDictionary<string, TodoItem> _todos = new ConcurrentDictionary<string, TodoItem>();

        public IEnumerable<TodoItem> GetAll()
        {
            return _todos.Values;
        }

        public void Add(TodoItem item)
        {
            item.Key = Guid.NewGuid().ToString();
            _todos[item.Key] = item;
        }

        public TodoItem Find(string key)
        {
            TodoItem item;
            _todos.TryGetValue(key, out item);
            return item;
        }

        public TodoItem Remove(string key)
        {
            TodoItem item;
            _todos.TryGetValue(key, out item);
            _todos.TryRemove(key, out item);
            return item;
        }

        public void Update(TodoItem item)
        {
            _todos[item.Key] = item;
        }
    }
}

```
