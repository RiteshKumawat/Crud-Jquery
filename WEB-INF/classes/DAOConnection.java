	                import com.mongodb.client.MongoDatabase;
                import com.mongodb.MongoClient;
                import java.util.*;
                import java.io.*;

                import com.mongodb.*;

                import com.mongodb.client.FindIterable; 
                import com.mongodb.client.MongoCollection; 
                import com.mongodb.client.MongoDatabase;  
                import com.mongodb.client.model.Filters; 
                import com.mongodb.client.model.Updates; 
                import java.util.Iterator; 
                import org.bson.Document; 
                import com.mongodb.MongoClient; 
                import com.mongodb.MongoCredential;  
                public class DAOConnection
                {
                	MongoCollection<Document> collection = null;
                	
                	
                  public DAOConnection()
                  {
                    System.out.println("Constructor chala");
                    getConnection();
                  }

                  
                  public void getConnection()
                	{
                    MongoClient mongo = new MongoClient( "localhost" , 27017 ); 
                    MongoDatabase database = mongo.getDatabase("taskdb"); 
                    collection = database.getCollection("task");
                    System.out.println("Collection myCollection selected successfully"); 
                  }


                  public int getNextSequence(String name) 
                  {
    MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
    
    DB db = mongoClient.getDB("taskdb");
    DBCollection col = db.getCollection("counters");
    BasicDBObject find = new BasicDBObject();
    find.put("_id", name);
    BasicDBObject update = new BasicDBObject();
    update.put("$inc", new BasicDBObject("seq", 1));
    DBObject obj =  col.findAndModify(find, update);
    String s = obj.get("seq").toString();
    int id= new Double(s).intValue();
    
    return id;

}

                  public void insert(TaskDAO task)
                  {
                    System.out.println(task.getId());
                    System.out.println(task.getTaskName());

                   task.setId( getNextSequence("id") );

                    Document document = new Document() 
                    .append("_id", task.getId()) 
                    .append("taskname", task.getTaskName())
                    .append("priority",task.getPriority());
                    collection.insertOne(document); 
                  }



                  public void update(TaskDAO task)
                  {
                      
                    System.out.println("Ye he ->"+task.getId());
                    collection.updateMany(
                    Filters.eq("_id", task.getId()),
                    Updates.combine(
                    Updates.set("taskname", task.getTaskName()),
                    Updates.set("priority", task.getPriority())
    ));
                    System.out.println("Document update successfully...");  
                  }    


                  public void delete(int id)
                  {
                    collection.deleteOne(Filters.eq("_id", id)); 
                    System.out.println("Document deleted successfully..."); 
                  }    



                  public List<Document> getAll()
                  {
                    System.out.println("Gett all at DAOConnection");
                 List<Document> documents = (List<Document>) collection.find().into(new ArrayList<Document>());
  
               for(Document document : documents){
                   System.out.println(document);
               }
                   return documents;
               }



                 public static void main(String[] args) 
                 {
                  DAOConnection dao = new DAOConnection();
                  
                
                  //dao.update(t);
                   dao.getAll();
                  
                }

              }
