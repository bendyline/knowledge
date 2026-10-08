# Source code: samples/snippets/xml/VS_Snippets_Data/XmlSchemaInferenceExamples/XML/TypeInference2.xml

Complete source file; linked examples may select a region or line range.

```
<!--<snippet11>-->
<?xml version="1.0" encoding="utf-8"?>
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="root">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="subElement1" type="xs:string" />
                <xs:element name="subElement2" type="xs:string" />
            </xs:sequence>
        </xs:complexType>
    </xs:element>
</xs:schema>
<!--</snippet11>-->
```
