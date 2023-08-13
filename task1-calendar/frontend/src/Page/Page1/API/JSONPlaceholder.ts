import axios from "axios";
import { toast } from "react-toastify";
import { CurrencyType, currencySchema } from "../Type/Posts";

export const getCurrency = async (): Promise<CurrencyType[] | null> => {
    try {
        const { data }: { data: CurrencyType[] } = await axios({
            url: "http://localhost:8000/api/v1/currency/",
            method: "GET",
        });

        currencySchema.array().parse(data);
        // console.log(data);
        return data;
    } catch (e) {
        const error = e as Error;
        toast.error(error.message);
        return null;
    }
};

export const addCurrency = async (newCurrency:CurrencyType) => {
    try {
        const response = await axios({
            url: "http://localhost:8000/api/v1/currency/",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data: newCurrency,
        });
        console.log(response);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to add currency');
        }
    } catch (e) {
        const error = e as Error;
        toast.error(error.message);
        return null;
    }
};

export const deleteCurrency = async (deleteCurrency:CurrencyType) => {
    try {
        const response = await axios({
            url: "http://localhost:8000/api/v1/currency/",
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            data: deleteCurrency,
        });
        console.log(response);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to DELETE currency');
        }
    } catch (e) {
        const error = e as Error;
        toast.error(error.message);
        return null;
    }
};






