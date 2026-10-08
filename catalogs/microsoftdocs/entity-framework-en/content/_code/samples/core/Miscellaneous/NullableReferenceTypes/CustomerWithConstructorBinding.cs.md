# Source code: samples/core/Miscellaneous/NullableReferenceTypes/CustomerWithConstructorBinding.cs

Complete source file; linked examples may select a region or line range.

```
namespace NullableReferenceTypes
{
    #region CustomerWithConstructorBinding
    public class CustomerWithConstructorBinding
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public CustomerWithConstructorBinding(string name)
        {
            Name = name;
        }
    }
    #endregion
}

```
