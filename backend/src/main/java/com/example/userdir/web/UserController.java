package com.example.userdir.web;

import com.example.userdir.model.User;
import com.example.userdir.repo.UserRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {
    private static final String ID = "id";
    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<User> list() {
        return repo.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@Valid @RequestBody User user) {
        user.setId(null);
        return repo.save(user);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable(ID) Long id, @Valid @RequestBody User incoming) {
        return repo.findById(id).map(u -> {
            u.setName(incoming.getName());
            u.setEmail(incoming.getEmail());
            return repo.save(u);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable(ID) Long id) {
        repo.deleteById(id);
    }
}