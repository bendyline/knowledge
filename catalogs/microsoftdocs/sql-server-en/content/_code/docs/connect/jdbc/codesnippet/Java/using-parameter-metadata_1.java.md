# Source code: docs/connect/jdbc/codesnippet/Java/using-parameter-metadata_1.java

Complete source file; linked examples may select a region or line range.

```
public static void getParameterMetaData(Connection con) {
    try(CallableStatement cstmt = con.prepareCall("{call HumanResources.uspUpdateEmployeeHireInfo(?, ?, ?, ?, ?)}");) {
        ParameterMetaData pmd = cstmt.getParameterMetaData();
        int count = pmd.getParameterCount();
        for (int i = 1; i <= count; i++) {
            System.out.println("TYPE: " + pmd.getParameterTypeName(i) + " MODE: " + pmd.getParameterMode(i));
        }
    }
    // Handle any errors that may have occurred.
    catch (SQLException e) {
        e.printStackTrace();
    }
}

```
