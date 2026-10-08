### BlockingCollection&lt;T&gt;.TryTakeFromAny does not throw anymore

#### Details

If one of the input collections is marked completed, [System.Collections.Concurrent.BlockingCollection%601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection{%600}\[\],%600@)](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%25601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection%7B%25600%7D%5B%5D%2C%25600%40)) no longer returns -1 and [System.Collections.Concurrent.BlockingCollection%601.TakeFromAny(System.Collections.Concurrent.BlockingCollection{%600}\[\],%600@)](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%25601.TakeFromAny(System.Collections.Concurrent.BlockingCollection%7B%25600%7D%5B%5D%2C%25600%40)) no longer throws an exception. This change makes it possible to work with collections when one of the collections is either empty or completed, but the other collection still has items that can be retrieved.

#### Suggestion

If TryTakeFromAny returning -1 or TakeFromAny throwing were used for control-flow purposes in cases of a blocking collection being completed, such code should now be changed to use `.Any(b =&gt; b.IsCompleted)` to detect that condition.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Collections.Concurrent.BlockingCollection%601.TakeFromAny(System.Collections.Concurrent.BlockingCollection{%600}\[\],%600@)](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%25601.TakeFromAny(System.Collections.Concurrent.BlockingCollection%7B%25600%7D%5B%5D%2C%25600%40))
- [System.Collections.Concurrent.BlockingCollection%601.TakeFromAny(System.Collections.Concurrent.BlockingCollection{%600}\[\],%600@,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%25601.TakeFromAny(System.Collections.Concurrent.BlockingCollection%7B%25600%7D%5B%5D%2C%25600%40%2CSystem.Threading.CancellationToken))
- [System.Collections.Concurrent.BlockingCollection%601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection{%600}\[\],%600@)](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%25601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection%7B%25600%7D%5B%5D%2C%25600%40))
- [System.Collections.Concurrent.BlockingCollection%601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection{%600}\[\],%600@,System.Int32)](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%25601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection%7B%25600%7D%5B%5D%2C%25600%40%2CSystem.Int32))
- [System.Collections.Concurrent.BlockingCollection%601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection{%600}\[\],%600@,System.TimeSpan)](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%25601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection%7B%25600%7D%5B%5D%2C%25600%40%2CSystem.TimeSpan))
- [System.Collections.Concurrent.BlockingCollection%601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection{%600}\[\],%600@,System.TimeSpan)](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%25601.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection%7B%25600%7D%5B%5D%2C%25600%40%2CSystem.TimeSpan))

<!--

#### Affected APIs

- ``M:System.Collections.Concurrent.BlockingCollection`1.TakeFromAny(System.Collections.Concurrent.BlockingCollection{`0}[],`0@)``
- ``M:System.Collections.Concurrent.BlockingCollection`1.TakeFromAny(System.Collections.Concurrent.BlockingCollection{`0}[],`0@,System.Threading.CancellationToken)``
- ``M:System.Collections.Concurrent.BlockingCollection`1.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection{`0}[],`0@)``
- ``M:System.Collections.Concurrent.BlockingCollection`1.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection{`0}[],`0@,System.Int32)``
- ``M:System.Collections.Concurrent.BlockingCollection`1.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection{`0}[],`0@,System.TimeSpan)``
- ``M:System.Collections.Concurrent.BlockingCollection`1.TryTakeFromAny(System.Collections.Concurrent.BlockingCollection{`0}[],`0@,System.TimeSpan)``

-->
