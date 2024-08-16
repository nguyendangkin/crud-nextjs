"use client";

import FormLogin from "@/app/dang-nhap/componentLayout/FormLgoin";
import withAuth from "@/app/hoc/withAuth";
import React from "react";

const Login = () => {
    return (
        <div>
            <h1 className="text-xl">Đăng Nhập</h1>
            <FormLogin />
        </div>
    );
};

export default withAuth(Login);
