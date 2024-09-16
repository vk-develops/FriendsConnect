import React, { useEffect, useState } from "react";
import axios from "axios";
import { useShowAllFriendsQuery } from "../../App/Service/usersAuthApiSlice";
import { BASE_URL, USERS_AUTH_URL } from "../../App/constants";

const HomePage = () => {
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, isError } = useShowAllFriendsQuery();

    const searchUsers = async (query) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/${USERS_AUTH_URL}/friends/search-friends?name=${query}`
            );
            console.log(response.data);
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    useEffect(() => {
        if (data) {
            console.log(data);
            setFriends(data.data);
        }

        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                searchUsers(searchTerm);
            } else {
                setUsers([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [data, searchTerm]);

    return (
        <>
            <section className="h-screen max-w-5xl mx-auto p-5 my-10">
                <div className="container mx-auto">
                    {/* Search input for finding users */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 w-full"
                        placeholder="Search users"
                    />

                    {/* Show users based on search results */}
                    <div className="mt-4">
                        {searchTerm && users.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold mb-2">
                                    Search Results:
                                </h2>
                                {users.map((user) => (
                                    <div
                                        key={user._id}
                                        className="p-4 border rounded mb-2"
                                    >
                                        <p>{user.username}</p>
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded">
                                            Add Friend
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Show friends list if data is available */}
                        <h2 className="text-lg font-semibold mb-2 mt-4">
                            Friends List:
                        </h2>
                        {isLoading && <p>Loading friends...</p>}
                        {isError && <p>Error loading friends list</p>}
                        {friends?.map((friend) => (
                            <div
                                key={friend._id}
                                className="p-4 border rounded mb-2"
                            >
                                <p>{friend.username}</p>
                                <button className="bg-red-500 text-white px-2 py-1 rounded">
                                    Unfriend
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
