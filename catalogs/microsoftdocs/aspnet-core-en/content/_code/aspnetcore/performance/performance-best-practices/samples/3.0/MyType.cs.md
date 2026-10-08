# Source code: aspnetcore/performance/performance-best-practices/samples/3.0/MyType.cs

Complete source file; linked examples may select a region or line range.

```

using Microsoft.AspNetCore.Http;
using System;

namespace performance_best_practices
{
    #region snippet1
    public class MyBadType
    {
        private readonly HttpContext _context;
        public MyBadType(IHttpContextAccessor accessor)
        {
            _context = accessor.HttpContext;
        }

        public void CheckAdmin()
        {
            if (!_context.User.IsInRole("admin"))
            {
                throw new UnauthorizedAccessException("The current user isn't an admin");
            }
        }
    }
    #endregion
    #region snippet2
    public class MyGoodType
    {
        private readonly IHttpContextAccessor _accessor;
        public MyGoodType(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public void CheckAdmin()
        {
            var context = _accessor.HttpContext;
            if (context != null && !context.User.IsInRole("admin"))
            {
                throw new UnauthorizedAccessException("The current user isn't an admin");
            }
        }
    }
    #endregion
}

```
