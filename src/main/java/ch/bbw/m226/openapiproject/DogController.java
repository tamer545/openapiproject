package ch.bbw.m226.openapiproject;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import javax.annotation.PostConstruct;


import ch.bbw.m226.openapi.generated.controller.DogsApi;
import ch.bbw.m226.openapi.generated.dto.DogDTO;
import ch.bbw.m226.openapi.generated.dto.FoodDTO;
import ch.bbw.m226.openapi.generated.dto.OwnerDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@Validated
@RestController
public class DogController implements DogsApi {

    private final Map<Integer, DogDTO> dogs = new HashMap<>();

    private final Random random = new Random();

    @PostConstruct
    public void someInitialDogs() {
        addDog(new DogDTO().breed("Golden Retriever").name("Goldi").owner(new OwnerDTO().age(BigDecimal.valueOf(13)).name("Kai se Owner")).food(new FoodDTO().type("Chicken").mainIngredients("Chicken, Spice").protein("Fat")));
        addDog(new DogDTO().name("Tobi").owner(new OwnerDTO().age(BigDecimal.valueOf(13)).name("Kai se Owner")).food(new FoodDTO().type("Chicken").mainIngredients("Chicken, Spice").protein("Fat")));
        addDog(new DogDTO().name("Kira").breed("Bernersenn").owner(new OwnerDTO().age(BigDecimal.valueOf(13)).name("Kai se Owner")).food(new FoodDTO().type("Chicken").mainIngredients("Chicken, Spice").protein("Fat")));
    }


    @Override
    public ResponseEntity<DogDTO> addDog(DogDTO newDog) {
        newDog.setId(random.nextInt(Integer.MAX_VALUE));
        dogs.put(newDog.getId(), newDog); // yolo ignoring conflicts
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(newDog);
    }

    @Override
    public ResponseEntity<Void> changeDogOwner(Integer dogId, OwnerDTO ownerDTO) {
        dogs.get(dogId).setOwner(ownerDTO);
        return null;
    }

    public ResponseEntity<DogDTO> changeDogOwner(int dogToChangeOwner, OwnerDTO newOwner) {
        dogs.get(dogToChangeOwner).owner(newOwner);
        return ResponseEntity.status(HttpStatus.CREATED).body(dogs.get(dogToChangeOwner));
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
