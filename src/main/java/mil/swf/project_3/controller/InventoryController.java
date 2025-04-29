package mil.swf.project_3.controller;

import mil.swf.project_3.entity.Inventory;
import mil.swf.project_3.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
