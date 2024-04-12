"use client";

import Image from "next/image";
import styles from "./avatarchange.module.scss";
import React, { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";

const AvatarChange = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };

    const updateProfile = () => {
        toast.success("Update profile");
        // call api
    };

    return (
        <div className={styles.userProfile}>
            <label htmlFor="avatar-upload" className="btn btn-primary mb-2">
                Choose File
            </label>
            <input
                id="avatar-upload"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className={styles.fileInput}
                style={{ display: "none" }}
            />
            {avatarUrl && (
                <div className={styles.avatarWrapper}>
                    <Image
                        src={avatarUrl}
                        alt="User Avatar"
                        fill
                        style={{ objectFit: "cover" }}
                        className={`img-fluid ${styles.avatar}`}
                    />
                </div>
            )}
            <button onClick={updateProfile} className="btn btn-success">
                Update Profile
            </button>
        </div>
    );
};
export default AvatarChange;
