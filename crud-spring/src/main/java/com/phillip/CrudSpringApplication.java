package com.phillip;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.phillip.model.Course;
import com.phillip.repository.CouseRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}
	@Bean
	CommandLineRunner initDatabase(CouseRepository couseRepository) {
		return args -> {
			couseRepository.deleteAll();
			Course c = new Course();
			c.setName("Angular com spring");
			c.setCategory("front-End");
			couseRepository.save(c);
		};
	}
}