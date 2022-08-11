package com.monitorme.jsensor;

import com.profesorfalken.jsensors.JSensors;
import com.profesorfalken.jsensors.model.components.Components;
import com.profesorfalken.jsensors.model.components.Gpu;
import com.profesorfalken.jsensors.model.sensors.Fan;
import com.profesorfalken.jsensors.model.sensors.Load;
import com.profesorfalken.jsensors.model.sensors.Temperature;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import oshi.SystemInfo;
import oshi.hardware.GraphicsCard;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.OperatingSystem;

public class DadosGpu {

    //JSensors
    Components components = JSensors.get.components();
    List<Gpu> gpus = components.gpus;
    //Oshi
    SystemInfo si = new SystemInfo();
    HardwareAbstractionLayer hal = si.getHardware();
    OperatingSystem os = si.getOperatingSystem();

    public List getLoadInfo() {
        Integer i = 0;
        List<Double> loadGpu = new ArrayList<>();
        for (final Gpu c : gpus) {
            List<Load> loads = c.sensors.loads;
            for (final Load x : loads) {
                i++;
                if (x.name.startsWith("Load GPU Core")) {
                    loadGpu.add(x.value);
                } else if (x.name.startsWith("Load GPU Memory Controller")) {
                    loadGpu.add(x.value);
                } else if (x.name.startsWith("Load GPU Video Engine")) {
                    loadGpu.add(x.value);
                } else if (x.name.startsWith("Load GPU Memory")) {
                    loadGpu.add(x.value);
                }
            }
        }
        return loadGpu;
    }

    public String getNomeGpu() {
        String nomeGpu = "";
        try {
            for (GraphicsCard c : hal.getGraphicsCards()) {
                nomeGpu = c.getName();
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return nomeGpu;
    }

    public Double getMediaTemperatura() {
        Double newMedia = 0.0;
        List<Double> temperaturaGpu = new ArrayList<>();
        try {
            Double soma = 0.0;
            for (final Gpu g : gpus) {

                List<Temperature> temps = g.sensors.temperatures;
                for (final Temperature t : temps) {
                    temperaturaGpu.add(t.value);
                }
                for (Integer i = 0; i < temperaturaGpu.size(); i++) {
                    soma += temperaturaGpu.get(i);
                }
            }
            newMedia = soma / temperaturaGpu.size();
        } catch (Exception e) {
            System.out.println(e);
        }
        return newMedia;
    }

    public Double getFanRpm() {
        Double fanRPM = 0.0;
        for (final Gpu g : gpus) {
            List<Fan> fans = g.sensors.fans;
            System.out.println("fans encontradas = " + fans);
            for (final Fan fan : fans) {
                System.out.println(fan.name + ": " + fan.value + " RPM");
            }
        }
        return fanRPM;
    }

    public String saveDadosGpu() {
        getLoadInfo();
        JSONObject dadosGpuToJson = new JSONObject();

        try {
            dadosGpuToJson.put("nomeGpu", getNomeGpu());
            dadosGpuToJson.put("coreGpu", getCoreGpu());
            dadosGpuToJson.put("fanGpu", getFanRpm());
            dadosGpuToJson.put("temperaturaMedia", getMediaTemperatura());
            dadosGpuToJson.put("memoriaCtrlGpu", getMemoryControllerGpu());
            dadosGpuToJson.put("memoriaVRamGpu", getMemoryGpu());
            dadosGpuToJson.put("videoEngineGpu", getVideoEngineGpu());

            //Com esse String acima podemos guardar um unico campo
            //no banco de dados, e consumir esse JSON no front-end web
        } catch (JSONException ex) {
            Logger.getLogger(DadosGpu.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
        return dadosGpuToJson.toString();
    }

    //Getters
    public Double getMemoryGpu() {
        Double memoryGpu = (Double) getLoadInfo().get(3);

        if (memoryGpu == null || memoryGpu == 0) {
            for (GraphicsCard c : hal.getGraphicsCards()) {
                memoryGpu = Double.valueOf(c.getVRam());
            }
        }
        return memoryGpu;
    }

    public Double getMemoryControllerGpu() {
        return (Double) getLoadInfo().get(1);
    }

    public Double getVideoEngineGpu() {
        return (Double) getLoadInfo().get(2);
    }

    public Double getCoreGpu() {
        return (Double) getLoadInfo().get(0);
    }
}
