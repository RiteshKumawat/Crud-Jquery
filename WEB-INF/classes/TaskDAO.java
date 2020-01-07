public class TaskDAO
{
	int taskid;
	String taskname;
	String priority;

	public int getId()
	{
		return taskid;
	}
	public void setId(int taskid)
	{
		this.taskid=taskid;
	}


	public String getPriority()
	{
		return priority;
	}
	public void setPriority(String priority)
	{
		this.priority = priority;
	}

	public String getTaskName()
	{
		return taskname;
	}
	public void setTaskName(String taskname)
	{
		this.taskname=taskname ;
	}
}