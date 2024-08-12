"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { HttpsSWR } from "@/https/HttpsSWR";

const formSchema = z
    .object({
        username: z.string().min(1, { message: "Tối thiểu 1 ký tự" }).max(50),
        email: z.string().email({ message: "Email không hợp lệ" }),
        fullName: z.string().min(1, { message: "Tối thiểu 1 ký tự" }).max(50),
        password: z.string().min(1, { message: "Tối thiểu 1 ký tự" }).max(50),
        confirmPassword: z
            .string()
            .min(1, { message: "Tối thiểu 1 ký tự" })
            .max(50),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu nhập lại không khớp",
        path: ["confirmPassword"],
    });

export default function FormRegister() {
    const [alert, setAlert] = useState<{
        message: string;
        variant: "default" | "destructive";
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const result = await HttpsSWR.post({
                url: "/auth/register",
                data: values,
            });
            if (result.statusCode === 200) {
                setAlert({
                    message: result.message,
                    variant: "default",
                });
                setTimeout(() => {
                    router.push("/");
                }, 1000);
            } else {
                setAlert({
                    message: result.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tên người dùng của bạn"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Email của bạn"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tên đầy đủ của bạn"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Mật khẩu của bạn"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {alert && (
                    <Alert variant={alert.variant}>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                )}

                <Button
                    disabled={isLoading ? true : false}
                    className="w-full"
                    type="submit"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        ""
                    )}
                    Đăng ký
                </Button>
            </form>
        </Form>
    );
}
