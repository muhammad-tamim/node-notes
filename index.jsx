import React from 'react';
import { useState, useEffect } from "react";

const App = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:3000/users?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users);
                setTotalPages(data.totalPages);
            })
    }, [page]);

    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <h1 className="text-xl font-bold mb-4 text-center">Users</h1>

            {/* User List */}
            <div className="space-y-2 mb-4">
                {users.map((user) => (
                    <div key={user._id} className="p-2 border rounded">
                        <p>{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
                <button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>

                {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`btn btn-xs ${page === pageNum ? "btn-primary" : "btn-ghost"
                                }`}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                <button className="btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next
                </button>
            </div>
        </div>
    );
}

export default App;