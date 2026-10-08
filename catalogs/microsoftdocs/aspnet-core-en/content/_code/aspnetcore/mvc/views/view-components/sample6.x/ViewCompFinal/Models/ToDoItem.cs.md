# Source code: aspnetcore/mvc/views/view-components/sample6.x/ViewCompFinal/Models/ToDoItem.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace ViewComponentSample.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Priority { get; set; }
        public bool IsDone { get; set; }
    }
}

```
