import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CurrencyType } from "../Type/Posts";
import { addCurrency, deleteCurrency, getCurrency } from "../API/JSONPlaceholder";

export function useCurrencyReq() {
    const queryClient = useQueryClient();
    const { data: currencyData, isLoading, isError } = useQuery({
        queryKey: ["getCurrency"],
        queryFn: async (): Promise<CurrencyType[] | null> => {
            return await getCurrency();
        },
        retry: 2,
    });
    const refetch = async () => {
        await queryClient.refetchQueries(["getCurrency"]);
    };

    return { currencyData, isLoading, isError, refetch };
    // return { currencyData, isLoading, isError };
}

export function useAddCurrencyReq() {
    const mutation = useMutation({
        mutationKey: ["addCurrency"],
        mutationFn: async (newCurrency: CurrencyType) => {
            return await addCurrency(newCurrency);
        },
    });
    return mutation;
}

export function useDeleteCurrencyReq() {
    const mutation = useMutation({
        mutationKey: ["deleteCurrency"],
        mutationFn: async (deleteCurrencyData: CurrencyType) => {
            return await deleteCurrency(deleteCurrencyData);
        },
    });
    return mutation;
}