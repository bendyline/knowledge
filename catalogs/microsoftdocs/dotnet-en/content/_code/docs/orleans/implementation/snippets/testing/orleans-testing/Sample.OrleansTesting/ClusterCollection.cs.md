# Source code: docs/orleans/implementation/snippets/testing/orleans-testing/Sample.OrleansTesting/ClusterCollection.cs

Complete source file; linked examples may select a region or line range.

```
[CollectionDefinition(Name)]
public sealed class ClusterCollection : ICollectionFixture<ClusterFixture>
{
    public const string Name = nameof(ClusterCollection);
}

```
