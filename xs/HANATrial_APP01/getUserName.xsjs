//https://hanatrialp1734920969trial.hanatrial.ondemand.com/amol/xs/HANATrial_APP01/getUserName.xsjs?id=003
var empId = $.request.parameters.get("id");
var conn = $.hdb.getConnection();
    if(empId!==null&&empId!==""){
        var query= 'select * from "AMOL"."amol.model.HANATrial_APP01::EmployeeTable" where EMP_ID = '+empId+'';
        var rs = conn.executeQuery(query);
    }
    $.response.setBody('Hello '+$.session.getUsername()+' \n Your record id : '+JSON.stringify(rs));