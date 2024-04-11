"use client";

import axios from "axios";
import { mutate } from "swr";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import CreateUserModal from "@/components/modals/dashboard/CreateUserModal";
import UpdateUserModal from "@/components/modals/dashboard/UpdateUserModal";
import "react-loading-skeleton/dist/skeleton.css";

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserUpdate {
    name: string;
    email: string;
    idUser: number;
}

interface UserObject {
    name: string;
    email: string;
}

interface ApiRes {
    EM: string;
    EC: number;
    DT: User[];
}

interface BuildData {
    name: string;
    email: string;
    idUser: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [userDataUpdate, setUserDataUpdate] = useState<UserUpdate>({
        idUser: 0,
        name: "",
        email: "",
    });

    const [show, setShow] = useState<boolean>(false);
    const [showUpdate, setShowUpdate] = useState<boolean>(false);

    const handleClose = (): void => setShow(false);
    const handleCloseUpdate = (): void => setShowUpdate(false);

    // req read
    const { data, error, isLoading } = useSWR<ApiRes>(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/users`,
        fetcher
    );

    if (error) return <p className="display-6">Failed from Server</p>;

    // req Delete
    const fetchDeleteUsers = async (userId: number): Promise<void> => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BACKEND}/users/${userId}`
            );
            const data = response.data;

            if (data.EC === 0) {
                toast.success(data.EM);

                mutate(
                    `${process.env.NEXT_PUBLIC_API_BACKEND}/users`,
                    (cachedData: ApiRes | undefined) => {
                        if (!cachedData) return;
                        const updatedUsers = cachedData.DT.filter(
                            (user: User) => user.id !== userId
                        );
                        return { ...cachedData, DT: updatedUsers };
                    },
                    false
                );
            } else {
                toast.error(data.EM);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the user.");
        }
    };

    const handleEdit = (userId: number, user: UserObject) => {
        const buildData: BuildData = {
            name: user.name,
            email: user.email,
            idUser: userId,
        };

        setUserDataUpdate(buildData);
        setShowUpdate(true);
    };

    const handleDeleteUser = (userId: number) => {
        fetchDeleteUsers(userId);
    };

    const handleCreateNewUser = (): void => {
        setShow(true);
    };
    return (
        <main>
            <div>
                <Button
                    onClick={() => handleCreateNewUser()}
                    variant="success"
                    className="float-start mb-2"
                >
                    Create User
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.DT && data.DT.length > 0
                            ? data.DT.map((user: User, index) => (
                                  <tr key={`user-${index}`}>
                                      <td>{user.id}</td>
                                      <td>{user.name}</td>
                                      <td>{user.email}</td>
                                      <td>
                                          <Button
                                              variant="warning"
                                              onClick={() =>
                                                  handleEdit(user.id, user)
                                              }
                                          >
                                              Edit
                                          </Button>
                                          <Button
                                              variant="danger"
                                              className="ms-2"
                                              onClick={() =>
                                                  handleDeleteUser(user.id)
                                              }
                                          >
                                              Delete
                                          </Button>
                                      </td>
                                  </tr>
                              ))
                            : isLoading && (
                                  <tr>
                                      <td colSpan={4}>
                                          <Skeleton count={4} />
                                      </td>
                                  </tr>
                              )}
                    </tbody>
                </Table>
            </div>
            <CreateUserModal show={show} handleClose={handleClose} />
            <UpdateUserModal
                showUpdate={showUpdate}
                handleCloseUpdate={handleCloseUpdate}
                userDataUpdate={userDataUpdate}
            />
        </main>
    );
}
