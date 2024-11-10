import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../app/features/auth";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ArticleCard from "../../Components/ArticleCard";
import { getAllArticles } from "../../Services/apiService/userServices";
import ArticleDetailModal from "../../Components/ArticleDetailModal";
import NoArticlesPage from "../../Components/NoArticle";


const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((data) => data?.auth?.userData);
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [seletedCategory, setSeletedCategory] = useState('All');
    const [preference, setPreference] = useState([
        "All",
        "Technology",
        "Health",
        "Business",
        "Lifestyle",
        "Programming",
        "Design",
        "Education",
        "Writing",
    ]);

 
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

        const fechData = async () => {
            const res = await getAllArticles(seletedCategory);
            console.log(res?.data?.result);
            setArticles(res?.data?.result);
        };
        fechData();
    }, [seletedCategory]);
    return (
        <div className="font-sans bg-gray-50 text-gray-800">
            {/* Header */}
            <Header />
            {/* <ArticleDetailModal /> */}

            {/* Hero Section */}

            {/* Articles Feed (List View) */}
            <section className="p-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex gap-4 mb-4 overflow-x-auto">
                        {preference.map((obj) => {
                            return (
                                <button onClick={() => setSeletedCategory(obj)} className={`px-4 py-2 ${seletedCategory==obj?' bg-green-500 text-white':"bg-gray-200"} rounded-full hover:bg-gray-300`}>
                                    {obj}
                                </button>
                            );
                        })}
                    </div>

                    {/* Article List */}
                  { articles.length==0?<NoArticlesPage/>: <div className="space-y-6">
                        {articles.map((article) => (
                            <ArticleCard article={article} setArticles={setArticles} />
                        ))}
                    </div>}
                </div>
            </section>

            {/* Footer */}
            <footer className="p-6 bg-gray-800 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="mb-4">MyArticleSite © {new Date().getFullYear()}</p>
                    <div className="flex justify-center gap-4">
                        <a href="#" className="hover:text-gray-400">
                            About
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            Contact
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            Terms of Service
                        </a>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <a href="#" className="hover:text-gray-400">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
