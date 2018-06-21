using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Test_MVC_Project.DB_Context;

namespace Test_MVC_Project.Models
{
    public class StudentModel
    {

        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Number { get; set; }

        public bool Disabled { get; set; }

        public StudentModel()
        {

        }

        public StudentModel(string name, string number)
        {
            this.Name = name;
            this.Number = number;
        }

        public StudentModel(int id, string name, string number)
        {
            this.Id = id;
            this.Name = name;
            this.Number = number;
        }

    }
}