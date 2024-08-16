"use client";

import FormRegister from "@/app/dang-ky/componentLayout/FormRegister";
import withAuth from "@/app/hoc/withAuth";
import React from "react";

function Register() {
    return (
        <div>
            <h1 className="text-xl">Đăng Ký</h1>
            <FormRegister />
        </div>
    );
}

export default withAuth(Register);
