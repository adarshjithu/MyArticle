import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../app/features/auth";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ArticleCard from "../../Components/ArticleCard";
import { getAllArticles } from "../../Services/apiService/userServices";
import ArticleDetailModal from "../../Components/ArticleDetailModal";

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((data) => data?.auth?.userData);
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

        const fechData = async () => {
            const res = await getAllArticles();
            console.log(res?.data?.result);
            setArticles(res?.data?.result);
        };
        fechData();
    }, []);
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
                        <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Technology</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Health</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Business</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Lifestyle</button>
                    </div>

                    {/* Article List */}
                    <div className="space-y-6">
                        {articles.map((article) => (
                            <ArticleCard article={article} setArticles={setArticles} />
                        ))}
                    </div>
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
