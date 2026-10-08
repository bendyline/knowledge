# Source code: samples/core/Miscellaneous/NullableReferenceTypes/ExtraOptionalOrderInfo.cs

Complete source file; linked examples may select a region or line range.

```
namespace NullableReferenceTypes
{
    public class ExtraOptionalOrderInfo
    {
        public int Id { get; set; }
        public string SomeExtraAdditionalInfo { get; set; }

        public ExtraOptionalOrderInfo(string someExtraAdditionalInfo)
        {
            SomeExtraAdditionalInfo = someExtraAdditionalInfo;
        }
    }
}

```
