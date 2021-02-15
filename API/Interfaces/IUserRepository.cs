using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);

        //Task<IEnumerable<MemberDto>> GetMembersAsync(); //Use queries to populate the data (more efficient)
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams); //Use queries to populate the data (more efficient)
        Task<MemberDto> GetMemberAsync(string username);
    }
}