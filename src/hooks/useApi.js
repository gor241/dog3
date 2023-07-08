import { useEffect, useState } from "react";
// Этот хук используется когда нужно обрабатывать запросы на сервер, 
// работать со Spiner или Skeleton, а так же обрабатывать ошибки
export const useApi = (handler) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        handler()
            .then((result)=> {
                setData(result);
            })
            .catch((err)=>{
                setError(err);
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [handler])


    return { data, setData, loading, error}    
}