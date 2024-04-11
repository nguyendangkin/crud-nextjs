"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface UserUpdate {
    idUser: number;
    name: string;
    email: string;
}

interface CreateUserModalProps {
    showUpdate: boolean;
    handleCloseUpdate: () => void;
    userDataUpdate: UserUpdate;
}

interface BuildData {
    name: string;
    email: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface ApiRes {
    EM: string;
    EC: number;
    DT: User[];
}

const UpdateUserModal = ({
    showUpdate,
    handleCloseUpdate,

    userDataUpdate,
}: CreateUserModalProps) => {
    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");

    useEffect(() => {
        setNameInput(userDataUpdate.name);
        setEmailInput(userDataUpdate.email);
    }, [userDataUpdate]);

    const validateInput = (
        trimmedName: string,
        trimmedEmail: string
    ): boolean => {
        if (!trimmedName || !trimmedEmail) {
            toast.error("Please enter Name or Email");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        return true;
    };

    const handleCreateNewUser = (): void => {
        const trimmedName: string = nameInput.trim();
        const trimmedEmail: string = emailInput.trim();

        if (!validateInput(trimmedName, trimmedEmail)) {
            return;
        }

        const buildData: BuildData = {
            name: trimmedName,
            email: trimmedEmail,
        };

        fetchUpdateUser(buildData);
        handleCloseUpdate();
    };

    const fetchUpdateUser = async (buildData: BuildData) => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_BACKEND}/users/${userDataUpdate.idUser}`,
                buildData
            );

            if (response.data.EC === 0) {
                mutate(
                    `${process.env.NEXT_PUBLIC_API_BACKEND}/users`,
                    (cachedData: ApiRes | undefined) => {
                        if (!cachedData) return;

                        const updatedUsers = cachedData.DT.map((user) =>
                            user.id === userDataUpdate.idUser
                                ? { ...user, ...buildData }
                                : user
                        );

                        return { ...cachedData, DT: updatedUsers };
                    },
                    false
                );

                toast.success(response.data.EM);
                handleCloseUpdate();
            } else {
                toast.error(response.data.EM);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the user.");
        }
    };

    return (
        <>
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => handleCreateNewUser()}
                    >
                        Update!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateUserModal;
