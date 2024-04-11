"use client";

import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
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

    useEffect(() => {
        fetchUsers();
    }, []);

    // req read
    const fetchUsers = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BACKEND}/users`
            );
            const data: ApiRes = await response.json();

            if (data.EC === 0) {
                setUsers(data.DT);
            } else {
                toast.error(data.EM);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // req Delete
    const fetchDeleteUsers = async (userId: number) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BACKEND}/users/${userId}`,
                {
                    method: "DELETE",
                }
            );

            const data: ApiRes = await response.json();

            if (data.EC === 0) {
                toast.success(data.EM);
                fetchUsers();
            } else {
                toast.error(data.EM);
            }
        } catch (error) {
            console.error(error);
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
                        {(users &&
                            users.length > 0 &&
                            users.map((user) => (
                                <tr key={user.id}>
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
                            ))) || (
                            <tr>
                                <td colSpan={4}>
                                    <Skeleton count={4} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <CreateUserModal
                show={show}
                handleClose={handleClose}
                fetchUsers={fetchUsers}
            />
            <UpdateUserModal
                showUpdate={showUpdate}
                handleCloseUpdate={handleCloseUpdate}
                fetchUsers={fetchUsers}
                userDataUpdate={userDataUpdate}
            />
        </main>
    );
}
