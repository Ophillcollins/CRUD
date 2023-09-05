package com.phillip.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

// o Data faz parte da biblioteca lombok para pegar os getters e os setters e faz sua declaração.

@Data

// a Entity faz da nossa classe uma entidade, para pegar os dados do curso que queremos.

@Entity
public class Course {
    
    // aqui é onde eu pego os dados que vão ser retornados do meu bd

    // o @Id é anotado como minha chave primária.

    @Id    
    // aqui é onde o o valor é gerado automaticamente no bd quando for feito um insert.
    @GeneratedValue(strategy = GenerationType.AUTO)
    @jsonProperty("_id")
    private long _id;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 10, nullable = false)
    private String category;

    // @Column (length =  6, nullable = false)
    // private String time;

}