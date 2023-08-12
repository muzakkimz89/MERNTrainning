
// import React from "react";
import { useEffect, useState } from "react";
import "./style.scss";
// import { Line } from "react-chartjs-2";

import { CurrencyType } from "./Type/Posts";
import { useAddCurrencyReq, useCurrencyReq, useDeleteCurrencyReq } from "./Hooks/useCurrency";
import { CurrencyChart } from "./Component/CurrencyChart";


export const Page1 = () => {
    //Hook
    const getCurrencyData = useCurrencyReq();
    const addCurrencyMutation = useAddCurrencyReq();
    const deleteCurrencyMutation= useDeleteCurrencyReq();

    //initiate daa
    const [country, setCountry] = useState<CurrencyType[]>([]);
    const [countryList, setCountryList] = useState<CurrencyType[]>([]);
    const [newCountry, setNewCountry] = useState<string>("");
    const [newValue, setNewValue] = useState<any>();
    const [selectCountry, setSelectCountry] = useState<CurrencyType>();
    const [showChart, setShowChart] = useState(false);
    const [deletePopUP, setdeletePopUP] = useState(false);
    const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
    
    //get all currency list
    useEffect(() => {
        if (getCurrencyData.currencyData) {
            setCountryList(getCurrencyData.currencyData);
        }
    }, [getCurrencyData.currencyData]);

    //create empty row if there less than 6 row
    useEffect(() => {
        const emptyRowsCount = 6 - countryList.length;
        let data:CurrencyType[] = [];
        for (let i = 0; i < emptyRowsCount; i++) {
            data.push({
            no: "",
            country: "",
            value: "",
            id: 0
          });
        }
        const completeData = [...countryList, ...data];
        setCountry(completeData);
    }, [countryList]);

    //add new currency
    const handleAddData = async () => {
        const newCurrency: CurrencyType = {
            no: countryList.length + 1,
            country: newCountry,
            value: newValue,
            id: 0,
        };
        const addedCurrency = await addCurrencyMutation.mutateAsync(newCurrency);
        console.log(addedCurrency)
        if (addedCurrency) {
            // Handle success
            getCurrencyData.refetch();
            console.log("Currency added:", addedCurrency);
            setNewCountry("");
            setNewValue("");
        } else {
            // Handle error
            console.log("Failed to add currency");
        }
    };

    const handleConsoleLog = (clickedItem: CurrencyType) => {
        console.log("Clicked Row No:", clickedItem.no);
        setSelectCountry(clickedItem)
        setClickedRowIndex(clickedItem.no);
    };

    const handleDeleteData= async ()=>{
        if(selectCountry){
            // const deleteCurrency: CurrencyType = deleteCountry;
            const addedCurrency = await deleteCurrencyMutation.mutateAsync(selectCountry);
            console.log(addedCurrency)
            if (addedCurrency) {
                // Handle success
                getCurrencyData.refetch();
                console.log("Currency added:", addedCurrency);
                setNewCountry("");
                setNewValue("");
            } else {
                // Handle error
                console.log("Failed to add currency");
            }
            
        }
        setdeletePopUP(false);
    }

    const handleDoubleClick = () => {
        // setSelectedItem(clickedItem);
        setShowChart(true);
    };
    const closePopup=()=>{
        setShowChart(false);
    }

    const handleOpenDeletePopup = () => {
        // setSelectedItem(clickedItem);
        setdeletePopUP(true);
    };
    const handleCloseDeletePopup=()=>{
        setdeletePopUP(false);
    }

  return (
    <div className="master-page1-container">
        {showChart && (
            <div className="popup" onClick={() => closePopup()}>
                <div
                    className="inner-popup"
                    onClick={(event) => {event.stopPropagation();}}>
                    {selectCountry && (
                        <CurrencyChart selectedCountry={selectCountry} />
                    )}
                </div>               
            </div>
        )}
        {deletePopUP && (
            <div className="popup" onClick={() => handleCloseDeletePopup()}>
                <div
                    className="delete-popup"
                    onClick={(event) => {event.stopPropagation();}}>
                        <div className="delete-text">Are You Sure?</div>
                        <div className="delete-popup-button">
                            <button onClick={() => handleDeleteData()}>Confirm</button>
                            <button onClick={() => handleCloseDeletePopup()}>Cancel</button>
                        </div>
                        
                </div>               
            </div>
        )}
        
        <div className="page1">   
        <div className="page1-container">
            <div className="inside-container">
                <div className="currency-table">
                    <table>
                        <thead>
                            <tr>
                                <th className="no-column">No</th>
                                <th className="country-column">Country</th>
                                <th className="value-column">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {country.map((item) => (
                                <tr 
                                    onClick={() => handleConsoleLog(item)} 
                                    onDoubleClick={() => handleDoubleClick()}
                                    className={clickedRowIndex === item.no ? 'selected-row' : ''}
                                
                                >
                                    <td className="no-column">{item.no}</td>
                                    <td className="country-column">{item.country}</td>
                                    <td className="value-column">{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>      
                <div className="curd-system">
                    <div>
                        <span>Country:</span>
                        <input value={newCountry} onChange={(e) => setNewCountry(e.target.value)}></input>
                    </div>
                    <div>
                        <span>Value:</span>
                        <input value={newValue} onChange={(e) => setNewValue(parseFloat(e.target.value))}></input>
                    </div>
                    <button onClick={() => handleAddData()}>add</button>
                    <button onClick={() => handleOpenDeletePopup()}>delete</button>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};
