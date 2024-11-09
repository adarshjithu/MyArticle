import React, { useState } from "react";

function UserActions({ setBlockModal ,blockArticle }) {
    return (
        <div>
            
            <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg w-80">
                    <p className="text-lg font-bold mb-4">Do you want to block this user?</p>
                    <div className="flex justify-end space-x-4">
                        <button onClick={() => setBlockModal((prev) => !prev)} className="bg-gray-300 p-2 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                        <button onClick={()=>{blockArticle(true),setBlockModal(false)}} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Block</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default UserActions;
