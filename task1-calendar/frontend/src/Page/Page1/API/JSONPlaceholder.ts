import axios from "axios";
import { toast } from "react-toastify";
import { CurrencyType, PostType, currencySchema, postSchema } from "../Type/Posts";

export const getPosts = async (): Promise<PostType[] | null> => {
    try {
        const { data }: { data: PostType[] } = await axios({
            url: "https://jsonplaceholder.typicode.com/posts",
            method: "GET",
        });

        postSchema.array().parse(data);

        return data;
    } catch (e) {
        const error = e as Error;
        toast.error(error.message);
        return null;
    }
};

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






