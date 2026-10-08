---
title: "Quickstart: Localization and Formatting Helper with GitHub Copilot"
titleSuffix: MSSQL Extension for Visual Studio Code
description: Learn how GitHub Copilot helps developers build globally aware applications by handling multilingual content and region-specific formatting in SQL database code.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: roblescarlos
ms.date: 06/01/2026
ms.service: sql
ms.subservice: vs-code-sql-extensions
ms.topic: quickstart
ms.collection:
  - data-tools
  - ce-skilling-ai-copilot
ms.custom:
  - ignite-2025
ai-usage: ai-assisted
---

# Quickstart: Localization and formatting helper

GitHub Copilot helps developers build globally aware applications by addressing localization and formatting needs directly within SQL and ORM-based workflows. Whether you're working with multilingual content, region-specific date and number formats, or collation settings for search and sorting, GitHub Copilot provides intelligent, context-aware assistance to make your database and code ready for international users.

## Get started


Make sure you're connected to a database and have an active editor window open with the MSSQL extension. When you connect, the `@mssql` chat participant understands the context of your database environment and can give accurate, context-aware suggestions. If you don't connect to a database, the chat participant doesn't have the schema or data context to provide meaningful responses.

The following examples use the `AdventureWorksLT2022` sample database, which you can download from the [Azure Data SQL Samples Repository](https://github.com/microsoft/sql-server-samples) GitHub repository.

For best results, adjust table and schema names to match your own environment.

Make sure the chat includes the `@mssql` prefix. For example, type `@mssql` followed by your question or prompt. This prefix ensures that the chat participant understands you're asking for SQL-related assistance.


## Handle localization and formatting with GitHub Copilot

GitHub Copilot can assist with localization and formatting tasks in SQL and ORM-based workflows. It can help you design schemas that support multilingual content, format queries for regional standards, and generate code that adheres to localization best practices.

Here are common use cases and examples of what you can ask via the chat participant:

### Optimize multilingual and locale-specific data

Use GitHub Copilot to help with formatting queries for regional standards, choose the right collation settings, and design schema elements to support multilingual content, like storing product descriptions in multiple languages.

#### Store product descriptions in multiple languages

```copilot-prompt
Design a localized table to store product descriptions for the `SalesLT.Product` table. Ensure the table supports multiple languages, includes a relationship to `SalesLT.Product`, and allows for efficient querying.
```

#### Display dates in another format

```copilot-prompt
Format a query to display dates in Japanese format:

SELECT FORMAT(GETDATE(), 'yyyy/MM/dd') AS CurrentDate;
```

#### Recommend collation settings for multilingual user input

```copilot-prompt
Recommend best practices for choosing collation settings when supporting multilingual user input and search functionality in SQL Server.
```

#### Create models and queries to support multiple languages

```copilot-prompt
Write Prisma models and queries to store and retrieve multilingual product descriptions for the `SalesLT.Product` table in my database. Ensure the schema supports multiple languages, maintains a foreign key relationship with `SalesLT.Product`, and allows for efficient querying of localized descriptions.
```

### Code-first localization scenarios

These examples show how GitHub Copilot supports code-first workflows by generating ORM (Object-Relational Mapping) models and queries that store and retrieve localized data. The examples span popular ORMs like Prisma, SQLAlchemy, Entity Framework, Sequelize, and Django.

#### Define Entity Framework Core model for multiple languages

```copilot-prompt
Using Entity Framework Core, define a model for `ProductDescriptionLocalized` that maps to multiple languages and relates to `SalesLT.Product`. Include logic to filter by language code.
```

#### Generate a localized schema for product descriptions

```copilot-prompt
In Prisma, generate a schema that supports localized descriptions for `SalesLT.Product`, and write a query to retrieve the description for a given product in Spanish (`es`).
```

#### Create a table for storing product descriptions with default fallback

```copilot-prompt
With Sequelize, create a localized table for storing product descriptions with `ProductID`, `LanguageCode`, and `Description`. Write a query to return the Japanese description if available, otherwise fall back to the default language.
```

#### Retrieve localized product name and description based on locale

```copilot-prompt
Using SQLAlchemy, write a function that retrieves the localized name and description for a given `ProductID` based on a user-specified locale, with fallback logic to default language.
```

#### Design models to support product localization with NULL fallback

```copilot-prompt
In Django ORM, design models that support product localization and write a query to retrieve all products with their name and description in French (`fr`), including any missing translations as `NULL`.
```

## Share your experience


To help us refine and improve GitHub Copilot for the MSSQL extension, use the following GitHub issue template to submit your feedback: [GitHub Copilot Feedback](https://aka.ms/vscode-mssql-copilot-feedback)

When submitting feedback, consider including:

- **Scenarios tested**: Let us know which areas you focused on, for example, schema creation, query generation, security, localization.

- **What worked well**: Describe any experiences that felt smooth, helpful, or exceeded your expectations.

- **Issues or bugs**: Include any problems, inconsistencies, or confusing behaviors. Screenshots or screen recordings are especially helpful.

- **Suggestions for improvement**: Share ideas for improving usability, expanding coverage, or enhancing GitHub Copilot's responses.


## Related content

- [GitHub Copilot for MSSQL extension for Visual Studio Code](overview.md)
- [Quickstart: Chat with the `@mssql` participant (ask mode)](chat-ask-mode.md)
- [Quickstart: Generate code](code-generation.md)
- [Quickstart: Use the schema explorer and designer](schema-explorer-designer.md)
- [Quickstart: Use the smart query builder](smart-query-builder.md)
- [Quickstart: Query optimizer assistant](query-optimizer-assistant.md)
- [Quickstart: Use the business logic explainer](business-logic-explainer.md)
- [Quickstart: Security analyzer](security-analyzer.md)
- [Quickstart: Generate data for testing and mocking](test-and-mocking-data-generator.md)
- [Limitations and known issues](limitations-and-known-issues.md)
