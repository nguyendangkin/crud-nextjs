"use client";

import React, { useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import styles from "./datepicker.module.scss";

const DatePickerComponent = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [displayDate, setDisplayDate] = useState<string>("");

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const handleSubmit = () => {
        const data = { date: selectedDate.toISOString() };
        toast.success("Sending date to server: " + JSON.stringify(data));

        setDisplayDate(
            selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
    };

    return (
        <div className="d-flex align-items-center">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className={styles.datepicker}
            />
            <button
                className="btn btn-success ms-4 me-4"
                onClick={handleSubmit}
            >
                Show Selected Date
            </button>
            {displayDate && <div>Selected Date: {displayDate}</div>}
        </div>
    );
};

export default DatePickerComponent;
