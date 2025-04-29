package mil.swf.project_3.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import mil.swf.project_3.entity.Inventory;
import mil.swf.project_3.service.InventoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


public class ControllerTest {

    //Setup
    private MockMvc mockMvc;
    private InventoryService service;
    private ObjectMapper mapper;

    @BeforeEach
    void setUp(){
        service = mock(InventoryService.class);
        InventoryController controller = new InventoryController(service);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();

        mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
    }

    @Test
    void  createsInventoryItem() throws  Exception {
        Inventory item = new Inventory("Mclaren", "650S", 2018, 175000.00, true);
        when(service.createInventoryItem(any(Inventory.class))).thenReturn(item);
        mockMvc.perform(post("/api/carInventory").contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(item)))
                .andExpect(status().isCreated());


    }

    @Test
    void fetchInventory() throws Exception {
        Inventory item1 = new  Inventory("Mclaren", "650S", 2018, 175000.00, true);
        Inventory item2 = new Inventory("Aston Martin", "vantage", 2020, 200000.00, true);
        List<Inventory> mockData = new ArrayList<Inventory>(List.of(item1, item2));
        when(service.getAllInventory()).thenReturn(mockData);
        mockMvc.perform(get("/api/carInventory")).andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void getsInventoryItemById() throws Exception {
        Inventory item = new Inventory("Mclaren", "650S", 2018, 175000.00, true);
        when(service.getInventoryById(1L)).thenReturn(Optional.of(item));

        mockMvc.perform(get("/api/carInventory/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.make").value("Mclaren"));
    }

}
