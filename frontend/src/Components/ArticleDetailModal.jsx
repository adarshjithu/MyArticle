import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Pages/Header/Header";
import { getSingleArticle } from "../Services/apiService/userServices";
import { getDayDifference } from "../Utils/Validations";

const ArticleDetailModal = () => {
    const [article,setArticle] = useState()
    const [index,setIndex] =useState(0)

    const location = useLocation();
    console.log(location.search.split("=")[1]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getSingleArticle(location.search.split("=")[1]);
       
            setArticle(res?.data?.result)
        };
        fetchData();
    }, []);

    return (
        <div className="w-full h-full">
            <Header />

            <div className="w-full h-full p-10 flex justify-center items-center flex-col">

                <div className="w-[50%]">
                    <h1 className="mb-2">{article?.category?.toUpperCase()}</h1>
                    <h1 className="text-[40px] font-semibold">{article?.title}</h1>
                    <h1 className="description text-[20px] mr-2">{article?.description}</h1>
                    <div className="flex flex-row">
                        <div className="mt-3">
                            <img className="rounded-full w-[45px] h-[45px]" src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAACUCAMAAAAJSiMLAAAAMFBMVEXk5ueutLff4uOor7Ln6eqrsbXq7O3Gy83R1Naxt7rc3+DW2drN0dPZ3N2/xMa4vcD+z9IVAAAEWklEQVR4nO2c2XLrIAxAWcRmMPz/315wmzRp04RFQfSOz0uXpzMaWYCRzNjJycnJycnJycnJycnJ/wcAaABqiwayq9h8CMaYYP0mjv8sDrDNm+RkRilVfrho7La2uWY2Oq4UvyXrpxjWFQcw2Zk/QnEX9KLiRj52vgR9wYgDs+6ZdEEmu5g4iPjC+SPgRqzkDf5lqD/F3baQd6iTLt7SUsteMdXWGRnWiDc0WeeAmxW8W62LN7Uza8yQD2SgloYgm61zvD1tnsDWIZ0hroPa9WmrRGkNNWvjY2/CcgK+1zqnyU6mLVJ7FbmGO5Jp237rXAXJwt35PH7iaLIbbE/J/oKoePcWvyuJQhv2sWCXYkLgDWnQmqZ2i9EcyVmyTbeGMGzN+fyHsn2b/ROCDezICnlh/oYK9vHUzojZ2n482DlLpj+TXaeaH9rTkztiRFtFPVkb4YnMpOnaGNacz9ZGKSRcTdYWKDnC5ak9U3vypuSvRhvFerr2H60kSHXbnatkFQinBIrTJM4OcPb9Ewy9SLtqz95v45xu3OzTDRMIG26Ct65/9OQOdtia5m3acHKrND21GdPd9zZXbYp3gLCNJjdJjjA9ui2JJK/lwY8tlGSXN2Phnr6NujBwLZmZ/3L7wsBKKem6M8D3125HF2ym+1d4S9niAJ2HHMKr60O78+Jp/o71m3dX8Zbk3YBdO0FPLF2o7128QPo4Xmjt8lKL9C+2neLlErEugP+l2/wBNLvVx8Ae6wKuInkNuQWYqQh4aSdeybqwu1cBlwQdDS8B7X8bqDgizZOn2mA/B1hIj8WVctGuO/MEzIckvw2EKClT2JdL6juy3Gaj+xhyOsacVAzbX5jPyttwrcVuC7vQq04J/QAOsrv++G117zJryLbd22N87yAE6/0uyhDiivY5uGy3JrkMvzs65D/y/1I0viQPteeVEkXhTTqewqdLZBlCtEvMTwKIEmP+dAju3t3F4DfSjNGsjHSqp0F+tPbwFK0gMge9/RzprFbnOV/ml0ZgIrjazPhNXca5a2dewyNHuJdUMtlpm8Lfd0wd4iqZKQcH0PbZ/rQDZ96eKsAsRnbco5R5a6rknE7o0oc4D++bts0HXdz0uBVP7+oa0BiN5k+I70hxEC+PuKO8o03jzaE+wH6LAmz4yrfO22Ge7oFVjrGPe6uA5o3TqVOJRLsemZHWX6iIUsIHbsM6vRNCJZxujeM937oUlNE8obAe7uuB9uskLO+BcI+PRPZ7D4y2DLcVjXh3N1IJpCGVPlzvVCLN43ih97HcKaV5d5rgtPEPIDvSBAxZFbni2q2RJlSGaE8TjTJYOErrIj/yCQ9EmsO9RLCb+9dwBpTHaWxMR5nzwKBtpHyRYDfWbrqd33dUQwMvxrgEFg0TlZra9YaGb8aIZXKEN/TUT32d85Lq41n/t7neQXU77PCsBCr1HXjLVO2Cq213XGVl/6SytxT88UnkZaguJZtYigeG/wBDUT1pHLgwkAAAAABJRU5ErkJggg=='} alt="" />

                        </div>
                        <div>
                            <h1 className="mt-3 ml-4 text-[gray]">{article?.userId?.firstname}  {article?.userId?.firstname}</h1>
                            <h1 className="mt-1 ml-4 text-[gray]">{getDayDifference(article?.createdAt)} </h1>
                        </div>

                        
                    </div>
                </div>

                <div className="w-full flex justify-center mt-4 ">
                    <img onClick={()=>{
                        if(index==article?.images.length-1){
                            setIndex(0)
                        }else{
                            setIndex(index+1)
                        }
                    }} className="w-[80%] h-[500px]" src={article?.images[index]} alt="" />
                </div>
                <div className="w-[50%]">
                     <h3 className="text-[20px]">{article?.description}</h3>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetailModal;
