using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Test_MVC_Project.DB_Context;
using Test_MVC_Project.Models;

namespace Test_MVC_Project.Controllers
{

    public class StudentController : Controller
    {

        private ApplicationDbContext db;

        public StudentController()
        {
            db = ApplicationDbContext.Create();
        }

        // GET: Student
        public ActionResult Index()
        {
            return View();
        }

        // GET: Students
        [HttpGet]
        public ActionResult ListStudents()
        {
            using (var db = ApplicationDbContext.Create())
            {
                IList<StudentModel> students = db.StudentModels.Where(x => !x.Disabled).OrderBy(x => x.Name).ThenBy(x => x.Number).ToList();

                return Json(new { students = students }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        public void Delete(int id)
        {
            StudentModel student = db.StudentModels.Find(id);
            student.Disabled = true;
            db.SaveChanges();
        }

        [HttpPost]
        public ActionResult Edit(int id)
        {
            StudentModel student = db.StudentModels.Find(id);

            return Json(new { student = student }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(int id, string name, string number)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                name = "Inget Namn";
            }

            if (string.IsNullOrWhiteSpace(number))
            {
                number = "Inget Nummer";
            }

            StudentModel student = db.StudentModels.Find(id);
            student.Name = name;
            student.Number = number;

            db.SaveChanges();

            return Json(new { student = student }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public StudentModel Create(string name, string number)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                name = "Inget Namn";
            }

            if (string.IsNullOrWhiteSpace(number))
            {
                number = "Inget Nummer";
            }

            StudentModel student = new StudentModel(name, number);

            db.StudentModels.Add(student);
            db.SaveChanges();

            return student;
        }

        public ActionResult DeleteConfirmation()
        {


            return PartialView("DeleteConfirmationPartial");
        }

    }

}