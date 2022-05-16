import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const Allusers = () => {
    const { isLoading, data, refetch } = useQuery('repoData', () =>
        fetch('http://localhost:5000/users', {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return <Loading type='spokes' color="red"></Loading>
    }

    return (
        <div>
            <h2>This is allusers page {data.length}</h2>


            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>S/L No</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((user, index) =>
                                <UserRow
                                    key={user._id}
                                    user={user}
                                    index={index}
                                    refetch={refetch}
                                ></UserRow>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allusers;