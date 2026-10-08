# Source code: samples/snippets/csharp/VS_Snippets_CLR_System/system.idisposable/cs/Program.cs

Complete source file; linked examples may select a region or line range.

```
Test();

void Test()
{
    using DisposableDerived a = new();
    using DisposableDerivedWithFinalizer b = new();
    b.Dispose();
    using DisposableBaseWithSafeHandle c = new();
}


```
