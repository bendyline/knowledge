# Source code: samples/snippets/csharp/snippets/tour/MemoryManagement.csx

Complete source file; linked examples may select a region or line range.

```
var title = ".NET Primer";
var list = new List<string>();

int[] numbers = new int[42];
int number = numbers[42]; // Will throw an exception (indexes are 0-based)
```
