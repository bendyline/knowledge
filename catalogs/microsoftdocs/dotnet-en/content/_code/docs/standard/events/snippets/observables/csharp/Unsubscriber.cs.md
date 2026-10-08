# Source code: docs/standard/events/snippets/observables/csharp/Unsubscriber.cs

Complete source file; linked examples may select a region or line range.

```
namespace Observables.Example;

internal sealed class Unsubscriber<T> : IDisposable
{
    private readonly Lock _lock;
    private readonly ISet<IObserver<T>> _observers;
    private readonly IObserver<T> _observer;

    internal Unsubscriber(
        Lock @lock,
        ISet<IObserver<T>> observers,
        IObserver<T> observer) => (_lock, _observers, _observer) = (@lock, observers, observer);

    public void Dispose()
    {
        lock (_lock)
        {
            _observers.Remove(_observer);
        }
    }
}

```
