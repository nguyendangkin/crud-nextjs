"use client";

import { mutate } from "swr";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface CreateUserModalProps {
    show: boolean;
    handleClose: () => void;
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

function CreateUserModal({ show, handleClose }: CreateUserModalProps) {
    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");

    const fetchAddNewUser = async (buildData: object) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BACKEND}/users`,
                buildData
            );

            const data = response.data;
            if (data.EC === 0) {
                mutate(
                    `${process.env.NEXT_PUBLIC_API_BACKEND}/users`,
                    async (cachedData: ApiRes | undefined) => {
                        if (!cachedData) {
                            return { EM: "", EC: 0, DT: [data.DT] };
                        }
                        return {
                            ...cachedData,
                            DT: [...cachedData.DT, data.DT],
                        };
                    },
                    false
                );

                toast.success(data.EM);
                setNameInput("");
                setEmailInput("");
                handleClose();
            } else {
                toast.error(data.EM);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while creating the user.");
        }
    };

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
        const trimmedName = nameInput.trim();
        const trimmedEmail = emailInput.trim();
        if (!validateInput(trimmedName, trimmedEmail)) {
            return;
        }

        const buildData = {
            name: trimmedName,
            email: trimmedEmail,
        };

        fetchAddNewUser(buildData);

        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => handleCreateNewUser()}
                    >
                        Create!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateUserModal;
