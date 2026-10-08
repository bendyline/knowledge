---
title: Identification entities
titleSuffix: Foundry Tools
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: include
ms.date: 05/05/2026
ms.author: lajanuar
ms.custom: language-service-pii
---
## Financial account identification

This entity category includes financial information and official forms of identification.

## Category: ABA routing number

This category contains the following entity:



**Entity**

ABA routing number



**Details**

American Banker Association (ABA) transit routing numbers. Also returned with `domain=phi`.

To get this entity category, add `ABARoutingNumber` to the `piiCategories` parameter. `ABARoutingNumber` will also be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `af`, `ca`, `da`, `el`, `ga`, `gl`, `ku`, `nl`, `no`, `ss`, `ro`, `sq`, `ur`, `ar`, `bg`, `bs`, `cy`, `fa`, `hr`, `id`, `mg`, `mk`, `ms`, `ps`, `ru`, `sl`, `so`, `sr`, `sw`, `am`, `as`, `cs`, `et`, `eu`, `fi`, `he`, `hu`, `km`, `lo`, `lt`, `lv`, `mr`, `my`, `ne`, `or`, `pa`, `pl`, `sk`, `th`, `uk`, `az`, `bn`, `gu`, `hy`, `ka`, `kk`, `kn`, `ky`, `ml`, `mn`, `ta`, `te`, `ug`, `uz`, `vi`





## Category: SWIFT code

This category contains the following entity:



**Entity**

SWIFT code



**Details**

SWIFT codes for payment instruction information. Also returned with `domain=phi`.

To get this entity category, add `SWIFTCode` to the `piiCategories` parameter. `SWIFTCode` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `af`, `ca`, `da`, `el`, `ga`, `gl`, `ku`, `nl`, `no`, `ss`, `ro`, `sq`, `ur`, `ar`, `bg`, `bs`, `cy`, `fa`, `hr`, `id`, `mg`, `mk`, `ms`, `ps`, `ru`, `sl`, `so`, `sr`, `sw`, `am`, `as`, `cs`, `et`, `eu`, `fi`, `he`, `hu`, `km`, `lo`, `lt`, `lv`, `mr`, `my`, `ne`, `or`, `pa`, `pl`, `sk`, `th`, `uk`, `az`, `bn`, `gu`, `hy`, `ka`, `kk`, `kn`, `ky`, `ml`, `mn`, `ta`, `te`, `ug`, `uz`, `vi`




## Category: Credit card

This category contains the following entity:



**Entity**

Credit card



**Details**

Credit card numbers. Also returned with `domain=phi`.

To get this entity category, add `CreditCardNumber` to the `piiCategories` parameter. `CreditCardNumber` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `af`, `ca`, `da`, `el`, `ga`, `gl`, `ku`, `nl`, `no`, `ss`, `ro`, `sq`, `ur`, `ar`, `bg`, `bs`, `cy`, `fa`, `hr`, `id`, `mg`, `mk`, `ms`, `ps`, `ru`, `sl`, `so`, `sr`, `sw`, `am`, `as`, `cs`, `et`, `eu`, `fi`, `he`, `hu`, `km`, `lo`, `lt`, `lv`, `mr`, `my`, `ne`, `or`, `pa`, `pl`, `sk`, `th`, `uk`, `az`, `bn`, `gu`, `hy`, `ka`, `kk`, `kn`, `ky`, `ml`, `mn`, `ta`, `te`, `ug`, `uz`, `vi`




## Category: International Banking Account Number (IBAN)

This category contains the following entity:



**Entity**

Credit card



**Details**

IBAN codes for payment instruction information. Also returned with `domain=phi`.

To get this entity category, add `InternationalBankingAccountNumber` to the `piiCategories` parameter. `InternationalBankingAccountNumber` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `af`, `ca`, `da`, `el`, `ga`, `gl`, `ku`, `nl`, `no`, `ss`, `ro`, `sq`, `ur`, `ar`, `bg`, `bs`, `cy`, `fa`, `hr`, `id`, `mg`, `mk`, `ms`, `ps`, `ru`, `sl`, `so`, `sr`, `sw`, `am`, `as`, `cs`, `et`, `eu`, `fi`, `he`, `hu`, `km`, `lo`, `lt`, `lv`, `mr`, `my`, `ne`, `or`, `pa`, `pl`, `sk`, `th`, `uk`, `az`, `bn`, `gu`, `hy`, `ka`, `kk`, `kn`, `ky`, `ml`, `mn`, `ta`, `te`, `ug`, `uz`, `vi`




