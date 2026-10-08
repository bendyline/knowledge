# Source code: docs/core/whats-new/snippets/dotnet-9/csharp/UnsafeAccessor.cs

Complete source file; linked examples may select a region or line range.

```
using System.Runtime.CompilerServices;

public class Class<T>
{
    private T? _field;
    private void M<U>(T t, U u) { }
}

class Accessors<V>
{
    [UnsafeAccessor(UnsafeAccessorKind.Field, Name = "_field")]
    public extern static ref V GetSetPrivateField(Class<V> c);

    [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "M")]
    public extern static void CallM<W>(Class<V> c, V v, W w);
}

internal class UnsafeAccessorExample
{
    public void AccessGenericType(Class<int> c)
    {
        ref int f = ref Accessors<int>.GetSetPrivateField(c);

        Accessors<int>.CallM<string>(c, 1, string.Empty);
    }
}

```
