import javax.servlet.http.*;
import org.json.*;
import org.bson.Document; 
import java.util.*;

public class CrudManager extends HttpServlet
{
DAOConnection dao = new DAOConnection();
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
 doGet(request,response);
}
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
	String operation  = request.getPathInfo();
	System.out.println("Path of the request -->"+operation);
	
	if(operation.equals("/insert"))
	{
		try{
		String task = request.getParameter("test");
		JSONObject jobj = new JSONObject(task);
		 //JSONObject data = jobj.getJSONObject();
		 //System.out.println("Data - "+data);
		String task1 = jobj.getString("task");
		String priority  = jobj.getString("priority");
		
		insert(task1,priority);
	}catch (Exception e) {
		System.out.println(e);
	}
	}
	if(operation.equals("/update"))
	{
			try{
	System.out.println("_________________In Update_______________");
		String task = request.getParameter("test");
		JSONObject jobj = new JSONObject(task);
		 //JSONObject data = jobj.getJSONObject();
		 //System.out.println("Data - "+data);
		String task1 = jobj.getString("task");
		String priority  = jobj.getString("priority");
		System.out.println("Task jo aya he new  "+task1);
		int id = jobj.getInt("id");
		System.out.println("Task id  jo mili-->"+id);
		update(id,task1,priority);
		System.out.println("_____________Ends___________");
	}catch (Exception e) {
		System.out.println(e);
	}	
	}
	if(operation.equals("/delete"))
	{
	
		String task = request.getParameter("id");
		System.out.println("id is"+task);
		//JSONObject jobj = new JSONObject(task);
		 //JSONObject data = jobj.getJSONObject();
		 //System.out.println("Data - "+data);
		//String task1 = jobj.getString("task");
		//String priority  = jobj.getString("priority");
		
		
		int id = Integer.parseInt(request.getParameter("id"));
		System.out.println("Id == : "+id);
		deleteTodo(id);
	}
	
	if(operation.equals("/getAll"))
	{
		System.out.println("get all invoked");
		getAll(response);
	}
	

}

public void update(int id,String task,String priority)
{
TaskDAO taskdao =  new TaskDAO();
System.out.println("melea== "+id+" "+task+" "+priority);
	taskdao.setId(id);
	taskdao.setTaskName(task);
	taskdao.setPriority(priority);
	dao.update(taskdao);	
}
public void deleteTodo(int id)
{

dao = new DAOConnection();
dao.delete(id);
}

public void insert(String task,String priority)
{
	TaskDAO taskdao =  new TaskDAO();
	taskdao.setTaskName(task);
	taskdao.setPriority(priority);
	new DAOConnection().insert(taskdao);
}
public JSONArray getData()	
{
	System.out.println("Get all me ");
	JSONArray jarray =  new JSONArray();
	dao = new DAOConnection();
	System.out.println("No issues");
	List<Document> doc = dao.getAll();

	for(Document d:doc)
		{
			try{
			JSONObject jobj = new JSONObject();
			jobj.put("id",d.get("_id"));
			jobj.put("taskname",d.get("taskname"));
			jobj.put("priority",d.get("priority"));
			jarray.put(jobj);

			System.out.println("Docs - >"+d.get("_id"));
	
		}catch (Exception e) {
			System.out.println(e);
		}
		}
	

return jarray;
}

public void getAll(HttpServletResponse response)
{
try{
JSONArray jarray = getData();

        response.setContentType("application/json");
        response.getWriter().write(jarray.toString());
System.out.println("R E S P O N SE---> "+response);
	}catch (Exception e) {
		System.out.println(e);
	}
}
}
