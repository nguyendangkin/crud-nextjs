"use client";

import { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./page.module.scss";
import { toast } from "react-toastify";

const carBrands = [
    { id: 1, name: "Audi" },
    { id: 2, name: "BMW" },
    { id: 3, name: "Mercedes" },
    { id: 4, name: "Tesla" },
    { id: 5, name: "Volvo" },
];

const daysOfWeek = [
    { id: 1, name: "Sunday" },
    { id: 2, name: "Monday" },
    { id: 3, name: "Tuesday" },
    { id: 4, name: "Wednesday" },
    { id: 5, name: "Thursday" },
    { id: 6, name: "Friday" },
    { id: 7, name: "Saturday" },
];

const CheckBox = () => {
    // check box
    const [checkedStates, setCheckedStates] = useState<boolean[]>(
        new Array(carBrands.length).fill(false)
    );
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleCheckboxChange = (index: number) => {
        const newCheckedStates = [...checkedStates];
        newCheckedStates[index] = !newCheckedStates[index];
        setCheckedStates(newCheckedStates);
    };

    const handleBuyClick = () => {
        const selected = carBrands
            .filter((_, index) => checkedStates[index])
            .map((brand) => brand.id);
        setSelectedIds(selected);
        // sen to server: selected
    };

    // radio button
    const [selectedDayId, setSelectedDayId] = useState<number | null>(null);

    const handleRadioChange = (id: number) => {
        setSelectedDayId(id);
    };

    const handleSubmit = () => {
        if (selectedDayId == null) return;
        toast.success(`Selected day ID: ${selectedDayId}`);
        //send to server: selectedDayId
    };

    return (
        <div>
            <div className={styles.borderContainerDiv}>
                <Form className={styles.checkboxWrapper}>
                    {carBrands.map((brand, index) => (
                        <Form.Check
                            key={brand.id}
                            type="checkbox"
                            id={`custom-checkbox-${brand.id}`}
                            label={brand.name}
                            checked={checkedStates[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                    ))}
                </Form>
                <button
                    className={`btn btn-success ${styles.btnSuccess}`}
                    onClick={handleBuyClick}
                >
                    Buy it!
                </button>
                <div>
                    <ul>
                        {selectedIds.map((id) => (
                            <li key={id}>Selected brand ID: {id}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.borderContainerDiv}>
                <Form className={styles.radioWrapper}>
                    {daysOfWeek.map((day) => (
                        <Form.Check
                            key={day.id}
                            type="radio"
                            id={`day-${day.id}`}
                            name="dayOfWeek"
                            label={day.name}
                            value={day.id}
                            checked={selectedDayId === day.id}
                            onChange={() => handleRadioChange(day.id)}
                        />
                    ))}
                </Form>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Send!
                </button>
                {selectedDayId && <div>Selected Day ID: {selectedDayId}</div>}
            </div>
        </div>
    );
};

export default CheckBox;
