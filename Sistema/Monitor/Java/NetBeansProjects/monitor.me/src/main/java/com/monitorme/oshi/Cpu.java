package com.monitorme.oshi;

import com.profesorfalken.jsensors.JSensors;
import com.profesorfalken.jsensors.model.components.Components;
import com.profesorfalken.jsensors.model.sensors.Temperature;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.Sensors;
import oshi.util.FormatUtil;
import oshi.util.Util;

public class Cpu {

    DecimalFormat df = new DecimalFormat();
    private SystemInfo si = new SystemInfo();
    private HardwareAbstractionLayer hal = si.getHardware();
    private CentralProcessor cpu = hal.getProcessor();
    private Sensors sensors = hal.getSensors();
    private float dadosCPU;
    private List<Double> listFloatCpu = new ArrayList<>();
    Components components = JSensors.get.components();
    List<com.profesorfalken.jsensors.model.components.Cpu> cp = components.cpus;
    long[] freq;

    //informaçoes do processador
    public String printProcessor() {
        return cpu.getProcessorIdentifier().getName();
    }

    //velocidade de clock de cada processador lógico
    public StringBuilder getClock() {
        freq = cpu.getCurrentFreq();
        StringBuilder sb = new StringBuilder("Current Frequencies: ");

        if (freq[0] > 0) {
            for (int i = 0; i < freq.length; i++) {
                if (i > 0) {
                    sb.append(", ");
                }
                sb.append(FormatUtil.formatHertz(freq[i]));
            }
        }
        return sb;
    }

    public Double getTemperature() {
        Double tempTotal = 0.0;
        if (sensors.getCpuTemperature() == 0.0) {
            for (final com.profesorfalken.jsensors.model.components.Cpu c : cp) {
                List<Temperature> temp = c.sensors.temperatures;
                for (final Temperature tempCpu : temp) {
                    System.out.println(tempCpu.name + ": " + tempCpu.value);
                    if (tempCpu.name.startsWith("Temp CPU Package")) {
                        tempTotal = tempCpu.value;
                    }
                }
            }
        }else{
            tempTotal = sensors.getCpuTemperature();
        }
        return tempTotal;
    }

    public float getUso() {
        try {

            CentralProcessor cp = hal.getProcessor();
            long[] prevTicks = cp.getSystemCpuLoadTicks();
            Util.sleep(1000);
            float usoCPU = (float) (cp.getSystemCpuLoadBetweenTicks(prevTicks) * 100d);
            dadosCPU = usoCPU;
        } catch (Exception e) {
            System.out.println("erro: " + e);;
        }
        return dadosCPU;
    }

    public String saveDadosCpu() {

        JSONObject dadosCpuToJson = new JSONObject();

        try {
            dadosCpuToJson.put("getUsoUser", String.format(" %.2f", getUso()));
            dadosCpuToJson.put("getTemperatura", String.format(" %.2f", getTemperature()));
            dadosCpuToJson.put("getNomeProc", printProcessor());
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }

        return dadosCpuToJson.toString();
    }
}