## Government and country/region-specific identification

> **Note:**
> The following financial and country/region-specific entities aren't returned with the `domain=phi` parameter:
> * Passport numbers
> * Tax IDs

The following entities are listed via country and/or region:

### Argentina



**Entity**

Argentina National Identity (DNI) Number



**Details**

Also returned with `domain=phi`.

To get this entity category, add `ARNationalIdentityNumber` to the `piiCategories` parameter. `ARNationalIdentityNumber` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### Austria



**Entity**

Austria identity card



**Details**

To get this entity category, add `ATIdentityCard` to the `piiCategories` parameter. `ATIdentityCard` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Austria tax identification number




To get this entity category, add `ATTaxIdentificationNumber` to the `piiCategories` parameter. `ATTaxIdentificationNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Austria Value Added Tax (VAT) number




To get this entity category, add `ATValueAddedTaxNumber` to the `piiCategories` parameter. `ATValueAddedTaxNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






### Australia



**Entity**

Australia bank account number



**Details**

To get this entity category, add `AUBankAccountNumber` to the `piiCategories` parameter. `AUBankAccountNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Australian business number




To get this entity category, add `AUBusinessNumber` to the `piiCategories` parameter. `AUBusinessNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Australia Company Number




To get this entity category, add `AUCompanyNumber` to the `piiCategories` parameter. `AUCompanyNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Australia driver's license




To get this entity category, add `AUDriversLicenseNumber` to the `piiCategories` parameter. `AUDriversLicenseNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Australia medical account number




To get this entity category, add `AUMedicalAccountNumber` to the `piiCategories` parameter. `AUMedicalAccountNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Australia passport number




To get this entity category, add `AUPassportNumber` to the `piiCategories` parameter. `AUPassportNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Australia tax file number




To get this entity category, add `AUTaxFileNumber` to the `piiCategories` parameter. `AUTaxFileNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### Belgium



**Entity**

Belgium national number



**Details**

To get this entity category, add `BENationalNumber` to the `piiCategories` parameter. `BENationalNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`







Belgium Value Added Tax (VAT) number




To get this entity category, add `BEValueAddedTaxNumber` to the `piiCategories` parameter. `BEValueAddedTaxNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### Brazil



**Entity**

Brazil legal entity number (CNPJ)





**Details**

To get this entity category, add `BRLegalEntityNumber` to the `piiCategories` parameter. `BRLegalEntityNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Brazil CPF number




To get this entity category, add `BRCPFNumber` to the `piiCategories` parameter. `BRCPFNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Brazil National ID Card (RG)




To get this entity category, add `BRNationalIDRG` to the `piiCategories` parameter. `BRNationalIDRG` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Canada



**Entity**

Canada bank account number



**Details**

To get this entity category, add `CABankAccountNumber` to the `piiCategories` parameter. `CABankAccountNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Canada driver's license number





To get this entity category, add `CADriversLicenseNumber` to the `piiCategories` parameter. `CADriversLicenseNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Canada health service number






To get this entity category, add `CAHealthServiceNumber` to the `piiCategories` parameter. `CAHealthServiceNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Canada passport number




To get this entity category, add `CAPassportNumber` to the `piiCategories` parameter. `CAPassportNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Canada Personal Health Identification Number (PHIN)




To get this entity category, add `CAPersonalHealthIdentification` to the `piiCategories` parameter. `CAPersonalHealthIdentification` will be returned in the API response if detected.

Also returned with `domain=phi`.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Canada social insurance number




To get this entity category, add `CASocialInsuranceNumber` to the `piiCategories` parameter. `CASocialInsuranceNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Chile



**Entity**

Chile identity card number



**Details**

To get this entity category, add `CLIdentityCardNumber` to the `piiCategories` parameter. `CLIdentityCardNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### China



**Entity**

China Resident Identity Card (PRC) number



**Details**

To get this entity category, add `CNResidentIdentityCardNumber` to the `piiCategories` parameter. `CNResidentIdentityCardNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### European Union (EU)



**Entity**

EU debit card number



**Details**

To get this entity category, add `EUDebitCardNumber` to the `piiCategories` parameter. `EUDebitCardNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






EU driver's license number




