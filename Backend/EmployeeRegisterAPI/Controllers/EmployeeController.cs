﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeRegisterAPI.Models;

namespace EmployeeRegisterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EmployeeController(EmployeeDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeModel>>> GetEmployees()
        {
            return await _context.Employees.Select(x => new EmployeeModel()
            {
                EmployeeId = x.EmployeeId,
                EmployeeName = x.EmployeeName,
                Occupation = x.Occupation,
                ImageName = x.ImageName,
                ImageSrc = $"{Request.Scheme}://{Request.Host}/Images/{x.ImageName}"
            }).ToListAsync();
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeModel>> GetEmployeeModel(int id)
        {
            var employeeModel = await _context.Employees.FindAsync(id);

            if (employeeModel == null)
            {
                return NotFound();
            }

            return employeeModel;
        }

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeModel(int id, [FromForm] EmployeeModel employeeModel)
        {
            if (id != employeeModel.EmployeeId)
            {
                return BadRequest();
            }

            if (employeeModel.ImageFile != null)
            {
                DeleteImage(employeeModel.ImageName);
                employeeModel.ImageName = await SaveImage(employeeModel.ImageFile);
            }

            _context.Entry(employeeModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmployeeModel>> PostEmployeeModel([FromForm] EmployeeModel employeeModel)
        {

            employeeModel.ImageName = await SaveImage(employeeModel.ImageFile);
            _context.Employees.Add(employeeModel);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeModel(int id)
        {
            var employeeModel = await _context.Employees.FindAsync(id);
            if (employeeModel == null)
            {
                return NotFound();
            }

            DeleteImage(employeeModel.ImageName);
            _context.Employees.Remove(employeeModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeModelExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }



        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);
            if(System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }

        }
    }
}
