using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Openlogin.Models
{
    public class ChangePassword
    {
        //[Required(ErrorMessage = "Username is required")]
        [Display(Name ="Username")]
        public String Username { get; set; }

        [Display(Name = "Old Password")]
        [Required(ErrorMessage = "Old Password is required")]
        [DataType(DataType.Password)]
        public String OldPassword { get; set; }

        [Display(Name = "New Password")]
        [Required(ErrorMessage = "New Password is required")]
        [DataType(DataType.Password)]
        public String NewPassword { get; set; }

        [Display(Name = "Confirm New Password")]
        [Compare("NewPassword", ErrorMessage = "Please confirm your password")]
        [DataType(DataType.Password)]
        public String ConfirmPassword { get; set; }

    }
}