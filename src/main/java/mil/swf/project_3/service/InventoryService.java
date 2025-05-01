package mil.swf.project_3.service;

import mil.swf.project_3.entity.Inventory;
import mil.swf.project_3.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {
//    InventoryRepository inventoryRepository;

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }

    public Inventory createInventoryItem(Inventory newItem) {
        return inventoryRepository.save(newItem);
    }

    public String deleteInventoryById(Long id) {
        if (inventoryRepository.existsById(id)){
            inventoryRepository.deleteById(id);
         return "Item deleted.";
        }
        return "Item not found.";
    }

    public Optional<Inventory> updateInventoryItem(Inventory itemWithNewValues, Long id) {
        if(inventoryRepository.existsById(id)){
            Inventory tempItem = inventoryRepository.getReferenceById(id);
            tempItem.setMake(itemWithNewValues.getMake());
            tempItem.setModel(itemWithNewValues.getModel());
            tempItem.setPrice(itemWithNewValues.getPrice());
            tempItem.setYear(itemWithNewValues.getYear());
            tempItem.setUsed(itemWithNewValues.getIsUsed());
            inventoryRepository.save(tempItem);

            return Optional.of(tempItem);
        }
        return Optional.of(itemWithNewValues);
    }
}
