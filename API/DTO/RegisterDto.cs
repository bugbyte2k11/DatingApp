using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        //Username is required validation
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}