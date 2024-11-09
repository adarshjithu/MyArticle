import React, { useState } from "react";
import { getDayDifference } from "../Utils/Validations";
import { blockUserArticle, like, unlike } from "../Services/apiService/userServices";
import UserActions from "./UserActions";

const ArticleCard = ({ article ,setArticles}) => {
    const [likes, setLikes] = useState(article.likes.length);
    const [unlikes, setUnlikes] = useState(article.unlikes.length);
    const [block, setBlock] = useState(false);
    const [blockModal,setBlockModal]  =useState(false)

    const likeArticle = async (id) => {
        const res = await like(id);
        if (res?.data?.liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
    };

    const unlikeArticle = async (id) => {
        const res = await unlike(id);
        if (res?.data?.unliked) {
            setUnlikes(unlikes - 1);
        } else {
            setUnlikes(unlikes + 1);
        }
    };

    const blockArticle = async (arg) => {
      if(arg){

          const res = await blockUserArticle(article._id);
          setArticles((prev)=>{
            const res = prev.filter((obj)=>{
                return obj?._id !=article._id;
            })
            return res
          })
          
      }
    };
    return (
        <div className="w-[100%] mt-4 flex flex-col border-t border-gray-300">
            <div className="user w-full flex flex-row mt-3">
             {blockModal&&<UserActions setBlockModal={setBlockModal} blockArticle={blockArticle} />}
                <img
                    src="data:image/jpeg;base64,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"
                    className="w-[20px] h-[20px] rounded-full"
                    alt=""
                />
                <span className="ml-4">{article?.userId?.firstname}</span>
                <span className="ml-2">{article?.userId?.lastname}</span>
            </div>
            <div className="content w-full flex flex-row">
                <div className="text w-[70%]">
                    <h1 className="text-[25px] mb-4 mt-2 font-bold">{article?.title}</h1>
                    <h1 className="description">{article?.description}</h1>
                </div>
                <div className="image w-[30%] flex flex-row relative">
                    <img className="w-[100px] h-[80%] mt-4 ml-10" src={article?.images[0]} alt="" />

                    <i onClick={()=>setBlockModal(true)} className="fa-solid fa-ellipsis absolute right-0 top-0"></i>
                </div>
            </div>

            <div className="w-full mt-4 flex flex-row ">
                <div className="flex items-center gap-3 text-gray-400">
                    <span onClick={() => likeArticle(article?._id)} className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                        <i className="fas fa-thumbs-up ml-2"></i>
                        {likes}
                    </span>
                    <span onClick={() => unlikeArticle(article?._id)} className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                        <i className="fas  fa-thumbs-down ml-2"></i>
                        {unlikes}
                    </span>
                </div>
                <div className="ml-16 ">
                    <span className="text-[gray]">{getDayDifference(article?.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
