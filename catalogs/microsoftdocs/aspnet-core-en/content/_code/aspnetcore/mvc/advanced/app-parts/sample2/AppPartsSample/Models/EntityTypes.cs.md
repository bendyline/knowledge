# Source code: aspnetcore/mvc/advanced/app-parts/sample2/AppPartsSample/Models/EntityTypes.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using System.Reflection;

namespace AppPartsSample.Model
{
    #region snippet
    public static class EntityTypes
    {
        public static IReadOnlyList<TypeInfo> Types => new List<TypeInfo>()
        {
            typeof(Sprocket).GetTypeInfo(),
            typeof(Widget).GetTypeInfo(),
        };

        public class Sprocket { }
        public class Widget { }
    }
    #endregion
}

```
