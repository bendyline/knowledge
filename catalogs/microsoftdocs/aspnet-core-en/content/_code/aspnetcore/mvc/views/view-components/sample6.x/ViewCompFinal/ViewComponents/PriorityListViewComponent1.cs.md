# Source code: aspnetcore/mvc/views/view-components/sample6.x/ViewCompFinal/ViewComponents/PriorityListViewComponent1.cs

Complete source file; linked examples may select a region or line range.

```
//#define First
#if First
#region snippet1
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViewComponentSample.Models;

namespace ViewComponentSample.ViewComponents;

public class PriorityListViewComponent : ViewComponent
{
    private readonly ToDoContext db;

    public PriorityListViewComponent(ToDoContext context) => db = context;

    public async Task<IViewComponentResult> InvokeAsync(
                                            int maxPriority, bool isDone)
    {
        var items = await GetItemsAsync(maxPriority, isDone);
        return View(items);
    }

    private Task<List<TodoItem>> GetItemsAsync(int maxPriority, bool isDone)
    {
        return db!.ToDo!.Where(x => x.IsDone == isDone &&
                             x.Priority <= maxPriority).ToListAsync();
    }
}
#endregion
#endif

```
