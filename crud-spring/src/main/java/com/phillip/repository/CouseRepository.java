package com.phillip.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.phillip.model.Course;

// o repository é responável por retornar os dados a partir do meu banco de dados sendo interface e passamos no generics, qual vai ser a entidade e o tipo dela.

public interface CouseRepository extends JpaRepository<Course, Long> {

}