using System.Data.Entity;
using Test_MVC_Project.Models;

namespace Test_MVC_Project.DB_Context
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<StudentModel> StudentModels { get; set; }

        //TODO: Connect to MySQL: https://stackoverflow.com/questions/20277677/dynamic-mysql-database-connection-for-entity-framework-6

        public ApplicationDbContext() : base("DataContext")
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

    }
}