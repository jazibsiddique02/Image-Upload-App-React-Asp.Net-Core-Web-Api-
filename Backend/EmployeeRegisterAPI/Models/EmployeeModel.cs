using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeRegisterAPI.Models
{
    public class EmployeeModel
    {
        [Key]
        public int EmployeeId { get; set; }

        [Column(TypeName ="nvarchar(50)")]
        public string EmployeeName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? Occupation { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? ImageName { get; set; }

        [NotMapped]
        public IFormFile? ImageFile { get; set; } // marked it not mapped because image file cant be stored in sql server.only path is stored
   
        [NotMapped]
        public string? ImageSrc { get; set; } // this is used to for complete url of the image (e.g.: https://localhost:7165/Images/WhatsApp-I254353624.jpg)


    }
}
