package com.monitorme.oshi;

import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HWDiskStore;
import oshi.hardware.HWPartition;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.PhysicalMemory;
import oshi.hardware.Sensors;
import oshi.software.os.FileSystem;
import oshi.software.os.OSFileStore;
import oshi.software.os.OperatingSystem;
import oshi.util.FormatUtil;

public class Memoria {

    SystemInfo si = new SystemInfo();
    HardwareAbstractionLayer hal = si.getHardware();
    CentralProcessor cpu = hal.getProcessor();
    OperatingSystem os = si.getOperatingSystem();
    FileSystem fs = os.getFileSystem();

    private List<JSONObject> dadosMemoria = new ArrayList<>();    
    private float porcentagemMemoria;

    //Porcetagem da memória que está sendo gasta
    public float getPorcentagemRam() {
        long usadoMem = hal.getMemory().getTotal() - hal.getMemory().getAvailable();
        return this.porcentagemMemoria = (float) ((100d * usadoMem) / hal.getMemory().getTotal());
    }
    
    public String getFromJson(String valor){
        JSONArray xt = new JSONArray(getDadosMemoriaRam());
        JSONObject y = xt.getJSONObject(0);        
        return y.get(valor).toString();
    }

    //Dados Memorias
    public List<JSONObject> coletaDadosMemoria(HWDiskStore[] diskStores) {
        JSONObject jsonDisk = new JSONObject();
        try {
            jsonDisk.put("Avaiable", (hal.getMemory().getAvailable() / 1024) / 1024);
            jsonDisk.put("PageSize", hal.getMemory().getPageSize());

        PhysicalMemory[] pmArray = hal.getMemory().getPhysicalMemory();
        if (pmArray.length > 0) {
            for (PhysicalMemory pm : pmArray) {
                jsonDisk.put("BankLabel", pm.getBankLabel());
                jsonDisk.put("Manufacturer", pm.getManufacturer());
                jsonDisk.put("MemoryType", pm.getMemoryType());
                jsonDisk.put("Capacidade", ((pm.getCapacity() / 1024) / 1024));
                jsonDisk.put("VelocidadeClock", ((pm.getClockSpeed() / 1024) / 1024));

            }
        }
        jsonDisk.put("MemoriaVirtual", hal.getMemory().getVirtualMemory());
        jsonDisk.put("MemoriaTotal", (hal.getMemory().getTotal() / 1024) / 1024);

        for (HWDiskStore disk : diskStores) {
            jsonDisk.put("Modelo", disk.getModel());
//            discosRigidos.add("Nome: " + disk.getName()); // Talvez não seja necessário por isso deixei comentado
            jsonDisk.put("Serial", disk.getSerial());

            HWPartition[] partitions = disk.getPartitions();
            for (HWPartition part : partitions) {
                jsonDisk.put("Identificacao", part.getIdentification());
                jsonDisk.put("MountPoint", part.getMountPoint());
                jsonDisk.put("Name", part.getName());
                jsonDisk.put("Tipo", part.getType());
                jsonDisk.put("Uuid", part.getUuid());
                jsonDisk.put("Minor", part.getMajor());
                jsonDisk.put("Major", part.getMinor());
            }
        }
        dadosMemoria.add(jsonDisk);
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return dadosMemoria;
    }

//    pegar a quantia total de espaço disponivel
    public List<String> getHdDisponivel() {
        OSFileStore[] fsArray = fs.getFileStores();
        List<String> diskName = new ArrayList<>();
        String hdDisponivel;
        for (OSFileStore fs : fsArray) {
            hdDisponivel = String.valueOf((fs.getMount())) + String.format(" %.2f", Double.valueOf(((fs.getUsableSpace() / 1024) / 1024) / 1024));
            diskName.add(hdDisponivel);
        }
        return diskName;
    }

//    pegar a capacidade total de HD
    public List<String> getHdTotal() {
        OSFileStore[] fsArray = fs.getFileStores();
        List<String> disksFree = new ArrayList<>();
        String hdTotal;

        for (OSFileStore fs : fsArray) {
            hdTotal = String.valueOf((fs.getMount())) + (String.valueOf(FormatUtil.formatBytes(fs.getTotalSpace())));
            disksFree.add(hdTotal);
        }

        return disksFree;
    }

    //Getters & Setters
    public List<JSONObject> getDadosMemoriaRam() {
        return coletaDadosMemoria(hal.getDiskStores());
    }

    public String saveDadosMemoria() {

        JSONObject dadosMemoToJson = new JSONObject();

        try {
            dadosMemoToJson.put("porcentRam", String.format(" %.2f", getPorcentagemRam()));
            dadosMemoToJson.put("dadosMemoria", getDadosMemoriaRam());
            dadosMemoToJson.put("hdTotal", getHdTotal());
            dadosMemoToJson.put("hdDisponivel", getHdDisponivel());
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }

        return dadosMemoToJson.toString();
    }
}
