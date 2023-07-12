package com.phillip.Controller;

import java.util.List;

import javax.management.loading.ClassLoaderRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phillip.model.Course;
import com.phillip.repository.CouseRepository;
import lombok.AllArgsConstructor;

@RestController

// endpoint que vai ficar exposto, é no @RequestMapping que conseguimos obter informações do que queremos passar.

@RequestMapping ("/api/courses")

// aqui é criado automaticamente o construtor usando o lombok.
@AllArgsConstructor

public class CourseController {
    private final CouseRepository courseRepository;    

    // aqui é onde pega o doGet por tras dos panos para pegar os dados da minha api.

    @GetMapping
    public List<Course> list() {
        return courseRepository.findAll();
    }
    
}