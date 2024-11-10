import React, { useState } from "react";
import { articleCartImage, getDayDifference } from "../Utils/Validations";
import { blockUserArticle, like, unlike } from "../Services/apiService/userServices";
import UserActions from "./UserActions";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article, setArticles }) => {
    const [likes, setLikes] = useState(article.likes.length);
    const [unlikes, setUnlikes] = useState(article.unlikes.length);
    const [block, setBlock] = useState(false);
    const [blockModal, setBlockModal] = useState(false);
    const navigate = useNavigate();

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
        if (arg) {
            const res = await blockUserArticle(article._id);
            setArticles((prev) => {
                const res = prev.filter((obj) => {
                    return obj?._id != article._id;
                });
                return res;
            });
        }
    };

    return (
        <div className="w-full mt-6 flex flex-col border rounded-lg shadow-md border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="user w-full flex flex-row mt-4 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-t-lg">
                {blockModal && <UserActions setBlockModal={setBlockModal} blockArticle={blockArticle} />}
                <img src={articleCartImage} className="w-[40px] h-[40px] rounded-full object-cover" alt="" />
                <div className="ml-4">
                    <span className="font-semibold text-gray-800">{article?.userId?.firstname}</span>
                    <span className="ml-2 text-gray-600">{article?.userId?.lastname}</span>
                </div>
            </div>
            <div className="content w-full flex flex-row p-4 bg-white rounded-b-lg">
                <div className="text cursor-pointer w-[70%]" onClick={() => navigate(`/article-details?id=${article?._id}`)}>
                    <h1 className="text-[22px] font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300 mb-2">
                        {article?.title}
                    </h1>
                    <p className="text-gray-600 text-sm line-clamp-3">{article?.description}</p>
                </div>
                <div className="image w-[30%] flex flex-row relative justify-center items-center">
                    <img className="w-[100px] h-[80%] object-cover rounded-lg mt-2" src={article?.images[0]} alt="" />
                    <i
                        onClick={() => setBlockModal(true)}
                        className="fa-solid fa-ellipsis absolute right-2 top-2 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-200"
                    ></i>
                </div>
            </div>

            <div className="w-full mt-4 flex flex-row p-4 bg-gray-50 rounded-b-lg">
                <div className="flex items-center gap-6 text-gray-600">
                    <span
                        onClick={() => likeArticle(article?._id)}
                        className="flex items-center gap-1 text-lg hover:text-red-500 cursor-pointer transition-all duration-300"
                    >
                        <i className="fas fa-thumbs-up text-xl hover:scale-125 transition-all duration-200"></i>
                        {likes}
                    </span>
                    <span
                        onClick={() => unlikeArticle(article?._id)}
                        className="flex items-center gap-1 text-lg hover:text-blue-500 cursor-pointer transition-all duration-300"
                    >
                        <i className="fas fa-thumbs-down text-xl hover:scale-125 transition-all duration-200"></i>
                        {unlikes}
                    </span>
                    <span
                        onClick={() => setBlockModal(true)}
                        className="flex items-center gap-1 text-lg hover:text-yellow-500 cursor-pointer transition-all duration-300"
                    >
                        <i onClick={() => setBlockModal(true)} className="fas fa-ban text-xl hover:scale-125 transition-all duration-200"></i>
                    </span>
                </div>
                <div className="ml-auto flex items-center text-gray-500">
                    <span className="text-sm">{getDayDifference(article?.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
