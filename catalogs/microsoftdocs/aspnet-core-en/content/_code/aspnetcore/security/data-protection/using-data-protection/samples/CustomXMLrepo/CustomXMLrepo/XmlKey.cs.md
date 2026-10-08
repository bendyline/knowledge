# Source code: aspnetcore/security/data-protection/using-data-protection/samples/CustomXMLrepo/CustomXMLrepo/XmlKey.cs

Complete source file; linked examples may select a region or line range.

```
using System;
#region snippet
public class XmlKey
{
    public Guid Id { get; set; }
    public string Xml { get; set; }

    public XmlKey()
    {
        this.Id = Guid.NewGuid();
    }
}
#endregion

```
