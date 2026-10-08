# Source code: aspnetcore/fundamentals/logging/index/samples/3.x/TodoApiDTO/Models/MyUtil.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;
using System.Linq;

namespace TodoApi.Models
{
    #region snippet
    public static class MyUtil
    {
        public static void SeedDBifEmpty(TodoContext context, ILogger _logger)
        {
            if (context.TodoItems.Any())
            {
                _logger.LogInformation(MyLogEvents.GenerateItems, 
                                       "Generating sample items.");

                for (int i=0; i<5; i++)
                {
                    context.TodoItems.Add( new TodoItem() { Name = "Item " + i });
                }
            }
        }
    }
    #endregion
}

```
