package com.cs.rd;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
@OpenAPIDefinition(
	    info = @Info(
	        title = "Nskrdsystem",
	        version = "1.0",
	        description = "API documentation for my project"
	    )
	)
@SpringBootApplication
public class NskrdsystemApplication {
	public static void main(String[] args) {
		SpringApplication.run(NskrdsystemApplication.class, args);
		System.out.println("Success!");
		
	}

}
