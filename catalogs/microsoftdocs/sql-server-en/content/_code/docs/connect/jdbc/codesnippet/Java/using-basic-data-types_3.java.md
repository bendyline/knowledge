# Source code: docs/connect/jdbc/codesnippet/Java/using-basic-data-types_3.java

Complete source file; linked examples may select a region or line range.

```
try (Statement stmt = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);) {
    ResultSet rs = stmt.executeQuery("SELECT lname, job_id FROM employee WHERE (lname = 'Brown')");
    rs.next();
    int empJobID = rs.getInt(2);
    empJobID++;
    rs.first();
    rs.updateInt(2, empJobID);
    rs.updateRow();
}

```
