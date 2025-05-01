package mil.swf.project_3.controller;

import mil.swf.project_3.entity.Inventory;
import mil.swf.project_3.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/carInventory")
public class InventoryController {
    private final InventoryService inventoryService;

    public InventoryController (InventoryService inventoryService){
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<Inventory> newInventoryItem(@RequestBody Inventory newItem){
        inventoryService.createInventoryItem(newItem);
        return ResponseEntity.status(201).body(newItem);
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> findAll(){
        List<Inventory> items = inventoryService.getAllInventory();
        return ResponseEntity.ok(items);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getById(@PathVariable Long id) {
        return ResponseEntity.of(inventoryService.getInventoryById(id));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        inventoryService.deleteInventoryById(id);
        return ResponseEntity.noContent().build();

    }

    @PutMapping("{id}")
    public ResponseEntity<Inventory> updateItem(@RequestBody Inventory newItem) {
    inventoryService.updateInventoryItem(newItem, newItem.getId());
    return ResponseEntity.ok(newItem);
    }

}
