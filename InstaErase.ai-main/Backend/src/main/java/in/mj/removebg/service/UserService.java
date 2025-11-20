package in.mj.removebg.service;

import in.mj.removebg.dto.UserDTO;

public interface UserService {

    UserDTO saveUser(UserDTO userDTO);

    UserDTO getUserByClerkId(String clerkId);
    void deleteUserByClerkId(String clerkId);
}
