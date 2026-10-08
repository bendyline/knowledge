# Source code: samples/core/Miscellaneous/NullableReferenceTypes/OptionalOrderInfo.cs

Complete source file; linked examples may select a region or line range.

```
namespace NullableReferenceTypes
{
    public class OptionalOrderInfo
    {
        public int Id { get; set; }
        public string AdditionalInfo { get; set; }
        public ExtraOptionalOrderInfo? ExtraAdditionalInfo { get; set; }

        public OptionalOrderInfo(string additionalInfo)
        {
            AdditionalInfo = additionalInfo;
        }
    }
}

```