To get this entity category, add `EUDriversLicenseNumber` to the `piiCategories` parameter. `EUDriversLicenseNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






EU GPS coordinates




To get this entity category, add `EUGPSCoordinates` to the `piiCategories` parameter. `EUGPSCoordinates` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






EU national identification number




To get this entity category, add `EUNationalIdentificationNumber` to the `piiCategories` parameter. `EUNationalIdentificationNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






EU passport number




To get this entity category, add `EUPassportNumber` to the `piiCategories` parameter. `EUPassportNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






EU Social Security Number (SSN) or equivalent ID




To get this entity category, add `EUSocialSecurityNumber` to the `piiCategories` parameter. `EUSocialSecurityNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






EU Tax Identification Number (TIN)




To get this entity category, add `EUTaxIdentificationNumber` to the `piiCategories` parameter. `EUTaxIdentificationNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### France



**Entity**

France driver's license number



**Details**

To get this entity category, add `FRDriversLicenseNumber` to the `piiCategories` parameter. `FRDriversLicenseNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






France health insurance number




To get this entity category, add `FRHealthInsuranceNumber` to the `piiCategories` parameter. `FRHealthInsuranceNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






France national ID card (CNI)




To get this entity category, add `FRNationalID` to the `piiCategories` parameter. `FRNationalID` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






France passport number




To get this entity category, add `FRPassportNumber` to the `piiCategories` parameter. `FRPassportNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






France Social Security Number (INSEE)




To get this entity category, add `FRSocialSecurityNumber` to the `piiCategories` parameter. `FRSocialSecurityNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






France tax identification number (Numéro SPI)




To get this entity category, add `FRTaxIdentificationNumber` to the `piiCategories` parameter. `FRTaxIdentificationNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






France Value Added Tax (VAT) number




To get this entity category, add `FRValueAddedTaxNumber` to the `piiCategories` parameter. `FRValueAddedTaxNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Germany



**Entity**

German Driver's License Number



**Details**

To get this entity category, add `DEDriversLicenseNumber` to the `piiCategories` parameter. `DEDriversLicenseNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Germany Identity Card Number




To get this entity category, add `DEIdentityCardNumber` to the `piiCategories` parameter. `DEIdentityCardNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Germany passport number




To get this entity category, add `DEPassportNumber` to the `piiCategories` parameter. `DEPassportNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Germany Tax Identification Number




To get this entity category, add `DETaxIdentificationNumber` to the `piiCategories` parameter. `DETaxIdentificationNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Germany Value Added Tax Number



**Details**

To get this entity category, add `DEValueAddedNumber` to the `piiCategories` parameter. `DEValueAddedNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Hong Kong Special Administrative Region



**Entity**

Hong Kong Identity Card (HKID) Number



**Details**

To get this entity category, add `HKIdentityCardNumber` to the `piiCategories` parameter. `HKIdentityCardNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Hungary



**Entity**

Hungary Personal Identification Number



**Details**

To get this entity category, add `HUPersonalIdentificationNumber` to the `piiCategories` parameter. `HUPersonalIdentificationNumber` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Hungary Tax identification Number




To get this entity category, add `HUTaxIdentificationNumber` to the `piiCategories` parameter. `HUTaxIdentificationNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Hungary Value Added Tax Number




To get this entity category, add `HUValueAddedNumber` to the `piiCategories` parameter. `HUValueAddedNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### India



**Entity**

India Permanent Account Number (PAN)



**Details**

To get this entity category, add `INPermanentAccount` to the `piiCategories` parameter. `INPermanentAccount` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






India Unique Identification (Aadhaar) Number



**Details**

To get this entity category, add `INUniqueIdentificationNumber` to the `piiCategories` parameter. `INUniqueIdentificationNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### Indonesia



**Entity**

Indonesia Identity Card (KTP) Number




**Details**

To get this entity category, add `IDIdentityCardNumber` to the `piiCategories` parameter. `IDIdentityCardNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Ireland



**Entity**

Ireland Personal Public Service (PPS) Number



**Details**

To get this entity category, add `IEPersonalPublicServiceNumber` to the `piiCategories` parameter. `IEPersonalPublicServiceNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Israel



**Entity**

Israel National ID



**Details**

To get this entity category, add `ILNationalID` to the `piiCategories` parameter. `ILNationalID` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Israel Bank Account Number




