# Source code: docs/core/extensions/dependency-injection/snippets/anykey/ICache.cs

Complete source file; linked examples may select a region or line range.

```
namespace AnyKeyExamples;

// <ICache>
public interface ICache
{
    string GetData(string key);
    void SetData(string key, string value);
}
// </ICache>

```
