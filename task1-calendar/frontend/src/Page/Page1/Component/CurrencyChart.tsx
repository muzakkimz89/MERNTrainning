// import React from 'react'
// import "./page1.scss";
// import { useEffect, useState } from "react";
import "./currencyChart.scss";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { CurrencyType } from "../Type/Posts";
// import { useAddCurrencyReq, useCurrencyReq, useDeleteCurrencyReq } from "./Hooks/useCurrency";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const CurrencyChart = ({ selectedCountry }: { selectedCountry: CurrencyType }) => {
  const hourlyLabels = ['00.00', '01.00', '02.00', '03.00', '04.00', '05.00', '06.00','07.00', '08.00', '09.00', '10.00','11.00','12.00','13.00', '14.00', '15.00', '16.00', '17.00', '18.00','19.00', '20.00', '21.00', '22.00','23.00','00.00'];
    const dailyLabels=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

    const hourlyData = {
        labels:hourlyLabels,
        datasets: [
            {
                label: 'Dataset 1',
                data: hourlyLabels.map(() => selectedCountry?.value*(Math.random()*0.4)+selectedCountry?.value-(selectedCountry?.value*0.2)),
                borderColor: "#064D7A",
                backgroundColor: '064D7A',
                point: false,
            }
        ],
    };

    const dailyData = {
        labels:dailyLabels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dailyLabels.map(() => selectedCountry?.value*(Math.random()*0.4)+selectedCountry?.value-(selectedCountry?.value*0.2)),
                borderColor: "#064D7A",
                backgroundColor: '064D7A',
                point: false,
                color:'red'
            }
        ],
    };

    const options = {
      tooltips: {
        enabled: false
      },
      scales: {
        x: {
          display: true, // Hide x-axis         
          grid: {
            display: true, // Hide x-axis grid lines
            lineWidth:2,
            color:(context:any)=>{
              // console.log(context)
              if(context.index ===0){
                return "#064d7a"
              }else{
                return"white"
              }
            }
          },
          ticks: {      
            display: true,              
            maxTicksLimit: 9,
            maxRotation: 0,
            // color:'red'
            color:(context:any)=>{
              // console.log(context)
              if(context.index<24){
                return "black"
              }else{
                return"white"
              }
            }
            
          },
          
        },
        y: {
          display: true, // Display y-axis
          color:"red",
          grid: {
            display: true, // Hide y-axis grid lines
            lineWidth:(context:any)=>{
              console.log(context)
              if(context.index ===0){
                return 2
              }else{
                return 0
              }
            },
            color:"#064d7a"
          },
          ticks: {
            display: false, // Hide y-axis tick points
            
          },
        },
      },
      responsive: false,
      plugins: {
        legend: {
          display: false,
          position: 'top' as const,
        },
        title: {
          display: false,
          text: 'Custom Chart Title',
          padding: {
            top: 10,
            bottom: 30,
          },
        },
      },
      layout: {
        padding: 20,
      },
    };
  return (
    <div className="popup-container">
        <div className="popup-title">
            {selectedCountry?.country} Currency
        </div>
        <div className="chart">
            <div className="global-chart">
              <div className="display-chart">
                <div className="chart-row">
                  Value
                </div>
                <div className="chart-label">
                  <Line width="1000px" height="240px" options={options} data={hourlyData}/>
                  <div className="xaxis">Hrs</div>
                </div>
              </div>
            </div>
            <div className="global-chart">
                <div className="display-chart">
                  <div className="chart-row">
                    Value
                  </div>
                  <div className="chart-label">
                    <Line width="1000px" height="240px" options={options} data={dailyData}/>
                    <div className="xaxis">Day</div>
                  </div>
                
                </div>
            </div>
        </div>
    </div>
  )
}