To get this entity category, add `ILBankAccountNumber` to the `piiCategories` parameter. `ILBankAccountNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Italy



**Entity**

Italy Driver's License ID



**Details**

To get this entity category, add `ITDriversLicenseNumber` to the `piiCategories` parameter. `ITDriversLicenseNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Italy Fiscal Code




To get this entity category, add `ITFiscalCode` to the `piiCategories` parameter. `ITFiscalCode` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Italy Value Added Tax Number




To get this entity category, add `ITValueAddedTaxNumber` to the `piiCategories` parameter. `ITValueAddedTaxNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### Japan



**Entity**

Japan Bank Account Number



**Details**

To get this entity category, add `JPBankAccountNumber` to the `piiCategories` parameter. `JPBankAccountNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Japan Driver's License Number




To get this entity category, add `JPDriversLicenseNumber` to the `piiCategories` parameter. `JPDriversLicenseNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Japan "My Number" (personal)




To get this entity category, add `JPMyNumberPersonal` to the `piiCategories` parameter. `JPMyNumberPersonal` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Japan "My Number" (Corporate)




To get this entity category, add `JPMyNumberCorporate` to the `piiCategories` parameter. `JPMyNumberCorporate` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Japan Resident Registration Number




To get this entity category, add `JPResidentRegistrationNumber` to the `piiCategories` parameter. `JPResidentRegistrationNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`ja`






Japan Residence Card Number




To get this entity category, add `JPResidenceCardNumber` to the `piiCategories` parameter. `JPResidenceCardNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Japan Social Insurance Number (SIN)




To get this entity category, add `JPSocialInsuranceNumber` to the `piiCategories` parameter. `JPSocialInsuranceNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Japan Passport Number




To get this entity category, add `JPPassportNumber` to the `piiCategories` parameter. `JPPassportNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Luxembourg



**Entity**

Luxembourg National Identification Number (Natural persons)



**Details**

To get this entity category, add `LUNationalIdentificationNumberNatural` to the `piiCategories` parameter. `LUNationalIdentificationNumberNatural` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Luxembourg National Identification Number (Non-natural persons)




To get this entity category, add `LUNationalIdentificationNumberNonNatural` to the `piiCategories` parameter. `LUNationalIdentificationNumberNonNatural` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Malta



**Entity**

Malta Identity Card Number



**Details**

To get this entity category, add `MTIdentityCardNumber` to the `piiCategories` parameter. `MTIdentityCardNumber` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Malta Tax Identification Number




To get this entity category, add `MTTaxIDNumber` to the `piiCategories` parameter. `MTTaxIDNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### New Zealand



**Entity**

New Zealand Bank Account Number



**Details**

To get this entity category, add `NZBankAccountNumber` to the `piiCategories` parameter. `NZBankAccountNumber` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






New Zealand Driver's License Number




To get this entity category, add `NZDriversLicenseNumber` to the `piiCategories` parameter. `NZDriversLicenseNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






New Zealand Inland Revenue Number




To get this entity category, add `NZInlandRevenueNumber` to the `piiCategories` parameter. `NZInlandRevenueNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






New Zealand Ministry of Health Number




To get this entity category, add `NZMinistryOfHealthNumber` to the `piiCategories` parameter. `NZMinistryOfHealthNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






New Zealand Social Welfare Number




To get this entity category, add `NZSocialWelfareNumber` to the `piiCategories` parameter. `NZSocialWelfareNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### Philippines



**Entity**

Philippines Unified Multi-Purpose ID Number



**Details**

To get this entity category, add `PHUnifiedMultiPurposeIDNumber` to the `piiCategories` parameter. `PHUnifiedMultiPurposeIDNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Portugal



**Entity**

Portugal Citizen Card Number



**Details**

To get this entity category, add `PTCitizenCardNumber` to the `piiCategories` parameter. `PTCitizenCardNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Portugal Tax Identification Number




To get this entity category, add `PTTaxIdentificationNumber` to the `piiCategories` parameter. `PTTaxIdentificationNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Singapore



**Entity**

Singapore National Registration ID Card (NRIC) Number



**Details**

To get this entity category, add `PTTaxIdentificationNumber` to the `piiCategories` parameter. `PTTaxIdentificationNumber` will be returned in the API response if detected.



**Supported languages**

`en`, `zh-hans`





### South Africa



**Entity**

South Africa Identification Number



**Details**

To get this entity category, add `ZAIdentificationNumber` to the `piiCategories` parameter. `ZAIdentificationNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### South Korea



