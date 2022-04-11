package ch.bbw.m226.openapiproject;

import java.time.LocalDate;
import java.util.UUID;

import ch.bbw.m226.openapi.generated.dto.DogDTO;
import org.assertj.core.api.WithAssertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;
@WebFluxTest
@ExtendWith(SpringExtension.class)
class RestintroApplicationTests implements WithAssertions {

	@Autowired
	private WebTestClient webClient;

	@Test
	void getDogs() {
		var dogs = webClient.get()
				.uri("/dogs")
				.exchange()
				.expectStatus()
				.isOk()
				.expectBodyList(DogDTO.class)
				.returnResult()
				.getResponseBody();
		assertThat(dogs).hasSizeGreaterThanOrEqualTo(3);
	}

	@Test
	void addPony() {
		var toCreate = new DogDTO().name("Willy" + UUID.randomUUID())
				.breed("Golden Retriever");
		var created = webClient.post()
				.uri("/dogs")
				.bodyValue(toCreate)
				.exchange()
				.expectStatus()
				.isCreated()
				.expectBody(DogDTO.class)
				.returnResult()
				.getResponseBody();
		assertThat(created).usingRecursiveComparison()
				.ignoringFields("id")
				.isEqualTo(toCreate);
	}
}