# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/Helper/MyDebug.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics;
using System.Reflection;

namespace FiltersSample.Helper
{
    public static class MyDebug
    {
        public static void Write(MethodBase m, string path)
        {
            Debug.WriteLine(m.ReflectedType.Name + "." + m.Name + " " +
                path);
        }
    }
}

```