**Entity**

South Korea Resident Registration Number



**Details**

To get this entity category, add `KRResidentRegistrationNumber` to the `piiCategories` parameter. `KRResidentRegistrationNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Spain



**Entity**

Spain DNI



**Details**

To get this entity category, add `ESDNI` to the `piiCategories` parameter. `ESDNI` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Spain Social Security Number (SSN)




To get this entity category, add `ESSocialSecurityNumber` to the `piiCategories` parameter. `ESSocialSecurityNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Spain Tax Identification Number




To get this entity category, add `ESTaxIdentificationNumber` to the `piiCategories` parameter. `ESTaxIdentificationNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Sweden



**Entity**

Sweden National ID



**Details**

To get this entity category, add `SENationalID` to the `piiCategories` parameter. `SENationalID` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Sweden Passport Number




To get this entity category, add `SEPassportNumber` to the `piiCategories` parameter. `SEPassportNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Sweden Tax Identification Number




To get this entity category, add `SETaxIdentificationNumber` to the `piiCategories` parameter. `SETaxIdentificationNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### Switzerland



**Entity**

Swiss Social Security Number AHV



**Details**

To get this entity category, add `CHSocialSecurityNumber` to the `piiCategories` parameter. `CHSocialSecurityNumber` will be returned in the API response if detected.



**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### Taiwan



**Entity**

Taiwan National ID



**Details**

To get this entity category, add `TWNationalID` to the `piiCategories` parameter. `TWNationalID` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Taiwan Resident Certificate (ARC/TARC)




To get this entity category, add `TWResidentCertificate` to the `piiCategories` parameter. `TWResidentCertificate` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






Taiwan Passport Number




To get this entity category, add `TWPassportNumber` to the `piiCategories` parameter. `TWPassportNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`




### United Kingdom



**Entity**

U.K. Driver's License Number



**Details**

To get this entity category, add `UKDriversLicenseNumber` to the `piiCategories` parameter. `UKDriversLicenseNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`







U.K. Electoral Roll Number




To get this entity category, add `UKElectoralRollNumber` to the `piiCategories` parameter. `UKElectoralRollNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






U.K. National Health Service (NHS) Number




To get this entity category, add `UKNationalHealthNumber` to the `piiCategories` parameter. `UKNationalHealthNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






U.K. National Insurance Number (NINO)




To get this entity category, add `UKNationalInsuranceNumber` to the `piiCategories` parameter. `UKNationalInsuranceNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






U.K. or U.S. Passport Number




To get this entity category, add `USUKPassportNumber` to the `piiCategories` parameter. `USUKPassportNumber` will be returned in the API response if detected.




`en`






U.K. Unique Taxpayer Reference Number




To get this entity category, add `UKUniqueTaxpayerNumber` to the `piiCategories` parameter. `UKUniqueTaxpayerNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`





### United States



**Entity**

U.S. Social Security Number (SSN)



**Details**

To get this entity category, add `USSocialSecurityNumber` to the `piiCategories` parameter. `USSocialSecurityNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.


**Supported languages**

`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






U.S. Driver's License Number




To get this entity category, add `USDriversLicenseNumber` to the `piiCategories` parameter. `USDriversLicenseNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






U.S. or U.K. Passport Number




To get this entity category, add `USUKPassportNumber` to the `piiCategories` parameter. `USUKPassportNumber` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






U.S. Individual Taxpayer Identification Number (ITIN)




To get this entity category, add `USIndividualTaxpayerIdentification` to the `piiCategories` parameter. `USIndividualTaxpayerIdentification` will be returned in the API response if detected.




`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






U.S. Drug Enforcement Agency (DEA) Number




To get this entity category, add `DrugEnforcementAgencyNumber` to the `piiCategories` parameter. `DrugEnforcementAgencyNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`






U.S. Bank Account Number




To get this entity category, add `USBankAccountNumber` to the `piiCategories` parameter. `USBankAccountNumber` will be returned in the API response if detected.

Also returned with `domain=phi`.



`en`, `es`, `fr`, `de`, `it`, `pt-pt`, `pt-br`, `zh`, `ja`, `ko`, `nl`, `sv`, `tr`, `hi`, `da`, `nl`, `no`, `ro`, `ar`, `bg`, `hr`, `ms`, `ru`, `sl`, `cs`, `et`, `fi`, `he`, `hu`, `lv`, `sk`, `th`, `uk`
