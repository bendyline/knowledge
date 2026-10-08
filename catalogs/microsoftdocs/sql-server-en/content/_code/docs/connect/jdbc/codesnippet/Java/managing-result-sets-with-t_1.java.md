# Source code: docs/connect/jdbc/codesnippet/Java/managing-result-sets-with-t_1.java

Complete source file; linked examples may select a region or line range.

```
public static void executeStatement(Connection con){
    try(Statement stmt = con.createStatement();) {
        String SQL = "SELECT TOP 10 * FROM Person.Contact";
        ResultSet rs = stmt.executeQuery(SQL);

        while (rs.next()) {
            System.out.println(rs.getString("FirstName") + " " + rs.getString("LastName"));
        }
    }
    // Handle any errors that may have occurred.
    catch (SQLException e) {
        e.printStackTrace();
    }
}

```
