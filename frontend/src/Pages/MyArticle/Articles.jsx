import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import ArticlesPage from "../../Components/AddArticle";
import { deleteUserArticle, getArticles } from "../../Services/apiService/userServices";
import { getDayDifference } from "../../Utils/Validations";
import EditArticleMocal from "../../Components/EditArticle";
import { useNavigate } from "react-router-dom";

const Articles = () => {
    const [open, setOpen] = useState(false);
    const [articles, setArticles] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [articleData, setArticleData] = useState({});
    const [load, setLoad] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fechData = async () => {
            const data = await getArticles();
            setArticles(data?.data);
        };
        fechData();
    }, [load]);

    const deleteArticle = async (data) => {
        const res = confirm("Are you sure?");
        if (res) {
            await deleteUserArticle(data?._id);
            setArticles(articles.filter((obj) => obj._id !== data?._id));
        }
    };

    return (
        <>
            <Header />
            <ArticlesPage setArticles={setArticles} open={open} setOpen={setOpen} />

            <div className="flex justify-center mt-10 px-4">
                {/* Main container */}
                <div className="w-full sm:w-4/5 p-6 bg-white rounded-lg shadow-lg">
                    {/* Filter Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                        {/* Add New Article Button */}
                        <button
                            onClick={() => setOpen(true)}
                            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300 w-full sm:w-auto"
                        >
                            + Add New Article
                        </button>
                    </div>

                    {isEditOpen && articleData && (
                        <EditArticleMocal
                            setLoad={setLoad}
                            setArticles={setArticles}
                            isEditOpen={isEditOpen}
                            articleData={articleData}
                            setIsEditOpen={setIsEditOpen}
                        />
                    )}
                    {/* Articles List */}
                    {articles?.map((article) => (
                        <div className="space-y-4" key={article?._id}>
                            <div className="flex flex-col sm:flex-row p-4 border border-gray-200 rounded-lg shadow-md">
                                {/* Image */}
                                <div className="flex justify-center sm:justify-start sm:w-[20%] mb-4 sm:mb-0">
                                    <img
                                        src={article && article.images ? article.images[0] : ""}
                                        className="h-[150px] w-[150px] object-cover rounded-md"
                                        alt=""
                                    />
                                </div>
                                {/* Main content */}
                                <div className="w-full sm:w-[60%] mb-4 sm:mb-0 cursor-pointer" onClick={() => navigate(`/article-details?id=${article?._id}`)}>
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{article.title}</h2>
                                    <p className="text-gray-600 mt-2 hidden sm:block">{article.description}</p>
                                    <span className="text-sm text-gray-500 mt-2 block">{article.category}</span>
                                    <span className="text-sm text-gray-500 mt-2 block">{getDayDifference(article?.createdAt)}</span>
                                </div>

                                {/* Buttons and stats */}
                                <div className="flex sm:w-[20%] flex-col items-end justify-between">
                                    <div className="flex gap-2">
                                        <i
                                            onClick={() => {
                                                setArticleData(article);
                                                setIsEditOpen(true);
                                            }}
                                            className="fa-solid fa-pen-to-square text-gray-500 hover:text-gray-700 cursor-pointer"
                                        ></i>
                                        <i
                                            onClick={() => deleteArticle(article)}
                                            className="fa-solid fa-trash text-gray-500 hover:text-gray-700 cursor-pointer"
                                        ></i>
                                    </div>
                                    <div className="flex justify-between items-center w-full mt-2 sm:mt-0">
                                        <span className="text-sm">
                                            <i className="fa-solid fa-heart mr-1 text-red-500"></i> {article?.likes?.length}
                                        </span>
                                        <span className="text-sm">
                                            <i className="fa-solid fa-thumbs-down mr-1 text-blue-500"></i> {article?.unlikes?.length}
                                        </span>
                                        <span className="text-sm">
                                            <i className="fa-solid fa-ban mr-1 text-gray-500"></i> {article?.blocks?.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Articles;
