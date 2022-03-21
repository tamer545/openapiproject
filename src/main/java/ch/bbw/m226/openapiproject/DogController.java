package ch.bbw.m226.openapiproject;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import javax.annotation.PostConstruct;

import ch.bbw.m226.openapi.generated.controller.DogsApi;
import ch.bbw.m226.openapi.generated.dto.DogDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
public class DogController implements DogsApi {

    private final Map<Integer, DogDTO> dogs = new HashMap<>();

    private final Random random = new Random();

    @PostConstruct
    public void someInitialHorses() {
        addDog(new DogDTO().breed("Golden Retriever"));
        addDog(new DogDTO().name("Tobi"));
        addDog(new DogDTO().name("Kira").breed("Bernersenn"));
    }

    @Override
    public ResponseEntity<DogDTO> addDog(DogDTO newDog) {
        newDog.setId(random.nextInt(Integer.MAX_VALUE));
        dogs.put(newDog.getId(), newDog); // yolo ignoring conflicts
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(newDog);
    }

    @Override
    public ResponseEntity<List<DogDTO>> getDogs(Integer limit) {
        return ResponseEntity.ok(dogs.values()
                .stream()
                .sorted(Comparator.comparing(DogDTO::getId))
                .limit(limit == null ? 100 : limit)
                .toList());
    }
}
