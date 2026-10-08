# Source code: aspnetcore/mvc/views/dependency-injection/sample/src/ViewInjectSample/Model/State.cs

Complete source file; linked examples may select a region or line range.

```
namespace ViewInjectSample.Model
{
    public class State
    {
        public State(string name, string code)
        {
            Name = name;
            Code = code;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
    }
}
```
