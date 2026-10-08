# Source code: samples/snippets/core/tutorials/testing-with-cli/csharp/src/NewTypes/Pets/Cat.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace Pets
{
    public class Cat : IPet
    {
        public string TalkToOwner() => "Meow!";
    }
}

```
