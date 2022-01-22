package com.koopey.api.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import org.springdoc.core.GroupedOpenApi;
import org.springdoc.core.customizers.OpenApiCustomiser;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.autoconfigure.endpoint.web.WebEndpointProperties;
import static org.springdoc.core.Constants.ALL_PATTERN;

@Configuration
public class SwaggerConfiguration {
    

//	@Profile("!prod")
/*@Bean
	public GroupedOpenApi actuatorApi(OpenApiCustomiser actuatorOpenApiCustomiser,
			OperationCustomizer actuatorCustomizer,
			WebEndpointProperties endpointProperties,
			@Value("${springdoc.version}") String appVersion) {
		return GroupedOpenApi.builder()
				.group("Actuator")
				.pathsToMatch(endpointProperties.getBasePath()+ ALL_PATTERN)
				.addOpenApiCustomiser(actuatorOpenApiCustomiser)
				.addOpenApiCustomiser(openApi -> openApi.info(new Info().title("Actuator API").version(appVersion)))
				.addOperationCustomizer(actuatorCustomizer)
				.pathsToExclude("/health/*")
				.build();
	}*/


 /* @Bean
	public GroupedOpenApi usersGroup(@Value("${springdoc.version}") String appVersion) {
		return GroupedOpenApi.builder().group("users")
				.addOperationCustomizer((operation, handlerMethod) -> {
					operation.addSecurityItem(new SecurityRequirement().addList("basicScheme"));
					return operation;
				})
				.addOpenApiCustomiser(openApi -> openApi.info(new Info().title("Users API").version(appVersion)))
				.packagesToScan("org.springdoc.demo.app2")
				.build();
	}*/

}
