# Source code: aspnetcore/fundamentals/app-state/samples/2.x/SessionSample/Extensions/SessionExtensions.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace SessionSample
{
    #region snippet1
    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T Get<T>(this ISession session, string key)
        {
            var value = session.GetString(key);

            return value == null ? default(T) : 
                JsonConvert.DeserializeObject<T>(value);
        }
    }
    #endregion
}

```
