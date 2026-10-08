# Source code: docs/connect/jdbc/codesnippet/Java/using-basic-data-types_1.java

Complete source file; linked examples may select a region or line range.

```
try(Statement stmt = con.createStatement();) {
    ResultSet rs = stmt.executeQuery("SELECT lname, job_id FROM employee WHERE (lname = 'Brown')");
    rs.next();
    short empJobID = rs.getString("job_id");
}

```
