---
title: Overview
description: Learn about the key data organization and management features of Master Data Services. Master Data Services enables you to manage a master set of your data.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
f1_keywords:
  - "sql13.mds.configmanager.srvconnect.f1"
  - "sql13.mds.configmanager.dbmailprofileacct.f1"
  - "sql13.mds.configmanager.createapp.f1"
  - "sql13.mds.configmanager.createsite.f1"
helpviewer_keywords:
  - "Master Data Services, overview"
  - "Master Data Services"
keywords: what is master data
---
# Master Data Services Overview (MDS)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


This topic describes the key data organization and management features of  Master Data Services 
. 
  
  Master Data Services 
 enables you to manage a master set of your organization's data. You can organize the data into models, create rules for updating the data, and control who updates the data. With Excel, you can share the master data set with other people in your organization. 
  
 >  For a description of the  Master Data Services 
 architecture, see the [Master Data Services -- The Basics](https://www.simple-talk.com/sql/database-delivery/master-data-services-basics) article on simple-talk.com. For information about the new features  in  SQL Server 
, see [What's New in Master Data Services (MDS)](what-s-new-in-master-data-services-mds.md)  
   **For instructions on how to install  Master Data Services 
, set up the database and Website, and deploy the sample models, see** [Master Data Services Installation and Configuration](master-data-services-installation-and-configuration.md).  
  
 In  Master Data Services 
, the model is the highest level container in the structure of your master data. You create a model to manage groups of similar data, for example to manage online product data. A model contains one or more entities, and entities contain members that are the data records. An entity is similar to a table.  
  
 For example, your online product model may contain entities such as product, color, and style. The  color entity may contain  members for the colors red, silver, and black.  
  
 Color entity  
  
 Models also contain attributes that are defined within entities. An attribute contains values that help describe the entity members. There are free-form attributes and domain-based attributes.  A domain-based attribute contains values that are populated by members from an entity and can be used as attribute values for other entities.  
  
 For example, the product entity might have free-form attributes for cost and weight. And, there is a domain-based attribute for color Number 1 that contains values that are populated by the color entity members. This  master list of colors is used as attribute values for the Product entity Number 2.  
  
 Domain-based attribute for color  
  
 Derived hierarchies come from the relationships between entities in a model. These are domain-based attribute relationships. In the product model for example, you can have a color derived hierarchy Number 1 that comes from the relationship between the color Number 2 and product Number 3 entities.  
  
 Color derived hierarchy  
  
 Once you've defined  a basic structure for your data, you can start adding data records (members) by using the import feature. You load data into staging tables,  validate the data using business rules, and load the data into  MDS tables.  You can also use business rules to set attribute values.  
  
 The following table outlines the key  Master Data Services 
 tasks. Unless otherwise noted, all of the following procedures require you to be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
> **Note:**  
>  You might want to complete the following tasks in a test environment and use the sample data provided when you install  Master Data Services 
. For more information, see [Deploying Models (Master Data Services)](deploying-models-master-data-services.md).  
  
| Action | Details | Related Topics |
| --- | --- | --- |
| Create a model | When you create a model, it is considered VERSION_1. | [Models (Master Data Services)](models-master-data-services.md)<br /><br /> [Create a Model (Master Data Services)](create-a-model-master-data-services.md) |
| Create entities | Create as many entities as you need to contain your members. | [Entities (Master Data Services)](entities-master-data-services.md)<br /><br /> [Create an Entity (Master Data Services)](create-an-entity-master-data-services.md) |
| Create entities to use as domain-based attributes | To create a domain-based attribute, first create the entity to populate the attribute value list. | [Domain-Based Attributes (Master Data Services)](domain-based-attributes-master-data-services.md)<br /><br /> [Create a Domain-Based Attribute (Master Data Services)](create-a-domain-based-attribute-master-data-services.md) |
| Create attributes for your entities | Create attributes to describe members. A Name and Code attribute are automatically included in each entity and cannot be removed. You might want to create other free-form attributes to contain text, dates, numbers, or files. | [Attributes (Master Data Services)](attributes-master-data-services.md)<br /><br /> [Create a Text Attribute (Master Data Services)](create-a-text-attribute-master-data-services.md)<br /><br /> [Create a Numeric Attribute (Master Data Services)](create-a-numeric-attribute-master-data-services.md)<br /><br /> [Create a Date Attribute (Master Data Services)](create-a-date-attribute-master-data-services.md)<br /><br /> [Create a Link Attribute (Master Data Services)](create-a-link-attribute-master-data-services.md)<br /><br /> [Create a File Attribute (Master Data Services)](create-a-file-attribute-master-data-services.md) |
| Create attribute groups | If you have more than four or five attributes for an entity, you might want to create attribute groups. These groups are the tabs that are displayed above the grid in **Explorer** and they help ease navigation by grouping attributes together on individual tabs. | [Attribute Groups (Master Data Services)](attribute-groups-master-data-services.md)<br /><br /> [Create an Attribute Group (Master Data Services)](create-an-attribute-group-master-data-services.md) |
| Import members for your supporting entities | Import the data for your supporting entities by using the staging process. For the Product model, this might mean importing colors or sizes. You can also create members manually.<br /><br /> <br /><br /> Note: Users can create members in  Master Data Manager |
 | if they have a minimum of **Update** permission to an entity's leaf model object and access to the **Explorer** functional area. | [Overview: Importing Data from Tables (Master Data Services)](overview-importing-data-from-tables-master-data-services.md)<br /><br /> [Create a Leaf Member (Master Data Services)](create-a-leaf-member-master-data-services.md) |
| Create and apply business rules to ensure data quality | Create and publish business rules to ensure the accuracy of your data. You can use business rules to:<br /><br /> Set default attribute values.<br /><br /> Change attribute values.<br /><br /> Send email notifications when data doesn't pass business rule validation. | [Business Rules (Master Data Services)](business-rules-master-data-services.md)<br /><br /> [Create and Publish a Business Rule (Master Data Services)](create-and-publish-a-business-rule-master-data-services.md)<br /><br /> [Validate Specific Members against Business Rules (Master Data Services)](validate-specific-members-against-business-rules-master-data-services.md)<br /><br /> [Configure Email Notifications (Master Data Services)](configure-email-notifications-master-data-services.md)<br /><br /> [Configure Business Rules to Send Notifications (Master Data Services)](configure-business-rules-to-send-notifications-master-data-services.md) |
| Import members for your primary entities and apply business rules | Import the members for your primary entities by using the staging process. When done, validate the version, which applies business rules to all members in the model version.<br /><br /> You can then work to correct any business rule validation issues. | [Validation (Master Data Services)](validation-master-data-services.md)<br /><br /> [Validate a Version against Business Rules (Master Data Services)](validate-a-version-against-business-rules-master-data-services.md)<br /><br /> [Validation Stored Procedure (Master Data Services)](validation-stored-procedure-master-data-services.md) |
| Create derived hierarchies | Derived hierarchies can be updated as your business needs change and ensure that all members are accounted for at the appropriate level. | [Derived Hierarchies (Master Data Services)](derived-hierarchies-master-data-services.md)<br /><br /> [Create a Derived Hierarchy (Master Data Services)](create-a-derived-hierarchy-master-data-services.md) |
| If needed, create explicit hierarchies | If you want to create hierarchies that are not level-based and that include members from a single entity, you can create explicit hierarchies. | [Explicit Hierarchies (Master Data Services)](explicit-hierarchies-master-data-services.md)<br /><br /> [Create an Explicit Hierarchy (Master Data Services)](create-an-explicit-hierarchy-master-data-services.md) |
| If needed, create collections | If you want to view different groupings of members for reporting or analysis and do not need a complete hierarchy, create a collection.<br /><br /> <br /><br /> Note: Users can create collections in  Master Data Manager |
 | if they have a minimum of **Update** permission to the collection model object and access to the **Explorer** functional area. | [Collections (Master Data Services)](collections-master-data-services.md)<br /><br /> [Create a Collection (Master Data Services)](create-a-collection-master-data-services.md) |
| Create user-defined metadata | To describe your model objects, add user-defined metadata to your model. The metadata might include the owner of an object or the source the data comes from. |  |
| Lock a version of your model and assign a version flag | Lock a version of your model to prevent changes to the members, except by administrators. When the version's data has validated successfully against business rules, you can commit the version, which prevents changes to members by all users.<br /><br /> Create and assign a version flag to the model. Flags help users and subscribing systems identify which version of a model to use. | [Versions (Master Data Services)](versions-master-data-services.md)<br /><br /> [Lock a Version (Master Data Services)](lock-a-version-master-data-services.md)<br /><br /> [Create a Version Flag (Master Data Services)](create-a-version-flag-master-data-services.md) |
| Create subscription views | For your subscribing systems to consume your master data, create subscription views, which create standard views in the  Master Data Services |
 | database. | [Overview: Exporting Data (Master Data Services)](overview-exporting-data-master-data-services.md)<br /><br /> [Create a Subscription View to Export Data (Master Data Services)](create-a-subscription-view-to-export-data-master-data-services.md) |
| Configure user and group permissions | You cannot copy user and group permissions from a test to a production environment. However, you can use your test environment to determine the security you want to use eventually in production. | [Security (Master Data Services)](security-master-data-services.md)<br /><br /> [Add a Group (Master Data Services)](add-a-group-master-data-services.md)<br /><br /> [Add a User (Master Data Services)](add-a-user-master-data-services.md) |
  
 When ready, you can deploy your model, with or without its data, to your production environment. For more information, see [Deploying Models (Master Data Services)](deploying-models-master-data-services.md).
