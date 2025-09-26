package com.FSP.BackEnd.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // This is our test. If we see this message in the logs, we know the rebuild worked.
    public WebConfig() {
        System.out.println("!!!!!!!!!!!!!! WebConfig IS LOADED !!!!!!!!!!!!!!");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("!!!!!!!!!!!!!! Configuring CORS Mappings !!!!!!!!!!!!!!");
        registry.addMapping("/**") // Apply to all endpoints
                .allowedOrigins("*") // Allow all origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed methods
                .allowedHeaders("*"); // Allow all headers
    }
}

