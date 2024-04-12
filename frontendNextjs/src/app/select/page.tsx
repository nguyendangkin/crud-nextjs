"use client";

import { useState, ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Select = () => {
    const [selectedCamera, setSelectedCamera] = useState("");

    const cameras = [
        { id: 1, name: "Canon AE-1" },
        { id: 2, name: "Nikon F6" },
        { id: 3, name: "Pentax K1000" },
    ];

    const handleSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCamera(event.target.value);
    };

    const handleSubmit = () => {
        toast.success(`Selected camera ID is: ${selectedCamera}`);
        // call api
    };

    return (
        <div>
            <Form.Select
                aria-label="Default select example"
                onChange={(event) => handleSelectionChange(event)}
            >
                <option>--- Please choose the film camera ---</option>
                {cameras.map((camera) => (
                    <option key={camera.id} value={camera.id}>
                        {camera.name}
                    </option>
                ))}
            </Form.Select>
            <div>
                <button className="btn btn-success mt-2" onClick={handleSubmit}>
                    Show item select
                </button>
            </div>
        </div>
    );
};

export default Select;
