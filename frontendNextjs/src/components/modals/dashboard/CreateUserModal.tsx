"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface CreateUserModalProps {
    show: boolean;
    handleClose: () => void;
    fetchUsers: () => void;
}

interface Data {
    EM: string;
    EC: number;
    DT: never[];
}

function CreateUserModal({
    show,
    handleClose,
    fetchUsers,
}: CreateUserModalProps) {
    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");

    const fetchAddNewUser = async (buildData: object) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BACKEND}/users`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(buildData),
                }
            );

            const data: Data = await response.json();

            if (data.EC === 0) {
                fetchUsers();
                toast.success(data.EM);
                setNameInput("");
                setEmailInput("");
            } else {
                toast.error(data.EM);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const validateInput = (
        trimmedName: string,
        trimmedEmail: string
    ): boolean => {
        // check whitespace

        if (!trimmedName || !trimmedEmail) {
            toast.error("Please enter Name or Email");
            return false;
        }

        // check email
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
