# Source code: docs/connect/jdbc/codesnippet/Java/handling-errors_1.java

Complete source file; linked examples may select a region or line range.

```
public static void executeSQLException(Connection con) {
    try (Statement stmt = con.createStatement();) {
        String SQL = "SELECT TOP 10 * Person.Contact";
        ResultSet rs = stmt.executeQuery(SQL);

        while (rs.next()) {
            System.out.println(rs.getString("FirstName") + " " + rs.getString("LastName"));
        }
    }
    catch (SQLException se) {
        do {
            System.out.println("SQL STATE: " + se.getSQLState());
            System.out.println("ERROR CODE: " + se.getErrorCode());
            System.out.println("MESSAGE: " + se.getMessage());
            System.out.println();
        }
        while (se != null);
    }
}

```
