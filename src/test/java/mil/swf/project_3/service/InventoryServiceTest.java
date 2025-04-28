package mil.swf.project_3.service;

import jakarta.persistence.criteria.CriteriaBuilder;
import mil.swf.project_3.entity.Inventory;
import mil.swf.project_3.repository.InventoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;


public class InventoryServiceTest {

    @Mock
    InventoryRepository inventoryRepository;

    @InjectMocks
    InventoryService inventoryService;

    // Global variables
    Inventory item1;
    Inventory item2;
    List<Inventory> testInventory;

    @BeforeEach
    void setup(){
        // Create test items
        item1 = new Inventory("Toyota", "Tacoma", 2060, 54.6, false);
        item2 = new Inventory("Ford", "Bronc", 2024, 43000.0, true);

        // Populate ID
        item1.setId(1L);
        item2.setId(2L);

        // Assign to list
        testInventory = new ArrayList<>();
        testInventory.add(item1);
        testInventory.add(item2);

        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldGetAllInventoryEntries(){

        // Arrange
        Mockito.when(inventoryRepository.findAll()).thenReturn(testInventory);

        // Act
        List<Inventory> returnedList = inventoryService.getAllInventory();

        // Assert
        verify(inventoryRepository,times(1)).findAll();
        assert(returnedList).equals(testInventory);
    }

    @Test
    void shouldGetInventoryEntryById() {
        // Arrange
        Mockito.when(inventoryRepository.findById(1L)).thenReturn(Optional.of(item1));

        // Act
        Optional<Inventory> returnedItem = inventoryService.getInventoryById(1L);

        // Assert
        verify(inventoryRepository, times(1)).findById(1L);
        assert(returnedItem).equals(Optional.of(item1));

    }

    @Test
    void shouldCreateInventoryItem() {
        // Arrange
        Inventory inventoryToSave = new Inventory("Toyota", "Corolla", 2014, 12.00, true);
        Mockito.when(inventoryRepository.save(inventoryToSave)).thenReturn(inventoryToSave);

        //Act
        Inventory newInventorySaved =  inventoryService.createInventoryItem(inventoryToSave);

        //Assert
        verify(inventoryRepository, times(1)).save(any(Inventory.class));
        assert(inventoryToSave).equals(newInventorySaved);
    }

    @Test
    void shouldDeleteInventoryItemById() {
        //Arrange
        Mockito.when(inventoryRepository.existsById(3L)).thenReturn(true);

        //Act
        String response = inventoryService.deleteInventoryById(3L);
        String responseNotFound = inventoryService.deleteInventoryById(4L);

        //Assert
        verify(inventoryRepository,times(1)).deleteById(any(Long.class));
        assert (response).equals("Item deleted.");
        assert (responseNotFound).equals("Item not found.");
    }

    @Test
    void shouldUpdateInventoryItemById(){
        //Arrange
        Inventory beforeUpdateItem = new Inventory("Toyota", "Tacoma", 2060, 54.6, false);
        Inventory afterUpdateItem = new Inventory("Toyota", "Tacoma", 2025, 54.6, false);
        beforeUpdateItem.setId(3L);
        afterUpdateItem.setId(3L);
        Mockito.when(inventoryRepository.existsById(3L)).thenReturn(true);
        Mockito.when(inventoryRepository.getReferenceById(3L)).thenReturn(beforeUpdateItem);
        Mockito.when(inventoryRepository.save(beforeUpdateItem)).thenReturn(afterUpdateItem);


        //Act
        Optional<Inventory> returnedItem = inventoryService.updateInventoryItem(afterUpdateItem, 3L);

        //Assert
        verify(inventoryRepository,times(1)).save(any(Inventory.class));
//        assert (returnedItem).equals(Optional.of(afterUpdateItem));

    }
}
