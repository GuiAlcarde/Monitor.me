/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitorme.chart;

/**
 *
 * @author bruno
 */

import com.monitorme.jsensor.DadosGpu;
import com.monitorme.oshi.Cpu;
import com.monitorme.oshi.Memoria;
import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JInternalFrame;
import javax.swing.Timer;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.ValueAxis;
import org.jfree.chart.plot.XYPlot;
import org.jfree.data.time.DynamicTimeSeriesCollection;
import org.jfree.data.time.Second;
import org.jfree.data.xy.XYDataset;


public class ChartGpu extends JInternalFrame {

    private static final float MINMAX = 100;
    private static final int COUNT = 2 * 130;
    private Timer timer;
    DadosGpu gpu = new DadosGpu();
    

    public ChartGpu() {
        final DynamicTimeSeriesCollection dataset =
        new DynamicTimeSeriesCollection(1, COUNT, new Second());
        dataset.setTimeBase(new Second(0, 0, 0, 1, 1, 2011));
        dataset.addSeries(chartData(), 0, "");
        JFreeChart chart = createChart(dataset);
        this.add(new ChartPanel(chart, 360, 290, 360, 290, 360, 290, isClosed, closable, closable, isIcon, isIcon, closable), BorderLayout.CENTER);
        
        timer = new Timer(COUNT, new ActionListener() {
            float[] newData = new float[1];

            @Override
            public void actionPerformed(ActionEvent e) {
                newData[0] = gpu.getMediaTemperatura().floatValue();
                
                dataset.advanceTime();
                dataset.appendData(newData);
            }
        });
    }

    public float[] chartData() {
        float[] a = new float[COUNT];
        for (int i = 0; i < a.length; i++) {
            a[i] = gpu.getMediaTemperatura().floatValue();
        }
        return a;
    }

    private JFreeChart createChart(final XYDataset dataset) {
        final JFreeChart result = ChartFactory.createTimeSeriesChart("", "", "", dataset, false, false, false);
        final XYPlot plot = result.getXYPlot();
        ValueAxis domain = plot.getDomainAxis();
        domain.setAutoRange(true);
        ValueAxis range = plot.getRangeAxis();
        range.setRange(0, MINMAX);
        range.setVisible(false);
        domain.setVisible(false);
        result.setBorderVisible(false);
        result.setBackgroundPaint(null);
        return result;
    }

    public void start() {
        timer.start();
    }

    public static void main(final String[] args) {

        EventQueue.invokeLater(new Runnable() {
            
            @Override
            public void run() {
                Chart demo = new Chart();
                demo.pack();
                demo.setVisible(true);
                demo.start();
            }
        });
    }
}