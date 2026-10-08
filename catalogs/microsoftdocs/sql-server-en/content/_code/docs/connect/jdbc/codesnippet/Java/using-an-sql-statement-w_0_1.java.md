# Source code: docs/connect/jdbc/codesnippet/Java/using-an-sql-statement-w_0_1.java

Complete source file; linked examples may select a region or line range.

```
public static void executeStatement(Connection con) {
    try(Statement stmt = con.createStatement();) {
        String SQL = "SELECT LastName, FirstName FROM Person.Contact ORDER BY LastName";
        ResultSet rs = stmt.executeQuery(SQL);

        while (rs.next()) {
            System.out.println(rs.getString("LastName") + ", " + rs.getString("FirstName"));
        }
    }
    // Handle any errors that may have occurred.
    catch (SQLException e) {
        e.printStackTrace();
    }
}

```
