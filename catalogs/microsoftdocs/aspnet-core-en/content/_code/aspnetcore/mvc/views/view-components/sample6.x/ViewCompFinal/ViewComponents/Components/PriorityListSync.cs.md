# Source code: aspnetcore/mvc/views/view-components/sample6.x/ViewCompFinal/ViewComponents/Components/PriorityListSync.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using ViewComponentSample.Models;

namespace ViewComponentSample.ViewComponents
{
    public class PriorityListSync : ViewComponent
    {
        private readonly ToDoContext db;

        public PriorityListSync(ToDoContext context)
        {
            db = context;
        }

        public IViewComponentResult Invoke(int maxPriority, bool isDone)
        {
 
            var x = db!.ToDo!.Where(x => x.IsDone == isDone &&
                                  x.Priority <= maxPriority).ToList();
            return View(x);
        }
    }
}

```
