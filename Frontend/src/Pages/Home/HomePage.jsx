import React, { useState } from "react";
import { useShowAllFriendsQuery } from "../../App/Service/usersAuthApiSlice";

const HomePage = () => {
    const [friends, setFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, isError } = useShowAllFriendsQuery();
    //   const { data: users } = useSearchUsersQuery(searchTerm);

    useEffect(() => {
        console.log(data);
        setFriends(data.data);
    }, [data]);

    if (isError) {
        return <h1>Error Occured...</h1>;
    }

    return (
        <>
            <section className="h-screen max-w-5xl mx-auto p-5 my-10 ">
                <div className="container mx-auto">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 w-full"
                        placeholder="Search users"
                    />
                    <div className="mt-4">
                        {users?.map((user) => (
                            <div
                                key={user._id}
                                className="p-4 border rounded mb-2"
                            >
                                <p>{user.username}</p>
                                <button
                                    onClick={() =>
                                        sendRequest({
                                            userId: "currentUserId",
                                            targetUserId: user._id,
                                        })
                                    }
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    Add Friend
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
