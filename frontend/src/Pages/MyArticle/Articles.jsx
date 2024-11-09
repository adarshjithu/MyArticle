import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import ArticlesPage from "../../Components/AddArticle";
import { deleteUserArticle, getArticles } from "../../Services/apiService/userServices";
import { getDayDifference } from "../../Utils/Validations";
import EditArticleMocal from "../../Components/EditArticle";

const Articles = () => {
    const [open, setOpen] = useState(false);
    const [articles, setArticles] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [articleData, setArticleData] = useState({});
    const [load, setLoad] = useState(false);

    // Sample categories for the dropdown
    const categories = ["Technology", "Health", "Business", "Lifestyle", "Education"];

    useEffect(() => {
        const fechData = async () => {
            const data = await getArticles();
            setArticles(data?.data);
        };
        fechData();
    }, [load]);

    const deleteArticle = async (data) => {
        const res = confirm("Are you sure");
        if (res) {
            const res = await deleteUserArticle(data?._id);
            setArticles(articles.filter((obj) => obj._id !== data?._id));
        }

        // const res = await deleteArticle(data?._id);
    };
    return (
        <>
            <Header />
            <ArticlesPage setArticles={setArticles} open={open} setOpen={setOpen} />

            <div className="flex justify-center mt-10 px-4">
                {/* Main container with 80% width of screen */}
                <div className="w-4/5 p-6 bg-white rounded-lg shadow-lg">
                    {/* Filter Section */}
                    <div className="flex items-center gap-4 mb-6">
                        {/* Add New Article Button */}
                        <button
                            onClick={() => setOpen(true)}
                            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300"
                        >
                            + Add New Article
                        </button>

                        {/* Dropdown for article category */}
                        <select
                            className="w-40 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={""}
                            onChange={""}
                        >
                            <option value="">All Categories</option>

                            <option>asdfas</option>
                        </select>

                        {/* Search bar for articles */}
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
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
                    {articles?.map((article) => {
                        return (
                            <div className="space-y-4" key={article?._id}>
                                <div className=" flex flex-row p-4 border border-gray-200 rounded-lg shadow-md">
                                    {/* image */}
                                    <div className="w-[20%]">
                                        <img src={article && article.images ? article.images[0] : ""} className="h-[150px] w-[150px]" alt="" />
                                    </div>
                                    {/* main */}

                                    <div className="w-[60%]">
                                        <div className="h-[10%]">
                                            <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                                        </div>
                                        <div className="h-[60%]">
                                            <p className="text-gray-600 mt-2">{article.description}</p>
                                        </div>
                                        <div className="h-[10%]">
                                            <span className="text-sm text-gray-500 mt-2 block">{article.category}</span>
                                        </div>
                                        <div className="h-[20%]">
                                            <span className="text-sm text-gray-500 mt-2 block">{getDayDifference(article?.createdAt)}</span>
                                        </div>
                                    </div>

                                    {/* buttons */}

                                    <div className="w-[20%]">
                                        <div className="w-full h-[50%] flex justify-end">
                                            <div>
                                                <i
                                                    onClick={() => {
                                                        setArticleData(article);
                                                        setIsEditOpen(true);
                                                    }}
                                                    className="mr-4 fa-solid fa-pen-to-square"
                                                ></i>
                                                <i onClick={() => deleteArticle(article)} className="fa-solid fa-trash"></i>
                                            </div>
                                        </div>
                                        <div className="w-full h-[50%] flex justify-between items-end">
                                            <span>
                                                <i className="fa-solid fa-heart"></i> {article?.likes?.length}
                                            </span>
                                            <span>
                                                <i className="fa-solid fa-thumbs-down"></i>
                                                {article?.unlikes?.length}
                                            </span>
                                            <span>
                                                <i className="fa-solid fa-ban"></i>
                                                {article?.blocks?.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Articles;
